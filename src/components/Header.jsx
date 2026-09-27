import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Bell, 
  User, 
  Wifi, 
  WifiOff, 
  Eye, 
  Type,
  Database,
  LogIn,
  LogOut,
  HelpCircle,
  Building2,
  Building,
  GraduationCap,
  Users,
  Compass
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export const Header = ({
  activePortal = 'public', // 'public' | 'student' | 'institution' | 'state' | 'admin' | 'parent' | 'csc'
  language,
  onLanguageChange,
  fontSize,
  onFontSizeChange,
  highContrast,
  onToggleContrast,
  networkMode,
  onNetworkModeChange,
  unreadCount,
  onOpenNotifications,
  onOpenGrievance,
  isLoggedIn = false,
  currentUser = null,
  onLogout,
  onOpenGateways,
  onOpenDbViewer
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const portalDefinitions = {
    public: { 
      label: "MoTA Portal Directory", 
      icon: "🌐", 
      title: "Unified Scholarship Platform for Tribal Students",
      tagline: "Ministry of Tribal Affairs • Government of India",
      badge: "National Public Directory",
      detail: "Select Stakeholder Gateway"
    },
    student: { 
      label: "Student Scholarship Portal", 
      icon: "🎓", 
      title: "Student Scholarship Portal",
      tagline: "One Student. One Scholarship Passport. Every Opportunity.",
      badge: "ST Beneficiary Access",
      detail: currentUser?.fullName ? `${currentUser.fullName} • NIT Rourkela` : "Ananya Munda • NIT Rourkela"
    },
    institution: { 
      label: "Institution Nodal Portal", 
      icon: "🏛️", 
      title: "Institution Nodal Portal (Colleges & Universities)",
      tagline: "National Institute of Technology (NIT) Rourkela • AISHE: U-0355",
      badge: "Institution Verification Desk",
      detail: currentUser?.fullName ? `${currentUser.fullName} • Nodal Officer` : "Dr. P. K. Mohapatra • Nodal Officer"
    },
    state: { 
      label: "State / UT Welfare Portal", 
      icon: "🏢", 
      title: "State / UT Tribal Welfare Portal",
      tagline: "ST & SC Development Department • Government of Odisha",
      badge: "State Sanctioning Authority",
      detail: currentUser?.fullName ? `${currentUser.fullName} • State Nodal Officer` : "R. K. Tripathy, OAS • State Officer"
    },
    admin: { 
      label: "MoTA National Command Portal", 
      icon: "🇮🇳", 
      title: "MoTA National Command & Oversight Portal",
      tagline: "Ministry of Tribal Affairs • Shastri Bhawan, New Delhi",
      badge: "Central Ministry Administration",
      detail: currentUser?.fullName || "National Administrator • HQ"
    },
    parent: { 
      label: "Parent & Family Scholarship Portal", 
      icon: "👨‍👩‍👧", 
      title: "Parent & Family Scholarship Portal",
      tagline: "Household Scholarship Overview & Consolidated DBT Tracker",
      badge: "Guardian & Family Access",
      detail: currentUser?.fullName ? `${currentUser.fullName} • Guardian` : "Somra Munda • Guardian"
    },
    csc: { 
      label: "CSC Rural Facilitation Kiosk", 
      icon: "🤝", 
      title: "CSC Rural Facilitation & Assisted Kiosk",
      tagline: "Gram Panchayat Facilitation Centre • Panposh, Sundargarh",
      badge: "Rural Assisted Mode",
      detail: currentUser?.fullName ? `${currentUser.fullName} • VLE` : "Bikas Kisan • VLE Kiosk Operator"
    }
  };

  const portalInfo = portalDefinitions[activePortal] || portalDefinitions.public;

  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top Official National Govt Strip */}
      <div style={{ 
        backgroundColor: '#0a2540', 
        color: '#ffffff', 
        padding: '6px 24px', 
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Official Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <span style={{ width: '8px', height: '14px', backgroundColor: '#f97316', borderRadius: '1px' }} />
            <span style={{ width: '8px', height: '14px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
            <span style={{ width: '8px', height: '14px', backgroundColor: '#15803d', borderRadius: '1px' }} />
          </div>
          <span style={{ fontWeight: 800, color: '#f59e0b', letterSpacing: '0.04em' }}>भारत सरकार • GOVERNMENT OF INDIA</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>MINISTRY OF TRIBAL AFFAIRS (जनजातीय कार्य मंत्रालय)</span>
        </div>

        {/* Right Accessibility, DB Status & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Live Database Viewer Indicator */}
          <button
            onClick={onOpenDbViewer}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              border: '1px solid #334155'
            }}
            title="Inspect Live Database & Login Audit Records"
          >
            <Database size={13} style={{ color: '#38bdf8' }} />
            <span>Database Records</span>
          </button>

          {/* Network Simulator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Network:</span>
            <select 
              value={networkMode} 
              onChange={(e) => onNetworkModeChange(e.target.value)}
              style={{ 
                background: '#1e293b', 
                color: '#fff', 
                border: '1px solid #334155', 
                borderRadius: '4px', 
                padding: '2px 8px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              <option value="online">⚡ Online (5G)</option>
              <option value="low-bandwidth">📶 Low-Bandwidth</option>
              <option value="offline">📴 Offline Cache</option>
            </select>
          </div>

          {/* Font Sizing Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#1e293b', padding: '1px 6px', borderRadius: '4px' }}>
            <Type size={12} style={{ color: '#94a3b8' }} />
            <button 
              onClick={() => onFontSizeChange('normal')} 
              style={{ color: fontSize === 'normal' ? '#38bdf8' : '#fff', fontSize: '11px', padding: '0 3px', fontWeight: fontSize === 'normal' ? 700 : 400 }}
              title="Standard Font Size"
            >
              A
            </button>
            <span style={{ color: '#475569' }}>|</span>
            <button 
              onClick={() => onFontSizeChange('large')} 
              style={{ color: fontSize === 'large' ? '#38bdf8' : '#fff', fontSize: '12px', padding: '0 3px', fontWeight: fontSize === 'large' ? 700 : 400 }}
              title="Large Font Size"
            >
              A+
            </button>
            <span style={{ color: '#475569' }}>|</span>
            <button 
              onClick={() => onFontSizeChange('xlarge')} 
              style={{ color: fontSize === 'xlarge' ? '#38bdf8' : '#fff', fontSize: '13px', padding: '0 3px', fontWeight: fontSize === 'xlarge' ? 700 : 400 }}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode */}
          <button 
            onClick={onToggleContrast}
            title="Toggle High Contrast for Accessibility"
            style={{ 
              color: highContrast ? '#facc15' : '#e2e8f0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              padding: '2px 8px', 
              background: highContrast ? '#374151' : '#1e293b', 
              borderRadius: '4px',
              fontSize: '11px',
              border: highContrast ? '1px solid #facc15' : '1px solid transparent'
            }}
          >
            <Eye size={12} />
            <span>{highContrast ? 'Standard' : 'Contrast'}</span>
          </button>

          {/* Multilingual Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={13} style={{ color: '#38bdf8' }} />
            <select 
              value={language} 
              onChange={(e) => onLanguageChange(e.target.value)}
              style={{ 
                background: '#1e293b', 
                color: '#fff', 
                border: '1px solid #334155', 
                borderRadius: '4px', 
                padding: '2px 8px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
              <option value="sat">ᱥᱟᱱᱛᱟᱲᱤ (Santhali)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Branding & Active Portal Header */}
      <div className="container" style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Emblem & Portal Title Specifically for the Active Portal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #0f3c68 0%, #0f766e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            color: '#fff',
            boxShadow: '0 4px 10px rgba(15, 60, 104, 0.25)',
            border: '2px solid #f59e0b',
            flexShrink: 0
          }}>
            {portalInfo.icon}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em', margin: 0 }}>
                {portalInfo.title}
              </h1>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>
                <ShieldCheck size={12} /> {portalInfo.badge}
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 500 }}>
              {portalInfo.tagline}
            </p>
          </div>
        </div>

        {/* User Session Bar or Gateway Entry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Grievance Help Desk Button */}
          <button
            onClick={onOpenGrievance}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-muted)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)'
            }}
          >
            <HelpCircle size={14} style={{ color: 'var(--primary)' }} />
            <span>Help & Grievance</span>
          </button>

          {/* Notifications Center */}
          <button 
            onClick={onOpenNotifications}
            style={{ 
              position: 'relative', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--bg-muted)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)'
            }}
            title="Notifications & Direct Benefit Transfer Alerts"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-2px', 
                right: '-2px', 
                background: 'var(--danger)', 
                color: '#fff', 
                fontSize: '10px', 
                fontWeight: 800, 
                width: '18px', 
                height: '18px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '2px solid #fff'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* IF LOGGED IN: SHOW CURRENT STAKEHOLDER DETAIL AND SIGN OUT */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '4px 14px 4px 6px', 
                backgroundColor: 'var(--primary-light)', 
                borderRadius: '50px',
                border: '1px solid var(--primary-subtle)'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--primary)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 800, 
                  fontSize: '0.85rem' 
                }}>
                  {portalInfo.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>
                    {currentUser?.fullName || portalInfo.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {portalInfo.detail}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fecaca',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Sign out of portal"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* IF NOT LOGGED IN: SHOW DIRECTORY / GATEWAYS BUTTON */
            <button
              onClick={onOpenGateways}
              className="btn-primary"
              style={{ fontSize: '13px', padding: '9px 18px' }}
            >
              <LogIn size={15} />
              <span>Portal Gateways Directory</span>
            </button>
          )}

        </div>
      </div>

      {/* Network alert banner if offline or low-bandwidth */}
      {networkMode === 'offline' && (
        <div style={{ backgroundColor: '#fed7aa', color: '#9a3412', padding: '6px 24px', fontSize: '12px', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <WifiOff size={15} />
          <span>Offline Resilience Mode Active: All Scholarship Passport credentials and form drafts are securely cached on this device. Automated synchronization will resume upon network restoration.</span>
        </div>
      )}
      {networkMode === 'low-bandwidth' && (
        <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '5px 24px', fontSize: '11px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Wifi size={14} />
          <span>Low-Bandwidth Mode: Media compression active. Document previews optimized for low-connectivity rural tribal areas.</span>
        </div>
      )}
    </header>
  );
};
