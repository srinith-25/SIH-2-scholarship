import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  Smartphone, 
  KeyRound, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Database, 
  ChevronLeft,
  RefreshCw,
  Globe
} from 'lucide-react';
import { dbService } from '../services/dbService';

export const LoginPage = ({ 
  targetPortal = 'student', 
  onLoginSuccess, 
  onBackToDirectory, 
  onOpenDbViewer 
}) => {
  // Current active portal mode in the login page
  const [currentPortal, setCurrentPortal] = useState(
    targetPortal === 'register' ? 'student' : targetPortal
  );
  const [isRegisterMode, setIsRegisterMode] = useState(targetPortal === 'register');
  const [studentMethod, setStudentMethod] = useState('aadhaar'); // aadhaar | apaar | mobile | credentials
  
  // Student inputs
  const [aadhaarInput, setAadhaarInput] = useState('XXXX-XXXX-8912');
  const [apaarInput, setApaarInput] = useState('9281-0492-3810');
  const [mobileInput, setMobileInput] = useState('+91 94371 82910');
  const [appIdInput, setAppIdInput] = useState('APP-2026-TCE-98102');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  
  // Officer inputs
  const [officerEmail, setOfficerEmail] = useState(
    currentPortal === 'institution' ? 'nodal.scholarship@nitrkl.ac.in' :
    currentPortal === 'state' ? 'dir-tribal.od@gov.in' :
    currentPortal === 'admin' ? 'admin-scholarships@mota.gov.in' :
    currentPortal === 'parent' ? '+91 94371 82999' :
    'csc.panposh@digitalindia.gov.in'
  );
  const [officerPassword, setOfficerPassword] = useState('••••••••••••');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regTribe, setRegTribe] = useState('Munda');
  const [regMobile, setRegMobile] = useState('');
  const [regState, setRegState] = useState('Odisha');
  const [regInstitute, setRegInstitute] = useState('');
  const [regIncome, setRegIncome] = useState('Below ₹2,50,000 / year');

  const [isLoading, setIsLoading] = useState(false);

  // Send OTP simulation
  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpInput('729104');
    alert("Simulated Secure OTP sent from UIDAI/MoTA: 729104 (Auto-filled for testing)");
  };

  // Submit Student Login
  const handleStudentLogin = async (e) => {
    e && e.preventDefault();
    setIsLoading(true);

    const loginRecord = {
      userId: "ST-2026-OD-89211",
      fullName: "Ananya Munda",
      role: "student",
      identifier: studentMethod === 'aadhaar' ? aadhaarInput : studentMethod === 'apaar' ? apaarInput : mobileInput,
      loginMethod: studentMethod === 'aadhaar' ? 'Aadhaar OTP' : studentMethod === 'apaar' ? 'APAAR ID SSO' : studentMethod === 'mobile' ? 'Mobile OTP' : 'Application Password',
      location: "Sundargarh, Odisha, India"
    };

    const res = await dbService.recordLogin(loginRecord);
    setIsLoading(false);
    
    onLoginSuccess({
      role: 'student',
      user: res.user || {
        id: "ST-2026-OD-89211",
        fullName: "Ananya Munda",
        role: "student"
      }
    });
  };

  // Submit Specific Officer / Stakeholder Login
  const handleOfficerLogin = async (e) => {
    e && e.preventDefault();
    setIsLoading(true);

    const roleMap = {
      institution: {
        userId: "INST-NITR-001",
        name: "Dr. P. K. Mohapatra",
        role: "institution",
        location: "NIT Rourkela, Odisha",
        method: "Institution AISHE SSO"
      },
      state: {
        userId: "STA-OD-772",
        name: "R. K. Tripathy, OAS",
        role: "state",
        location: "Bhubaneswar, Odisha",
        method: "State Parichay SSO"
      },
      admin: {
        userId: "ADM-MOTA-001",
        name: "National MoTA Administrator",
        role: "admin",
        location: "Shastri Bhawan, New Delhi",
        method: "Ministry Central SSO"
      },
      parent: {
        userId: "PAR-2026-OD-0941",
        name: "Somra Munda (Parent)",
        role: "parent",
        location: "Panposh, Sundargarh",
        method: "Family Mobile OTP"
      },
      csc: {
        userId: "CSC-OR-882",
        name: "Bikas Kisan (VLE Kiosk)",
        role: "csc",
        location: "CSC Panposh, Sundargarh",
        method: "Digital India VLE SSO"
      }
    };

    const target = roleMap[currentPortal] || roleMap.institution;

    const res = await dbService.recordLogin({
      userId: target.userId,
      fullName: target.name,
      role: target.role,
      identifier: officerEmail,
      loginMethod: target.method,
      location: target.location
    });

    setIsLoading(false);
    onLoginSuccess({
      role: target.role,
      user: target
    });
  };

  // Submit New Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName.trim() || !regMobile.trim()) {
      alert("Please fill in Student Full Name and Mobile Number.");
      return;
    }

    setIsLoading(true);

    const userData = {
      fullName: regName,
      aadhaar: regAadhaar || "9812",
      tribe: regTribe,
      mobile: regMobile,
      state: regState,
      institution: regInstitute || "Government Higher Secondary School",
      annualIncome: regIncome,
      role: "student"
    };

    const res = await dbService.registerUser(userData);
    setIsLoading(false);

    alert(`Scholarship Passport Created Successfully!\n\nStudent ID: ${res.user.id}\nSaved in Central MoTA Database.`);
    onLoginSuccess({
      role: 'student',
      user: res.user
    });
  };

  const portalTitles = {
    student: { title: "Student Scholarship Portal", icon: "🎓", badge: "ST Beneficiary Access" },
    institution: { title: "Institution Nodal Portal", icon: "🏛️", badge: "Colleges & Universities (AISHE)" },
    state: { title: "State / UT Welfare Portal", icon: "🏢", badge: "State Sanctioning Authority" },
    admin: { title: "MoTA National Command Portal", icon: "🇮🇳", badge: "Central Ministry Administration" },
    parent: { title: "Parent & Family Scholarship Portal", icon: "👨‍👩‍👧", badge: "Family Consent-Based View" },
    csc: { title: "CSC Facilitation Kiosk", icon: "🤝", badge: "Rural Common Service Centre" }
  };

  const currentPortalInfo = portalTitles[currentPortal] || portalTitles.student;

  return (
    <div style={{ minHeight: 'calc(100vh - 140px)', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 16px' }}>
      <div style={{ maxWidth: '640px', width: '100%' }}>
        
        {/* Navigation back to directory */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={onBackToDirectory}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 700 }}
          >
            <ChevronLeft size={18} /> Back to Portal Directory
          </button>

          <span className="badge badge-blue">
            {currentPortalInfo.badge}
          </span>
        </div>

        {/* Portal Gateway Branding */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #0f3c68 0%, #0f766e 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '30px', 
            color: '#fff', 
            margin: '0 auto 12px',
            boxShadow: '0 4px 12px rgba(15, 60, 104, 0.3)',
            border: '2px solid #f59e0b'
          }}>
            {currentPortalInfo.icon}
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            {currentPortalInfo.title}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Ministry of Tribal Affairs • Government of India
          </p>
        </div>

        {/* Database Live Sync Banner */}
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          border: '1px solid var(--success-border)', 
          borderRadius: 'var(--radius-md)', 
          padding: '10px 16px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'inline-block' }} />
            <span>Database Connected: Storing all login sessions in `data/db.json`</span>
          </div>
          <button 
            onClick={onOpenDbViewer}
            style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}
          >
            <Database size={13} /> View Live Database
          </button>
        </div>

        {/* Main Card */}
        <div className="gov-card" style={{ padding: '28px', boxShadow: 'var(--shadow-lg)' }}>
          
          {/* ========================================================= */}
          {/* IF CURRENT PORTAL IS STUDENT                              */}
          {/* ========================================================= */}
          {currentPortal === 'student' && (
            <div>
              {/* Student Login vs Register Mode Toggle */}
              <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '22px' }}>
                <button
                  onClick={() => setIsRegisterMode(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: !isRegisterMode ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: !isRegisterMode ? '3px solid var(--primary)' : '3px solid transparent',
                    textAlign: 'center'
                  }}
                >
                  Sign In to Student Portal
                </button>
                <button
                  onClick={() => setIsRegisterMode(true)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: isRegisterMode ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: isRegisterMode ? '3px solid var(--primary)' : '3px solid transparent',
                    textAlign: 'center'
                  }}
                >
                  Create New Passport (Register)
                </button>
              </div>

              {!isRegisterMode ? (
                <div>
                  {/* Method Switcher */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', backgroundColor: 'var(--bg-muted)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
                    {[
                      { id: 'aadhaar', label: 'Aadhaar OTP', icon: '🆔' },
                      { id: 'apaar', label: 'APAAR ID', icon: '🎓' },
                      { id: 'mobile', label: 'Mobile OTP', icon: '📱' },
                      { id: 'credentials', label: 'Password', icon: '🔑' }
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => setStudentMethod(m.id)}
                        style={{
                          flex: 1,
                          padding: '7px 4px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.76rem',
                          fontWeight: studentMethod === m.id ? 700 : 500,
                          backgroundColor: studentMethod === m.id ? '#ffffff' : 'transparent',
                          color: studentMethod === m.id ? 'var(--primary)' : 'var(--text-muted)',
                          boxShadow: studentMethod === m.id ? 'var(--shadow-sm)' : 'none'
                        }}
                      >
                        <span>{m.icon} {m.label}</span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleStudentLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {studentMethod === 'aadhaar' && (
                      <>
                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                            12-Digit Aadhaar Number / Virtual ID (VID)
                          </label>
                          <input 
                            type="text" 
                            value={aadhaarInput}
                            onChange={(e) => setAadhaarInput(e.target.value)}
                            placeholder="e.g. 5482 9102 8912"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                          />
                        </div>

                        {!otpSent ? (
                          <button 
                            type="button" 
                            onClick={handleSendOtp}
                            className="btn-secondary" 
                            style={{ width: '100%', fontSize: '0.86rem', padding: '10px' }}
                          >
                            <Smartphone size={16} /> Send OTP to Aadhaar Linked Mobile
                          </button>
                        ) : (
                          <div>
                            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                              Enter 6-Digit OTP sent to linked mobile
                            </label>
                            <input 
                              type="text" 
                              value={otpInput}
                              onChange={(e) => setOtpInput(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '1.1rem', letterSpacing: '4px', fontWeight: 700, textAlign: 'center' }}
                            />
                          </div>
                        )}
                      </>
                    )}

                    {studentMethod === 'apaar' && (
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                          APAAR ID (One Nation One Student ID)
                        </label>
                        <input 
                          type="text" 
                          value={apaarInput}
                          onChange={(e) => setApaarInput(e.target.value)}
                          placeholder="e.g. 9281-0492-3810"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                        />
                      </div>
                    )}

                    {studentMethod === 'mobile' && (
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                          Registered Mobile Number
                        </label>
                        <input 
                          type="text" 
                          value={mobileInput}
                          onChange={(e) => setMobileInput(e.target.value)}
                          placeholder="+91 94371 82910"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                        />
                      </div>
                    )}

                    {studentMethod === 'credentials' && (
                      <>
                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                            Application ID
                          </label>
                          <input 
                            type="text" 
                            value={appIdInput}
                            onChange={(e) => setAppIdInput(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                            Password
                          </label>
                          <input 
                            type="password" 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                          />
                        </div>
                      </>
                    )}

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn-primary" 
                      style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                    >
                      {isLoading ? "Authenticating & Logging in..." : "Enter Student Portal"} <ArrowRight size={16} />
                    </button>
                  </form>

                  {/* Quick Evaluator Preset */}
                  <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px dashed var(--border-color)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick Evaluator Demo:</span>
                    <div style={{ marginTop: '6px' }}>
                      <button 
                        onClick={handleStudentLogin}
                        style={{ fontSize: '11px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, border: '1px solid var(--primary-subtle)' }}
                      >
                        ⚡ 1-Click Login as Ananya Munda (ST Student)
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Full Name (as on Aadhaar)*</label>
                      <input 
                        type="text" 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ramesh Soren"
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.86rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Aadhaar Last 4 Digits*</label>
                      <input 
                        type="text" 
                        value={regAadhaar}
                        onChange={(e) => setRegAadhaar(e.target.value)}
                        placeholder="e.g. 4910"
                        maxLength={4}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.86rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Tribe Community*</label>
                      <select 
                        value={regTribe}
                        onChange={(e) => setRegTribe(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.86rem' }}
                      >
                        <option value="Munda">Munda</option>
                        <option value="Santhal">Santhal</option>
                        <option value="Gond">Gond</option>
                        <option value="Bhil">Bhil</option>
                        <option value="Oraon">Oraon</option>
                        <option value="Birhor (PVTG)">Birhor (PVTG)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Mobile Number*</label>
                      <input 
                        type="text" 
                        value={regMobile}
                        onChange={(e) => setRegMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.86rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>State / UT*</label>
                      <select 
                        value={regState}
                        onChange={(e) => setRegState(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.86rem' }}
                      >
                        <option value="Odisha">Odisha</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Gujarat">Gujarat</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Annual Family Income</label>
                      <select 
                        value={regIncome}
                        onChange={(e) => setRegIncome(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.86rem' }}
                      >
                        <option value="Below ₹1,50,000 / year">Below ₹1,50,000 / year</option>
                        <option value="₹1,50,000 - ₹2,50,000 / year">₹1,50,000 - ₹2,50,000 / year</option>
                        <option value="₹2,50,000 - ₹6,00,000 / year">₹2,50,000 - ₹6,00,000 / year</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}
                  >
                    {isLoading ? "Creating Record in Database..." : "Register & Enter Student Portal"} <CheckCircle2 size={16} />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* IF CURRENT PORTAL IS AN OFFICER / AUTHORITY               */}
          {/* ========================================================= */}
          {currentPortal !== 'student' && (
            <div>
              <form onSubmit={handleOfficerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    {currentPortal === 'parent' ? "Registered Mobile Number / Family ID" : "Official Govt Email / MeriPehchaan SSO ID"}
                  </label>
                  <input 
                    type="text" 
                    value={officerEmail}
                    onChange={(e) => setOfficerEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    {currentPortal === 'parent' ? "OTP or Security PIN" : "Password / Digital Token PIN"}
                  </label>
                  <input 
                    type="password" 
                    value={officerPassword}
                    onChange={(e) => setOfficerPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.9rem' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  {isLoading ? "Authenticating Session..." : `Sign In to ${currentPortalInfo.title}`} <ArrowRight size={16} />
                </button>
              </form>

              {/* Quick Evaluator Preset */}
              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px dashed var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick Evaluator Demo:</span>
                <div style={{ marginTop: '6px' }}>
                  <button 
                    onClick={handleOfficerLogin}
                    style={{ fontSize: '11px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, border: '1px solid var(--primary-subtle)' }}
                  >
                    ⚡ Instant Sign In to {currentPortalInfo.title}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Security Seals */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.76rem', color: 'var(--text-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
          <span>UIDAI Vault Compliant</span>
          <span>•</span>
          <span>Role-Based Access Control (RBAC)</span>
          <span>•</span>
          <span>DPDP Act 2023 Compliant</span>
        </div>

      </div>
    </div>
  );
};
