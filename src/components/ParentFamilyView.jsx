import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  ArrowRight, 
  ExternalLink,
  GraduationCap,
  Calendar,
  Download,
  FileText,
  Bell,
  Check,
  Volume2
} from 'lucide-react';
import { FAMILY_DATA } from '../data/mockData';

export const ParentFamilyView = ({ onSwitchToStudent }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview | wards | dbt | consent
  const totalReceived = FAMILY_DATA.children.reduce((acc, c) => c.status === 'Payment Received' ? acc + c.amount : acc, 0);

  // Wards detailed state
  const [wards] = useState([
    {
      id: "ST-2026-OD-89211",
      name: "Ananya Munda",
      relation: "Daughter (Ward 1)",
      level: "Higher Education (UG)",
      institution: "National Institute of Technology (NIT) Rourkela",
      course: "B.Tech Computer Science & Engineering (Year 3)",
      scheme: "Top Class Education Scheme for ST Students (MoTA)",
      sanctionAmount: 112000,
      disbursedAmount: 112000,
      status: "Disbursed via DBT",
      attendance: "88.4%",
      cgpa: "8.72 / 10",
      bankAccount: "Canara Bank (A/C: •••• 4821)",
      aadhaarSeeded: true,
      lastCreditDate: "18 Sep 2026"
    },
    {
      id: "ST-2026-OD-89412",
      name: "Rohit Munda",
      relation: "Son (Ward 2)",
      level: "Secondary Education",
      institution: "Govt Eklavya Model Residential School (EMRS), Sundargarh",
      course: "Class 10 (Secondary Board)",
      scheme: "Pre-Matric Scholarship for ST Students (Class IX & X)",
      sanctionAmount: 42000,
      disbursedAmount: 42000,
      status: "Disbursed via DBT",
      attendance: "94.2%",
      cgpa: "Grade A1 (91%)",
      bankAccount: "State Bank of India (A/C: •••• 1904)",
      aadhaarSeeded: true,
      lastCreditDate: "24 Aug 2026"
    }
  ]);

  // Family DBT Remittance Passbook State
  const [dbtTransactions] = useState([
    {
      date: "18 Sep 2026",
      ward: "Ananya Munda",
      scheme: "Top Class Higher Education",
      amount: "₹1,12,000",
      bank: "Canara Bank",
      accNo: "•••• 4821",
      utr: "CANR26081498102",
      mode: "Aadhaar Payment Bridge System (APBS)",
      status: "Credit Confirmed"
    },
    {
      date: "24 Aug 2026",
      ward: "Rohit Munda",
      scheme: "Pre-Matric ST Scholarship",
      amount: "₹42,000",
      bank: "State Bank of India",
      accNo: "•••• 1904",
      utr: "SBIN26071981240",
      mode: "Aadhaar Payment Bridge System (APBS)",
      status: "Credit Confirmed"
    },
    {
      date: "15 Oct 2025",
      ward: "Ananya Munda",
      scheme: "Top Class Education (Year 2)",
      amount: "₹1,08,000",
      bank: "Canara Bank",
      accNo: "•••• 4821",
      utr: "CANR25091189421",
      mode: "Direct Benefit Transfer (DBT)",
      status: "Credit Confirmed"
    }
  ]);

  // Parental Consent & Renewal Items
  const [consents, setConsents] = useState([
    {
      id: "CON-01",
      title: "Annual Income Declaration Endorsement (2026-27)",
      desc: "Consent to re-verify household income from Odisha e-District Portal without visiting Tahasil office.",
      ward: "All Wards (Household)",
      status: "Granted",
      signedDate: "10-Jul-2026"
    },
    {
      id: "CON-02",
      title: "Hostel Living & Mess Allowance Direct Reimbursement",
      desc: "Authorization for NIT Rourkela to report living dues directly to Ministry of Tribal Affairs.",
      ward: "Ananya Munda",
      status: "Granted",
      signedDate: "14-Jul-2026"
    },
    {
      id: "CON-03",
      title: "Class 11 Science Stream Transition & Book Grant Advance",
      desc: "Pre-enrollment consent for Rohit Munda's upcoming Higher Secondary Post-Matric scheme.",
      ward: "Rohit Munda",
      status: "Pending Action",
      deadline: "30-Nov-2026"
    }
  ]);

  const handleGrantConsent = (id) => {
    setConsents(prev => prev.map(c => c.id === id ? { ...c, status: "Granted", signedDate: "Today" } : c));
    alert("Digital Guardian Consent successfully submitted to Ministry of Tribal Affairs!");
  };

  const speakSummary = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Family Scholarship Summary for ${FAMILY_DATA.guardianName}. Total amount credited directly to bank accounts is one lakh fifty four thousand rupees across two children: Ananya Munda and Rohit Munda. All DBT transactions are verified by Aadhaar Payment Bridge.`;
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      alert("Audio feature not supported on this browser.");
    }
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* Top Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f3c68 0%, #0f766e 100%)', 
        color: '#fff', 
        padding: '26px 32px', 
        borderRadius: 'var(--radius-xl)', 
        marginBottom: '20px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                FAMILY & GUARDIAN SCHOLARSHIP PORTAL
              </span>
              <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>Ration Card Family Unit: OD-SUND-491028</span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              {FAMILY_DATA.guardianName} ({FAMILY_DATA.guardianRelation})
            </h2>
            <p style={{ fontSize: '0.88rem', opacity: 0.92, margin: 0, color: '#e0f2fe' }}>
              Village: <strong>Panposh, Sundargarh</strong> • Unified Family Passbook for Scheduled Tribe Welfare
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={speakSummary}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Listen to Family Scholarship audio update in simple voice"
            >
              <Volume2 size={16} />
              <span>Voice Summary</span>
            </button>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '10px 20px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.25)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total DBT Credited</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4ade80' }}>
                ₹{totalReceived.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL SECTION TABS */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        borderBottom: '2px solid var(--border-color)', 
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'overview', label: '👨‍👩‍👧 Family Overview', icon: '' },
          { id: 'wards', label: `🎓 Wards Detailed Records (${wards.length})`, icon: '' },
          { id: 'dbt', label: `💳 Family DBT Passbook (${dbtTransactions.length})`, icon: '' },
          { id: 'consent', label: `🔔 Consents & Reminders (${consents.length})`, icon: '' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              backgroundColor: activeTab === tab.id ? 'var(--primary-light)' : 'transparent',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: FAMILY OVERVIEW                                */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div>
          {/* Quick Notice Banner */}
          <div style={{ 
            backgroundColor: '#eff6ff', 
            border: '1px solid #bfdbfe', 
            borderRadius: 'var(--radius-md)', 
            padding: '14px 18px', 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={22} style={{ color: '#2563eb' }} />
              <div>
                <strong style={{ color: '#1e40af', fontSize: '0.88rem' }}>Aadhaar Payment Bridge System (APBS) Active for All Wards</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#1e3a8a' }}>
                  All government financial aid is credited straight to student bank accounts with zero middleman involvement.
                </p>
              </div>
            </div>
            <span className="badge badge-green" style={{ fontSize: '11px' }}>100% Direct to Bank</span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '14px' }}>
            Enrolled Children ({FAMILY_DATA.children.length})
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '24px' }}>
            {FAMILY_DATA.children.map((child) => (
              <div key={child.id} className="gov-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 2px' }}>
                        {child.name}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {child.relation} • {child.classCourse}
                      </span>
                    </div>
                    <span className={`badge ${child.statusColor === 'green' ? 'badge-green' : 'badge-amber'}`}>
                      {child.statusColor === 'green' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {child.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '12px' }}>
                    🏫 {child.schoolCollege}
                  </div>

                  <div style={{ backgroundColor: 'var(--bg-muted)', padding: '12px 14px', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Scholarship Scheme:</div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>
                      {child.schemeName}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Sanction Amount:</span>
                      <span style={{ fontWeight: 800, color: 'var(--success)' }}>₹{child.amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {child.actionNeeded && (
                    <div style={{ backgroundColor: 'var(--warning-light)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', fontSize: '0.78rem', color: 'var(--warning)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={15} style={{ flexShrink: 0 }} />
                      <span>{child.actionText}</span>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Passport Verified</span>
                  <button 
                    onClick={() => setActiveTab('wards')}
                    style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    View Ward Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: WARDS DETAILED RECORDS                         */}
      {/* ========================================================= */}
      {activeTab === 'wards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {wards.map((ward) => (
            <div key={ward.id} className="gov-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                      {ward.name}
                    </h3>
                    <span className="badge badge-blue">{ward.relation}</span>
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> {ward.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {ward.institution} • {ward.course}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Scheme Sanction:</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
                    ₹{ward.sanctionAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Application ID</span>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ward.id}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Attendance</span>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--success)' }}>{ward.attendance} (Satisfactory)</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Academic Performance</span>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ward.cgpa}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Direct Credit Bank</span>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ward.bankAccount}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => alert(`Downloading Sanction Order & MoTA Certificate for ${ward.name}...`)}
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={14} /> Download MoTA Sanction Order
                </button>
                <button
                  onClick={() => alert(`Opening Academic Attendance & Fee Statement endorsed by ${ward.institution}...`)}
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <FileText size={14} /> View College Endorsement
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: FAMILY DBT BANK REMITTANCES                    */}
      {/* ========================================================= */}
      {activeTab === 'dbt' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
                Consolidated Family Direct Benefit Transfer (DBT) Passbook
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Aadhaar Payment Bridge System (APBS) & PFMS Credit Audit Ledger
              </p>
            </div>
            <button 
              onClick={() => alert("Downloading Complete Family DBT Statement (PDF)...")}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} /> Download Passbook PDF
            </button>
          </div>

          <div className="gov-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Beneficiary Ward</th>
                  <th style={{ padding: '12px 16px' }}>Scholarship Scheme</th>
                  <th style={{ padding: '12px 16px' }}>Amount Credited</th>
                  <th style={{ padding: '12px 16px' }}>Credited Bank & A/C</th>
                  <th style={{ padding: '12px 16px' }}>Bank UTR No.</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {dbtTransactions.map((tx, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{tx.date}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>{tx.ward}</td>
                    <td style={{ padding: '12px 16px' }}>{tx.scheme}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: 'var(--success)' }}>{tx.amount}</td>
                    <td style={{ padding: '12px 16px' }}>{tx.bank} ({tx.accNo})</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>{tx.utr}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-green">
                        <CheckCircle2 size={12} /> {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: PARENTAL CONSENTS & RENEWAL REMINDERS          */}
      {/* ========================================================= */}
      {activeTab === 'consent' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
              Guardian Consents & Academic Cycle Renewal Reminders
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Authorized consents required under Ministry of Tribal Affairs digital guidelines
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {consents.map(c => (
              <div key={c.id} className="gov-card" style={{ padding: '20px', borderLeft: c.status === 'Granted' ? '4px solid var(--success)' : '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                        {c.title}
                      </h4>
                      <span className="badge badge-blue">{c.ward}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
                      {c.desc}
                    </p>
                    {c.status === 'Granted' ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
                        ✓ Consent recorded digitally on {c.signedDate}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700 }}>
                        ⚠️ Action Required by {c.deadline}
                      </span>
                    )}
                  </div>

                  <div>
                    {c.status === 'Granted' ? (
                      <span className="badge badge-green">
                        <Check size={12} /> Consent Active
                      </span>
                    ) : (
                      <button
                        onClick={() => handleGrantConsent(c.id)}
                        className="btn-primary"
                        style={{ fontSize: '0.82rem', padding: '7px 16px' }}
                      >
                        Grant Guardian Consent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
