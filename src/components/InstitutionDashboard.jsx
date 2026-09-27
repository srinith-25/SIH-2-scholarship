import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Check, 
  X, 
  Search, 
  AlertCircle, 
  Download,
  ShieldCheck,
  Users,
  GraduationCap,
  Layers,
  FileText,
  BarChart3,
  Calendar
} from 'lucide-react';
import { INSTITUTION_QUEUE } from '../data/mockData';

export const InstitutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('queue'); // queue | students | fees | attendance | dsc-history
  const [queue, setQueue] = useState(INSTITUTION_QUEUE);
  const [selectedIds, setSelectedIds] = useState([]);
  const [verifiedCount, setVerifiedCount] = useState(148);

  // Enrolled ST student directory at NIT Rourkela
  const [studentsMaster] = useState([
    { id: "ST-NITR-101", name: "Ananya Munda", roll: "122CS0891", dept: "Computer Science & Engg", year: "3rd Year (UG)", apaar: "9281-0492-3810", casteCert: "Verified (e-District)", scheme: "Top Class Higher Ed", status: "Sanctioned & Disbursed" },
    { id: "ST-NITR-102", name: "Arjun Gond", roll: "123MM0412", dept: "Metallurgical & Materials", year: "2nd Year (UG)", apaar: "9281-0492-4912", casteCert: "Verified (e-District)", scheme: "Top Class Higher Ed", status: "Pending Verification" },
    { id: "ST-NITR-103", name: "Kavita Soren", roll: "121EE0714", dept: "Electrical Engg", year: "4th Year (UG)", apaar: "9281-0492-7714", casteCert: "Verified (e-District)", scheme: "Top Class Higher Ed", status: "Pending Verification" },
    { id: "ST-NITR-104", name: "Deepak Bhil", roll: "224CE1108", dept: "Civil (Structural Engg)", year: "1st Year (PG)", apaar: "9281-0492-1108", casteCert: "Verified (e-District)", scheme: "Top Class Higher Ed", status: "Pending Verification" },
    { id: "ST-NITR-105", name: "Suman Oram", roll: "122ME0921", dept: "Mechanical Engg", year: "3rd Year (UG)", apaar: "9281-0492-3320", casteCert: "Verified (e-District)", scheme: "Post-Matric ST", status: "Verified" }
  ]);

  // Fee schedule matrix
  const [feeSchedule] = useState([
    { head: "Tuition Fee (Per Annum)", amount: "₹62,500", refundable: "No", status: "Approved by BoG & MoTA" },
    { head: "Registration & Examination Dues", amount: "₹5,500", refundable: "No", status: "Approved" },
    { head: "Student Activity & Gymkhana Fee", amount: "₹4,000", refundable: "No", status: "Approved" },
    { head: "Medical & Health Care Fund", amount: "₹3,000", refundable: "No", status: "Approved" },
    { head: "Total Non-Refundable Dues Demanded", amount: "₹75,000", refundable: "No", status: "Standard Ceiling" }
  ]);

  // DSC Audit history
  const [dscHistory] = useState([
    { batch: "NITR-DSC-2026-B1", date: "18 Jul 2026", count: 18, signedBy: "Dr. P. K. Mohapatra", dscSerial: "SHA256:4b91...8c1f", status: "Transmitted to Odisha State Welfare Authority" },
    { batch: "NITR-DSC-2026-B2", date: "12 Aug 2026", count: 24, signedBy: "Dr. P. K. Mohapatra", dscSerial: "SHA256:7f02...119c", status: "Transmitted to MoTA Central Portal" },
    { batch: "NITR-DSC-2025-B4", date: "10 Oct 2025", count: 42, signedBy: "Registrar, NIT Rourkela", dscSerial: "SHA256:9a42...771e", status: "Fully Disbursed via PFMS APBS" }
  ]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApprove = (id) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    setVerifiedCount(prev => prev + 1);
    alert(`Student record ${id} has been institutionally endorsed and signed with DSC (Digital Signature Certificate)!`);
  };

  const handleBulkApprove = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one student application for bulk approval.");
      return;
    }
    setQueue(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setVerifiedCount(prev => prev + selectedIds.length);
    setSelectedIds([]);
    alert(`Successfully verified and transmitted ${selectedIds.length} applications to State Scholarship Authority!`);
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* Institution Banner */}
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
                INSTITUTION NODAL DESK
              </span>
              <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>AISHE Code: U-0355 • Top Class Higher Education Centre</span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              National Institute of Technology (NIT) Rourkela
            </h2>
            <p style={{ fontSize: '0.88rem', opacity: 0.92, margin: 0, color: '#e0f2fe' }}>
              Nodal Officer: <strong>Dr. P. K. Mohapatra</strong> • Dean of Student Welfare & Scholarship Cell
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>Pending Queue:</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{queue.length}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>Verified This Term:</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4ade80' }}>{verifiedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* INSTITUTION PORTAL SUB-NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid var(--border-color)', marginBottom: '24px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'queue', label: `📋 Verification Queue (${queue.length})` },
          { id: 'students', label: `👥 Enrolled ST Students Master (${studentsMaster.length})` },
          { id: 'fees', label: '🏫 Course & Fee Structure Matrix' },
          { id: 'attendance', label: '📊 Attendance & Academic Telemetry' },
          { id: 'dsc-history', label: `📜 Digital Sign-Off & DSC Logs (${dscHistory.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
              backgroundColor: activeTab === tab.id ? 'var(--primary-light)' : 'transparent',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: VERIFICATION QUEUE ================= */}
      {activeTab === 'queue' && (
        <div>
          {/* Verification Guidelines banner */}
          <div style={{ backgroundColor: 'var(--primary-light)', padding: '14px 20px', borderRadius: 'var(--radius-lg)', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ShieldCheck size={22} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div style={{ fontSize: '0.84rem', color: 'var(--primary)', lineHeight: 1.45 }}>
              <strong>Institutional Verification Guidelines:</strong> Please confirm that each candidate is genuinely enrolled, maintains regular academic attendance (&gt;75%), and non-refundable tuition fee demands strictly match NIT Rourkela's senate-approved schedule.
            </div>
          </div>

          {/* Bulk Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="checkbox" 
                checked={queue.length > 0 && selectedIds.length === queue.length}
                onChange={(e) => setSelectedIds(e.target.checked ? queue.map(q => q.id) : [])}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Select All Pending Applications ({queue.length})</span>
            </div>

            <button 
              onClick={handleBulkApprove}
              className="btn-primary" 
              style={{ fontSize: '12px', padding: '9px 18px', opacity: selectedIds.length > 0 ? 1 : 0.6 }}
              disabled={selectedIds.length === 0}
            >
              <CheckCircle2 size={16} /> Bulk Endorse & Digitally Sign ({selectedIds.length})
            </button>
          </div>

          {/* Student Queue Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {queue.length === 0 ? (
              <div className="gov-card" style={{ padding: '44px', textAlign: 'center' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Queue Clear: All Applications Verified</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>There are no pending student applications awaiting institutional sign-off at NIT Rourkela.</p>
              </div>
            ) : (
              queue.map((student) => {
                const isSelected = selectedIds.includes(student.id);
                return (
                  <div 
                    key={student.id} 
                    className="gov-card" 
                    style={{ 
                      padding: '20px', 
                      backgroundColor: isSelected ? 'var(--primary-light)' : '#ffffff',
                      border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSelect(student.id)}
                        style={{ width: '20px', height: '20px', marginTop: '4px', cursor: 'pointer' }}
                      />

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                                {student.studentName}
                              </h4>
                              <span className="badge badge-blue">APAAR ID: {student.apaarId}</span>
                            </div>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                              Course: {student.course} • Date Submitted: {student.submissionDate}
                            </span>
                          </div>

                          <span className="badge badge-amber" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            <Clock size={13} /> {student.status}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: '14px 0', fontSize: '0.82rem', backgroundColor: 'var(--bg-muted)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                          <div><strong>Scheme:</strong> {student.scheme}</div>
                          <div><strong>Demanded Fee:</strong> <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{student.feeDemanded}</span></div>
                          <div><strong>Attendance:</strong> <span style={{ color: 'var(--success)', fontWeight: 800 }}>{student.attendance} (Valid)</span></div>
                          <div><strong>Academic CGPA:</strong> <strong>{student.cgpa}</strong></div>
                          <div style={{ gridColumn: 'span 2' }}><strong>ST Caste Certificate:</strong> {student.stCertStatus}</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <button 
                            onClick={() => alert(`Deficiency notice created for ${student.studentName}. Application routed to student for correction without rejection.`)}
                            className="btn-secondary" 
                            style={{ fontSize: '12px', padding: '7px 16px' }}
                          >
                            Raise Discrepancy Note
                          </button>
                          <button 
                            onClick={() => handleApprove(student.id)}
                            className="btn-primary" 
                            style={{ fontSize: '12px', padding: '7px 18px' }}
                          >
                            <Check size={15} /> Verify & Digitally Sign (DSC)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: ENROLLED ST STUDENTS MASTER ================= */}
      {activeTab === 'students' && (
        <div className="gov-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                Enrolled Scheduled Tribe (ST) Student Roster
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                Full institutional registry synchronized with National Academic Depository & APAAR IDs
              </p>
            </div>
            <button 
              onClick={() => alert("Exporting ST Student Roster (CSV / Excel)...")}
              className="btn-secondary" 
              style={{ fontSize: '12px' }}
            >
              <Download size={14} /> Export Directory
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px' }}>Roll No / ID</th>
                  <th style={{ padding: '10px 14px' }}>Student Name</th>
                  <th style={{ padding: '10px 14px' }}>Department & Year</th>
                  <th style={{ padding: '10px 14px' }}>APAAR ID</th>
                  <th style={{ padding: '10px 14px' }}>Caste Certificate</th>
                  <th style={{ padding: '10px 14px' }}>Scholarship Scheme</th>
                  <th style={{ padding: '10px 14px' }}>Sanction Status</th>
                </tr>
              </thead>
              <tbody>
                {studentsMaster.map((st) => (
                  <tr key={st.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>{st.roll}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-main)' }}>{st.name}</td>
                    <td style={{ padding: '12px 14px' }}>{st.dept} ({st.year})</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{st.apaar}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="badge badge-green">{st.casteCert}</span>
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{st.scheme}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className={`badge ${st.status.includes('Disbursed') ? 'badge-green' : 'badge-amber'}`}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: COURSE & FEE MATRIX ================= */}
      {activeTab === 'fees' && (
        <div className="gov-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
            NIT Rourkela Approved Fee Demand Schedule (2026-27)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Institutional fee structure submitted to and validated by the Ministry of Tribal Affairs (MoTA) for full Top Class Higher Education reimbursement.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 16px' }}>Fee Head</th>
                  <th style={{ padding: '10px 16px' }}>Annual Demanded Amount</th>
                  <th style={{ padding: '10px 16px' }}>Refundable?</th>
                  <th style={{ padding: '10px 16px' }}>MoTA Reimbursement Status</th>
                </tr>
              </thead>
              <tbody>
                {feeSchedule.map((fee, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: idx === feeSchedule.length - 1 ? 800 : 600 }}>{fee.head}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: 'var(--primary)' }}>{fee.amount}</td>
                    <td style={{ padding: '12px 16px' }}>{fee.refundable}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-green">{fee.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ backgroundColor: '#f0fdfa', border: '1px solid var(--secondary-light)', borderRadius: 'var(--radius-md)', padding: '14px', fontSize: '0.82rem', color: 'var(--secondary)' }}>
            ✓ <strong>Direct Institutional Disbursal:</strong> In accordance with MoTA Top Class Higher Education guidelines, tuition fee reimbursement is credited directly to the NIT Rourkela institutional bank account (State Bank of India NIT Campus Branch), while living and book allowances are credited directly to the student's Aadhaar-seeded bank account.
          </div>
        </div>
      )}

      {/* ================= SECTION 4: ATTENDANCE TELEMETRY ================= */}
      {activeTab === 'attendance' && (
        <div className="gov-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
            Academic Attendance & Biometric Telemetry
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Real-time biometric attendance feeds synchronized from NIT Rourkela ERP. MoTA scholarship guidelines mandate minimum 75% overall lecture attendance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {studentsMaster.map((st) => (
              <div key={st.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px', backgroundColor: 'var(--bg-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>{st.name}</h5>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{st.roll} • {st.dept}</span>
                  </div>
                  <span className="badge badge-green">89.4% Attendance</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', margin: '8px 0', overflow: 'hidden' }}>
                  <div style={{ width: '89.4%', height: '100%', backgroundColor: 'var(--success)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                  <span>Required: &gt;75%</span>
                  <span style={{ color: 'var(--success)', fontWeight: 700 }}>Eligible for Endorsement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 5: DSC SIGN-OFF LOGS ================= */}
      {activeTab === 'dsc-history' && (
        <div className="gov-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
            Institutional Digital Signature Certificate (DSC) Audit Trail
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Immutable records of all institutional batch sign-offs transmitted to State Welfare Departments and Ministry of Tribal Affairs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dscHistory.map((batch, idx) => (
              <div key={idx} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary)' }}>Batch ID: {batch.batch}</span>
                    <span className="badge badge-blue">{batch.count} Students Endorsed</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Endorsed by: <strong>{batch.signedBy}</strong> • Signed on: {batch.date}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'monospace', marginTop: '2px' }}>
                    Cryptographic DSC Serial: {batch.dscSerial}
                  </div>
                </div>
                <span className="badge badge-green">{batch.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
