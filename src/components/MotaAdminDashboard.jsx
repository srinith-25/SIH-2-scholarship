import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Search, 
  Filter, 
  FileText, 
  CreditCard, 
  Layers, 
  Compass, 
  ShieldAlert, 
  Check, 
  ChevronRight, 
  Download,
  Calendar
} from 'lucide-react';
import { MOTA_ADMIN_METRICS, SCHEMES } from '../data/mockData';

export const MotaAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview | reach-engine | schemes | states | exceptions | audit
  const [selectedState, setSelectedState] = useState('All');
  const [exceptions, setExceptions] = useState([
    {
      id: "EX-2026-891",
      studentName: "K. Ananya Munda",
      aadhaarName: "Ananya Munda",
      apaarId: "9281-0492-3810",
      institution: "NIT Rourkela",
      issue: "Initial prefix mismatch in academic portal vs Aadhaar UIDAI name",
      status: "Resolved via Fuzzy Logic (Score: 96%)",
      resolved: true
    },
    {
      id: "EX-2026-904",
      studentName: "Birsa Tirkey",
      aadhaarName: "Birsa Tirkey",
      apaarId: "9281-0492-1920",
      institution: "Birsa Agricultural University",
      issue: "ST Caste Certificate issuing date pre-dates state digitised e-district portal archive",
      status: "Pending Manual Endorsement by Tahasildar",
      resolved: false
    },
    {
      id: "EX-2026-918",
      studentName: "Savitri Kujur",
      aadhaarName: "Savitri Kujur",
      apaarId: "9281-0492-7711",
      institution: "Govt Medical College, Ambikapur",
      issue: "Bank IFSC updated due to regional rural bank merger (APBS routing auto-redirect)",
      status: "Pending PFMS Re-validation",
      resolved: false
    }
  ]);

  const [reachCamps, setReachCamps] = useState(MOTA_ADMIN_METRICS.unreachedPockets);

  const handleResolveException = (id) => {
    setExceptions(prev => prev.map(ex => ex.id === id ? { ...ex, resolved: true, status: "Approved by MoTA Officer" } : ex));
    alert(`Exception ${id} approved! Application routed forward for Sanction Order generation.`);
  };

  const handleScheduleCamp = (district) => {
    alert(`Mobile Facilitation & Enrollment Camp dispatched for ${district}!\n\nAlert sent to District Collectorate and local CSC VLEs with offline biometrics kit.`);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '16px' }}>
      {/* Admin Portal Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f3c68 0%, #1e3a8a 100%)', 
        color: '#fff', 
        padding: '24px', 
        borderRadius: 'var(--radius-lg)', 
        marginBottom: '20px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                🇮🇳 MoTA National Portal
              </span>
              <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>Real-Time DBT & Scheme Telemetry</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px' }}>
              Ministry of Tribal Affairs — National Command Dashboard
            </h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, margin: 0 }}>
              End-to-End Orchestration Layer for Unified ST Scholarship Schemes (2026-27 Cycle)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => alert("Exporting National Sanction & DBT Audit Report (CSV / PDF)...")}
              className="btn-secondary" 
              style={{ fontSize: '12px', padding: '8px 14px', backgroundColor: '#fff', color: 'var(--primary)', border: 'none' }}
            >
              <Download size={14} /> Export National Report
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '22px' }}>
        <div className="gov-card" style={{ padding: '14px', borderLeft: '4px solid var(--primary)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>TOTAL APPLICATIONS</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
            {MOTA_ADMIN_METRICS.totalApplications.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Unified across 5 schemes</span>
        </div>

        <div className="gov-card" style={{ padding: '14px', borderLeft: '4px solid var(--success)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>VERIFIED (PASSPORT)</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--success)', margin: '4px 0' }}>
            {MOTA_ADMIN_METRICS.verifiedApplications.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--success)' }}>83.6% Verified</span>
        </div>

        <div className="gov-card" style={{ padding: '14px', borderLeft: '4px solid var(--secondary)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>SANCTIONED ORDERS</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--secondary)', margin: '4px 0' }}>
            {MOTA_ADMIN_METRICS.sanctionedApplications.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Order issued by MoTA</span>
        </div>

        <div className="gov-card" style={{ padding: '14px', borderLeft: '4px solid #16a34a' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>DBT DISBURSED</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#16a34a', margin: '4px 0' }}>
            ₹{MOTA_ADMIN_METRICS.totalDisbursedCrores} Cr
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Credited via APBS/PFMS</span>
        </div>

        <div className="gov-card" style={{ padding: '14px', borderLeft: '4px solid var(--warning)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>UNREACHED STUDENTS</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--warning)', margin: '4px 0' }}>
            {MOTA_ADMIN_METRICS.potentiallyUnreachedSTStudents.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--warning)' }}>Reach Engine Gap</span>
        </div>

        <div className="gov-card" style={{ padding: '14px', borderLeft: '4px solid var(--danger)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>EXCEPTIONS REVIEW</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--danger)', margin: '4px 0' }}>
            {MOTA_ADMIN_METRICS.exceptionsRequiringReview.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Non-rejection queue</span>
        </div>
      </div>

      {/* Navigation Tabs for MoTA Admin */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--border-color)', marginBottom: '20px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'overview', label: '📊 Scheme Overview' },
          { id: 'reach-engine', label: '🎯 Reach Engine (Unreached Pockets)' },
          { id: 'states', label: '🗺️ State / UT Monitoring' },
          { id: 'payments', label: '💳 PFMS & APBS Payment Dispatches' },
          { id: 'exceptions', label: '⚠️ Smart Exceptions Queue' },
          { id: 'audit', label: '🔒 Tamper-Proof Audit Trail' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: SCHEME OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="gov-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px' }}>
              MoTA 5 Central ST Scholarship Schemes Status
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px' }}>Scheme Name</th>
                    <th style={{ padding: '10px 14px' }}>Applications</th>
                    <th style={{ padding: '10px 14px' }}>Sanctioned</th>
                    <th style={{ padding: '10px 14px' }}>DBT Disbursed</th>
                    <th style={{ padding: '10px 14px' }}>Coverage %</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOTA_ADMIN_METRICS.schemeWiseStats.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)' }}>
                        {item.scheme}
                      </td>
                      <td style={{ padding: '12px 14px' }}>{item.applications.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--primary)' }}>
                        {item.sanctioned.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--success)' }}>
                        ₹{item.disbursedCr} Cr
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '70px', height: '6px', backgroundColor: 'var(--bg-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${item.coveragePct}%`, height: '100%', backgroundColor: 'var(--secondary)' }} />
                          </div>
                          <span>{item.coveragePct}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span className="badge badge-green">Healthy</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: REACH ENGINE (UNREACHED STUDENT IDENTIFICATION) ================= */}
      {activeTab === 'reach-engine' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'var(--warning-light)', border: '1px solid var(--warning-border)', padding: '16px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Compass size={20} style={{ color: 'var(--warning)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--warning)', margin: 0 }}>
                Scholarship Reach Engine: Identifying Potentially Unreached ST Students
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.45 }}>
              The Reach Engine cross-compares authorized enrollment records from <strong>UDISE+ (Schools)</strong> and <strong>AISHE (Higher Education)</strong> with active MoTA scholarship beneficiary rolls. It automatically flags districts with the largest gap of un-applied eligible ST youth to deploy targeted <strong>CSC Gram Panchayat Mobile Facilitation Camps</strong>.
            </p>
          </div>

          <div className="gov-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--primary)' }}>
              Identified High-Gap Tribal Pockets & Scheduled Facilitation Camps
            </h4>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px' }}>District & State</th>
                    <th style={{ padding: '10px 14px' }}>Enrolled ST Cohort</th>
                    <th style={{ padding: '10px 14px' }}>Beneficiaries Receiving</th>
                    <th style={{ padding: '10px 14px' }}>Unreached Gap</th>
                    <th style={{ padding: '10px 14px' }}>Priority Level</th>
                    <th style={{ padding: '10px 14px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reachCamps.map((pocket, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{pocket.district}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{pocket.state}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>{pocket.enrolledST.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--success)', fontWeight: 600 }}>
                        {pocket.receivingScholarship.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--danger)' }}>
                          {pocket.unreachedGap.toLocaleString('en-IN')} ({pocket.gapPct})
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span className={`badge ${pocket.riskLevel.includes('High') ? 'badge-red' : 'badge-amber'}`}>
                          {pocket.riskLevel}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <button 
                          onClick={() => handleScheduleCamp(pocket.district)}
                          className="btn-primary" 
                          style={{ fontSize: '11px', padding: '6px 12px' }}
                        >
                          <Calendar size={12} /> Schedule Camp ({pocket.campScheduled})
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: STATE / UT MONITORING ================= */}
      {activeTab === 'states' && (
        <div className="gov-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px' }}>
            State / UT Level Application and Reach Rate
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px' }}>State / UT</th>
                  <th style={{ padding: '10px 14px' }}>Total Applications</th>
                  <th style={{ padding: '10px 14px' }}>Verified Applications</th>
                  <th style={{ padding: '10px 14px' }}>Sanctioned</th>
                  <th style={{ padding: '10px 14px' }}>Amount Disbursed</th>
                  <th style={{ padding: '10px 14px' }}>Reach Rate</th>
                </tr>
              </thead>
              <tbody>
                {MOTA_ADMIN_METRICS.stateStatus.map((st, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--primary)' }}>{st.state}</td>
                    <td style={{ padding: '12px 14px' }}>{st.totalApps.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px' }}>{st.verified.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{st.sanctioned.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--success)' }}>₹{st.amountCr} Cr</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="badge badge-green">{st.reachRate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SMART EXCEPTIONS QUEUE ================= */}
      {activeTab === 'exceptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'var(--primary-light)', padding: '14px', borderRadius: 'var(--radius-lg)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--primary)', margin: '0 0 4px' }}>
              Smart Exception Handling — Zero Outright Rejection Policy
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary)', margin: 0, lineHeight: 1.4 }}>
              Instead of discarding applications due to slight phonetic variations or e-district record latencies, anomalies are converted into actionable exceptions routed to the responsible stakeholder with deterministic reconciliation.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {exceptions.map((ex) => (
              <div key={ex.id} className="gov-card" style={{ padding: '16px', borderLeft: ex.resolved ? '4px solid var(--success)' : '4px solid var(--danger)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>EXCEPTION TICKET #{ex.id}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0', color: 'var(--text-main)' }}>{ex.studentName}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ex.institution} • APAAR ID: {ex.apaarId}</span>
                  </div>
                  <span className={`badge ${ex.resolved ? 'badge-green' : 'badge-red'}`}>
                    {ex.resolved ? 'Resolved' : 'Requires MoTA Review'}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-muted)', padding: '10px 12px', borderRadius: 'var(--radius-md)', margin: '10px 0', fontSize: '0.8rem' }}>
                  <strong>Identified Data Discrepancy:</strong> {ex.issue}
                  <div style={{ marginTop: '4px', color: 'var(--primary)' }}>
                    <strong>System Status:</strong> {ex.status}
                  </div>
                </div>

                {!ex.resolved && (
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button 
                      onClick={() => handleResolveException(ex.id)}
                      className="btn-primary" 
                      style={{ fontSize: '12px', padding: '6px 14px' }}
                    >
                      <Check size={14} /> Endorse & Approve Exception
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB: PFMS & APBS PAYMENT BATCH DISPATCH ================= */}
      {activeTab === 'payments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
                PFMS & APBS Central Payment Batch Dispatch Desk
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Direct integration with Public Financial Management System & NPCI Aadhaar Payment Bridge
              </p>
            </div>
            <button
              onClick={() => alert("Dispatching signed payment batch file to NPCI APBS Gateway...")}
              className="btn-primary"
              style={{ fontSize: '0.84rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <CreditCard size={15} /> Dispatch New DBT Payment Batch
            </button>
          </div>

          <div className="gov-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Batch ID</th>
                  <th style={{ padding: '12px 16px' }}>Target Scheme</th>
                  <th style={{ padding: '12px 16px' }}>Beneficiaries</th>
                  <th style={{ padding: '12px 16px' }}>Total Amount</th>
                  <th style={{ padding: '12px 16px' }}>Routing Bridge</th>
                  <th style={{ padding: '12px 16px' }}>Settlement Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "PFMS-2026-OD-8910", scheme: "Top Class Education for ST", count: "4,850", amount: "₹54.32 Cr", bridge: "NPCI APBS", date: "18 Sep 2026", status: "100% Settled" },
                  { id: "PFMS-2026-JH-9102", scheme: "Post-Matric Scholarship for ST", count: "12,400", amount: "₹39.68 Cr", bridge: "NPCI APBS", date: "15 Sep 2026", status: "100% Settled" },
                  { id: "PFMS-2026-MP-4190", scheme: "Pre-Matric Scholarship for ST", count: "22,100", amount: "₹26.52 Cr", bridge: "NPCI APBS", date: "10 Sep 2026", status: "100% Settled" },
                  { id: "PFMS-2026-NAT-008", scheme: "National Fellowship (Ph.D.)", count: "750", amount: "₹12.15 Cr", bridge: "RBI Direct Clearing", date: "26 Sep 2026", status: "In Transit" }
                ].map((b, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>{b.id}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{b.scheme}</td>
                    <td style={{ padding: '12px 16px' }}>{b.count} Students</td>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: 'var(--success)' }}>{b.amount}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-blue">{b.bridge}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{b.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${b.status.includes('Settled') ? 'badge-green' : 'badge-amber'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: AUDIT TRAIL ================= */}
      {activeTab === 'audit' && (
        <div className="gov-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px' }}>
            National Central Audit Log & Verification Ledger
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
            {[
              { time: "27 Sep 2026, 14:42:10", actor: "PFMS-GATEWAY", action: "DBT payment file batch #904128 acknowledged by NPCI APBS router (14,200 beneficiaries)", hash: "SHA256:d8a1...492f" },
              { time: "27 Sep 2026, 13:15:02", actor: "ODISHA-EDISTRICT-API", action: "Income certificate #OD/INC/2026/94821 verified via DigiLocker consent bridge", hash: "SHA256:9c12...381a" },
              { time: "27 Sep 2026, 11:30:45", actor: "NIT-ROURKELA-NODAL", action: "Institutional verification approved for 18 ST candidates (Batch #NITR-B3)", hash: "SHA256:1a82...901e" },
              { time: "27 Sep 2026, 09:10:12", actor: "REACH-ENGINE-CRON", action: "UDISE+ vs MoTA Beneficiary cross-validation completed. 6 High-priority tribal pockets flagged", hash: "SHA256:ee41...012c" }
            ].map((log, idx) => (
              <div key={idx} style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{log.action}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Actor: {log.actor} • Timestamp: {log.time}
                  </div>
                </div>
                <span className="badge badge-blue" style={{ fontSize: '10px' }}>{log.hash}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
