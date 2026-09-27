import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Vite plugin to handle authentication and database storage API
function authDatabasePlugin() {
  const dbDir = path.resolve(process.cwd(), 'data')
  const dbFile = path.resolve(dbDir, 'db.json')

  function getDb() {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    if (!fs.existsSync(dbFile)) {
      const initialDb = {
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
      }
      fs.writeFileSync(dbFile, JSON.stringify(initialDb, null, 2), 'utf8')
      return initialDb
    }
    try {
      const data = fs.readFileSync(dbFile, 'utf8')
      return JSON.parse(data)
    } catch {
      return { users: [], loginLogs: [] }
    }
  }

  function saveDb(data) {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf8')
  }

  return {
    name: 'auth-database-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Parse JSON body helper
        const parseJson = () => new Promise((resolve) => {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try { resolve(body ? JSON.parse(body) : {}) }
            catch { resolve({}) }
          })
        })

        // Route: GET /api/auth/database
        if (req.url === '/api/auth/database' && req.method === 'GET') {
          const db = getDb()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(db))
          return
        }

        // Route: GET /api/auth/logs
        if (req.url === '/api/auth/logs' && req.method === 'GET') {
          const db = getDb()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(db.loginLogs || []))
          return
        }

        // Route: GET /api/auth/users
        if (req.url === '/api/auth/users' && req.method === 'GET') {
          const db = getDb()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(db.users || []))
          return
        }

        // Route: POST /api/auth/login
        if (req.url === '/api/auth/login' && req.method === 'POST') {
          parseJson().then(body => {
            const db = getDb()
            const now = new Date()
            const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)

            const newLog = {
              id: `LOG-${Date.now()}`,
              userId: body.userId || `USR-${Math.floor(1000 + Math.random() * 9000)}`,
              fullName: body.fullName || 'Authorized Beneficiary',
              role: body.role || 'student',
              identifier: body.identifier || 'Verified Session',
              loginMethod: body.loginMethod || 'Aadhaar OTP',
              ipAddress: req.socket.remoteAddress || '103.24.120.45',
              device: req.headers['user-agent'] ? req.headers['user-agent'].split(')')[0] + ')' : 'Web Browser',
              location: body.location || 'Odisha, India',
              status: 'SUCCESS',
              timestamp: timestamp
            }

            if (!db.loginLogs) db.loginLogs = []
            db.loginLogs.unshift(newLog)

            // Keep user up to date
            if (!db.users) db.users = []
            const existingUserIndex = db.users.findIndex(u => u.id === newLog.userId || u.identifier === newLog.identifier)
            if (existingUserIndex >= 0) {
              db.users[existingUserIndex].lastLogin = timestamp
            } else {
              db.users.push({
                id: newLog.userId,
                fullName: newLog.fullName,
                role: newLog.role,
                identifier: newLog.identifier,
                registeredAt: timestamp,
                lastLogin: timestamp
              })
            }

            saveDb(db)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, log: newLog, user: db.users.find(u => u.id === newLog.userId) }))
          })
          return
        }

        // Route: POST /api/auth/register
        if (req.url === '/api/auth/register' && req.method === 'POST') {
          parseJson().then(body => {
            const db = getDb()
            const now = new Date()
            const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)

            const newUser = {
              id: `ST-2026-${(body.state || 'IN').slice(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
              fullName: body.fullName || 'Tribal Student',
              role: body.role || 'student',
              identifier: body.mobile || body.identifier || '+91 90000 00000',
              aadhaar: body.aadhaar ? `XXXX-XXXX-${body.aadhaar.slice(-4)}` : 'XXXX-XXXX-9999',
              apaarId: body.apaarId || `9281-0492-${Math.floor(1000 + Math.random() * 9000)}`,
              tribe: body.tribe || 'Scheduled Tribe',
              state: body.state || 'Odisha',
              institution: body.institution || 'Government Institution',
              annualIncome: body.annualIncome || 'Below ₹2,50,000',
              registeredAt: timestamp,
              lastLogin: timestamp
            }

            if (!db.users) db.users = []
            db.users.push(newUser)

            // Also record registration login log
            const newLog = {
              id: `LOG-${Date.now()}`,
              userId: newUser.id,
              fullName: newUser.fullName,
              role: newUser.role,
              identifier: newUser.identifier,
              loginMethod: 'New Passport Registration',
              ipAddress: req.socket.remoteAddress || '127.0.0.1',
              device: 'Web Client',
              location: `${newUser.state}, India`,
              status: 'SUCCESS',
              timestamp: timestamp
            }

            if (!db.loginLogs) db.loginLogs = []
            db.loginLogs.unshift(newLog)

            saveDb(db)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, user: newUser, log: newLog }))
          })
          return
        }

        // Route: POST /api/auth/clear-logs
        if (req.url === '/api/auth/clear-logs' && req.method === 'POST') {
          const db = getDb()
          db.loginLogs = []
          saveDb(db)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
          return
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), authDatabasePlugin()],
})
