import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Check, 
  Sparkles,
  MapPin, 
  Filter,
  FileCheck,
  Search,
  Download,
  FileText,
  TrendingUp,
  AlertTriangle,
  Award,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { STATE_OFFICER_QUEUE } from '../data/mockData';

export const StateOfficerDashboard = () => {
  const [activeTab, setActiveTab] = useState('queue'); // queue | pvtg | edistrict | districts | exceptions
  const [queue, setQueue] = useState(STATE_OFFICER_QUEUE);
  const [sanctionedCount, setSanctionedCount] = useState(14820);
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // PVTG Priority Queue State
  const [pvtgList, setPvtgList] = useState([
    {
      id: "PVTG-OD-2026-001",
      name: "Shanti Birhor",
      tribe: "Birhor (PVTG)",
      district: "Sundargarh",
      village: "Kutra Block",
      institution: "Govt Women's College, Rourkela",
      scheme: "Post-Matric Scholarship for ST",
      amount: "₹48,000 + ₹12,000 PVTG Special Grant",
      slaHours: "8 hrs remaining (Target: < 48 hrs)",
      slaStatus: "urgent",
      certStatus: "Verified by Sub-Collector Panposh"
    },
    {
      id: "PVTG-OD-2026-002",
      name: "Dama Didayi",
      tribe: "Didayi (PVTG)",
      district: "Malkangiri",
      village: "Kudumulu Guma",
      institution: "Biju Patnaik Autonomous College",
      scheme: "Top Class Education for ST",
      amount: "₹85,000 + ₹12,000 PVTG Special Grant",
      slaHours: "14 hrs remaining",
      slaStatus: "urgent",
      certStatus: "Verified by Special Micro-Project Agency"
    },
    {
      id: "PVTG-OD-2026-003",
      name: "Jani Dongria Kondh",
      tribe: "Dongria Kondh (PVTG)",
      district: "Rayagada",
      village: "Niyamgiri Hills (Kurli)",
      institution: "Rayagada Autonomous College",
      scheme: "Post-Matric Scholarship for ST",
      amount: "₹45,000 + ₹12,000 PVTG Special Grant",
      slaHours: "22 hrs remaining",
      slaStatus: "normal",
      certStatus: "Verified by Tahasildar Bissam Cuttack"
    }
  ]);

  // e-District Certificate Database Integration State
  const [eDistrictCerts] = useState([
    { certNo: "OD/ST/2023/18291", applicant: "Laxman Ho", tribe: "Ho", tahasil: "Baripada", issued: "14-Aug-2023", digitalSeal: "SHA256:Valid", status: "Verified & Locked" },
    { certNo: "OD/ST/2024/99120", applicant: "Shanti Birhor", tribe: "Birhor (PVTG)", tahasil: "Panposh", issued: "02-Feb-2024", digitalSeal: "SHA256:Valid", status: "Verified & Locked" },
    { certNo: "OD/ST/2022/88124", applicant: "Hemant Oram", tribe: "Oraon", tahasil: "Burla", issued: "19-Nov-2022", digitalSeal: "SHA256:Valid", status: "Verified & Locked" },
    { certNo: "OD/ST/2021/44910", applicant: "Budhram Munda", tribe: "Munda", tahasil: "Bonai", issued: "10-Jun-2021", digitalSeal: "SHA256:Valid", status: "Verified & Locked" },
    { certNo: "OD/ST/2020/12984", applicant: "Kamla Santhal", tribe: "Santhal", tahasil: "Rairangpur", issued: "29-Dec-2020", digitalSeal: "Manual Legacy", status: "Digitally Re-Endorsed" }
  ]);

  // District-wise quota telemetry
  const [districtTelemetry] = useState([
    { district: "Mayurbhanj", targetST: 45000, enrolled: 42100, sanctioned: 38900, budgetCr: "₹42.8 Cr", reachRate: "93.5%", status: "On Track" },
    { district: "Sundargarh", targetST: 38000, enrolled: 36200, sanctioned: 33400, budgetCr: "₹38.2 Cr", reachRate: "92.3%", status: "On Track" },
    { district: "Koraput", targetST: 34000, enrolled: 29800, sanctioned: 26500, budgetCr: "₹29.1 Cr", reachRate: "87.6%", status: "On Track" },
    { district: "Malkangiri", targetST: 28000, enrolled: 19400, sanctioned: 16800, budgetCr: "₹18.4 Cr", reachRate: "69.3%", status: "Priority Camp Needed" },
    { district: "Rayagada", targetST: 26000, enrolled: 22100, sanctioned: 19800, budgetCr: "₹21.7 Cr", reachRate: "85.0%", status: "On Track" },
    { district: "Kandhamal", targetST: 24000, enrolled: 21500, sanctioned: 19200, budgetCr: "₹20.5 Cr", reachRate: "89.5%", status: "On Track" },
    { district: "Nabarangpur", targetST: 22000, enrolled: 16100, sanctioned: 13900, budgetCr: "₹14.8 Cr", reachRate: "73.2%", status: "Camp Scheduled" }
  ]);

  // State Exceptions
  const [stateExceptions, setStateExceptions] = useState([
    {
      id: "ST-EX-OD-091",
      student: "Chaitu Majhi",
      institution: "Govt Polytechnic, Koraput",
      issue: "Bank Account IFSC migrated from Utkal Grameen Bank to SBI APBS bridge",
      urgency: "Medium",
      status: "NPCI Mapping Verified"
    },
    {
      id: "ST-EX-OD-092",
      student: "Raimati Goud",
      institution: "Dharani Dhar University, Keonjhar",
      issue: "Caste certificate issued under maiden surname; Aadhaar updated post-marriage",
      urgency: "High",
      status: "Tahasil Certificate Cross-Linked"
    }
  ]);

  const handleApprove = (id, name) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    setSanctionedCount(prev => prev + 1);
    alert(`Application for ${name} (${id}) verified by State Scholarship Authority.\n\nDigital Sanction Order generated and transmitted to Ministry of Tribal Affairs (MoTA) for DBT payment order!`);
  };

  const handleApprovePvtg = (id, name) => {
    setPvtgList(prev => prev.filter(item => item.id !== id));
    setSanctionedCount(prev => prev + 1);
    alert(`PVTG Fast-Track Priority Sanction approved for ${name} (${id})!\n\nSpecial PVTG Top-Up Grant of ₹12,000 added automatically.`);
  };

  const handleBulkStateApprove = () => {
    const count = queue.length;
    setSanctionedCount(prev => prev + count);
    setQueue([]);
    alert(`Batch of ${count} applications endorsed with Odisha State Digital Certificate and transmitted to MoTA Central Portal!`);
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* State Authority Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f3c68 0%, #1e3a8a 100%)', 
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
                STATE SCHOLARSHIP SANCTIONING AUTHORITY
              </span>
              <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>ST & SC Development Department • Govt. of Odisha</span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Odisha State Tribal Welfare Portal
            </h2>
            <p style={{ fontSize: '0.88rem', opacity: 0.92, margin: 0, color: '#e0f2fe' }}>
              State Nodal Officer: <strong>R. K. Tripathy, OAS (SS)</strong> • Direct e-District & MeriPehchaan Gateway
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '10px 18px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '0.72rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pending State Queue</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#facc15' }}>{queue.length}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '10px 18px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '0.72rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.04em' }}>State Sanctions</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4ade80' }}>{sanctionedCount.toLocaleString('en-IN')}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '10px 18px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '0.72rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.04em' }}>PVTG Priority SLA</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>100%</div>
            </div>
          </div>
        </div>
      </div>

      {/* STATE PORTAL NAVIGATION SECTIONS */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        borderBottom: '2px solid var(--border-color)', 
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'queue', label: `Pending Sanctions (${queue.length})`, icon: '📋' },
          { id: 'pvtg', label: `PVTG Priority Desk (${pvtgList.length})`, icon: '⭐' },
          { id: 'edistrict', label: 'e-District Certificate Engine', icon: '📜' },
          { id: 'districts', label: 'District Quota & Reach Telemetry', icon: '🗺️' },
          { id: 'exceptions', label: `State Exceptions (${stateExceptions.length})`, icon: '⚠️' }
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
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: PENDING STATE SANCTION QUEUE                  */}
      {/* ========================================================= */}
      {activeTab === 'queue' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
                Applications Awaiting State Sanction Order
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Verified by Colleges & Universities with AISHE DSC • Ready for State Endorsement
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {queue.length > 0 && (
                <button
                  onClick={handleBulkStateApprove}
                  className="btn-primary"
                  style={{ fontSize: '0.84rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Sanction All Remaining ({queue.length})</span>
                </button>
              )}
              <button
                onClick={() => alert("Downloading State Sanction Order Digest (Signed PDF)...")}
                className="btn-secondary"
                style={{ fontSize: '0.84rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={15} />
                <span>Export Sanction Digest</span>
              </button>
            </div>
          </div>

          {queue.length === 0 ? (
            <div className="gov-card" style={{ padding: '48px', textAlign: 'center' }}>
              <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>State Verification Queue Clear!</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '6px auto 0' }}>
                All pending institution-endorsed scholarship files for this batch have been verified and transmitted to MoTA Central Command for payment order generation.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {queue.map((item) => (
                <div 
                  key={item.id} 
                  className="gov-card" 
                  style={{ 
                    padding: '20px', 
                    borderLeft: item.pvtg.includes('Yes') ? '5px solid #f59e0b' : '5px solid var(--primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                          {item.studentName}
                        </span>
                        <span className="badge badge-blue" style={{ fontSize: '11px' }}>{item.id}</span>
                        {item.pvtg.includes('Yes') && (
                          <span className="badge badge-amber" style={{ fontSize: '11px' }}>
                            <Sparkles size={11} /> PVTG Priority Desk
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        🏛️ <strong>{item.institution}</strong> • {item.course}
                      </div>

                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-main)', backgroundColor: 'var(--bg-muted)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                        <div><strong>District:</strong> {item.district}</div>
                        <div><strong>Scheme:</strong> {item.scheme}</div>
                        <div><strong>Caste Cert:</strong> {item.stCertNo}</div>
                        <div><strong>Family Income:</strong> {item.annualIncome}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <span className="badge badge-green" style={{ fontSize: '11px' }}>
                        <ShieldCheck size={12} /> AISHE Institution Endorsed
                      </span>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => alert(`Opening complete dossier for ${item.studentName} including verified e-District Caste Certificate, Income Certificate, and Bonafide.`)}
                          className="btn-secondary"
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                        >
                          View Dossier
                        </button>
                        <button
                          onClick={() => handleApprove(item.id, item.studentName)}
                          className="btn-primary"
                          style={{ fontSize: '12px', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Check size={14} />
                          <span>Sanction & Transmit to MoTA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: PVTG FAST-TRACK PRIORITY DESK                  */}
      {/* ========================================================= */}
      {activeTab === 'pvtg' && (
        <div>
          <div style={{ 
            backgroundColor: '#fffbeb', 
            border: '2px solid #f59e0b', 
            borderRadius: 'var(--radius-lg)', 
            padding: '18px 24px', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '32px' }}>⭐</span>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#92400e', margin: '0 0 2px' }}>
                  Particularly Vulnerable Tribal Groups (PVTG) Priority Desk
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#b45309', margin: 0 }}>
                  Mandated 48-Hour Zero-Pendency SLA under Prime Minister PVTG Development Mission (PM-PVTG). Includes ₹12,000/yr Supplementary Nutrition & Connectivity Grant.
                </p>
              </div>
            </div>
            <div style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '6px 14px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '0.82rem' }}>
              Zero-Pendency Active
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pvtgList.map(pvtg => (
              <div key={pvtg.id} className="gov-card" style={{ padding: '20px', borderLeft: '5px solid #f59e0b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--primary)' }}>{pvtg.name}</span>
                      <span className="badge badge-amber" style={{ fontWeight: 800 }}>{pvtg.tribe}</span>
                      <span className="badge badge-blue">{pvtg.district} ({pvtg.village})</span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      🏫 {pvtg.institution} • Scheme: <strong>{pvtg.scheme}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', flexWrap: 'wrap', marginTop: '6px' }}>
                      <div style={{ color: 'var(--success)', fontWeight: 700 }}>
                        💰 Sanction Amount: {pvtg.amount}
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>
                        📜 Verification: <strong>{pvtg.certStatus}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div style={{ 
                      backgroundColor: '#fee2e2', 
                      color: '#b91c1c', 
                      padding: '4px 10px', 
                      borderRadius: 'var(--radius-sm)', 
                      fontSize: '0.78rem', 
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={12} />
                      <span>{pvtg.slaHours}</span>
                    </div>

                    <button
                      onClick={() => handleApprovePvtg(pvtg.id, pvtg.name)}
                      className="btn-primary"
                      style={{ fontSize: '0.82rem', padding: '7px 16px', backgroundColor: '#d97706', borderColor: '#b45309' }}
                    >
                      Fast-Track PVTG Sanction
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: E-DISTRICT CERTIFICATE ENGINE                  */}
      {/* ========================================================= */}
      {activeTab === 'edistrict' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
                Odisha e-District Revenue & Caste Certificate Repository
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Real-Time Tahasildar Digital Signature Verification (Public Key Infrastructure)
              </p>
            </div>
            <span className="badge badge-green" style={{ fontSize: '12px', padding: '6px 12px' }}>
              <ShieldCheck size={14} /> e-District API Status: Operational (Latency 120ms)
            </span>
          </div>

          <div className="gov-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Certificate Ref</th>
                  <th style={{ padding: '12px 16px' }}>Applicant</th>
                  <th style={{ padding: '12px 16px' }}>Tribe Community</th>
                  <th style={{ padding: '12px 16px' }}>Issuing Tahasil</th>
                  <th style={{ padding: '12px 16px' }}>Issue Date</th>
                  <th style={{ padding: '12px 16px' }}>Digital Seal</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {eDistrictCerts.map((cert, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>{cert.certNo}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{cert.applicant}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-blue">{cert.tribe}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{cert.tahasil} Tahasil</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{cert.issued}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', backgroundColor: 'var(--bg-muted)', padding: '2px 6px', borderRadius: '4px' }}>
                        {cert.digitalSeal}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-green">
                        <CheckCircle2 size={12} /> {cert.status}
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
      {/* SECTION 4: DISTRICT QUOTA & REACH TELEMETRY              */}
      {/* ========================================================= */}
      {activeTab === 'districts' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
                District-Wise ST Scholarship Coverage & Expenditure
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Odisha Tribal Sub-Plan (TSP) Component Monitoring Dashboard
              </p>
            </div>
            <button 
              onClick={() => alert("Generating District-Wise Financial Sanction Order Summary...")}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} /> Download District PDF
            </button>
          </div>

          <div className="gov-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>District</th>
                  <th style={{ padding: '12px 16px' }}>Eligible ST Pool</th>
                  <th style={{ padding: '12px 16px' }}>Enrolled & Verified</th>
                  <th style={{ padding: '12px 16px' }}>State Sanctioned</th>
                  <th style={{ padding: '12px 16px' }}>Budget Released</th>
                  <th style={{ padding: '12px 16px' }}>Reach Index</th>
                  <th style={{ padding: '12px 16px' }}>Intervention</th>
                </tr>
              </thead>
              <tbody>
                {districtTelemetry.map((d, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: 'var(--primary)' }}>
                      📍 {d.district}
                    </td>
                    <td style={{ padding: '12px 16px' }}>{d.targetST.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 16px' }}>{d.enrolled.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--success)' }}>
                      {d.sanctioned.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>{d.budgetCr}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', width: '60px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: d.reachRate, height: '100%', backgroundColor: parseFloat(d.reachRate) > 80 ? 'var(--success)' : '#f59e0b' }} />
                        </div>
                        <span style={{ fontWeight: 700 }}>{d.reachRate}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${d.status === 'On Track' ? 'badge-green' : 'badge-amber'}`}>
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
      {/* SECTION 5: STATE EXCEPTIONS & GRIEVANCES                 */}
      {/* ========================================================= */}
      {activeTab === 'exceptions' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 2px' }}>
              State Exception Desk & Grievance Adjudication
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Special Resolution for Regional Bank Mergers, Domicile Boundary Alignments, and Family Surname Discrepancies
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stateExceptions.map(ex => (
              <div key={ex.id} className="gov-card" style={{ padding: '20px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary)' }}>{ex.student}</span>
                      <span className="badge badge-blue">{ex.id}</span>
                      <span className="badge badge-amber">Urgency: {ex.urgency}</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      🏛️ {ex.institution}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', backgroundColor: 'var(--bg-muted)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                      <strong>Issue:</strong> {ex.issue}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> {ex.status}
                    </span>
                    <button
                      onClick={() => alert(`Endorsing exception resolution for ${ex.student}. Re-routing to State Sanction Queue.`)}
                      className="btn-primary"
                      style={{ fontSize: '12px', padding: '6px 14px' }}
                    >
                      Endorse & Resolve
                    </button>
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
