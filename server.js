require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
const SESSION_TTL = 1000 * 60 * 60;
const sessions = {};

let pool;

const defaultUsers = [
  { mobile: '9999999999', name: 'Admin', pin: '0000', admin: 1, active: 1 },
  { mobile: '7000000001', name: 'Ayesha', pin: '1111', admin: 0, active: 1 },
  { mobile: '7000000002', name: 'Rohan', pin: '2222', admin: 0, active: 1 },
  { mobile: '7000000003', name: 'Maya', pin: '3333', admin: 0, active: 1 }
];

const matchSeeds = [
  { id: 1, team1: 'United States', team2: 'Canada', date: '2026-06-11 13:00', groupId: 'A', status: 'upcoming' },
  { id: 2, team1: 'Mexico', team2: 'Morocco', date: '2026-06-11 16:00', groupId: 'A', status: 'upcoming' },
  { id: 3, team1: 'Canada', team2: 'Morocco', date: '2026-06-15 13:00', groupId: 'A', status: 'upcoming' },
  { id: 4, team1: 'Mexico', team2: 'United States', date: '2026-06-15 19:00', groupId: 'A', status: 'upcoming' },
  { id: 5, team1: 'Canada', team2: 'United States', date: '2026-06-19 19:00', groupId: 'A', status: 'upcoming' },
  { id: 6, team1: 'Morocco', team2: 'Mexico', date: '2026-06-19 19:00', groupId: 'A', status: 'upcoming' },
  { id: 7, team1: 'Argentina', team2: 'Paraguay', date: '2026-06-11 10:00', groupId: 'B', status: 'upcoming' },
  { id: 8, team1: 'Peru', team2: 'Denmark', date: '2026-06-11 19:00', groupId: 'B', status: 'upcoming' },
  { id: 9, team1: 'Argentina', team2: 'Denmark', date: '2026-06-15 16:00', groupId: 'B', status: 'upcoming' },
  { id: 10, team1: 'Peru', team2: 'Paraguay', date: '2026-06-15 22:00', groupId: 'B', status: 'upcoming' },
  { id: 11, team1: 'Denmark', team2: 'Argentina', date: '2026-06-20 19:00', groupId: 'B', status: 'upcoming' },
  { id: 12, team1: 'Paraguay', team2: 'Peru', date: '2026-06-20 19:00', groupId: 'B', status: 'upcoming' },
  { id: 13, team1: 'France', team2: 'Netherlands', date: '2026-06-12 13:00', groupId: 'C', status: 'upcoming' },
  { id: 14, team1: 'Poland', team2: 'Senegal', date: '2026-06-12 16:00', groupId: 'C', status: 'upcoming' },
  { id: 15, team1: 'France', team2: 'Senegal', date: '2026-06-16 13:00', groupId: 'C', status: 'upcoming' },
  { id: 16, team1: 'Poland', team2: 'Netherlands', date: '2026-06-16 19:00', groupId: 'C', status: 'upcoming' },
  { id: 17, team1: 'Netherlands', team2: 'France', date: '2026-06-20 22:00', groupId: 'C', status: 'upcoming' },
  { id: 18, team1: 'Senegal', team2: 'Poland', date: '2026-06-20 22:00', groupId: 'C', status: 'upcoming' },
  { id: 19, team1: 'Brazil', team2: 'Serbia', date: '2026-06-12 10:00', groupId: 'D', status: 'upcoming' },
  { id: 20, team1: 'Switzerland', team2: 'Costa Rica', date: '2026-06-12 19:00', groupId: 'D', status: 'upcoming' },
  { id: 21, team1: 'Brazil', team2: 'Costa Rica', date: '2026-06-16 16:00', groupId: 'D', status: 'upcoming' },
  { id: 22, team1: 'Switzerland', team2: 'Serbia', date: '2026-06-16 22:00', groupId: 'D', status: 'upcoming' },
  { id: 23, team1: 'Serbia', team2: 'Brazil', date: '2026-06-21 19:00', groupId: 'D', status: 'upcoming' },
  { id: 24, team1: 'Costa Rica', team2: 'Switzerland', date: '2026-06-21 19:00', groupId: 'D', status: 'upcoming' },
  { id: 25, team1: 'Spain', team2: 'Germany', date: '2026-06-13 13:00', groupId: 'E', status: 'upcoming' },
  { id: 26, team1: 'Japan', team2: 'Uruguay', date: '2026-06-13 16:00', groupId: 'E', status: 'upcoming' },
  { id: 27, team1: 'Spain', team2: 'Uruguay', date: '2026-06-17 13:00', groupId: 'E', status: 'upcoming' },
  { id: 28, team1: 'Japan', team2: 'Germany', date: '2026-06-17 19:00', groupId: 'E', status: 'upcoming' },
  { id: 29, team1: 'Germany', team2: 'Spain', date: '2026-06-21 22:00', groupId: 'E', status: 'upcoming' },
  { id: 30, team1: 'Uruguay', team2: 'Japan', date: '2026-06-21 22:00', groupId: 'E', status: 'upcoming' },
  { id: 31, team1: 'Belgium', team2: 'Canada', date: '2026-06-13 10:00', groupId: 'F', status: 'upcoming' },
  { id: 32, team1: 'England', team2: 'Iran', date: '2026-06-13 19:00', groupId: 'F', status: 'upcoming' },
  { id: 33, team1: 'Belgium', team2: 'Iran', date: '2026-06-17 16:00', groupId: 'F', status: 'upcoming' },
  { id: 34, team1: 'England', team2: 'Canada', date: '2026-06-17 22:00', groupId: 'F', status: 'upcoming' },
  { id: 35, team1: 'Iran', team2: 'Belgium', date: '2026-06-22 19:00', groupId: 'F', status: 'upcoming' },
  { id: 36, team1: 'Canada', team2: 'England', date: '2026-06-22 19:00', groupId: 'F', status: 'upcoming' },
  { id: 37, team1: 'Portugal', team2: 'Greece', date: '2026-06-14 13:00', groupId: 'G', status: 'upcoming' },
  { id: 38, team1: 'Italy', team2: 'Ecuador', date: '2026-06-14 16:00', groupId: 'G', status: 'upcoming' },
  { id: 39, team1: 'Portugal', team2: 'Ecuador', date: '2026-06-18 13:00', groupId: 'G', status: 'upcoming' },
  { id: 40, team1: 'Italy', team2: 'Greece', date: '2026-06-18 19:00', groupId: 'G', status: 'upcoming' },
  { id: 41, team1: 'Greece', team2: 'Portugal', date: '2026-06-22 22:00', groupId: 'G', status: 'upcoming' },
  { id: 42, team1: 'Ecuador', team2: 'Italy', date: '2026-06-22 22:00', groupId: 'G', status: 'upcoming' },
  { id: 43, team1: 'South Korea', team2: 'Turkmenistan', date: '2026-06-14 10:00', groupId: 'H', status: 'upcoming' },
  { id: 44, team1: 'Australia', team2: 'Saudi Arabia', date: '2026-06-14 19:00', groupId: 'H', status: 'upcoming' },
  { id: 45, team1: 'South Korea', team2: 'Saudi Arabia', date: '2026-06-18 16:00', groupId: 'H', status: 'upcoming' },
  { id: 46, team1: 'Australia', team2: 'Turkmenistan', date: '2026-06-18 22:00', groupId: 'H', status: 'upcoming' },
  { id: 47, team1: 'Turkmenistan', team2: 'South Korea', date: '2026-06-23 19:00', groupId: 'H', status: 'upcoming' },
  { id: 48, team1: 'Saudi Arabia', team2: 'Australia', date: '2026-06-23 19:00', groupId: 'H', status: 'upcoming' },
  { id: 49, team1: 'Colombia', team2: 'Hungary', date: '2026-06-19 10:00', groupId: 'I', status: 'upcoming' },
  { id: 50, team1: 'Cameroon', team2: 'Chad', date: '2026-06-19 13:00', groupId: 'I', status: 'upcoming' },
  { id: 51, team1: 'Colombia', team2: 'Chad', date: '2026-06-23 13:00', groupId: 'I', status: 'upcoming' },
  { id: 52, team1: 'Cameroon', team2: 'Hungary', date: '2026-06-23 16:00', groupId: 'I', status: 'upcoming' },
  { id: 53, team1: 'Hungary', team2: 'Colombia', date: '2026-06-27 19:00', groupId: 'I', status: 'upcoming' },
  { id: 54, team1: 'Chad', team2: 'Cameroon', date: '2026-06-27 19:00', groupId: 'I', status: 'upcoming' },
  { id: 55, team1: 'Ukraine', team2: 'Uzbekistan', date: '2026-06-20 10:00', groupId: 'J', status: 'upcoming' },
  { id: 56, team1: 'Norway', team2: 'Algeria', date: '2026-06-20 13:00', groupId: 'J', status: 'upcoming' },
  { id: 57, team1: 'Ukraine', team2: 'Algeria', date: '2026-06-24 13:00', groupId: 'J', status: 'upcoming' },
  { id: 58, team1: 'Norway', team2: 'Uzbekistan', date: '2026-06-24 16:00', groupId: 'J', status: 'upcoming' },
  { id: 59, team1: 'Uzbekistan', team2: 'Ukraine', date: '2026-06-27 22:00', groupId: 'J', status: 'upcoming' },
  { id: 60, team1: 'Algeria', team2: 'Norway', date: '2026-06-27 22:00', groupId: 'J', status: 'upcoming' },
  { id: 61, team1: 'Turkey', team2: 'Bolivia', date: '2026-06-21 10:00', groupId: 'K', status: 'upcoming' },
  { id: 62, team1: 'Oman', team2: 'Guatemala', date: '2026-06-21 13:00', groupId: 'K', status: 'upcoming' },
  { id: 63, team1: 'Turkey', team2: 'Guatemala', date: '2026-06-25 13:00', groupId: 'K', status: 'upcoming' },
  { id: 64, team1: 'Oman', team2: 'Bolivia', date: '2026-06-25 16:00', groupId: 'K', status: 'upcoming' },
  { id: 65, team1: 'Bolivia', team2: 'Turkey', date: '2026-06-28 19:00', groupId: 'K', status: 'upcoming' },
  { id: 66, team1: 'Guatemala', team2: 'Oman', date: '2026-06-28 19:00', groupId: 'K', status: 'upcoming' },
  { id: 67, team1: 'Egypt', team2: 'Vietnam', date: '2026-06-22 10:00', groupId: 'L', status: 'upcoming' },
  { id: 68, team1: 'New Zealand', team2: 'Jamaica', date: '2026-06-22 13:00', groupId: 'L', status: 'upcoming' },
  { id: 69, team1: 'Egypt', team2: 'Jamaica', date: '2026-06-25 22:00', groupId: 'L', status: 'upcoming' },
  { id: 70, team1: 'New Zealand', team2: 'Vietnam', date: '2026-06-26 01:00', groupId: 'L', status: 'upcoming' },
  { id: 71, team1: 'Vietnam', team2: 'Egypt', date: '2026-06-28 22:00', groupId: 'L', status: 'upcoming' },
  { id: 72, team1: 'Jamaica', team2: 'New Zealand', date: '2026-06-28 22:00', groupId: 'L', status: 'upcoming' }
];

