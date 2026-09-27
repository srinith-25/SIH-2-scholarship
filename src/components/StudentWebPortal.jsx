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
  ArrowUpRight,
  Search,
  Check,
  Building,
  User,
  AlertTriangle
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

export const StudentWebPortal = ({ 
  language = 'en', 
  networkMode = 'online', 
  onOpenGrievance 
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview | passport | scholarships | applications | documents | money | exceptions | jago
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);
  const [incomeRenewed, setIncomeRenewed] = useState(false);
  const [compatibilityCheckScheme, setCompatibilityCheckScheme] = useState(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'jago',
      text: `Namaste ${STUDENT_PROFILE.name}! I am JAGO, your multilingual AI scholarship assistant for the Ministry of Tribal Affairs. How can I help you today?`,
      time: '14:48'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Speech synthesis
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
      alert("Text-to-speech audio: " + text);
    }
  };

  // Chat submit
  const handleSendMessage = (customText) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');

    setTimeout(() => {
      let replyText = "I have reviewed your inquiry against your verified Scholarship Passport (B.Tech at NIT Rourkela, ST Munda Tribe). Your current Top Class scholarship of ₹1,12,000 has been credited via DBT to your Canara Bank account.";
      
      const foundFaq = JAGO_FAQS.find(f => 
        textToSend.toLowerCase().includes(f.question.toLowerCase().slice(0, 15)) ||
        f.question.toLowerCase().includes(textToSend.toLowerCase().slice(0, 15))
      );

      if (foundFaq) {
        replyText = foundFaq.reply;
      } else if (textToSend.toLowerCase().includes('money') || textToSend.toLowerCase().includes('payment') || textToSend.toLowerCase().includes('dbt')) {
        replyText = "Your scholarship amount of ₹1,12,000 was credited on 18 Sep 2026 to Canara Bank account ending in 4821 with UTR: CANR26081498102.";
      } else if (textToSend.toLowerCase().includes('document') || textToSend.toLowerCase().includes('income')) {
        replyText = "Your Family Income Certificate (#OD/INC/2025/89410) expires in 45 days. You can easily click 'Update Now' in your Documents tab to auto-sync from Odisha e-District.";
      } else if (textToSend.toLowerCase().includes('grievance') || textToSend.toLowerCase().includes('complaint')) {
        replyText = "I can immediately register a formal Grievance Ticket with MoTA. Would you like to file a ticket regarding Payment, Document Verification, or Institution?";
      }

      setChatMessages(prev => [...prev, { sender: 'jago', text: replyText, time: 'Just now' }]);
    }, 500);
  };

  // Simulate DigiLocker Re-fetch of Income Certificate
  const handleAutoRenewIncome = () => {
    setIncomeRenewed(true);
    alert("Connected to Odisha e-District API via DigiLocker!\n\nSuccessfully fetched renewed Income Certificate #OD/INC/2026/94821 valid until 30-Sep-2027.\n\nScholarship Passport updated to 100% Complete!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* Sub Navigation Strip for Full Web Portal */}
      <div className="portal-nav-tabs">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`portal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <Home size={18} />
          <span>Dashboard Overview</span>
        </button>

        <button 
          onClick={() => setActiveTab('passport')}
          className={`portal-tab-btn ${activeTab === 'passport' ? 'active' : ''}`}
        >
          <UserCheck size={18} />
          <span>Scholarship Passport</span>
          <span className="badge badge-green" style={{ fontSize: '10px', padding: '1px 6px' }}>
            {incomeRenewed ? '100%' : '92%'}
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('scholarships')}
          className={`portal-tab-btn ${activeTab === 'scholarships' ? 'active' : ''}`}
        >
          <GraduationCap size={18} />
          <span>Scholarships for Me</span>
          <span className="badge badge-blue" style={{ fontSize: '10px', padding: '1px 6px' }}>2 Eligible</span>
        </button>

        <button 
          onClick={() => setActiveTab('applications')}
          className={`portal-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
        >
          <FileText size={18} />
          <span>My Applications & Tracking</span>
          <span className="badge badge-green" style={{ fontSize: '10px', padding: '1px 6px' }}>Credited</span>
        </button>

        <button 
          onClick={() => setActiveTab('documents')}
          className={`portal-tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
        >
          <FolderLock size={18} />
          <span>DigiLocker Document Wallet</span>
          <span className="badge badge-blue" style={{ fontSize: '10px', padding: '1px 6px' }}>7 Verified</span>
        </button>

        <button 
          onClick={() => setActiveTab('money')}
          className={`portal-tab-btn ${activeTab === 'money' ? 'active' : ''}`}
        >
          <CreditCard size={18} />
          <span>My Money & DBT Disbursal</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--success)', marginLeft: '4px' }}>₹1,12,000</span>
        </button>

        <button 
          onClick={() => setActiveTab('exceptions')}
          className={`portal-tab-btn ${activeTab === 'exceptions' ? 'active' : ''}`}
        >
          <AlertCircle size={18} />
          <span>Smart Exceptions</span>
          <span className="badge badge-green" style={{ fontSize: '10px', padding: '1px 6px' }}>Resolved</span>
        </button>

        <button 
          onClick={() => setActiveTab('jago')}
          className={`portal-tab-btn ${activeTab === 'jago' ? 'active' : ''}`}
        >
          <MessageSquare size={18} />
          <span>JAGO AI Voice Assistant</span>
        </button>
      </div>

      {/* Main Container Content */}
      <div className="container" style={{ padding: '24px', flex: 1 }}>
        
        {/* ========================================================= */}
        {/* 1. DASHBOARD OVERVIEW TAB                                 */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div>
            
            {/* Top Welcome Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, #0a2540 0%, #0f3c68 50%, #0f766e 100%)', 
              color: '#ffffff', 
              borderRadius: 'var(--radius-xl)', 
              padding: '28px 32px', 
              marginBottom: '24px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                    STUDENT PORTAL
                  </span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                    Scholarship ID: {STUDENT_PROFILE.id}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                  {t.welcome}, {STUDENT_PROFILE.name}!
                </h2>
                <p style={{ fontSize: '0.92rem', opacity: 0.95, margin: 0, color: '#e0f2fe' }}>
                  {STUDENT_PROFILE.academic.course} • {STUDENT_PROFILE.academic.institutionName} • <strong>{STUDENT_PROFILE.tribal.tribeName} Tribe</strong>
                </p>
              </div>

              {/* Passport Health Card Widget */}
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.12)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '16px 22px', 
                minWidth: '270px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <ShieldCheck size={18} style={{ color: '#38bdf8' }} />
                    <span>Scholarship Passport</span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#38bdf8' }}>
                    {incomeRenewed ? '100%' : '92%'} {t.passportCompletion}
                  </span>
                </div>

                <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', margin: '8px 0 12px', overflow: 'hidden' }}>
                  <div style={{ width: incomeRenewed ? '100%' : '92%', height: '100%', backgroundColor: '#38bdf8', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => setActiveTab('passport')}
                    style={{ backgroundColor: '#ffffff', color: 'var(--primary)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700, flex: 1 }}
                  >
                    View Passport
                  </button>
                  <button 
                    onClick={() => setActiveTab('documents')}
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 600 }}
                  >
                    Wallet
                  </button>
                </div>
              </div>
            </div>

            {/* Action Required Alert Box */}
            {!incomeRenewed && (
              <div style={{ 
                backgroundColor: 'var(--warning-light)', 
                border: '1.5px solid var(--warning-border)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '16px 20px', 
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)', flexShrink: 0 }}>
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--warning)' }}>{t.actionRequired}: Annual Family Income Certificate Renewal</strong>
                      <span className="badge badge-amber" style={{ fontSize: '10px' }}>Expires in 45 Days</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '4px 0 0', lineHeight: 1.4 }}>
                      Certificate #OD/INC/2025/89410 expires on <strong>09 Aug 2026</strong>. One-click sync your renewed certificate from Odisha e-District to maintain uninterrupted scholarship sanction.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleAutoRenewIncome}
                  className="btn-primary" 
                  style={{ backgroundColor: 'var(--warning)', padding: '9px 18px', fontSize: '0.85rem' }}
                >
                  <RefreshCw size={14} /> Update Now from Odisha e-District
                </button>
              </div>
            )}

            {/* Smart Exception Auto-Resolution Banner */}
            <div style={{ 
              backgroundColor: 'var(--success-light)', 
              border: '1px solid var(--success-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '12px 18px', 
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.84rem', color: 'var(--success)', fontWeight: 600 }}>
                  Smart Exception Applied: Name format difference between APAAR ID ('K. Ananya Munda') and Aadhaar ('Ananya Munda') successfully resolved without application delay.
                </span>
              </div>
              <button 
                onClick={() => setActiveTab('exceptions')}
                style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, textDecoration: 'underline' }}
              >
                View Exception Audit Record
              </button>
            </div>

            {/* 4 Primary Navigation Cards Grid */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px' }}>
              Primary Scholarship Actions
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              
              {/* Card 1: Scholarships for Me */}
              <div 
                onClick={() => setActiveTab('scholarships')}
                className="gov-card" 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #1d4ed8' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                      <GraduationCap size={24} />
                    </div>
                    <span className="badge badge-green">2 Schemes Matched</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px' }}>
                    {t.scholarshipsForMe}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Zero-search deterministic AI recommendation matching your verified tribal, academic, and income credentials.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>Explore Eligible Schemes</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Card 2: My Applications */}
              <div 
                onClick={() => setActiveTab('applications')}
                className="gov-card" 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #0f766e' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--secondary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                      <FileText size={24} />
                    </div>
                    <span className="badge badge-green">Sanctioned & Credited</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px' }}>
                    {t.myApplications}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    End-to-end transparent tracking of your Top Class Higher Education application with human-readable timelines.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--secondary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>Track Application Progress</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Card 3: DigiLocker Documents */}
              <div 
                onClick={() => setActiveTab('documents')}
                className="gov-card" 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #8b5cf6' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                      <FolderLock size={24} />
                    </div>
                    <span className="badge badge-blue">7 Documents Ready</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px' }}>
                    {t.myDocuments}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Legally verified digital wallet integrated directly with DigiLocker, UIDAI, and State e-District portals.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8b5cf6', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>Open Document Wallet</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Card 4: My Money (DBT) */}
              <div 
                onClick={() => setActiveTab('money')}
                className="gov-card" 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #15803d' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                      <CreditCard size={24} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--success)' }}>₹1,12,000</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px' }}>
                    {t.myMoney}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Direct Benefit Transfer monitoring via NPCI Aadhaar Payment Bridge System with transaction UTR proofs.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--success)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>View Disbursal Breakdown</span>
                  <ArrowRight size={16} />
                </div>
              </div>

            </div>

            {/* Quick Renewal AutoPilot Section */}
            <div className="gov-card" style={{ padding: '20px 24px', backgroundColor: '#faf5ff', borderColor: '#e9d5ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', flexShrink: 0 }}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#6b21a8', margin: '0 0 2px' }}>
                    Renewal AutoPilot Configured
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    When your Year 3 (6th Semester) mark sheet is published in the Academic Bank of Credits (APAAR), your 2027-28 renewal will automatically prepare with zero repetitive paperwork.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => alert("Renewal AutoPilot is active and connected to APAAR academic credit repository.")}
                className="btn-secondary" 
                style={{ fontSize: '12px', padding: '8px 16px' }}
              >
                Configure Settings
              </button>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 2. SCHOLARSHIP PASSPORT TAB                                */}
        {/* ========================================================= */}
        {activeTab === 'passport' && (
          <div>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '6px' }}>CORE PLATFORM INNOVATION</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                  Scholarship Passport • Verified Student Record
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  Passport ID: <strong>{STUDENT_PROFILE.passportId}</strong> • Last Synchronized: {STUDENT_PROFILE.lastVerifiedDate}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => alert("Downloading official cryptographically signed MoTA Digital Scholarship Passport...")}
                  className="btn-primary" 
                  style={{ fontSize: '13px' }}
                >
                  <Download size={15} /> Download Passport Card (PDF)
                </button>
              </div>
            </div>

            {/* Visual Process Flow Diagram */}
            <div className="gov-card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Visual Scholarship Passport Journey:
              </div>
              <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '6px' }}>
                {[
                  { step: "1. Register", status: "done" },
                  { step: "2. Create Passport", status: "done" },
                  { step: "3. Auto-Fetch Data", status: "done" },
                  { step: "4. Verify Documents", status: "done" },
                  { step: "5. Calculate Eligibility", status: "done" },
                  { step: "6. Recommend Schemes", status: "done" },
                  { step: "7. 1-Click Apply", status: "done" },
                  { step: "8. MoTA Sanction", status: "done" },
                  { step: "9. DBT Payment", status: "done" },
                  { step: "10. Renewal AutoPilot", status: "ready" }
                ].map((item, idx) => (
                  <div key={idx} style={{ 
                    backgroundColor: item.status === 'done' ? 'var(--success-light)' : 'var(--primary-light)', 
                    color: item.status === 'done' ? 'var(--success)' : 'var(--primary)',
                    border: `1px solid ${item.status === 'done' ? 'var(--success-border)' : 'var(--primary-subtle)'}`,
                    padding: '6px 12px', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.75rem', 
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {item.status === 'done' && <Check size={12} />}
                    <span>{item.step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Pillars Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
              
              {/* Pillar 1: Personal & Identity */}
              <div className="gov-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} /> 1. Personal & Aadhaar Identity
                  </h4>
                  <span className="badge badge-green">Verified (UIDAI)</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.84rem' }}>
                  <div><strong>Full Name:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.name}</div></div>
                  <div><strong>Date of Birth:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.dob}</div></div>
                  <div><strong>Gender:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.gender}</div></div>
                  <div><strong>Aadhaar Number:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.aadhaar.maskedNumber}</div></div>
                  <div><strong>Registered Mobile:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.mobile}</div></div>
                  <div><strong>Email:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.email}</div></div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Permanent Address:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.address}</div></div>
                </div>
              </div>

              {/* Pillar 2: Tribal Authenticity */}
              <div className="gov-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏛️ 2. Tribal Community Status
                  </h4>
                  <span className="badge badge-green">Verified (Odisha e-District)</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.84rem' }}>
                  <div><strong>Category:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.tribal.category}</div></div>
                  <div><strong>Tribe Name:</strong> <div style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>{STUDENT_PROFILE.tribal.tribeName}</div></div>
                  <div><strong>PVTG Status:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>Non-PVTG (Standard ST Quota)</div></div>
                  <div><strong>Certificate No:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.tribal.certificateNo}</div></div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Issuing Authority:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.tribal.issuingAuthority}</div></div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Digital Signature Seal:</strong> <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{STUDENT_PROFILE.tribal.digitalSeal}</div></div>
                </div>
              </div>

              {/* Pillar 3: Academic Profile */}
              <div className="gov-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🎓 3. Academic Records (APAAR / ABC)
                  </h4>
                  <span className="badge badge-green">APAAR & AISHE Validated</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.84rem' }}>
                  <div><strong>APAAR ID:</strong> <div style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>{STUDENT_PROFILE.academic.apaarId}</div></div>
                  <div><strong>AISHE Code:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.academic.aisheCode}</div></div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Institution:</strong> <div style={{ color: 'var(--text-main)', fontWeight: 600, marginTop: '2px' }}>{STUDENT_PROFILE.academic.institutionName}</div></div>
                  <div><strong>Course / Degree:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.academic.course}</div></div>
                  <div><strong>Discipline:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>Computer Science & Engg</div></div>
                  <div><strong>Current Year / Term:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.academic.currentYear}</div></div>
                  <div><strong>CGPA & Attendance:</strong> <div style={{ color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>{STUDENT_PROFILE.academic.cgpa} CGPA (89.4% Attendance)</div></div>
                </div>
              </div>

              {/* Pillar 4: Family & Income */}
              <div className="gov-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    💰 4. Family & Income Status
                  </h4>
                  <span className={`badge ${incomeRenewed ? 'badge-green' : 'badge-amber'}`}>
                    {incomeRenewed ? 'Renewed & Active' : 'Expires in 45 Days'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.84rem' }}>
                  <div><strong>Family Annual Income:</strong> <div style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>{STUDENT_PROFILE.family.formattedIncome}</div></div>
                  <div><strong>Father / Guardian:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.fatherName}</div></div>
                  <div><strong>Income Certificate No:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{incomeRenewed ? 'OD/INC/2026/94821' : STUDENT_PROFILE.family.incomeCertificateNo}</div></div>
                  <div><strong>State Domicile:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.family.domicileStatus} (Odisha)</div></div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <strong>Validity Status:</strong> 
                    <div style={{ color: incomeRenewed ? 'var(--success)' : 'var(--warning)', fontWeight: 600, marginTop: '2px' }}>
                      {incomeRenewed ? 'Valid until 30-Sep-2027 (Renewed via DigiLocker)' : 'Expires on 09-Aug-2026 (45 days remaining)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 5: Bank & Direct Benefit Transfer (DBT) */}
              <div className="gov-card" style={{ padding: '20px', gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    💳 5. Bank Account & Aadhaar Payment Bridge System (APBS)
                  </h4>
                  <span className="badge badge-green">NPCI & PFMS Validated</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.84rem' }}>
                  <div><strong>Bank Name:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.bank.bankName}</div></div>
                  <div><strong>Branch:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.bank.branch}</div></div>
                  <div><strong>Account Number:</strong> <div style={{ color: 'var(--text-main)', fontWeight: 600, marginTop: '2px' }}>{STUDENT_PROFILE.bank.accountMasked}</div></div>
                  <div><strong>IFSC Code:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{STUDENT_PROFILE.bank.ifsc}</div></div>
                  <div><strong>Aadhaar Mapped:</strong> <div style={{ color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>Active (NPCI APBS Mapper)</div></div>
                  <div><strong>PFMS Ledger Status:</strong> <div style={{ color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>Validated for Central DBT</div></div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. SCHOLARSHIPS FOR ME TAB                                */}
        {/* ========================================================= */}
        {activeTab === 'scholarships' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                {t.scholarshipsForMe} • Automated Scheme Discovery
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Zero-search opportunity matching. Evaluated automatically against your verified Scholarship Passport.
              </p>
            </div>

            {/* Deterministic Compatibility Strip */}
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '14px 20px', borderRadius: 'var(--radius-lg)', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Layers size={22} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.84rem', color: 'var(--primary)', lineHeight: 1.45 }}>
                <strong>Deterministic Compatibility Engine:</strong> MoTA regulations prevent duplicate central scholarship disbursements for the same academic year. The system automatically highlights your maximum entitled benefit and prevents conflicting applications.
              </div>
            </div>

            {/* Scheme Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {SCHEMES.map((scheme) => {
                const isTopClass = scheme.id === 'top-class';
                const isPostMatric = scheme.id === 'post-matric';
                const isNOS = scheme.id === 'nos';

                return (
                  <div key={scheme.id} className="gov-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span className={`badge ${scheme.matchScore > 80 ? 'badge-green' : scheme.matchScore > 50 ? 'badge-blue' : 'badge-amber'}`}>
                            {scheme.matchScore}% Match Score
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Level: {scheme.level}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 6px' }}>
                          {scheme.name}
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>
                          Coverage: <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{scheme.coverage}</span>
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Application Deadline:</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{scheme.deadline}</div>
                      </div>
                    </div>

                    {/* Explainable Eligibility Breakdown */}
                    <div style={{ backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '16px' }}>
                      <h5 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        Explainable Eligibility Rule Check:
                      </h5>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '8px' }}>
                        {scheme.eligibleCriteriaList.map((crit, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                            {crit.met ? (
                              <CheckCircle2 size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
                            ) : (
                              <XCircle size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                            )}
                            <span style={{ color: crit.met ? 'var(--text-main)' : 'var(--danger)', fontWeight: crit.met ? 500 : 600 }}>
                              {crit.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      {isTopClass ? (
                        <div style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', padding: '8px 18px', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.85rem', border: '1px solid var(--success-border)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={16} /> Active Grant Sanctioned (APP-2026-TCE-98102)
                        </div>
                      ) : isPostMatric ? (
                        <button 
                          onClick={() => setCompatibilityCheckScheme(scheme)}
                          className="btn-secondary" 
                          style={{ fontSize: '13px' }}
                        >
                          Check Scheme Compatibility Rules
                        </button>
                      ) : isNOS ? (
                        <button 
                          onClick={() => {
                            setSelectedSchemeForApply(scheme);
                          }}
                          className="btn-primary" 
                          style={{ fontSize: '13px' }}
                        >
                          Apply for Foreign Studies (NOS)
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                          Eligible at Master / Ph.D. Level
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. MY APPLICATIONS TAB                                     */}
        {/* ========================================================= */}
        {activeTab === 'applications' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                {t.myApplications} • Real-Time Tracking
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Full audit-transparent milestone timeline from submission to bank credit
              </p>
            </div>

            {/* Application Tracking Card */}
            <div className="gov-card" style={{ padding: '28px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 700 }}>
                    APPLICATION #{ACTIVE_APPLICATION.applicationId}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
                    {ACTIVE_APPLICATION.schemeName}
                  </h3>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Academic Session: <strong>{ACTIVE_APPLICATION.academicYear}</strong> • Sanction Ref: <strong>MoTA/TCE/2026/OD-8492</strong>
                  </span>
                </div>

                <span className="badge badge-green" style={{ fontSize: '13px', padding: '6px 14px' }}>
                  <CheckCircle2 size={15} /> {ACTIVE_APPLICATION.statusBadge}
                </span>
              </div>

              {/* Human-Readable Status Description Banner */}
              <div style={{ backgroundColor: 'var(--success-light)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--success)', marginBottom: '4px' }}>
                  Current Status Update:
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>
                  {ACTIVE_APPLICATION.humanDescription}
                </p>
              </div>

              {/* Visual 8-Stage Timeline */}
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '18px' }}>
                End-to-End Application & DBT Verification Timeline
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                {ACTIVE_APPLICATION.timeline.map((step, idx) => (
                  <div key={idx} style={{ 
                    backgroundColor: 'var(--bg-muted)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '14px',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>
                        ✓
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-main)' }}>
                        {step.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginLeft: '30px' }}>
                      {step.date}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '6px 0 0 30px', lineHeight: 1.4 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Renewal AutoPilot Prompt */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>
                    Renewal AutoPilot Ready
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Subsequent academic year (2027-28) renewal window opens automatically in May 2027.
                  </div>
                </div>

                <button 
                  onClick={onOpenGrievance}
                  className="btn-secondary" 
                  style={{ fontSize: '12px', padding: '8px 16px' }}
                >
                  <HelpCircle size={14} /> Raise Grievance on this Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. DIGILOCKER DOCUMENT WALLET TAB                         */}
        {/* ========================================================= */}
        {activeTab === 'documents' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                  DigiLocker Document Wallet • Verified Certificates
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  Legally valid documents retrieved directly from state and central issuing repositories
                </p>
              </div>

              <button 
                onClick={handleAutoRenewIncome}
                className="btn-secondary" 
                style={{ fontSize: '13px' }}
              >
                <RefreshCw size={14} /> Sync All Documents from DigiLocker
              </button>
            </div>

            {/* Document Wallet Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px' }}>
              {MY_DOCUMENTS.map((doc) => {
                const isIncomeExpiring = doc.id === 'doc-3' && !incomeRenewed;
                return (
                  <div key={doc.id} className="gov-card" style={{ padding: '20px', borderLeft: isIncomeExpiring ? '4px solid var(--warning)' : '4px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 2px' }}>
                          {doc.title}
                        </h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {doc.type} • {doc.source}
                        </span>
                      </div>
                      <span className={`badge badge-${isIncomeExpiring ? 'amber' : 'green'}`}>
                        {isIncomeExpiring ? 'Expires in 45 Days' : 'Verified'}
                      </span>
                    </div>

                    <div style={{ backgroundColor: 'var(--bg-muted)', padding: '12px', borderRadius: 'var(--radius-md)', margin: '12px 0', fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <div><strong>Doc ID:</strong> {isIncomeExpiring ? doc.docRef : (doc.id === 'doc-3' ? 'OD/INC/2026/94821' : doc.docRef)}</div>
                      <div><strong>Issued Date:</strong> {doc.issuedDate}</div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <strong>Validity:</strong> {isIncomeExpiring ? 'Expires on 09-Aug-2026' : (doc.id === 'doc-3' ? 'Valid till 30-Sep-2027 (Renewed)' : doc.expiryDate)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {isIncomeExpiring ? (
                        <button 
                          onClick={handleAutoRenewIncome}
                          className="btn-primary" 
                          style={{ fontSize: '12px', padding: '6px 14px', backgroundColor: 'var(--warning)' }}
                        >
                          <RefreshCw size={12} /> Auto-Fetch Renewed Certificate
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => setSelectedDocPreview(doc)}
                            className="btn-secondary" 
                            style={{ fontSize: '12px', padding: '6px 14px' }}
                          >
                            <ExternalLink size={13} /> View Digital Certificate
                          </button>
                          <button 
                            onClick={() => alert(`Downloading cryptographically signed copy of ${doc.title}...`)}
                            className="btn-secondary" 
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                            title="Download Signed PDF"
                          >
                            <Download size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. MY MONEY & DBT TRACKING TAB                             */}
        {/* ========================================================= */}
        {activeTab === 'money' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                {t.myMoney} • Direct Benefit Transfer (DBT) Portal
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Complete transparency over sanction amounts, PFMS order generation, and bank credit milestones
              </p>
            </div>

            {/* Hero Sanction Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)', 
              color: '#ffffff', 
              borderRadius: 'var(--radius-xl)', 
              padding: '28px 32px', 
              marginBottom: '24px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: 600 }}>Current Academic Year (2026-27) Sanction</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '6px 0 10px', letterSpacing: '-0.02em' }}>
                  ₹1,12,000
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#4ade80' }} />
                  <span>Full Scholarship Amount Credited to Bank Account on <strong>18 September 2026</strong></span>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '16px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.25)', minWidth: '260px' }}>
                <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>All-Time MoTA Scholarship Received:</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '2px 0 4px' }}>
                  ₹{MY_MONEY_DATA.totalReceivedAllYears.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>3 Years Continuous Merit & Financial Support</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Bank Account Verification */}
              <div className="gov-card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--success)' }} /> Validated DBT Bank Account
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                  <div><strong>Bank Name:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{MY_MONEY_DATA.bankDetails.bank}</div></div>
                  <div><strong>Account Number:</strong> <div style={{ color: 'var(--text-main)', fontWeight: 600, marginTop: '2px' }}>{MY_MONEY_DATA.bankDetails.account}</div></div>
                  <div><strong>IFSC Code:</strong> <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{MY_MONEY_DATA.bankDetails.ifsc}</div></div>
                  <div><strong>NPCI Mapper:</strong> <div style={{ color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>Active (Aadhaar Seeded)</div></div>
                </div>
              </div>

              {/* Sanction Breakdown */}
              <div className="gov-card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px' }}>
                  Itemized Sanction Breakdown
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  {MY_MONEY_DATA.breakdown.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{item.head}</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{item.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', fontWeight: 800, fontSize: '0.95rem' }}>
                    <span>Total Sanctioned:</span>
                    <span style={{ color: 'var(--secondary)' }}>₹1,12,000</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Historical Transaction Records */}
            <div className="gov-card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px' }}>
                Disbursement Transactions & Bank UTR Records
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-muted)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '10px 14px' }}>Academic Term</th>
                      <th style={{ padding: '10px 14px' }}>Sanction Order No</th>
                      <th style={{ padding: '10px 14px' }}>Amount</th>
                      <th style={{ padding: '10px 14px' }}>Disbursement Date</th>
                      <th style={{ padding: '10px 14px' }}>Bank UTR / Transaction Ref</th>
                      <th style={{ padding: '10px 14px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MY_MONEY_DATA.transactions.map((tx) => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>{tx.scheme}</td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>{tx.orderNo}</td>
                        <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--success)' }}>₹{tx.amount.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px' }}>{tx.date}</td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{tx.utr}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span className="badge badge-green">Credited</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 7. SMART EXCEPTIONS TAB                                   */}
        {/* ========================================================= */}
        {activeTab === 'exceptions' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                Smart Exception Handling • Zero-Rejection Policy
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Anomalies and minor variations are resolved through automated reconciliation rules rather than discarding student applications.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ACTION_REQUIRED_ITEMS.map((item) => (
                <div key={item.id} className="gov-card" style={{ padding: '20px', borderLeft: item.resolved ? '4px solid var(--success)' : '4px solid var(--warning)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700 }}>
                        {item.category} • TICKET #{item.id.toUpperCase()}
                      </span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '2px 0' }}>
                        {item.title}
                      </h4>
                    </div>

                    <span className={`badge ${item.resolved ? 'badge-green' : 'badge-amber'}`}>
                      {item.resolved ? 'Auto-Reconciled' : 'Action Required'}
                    </span>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg-muted)', padding: '12px 16px', borderRadius: 'var(--radius-md)', margin: '10px 0', fontSize: '0.84rem', lineHeight: 1.45 }}>
                    <div><strong>Identified Discrepancy:</strong> {item.problem}</div>
                    <div style={{ marginTop: '4px' }}><strong>System Analysis:</strong> {item.why}</div>
                    {item.resolved && (
                      <div style={{ marginTop: '6px', color: 'var(--success)', fontWeight: 600 }}>
                        ✓ {item.resolvedBy}
                      </div>
                    )}
                  </div>

                  {!item.resolved && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button 
                        onClick={handleAutoRenewIncome}
                        className="btn-primary" 
                        style={{ fontSize: '12px', padding: '8px 16px', backgroundColor: 'var(--warning)' }}
                      >
                        <RefreshCw size={13} /> {item.actionText}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. JAGO MULTILINGUAL AI ASSISTANT TAB                     */}
        {/* ========================================================= */}
        {activeTab === 'jago' && (
          <div className="gov-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '640px' }}>
            {/* Top Assistant Header */}
            <div style={{ padding: '16px 24px', backgroundColor: 'var(--primary)', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  🎙️
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>JAGO Multilingual Voice & AI Assistant</h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85, margin: '2px 0 0' }}>
                    Trained on MoTA Scholarship Guidelines • English, हिन्दी, ଓଡ଼ିଆ, ᱥᱟᱱᱛᱟᱲᱤ, తెలుగు
                  </p>
                </div>
              </div>

              {isSpeaking && (
                <button 
                  onClick={() => {
                    window.speechSynthesis && window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }}
                  style={{ color: '#facc15', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
                >
                  <Volume2 size={16} className="pulse-indicator" /> Stop Audio
                </button>
              )}
            </div>

            {/* Chat Messages Body */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#f8fafc' }}>
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    backgroundColor: msg.sender === 'user' ? 'var(--primary)' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    borderBottomRightRadius: msg.sender === 'user' ? '2px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'jago' ? '2px' : '16px',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    border: msg.sender === 'jago' ? '1px solid var(--border-color)' : 'none'
                  }}
                >
                  <div>{msg.text}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', opacity: 0.75 }}>
                    <span>{msg.time}</span>
                    {msg.sender === 'jago' && (
                      <button 
                        onClick={() => handleSpeak(msg.text)}
                        style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}
                      >
                        <Volume2 size={13} /> Speak Answer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestion Chips */}
            <div style={{ padding: '10px 20px', backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <button 
                onClick={() => handleSendMessage("Which scholarship can I apply for?")}
                style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600, border: '1px solid var(--primary-subtle)' }}
              >
                Which scholarship can I get?
              </button>
              <button 
                onClick={() => handleSendMessage("Has my scholarship amount been released?")}
                style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'var(--success-light)', color: 'var(--success)', fontWeight: 600, border: '1px solid var(--success-border)' }}
              >
                Has money been released?
              </button>
              <button 
                onClick={() => handleSendMessage("What document is missing or requires update?")}
                style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'var(--warning-light)', color: 'var(--warning)', fontWeight: 600, border: '1px solid var(--warning-border)' }}
              >
                What document is missing?
              </button>
              <button 
                onClick={() => handleSendMessage("Can I renew my scholarship for the next academic year?")}
                style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'var(--bg-muted)', color: 'var(--text-main)', fontWeight: 600, border: '1px solid var(--border-color)' }}
              >
                Can I renew for next year?
              </button>
            </div>

            {/* Input Bar */}
            <div style={{ padding: '14px 20px', backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                onClick={() => {
                  alert("🎙️ Microphone Voice Recognition Simulated: 'Can I renew my scholarship for next year?'");
                  handleSendMessage("Can I renew my scholarship for the next academic year?");
                }}
                style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}
                title="Voice Input (Speech-to-Text)"
              >
                <Mic size={20} />
              </button>

              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask in English, हिन्दी, ଓଡ଼ିଆ, ᱥᱟᱱᱛᱟᱲᱤ, తెలుగు..."
                style={{ flex: 1, padding: '11px 16px', borderRadius: '24px', border: '1px solid var(--border-strong)', fontSize: '0.88rem', outline: 'none' }}
              />

              <button 
                onClick={() => handleSendMessage()}
                className="btn-primary"
                style={{ padding: '10px 20px', borderRadius: '24px' }}
              >
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Floating JAGO Docked Button (when not on JAGO tab) */}
      {activeTab !== 'jago' && (
        <button 
          onClick={() => setActiveTab('jago')}
          className="floating-jago-btn"
          title="Ask JAGO Assistant"
        >
          <span style={{ fontSize: '20px' }}>🎙️</span>
          <span>Ask JAGO Assistant</span>
        </button>
      )}

      {/* Scheme Compatibility Modal */}
      {compatibilityCheckScheme && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '540px', width: '100%', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>
                Scheme Compatibility Rule Engine
              </h3>
              <button onClick={() => setCompatibilityCheckScheme(null)} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Comparing Candidate Scheme: <strong>{compatibilityCheckScheme.shortName}</strong> vs Current Active Scholarship (<strong>Top Class Higher Education</strong>)
              </div>

              <div style={{ backgroundColor: 'var(--warning-light)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-md)', padding: '16px', fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--warning)' }}>⚠️ Concurrent Benefit Restriction:</strong> Under Ministry of Tribal Affairs guidelines, a student cannot simultaneously draw benefits under both <em>Post-Matric</em> and <em>Top Class Higher Education</em> for the same academic session.
                <div style={{ marginTop: '10px', color: 'var(--primary)', fontWeight: 600 }}>
                  Automated Recommendation: Your active Top Class grant provides significantly higher coverage (₹1,12,000/yr vs ₹13,500/yr Post-Matric). We recommend continuing your Top Class grant.
                </div>
              </div>
            </div>

            <button onClick={() => setCompatibilityCheckScheme(null)} className="btn-primary" style={{ width: '100%', fontSize: '13px' }}>
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDocPreview && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '520px', width: '100%', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{selectedDocPreview.title}</h3>
              <button onClick={() => setSelectedDocPreview(null)} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div style={{ backgroundColor: 'var(--bg-muted)', padding: '20px', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-strong)', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📜</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)' }}>GOVERNMENT OF ODISHA / INDIA</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Digitally Certified Record from {selectedDocPreview.source}</div>
              <div style={{ fontSize: '0.8rem', textAlign: 'left', background: '#fff', padding: '14px', borderRadius: 'var(--radius-sm)', lineHeight: 1.6 }}>
                <div><strong>Student Name:</strong> Ananya Munda</div>
                <div><strong>Father / Guardian:</strong> Somra Munda</div>
                <div><strong>Certificate Ref:</strong> {selectedDocPreview.docRef}</div>
                <div><strong>Digital Signature:</strong> SHA-256 Validated • Tamper-Proof</div>
                <div><strong>Legal Status:</strong> Valid under Information Technology Act 2000</div>
              </div>
            </div>

            <button onClick={() => setSelectedDocPreview(null)} className="btn-primary" style={{ width: '100%', fontSize: '13px' }}>
              Close Document Preview
            </button>
          </div>
        </div>
      )}

      {/* 1-Click Apply Modal using Scholarship Passport */}
      {selectedSchemeForApply && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '520px', width: '100%', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>
                1-Click Scholarship Passport Application
              </h3>
              <button onClick={() => { setSelectedSchemeForApply(null); setAppliedSuccess(false); }} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {appliedSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={54} style={{ color: 'var(--success)', margin: '0 auto 14px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Application Successfully Submitted!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 20px', lineHeight: 1.5 }}>
                  Application #{`APP-2026-NOS-${Math.floor(10000 + Math.random() * 90000)}`} has been registered for <strong>{selectedSchemeForApply.name}</strong> using your verified Scholarship Passport.
                </p>
                <button 
                  onClick={() => {
                    setAppliedSuccess(false);
                    setSelectedSchemeForApply(null);
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
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Applying for: <strong style={{ color: 'var(--primary)' }}>{selectedSchemeForApply.name}</strong>
                </div>

                <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '18px', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                    Zero Data Re-Entry Active:
                  </div>
                  <div>✓ Name & Aadhaar auto-fetched from Passport</div>
                  <div>✓ ST Certificate #OD/ST/2022/41029 verified via e-District</div>
                  <div>✓ Academic credentials linked via APAAR ID</div>
                  <div>✓ Bank account mapped for Direct Benefit Transfer</div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '20px', lineHeight: 1.4 }}>
                  By clicking submit, you authorize the Ministry of Tribal Affairs to verify your credentials through the National Academic Depository (NAD) and UIDAI.
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setSelectedSchemeForApply(null)} className="btn-secondary" style={{ flex: 1, fontSize: '13px' }}>
                    Cancel
                  </button>
                  <button 
                    onClick={() => setAppliedSuccess(true)}
                    className="btn-primary" 
                    style={{ flex: 2, fontSize: '13px' }}
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
