import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  RotateCcw,
  Sparkles,
  WifiOff,
  Search,
  Database,
  UserPlus,
  RefreshCw,
  Clock
} from 'lucide-react';
import { STUDENT_PROFILE } from '../data/mockData';

export const AssistedModeView = ({ onExitAssistedMode }) => {
  const [activeTab, setActiveTab] = useState('wizard'); // wizard | kiosk-reg | offline-sync | status-lookup
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: STUDENT_PROFILE.name,
    caste: 'Munda (Scheduled Tribe)',
    college: 'NIT Rourkela',
    annualIncome: 'Below ₹2,50,000 / year',
    bankAccount: 'Bank Account Linked to Aadhaar'
  });

  // Offline Sync State
  const [offlineDrafts, setOfflineDrafts] = useState([
    { id: "OFF-2026-01", applicant: "Mangal Munda", village: "Kutra (Sundargarh)", scheme: "Post-Matric ST", biometrics: "Fingerprint Captured", status: "Cached Locally (Pending Sync)" },
    { id: "OFF-2026-02", applicant: "Rani Oram", village: "Lathikata", scheme: "Pre-Matric ST", biometrics: "Iris Scan Captured", status: "Cached Locally (Pending Sync)" },
    { id: "OFF-2026-03", applicant: "Salim Kisan", village: "Rajgangpur", scheme: "Top Class ST", biometrics: "Aadhaar OTP Cached", status: "Synced with Central MoTA DB" }
  ]);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  const speakInstruction = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      alert("Voice Instruction: " + text);
    }
  };

  const questions = [
    {
      step: 1,
      title: "Step 1: Your Name & Identity",
      voiceText: "Please confirm your name and Aadhaar details. We have already verified this from government databases.",
      question: "Is this your correct name as per Aadhaar?",
      value: formData.name,
      confirmed: true,
      options: ["Yes, this is my correct name", "Need correction in spelling"]
    },
    {
      step: 2,
      title: "Step 2: Tribal Community Certificate",
      voiceText: "We found your ST certificate for Munda tribe issued by Panposh Tahasildar.",
      question: "Are you applying under Scheduled Tribe (ST) category?",
      value: formData.caste,
      confirmed: true,
      options: ["Yes, ST Munda Tribe (Verified)", "Belongs to PVTG Group"]
    },
    {
      step: 3,
      title: "Step 3: School or College Name",
      voiceText: "Your current institute is National Institute of Technology, Rourkela. Course is Bachelor of Technology.",
      question: "Are you currently enrolled at this institution?",
      value: formData.college,
      confirmed: true,
      options: ["Yes, enrolled and attending classes", "Changed college or course"]
    },
    {
      step: 4,
      title: "Step 4: Family Income Range",
      voiceText: "Your family annual income is one lakh eighty five thousand rupees.",
      question: "Is your annual family income within the scheme limit?",
      value: formData.annualIncome,
      confirmed: true,
      options: ["Yes, below ₹2.50 Lakh", "Income has changed"]
    },
    {
      step: 5,
      title: "Step 5: Review & Submit",
      voiceText: "All 4 steps are verified. You can now submit your scholarship application with one click.",
      question: "Ready to submit your unified scholarship application?",
      value: "Scholarship Passport 100% Ready",
      confirmed: true,
      options: ["Submit Application Now"]
    }
  ];

  const currentQ = questions[step - 1];

  const handleNext = () => {
    if (step < questions.length) {
      const nextStep = step + 1;
      setStep(nextStep);
      speakInstruction(questions[nextStep - 1].voiceText);
    } else {
      alert("Scholarship Application successfully submitted via CSC Rural Kiosk!\n\nApplication ID: ST-2026-OD-89211\nSMS confirmation sent to applicant.");
    }
  };

  const handleLookup = (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    setLookupResult({
      appId: "APP-2026-OD-94182",
      name: "Ananya Munda",
      scheme: "Top Class Education for ST Students",
      amount: "₹1,12,000",
      status: "Disbursed via DBT",
      bank: "Canara Bank (•••• 4821)",
      utr: "CANR26081498102",
      date: "18 Sep 2026"
    });
  };

  const handleSyncAll = () => {
    setOfflineDrafts(prev => prev.map(d => ({ ...d, status: "Synced with Central MoTA DB" })));
    alert("All offline cached applicant records have been synchronized with the Central MoTA Database!");
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* Top Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f3c68 0%, #15803d 100%)', 
        color: '#fff', 
        padding: '24px 30px', 
        borderRadius: 'var(--radius-xl)', 
        marginBottom: '20px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                CSC RURAL FACILITATION DESK
              </span>
              <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>Digital India • Gram Panchayat Kiosk</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Common Services Centre (CSC) — Panposh Kiosk
            </h2>
            <p style={{ fontSize: '0.88rem', opacity: 0.92, margin: 0, color: '#e0f2fe' }}>
              VLE Operator: <strong>Bikas Kisan</strong> • High-Voice Assisted Mode for First-Generation Tribal Learners
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onExitAssistedMode}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              Sign Out Kiosk
            </button>
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
          { id: 'wizard', label: '🎙️ Voice-Guided Application Wizard', icon: '' },
          { id: 'offline-sync', label: `📴 Offline Camp Cache (${offlineDrafts.length})`, icon: '' },
          { id: 'kiosk-reg', label: '📝 New Student Enrollment Desk', icon: '' },
          { id: 'status-lookup', label: '🔍 Application & DBT Status Lookup', icon: '' }
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
      {/* SECTION 1: VOICE-GUIDED WIZARD                           */}
      {/* ========================================================= */}
      {activeTab === 'wizard' && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Audio helper banner */}
          <div style={{ 
            backgroundColor: '#fffbeb', 
            border: '2px solid #f59e0b', 
            borderRadius: 'var(--radius-lg)', 
            padding: '16px 20px', 
            marginBottom: '20px',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>🎙️</span>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#92400e' }}>Voice-Assisted Mode Active</strong>
                <p style={{ fontSize: '0.8rem', color: '#b45309', margin: '2px 0 0' }}>
                  Tap the speaker icon anytime to hear instructions in clear, spoken language.
                </p>
              </div>
            </div>
            <button 
              onClick={() => speakInstruction(currentQ.voiceText)}
              className="btn-primary"
              style={{ backgroundColor: '#f59e0b', borderColor: '#d97706', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
            >
              <Volume2 size={16} /> Listen
            </button>
          </div>

          {/* Step Progress Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            {questions.map((q) => (
              <div 
                key={q.step}
                onClick={() => setStep(q.step)}
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  backgroundColor: step === q.step ? 'var(--primary)' : step > q.step ? 'var(--success)' : 'var(--bg-muted)',
                  color: step >= q.step ? '#fff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {step > q.step ? <CheckCircle2 size={18} /> : q.step}
              </div>
            ))}
          </div>

          {/* Current Question Card */}
          <div className="gov-card" style={{ padding: '28px', border: '2px solid var(--primary-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              {currentQ.title}
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '8px 0 16px', color: 'var(--text-main)' }}>
              {currentQ.question}
            </h3>

            <div style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Government Record:</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>
                {currentQ.value}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {currentQ.options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={handleNext}
                  style={{ 
                    padding: '14px 18px', 
                    borderRadius: 'var(--radius-md)', 
                    border: i === 0 ? '2px solid var(--primary)' : '1px solid var(--border-color)', 
                    backgroundColor: i === 0 ? 'var(--primary-light)' : 'transparent',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    color: i === 0 ? 'var(--primary)' : 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <span>{opt}</span>
                  {i === 0 && <CheckCircle2 size={18} style={{ color: 'var(--primary)' }} />}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
                className="btn-secondary"
                style={{ opacity: step === 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button 
                onClick={handleNext}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>{step === 5 ? "Submit Application" : "Continue"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: OFFLINE BATCH SYNC & CAMP CACHE                */}
      {/* ========================================================= */}
      {activeTab === 'offline-sync' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
                Offline Camp Cache & Edge Synchronization Queue
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Applications captured during remote village outreach camps in zero-connectivity tribal hamlets
              </p>
            </div>

            <button
              onClick={handleSyncAll}
              className="btn-primary"
              style={{ fontSize: '0.84rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={15} /> Sync All to Central MoTA DB
            </button>
          </div>

          <div className="gov-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Temp Record Ref</th>
                  <th style={{ padding: '12px 16px' }}>Applicant</th>
                  <th style={{ padding: '12px 16px' }}>Remote Hamlet / Village</th>
                  <th style={{ padding: '12px 16px' }}>Scholarship Scheme</th>
                  <th style={{ padding: '12px 16px' }}>Biometric Capture</th>
                  <th style={{ padding: '12px 16px' }}>Sync Status</th>
                </tr>
              </thead>
              <tbody>
                {offlineDrafts.map((d, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>{d.id}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{d.applicant}</td>
                    <td style={{ padding: '12px 16px' }}>📍 {d.village}</td>
                    <td style={{ padding: '12px 16px' }}>{d.scheme}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-blue">{d.biometrics}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${d.status.includes('Synced') ? 'badge-green' : 'badge-amber'}`}>
                        {d.status.includes('Synced') ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {d.status}
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
      {/* SECTION 3: KIOSK APPLICANT REGISTRATION                   */}
      {/* ========================================================= */}
      {activeTab === 'kiosk-reg' && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="gov-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
              VLE Assisted Registration Desk
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Enroll new Scheduled Tribe students without smartphone access using biometric Aadhaar e-KYC.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Student enrolled successfully! Temporary Passport created in MoTA Database."); }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Student Full Name</label>
                  <input type="text" className="gov-input" placeholder="e.g. Birsa Tirkey" required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Aadhaar Number (12 Digits)</label>
                  <input type="text" className="gov-input" placeholder="XXXX-XXXX-XXXX" required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Tribal Community / Caste</label>
                  <select className="gov-input" style={{ width: '100%' }}>
                    <option>Munda</option>
                    <option>Santhal</option>
                    <option>Oraon</option>
                    <option>Gond</option>
                    <option>Ho</option>
                    <option>Birhor (PVTG)</option>
                    <option>Dongria Kondh (PVTG)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Parent / Guardian Mobile</label>
                  <input type="tel" className="gov-input" placeholder="+91 94371 XXXXX" required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ backgroundColor: '#eff6ff', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={24} style={{ color: '#2563eb' }} />
                <span style={{ fontSize: '0.82rem', color: '#1e40af' }}>
                  USB Biometric Fingerprint Scanner (Mantra MFS100) Ready. UIDAI RD Service connected.
                </span>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.92rem' }}>
                Scan Biometrics & Complete Kiosk Enrollment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: APPLICATION & DBT STATUS LOOKUP               */}
      {/* ========================================================= */}
      {activeTab === 'status-lookup' && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="gov-card" style={{ padding: '28px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
              Public Scholarship & DBT Status Lookup Desk
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Enter student Application ID, Aadhaar (last 4 digits), or Mobile number to check real-time sanction & DBT status.
            </p>

            <form onSubmit={handleLookup} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input 
                type="text" 
                className="gov-input" 
                placeholder="Enter Application ID or Aadhaar (e.g. 89211)"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Search size={16} /> Search Status
              </button>
            </form>
          </div>

          {lookupResult && (
            <div className="gov-card" style={{ padding: '24px', borderLeft: '5px solid var(--success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: '6px' }}>
                    <CheckCircle2 size={12} /> {lookupResult.status}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                    {lookupResult.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Ref: {lookupResult.appId} • Scheme: {lookupResult.scheme}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount Credited:</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
                    {lookupResult.amount}
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-muted)', padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <div><strong>Credited Bank:</strong> {lookupResult.bank}</div>
                <div><strong>Bank UTR:</strong> {lookupResult.utr}</div>
                <div><strong>Credit Date:</strong> {lookupResult.date}</div>
                <div><strong>Mode:</strong> Aadhaar Payment Bridge (APBS)</div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
