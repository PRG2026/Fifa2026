const API_BASE = '';
let currentUser = null;

function getAuthHeaders() {
  return currentUser && currentUser.token ? { Authorization: `Bearer ${currentUser.token}` } : {};
}

async function apiFetch(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'API request failed');
  }
  return response.json();
}

function saveSession(user, token) {
  if (!user || !token) return;
  currentUser = { ...user, token };
  localStorage.setItem('fifa2026Session', JSON.stringify(currentUser));
}

function clearSession() {
  currentUser = null;
  localStorage.removeItem('fifa2026Session');
}

async function restoreCurrentUser() {
  const stored = JSON.parse(localStorage.getItem('fifa2026Session') || 'null');
  if (!stored?.token) {
    currentUser = null;
    return;
  }

  try {
    const data = await apiFetch('/api/me', { method: 'GET' });
    saveSession(data.user, stored.token);
  } catch (err) {
    clearSession();
  }
}

async function loadServerState() {
  try {
    const data = await apiFetch('/api/matches', { method: 'GET' });
    if (Array.isArray(data.matches)) {
      gameData.matches = data.matches.map(match => ({
        ...match,
        actualScoreA: match.actual_score_a,
        actualScoreB: match.actual_score_b,
        status: match.status
      }));
    }
    if (data.bonusResults) {
      gameData.bonusResults = {
        worldCupWinner: data.bonusResults.world_cup_winner || '',
        runnerUp: data.bonusResults.runner_up || '',
        goldenBoot: data.bonusResults.golden_boot || '',
        bestGoalkeeper: data.bonusResults.best_goalkeeper || '',
        topScoringTeam: data.bonusResults.top_scoring_team || ''
      };
    }
  } catch (err) {
    console.warn('Unable to load server state:', err.message);
  }
}

async function loginUser() {
  const mobile = document.getElementById('loginMobile').value.trim();
  const pin = document.getElementById('loginPin').value.trim();
  if (!mobile || !pin) {
    alert('Please enter both mobile number and PIN.');
    return;
  }

  try {
    const data = await apiFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ mobile, pin })
    });
    saveSession(data.user, data.token);
    document.getElementById('loginMobile').value = '';
    document.getElementById('loginPin').value = '';
    await loadServerState();
    renderMatches();
    await loadLeaderboard();
    renderSchedule();
    renderStandings();
    updateAuthUI();
    if (currentUser.admin) {
      await renderAdminUsers();
      renderAdminMatches();
      renderAdminBonus();
    }
  } catch (err) {
    alert(err.message);
  }
}

function logout() {
  clearSession();
  updateAuthUI();
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
  const loginSection = document.getElementById('login');
  if (loginSection) loginSection.classList.add('active');
}

function updateAuthUI() {
  const nav = document.querySelector('.main-nav');
  const authToolbar = document.getElementById('authToolbar');
  const adminButton = document.getElementById('adminNavButton');
  const currentUserNameLabel = document.getElementById('currentUserNameLabel');
  const currentUserMobileLabel = document.getElementById('currentUserMobileLabel');
  const loggedInUserName = document.getElementById('loggedInUserName');
  const loggedInUserMobile = document.getElementById('loggedInUserMobile');

  if (currentUser) {
    if (nav) nav.style.display = 'flex';
    if (authToolbar) authToolbar.style.display = 'flex';
    if (loggedInUserName) loggedInUserName.textContent = currentUser.name;
    if (loggedInUserMobile) loggedInUserMobile.textContent = currentUser.mobile;
    if (currentUserNameLabel) currentUserNameLabel.textContent = currentUser.name;
    if (currentUserMobileLabel) currentUserMobileLabel.textContent = currentUser.mobile;
    if (adminButton) adminButton.style.display = currentUser.admin ? 'inline-flex' : 'none';
    showSection('predictions');
    if (currentUser.admin) {
      renderAdminUsers();
      renderAdminMatches();
      renderAdminBonus();
    }
  } else {
    if (nav) nav.style.display = 'none';
    if (authToolbar) authToolbar.style.display = 'none';
    if (adminButton) adminButton.style.display = 'none';
    if (currentUserNameLabel) currentUserNameLabel.textContent = '';
    if (currentUserMobileLabel) currentUserMobileLabel.textContent = '';
    if (loggedInUserName) loggedInUserName.textContent = '';
    if (loggedInUserMobile) loggedInUserMobile.textContent = '';
    showSection('login');
  }
}

