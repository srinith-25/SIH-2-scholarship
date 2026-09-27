import React, { useState } from 'react';
import { 
  Home, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  UserCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  FolderLock, 
  Volume2, 
  Mic, 
  Send, 
  ExternalLink, 
  RefreshCw, 
  ChevronRight, 
  Info, 
  Sparkles, 
  Download, 
  ChevronLeft,
  XCircle,
  HelpCircle,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  STUDENT_PROFILE, 
  SCHEMES, 
  ACTIVE_APPLICATION, 
  ACTION_REQUIRED_ITEMS, 
  MY_DOCUMENTS, 
  MY_MONEY_DATA, 
  JAGO_FAQS,
  TRANSLATIONS 
} from '../data/mockData';

export const StudentMobileApp = ({ 
  language = 'en', 
  networkMode = 'online', 
  assistedMode = false, 
  onToggleAssistedMode,
  onOpenGrievance 
}) => {
  const [activeTab, setActiveTab] = useState('home'); // home | scholarships | applications | jago | profile
  const [subScreen, setSubScreen] = useState(null); // null | documents | money | exception-modal | apply-modal
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);
  const [incomeRenewed, setIncomeRenewed] = useState(false);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'jago',
      text: `Hello ${STUDENT_PROFILE.name}! I am JAGO, your multilingual scholarship assistant for the Ministry of Tribal Affairs. How can I help you today?`,
      time: '14:48'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [compatibilityCheckScheme, setCompatibilityCheckScheme] = useState(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Text to speech helper
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#]/g, ''));
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech audio simulated: " + text);
    }
  };

  // Chat message send
  const handleSendMessage = (customText) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');

    // Match FAQ or smart answer
    setTimeout(() => {
      let replyText = "I have noted your query. Since you are registered in the Scholarship Passport, your verified data (NIT Rourkela, B.Tech CSE, ST Munda) shows you are currently receiving the Top Class Education scholarship (₹1,12,000/yr). Is there anything specific you would like me to assist with?";
      
      const foundFaq = JAGO_FAQS.find(f => 
        textToSend.toLowerCase().includes(f.question.toLowerCase().slice(0, 15)) ||
        f.question.toLowerCase().includes(textToSend.toLowerCase().slice(0, 15))
      );

      if (foundFaq) {
        replyText = foundFaq.reply;
      } else if (textToSend.toLowerCase().includes('money') || textToSend.toLowerCase().includes('payment') || textToSend.toLowerCase().includes('dbt')) {
        replyText = "Your scholarship amount of ₹1,12,000 has been credited on 18 Sep 2026 to Canara Bank A/C ending 4821 with UTR: CANR26081498102.";
      } else if (textToSend.toLowerCase().includes('document') || textToSend.toLowerCase().includes('income')) {
        replyText = "Your Annual Family Income certificate expires in 45 days. You can easily auto-sync the renewed certificate from Odisha e-District right in your Documents tab.";
      } else if (textToSend.toLowerCase().includes('grievance') || textToSend.toLowerCase().includes('complaint')) {
        replyText = "I can immediately initiate a Grievance Ticket for you with the Ministry. Would you like to file a ticket regarding Payment, Document Verification, or Institution?";
      }

      setChatMessages(prev => [...prev, { sender: 'jago', text: replyText, time: 'Just now' }]);
    }, 600);
  };

  // Simulate DigiLocker Re-fetch of Income Certificate
  const handleAutoRenewIncome = () => {
    setIncomeRenewed(true);
    alert("Connected to Odisha e-District API via DigiLocker!\n\nSuccessfully fetched renewed Income Certificate #OD/INC/2026/94821 valid until 30-Sep-2027.\n\nScholarship Passport updated to 100% Complete!");
  };

  // Render Sub Screens (Documents / Money)
  if (subScreen === 'documents') {
    return (
      <div className="mobile-content-area" style={{ backgroundColor: '#fff', minHeight: '100%' }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--primary)', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setSubScreen(null)} style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={22} />
            </button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>My Documents (DigiLocker Wallet)</h2>
          </div>
          <span className="badge badge-green" style={{ fontSize: '10px' }}>
            <ShieldCheck size={12} /> DigiLocker Connected
          </span>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Info size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--primary)', margin: 0, lineHeight: 1.4 }}>
              All documents are legally verified directly from government issuing authorities (UIDAI, State e-District, CBSE, ABC). No physical photocopies or notary attestation required.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MY_DOCUMENTS.map((doc) => {
              const isIncomeExpiring = doc.id === 'doc-3' && !incomeRenewed;
              return (
                <div key={doc.id} className="gov-card" style={{ padding: '14px', borderLeft: isIncomeExpiring ? '4px solid var(--warning)' : '4px solid var(--success)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>{doc.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.type} • {doc.source}</span>
                    </div>
                    <span className={`badge badge-${isIncomeExpiring ? 'amber' : 'green'}`}>
                      {isIncomeExpiring ? 'Expires Soon' : 'Verified'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', margin: '8px 0' }}>
                    <div><strong>Doc ID:</strong> {isIncomeExpiring ? doc.docRef : (doc.id === 'doc-3' ? 'OD/INC/2026/94821' : doc.docRef)}</div>
                    <div><strong>Issued:</strong> {doc.issuedDate}</div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <strong>Validity:</strong> {isIncomeExpiring ? 'Expires in 45 days (09-Aug-2026)' : (doc.id === 'doc-3' ? 'Valid till 30-Sep-2027 (Renewed)' : doc.expiryDate)}
                    </div>
                  </div>

                  {isIncomeExpiring ? (
                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)', display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={handleAutoRenewIncome}
                        className="btn-primary" 
                        style={{ fontSize: '11px', padding: '6px 12px', flex: 1, backgroundColor: 'var(--warning)' }}
                      >
                        <RefreshCw size={12} /> Auto-Fetch Renewed Certificate
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button 
                        onClick={() => setSelectedDocPreview(doc)}
                        className="btn-secondary" 
                        style={{ fontSize: '11px', padding: '4px 10px', flex: 1 }}
                      >
                        <ExternalLink size={12} /> View Certificate
                      </button>
                      <button 
                        onClick={() => alert(`Downloaded digital verified PDF of ${doc.title} with cryptographically signed QR code.`)}
                        className="btn-secondary" 
                        style={{ fontSize: '11px', padding: '4px 10px' }}
                      >
                        <Download size={12} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Document Preview Modal */}
        {selectedDocPreview && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '420px', width: '100%', padding: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{selectedDocPreview.title}</h3>
                <button onClick={() => setSelectedDocPreview(null)} style={{ fontSize: '18px', color: 'var(--text-muted)' }}>✕</button>
              </div>

              <div style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-strong)', textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📜</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)' }}>GOVERNMENT OF ODISHA / INDIA</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Digitally Certified Record from {selectedDocPreview.source}</div>
                <div style={{ fontSize: '0.75rem', textAlign: 'left', background: '#fff', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <div><strong>Student Name:</strong> Ananya Munda</div>
                  <div><strong>Father:</strong> Somra Munda</div>
                  <div><strong>Certificate Ref:</strong> {selectedDocPreview.docRef}</div>
                  <div><strong>Digital Signature:</strong> SHA-256 Validated • Tamper-Proof</div>
                  <div><strong>Issued By:</strong> Competent Revenue Authority</div>
                </div>
              </div>

              <button onClick={() => setSelectedDocPreview(null)} className="btn-primary" style={{ width: '100%', fontSize: '13px' }}>
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render My Money Sub Screen
  if (subScreen === 'money') {
    return (
      <div className="mobile-content-area" style={{ backgroundColor: '#fff', minHeight: '100%' }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--secondary)', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setSubScreen(null)} style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={22} />
            </button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>My Money & DBT Tracking</h2>
          </div>
          <span className="badge badge-green" style={{ fontSize: '10px', backgroundColor: '#fff', color: 'var(--secondary)' }}>
            <CreditCard size={12} /> Aadhaar DBT Active
          </span>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Hero Sanction Card */}
          <div style={{ 
            background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)', 
            color: '#fff', 
            padding: '20px', 
            borderRadius: 'var(--radius-lg)', 
            marginBottom: '16px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Current Academic Year (2026-27)</span>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, margin: '4px 0 8px' }}>
              ₹1,12,000
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
              <CheckCircle2 size={16} style={{ color: '#4ade80' }} />
              <span>Full Amount Credited via DBT on 18 Sep 2026</span>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="gov-card" style={{ padding: '14px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
              Validated DBT Bank Account
            </h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <div><strong>Bank:</strong> {MY_MONEY_DATA.bankDetails.bank}</div>
              <div><strong>Account:</strong> {MY_MONEY_DATA.bankDetails.account}</div>
              <div><strong>IFSC:</strong> {MY_MONEY_DATA.bankDetails.ifsc}</div>
              <div><strong>NPCI Mapper:</strong> <span style={{ color: 'var(--success)', fontWeight: 600 }}>Active (APBS)</span></div>
            </div>
          </div>

          {/* Amount Breakdown */}
          <div className="gov-card" style={{ padding: '14px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
              Scholarship Sanction Breakdown
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              {MY_MONEY_DATA.breakdown.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.head}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{item.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', fontWeight: 700 }}>
                <span>Total Annual Benefit:</span>
                <span style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>₹1,12,000</span>
              </div>
            </div>
          </div>

          {/* Disbursement History */}
          <div className="gov-card" style={{ padding: '14px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
              Disbursement History (All Years)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MY_MONEY_DATA.transactions.map((tx) => (
                <div key={tx.id} style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{tx.scheme}</span>
                    <span style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.9rem' }}>+₹{tx.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Credited on {tx.date} • UTR: {tx.utr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable View Area */}
      <div className="mobile-content-area">
        
        {/* ==================== TAB 1: HOME ==================== */}
        {activeTab === 'home' && (
          <div style={{ padding: '16px' }}>
            
            {/* Greeting */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500 }}>
                  {t.welcome},
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 0' }}>
                  {STUDENT_PROFILE.name}
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {STUDENT_PROFILE.academic.institutionName} • {STUDENT_PROFILE.tribal.tribeName} Tribe
                </span>
              </div>

              {/* Avatar Chip */}
              <div 
                onClick={() => setActiveTab('profile')}
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--primary)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                {STUDENT_PROFILE.avatar}
              </div>
            </div>

            {/* Scholarship Passport Hero Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #0f3c68 0%, #1e3a8a 100%)', 
              color: '#fff', 
              padding: '18px', 
              borderRadius: 'var(--radius-lg)', 
              marginBottom: '16px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} style={{ color: '#38bdf8' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.02em' }}>Scholarship Passport</span>
                </div>
                <span style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.72rem', 
                  fontWeight: 600 
                }}>
                  {incomeRenewed ? '100%' : `${STUDENT_PROFILE.passportCompletion}%`} {t.passportCompletion}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '3px', marginBottom: '10px' }}>
                <div style={{ width: incomeRenewed ? '100%' : '92%', height: '100%', backgroundColor: '#38bdf8', borderRadius: '3px' }} />
              </div>

              <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '14px', lineHeight: 1.35 }}>
                {t.oneProfile}
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setActiveTab('profile')}
                  style={{ 
                    backgroundColor: '#ffffff', 
                    color: 'var(--primary)', 
                    padding: '8px 14px', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.78rem', 
                    fontWeight: 700, 
                    flex: 1,
                    textAlign: 'center'
                  }}
                >
                  {t.viewPassport}
                </button>
                <button 
                  onClick={() => setSubScreen('documents')}
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.15)', 
                    color: '#ffffff', 
                    border: '1px solid rgba(255,255,255,0.4)',
                    padding: '8px 12px', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.78rem', 
                    fontWeight: 600 
                  }}
                >
                  DigiLocker Wallet
                </button>
              </div>
            </div>

            {/* Action Required Box */}
            {!incomeRenewed && (
              <div style={{ 
                backgroundColor: 'var(--warning-light)', 
                border: '1px solid var(--warning-border)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '14px', 
                marginBottom: '16px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--warning)', fontWeight: 700, fontSize: '0.85rem' }}>
                    <AlertCircle size={16} />
                    <span>{t.actionRequired}</span>
                  </div>
                  <span className="badge badge-amber" style={{ fontSize: '10px' }}>Due in 45 days</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: '4px 0 10px', lineHeight: 1.4 }}>
                  Annual Family Income Certificate (#OD/INC/2025/89410) expires on <strong>09 Aug 2026</strong>. Auto-sync the renewed certificate to prevent sanction delay.
                </p>
                <button 
                  onClick={handleAutoRenewIncome}
                  className="btn-primary" 
                  style={{ fontSize: '11px', padding: '6px 14px', width: '100%', backgroundColor: 'var(--warning)' }}
                >
                  <RefreshCw size={13} /> Update Now from Odisha e-District
                </button>
              </div>
            )}

            {/* Smart Exception Card resolved demo */}
            <div style={{ 
              backgroundColor: 'var(--success-light)', 
              border: '1px solid var(--success-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '10px 14px', 
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 600 }}>
                  Smart Exception: APAAR Name Mismatch Auto-Reconciled
                </span>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Audit #EX-04</span>
            </div>

            {/* 4 Main Action Tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              
              {/* Tile 1: Scholarships for Me */}
              <div 
                onClick={() => setActiveTab('scholarships')}
                className="gov-card" 
                style={{ 
                  padding: '14px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderTop: '3px solid #1d4ed8'
                }}
              >
                <div>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    backgroundColor: 'var(--primary-light)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--primary)',
                    marginBottom: '8px'
                  }}>
                    <GraduationCap size={20} />
                  </div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 2px', color: 'var(--text-main)' }}>
                    {t.scholarshipsForMe}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Zero-Search AI Match
                  </span>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge badge-green" style={{ fontSize: '10px' }}>2 Eligible</span>
                  <ChevronRight size={14} style={{ color: 'var(--text-light)' }} />
                </div>
              </div>

              {/* Tile 2: My Applications */}
              <div 
                onClick={() => setActiveTab('applications')}
                className="gov-card" 
                style={{ 
                  padding: '14px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderTop: '3px solid #0f766e'
                }}
              >
                <div>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    backgroundColor: 'var(--secondary-light)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--secondary)',
                    marginBottom: '8px'
                  }}>
                    <FileText size={20} />
                  </div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 2px', color: 'var(--text-main)' }}>
                    {t.myApplications}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Live Status & Timeline
                  </span>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge badge-green" style={{ fontSize: '10px' }}>Sanctioned</span>
                  <ChevronRight size={14} style={{ color: 'var(--text-light)' }} />
                </div>
              </div>

              {/* Tile 3: My Documents */}
              <div 
                onClick={() => setSubScreen('documents')}
                className="gov-card" 
                style={{ 
                  padding: '14px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderTop: '3px solid #8b5cf6'
                }}
              >
                <div>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f5f3ff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#8b5cf6',
                    marginBottom: '8px'
                  }}>
                    <FolderLock size={20} />
                  </div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 2px', color: 'var(--text-main)' }}>
                    {t.myDocuments}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    DigiLocker Wallet
                  </span>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge badge-blue" style={{ fontSize: '10px' }}>7 Verified</span>
                  <ChevronRight size={14} style={{ color: 'var(--text-light)' }} />
                </div>
              </div>

              {/* Tile 4: My Money (DBT) */}
              <div 
                onClick={() => setSubScreen('money')}
                className="gov-card" 
                style={{ 
                  padding: '14px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderTop: '3px solid #15803d'
                }}
              >
                <div>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    backgroundColor: 'var(--success-light)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--success)',
                    marginBottom: '8px'
                  }}>
                    <CreditCard size={20} />
                  </div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 2px', color: 'var(--text-main)' }}>
                    {t.myMoney}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    DBT & Sanctions
                  </span>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--success)' }}>₹1,12,000</span>
                  <ChevronRight size={14} style={{ color: 'var(--text-light)' }} />
                </div>
              </div>

            </div>

            {/* Ask JAGO Quick Entry Banner */}
            <div 
              onClick={() => setActiveTab('jago')}
              style={{ 
                background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)', 
                border: '1px solid #bae6fd', 
                borderRadius: 'var(--radius-lg)', 
                padding: '14px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--secondary)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  🎙️
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>
                    Ask JAGO Assistant
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Voice & text in Odia, Santhali, Hindi, English
                  </div>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--secondary)' }} />
            </div>

            {/* Quick Renewal AutoPilot Indicator */}
            <div className="gov-card" style={{ padding: '14px', backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={16} style={{ color: '#9333ea' }} />
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#6b21a8' }}>Renewal AutoPilot</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Your next renewal for 2027-28 will auto-fetch 6th semester marks from APAAR ID. No re-registration required.
              </p>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: SCHOLARSHIPS (Scholarships for Me) ==================== */}
        {activeTab === 'scholarships' && (
          <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                {t.scholarshipsForMe}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                Personalized MoTA schemes auto-matched with your Scholarship Passport
              </p>
            </div>

            {/* Scheme Compatibility Banner */}
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '10px 12px', borderRadius: 'var(--radius-md)', marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Layers size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 500 }}>
                <strong>Deterministic Compatibility Engine:</strong> Prevents dual conflicting central scholarship claims while safeguarding higher entitlement.
              </span>
            </div>

            {/* Scheme Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SCHEMES.map((scheme) => {
                const isTopClass = scheme.id === 'top-class';
                const isPostMatric = scheme.id === 'post-matric';
                const isFellowship = scheme.id === 'fellowship';
                const isNOS = scheme.id === 'nos';

                return (
                  <div key={scheme.id} className="gov-card" style={{ padding: '16px', position: 'relative' }}>
                    {/* Header info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <span className={`badge ${scheme.matchScore > 80 ? 'badge-green' : scheme.matchScore > 50 ? 'badge-blue' : 'badge-amber'}`}>
                            {scheme.matchScore}% Match
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                            {scheme.level.slice(0, 30)}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--primary)', margin: 0, lineHeight: 1.3 }}>
                          {scheme.shortName}
                        </h3>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '6px 0 10px', lineHeight: 1.4 }}>
                      {scheme.coverage}
                    </p>

                    {/* Explainable Eligibility Section */}
                    <div style={{ backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                        Explainable Eligibility Breakdown:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {scheme.eligibleCriteriaList.map((crit, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.72rem' }}>
                            {crit.met ? (
                              <CheckCircle2 size={13} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                            ) : (
                              <XCircle size={13} style={{ color: 'var(--danger)', marginTop: '2px', flexShrink: 0 }} />
                            )}
                            <span style={{ color: crit.met ? 'var(--text-main)' : 'var(--danger)' }}>
                              {crit.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {isTopClass ? (
                        <div style={{ flex: 1, backgroundColor: 'var(--success-light)', color: 'var(--success)', padding: '8px', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', border: '1px solid var(--success-border)' }}>
                          ✓ Active & Disbursed (APP-2026-TCE-98102)
                        </div>
                      ) : isPostMatric ? (
                        <button 
                          onClick={() => setCompatibilityCheckScheme(scheme)}
                          className="btn-secondary" 
                          style={{ flex: 1, fontSize: '0.78rem', padding: '8px' }}
                        >
                          Check Scheme Compatibility
                        </button>
                      ) : isNOS ? (
                        <button 
                          onClick={() => {
                            setSelectedSchemeForApply(scheme);
                            setSubScreen('apply-modal');
                          }}
                          className="btn-primary" 
                          style={{ flex: 1, fontSize: '0.78rem', padding: '8px' }}
                        >
                          Apply for Foreign Studies (NOS)
                        </button>
                      ) : (
                        <div style={{ flex: 1, color: 'var(--text-light)', fontSize: '0.75rem', padding: '6px', textAlign: 'center' }}>
                          Eligible at Doctoral / Ph.D. Level
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: APPLICATIONS ==================== */}
        {activeTab === 'applications' && (
          <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                {t.myApplications}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                End-to-end transparent lifecycle from application to bank credit
              </p>
            </div>

            {/* Active Application Card */}
            <div className="gov-card" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    APPLICATION #{ACTIVE_APPLICATION.applicationId}
                  </span>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--primary)', margin: '2px 0' }}>
                    {ACTIVE_APPLICATION.schemeName}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Academic Year: {ACTIVE_APPLICATION.academicYear}
                  </span>
                </div>
                <span className="badge badge-green" style={{ fontSize: '11px', padding: '4px 10px' }}>
                  {ACTIVE_APPLICATION.statusBadge}
                </span>
              </div>

              {/* Human readable message box */}
              <div style={{ backgroundColor: 'var(--success-light)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--success)', margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
                  {ACTIVE_APPLICATION.humanDescription}
                </p>
              </div>

              {/* Timeline */}
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
                Application Journey & DBT Timeline:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '24px' }}>
                {/* Timeline connector line */}
                <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '16px', width: '2px', backgroundColor: 'var(--success)' }} />

                {ACTIVE_APPLICATION.timeline.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {/* Circle icon */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '-24px', 
                      top: '2px', 
                      width: '18px', 
                      height: '18px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--success)', 
                      color: '#fff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '10px'
                    }}>
                      ✓
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
                        {step.date}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {step.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Renewal AutoPilot Prompt */}
              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Renewal AutoPilot
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Renewal window for 2027-28 opens 15 May 2027
                  </div>
                </div>
                <button 
                  onClick={() => alert("Renewal AutoPilot is configured to automatically fetch semester GPA from APAAR repository.")}
                  className="btn-secondary" 
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                >
                  Configure
                </button>
              </div>
            </div>

            {/* Need Help CTA */}
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <button 
                onClick={onOpenGrievance}
                style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
              >
                Having an issue with this application? File Grievance Ticket
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: JAGO CHATBOT ==================== */}
        {activeTab === 'jago' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '520px' }}>
            {/* Top Assistant Header */}
            <div style={{ padding: '12px 16px', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  🎙️
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>JAGO Multilingual Assistant</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Voice Enabled • MoTA ST Knowledge Base</div>
                </div>
              </div>

              {isSpeaking && (
                <button 
                  onClick={() => {
                    window.speechSynthesis && window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }}
                  style={{ color: '#facc15', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Volume2 size={14} className="pulse-indicator" /> Stop Audio
                </button>
              )}
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' }}>
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    backgroundColor: msg.sender === 'user' ? 'var(--primary)' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    borderBottomRightRadius: msg.sender === 'user' ? '2px' : '14px',
                    borderBottomLeftRadius: msg.sender === 'jago' ? '2px' : '14px',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    border: msg.sender === 'jago' ? '1px solid var(--border-color)' : 'none'
                  }}
                >
                  <div>{msg.text}</div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '6px', 
                    fontSize: '0.65rem', 
                    opacity: 0.7 
                  }}>
                    <span>{msg.time}</span>
                    {msg.sender === 'jago' && (
                      <button 
                        onClick={() => handleSpeak(msg.text)}
                        style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}
                        title="Listen to response"
                      >
                        <Volume2 size={12} /> Speak
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions Pills */}
            <div style={{ padding: '8px 12px', backgroundColor: '#fff', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '6px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <button 
                onClick={() => handleSendMessage("Which scholarship can I apply for?")}
                style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '14px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600, border: '1px solid var(--primary-subtle)' }}
              >
                Which scholarship can I get?
              </button>
              <button 
                onClick={() => handleSendMessage("Has my scholarship amount been released?")}
                style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '14px', backgroundColor: 'var(--success-light)', color: 'var(--success)', fontWeight: 600, border: '1px solid var(--success-border)' }}
              >
                Has money been released?
              </button>
              <button 
                onClick={() => handleSendMessage("What document is missing or requires update?")}
                style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '14px', backgroundColor: 'var(--warning-light)', color: 'var(--warning)', fontWeight: 600, border: '1px solid var(--warning-border)' }}
              >
                What document is missing?
              </button>
            </div>

            {/* Chat Input Bar */}
            <div style={{ padding: '10px 14px', backgroundColor: '#fff', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                onClick={() => {
                  alert("🎙️ Simulated Microphone Input: 'Can I renew my scholarship for next year?'");
                  handleSendMessage("Can I renew my scholarship for the next academic year?");
                }}
                style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}
                title="Voice Input (Speech to Text)"
              >
                <Mic size={18} />
              </button>

              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask in English, हिन्दी, ଓଡ଼ିଆ, ᱥᱟᱱᱛᱟᱲᱤ..."
                style={{ flex: 1, padding: '9px 12px', borderRadius: '20px', border: '1px solid var(--border-strong)', fontSize: '0.82rem', outline: 'none' }}
              />

              <button 
                onClick={() => handleSendMessage()}
                style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: PROFILE (Scholarship Passport) ==================== */}
        {activeTab === 'profile' && (
          <div style={{ padding: '16px' }}>
            {/* Header */}
            <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                  Scholarship Passport
                </h2>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  {STUDENT_PROFILE.passportId}
                </p>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <ShieldCheck size={13} /> {STUDENT_PROFILE.passportStatus}
              </span>
            </div>

            {/* Passport Flow Banner */}
            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Unified Passport Lifecycle
              </div>
              <div style={{ display: 'flex', overflowX: 'auto', gap: '6px', fontSize: '0.68rem', paddingBottom: '4px' }}>
                {['Register', 'Passport', 'Auto-Fetch', 'Verify', 'Eligible', 'Recommend', '1-Click Apply', 'Sanction', 'DBT'].map((step, i) => (
                  <span key={i} style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap', fontWeight: 600 }}>
                    {i + 1}. {step}
                  </span>
                ))}
              </div>
            </div>

            {/* Passport Sections */}

            {/* Section 1: Personal Details */}
            <div className="gov-card" style={{ padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                  1. Personal & Aadhaar Details
                </h4>
                <span className="badge badge-green">Verified (UIDAI)</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div><strong>Full Name:</strong> {STUDENT_PROFILE.name}</div>
                <div><strong>DOB:</strong> {STUDENT_PROFILE.dob}</div>
                <div><strong>Gender:</strong> {STUDENT_PROFILE.gender}</div>
                <div><strong>Aadhaar:</strong> {STUDENT_PROFILE.aadhaar.maskedNumber}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>Address:</strong> {STUDENT_PROFILE.address}</div>
              </div>
            </div>

            {/* Section 2: Tribal Information */}
            <div className="gov-card" style={{ padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                  2. Tribal Information
                </h4>
                <span className="badge badge-green">Verified (e-District)</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div><strong>Category:</strong> Scheduled Tribe (ST)</div>
                <div><strong>Tribe Name:</strong> {STUDENT_PROFILE.tribal.tribeName}</div>
                <div><strong>PVTG Status:</strong> {STUDENT_PROFILE.tribal.pvtgStatus.split(' ')[0]}</div>
                <div><strong>Certificate #:</strong> {STUDENT_PROFILE.tribal.certificateNo}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>Issuing Authority:</strong> {STUDENT_PROFILE.tribal.issuingAuthority}</div>
              </div>
            </div>

            {/* Section 3: Academic Profile */}
            <div className="gov-card" style={{ padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                  3. Academic Profile
                </h4>
                <span className="badge badge-green">APAAR & AISHE Verified</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div><strong>APAAR ID:</strong> {STUDENT_PROFILE.academic.apaarId}</div>
                <div><strong>AISHE Code:</strong> {STUDENT_PROFILE.academic.aisheCode}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>Institute:</strong> {STUDENT_PROFILE.academic.institutionName}</div>
                <div><strong>Course:</strong> {STUDENT_PROFILE.academic.course}</div>
                <div><strong>Discipline:</strong> Computer Science</div>
                <div><strong>Current Year:</strong> {STUDENT_PROFILE.academic.currentYear}</div>
                <div><strong>CGPA:</strong> {STUDENT_PROFILE.academic.cgpa} (89.4% Attendance)</div>
              </div>
            </div>

            {/* Section 4: Family & Income */}
            <div className="gov-card" style={{ padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                  4. Family & Income Status
                </h4>
                <span className={`badge ${incomeRenewed ? 'badge-green' : 'badge-amber'}`}>
                  {incomeRenewed ? 'Verified' : 'Expires in 45 days'}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div><strong>Annual Income:</strong> {STUDENT_PROFILE.family.formattedIncome}</div>
                <div><strong>Father:</strong> {STUDENT_PROFILE.fatherName}</div>
                <div><strong>Certificate:</strong> {incomeRenewed ? 'OD/INC/2026/94821' : STUDENT_PROFILE.family.incomeCertificateNo}</div>
                <div><strong>Domicile:</strong> {STUDENT_PROFILE.family.domicileStatus} (Odisha)</div>
              </div>
            </div>

            {/* Section 5: Bank & DBT */}
            <div className="gov-card" style={{ padding: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                  5. Bank & DBT Integration
                </h4>
                <span className="badge badge-green">NPCI & PFMS Active</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div><strong>Bank:</strong> {STUDENT_PROFILE.bank.bankName}</div>
                <div><strong>Account:</strong> {STUDENT_PROFILE.bank.accountMasked}</div>
                <div><strong>IFSC:</strong> {STUDENT_PROFILE.bank.ifsc}</div>
                <div><strong>Aadhaar Seeded:</strong> Yes (APBS Ready)</div>
              </div>
            </div>

            {/* Download Passport CTA */}
            <button 
              onClick={() => alert("Downloading official MoTA Digital Scholarship Passport Card (Signed Cryptographic PDF)...")}
              className="btn-primary" 
              style={{ width: '100%', fontSize: '0.85rem', padding: '10px' }}
            >
              <Download size={16} /> Download Verified Scholarship Passport
            </button>
          </div>
        )}

      </div>

      {/* ==================== 5 BOTTOM NAVIGATION TABS ==================== */}
      <nav className="mobile-bottom-nav">
        <button 
          onClick={() => { setActiveTab('home'); setSubScreen(null); }}
          className={`mobile-nav-item ${activeTab === 'home' && !subScreen ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>{t.home}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('scholarships'); setSubScreen(null); }}
          className={`mobile-nav-item ${activeTab === 'scholarships' && !subScreen ? 'active' : ''}`}
        >
          <GraduationCap size={20} />
          <span>{t.scholarships}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('applications'); setSubScreen(null); }}
          className={`mobile-nav-item ${activeTab === 'applications' && !subScreen ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span>{t.applications}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('jago'); setSubScreen(null); }}
          className={`mobile-nav-item ${activeTab === 'jago' && !subScreen ? 'active' : ''}`}
        >
          <MessageSquare size={20} />
          <span>{t.jago}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('profile'); setSubScreen(null); }}
          className={`mobile-nav-item ${activeTab === 'profile' && !subScreen ? 'active' : ''}`}
        >
          <UserCheck size={20} />
          <span>{t.profile}</span>
        </button>
      </nav>

      {/* Floating JAGO Button when not on chat tab */}
      {activeTab !== 'jago' && !subScreen && (
        <button 
          onClick={() => setActiveTab('jago')}
          className="floating-jago-btn"
          title="Ask JAGO Assistant"
        >
          <span style={{ fontSize: '18px' }}>🎙️</span>
          <span>Ask JAGO</span>
        </button>
      )}

      {/* Scheme Compatibility Modal */}
      {compatibilityCheckScheme && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '420px', width: '100%', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                Scheme Compatibility Checker
              </h3>
              <button onClick={() => setCompatibilityCheckScheme(null)} style={{ fontSize: '18px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Comparing: <strong>{compatibilityCheckScheme.shortName}</strong> vs Current Active Scholarship (<strong>Top Class Education</strong>)
              </div>

              <div style={{ backgroundColor: 'var(--warning-light)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-md)', padding: '12px', fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                <strong>⚠️ Concurrent Benefit Conflict:</strong> Under Ministry of Tribal Affairs guidelines, a student cannot simultaneously draw benefits under both <em>Post-Matric</em> and <em>Top Class Higher Education</em>.
                <div style={{ marginTop: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                  Recommendation: Your current Top Class Education grant provides higher financial coverage (₹1,12,000/yr vs ₹13,500/yr Post-Matric). We recommend continuing your Top Class grant.
                </div>
              </div>
            </div>

            <button onClick={() => setCompatibilityCheckScheme(null)} className="btn-primary" style={{ width: '100%', fontSize: '12px' }}>
              Understood
            </button>
          </div>
        </div>
      )}

      {/* 1-Click Apply Modal using Scholarship Passport */}
      {subScreen === 'apply-modal' && selectedSchemeForApply && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '440px', width: '100%', padding: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                1-Click Passport Application
              </h3>
              <button onClick={() => setSubScreen(null)} style={{ fontSize: '18px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {appliedSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Application Submitted!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '8px 0 16px' }}>
                  Application #{`APP-2026-NOS-${Math.floor(10000 + Math.random() * 90000)}`} has been submitted using your verified Scholarship Passport.
                </p>
                <button 
                  onClick={() => {
                    setAppliedSuccess(false);
                    setSubScreen(null);
                    setActiveTab('applications');
                  }}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '13px' }}
                >
                  View in My Applications
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Applying for: <strong>{selectedSchemeForApply.name}</strong>
                </div>

                <div style={{ backgroundColor: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                    Zero Data Re-Entry Active:
                  </div>
                  <div>✓ Name & Aadhaar auto-fetched from Passport</div>
                  <div>✓ ST Certificate #OD/ST/2022/41029 verified</div>
                  <div>✓ Academic records linked via APAAR ID</div>
                  <div>✓ Bank account mapped for DBT</div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '16px' }}>
                  By clicking submit, you authorize the Ministry of Tribal Affairs to verify your documents through National Academic Depository and UIDAI.
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setSubScreen(null)} className="btn-secondary" style={{ flex: 1, fontSize: '12px' }}>
                    Cancel
                  </button>
                  <button 
                    onClick={() => setAppliedSuccess(true)}
                    className="btn-primary" 
                    style={{ flex: 2, fontSize: '12px' }}
                  >
                    Confirm & Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
