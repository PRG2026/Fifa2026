// Data Management
const gameData = {
    matches: [
        // Group A
        { id: 1, team1: "United States", team2: "Canada", date: "2026-06-11 13:00", group: "A", status: "upcoming" },
        { id: 2, team1: "Mexico", team2: "Morocco", date: "2026-06-11 16:00", group: "A", status: "upcoming" },
        { id: 3, team1: "Canada", team2: "Morocco", date: "2026-06-15 13:00", group: "A", status: "upcoming" },
        { id: 4, team1: "Mexico", team2: "United States", date: "2026-06-15 19:00", group: "A", status: "upcoming" },
        { id: 5, team1: "Canada", team2: "United States", date: "2026-06-19 19:00", group: "A", status: "upcoming" },
        { id: 6, team1: "Morocco", team2: "Mexico", date: "2026-06-19 19:00", group: "A", status: "upcoming" },
        // Group B
        { id: 7, team1: "Argentina", team2: "Paraguay", date: "2026-06-11 10:00", group: "B", status: "upcoming" },
        { id: 8, team1: "Peru", team2: "Denmark", date: "2026-06-11 19:00", group: "B", status: "upcoming" },
        { id: 9, team1: "Argentina", team2: "Denmark", date: "2026-06-15 16:00", group: "B", status: "upcoming" },
        { id: 10, team1: "Peru", team2: "Paraguay", date: "2026-06-15 22:00", group: "B", status: "upcoming" },
        { id: 11, team1: "Denmark", team2: "Argentina", date: "2026-06-20 19:00", group: "B", status: "upcoming" },
        { id: 12, team1: "Paraguay", team2: "Peru", date: "2026-06-20 19:00", group: "B", status: "upcoming" },
        // Group C
        { id: 13, team1: "France", team2: "Netherlands", date: "2026-06-12 13:00", group: "C", status: "upcoming" },
        { id: 14, team1: "Poland", team2: "Senegal", date: "2026-06-12 16:00", group: "C", status: "upcoming" },
        { id: 15, team1: "France", team2: "Senegal", date: "2026-06-16 13:00", group: "C", status: "upcoming" },
        { id: 16, team1: "Poland", team2: "Netherlands", date: "2026-06-16 19:00", group: "C", status: "upcoming" },
        { id: 17, team1: "Netherlands", team2: "France", date: "2026-06-20 22:00", group: "C", status: "upcoming" },
        { id: 18, team1: "Senegal", team2: "Poland", date: "2026-06-20 22:00", group: "C", status: "upcoming" },
        // Group D
        { id: 19, team1: "Brazil", team2: "Serbia", date: "2026-06-12 10:00", group: "D", status: "upcoming" },
        { id: 20, team1: "Switzerland", team2: "Costa Rica", date: "2026-06-12 19:00", group: "D", status: "upcoming" },
        { id: 21, team1: "Brazil", team2: "Costa Rica", date: "2026-06-16 16:00", group: "D", status: "upcoming" },
        { id: 22, team1: "Switzerland", team2: "Serbia", date: "2026-06-16 22:00", group: "D", status: "upcoming" },
        { id: 23, team1: "Serbia", team2: "Brazil", date: "2026-06-21 19:00", group: "D", status: "upcoming" },
        { id: 24, team1: "Costa Rica", team2: "Switzerland", date: "2026-06-21 19:00", group: "D", status: "upcoming" },
        // Group E
        { id: 25, team1: "Spain", team2: "Germany", date: "2026-06-13 13:00", group: "E", status: "upcoming" },
        { id: 26, team1: "Japan", team2: "Uruguay", date: "2026-06-13 16:00", group: "E", status: "upcoming" },
        { id: 27, team1: "Spain", team2: "Uruguay", date: "2026-06-17 13:00", group: "E", status: "upcoming" },
        { id: 28, team1: "Japan", team2: "Germany", date: "2026-06-17 19:00", group: "E", status: "upcoming" },
        { id: 29, team1: "Germany", team2: "Spain", date: "2026-06-21 22:00", group: "E", status: "upcoming" },
        { id: 30, team1: "Uruguay", team2: "Japan", date: "2026-06-21 22:00", group: "E", status: "upcoming" },
        // Group F
        { id: 31, team1: "Belgium", team2: "Canada", date: "2026-06-13 10:00", group: "F", status: "upcoming" },
        { id: 32, team1: "England", team2: "Iran", date: "2026-06-13 19:00", group: "F", status: "upcoming" },
        { id: 33, team1: "Belgium", team2: "Iran", date: "2026-06-17 16:00", group: "F", status: "upcoming" },
        { id: 34, team1: "England", team2: "Canada", date: "2026-06-17 22:00", group: "F", status: "upcoming" },
        { id: 35, team1: "Iran", team2: "Belgium", date: "2026-06-22 19:00", group: "F", status: "upcoming" },
        { id: 36, team1: "Canada", team2: "England", date: "2026-06-22 19:00", group: "F", status: "upcoming" },
        // Group G
        { id: 37, team1: "Portugal", team2: "Greece", date: "2026-06-14 13:00", group: "G", status: "upcoming" },
        { id: 38, team1: "Italy", team2: "Ecuador", date: "2026-06-14 16:00", group: "G", status: "upcoming" },
        { id: 39, team1: "Portugal", team2: "Ecuador", date: "2026-06-18 13:00", group: "G", status: "upcoming" },
        { id: 40, team1: "Italy", team2: "Greece", date: "2026-06-18 19:00", group: "G", status: "upcoming" },
        { id: 41, team1: "Greece", team2: "Portugal", date: "2026-06-22 22:00", group: "G", status: "upcoming" },
        { id: 42, team1: "Ecuador", team2: "Italy", date: "2026-06-22 22:00", group: "G", status: "upcoming" },
        // Group H
        { id: 43, team1: "South Korea", team2: "Turkmenistan", date: "2026-06-14 10:00", group: "H", status: "upcoming" },
        { id: 44, team1: "Australia", team2: "Saudi Arabia", date: "2026-06-14 19:00", group: "H", status: "upcoming" },
        { id: 45, team1: "South Korea", team2: "Saudi Arabia", date: "2026-06-18 16:00", group: "H", status: "upcoming" },
        { id: 46, team1: "Australia", team2: "Turkmenistan", date: "2026-06-18 22:00", group: "H", status: "upcoming" },
        { id: 47, team1: "Turkmenistan", team2: "South Korea", date: "2026-06-23 19:00", group: "H", status: "upcoming" },
        { id: 48, team1: "Saudi Arabia", team2: "Australia", date: "2026-06-23 19:00", group: "H", status: "upcoming" },
        // Group I
        { id: 49, team1: "Colombia", team2: "Hungary", date: "2026-06-19 10:00", group: "I", status: "upcoming" },
        { id: 50, team1: "Cameroon", team2: "Chad", date: "2026-06-19 13:00", group: "I", status: "upcoming" },
        { id: 51, team1: "Colombia", team2: "Chad", date: "2026-06-23 13:00", group: "I", status: "upcoming" },
        { id: 52, team1: "Cameroon", team2: "Hungary", date: "2026-06-23 16:00", group: "I", status: "upcoming" },
        { id: 53, team1: "Hungary", team2: "Colombia", date: "2026-06-27 19:00", group: "I", status: "upcoming" },
        { id: 54, team1: "Chad", team2: "Cameroon", date: "2026-06-27 19:00", group: "I", status: "upcoming" },
        // Group J
        { id: 55, team1: "Ukraine", team2: "Uzbekistan", date: "2026-06-20 10:00", group: "J", status: "upcoming" },
        { id: 56, team1: "Norway", team2: "Algeria", date: "2026-06-20 13:00", group: "J", status: "upcoming" },
        { id: 57, team1: "Ukraine", team2: "Algeria", date: "2026-06-24 13:00", group: "J", status: "upcoming" },
        { id: 58, team1: "Norway", team2: "Uzbekistan", date: "2026-06-24 16:00", group: "J", status: "upcoming" },
        { id: 59, team1: "Uzbekistan", team2: "Ukraine", date: "2026-06-27 22:00", group: "J", status: "upcoming" },
        { id: 60, team1: "Algeria", team2: "Norway", date: "2026-06-27 22:00", group: "J", status: "upcoming" },
        // Group K
        { id: 61, team1: "Turkey", team2: "Bolivia", date: "2026-06-21 10:00", group: "K", status: "upcoming" },
        { id: 62, team1: "Oman", team2: "Guatemala", date: "2026-06-21 13:00", group: "K", status: "upcoming" },
        { id: 63, team1: "Turkey", team2: "Guatemala", date: "2026-06-25 13:00", group: "K", status: "upcoming" },
        { id: 64, team1: "Oman", team2: "Bolivia", date: "2026-06-25 16:00", group: "K", status: "upcoming" },
        { id: 65, team1: "Bolivia", team2: "Turkey", date: "2026-06-28 19:00", group: "K", status: "upcoming" },
        { id: 66, team1: "Guatemala", team2: "Oman", date: "2026-06-28 19:00", group: "K", status: "upcoming" },
        // Group L
        { id: 67, team1: "Egypt", team2: "Vietnam", date: "2026-06-22 10:00", group: "L", status: "upcoming" },
        { id: 68, team1: "New Zealand", team2: "Jamaica", date: "2026-06-22 13:00", group: "L", status: "upcoming" },
        { id: 69, team1: "Egypt", team2: "Jamaica", date: "2026-06-25 22:00", group: "L", status: "upcoming" },
        { id: 70, team1: "New Zealand", team2: "Vietnam", date: "2026-06-26 01:00", group: "L", status: "upcoming" },
        { id: 71, team1: "Vietnam", team2: "Egypt", date: "2026-06-28 22:00", group: "L", status: "upcoming" },
        { id: 72, team1: "Jamaica", team2: "New Zealand", date: "2026-06-28 22:00", group: "L", status: "upcoming" }
    ],
    groups: {
        A: [
            { name: "United States", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Mexico", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Canada", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Morocco", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        B: [
            { name: "Argentina", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Paraguay", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Peru", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Denmark", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        C: [
            { name: "France", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Netherlands", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Poland", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Senegal", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        D: [
            { name: "Brazil", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Serbia", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Switzerland", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Costa Rica", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        E: [
            { name: "Spain", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Germany", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Japan", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Uruguay", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        F: [
            { name: "Belgium", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "England", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Canada", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Iran", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        G: [
            { name: "Portugal", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Italy", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Greece", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Ecuador", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        H: [
            { name: "South Korea", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Australia", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Turkmenistan", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Saudi Arabia", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        I: [
            { name: "Colombia", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Cameroon", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Hungary", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Chad", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        J: [
            { name: "Ukraine", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Norway", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Uzbekistan", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Algeria", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        K: [
            { name: "Turkey", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Oman", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Bolivia", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Guatemala", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ],
        L: [
            { name: "Egypt", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "New Zealand", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Vietnam", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: "Jamaica", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
        ]
    },
    bonusResults: {
        worldCupWinner: "",
        runnerUp: "",
        goldenBoot: "",
        bestGoalkeeper: "",
        topScoringTeam: ""
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

const STORAGE_KEYS = {
    users: 'fifa2026Users',
    predictions: 'fifa2026Predictions',
    gameState: 'fifa2026GameState',
    currentUser: 'fifa2026CurrentUser'
};

const DEFAULT_USERS = [
    { mobile: '9999999999', name: 'Admin', pin: '0000', admin: true, active: true },
    { mobile: '7000000001', name: 'Ayesha', pin: '1111', admin: false, active: true },
    { mobile: '7000000002', name: 'Rohan', pin: '2222', admin: false, active: true },
    { mobile: '7000000003', name: 'Maya', pin: '3333', admin: false, active: true }
];

let currentUser = null;

function loadUsers() {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.users));
    if (!Array.isArray(stored) || stored.length === 0) {
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(DEFAULT_USERS));
        return [...DEFAULT_USERS];
    }
    return stored;
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getUserByMobile(mobile) {
    if (!mobile) return null;
    const users = loadUsers();
    return users.find(user => user.mobile === mobile) || null;
}

function setCurrentUser(user) {
    currentUser = user;
    if (user) {
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify({ mobile: user.mobile }));
    } else {
        localStorage.removeItem(STORAGE_KEYS.currentUser);
    }
    updateAuthUI();
}

function restoreCurrentUser() {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser) || 'null');
    if (!stored || !stored.mobile) {
        currentUser = null;
        return;
    }
    currentUser = getUserByMobile(stored.mobile);
}

function loadSavedGameState() {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.gameState) || '{}');
    const overrides = stored.matches || {};
    gameData.matches.forEach(match => {
        const saved = overrides[match.id];
        if (saved) {
            if (typeof saved.actualScoreA === 'number') match.actualScoreA = saved.actualScoreA;
            if (typeof saved.actualScoreB === 'number') match.actualScoreB = saved.actualScoreB;
            if (saved.status) match.status = saved.status;
        }
    });
    if (stored.bonusResults) {
        gameData.bonusResults = { ...gameData.bonusResults, ...stored.bonusResults };
    }
}

function saveGameState() {
    const matchState = {};
    gameData.matches.forEach(match => {
        if (typeof match.actualScoreA === 'number' || typeof match.actualScoreB === 'number' || match.status !== 'upcoming') {
            matchState[match.id] = {
                actualScoreA: match.actualScoreA,
                actualScoreB: match.actualScoreB,
                status: match.status || 'upcoming'
            };
        }
    });

    localStorage.setItem(STORAGE_KEYS.gameState, JSON.stringify({
        matches: matchState,
        bonusResults: gameData.bonusResults
    }));
}

function showSection(sectionId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
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

function loginUser() {
    const mobile = document.getElementById('loginMobile').value.trim();
    const pin = document.getElementById('loginPin').value.trim();
    if (!mobile || !pin) {
        alert('Please enter both mobile number and PIN.');
        return;
    }

    const user = getUserByMobile(mobile);
    if (!user) {
        alert('Mobile number not found. Please contact admin to register.');
        return;
    }
    if (!user.active) {
        alert('This account is inactive. Ask admin to activate the user.');
        return;
    }
    if (user.pin !== pin) {
        alert('Invalid PIN. Please try again.');
        return;
    }

    setCurrentUser(user);
    document.getElementById('loginMobile').value = '';
    document.getElementById('loginPin').value = '';
    renderMatches();
    loadLeaderboard();
    renderSchedule();
    renderStandings();
    if (currentUser.admin) {
        renderAdminUsers();
        renderAdminMatches();
        renderAdminBonus();
    }
}

function logout() {
    setCurrentUser(null);
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    const loginSection = document.getElementById('login');
    if (loginSection) loginSection.classList.add('active');
}

function changePin() {
    if (!currentUser) {
        alert('You must be logged in to change your PIN.');
        return;
    }

    const oldPin = document.getElementById('oldPin').value.trim();
    const newPin = document.getElementById('newPin').value.trim();
    const confirmPin = document.getElementById('confirmPin').value.trim();

    if (!oldPin || !newPin || !confirmPin) {
        alert('Please fill out all PIN fields.');
        return;
    }
    if (oldPin !== currentUser.pin) {
        alert('Old PIN does not match.');
        return;
    }
    if (newPin.length < 4) {
        alert('New PIN should be at least 4 digits.');
        return;
    }
    if (newPin !== confirmPin) {
        alert('New PIN and confirmation PIN do not match.');
        return;
    }

    const users = loadUsers();
    const user = users.find(u => u.mobile === currentUser.mobile);
    if (user) {
        user.pin = newPin;
        saveUsers(users);
        currentUser.pin = newPin;
        setCurrentUser(currentUser);
        alert('Your PIN has been updated successfully.');
        document.getElementById('oldPin').value = '';
        document.getElementById('newPin').value = '';
        document.getElementById('confirmPin').value = '';
    }
}

function renderAdminUsers() {
    const container = document.getElementById('adminUsersContainer');
    if (!container) return;

    const users = loadUsers();
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
}

function toggleUserActive(mobile) {
    const users = loadUsers();
    const user = users.find(u => u.mobile === mobile);
    if (!user) return;
    if (currentUser && currentUser.mobile === user.mobile && user.admin) {
        alert('You cannot deactivate the currently logged-in admin account.');
        return;
    }
    user.active = !user.active;
    saveUsers(users);
    if (currentUser && currentUser.mobile === user.mobile) {
        currentUser = user;
        if (!user.active) logout();
    }
    renderAdminUsers();
}

function resetUserPin(mobile) {
    const users = loadUsers();
    const user = users.find(u => u.mobile === mobile);
    if (!user) return;

    const newPin = prompt(`Enter a new PIN for ${user.name} (${user.mobile}):`, user.pin || '');
    if (!newPin) return;
    if (newPin.length < 4) {
        alert('PIN must be at least 4 digits.');
        return;
    }

    user.pin = newPin;
    saveUsers(users);
    alert(`PIN updated for ${user.name}.`);
}

function renderAdminMatches() {
    const container = document.getElementById('adminMatchesContainer');
    if (!container) return;

    const matches = [...gameData.matches].sort((a, b) => parseUTCDateString(a.date) - parseUTCDateString(b.date));
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

function updateMatchResult(matchId) {
    const match = gameData.matches.find(m => m.id === matchId);
    if (!match) return;

    const scoreA = parseInt(document.getElementById(`adminScoreA-${matchId}`).value, 10);
    const scoreB = parseInt(document.getElementById(`adminScoreB-${matchId}`).value, 10);
    const status = document.getElementById(`adminMatchStatus-${matchId}`).value;

    if (isNaN(scoreA) || isNaN(scoreB)) {
        alert('Please enter both actual scores before saving.');
        return;
    }

    match.actualScoreA = scoreA;
    match.actualScoreB = scoreB;
    match.status = status;
    saveGameState();
    renderSchedule();
    renderStandings();
    loadLeaderboard();
    renderAdminMatches();
    alert('Match result updated successfully.');
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

function saveAdminBonus() {
    gameData.bonusResults = {
        worldCupWinner: document.getElementById('adminBonusWinner').value.trim(),
        runnerUp: document.getElementById('adminBonusRunnerUp').value.trim(),
        goldenBoot: document.getElementById('adminBonusGoldenBoot').value.trim(),
        bestGoalkeeper: document.getElementById('adminBonusGoalkeeper').value.trim(),
        topScoringTeam: document.getElementById('adminBonusTopScoringTeam').value.trim()
    };
    saveGameState();
    alert('Bonus results updated successfully.');
    renderAdminBonus();
    loadLeaderboard();
}

function populatePredictionForm() {
    if (!currentUser) return;

    const activeDate = getActivePredictionDate();
    const saved = getSavedPredictionEntry(currentUser.mobile, activeDate);
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

function getSavedPredictionEntry(mobile, date) {
    if (!mobile || !date) return null;
    const allPredictions = JSON.parse(localStorage.getItem(STORAGE_KEYS.predictions)) || [];
    return allPredictions.find(entry => entry.mobile === mobile && entry.date === date) || null;
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
    const predictedOutcomeResolved = typeof predictedOutcome === 'string'
        ? predictedOutcome
        : getMatchOutcome(predictedA, predictedB);

    const exactScore = predictedA === actualA && predictedB === actualB;
    const exactDiff = (predictedA - predictedB) === (actualA - actualB);
    const correctResult = predictedOutcomeResolved === actualOutcome;

    if (exactScore) {
        return { points: 10, exactScore: true, correctResult: true, pending: false };
    }

    if (exactDiff && correctResult) {
        return { points: 5, exactScore: false, correctResult: true, pending: false };
    }

    if (correctResult) {
        return { points: 3, exactScore: false, correctResult: true, pending: false };
    }

    return { points: 0, exactScore: false, correctResult: false, pending: false };
}

function calculateBonusPoints(predictedBonus) {
    const actualBonus = gameData.bonusResults || {};
    let points = 0;

    if (!predictedBonus) return points;
    if (predictedBonus.worldCupWinner && predictedBonus.worldCupWinner.toLowerCase() === (actualBonus.worldCupWinner || '').toLowerCase()) points += 50;
    if (predictedBonus.runnerUp && predictedBonus.runnerUp.toLowerCase() === (actualBonus.runnerUp || '').toLowerCase()) points += 25;
    if (predictedBonus.goldenBoot && predictedBonus.goldenBoot.toLowerCase() === (actualBonus.goldenBoot || '').toLowerCase()) points += 30;
    if (predictedBonus.bestGoalkeeper && predictedBonus.bestGoalkeeper.toLowerCase() === (actualBonus.bestGoalkeeper || '').toLowerCase()) points += 20;
    if (predictedBonus.topScoringTeam && predictedBonus.topScoringTeam.toLowerCase() === (actualBonus.topScoringTeam || '').toLowerCase()) points += 20;

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

function updateBonusVisibility() {
    const user = currentUser;
    const activeDate = getActivePredictionDate();
    const saved = user ? getSavedPredictionEntry(user.mobile, activeDate) : null;
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

function savePredictions() {
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
        alert('Prediction window is locked for the active day. Please wait for the next day.');
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

    const predictionData = {
        name: currentUser.name,
        mobile: currentUser.mobile,
        date: activeDate,
        timestamp: new Date().toISOString(),
        predictions: predictions,
        bonusPredictions: bonusPredictions
    };

    let allPredictions = JSON.parse(localStorage.getItem(STORAGE_KEYS.predictions)) || [];
    const existingIndex = allPredictions.findIndex(entry => entry.mobile === currentUser.mobile && entry.date === activeDate);
    if (existingIndex >= 0) {
        allPredictions[existingIndex] = predictionData;
    } else {
        allPredictions.push(predictionData);
    }

    localStorage.setItem(STORAGE_KEYS.predictions, JSON.stringify(allPredictions));

    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }

    clearPredictions();
    renderMatches();
    loadLeaderboard();
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

// Get prediction status for a specific date
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

    // Get all matches for this IST date
    const matchesForDate = gameData.matches.filter(m => getISTDateOnly(m.date) === matchDateOnly);

    if (matchesForDate.length === 0) return { locked: false, reason: '' };

    // Find the earliest match time in UTC, then compare in IST
    const earliestMatch = matchesForDate.reduce((prev, current) => {
        return parseUTCDateString(prev.date) < parseUTCDateString(current.date) ? prev : current;
    });

    const firstMatchTimeUTC = parseUTCDateString(earliestMatch.date);
    const firstMatchTimeIST = new Date(firstMatchTimeUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    // If current local time is before IST match time, allow predictions
    if (now < firstMatchTimeIST) {
        return { locked: false, reason: '' };
    } else {
        return {
            locked: true,
            reason: `Predictions closed - First match started at ${formatISTTime(earliestMatch.date)}`
        };
    }
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
    if (!dateString) {
        return [];
    }
    return gameData.matches
        .filter(match => getISTDateOnly(match.date) === dateString)
        .sort((a, b) => parseUTCDateString(a.date) - parseUTCDateString(b.date));
}

// Initialize Page
function initializeApp() {
    loadSavedGameState();
    restoreCurrentUser();
    updateAuthUI();
    processDailyResults();
    renderMatches();
    renderSchedule();
    renderStandings();
    loadLeaderboard();
    startLiveUpdates();
}

function getCurrentISTLabel() {
    const now = new Date();
    return now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }) + ' IST';
}

function updateLiveUpdateTime() {
    const label = document.getElementById('lastUpdatedTime');
    if (label) {
        label.textContent = `Last updated: ${getCurrentISTLabel()}`;
    }
}

function updateScheduleAndStandings() {
    renderSchedule();
    renderStandings();
    updateLiveUpdateTime();
}

function startLiveUpdates() {
    updateScheduleAndStandings();
    setInterval(updateScheduleAndStandings, 10 * 60 * 1000);
}

// Render Matches for Predictions - show only active day and lock when the first match starts
function renderMatches() {
    const container = document.getElementById('matchesContainer');
    const infoText = document.getElementById('predictionDayInfo');
    const activeDate = getActivePredictionDate();

    if (!activeDate) {
        container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📅</div><p>No match days are available for prediction.</p></div>`;
        infoText.textContent = 'There are no available match days at the moment.';
        return;
    }

    const now = new Date();
    const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const isToday = activeDate === todayIST;
    const dateString = formatISTDateLabel(`${activeDate} 00:00`);
    const status = getPredictionStatus(activeDate);
    const matchesForDate = getMatchesForPredictionDate(activeDate);

    infoText.textContent = isToday
        ? 'Predictions are open for today only.'
        : `Predictions are open for the next available match day: ${dateString}.`;

    let html = '';
    const sectionClass = status.locked ? 'day-section locked' : 'day-section';
    html += `<div class="${sectionClass}">
        <div class="match-prediction-header">
            <div class="match-date-label">📅 ${dateString}</div>
            <span class="prediction-status ${status.locked ? 'status-locked' : 'status-open'}">
                ${status.locked ? '🔒 Predictions Locked' : '✓ Open for Predictions'}
            </span>
        </div>`;

    if (status.locked) {
        html += `<div class="prediction-deadline">⏰ ${status.reason}</div>`;
    }

    if (matchesForDate.length === 0) {
        html += `<div class="empty-state"><div class="empty-state-icon">📅</div><p>No matches are scheduled for ${dateString}.</p></div>`;
    } else {
        matchesForDate.forEach(match => {
            const inputDisabled = status.locked;
            html += `
                <div class="match-prediction ${inputDisabled ? 'disabled' : ''}">
                    <div class="match-info">
                        <div class="team">
                            <div class="team-name">${match.team1}</div>
                            <input type="number" class="score-team1-${match.id}" min="0" placeholder="Home Goals" ${inputDisabled ? 'disabled' : ''}>
                        </div>
                        <div class="vs">VS</div>
                        <div class="team">
                            <div class="team-name">${match.team2}</div>
                            <input type="number" class="score-team2-${match.id}" min="0" placeholder="Away Goals" ${inputDisabled ? 'disabled' : ''}>
                        </div>
                        <div style="text-align: center; color: #999; font-size: 0.85em;">
                            ${formatISTTime(match.date)}<br>
                            <span style="font-size: 0.80em;">Group ${match.group}</span>
                        </div>
                    </div>
                    <div class="prediction-type">
                        <label>
                            <input type="radio" name="prediction-type-${match.id}" value="team1" ${inputDisabled ? 'disabled' : ''}>
                            <span>${match.team1} Wins</span>
                        </label>
                        <label>
                            <input type="radio" name="prediction-type-${match.id}" value="draw" ${inputDisabled ? 'disabled' : ''}>
                            <span>Draw</span>
                        </label>
                        <label>
                            <input type="radio" name="prediction-type-${match.id}" value="team2" ${inputDisabled ? 'disabled' : ''}>
                            <span>${match.team2} Wins</span>
                        </label>
                    </div>
                    <div class="prediction-deadline">Prediction Deadline: ${formatISTTime(match.date)}</div>
                </div>
            `;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
    populatePredictionForm();
    updateBonusVisibility();
}

// Render Schedule
function renderSchedule() {
    const container = document.getElementById('scheduleContainer');
    let html = '';
    
    // Group matches by IST date
    const matchesByDate = {};
    gameData.matches.forEach(match => {
        const date = getISTDateOnly(match.date);
        if (!matchesByDate[date]) matchesByDate[date] = [];
        matchesByDate[date].push(match);
    });
    
    Object.keys(matchesByDate).sort().forEach(date => {
        html += `<div style="margin-bottom: 20px;">
            <h4 style="color: #1e3c72; background: #f8f9fa; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                📅 ${formatISTDateLabel(`${date} 00:00`)}
            </h4>`;
        
        matchesByDate[date].forEach(match => {
            const hasResult = typeof match.actualScoreA === 'number' && typeof match.actualScoreB === 'number';
            const resultText = hasResult ? `${match.actualScoreA} - ${match.actualScoreB}` : 'VS';
            const statusLabel = hasResult ? 'Completed' : (match.status || 'Upcoming');
            html += `
                <div class="match-card">
                    <div class="match-team"><strong>${match.team1}</strong></div>
                    <div class="match-score">${resultText}</div>
                    <div class="match-team"><strong>${match.team2}</strong></div>
                    <div style="text-align: right; color: #666; font-size: 0.9em;">
                        ${formatISTTime(match.date)}<br>
                        <span style="font-size: 0.85em; color: #999;">Group ${match.group}</span><br>
                        <span style="font-size: 0.80em; color: #444;">${statusLabel}</span>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    });
    
    container.innerHTML = html;
}

// Render Standings
function getComputedStandings() {
    const standings = {};
    Object.keys(gameData.groups).forEach(groupKey => {
        standings[groupKey] = gameData.groups[groupKey].map(team => ({
            ...team,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            gf: 0,
            ga: 0,
            pts: 0
        }));
    });

    gameData.matches.forEach(match => {
        if (typeof match.actualScoreA !== 'number' || typeof match.actualScoreB !== 'number') return;
        const groupStandings = standings[match.group];
        if (!groupStandings) return;

        const homeTeam = groupStandings.find(team => team.name === match.team1);
        const awayTeam = groupStandings.find(team => team.name === match.team2);
        if (!homeTeam || !awayTeam) return;

        homeTeam.played += 1;
        awayTeam.played += 1;
        homeTeam.gf += match.actualScoreA;
        homeTeam.ga += match.actualScoreB;
        awayTeam.gf += match.actualScoreB;
        awayTeam.ga += match.actualScoreA;

        if (match.actualScoreA > match.actualScoreB) {
            homeTeam.won += 1;
            awayTeam.lost += 1;
            homeTeam.pts += 3;
        } else if (match.actualScoreA < match.actualScoreB) {
            awayTeam.won += 1;
            homeTeam.lost += 1;
            awayTeam.pts += 3;
        } else {
            homeTeam.drawn += 1;
            awayTeam.drawn += 1;
            homeTeam.pts += 1;
            awayTeam.pts += 1;
        }
    });

    return standings;
}

function renderStandings() {
    const container = document.getElementById('standingsContainer');
    const standings = getComputedStandings();
    let html = '';
    let anyPlayed = false;

    Object.keys(standings).sort().forEach(groupKey => {
        const group = standings[groupKey];
        const sortedTeams = [...group].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if ((b.gf - b.ga) !== (a.gf - a.ga)) return (b.gf - b.ga) - (a.gf - a.ga);
            return b.gf - a.gf;
        });

        if (group.some(team => team.played > 0)) {
            anyPlayed = true;
        }

        html += `<div class="group-title">Group ${groupKey}</div>`;
        html += `
            <table class="standings-table">
                <thead>
                    <tr>
                        <th>Position</th>
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

        html += `</tbody></table>`;
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

// Load and Display Leaderboard
function loadLeaderboard() {
    const allPredictions = JSON.parse(localStorage.getItem(STORAGE_KEYS.predictions)) || [];
    const container = document.getElementById('leaderboardContainer');

    if (allPredictions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <p>No predictions yet. Start making predictions to see the leaderboard!</p>
            </div>
        `;
        return;
    }

    const userScores = {};
    allPredictions.forEach(entry => {
        const userKey = entry.mobile || entry.name;
        if (!userScores[userKey]) {
            userScores[userKey] = {
                mobile: entry.mobile || userKey,
                name: entry.name || entry.mobile || 'Guest',
                totalPoints: 0,
                exactScores: 0,
                correctResults: 0,
                predictions: 0,
                earliestSubmission: entry.timestamp,
                bonusPoints: 0
            };
        }

        const user = userScores[userKey];
        if (entry.timestamp < user.earliestSubmission) {
            user.earliestSubmission = entry.timestamp;
        }

        entry.predictions.forEach(pred => {
            const match = gameData.matches.find(m => m.id === pred.matchId);
            if (!match) return;
            const result = calculateMatchPoints(match, pred);
            user.totalPoints += result.points;
            user.predictions += 1;
            if (result.exactScore) user.exactScores += 1;
            if (result.correctResult) user.correctResults += 1;
        });

        const bonusPoints = calculateBonusPoints(entry.bonusPredictions);
        user.bonusPoints += bonusPoints;
        user.totalPoints += bonusPoints;
    });

    const leaderboard = Object.values(userScores).sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
        if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
        if (b.correctResults !== a.correctResults) return b.correctResults - a.correctResults;
        return new Date(a.earliestSubmission) - new Date(b.earliestSubmission);
    }).slice(0, 10);

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
}

function processDailyResults() {
    const allPredictions = JSON.parse(localStorage.getItem(STORAGE_KEYS.predictions)) || [];
    const snapshot = {
        processedAt: new Date().toISOString(),
        leaderboard: []
    };

    const userScores = {};
    allPredictions.forEach(entry => {
        const userKey = entry.mobile || entry.name;
        if (!userScores[userKey]) {
            userScores[userKey] = {
                name: entry.name || entry.mobile || 'Guest',
                totalPoints: 0,
                exactScores: 0,
                correctResults: 0,
                predictions: 0,
                earliestSubmission: entry.timestamp
            };
        }

        const user = userScores[userKey];
        if (entry.timestamp < user.earliestSubmission) {
            user.earliestSubmission = entry.timestamp;
        }

        entry.predictions.forEach(pred => {
            const match = gameData.matches.find(m => m.id === pred.matchId);
            if (!match) return;
            const result = calculateMatchPoints(match, pred);
            user.totalPoints += result.points;
            user.predictions += 1;
            if (result.exactScore) user.exactScores += 1;
            if (result.correctResult) user.correctResults += 1;
        });

        user.totalPoints += calculateBonusPoints(entry.bonusPredictions);
    });

    snapshot.leaderboard = Object.values(userScores)
        .sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
            if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
            if (b.correctResults !== a.correctResults) return b.correctResults - a.correctResults;
            return new Date(a.earliestSubmission) - new Date(b.earliestSubmission);
        })
        .slice(0, 10);

    localStorage.setItem('fifa2026DailyLeaderboard', JSON.stringify(snapshot));
}

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;

            // Remove active class from all buttons and sections
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            document.getElementById(sectionId).classList.add('active');

            // Refresh leaderboard when switching to it
            if (sectionId === 'leaderboard') {
                loadLeaderboard();
            }
        });
    });

    // Initialize on page load
    initializeApp();
});
