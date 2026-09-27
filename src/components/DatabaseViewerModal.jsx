import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Trash2, 
  ShieldCheck, 
  User, 
  Clock, 
  MapPin, 
  Smartphone 
} from 'lucide-react';
import { dbService } from '../services/dbService';

export const DatabaseViewerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('logs'); // logs | users | json
  const [database, setDatabase] = useState({ users: [], loginLogs: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchDatabase = async () => {
    setIsLoading(true);
    const data = await dbService.getDatabase();
    setDatabase(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(database, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mota_scholarship_database_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearLogs = async () => {
    if (window.confirm("Are you sure you want to clear the login audit logs?")) {
      try {
        await fetch('/api/auth/clear-logs', { method: 'POST' });
      } catch {
        // ignore
      }
      const local = await dbService.getDatabase();
      local.loginLogs = [];
      localStorage.setItem('mota_tribal_scholarship_db', JSON.stringify(local));
      setDatabase(local);
      alert("Login logs cleared successfully.");
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-xl)', maxWidth: '960px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '18px 24px', backgroundColor: 'var(--primary)', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>MoTA Live Database & Audit Ledger</h3>
              <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: '2px 0 0' }}>
                Central Database Storage (`data/db.json`) • Persisting All Logins & User Registrations
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={fetchDatabase} 
              style={{ color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Refresh database"
            >
              <RefreshCw size={13} className={isLoading ? "pulse-indicator" : ""} /> Refresh
            </button>
            <button 
              onClick={handleExportJson} 
              style={{ color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={13} /> Export JSON
            </button>
            <button onClick={onClose} style={{ color: '#ffffff', fontSize: '20px', marginLeft: '6px' }}>✕</button>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)', padding: '0 24px' }}>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: activeTab === 'logs' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'logs' ? '3px solid var(--primary)' : '3px solid transparent'
            }}
          >
            📋 Login Audit Logs ({database.loginLogs?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'users' ? '3px solid var(--primary)' : '3px solid transparent'
            }}
          >
            👥 Registered Users Registry ({database.users?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('json')}
            style={{
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: activeTab === 'json' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'json' ? '3px solid var(--primary)' : '3px solid transparent'
            }}
          >
            📦 Raw Database JSON
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          
          {/* TAB 1: LOGIN LOGS */}
          {activeTab === 'logs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Total <strong>{database.loginLogs?.length || 0}</strong> authentication events recorded in persistent database:
                </span>
                <button 
                  onClick={handleClearLogs}
                  style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Trash2 size={12} /> Clear Logs
                </button>
              </div>

              {database.loginLogs?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No login events recorded yet.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                        <th style={{ padding: '8px 12px' }}>Timestamp</th>
                        <th style={{ padding: '8px 12px' }}>User Name</th>
                        <th style={{ padding: '8px 12px' }}>Role</th>
                        <th style={{ padding: '8px 12px' }}>Method</th>
                        <th style={{ padding: '8px 12px' }}>Location</th>
                        <th style={{ padding: '8px 12px' }}>IP / Device</th>
                        <th style={{ padding: '8px 12px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {database.loginLogs?.map((log) => (
                        <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: 'var(--text-light)', fontFamily: 'monospace' }}>
                            {log.timestamp}
                          </td>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--text-main)' }}>
                            {log.fullName}
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {log.userId}</div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>
                              {log.role}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--primary)' }}>
                            {log.loginMethod}
                          </td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                            {log.location}
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '0.74rem', color: 'var(--text-light)', fontFamily: 'monospace' }}>
                            {log.ipAddress}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className="badge badge-green">
                              <CheckCircle2 size={11} /> {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REGISTERED USERS */}
          {activeTab === 'users' && (
            <div>
              <div style={{ marginBottom: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Showing <strong>{database.users?.length || 0}</strong> verified users stored in the database registry:
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>User ID</th>
                      <th style={{ padding: '8px 12px' }}>Full Name</th>
                      <th style={{ padding: '8px 12px' }}>Role</th>
                      <th style={{ padding: '8px 12px' }}>Tribe / Community</th>
                      <th style={{ padding: '8px 12px' }}>State</th>
                      <th style={{ padding: '8px 12px' }}>Institution</th>
                      <th style={{ padding: '8px 12px' }}>Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {database.users?.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>
                          {u.id}
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--text-main)' }}>
                          {u.fullName}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-main)', fontWeight: 600 }}>
                          {u.tribe || 'N/A'}
                        </td>
                        <td style={{ padding: '10px 12px' }}>{u.state || 'India'}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{u.institution || 'N/A'}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-light)', fontSize: '0.72rem' }}>
                          {u.registeredAt || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RAW JSON */}
          {activeTab === 'json' && (
            <div>
              <pre style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '16px', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', overflowX: 'auto', maxHeight: '420px', fontFamily: 'monospace' }}>
                {JSON.stringify(database, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding: '12px 24px', backgroundColor: 'var(--bg-muted)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            MoTA Data Protection & Audit Ledger • Location: `c:\sih 2 tribal\data\db.json`
          </span>
          <button onClick={onClose} className="btn-primary" style={{ padding: '6px 16px', fontSize: '12px' }}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
