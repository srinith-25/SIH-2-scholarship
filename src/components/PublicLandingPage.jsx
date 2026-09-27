import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  GraduationCap, 
  FileCheck2, 
  CreditCard, 
  Layers, 
  Building, 
  Building2, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Search,
  MessageSquare,
  Lock,
  Compass
} from 'lucide-react';
import { SCHEMES, STUDENT_PROFILE } from '../data/mockData';

export const PublicLandingPage = ({ onSelectPortal, onOpenJago }) => {
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const handleTrack = () => {
    if (!trackQuery.trim()) {
      alert("Please enter your Application ID or APAAR ID to track.");
      return;
    }
    setTrackResult({
      appId: trackQuery.trim(),
      student: "Ananya Munda",
      scheme: "Top Class Education for ST Students",
      status: "Sanctioned & Disbursed via DBT (₹1,12,000 Credited)",
      badge: "Credited",
      date: "18 Sep 2026"
    });
  };

  const portalGateways = [
    {
      id: 'student',
      title: 'Student Portal',
      icon: '🎓',
      badge: 'ST Beneficiaries',
      badgeColor: 'badge-blue',
      desc: 'Access your Scholarship Passport, discover eligible MoTA schemes, track DBT payments, and manage your verified DigiLocker document wallet.',
      buttonText: 'Enter Student Portal',
      secondaryAction: 'New Registration'
    },
    {
      id: 'institution',
      title: 'Institution Nodal Portal',
      icon: '🏛️',
      badge: 'Colleges & Universities',
      badgeColor: 'badge-green',
      desc: 'For College and School Nodal Officers to verify student enrollment, courses, academic attendance (>75%), fee demand notes, and bulk digital sign-off.',
      buttonText: 'Institution Sign In',
      secondaryAction: 'AISHE Verification'
    },
    {
      id: 'state',
      title: 'State / UT Welfare Portal',
      icon: '🏢',
      badge: 'State Authorities',
      badgeColor: 'badge-amber',
      desc: 'For State & UT Tribal Welfare Departments to review e-District caste & income certificates, approve district quotas, and fast-track PVTG cases.',
      buttonText: 'State Officer Sign In',
      secondaryAction: 'e-District Desk'
    },
    {
      id: 'admin',
      title: 'MoTA National Command Portal',
      icon: '🇮🇳',
      badge: 'Ministry Headquarters',
      badgeColor: 'badge-blue',
      desc: 'Central Ministry dashboard for national telemetry, scheme rule configurations, PFMS payment orders, and the Reach Engine for unreached tribal pockets.',
      buttonText: 'Ministry Admin Sign In',
      secondaryAction: 'National Oversight'
    },
    {
      id: 'parent',
      title: 'Parent & Family Portal',
      icon: '👨‍👩‍👧',
      badge: 'Guardians & Families',
      badgeColor: 'badge-green',
      desc: 'Consent-based family view allowing parents and guardians to monitor combined scholarship disbursals and academic milestones for all enrolled wards.',
      buttonText: 'Family Portal Sign In',
      secondaryAction: 'Family Linkage'
    },
    {
      id: 'csc',
      title: 'CSC Facilitation Kiosk',
      icon: '🤝',
      badge: 'Gram Panchayat VLE',
      badgeColor: 'badge-amber',
      desc: 'Assisted Mode with high-contrast large buttons, one-question per screen, and spoken audio instructions designed for rural Common Service Centres.',
      buttonText: 'CSC Kiosk Sign In',
      secondaryAction: 'Rural Assisted Mode'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      
      {/* Official Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0a2540 0%, #0f3c68 60%, #0f766e 100%)', 
        color: '#ffffff', 
        padding: '56px 20px 70px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: '50px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ color: '#f59e0b', fontSize: '14px' }}>🇮🇳</span>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              MINISTRY OF TRIBAL AFFAIRS • GOVERNMENT OF INDIA
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.9rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Unified Scholarship Platform for Tribal Students
          </h1>

          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', opacity: 0.95, marginBottom: '32px', fontWeight: 400, color: '#e0f2fe' }}>
            One Student. One Scholarship Passport. Every Opportunity.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onSelectPortal('student')}
              className="btn-primary" 
              style={{ backgroundColor: '#ffffff', color: 'var(--primary)', padding: '13px 28px', fontSize: '0.98rem', fontWeight: 700 }}
            >
              🎓 Enter Student Portal <ArrowRight size={17} />
            </button>

            <button 
              onClick={() => onSelectPortal('register')}
              className="btn-secondary" 
              style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: '#ffffff', padding: '13px 26px', fontSize: '0.98rem', fontWeight: 700 }}
            >
              📝 Create Scholarship Passport
            </button>

            <button 
              onClick={onOpenJago}
              className="btn-teal" 
              style={{ padding: '13px 24px', fontSize: '0.98rem' }}
            >
              <MessageSquare size={17} /> Ask JAGO Assistant
            </button>
          </div>

        </div>
      </section>

      {/* Quick Track Application Form (No login required) */}
      <section style={{ maxWidth: '820px', margin: '-35px auto 44px', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div className="gov-card" style={{ padding: '22px 28px', boxShadow: 'var(--shadow-lg)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={20} /> Public Application & Direct Benefit Transfer Tracker
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Track any active MoTA scholarship application in real-time without credentials using Application ID or APAAR ID.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              placeholder="Enter Application ID (e.g. APP-2026-TCE-98102) or APAAR ID"
              style={{ flex: 1, minWidth: '240px', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.88rem' }}
            />
            <button 
              onClick={handleTrack}
              className="btn-primary" 
              style={{ padding: '11px 24px', fontSize: '0.88rem' }}
            >
              Track Status
            </button>
          </div>

          {trackResult && (
            <div style={{ marginTop: '16px', backgroundColor: 'var(--success-light)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {trackResult.student} • {trackResult.scheme}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Application ID: {trackResult.appId} • Sanction Date: {trackResult.date}
                  </div>
                </div>
                <span className="badge badge-green">{trackResult.badge}</span>
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--success)' }}>
                ✓ {trackResult.status}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DEDICATED PORTAL GATEWAYS SECTION */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '8px' }}>STAKEHOLDER GATEWAYS</span>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
            Dedicated Portals by User Role
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '8px auto 0' }}>
            Each stakeholder operates within an isolated, role-specific environment. Please choose your designated gateway to authenticate.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '22px' }}>
          {portalGateways.map((pg) => (
            <div 
              key={pg.id} 
              className="gov-card" 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderTop: '4px solid var(--primary)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ fontSize: '36px', lineHeight: 1 }}>{pg.icon}</div>
                  <span className={`badge ${pg.badgeColor}`}>{pg.badge}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 8px' }}>
                  {pg.title}
                </h3>
                
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {pg.desc}
                </p>
              </div>

              <div>
                <button 
                  onClick={() => onSelectPortal(pg.id)}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '11px', fontSize: '0.9rem', marginBottom: '8px' }}
                >
                  <Lock size={15} /> {pg.buttonText} <ArrowRight size={15} />
                </button>
                
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                    Gateway: {pg.secondaryAction}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Innovation: Scholarship Passport Overview */}
      <section style={{ backgroundColor: '#ffffff', padding: '60px 20px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge badge-green" style={{ marginBottom: '8px' }}>ONE STUDENT • ONE PASSPORT</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
              The Scholarship Passport Engine
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
              One verified profile. Verify credentials once via government APIs and never fill repetitive forms again.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div className="gov-card" style={{ padding: '22px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🆔</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                Aadhaar & DigiLocker
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Automatic consent-based retrieval of verified Caste, Income, and Domicile certificates directly from State e-District databases.
              </p>
            </div>

            <div className="gov-card" style={{ padding: '22px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎓</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                APAAR ID Integration
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                One Nation One Student ID integration verifies institutional enrollment, grades, and fee demand without paper submissions.
              </p>
            </div>

            <div className="gov-card" style={{ padding: '22px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>💳</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                Direct Benefit Transfer (DBT)
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                NPCI Aadhaar Payment Bridge System (APBS) routing ensures instantaneous scholarship credits directly into the student bank account.
              </p>
            </div>

            <div className="gov-card" style={{ padding: '22px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                Renewal AutoPilot
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Identifies eligible students for subsequent academic years and processes one-click renewals by revalidating APAAR academic credits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 MoTA Scholarship Schemes */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
            Five Central MoTA Scholarship Schemes
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: '8px 0 0' }}>
            Comprehensive educational financial assistance from secondary school to doctoral degrees abroad
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {SCHEMES.map((scheme) => (
            <div key={scheme.id} className="gov-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
                  {scheme.level.slice(0, 32)}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0 8px' }}>
                  {scheme.shortName}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {scheme.coverage}
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <strong>Income Ceiling:</strong> {scheme.incomeCeilingLabel}
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <button 
                  onClick={() => onSelectPortal('student')}
                  className="btn-secondary" 
                  style={{ width: '100%', fontSize: '0.84rem', padding: '9px' }}
                >
                  Apply in Student Portal
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Public Footer */}
      <footer style={{ backgroundColor: '#0a2540', color: '#94a3b8', padding: '40px 24px', fontSize: '0.84rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem', marginBottom: '4px' }}>
              Ministry of Tribal Affairs, Government of India
            </div>
            <div>Shastri Bhawan, New Delhi - 110001 • Unified National Portal for Scheduled Tribe Scholarships</div>
          </div>
          <div>
            <span>Toll-Free National Helpline: 1800-11-2244 • helpdesk-mota@gov.in</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
