import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle 
} from 'lucide-react';

export const GrievanceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('raise'); // raise | my-tickets
  const [category, setCategory] = useState('Payment Delay');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const [myTickets, setMyTickets] = useState([
    {
      id: "GRV-2026-0819",
      category: "Document Verification",
      subject: "Aadhaar e-KYC response timeout in rural kiosk",
      status: "Resolved",
      statusColor: "green",
      raisedDate: "14 Jul 2026",
      resolution: "Server sync verified; document re-fetched via offline batch."
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide details of your issue.");
      return;
    }

    const newTicket = {
      id: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      subject: description.slice(0, 45) + (description.length > 45 ? "..." : ""),
      status: "Submitted (SLA: 48 Hrs)",
      statusColor: "blue",
      raisedDate: "Just Now",
      resolution: "Assigned to MoTA Nodal Helpdesk for immediate review."
    };

    setMyTickets([newTicket, ...myTickets]);
    setSubmittedTicket(newTicket);
    setDescription('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', maxWidth: '480px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
              MoTA Grievance Redressal
            </h3>
          </div>
          <button onClick={onClose} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>✕</button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button 
            onClick={() => { setActiveTab('raise'); setSubmittedTicket(null); }}
            style={{ 
              flex: 1, 
              padding: '8px', 
              borderRadius: 'var(--radius-md)', 
              fontSize: '12px', 
              fontWeight: 600,
              backgroundColor: activeTab === 'raise' ? 'var(--primary)' : 'var(--bg-muted)',
              color: activeTab === 'raise' ? '#fff' : 'var(--text-muted)'
            }}
          >
            File New Issue
          </button>
          <button 
            onClick={() => setActiveTab('my-tickets')}
            style={{ 
              flex: 1, 
              padding: '8px', 
              borderRadius: 'var(--radius-md)', 
              fontSize: '12px', 
              fontWeight: 600,
              backgroundColor: activeTab === 'my-tickets' ? 'var(--primary)' : 'var(--bg-muted)',
              color: activeTab === 'my-tickets' ? '#fff' : 'var(--text-muted)'
            }}
          >
            Track Tickets ({myTickets.length})
          </button>
        </div>

        {/* Raise Form */}
        {activeTab === 'raise' && (
          <div>
            {submittedTicket ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--success)', margin: '0 auto 8px' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '4px 0' }}>Ticket Created Successfully</h4>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', margin: '4px 0 10px' }}>
                  Ticket ID: {submittedTicket.id}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
                  Your grievance has been registered under <strong>{submittedTicket.category}</strong>. You will receive SMS updates on resolution within 48 hours.
                </p>
                <button 
                  onClick={() => setActiveTab('my-tickets')}
                  className="btn-primary" 
                  style={{ width: '100%', fontSize: '13px' }}
                >
                  View in My Tickets
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Issue Category
                  </label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.82rem' }}
                  >
                    <option value="Payment Delay">Payment Delay (DBT / Bank)</option>
                    <option value="Document Verification">Document Verification (e-District / DigiLocker)</option>
                    <option value="Institution Verification">Institution Verification Pending</option>
                    <option value="Application Issue">Application Status Query</option>
                    <option value="Eligibility Issue">Eligibility Discrepancy</option>
                    <option value="Technical Problem">Technical / Kiosk Problem</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Describe your grievance
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details (e.g. Canara Bank account verification pending, renewal mark sheet issue...)"
                    rows={4}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.82rem', resize: 'vertical' }}
                  />
                </div>

                <div style={{ backgroundColor: 'var(--primary-light)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem', color: 'var(--primary)' }}>
                  💡 <strong>JAGO Assistance:</strong> Your Scholarship Passport ID will automatically be attached to this ticket so officers have verified context immediately.
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '8px', fontSize: '13px' }}>
                  <Send size={14} /> Submit Grievance
                </button>
              </form>
            )}
          </div>
        )}

        {/* My Tickets */}
        {activeTab === 'my-tickets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {myTickets.map((t) => (
              <div key={t.id} style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-muted)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--primary)' }}>{t.id}</span>
                  <span className={`badge ${t.statusColor === 'green' ? 'badge-green' : 'badge-blue'}`}>{t.status}</span>
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', margin: '2px 0' }}>
                  {t.category}: {t.subject}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Resolution: {t.resolution}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
