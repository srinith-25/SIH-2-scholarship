// Client Database & Authentication Service
// Communicates with backend /api/auth endpoints and provides local fallback persistence

const STORAGE_KEY_DB = 'mota_tribal_scholarship_db';
const STORAGE_KEY_CURRENT_USER = 'mota_tribal_current_user';

const INITIAL_FALLBACK_DB = {
  users: [
    {
      id: "ST-2026-OD-89211",
      fullName: "Ananya Munda",
      role: "student",
      identifier: "+91 94371 82910",
      aadhaar: "XXXX-XXXX-8912",
      apaarId: "9281-0492-3810",
      tribe: "Munda",
      state: "Odisha",
      institution: "NIT Rourkela",
      registeredAt: "2026-07-12 10:15:00"
    },
    {
      id: "PAR-2026-OD-0941",
      fullName: "Somra Munda",
      role: "parent",
      identifier: "+91 94371 82999",
      aadhaar: "XXXX-XXXX-1904",
      tribe: "Munda",
      state: "Odisha",
      registeredAt: "2026-07-15 11:20:00"
    },
    {
      id: "INST-NITR-001",
      fullName: "Dr. P. K. Mohapatra",
      role: "institution",
      identifier: "nodal.scholarship@nitrkl.ac.in",
      institution: "NIT Rourkela",
      state: "Odisha",
      registeredAt: "2026-06-01 09:00:00"
    },
    {
      id: "STA-OD-772",
      fullName: "R. K. Tripathy, OAS",
      role: "state",
      identifier: "dir-tribal.od@gov.in",
      state: "Odisha",
      registeredAt: "2026-05-15 14:00:00"
    },
    {
      id: "ADM-MOTA-001",
      fullName: "National MoTA Administrator",
      role: "admin",
      identifier: "admin-scholarships@mota.gov.in",
      state: "New Delhi",
      registeredAt: "2026-01-01 00:00:00"
    },
    {
      id: "CSC-OR-882",
      fullName: "Bikas Kisan (VLE Kiosk)",
      role: "csc",
      identifier: "csc.panposh@digitalindia.gov.in",
      state: "Odisha",
      institution: "CSC Gram Panchayat Panposh",
      registeredAt: "2026-08-10 12:00:00"
    }
  ],
  loginLogs: [
    {
      id: "LOG-20260927-01",
      userId: "ST-2026-OD-89211",
      fullName: "Ananya Munda",
      role: "student",
      identifier: "XXXX-XXXX-8912",
      loginMethod: "Aadhaar OTP",
      ipAddress: "103.24.120.45",
      device: "Windows 11 / Chrome 129",
      location: "Sundargarh, Odisha, India",
      status: "SUCCESS",
      timestamp: "2026-09-27 14:48:06"
    }
  ]
};

function getLocalDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DB);
    return raw ? JSON.parse(raw) : INITIAL_FALLBACK_DB;
  } catch {
    return INITIAL_FALLBACK_DB;
  }
}

function saveLocalDb(db) {
  try {
    localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(db));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export const dbService = {
  // Record login event in persistent database
  async recordLogin({ userId, fullName, role, identifier, loginMethod, location }) {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const logData = {
      userId,
      fullName,
      role,
      identifier,
      loginMethod,
      location: location || "Odisha, India"
    };

    // Try backend API
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
      if (res.ok) {
        const data = await res.json();
        // Also update local storage cache
        const local = getLocalDb();
        if (!local.loginLogs) local.loginLogs = [];
        local.loginLogs.unshift(data.log);
        saveLocalDb(local);
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(data.user || data.log));
        return data;
      }
    } catch (err) {
      console.warn("Backend API unavailable, using local persistence:", err);
    }

    // Local fallback
    const local = getLocalDb();
    const newLog = {
      id: `LOG-${Date.now()}`,
      userId: userId || `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: fullName || "Authorized Beneficiary",
      role: role || "student",
      identifier: identifier || "Verified Session",
      loginMethod: loginMethod || "Aadhaar OTP",
      ipAddress: "103.24.120.45 (Local Gateway)",
      device: navigator.userAgent.split(')')[0] + ')',
      location: location || "Sundargarh, Odisha, India",
      status: "SUCCESS",
      timestamp
    };

    if (!local.loginLogs) local.loginLogs = [];
    local.loginLogs.unshift(newLog);
    saveLocalDb(local);
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newLog));
    return { success: true, log: newLog };
  },

  // Register a new student into the database
  async registerUser(userData) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const data = await res.json();
        const local = getLocalDb();
        if (!local.users) local.users = [];
        local.users.push(data.user);
        if (!local.loginLogs) local.loginLogs = [];
        local.loginLogs.unshift(data.log);
        saveLocalDb(local);
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(data.user));
        return data;
      }
    } catch (err) {
      console.warn("Backend register API unavailable, using local persistence:", err);
    }

    // Local fallback
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const local = getLocalDb();
    const newUser = {
      id: `ST-2026-${(userData.state || 'OD').slice(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: userData.fullName || "Tribal Student",
      role: userData.role || "student",
      identifier: userData.mobile || userData.identifier || "+91 90000 00000",
      aadhaar: userData.aadhaar ? `XXXX-XXXX-${userData.aadhaar.slice(-4)}` : "XXXX-XXXX-9999",
      apaarId: userData.apaarId || `9281-0492-${Math.floor(1000 + Math.random() * 9000)}`,
      tribe: userData.tribe || "Scheduled Tribe",
      state: userData.state || "Odisha",
      institution: userData.institution || "Government College",
      annualIncome: userData.annualIncome || "Below ₹2,50,000",
      registeredAt: timestamp,
      lastLogin: timestamp
    };

    if (!local.users) local.users = [];
    local.users.push(newUser);

    const newLog = {
      id: `LOG-${Date.now()}`,
      userId: newUser.id,
      fullName: newUser.fullName,
      role: newUser.role,
      identifier: newUser.identifier,
      loginMethod: "New Passport Registration",
      ipAddress: "127.0.0.1 (Local)",
      device: navigator.userAgent.split(')')[0] + ')',
      location: `${newUser.state}, India`,
      status: "SUCCESS",
      timestamp
    };

    if (!local.loginLogs) local.loginLogs = [];
    local.loginLogs.unshift(newLog);
    saveLocalDb(local);
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser, log: newLog };
  },

  // Get full database (users + logs)
  async getDatabase() {
    try {
      const res = await fetch('/api/auth/database');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore
    }
    return getLocalDb();
  },

  // Get login audit logs
  async getLoginLogs() {
    try {
      const res = await fetch('/api/auth/logs');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore
    }
    const db = getLocalDb();
    return db.loginLogs || [];
  },

  // Get registered users
  async getUsers() {
    try {
      const res = await fetch('/api/auth/users');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore
    }
    const db = getLocalDb();
    return db.users || [];
  },

  // Get active session
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
  }
};