async function renderAdminUsers() {
  const container = document.getElementById('adminUsersContainer');
  if (!container) return;

  try {
    const data = await apiFetch('/api/users', { method: 'GET' });
    const users = data.users || [];
    let html = `
        <table class="standings-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    users.forEach(user => {
      const toggleLabel = user.active ? 'Deactivate' : 'Activate';
      html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.mobile}</td>
                <td>${user.admin ? 'Admin' : 'User'}</td>
                <td>${user.active ? 'Active' : 'Inactive'}</td>
                <td>
                    <button class="btn-secondary" onclick="toggleUserActive('${user.mobile}')">${toggleLabel}</button>
                    <button class="btn-primary" onclick="resetUserPin('${user.mobile}')">Reset PIN</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<div class="empty-state"><p>Error loading users.</p></div>`;
  }
}

async function toggleUserActive(mobile) {
  try {
    await apiFetch('/api/users/toggle', {
      method: 'POST',
      body: JSON.stringify({ mobile })
    });
    await renderAdminUsers();
  } catch (err) {
    alert(err.message);
  }
}

async function resetUserPin(mobile) {
  const newPin = prompt(`Enter a new PIN for ${mobile}:`, '');
  if (!newPin) return;
  if (newPin.length < 4) {
    alert('PIN must be at least 4 digits.');
    return;
  }

  try {
    await apiFetch('/api/users/reset-pin', {
      method: 'POST',
      body: JSON.stringify({ mobile, newPin })
    });
    alert('PIN updated successfully.');
  } catch (err) {
    alert(err.message);
  }
}