async function connectDatabase() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fifa2026',
    multipleStatements: true
  };

  pool = mysql.createPool(dbConfig);
  await createTables();
  await seedDatabase();
}

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function createTables() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      mobile VARCHAR(20) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      pin VARCHAR(64) NOT NULL,
      admin TINYINT(1) NOT NULL DEFAULT 0,
      active TINYINT(1) NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS matches (
      id INT PRIMARY KEY,
      team1 VARCHAR(100) NOT NULL,
      team2 VARCHAR(100) NOT NULL,
      date DATETIME NOT NULL,
      groupId CHAR(1) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'upcoming',
      actual_score_a INT NULL,
      actual_score_b INT NULL
    );
    CREATE TABLE IF NOT EXISTS predictions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(20) NOT NULL,
      match_id INT NOT NULL,
      predicted_score_a INT NULL,
      predicted_score_b INT NULL,
      predicted_outcome VARCHAR(20) NULL,
      prediction_date DATE NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mobile) REFERENCES users(mobile)
    );
    CREATE TABLE IF NOT EXISTS bonus_predictions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(20) NOT NULL,
      world_cup_winner VARCHAR(100),
      runner_up VARCHAR(100),
      golden_boot VARCHAR(100),
      best_goalkeeper VARCHAR(100),
      top_scoring_team VARCHAR(100),
      prediction_date DATE NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mobile) REFERENCES users(mobile),
      UNIQUE KEY (mobile, prediction_date)
    );
    CREATE TABLE IF NOT EXISTS bonus_results (
      id INT PRIMARY KEY,
      world_cup_winner VARCHAR(100),
      runner_up VARCHAR(100),
      golden_boot VARCHAR(100),
      best_goalkeeper VARCHAR(100),
      top_scoring_team VARCHAR(100)
    );
  `);
}

async function seedDatabase() {
  const userCount = await query('SELECT COUNT(*) AS count FROM users');
  if (userCount[0].count === 0) {
    const userInserts = defaultUsers.map(user => [user.mobile, user.name, user.pin, user.admin, user.active]);
    await pool.query(
      'INSERT INTO users (mobile, name, pin, admin, active) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
      [userInserts]
    );
  }

  const matchCount = await query('SELECT COUNT(*) AS count FROM matches');
  if (matchCount[0].count === 0) {
    const matchInserts = matchSeeds.map(match => [
      match.id,
      match.team1,
      match.team2,
      match.date,
      match.groupId,
      match.status,
      null,
      null
    ]);
    await pool.query(
      'INSERT INTO matches (id, team1, team2, date, groupId, status, actual_score_a, actual_score_b) VALUES ?',
      [matchInserts]
    );
  }

  const bonusCount = await query('SELECT COUNT(*) AS count FROM bonus_results');
  if (bonusCount[0].count === 0) {
    await pool.execute(
      'INSERT INTO bonus_results (id, world_cup_winner, runner_up, golden_boot, best_goalkeeper, top_scoring_team) VALUES (1, ?, ?, ?, ?, ?)',
      ['', '', '', '', '']
    );
  }
}

function createSessionToken() {
  return crypto.randomBytes(24).toString('hex');
}

async function getUserByMobile(mobile) {
  const rows = await query('SELECT mobile, name, admin, active FROM users WHERE mobile = ?', [mobile]);
  return rows[0] || null;
}

async function verifyCredentials(mobile, pin) {
  const rows = await query('SELECT mobile, name, admin, active FROM users WHERE mobile = ? AND pin = ?', [mobile, pin]);
  return rows[0] || null;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token.' });
  }

  const token = authHeader.substring(7);
  const session = sessions[token];
  if (!session || session.expires < Date.now()) {
    return res.status(401).json({ error: 'Session expired or invalid.' });
  }

  session.expires = Date.now() + SESSION_TTL;
  req.session = session;
  next();
}

async function requireAdmin(req, res, next) {
  const user = await getUserByMobile(req.session.mobile);
  if (!user || !user.admin) {
    return res.status(403).json({ error: 'Admin privileges required.' });
  }
  req.user = user;
  next();
}

function normalizeText(value) {
  return value ? String(value).trim().toLowerCase() : '';
}

function calculateMatchPoints(match, prediction) {
  if (match.actual_score_a == null || match.actual_score_b == null) {
    return { points: 0, exactScore: false, correctResult: false, pending: true };
  }

  const actualA = match.actual_score_a;
  const actualB = match.actual_score_b;
  const predictedA = prediction.predicted_score_a;
  const predictedB = prediction.predicted_score_b;
  const predictedOutcome = prediction.predicted_outcome;

  const actualOutcome = actualA > actualB ? 'team1' : actualA < actualB ? 'team2' : 'draw';
  const predictedOutcomeResolved = typeof predictedOutcome === 'string' && predictedOutcome ? predictedOutcome : (predictedA > predictedB ? 'team1' : predictedA < predictedB ? 'team2' : 'draw');

  const exactScore = predictedA === actualA && predictedB === actualB;
  const exactDiff = (predictedA - predictedB) === (actualA - actualB);
  const correctResult = predictedOutcomeResolved === actualOutcome;

  if (exactScore) return { points: 10, exactScore: true, correctResult: true, pending: false };
  if (exactDiff && correctResult) return { points: 5, exactScore: false, correctResult: true, pending: false };
  if (correctResult) return { points: 3, exactScore: false, correctResult: true, pending: false };
  return { points: 0, exactScore: false, correctResult: false, pending: false };
}

function calculateBonusPoints(predictedBonus, actualBonus) {
  let points = 0;
  if (!predictedBonus) return points;
  const compare = (a, b) => normalizeText(a) === normalizeText(b);

  if (predictedBonus.worldCupWinner && compare(predictedBonus.worldCupWinner, actualBonus.world_cup_winner)) points += 50;
  if (predictedBonus.runnerUp && compare(predictedBonus.runnerUp, actualBonus.runner_up)) points += 25;
  if (predictedBonus.goldenBoot && compare(predictedBonus.goldenBoot, actualBonus.golden_boot)) points += 30;
  if (predictedBonus.bestGoalkeeper && compare(predictedBonus.bestGoalkeeper, actualBonus.best_goalkeeper)) points += 20;
  if (predictedBonus.topScoringTeam && compare(predictedBonus.topScoringTeam, actualBonus.top_scoring_team)) points += 20;

  return points;
}

async function buildLeaderboard() {
  const matches = await query('SELECT * FROM matches');
  const predictions = await query(`
    SELECT p.*, u.name
    FROM predictions p
    JOIN users u ON u.mobile = p.mobile
  `);
  const bonusRows = await query('SELECT * FROM bonus_predictions');
  const bonusResultRows = await query('SELECT * FROM bonus_results WHERE id = 1');
  const actualBonus = bonusResultRows[0] || {};

  const userScores = {};
  predictions.forEach(prediction => {
    const key = prediction.mobile;
    if (!userScores[key]) {
      userScores[key] = {
        mobile: prediction.mobile,
        name: prediction.name,
        totalPoints: 0,
        exactScores: 0,
        correctResults: 0,
        predictions: 0,
        earliestSubmission: prediction.created_at
      };
    }

    const user = userScores[key];
    if (new Date(prediction.created_at) < new Date(user.earliestSubmission)) {
      user.earliestSubmission = prediction.created_at;
    }

    const match = matches.find(m => m.id === prediction.match_id);
    if (!match) return;
    const result = calculateMatchPoints(match, prediction);
    user.totalPoints += result.points;
    if (result.exactScore) user.exactScores += 1;
    if (result.correctResult) user.correctResults += 1;
    user.predictions += 1;
  });

  const bonusMap = bonusRows.reduce((acc, row) => {
    acc[row.mobile] = row;
    return acc;
  }, {});

  Object.values(userScores).forEach(user => {
    const bonusEntry = bonusMap[user.mobile];
    user.bonusPoints = calculateBonusPoints(bonusEntry || {}, actualBonus);
    user.totalPoints += user.bonusPoints;
  });

  return Object.values(userScores).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
    if (b.correctResults !== a.correctResults) return b.correctResults - a.correctResults;
    return new Date(a.earliestSubmission) - new Date(b.earliestSubmission);
  }).slice(0, 10);
}

app.post('/api/login', async (req, res) => {
  const { mobile, pin } = req.body || {};
  if (!mobile || !pin) {
    return res.status(400).json({ error: 'Mobile and PIN are required.' });
  }

  const user = await verifyCredentials(mobile, pin);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  if (!user.active) {
    return res.status(403).json({ error: 'Account is inactive.' });
  }

  const token = createSessionToken();
  sessions[token] = {
    mobile: user.mobile,
    expires: Date.now() + SESSION_TTL
  };

  res.json({ token, user });
});

app.get('/api/me', authenticateToken, async (req, res) => {
  const user = await getUserByMobile(req.session.mobile);
  if (!user) {
    return res.status(401).json({ error: 'Session is invalid.' });
  }
  res.json({ user });
});

app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const users = await query('SELECT mobile, name, admin, active FROM users');
  res.json({ users });
});

app.post('/api/users/toggle', authenticateToken, requireAdmin, async (req, res) => {
  const { mobile } = req.body || {};
  if (!mobile) {
    return res.status(400).json({ error: 'Mobile is required.' });
  }

  const users = await query('SELECT * FROM users WHERE mobile = ?', [mobile]);
  if (!users[0]) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const targetUser = users[0];
  if (targetUser.admin && targetUser.mobile === req.session.mobile) {
    return res.status(400).json({ error: 'Cannot deactivate the current logged-in admin.' });
  }

  const newStatus = targetUser.active ? 0 : 1;
  await query('UPDATE users SET active = ? WHERE mobile = ?', [newStatus, mobile]);
  res.json({ success: true, active: Boolean(newStatus) });
});

app.post('/api/users/reset-pin', authenticateToken, requireAdmin, async (req, res) => {
  const { mobile, newPin } = req.body || {};
  if (!mobile || !newPin) {
    return res.status(400).json({ error: 'Mobile and new PIN are required.' });
  }
  if (newPin.length < 4) {
    return res.status(400).json({ error: 'PIN must be at least 4 digits.' });
  }

  await query('UPDATE users SET pin = ? WHERE mobile = ?', [newPin, mobile]);
  res.json({ success: true });
});

app.get('/api/matches', async (req, res) => {
  const matches = await query('SELECT * FROM matches ORDER BY date ASC');
  const bonusResults = await query('SELECT * FROM bonus_results WHERE id = 1');
  res.json({ matches, bonusResults: bonusResults[0] || {} });
});

app.post('/api/matches/:id', authenticateToken, requireAdmin, async (req, res) => {
  const matchId = parseInt(req.params.id, 10);
  const { actualScoreA, actualScoreB, status } = req.body || {};

  if (Number.isNaN(matchId)) {
    return res.status(400).json({ error: 'Invalid match id.' });
  }
  if (!Number.isInteger(actualScoreA) || !Number.isInteger(actualScoreB) || !status) {
    return res.status(400).json({ error: 'Score and status are required.' });
  }

  await query('UPDATE matches SET actual_score_a = ?, actual_score_b = ?, status = ? WHERE id = ?', [actualScoreA, actualScoreB, status, matchId]);
  res.json({ success: true });
});

app.get('/api/bonus-results', async (req, res) => {
  const bonusResults = await query('SELECT * FROM bonus_results WHERE id = 1');
  res.json({ bonusResults: bonusResults[0] || {} });
});

app.post('/api/bonus-results', authenticateToken, requireAdmin, async (req, res) => {
  const { worldCupWinner, runnerUp, goldenBoot, bestGoalkeeper, topScoringTeam } = req.body || {};
  await query(
    'UPDATE bonus_results SET world_cup_winner = ?, runner_up = ?, golden_boot = ?, best_goalkeeper = ?, top_scoring_team = ? WHERE id = 1',
    [worldCupWinner || '', runnerUp || '', goldenBoot || '', bestGoalkeeper || '', topScoringTeam || '']
  );
  res.json({ success: true });
});

app.post('/api/predictions', authenticateToken, async (req, res) => {
  const { date, predictions, bonusPredictions } = req.body || {};
  if (!date || !Array.isArray(predictions)) {
    return res.status(400).json({ error: 'Date and predictions are required.' });
  }

  const predictionDate = new Date(date);
  if (Number.isNaN(predictionDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format.' });
  }

  await query('DELETE FROM predictions WHERE mobile = ? AND prediction_date = ?', [req.session.mobile, date]);
  await query('DELETE FROM bonus_predictions WHERE mobile = ? AND prediction_date = ?', [req.session.mobile, date]);

  const predictionRows = predictions.map(pred => [
    req.session.mobile,
    pred.matchId,
    pred.predictedScoreA,
    pred.predictedScoreB,
    pred.predictedOutcome,
    date
  ]);

  if (predictionRows.length) {
    await pool.query(
      'INSERT INTO predictions (mobile, match_id, predicted_score_a, predicted_score_b, predicted_outcome, prediction_date) VALUES ?',
      [predictionRows]
    );
  }

  await pool.execute(
    'INSERT INTO bonus_predictions (mobile, world_cup_winner, runner_up, golden_boot, best_goalkeeper, top_scoring_team, prediction_date) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE world_cup_winner = VALUES(world_cup_winner), runner_up = VALUES(runner_up), golden_boot = VALUES(golden_boot), best_goalkeeper = VALUES(best_goalkeeper), top_scoring_team = VALUES(top_scoring_team)',
    [
      req.session.mobile,
      bonusPredictions.worldCupWinner || '',
      bonusPredictions.runnerUp || '',
      bonusPredictions.goldenBoot || '',
      bonusPredictions.bestGoalkeeper || '',
      bonusPredictions.topScoringTeam || '',
      date
    ]
  );

  res.json({ success: true });
});

app.get('/api/predictions', authenticateToken, async (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: 'Date is required.' });
  }

  const predictions = await query('SELECT * FROM predictions WHERE mobile = ? AND prediction_date = ?', [req.session.mobile, date]);
  const bonusRows = await query('SELECT * FROM bonus_predictions WHERE mobile = ? AND prediction_date = ?', [req.session.mobile, date]);
  res.json({ predictions, bonusPrediction: bonusRows[0] || null });
});

app.get('/api/leaderboard', async (req, res) => {
  const leaderboard = await buildLeaderboard();
  res.json({ leaderboard });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to start backend:', error);
    process.exit(1);
  });
