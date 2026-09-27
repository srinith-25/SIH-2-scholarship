import React from 'react';
import { 
  Bell, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  X,
  Smartphone
} from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose, onClearAll }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: "notif-1",
      title: "DBT Payment Credited (₹1,12,000)",
      body: "MoTA Top Class Scholarship for 2026-27 credited to Canara Bank A/C ****4821 via APBS. UTR: CANR26081498102.",
      type: "dbt",
      time: "18 Sep 2026, 11:42 AM",
      unread: true
    },
    {
      id: "notif-2",
      title: "Action Required: Income Certificate Expiry",
      body: "Your Income Certificate expires in 45 days. Auto-fetch renewal via DigiLocker to keep Passport 100% ready.",
      type: "warning",
      time: "25 Sep 2026, 09:15 AM",
      unread: true
    },
    {
      id: "notif-3",
      title: "Smart Exception Resolved",
      body: "Minor name discrepancy between APAAR and Aadhaar successfully reconciled under MoTA fuzzy rule EX-04.",
      type: "success",
      time: "18 Jul 2026, 04:30 PM",
      unread: false
    },
    {
      id: "notif-4",
      title: "SMS Notification Sent",
      body: "Official confirmation SMS dispatched to linked mobile +91 94371 82910 from 'GOV-MOTA'.",
      type: "sms",
      time: "18 Sep 2026, 11:45 AM",
      unread: false
    }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 120, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '380px', 
        height: '100%', 
        backgroundColor: '#ffffff', 
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--primary)', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Notification Centre</h3>
          </div>
          <button onClick={onClose} style={{ color: '#fff', fontSize: '18px' }}>✕</button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                padding: '12px', 
                borderRadius: 'var(--radius-md)', 
                backgroundColor: item.unread ? 'var(--primary-light)' : 'var(--bg-muted)',
                border: item.unread ? '1px solid var(--primary-subtle)' : '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  {item.title}
                </span>
                {item.unread && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 6px', lineHeight: 1.4 }}>
                {item.body}
              </p>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={onClearAll}
            style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}
          >
            Mark All as Read
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
            Channels: In-App, SMS, Email
          </span>
        </div>
      </div>
    </div>
  );
};