async function renderAdminMatches() {
  const container = document.getElementById('adminMatchesContainer');
  if (!container) return;

  if (!gameData.matches || gameData.matches.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No match data available.</p></div>';
    return;
  }

  const matches = [...gameData.matches].sort((a, b) => new Date(a.date) - new Date(b.date));
  let html = `
        <div class="admin-match-table">
            <div class="admin-match-row admin-match-header">
                <div>Match</div>
                <div>Score</div>
                <div>Status</div>
                <div>Action</div>
            </div>
    `;

  matches.forEach(match => {
    const scoreA = typeof match.actualScoreA === 'number' ? match.actualScoreA : '';
    const scoreB = typeof match.actualScoreB === 'number' ? match.actualScoreB : '';
    const status = match.status || 'upcoming';

    html += `
            <div class="admin-match-row">
                <div class="admin-match-info">
                    <strong>${match.team1}</strong> vs <strong>${match.team2}</strong><br>
                    <span style="font-size:0.85em; color:#666;">${formatISTTime(match.date)} | Group ${match.group}</span>
                </div>
                <div class="admin-match-score">
                    <input id="adminScoreA-${match.id}" type="number" min="0" value="${scoreA}" placeholder="A" style="width: 70px;"> -
                    <input id="adminScoreB-${match.id}" type="number" min="0" value="${scoreB}" placeholder="B" style="width: 70px;">
                </div>
                <div>
                    <select id="adminMatchStatus-${match.id}">
                        <option value="upcoming" ${status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                        <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
                <div>
                    <button class="btn-primary" onclick="updateMatchResult(${match.id})">Save</button>
                </div>
            </div>
        `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

async function updateMatchResult(matchId) {
  const scoreA = parseInt(document.getElementById(`adminScoreA-${matchId}`).value, 10);
  const scoreB = parseInt(document.getElementById(`adminScoreB-${matchId}`).value, 10);
  const status = document.getElementById(`adminMatchStatus-${matchId}`).value;

  if (isNaN(scoreA) || isNaN(scoreB)) {
    alert('Please enter both actual scores before saving.');
    return;
  }

  try {
    await apiFetch(`/api/matches/${matchId}`, {
      method: 'POST',
      body: JSON.stringify({ actualScoreA: scoreA, actualScoreB: scoreB, status })
    });
    await loadServerState();
    renderSchedule();
    renderStandings();
    await loadLeaderboard();
    renderAdminMatches();
    alert('Match result updated successfully.');
  } catch (err) {
    alert(err.message);
  }
}

function renderAdminBonus() {
  const container = document.getElementById('adminBonusContainer');
  if (!container) return;

  const bonus = gameData.bonusResults || {};
  container.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label for="adminBonusWinner">Champion</label>
                <input type="text" id="adminBonusWinner" value="${bonus.worldCupWinner || ''}" placeholder="Team name">
            </div>
            <div class="form-group">
                <label for="adminBonusRunnerUp">Runner Up</label>
                <input type="text" id="adminBonusRunnerUp" value="${bonus.runnerUp || ''}" placeholder="Team name">
            </div>
            <div class="form-group">
                <label for="adminBonusGoldenBoot">Golden Boot</label>
                <input type="text" id="adminBonusGoldenBoot" value="${bonus.goldenBoot || ''}" placeholder="Player name">
            </div>
            <div class="form-group">
                <label for="adminBonusGoalkeeper">Best Goalkeeper</label>
                <input type="text" id="adminBonusGoalkeeper" value="${bonus.bestGoalkeeper || ''}" placeholder="Player name">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label for="adminBonusTopScoringTeam">Top Scoring Team</label>
                <input type="text" id="adminBonusTopScoringTeam" value="${bonus.topScoringTeam || ''}" placeholder="Team name">
            </div>
        </div>
        <div class="button-group" style="margin-top: 10px; text-align: right;">
            <button class="btn-primary" onclick="saveAdminBonus()">Save Bonus Results</button>
        </div>
    `;
}

async function saveAdminBonus() {
  try {
    const bonusPayload = {
      worldCupWinner: document.getElementById('adminBonusWinner').value.trim(),
      runnerUp: document.getElementById('adminBonusRunnerUp').value.trim(),
      goldenBoot: document.getElementById('adminBonusGoldenBoot').value.trim(),
      bestGoalkeeper: document.getElementById('adminBonusGoalkeeper').value.trim(),
      topScoringTeam: document.getElementById('adminBonusTopScoringTeam').value.trim()
    };

    await apiFetch('/api/bonus-results', {
      method: 'POST',
      body: JSON.stringify(bonusPayload)
    });

    await loadServerState();
    alert('Bonus results updated successfully.');
    renderAdminBonus();
    await loadLeaderboard();
  } catch (err) {
    alert(err.message);
  }
}

async function getSavedPredictionEntry(mobile, date) {
  if (!mobile || !date) return null;
  try {
    const data = await apiFetch(`/api/predictions?date=${encodeURIComponent(date)}`, { method: 'GET' });
    const predictions = Array.isArray(data.predictions) ? data.predictions : [];
    return {
      mobile,
      date,
      timestamp: predictions.length ? predictions[0].created_at : null,
      predictions: predictions.map(pred => ({
        matchId: pred.match_id,
        predictedScoreA: pred.predicted_score_a,
        predictedScoreB: pred.predicted_score_b,
        predictedOutcome: pred.predicted_outcome
      })),
      bonusPredictions: data.bonusPrediction ? {
        worldCupWinner: data.bonusPrediction.world_cup_winner,
        runnerUp: data.bonusPrediction.runner_up,
        goldenBoot: data.bonusPrediction.golden_boot,
        bestGoalkeeper: data.bonusPrediction.best_goalkeeper,
        topScoringTeam: data.bonusPrediction.top_scoring_team
      } : {}
    };
  } catch (err) {
    return null;
  }
}

function getISTDateOnly(dateString) {
  const date = parseUTCDateString(dateString);
  if (isNaN(date)) return '';
  return date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function formatISTTime(dateString) {
  const date = parseUTCDateString(dateString);
  if (isNaN(date)) return 'Unknown time';
  return date.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }) + ' IST';
}

function formatISTDateLabel(dateString) {
  const date = parseUTCDateString(dateString);
  if (isNaN(date)) return 'Unknown date';
  return date.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

function getMatchOutcome(scoreA, scoreB) {
  if (scoreA > scoreB) return 'team1';
  if (scoreA < scoreB) return 'team2';
  return 'draw';
}

function getOutcomeLabel(match, outcome) {
  if (outcome === 'draw') return 'Draw';
  return outcome === 'team1' ? match.team1 : match.team2;
}

function calculateMatchPoints(match, prediction) {
  if (match.actualScoreA == null || match.actualScoreB == null) {
    return { points: 0, exactScore: false, correctResult: false, pending: true };
  }

  const actualA = match.actualScoreA;
  const actualB = match.actualScoreB;
  const predictedA = prediction.predictedScoreA;
  const predictedB = prediction.predictedScoreB;
  const predictedOutcome = prediction.predictedOutcome;

  const actualOutcome = getMatchOutcome(actualA, actualB);
  const predictedOutcomeResolved = typeof predictedOutcome === 'string' && predictedOutcome
    ? predictedOutcome
    : getMatchOutcome(predictedA, predictedB);

  const exactScore = predictedA === actualA && predictedB === actualB;
  const exactDiff = (predictedA - predictedB) === (actualA - actualB);
  const correctResult = predictedOutcomeResolved === actualOutcome;

  if (exactScore) return { points: 10, exactScore: true, correctResult: true, pending: false };
  if (exactDiff && correctResult) return { points: 5, exactScore: false, correctResult: true, pending: false };
  if (correctResult) return { points: 3, exactScore: false, correctResult: true, pending: false };
  return { points: 0, exactScore: false, correctResult: false, pending: false };
}

function calculateBonusPoints(predictedBonus) {
  const actualBonus = gameData.bonusResults || {};
  let points = 0;
  if (!predictedBonus) return points;

  const compare = (a, b) => (a || '').trim().toLowerCase() === (b || '').trim().toLowerCase();
  if (predictedBonus.worldCupWinner && compare(predictedBonus.worldCupWinner, actualBonus.worldCupWinner)) points += 50;
  if (predictedBonus.runnerUp && compare(predictedBonus.runnerUp, actualBonus.runnerUp)) points += 25;
  if (predictedBonus.goldenBoot && compare(predictedBonus.goldenBoot, actualBonus.goldenBoot)) points += 30;
  if (predictedBonus.bestGoalkeeper && compare(predictedBonus.bestGoalkeeper, actualBonus.bestGoalkeeper)) points += 20;
  if (predictedBonus.topScoringTeam && compare(predictedBonus.topScoringTeam, actualBonus.topScoringTeam)) points += 20;

  return points;
}

function hasBonusPredictionsSubmitted(entry) {
  if (!entry || !entry.bonusPredictions) return false;
  const bonus = entry.bonusPredictions;
  return Boolean(
    (bonus.worldCupWinner && bonus.worldCupWinner.trim()) ||
    (bonus.runnerUp && bonus.runnerUp.trim()) ||
    (bonus.goldenBoot && bonus.goldenBoot.trim()) ||
    (bonus.bestGoalkeeper && bonus.bestGoalkeeper.trim()) ||
    (bonus.topScoringTeam && bonus.topScoringTeam.trim())
  );
}

async function updateBonusVisibility() {
  const user = currentUser;
  const activeDate = getActivePredictionDate();
  const saved = user ? await getSavedPredictionEntry(user.mobile, activeDate) : null;
  const bonusSection = document.getElementById('bonusSection');
  const bonusMessage = document.getElementById('bonusStatusMessage');

  if (!bonusSection || !bonusMessage) return;

  if (saved && hasBonusPredictionsSubmitted(saved)) {
    bonusSection.style.display = 'none';
    bonusMessage.textContent = 'Bonus predictions have already been submitted for this user and match day. The bonus section is hidden to prevent duplicate entries.';
    bonusMessage.style.display = 'block';
  } else {
    bonusSection.style.display = 'block';
    bonusMessage.style.display = 'none';
  }
}

async function savePredictions() {
  if (!currentUser) {
    alert('Please log in before saving predictions.');
    return;
  }
  if (!currentUser.active) {
    alert('Your account is inactive. Contact an admin to reactivate your account.');
    return;
  }

  const activeDate = getActivePredictionDate();
  if (!activeDate) {
    alert('No prediction day is available right now.');
    return;
  }

  const status = getPredictionStatus(activeDate);
  if (status.locked) {
    alert(`Prediction window is locked: ${status.reason}`);
    return;
  }

  const matches = getMatchesForPredictionDate(activeDate);
  if (matches.length === 0) {
    alert('No matches are available for prediction today.');
    return;
  }

  const predictions = matches.map(match => {
    const team1Input = document.querySelector(`.score-team1-${match.id}`);
    const team2Input = document.querySelector(`.score-team2-${match.id}`);
    const outcomeInput = document.querySelector(`input[name="prediction-type-${match.id}"]:checked`);

    return {
      matchId: match.id,
      team1: match.team1,
      team2: match.team2,
      predictedScoreA: team1Input && team1Input.value !== '' ? parseInt(team1Input.value, 10) : null,
      predictedScoreB: team2Input && team2Input.value !== '' ? parseInt(team2Input.value, 10) : null,
      predictedOutcome: outcomeInput ? outcomeInput.value : null
    };
  });

  const hasPrediction = predictions.some(pred => pred.predictedOutcome || pred.predictedScoreA !== null || pred.predictedScoreB !== null);
  if (!hasPrediction) {
    alert('Please make at least one prediction before saving.');
    return;
  }

  const bonusPredictions = {
    worldCupWinner: document.getElementById('bonusWinner').value.trim(),
    runnerUp: document.getElementById('bonusRunnerUp').value.trim(),
    goldenBoot: document.getElementById('bonusGoldenBoot').value.trim(),
    bestGoalkeeper: document.getElementById('bonusGoalkeeper').value.trim(),
    topScoringTeam: document.getElementById('bonusTopScoringTeam').value.trim()
  };

  try {
    await apiFetch('/api/predictions', {
      method: 'POST',
      body: JSON.stringify({ date: activeDate, predictions, bonusPredictions })
    });

    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3000);
    }

    clearPredictions();
    renderMatches();
    await loadLeaderboard();
  } catch (err) {
    alert(err.message);
  }
}

function clearPredictions() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    if (!input.disabled) {
      input.value = '';
    }
  });

  document.getElementById('bonusWinner').value = '';
  document.getElementById('bonusRunnerUp').value = '';
  document.getElementById('bonusGoldenBoot').value = '';
  document.getElementById('bonusGoalkeeper').value = '';
  document.getElementById('bonusTopScoringTeam').value = '';
  document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
  updateBonusVisibility();
}

function getPredictionStatus(dateString) {
  if (!dateString) {
    return { locked: false, reason: '' };
  }

  const now = new Date();
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const matchDateOnly = getISTDateOnly(dateString);
  if (!matchDateOnly) {
    return { locked: false, reason: '' };
  }

  const matchesForDate = gameData.matches.filter(m => getISTDateOnly(m.date) === matchDateOnly);
  if (matchesForDate.length === 0) return { locked: false, reason: '' };

  const earliestMatch = matchesForDate.reduce((prev, current) => {
    return parseUTCDateString(prev.date) < parseUTCDateString(current.date) ? prev : current;
  });

  const firstMatchTimeUTC = parseUTCDateString(earliestMatch.date);
  const firstMatchTimeIST = new Date(firstMatchTimeUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  if (now < firstMatchTimeIST) {
    return { locked: false, reason: '' };
  }

  return {
    locked: true,
    reason: `Predictions closed - First match started at ${formatISTTime(earliestMatch.date)}`
  };
}

function getActivePredictionDate() {
  const now = new Date();
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const dates = Array.from(new Set(gameData.matches
    .map(m => getISTDateOnly(m.date))
    .filter(date => date && date.length > 0)
  )).sort();

  if (dates.length === 0) {
    return null;
  }
  if (dates.includes(todayIST)) {
    return todayIST;
  }
  const nextDates = dates.filter(d => d > todayIST);
  return nextDates.length > 0 ? nextDates[0] : dates[dates.length - 1];
}

function getMatchesForPredictionDate(dateString) {
  if (!dateString) return [];
  return gameData.matches
    .filter(match => getISTDateOnly(match.date) === dateString)
    .sort((a, b) => parseUTCDateString(a.date) - parseUTCDateString(b.date));
}

async function populatePredictionForm() {
  if (!currentUser) return;

  const activeDate = getActivePredictionDate();
  const saved = await getSavedPredictionEntry(currentUser.mobile, activeDate);
  if (!saved) return;

  saved.predictions.forEach(pred => {
    const team1Input = document.querySelector(`.score-team1-${pred.matchId}`);
    const team2Input = document.querySelector(`.score-team2-${pred.matchId}`);
    const outcomeInput = document.querySelector(`input[name="prediction-type-${pred.matchId}"][value="${pred.predictedOutcome}"]`);

    if (team1Input && pred.predictedScoreA !== null) team1Input.value = pred.predictedScoreA;
    if (team2Input && pred.predictedScoreB !== null) team2Input.value = pred.predictedScoreB;
    if (outcomeInput) outcomeInput.checked = true;
  });

  const bonus = saved.bonusPredictions || {};
  document.getElementById('bonusWinner').value = bonus.worldCupWinner || '';
  document.getElementById('bonusRunnerUp').value = bonus.runnerUp || '';
  document.getElementById('bonusGoldenBoot').value = bonus.goldenBoot || '';
  document.getElementById('bonusGoalkeeper').value = bonus.bestGoalkeeper || '';
  document.getElementById('bonusTopScoringTeam').value = bonus.topScoringTeam || '';
}

async function loadLeaderboard() {
  const container = document.getElementById('leaderboardContainer');
  try {
    const data = await apiFetch('/api/leaderboard', { method: 'GET' });
    const leaderboard = data.leaderboard || [];
    if (leaderboard.length === 0) {
      container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <p>No predictions yet. Start making predictions to see the leaderboard!</p>
            </div>
        `;
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    const tableRows = leaderboard.map((player, index) => `
        <tr>
            <td class="rank">
                ${index < 3 ? `<span class="medal">${medals[index]}</span>` : ''}
                #${index + 1}
            </td>
            <td>${player.name}</td>
            <td><strong>${player.totalPoints}</strong></td>
            <td>${player.exactScores}</td>
            <td>${player.correctResults}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Points</th>
                    <th>Exact Scores</th>
                    <th>Correct Results</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
  } catch (err) {
    container.innerHTML = `<div class="empty-state"><p>Error loading leaderboard.</p></div>`;
  }
}

function renderMatches() {
  const container = document.getElementById('matchesContainer');
  if (!container) return;

  const activeDate = getActivePredictionDate();
  if (!activeDate) {
    container.innerHTML = '<div class="empty-state"><p>No active match day is available.</p></div>';
    return;
  }

  const matches = getMatchesForPredictionDate(activeDate);
  if (matches.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No matches are available for prediction today.</p></div>';
    return;
  }

  const status = getPredictionStatus(activeDate);
  const disabled = status.locked ? 'disabled' : '';
  const lockMessage = status.locked ? `<div class="day-locked-message">${status.reason}</div>` : '';

  let html = `
    ${lockMessage}
    <div class="day-section ${status.locked ? 'locked' : ''}">
      <div class="match-info">
        <div>
          <strong>Active Day:</strong> ${formatISTDateLabel(activeDate)}
        </div>
        <div class="prediction-deadline">${status.locked ? 'This day is locked for new predictions.' : 'Submit before the first match begins.'}</div>
      </div>
    </div>
  `;

  matches.forEach(match => {
    html += `
      <div class="match-card">
        <div>
          <div class="match-team">${match.team1}</div>
          <div class="match-date">${formatISTTime(match.date)}</div>
        </div>
        <div class="match-score">
          <input class="score-team1-${match.id}" type="number" min="0" placeholder="A" ${disabled}>
          <span class="vs">-</span>
          <input class="score-team2-${match.id}" type="number" min="0" placeholder="B" ${disabled}>
        </div>
        <div>
          <label class="prediction-type"><input type="radio" name="prediction-type-${match.id}" value="team1" ${disabled}> ${match.team1}</label>
          <label class="prediction-type"><input type="radio" name="prediction-type-${match.id}" value="draw" ${disabled}> Draw</label>
          <label class="prediction-type"><input type="radio" name="prediction-type-${match.id}" value="team2" ${disabled}> ${match.team2}</label>
        </div>
        <div>
          <small>${match.group ? `Group ${match.group}` : `Group ${match.groupId}`}</small>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
  populatePredictionForm();
  updateBonusVisibility();
}

function renderSchedule() {
  const container = document.getElementById('scheduleContainer');
  const lastUpdated = document.getElementById('lastUpdatedTime');
  if (!container) return;

  const groups = Array.from(new Set(gameData.matches.map(match => getISTDateOnly(match.date))));
  if (lastUpdated) {
    lastUpdated.textContent = `Last updated: ${new Date().toLocaleString()}`;
  }

  let html = '';
  groups.forEach(date => {
    html += `
      <div class="day-section">
        <h3>${formatISTDateLabel(date)}</h3>
    `;

    gameData.matches
      .filter(match => getISTDateOnly(match.date) === date)
      .sort((a, b) => parseUTCDateString(a.date) - parseUTCDateString(b.date))
      .forEach(match => {
        const liveClass = match.status === 'completed' ? 'live' : 'upcoming';
        const scoreDisplay = typeof match.actualScoreA === 'number' && typeof match.actualScoreB === 'number'
          ? `<span class="match-score">${match.actualScoreA} - ${match.actualScoreB}</span>`
          : `<span class="match-score">TBD</span>`;

        html += `
          <div class="match-card ${match.status === 'completed' ? '' : ''}">
            <div>
              <div class="match-team">${match.team1}</div>
              <div class="match-date">${formatISTTime(match.date)}</div>
            </div>
            <div>${scoreDisplay}</div>
            <div>
              <div class="match-team">${match.team2}</div>
              <div class="match-date">${match.status === 'completed' ? 'Completed' : 'Upcoming'}</div>
            </div>
            <div><strong>${match.group || match.groupId}</strong></div>
          </div>
        `;
      });

    html += '</div>';
  });

  container.innerHTML = html;
}

function getComputedStandings() {
  const groups = JSON.parse(JSON.stringify(gameData.groups));

  gameData.matches.forEach(match => {
    if (match.actualScoreA == null || match.actualScoreB == null) return;
    const team1 = groups[match.group || match.groupId].find(team => team.name === match.team1);
    const team2 = groups[match.group || match.groupId].find(team => team.name === match.team2);
    if (!team1 || !team2) return;

    team1.played += 1;
    team2.played += 1;
    team1.gf += match.actualScoreA;
    team1.ga += match.actualScoreB;
    team2.gf += match.actualScoreB;
    team2.ga += match.actualScoreA;

    if (match.actualScoreA > match.actualScoreB) {
      team1.won += 1;
      team2.lost += 1;
      team1.pts += 3;
    } else if (match.actualScoreA < match.actualScoreB) {
      team2.won += 1;
      team1.lost += 1;
      team2.pts += 3;
    } else {
      team1.drawn += 1;
      team2.drawn += 1;
      team1.pts += 1;
      team2.pts += 1;
    }
  });

  return groups;
}

function renderStandings() {
  const container = document.getElementById('standingsContainer');
  if (!container) return;

  const groups = getComputedStandings();
  let html = '';
  let anyPlayed = false;

  Object.entries(groups).forEach(([groupName, teams]) => {
    const sortedTeams = [...teams].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const gdA = a.gf - a.ga;
      const gdB = b.gf - b.ga;
      if (gdB !== gdA) return gdB - gdA;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.name.localeCompare(b.name);
    });

    if (sortedTeams.some(team => team.played > 0)) {
      anyPlayed = true;
    }

    html += `
      <div class="group-title">Group ${groupName}</div>
      <table class="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
    `;

    sortedTeams.forEach((team, index) => {
      const gd = team.gf - team.ga;
      html += `
          <tr>
            <td><strong>${index + 1}</strong></td>
            <td>${team.name}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.gf}</td>
            <td>${team.ga}</td>
            <td>${gd > 0 ? '+' : ''}${gd}</td>
            <td><strong>${team.pts}</strong></td>
          </tr>
      `;
    });

    html += '</tbody></table>';
  });

  if (!anyPlayed) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <p>No completed results yet. Admin can update match results in the Admin panel to generate standings.</p>
      </div>
    `;
    return;
  }
  container.innerHTML = html;
}

async function initializeApp() {
  await restoreCurrentUser();
  await loadServerState();
  updateAuthUI();
  renderMatches();
  await loadLeaderboard();
  renderSchedule();
  renderStandings();
  if (currentUser && currentUser.admin) {
    await renderAdminUsers();
    renderAdminMatches();
    renderAdminBonus();
  }
}

const gameData = {
  matches: [],
  groups: {
    A: [
      { name: 'United States', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Mexico', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Canada', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Morocco', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    B: [
      { name: 'Argentina', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Paraguay', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Peru', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Denmark', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    C: [
      { name: 'France', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Netherlands', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Poland', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Senegal', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    D: [
      { name: 'Brazil', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Serbia', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Switzerland', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Costa Rica', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    E: [
      { name: 'Spain', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Germany', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Japan', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Uruguay', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    F: [
      { name: 'Belgium', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'England', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Canada', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Iran', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    G: [
      { name: 'Portugal', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Italy', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Greece', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Ecuador', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    H: [
      { name: 'South Korea', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Australia', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Turkmenistan', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Saudi Arabia', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    I: [
      { name: 'Colombia', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Cameroon', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Hungary', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Chad', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    J: [
      { name: 'Ukraine', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Norway', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Uzbekistan', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Algeria', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    K: [
      { name: 'Turkey', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Oman', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Bolivia', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Guatemala', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ],
    L: [
      { name: 'Egypt', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'New Zealand', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Vietnam', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Jamaica', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    ]
  },
  bonusResults: {
    worldCupWinner: '',
    runnerUp: '',
    goldenBoot: '',
    bestGoalkeeper: '',
    topScoringTeam: ''
  }
};

function parseUTCDateString(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return new Date(NaN);
  }
  const pieces = dateString.split(' ');
  if (pieces.length !== 2) {
    return new Date(NaN);
  }
  const [datePart, timePart] = pieces;
  const dateParts = datePart.split('-').map(Number);
  const timeParts = timePart.split(':').map(Number);
  if (dateParts.length !== 3 || timeParts.length !== 2) {
    return new Date(NaN);
  }
  const [year, month, day] = dateParts;
  const [hour, minute] = timeParts;
  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

function showSection(sectionId) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.section === sectionId));
  document.querySelectorAll('.section').forEach(section => section.classList.toggle('active', section.id === sectionId));
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(sectionId).classList.add('active');
      if (sectionId === 'leaderboard') {
        loadLeaderboard();
      }
    });
  });
  initializeApp();
});
