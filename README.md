# Unified Scholarship Platform for Tribal Students

**Ministry of Tribal Affairs (MoTA) • Government of India**  
*One Student. One Scholarship Passport. Every Opportunity.*

A production-grade, full-width unified digital platform engineered for Scheduled Tribe (ST) students across India to discover, apply for, track, verify, renew, and receive direct benefit transfer (DBT) scholarship payments under central and state schemes.

---

## 🏛️ Key Stakeholder Portals

The platform is strictly role-isolated with dedicated functional sections and persistent authentication:

1. **🎓 Student Scholarship Portal**
   - **Scholarship Passport**: Consolidated digital profile pre-verified via UIDAI Aadhaar e-KYC, APAAR/ABC ID, DigiLocker, and state e-District registries.
   - **Smart Recommendations**: Rule-based matching across Top Class Higher Education, Post-Matric, Pre-Matric, National Overseas Scholarship, and National Fellowship.
   - **Direct Benefit Transfer (DBT) Tracking**: Real-time PFMS and NPCI Aadhaar Payment Bridge System (APBS) transaction records.
   - **JAGO AI Multilingual Assistant**: Natural language guidance in English, Hindi, Odia, Santhali, and Telugu with speech synthesis.

2. **🏛️ Institution Nodal Portal (AISHE Desk)**
   - Verification Queue with individual and bulk Digital Signature Certificate (DSC) sign-offs.
   - Master directory of enrolled ST students with course and academic telemetry.
   - Course & Fee structure matrices conforming to MoTA ceiling norms.
   - Biometric and classroom attendance compliance tracking.

3. **🏢 State / UT Welfare Portal**
   - State-level sanction order generation and transmission to central ministry.
   - **PVTG Fast-Track Desk**: Mandated 48-hour zero-pendency SLA and ₹12,000/yr supplementary nutrition grants for Particularly Vulnerable Tribal Groups.
   - Real-time e-District Revenue & Tahasildar Caste Certificate validation ledger.
   - District-wise Tribal Sub-Plan (TSP) quota, reach indices, and budget telemetry.

4. **🇮🇳 MoTA National Command Portal**
   - Executive national analytics: Total applications, verification rate, sanctioned orders, and disbursed crores.
   - **Scholarship Reach Engine**: Proactive identification of low-coverage tribal pockets and dispatch of mobile enrollment camps.
   - Central scheme configuration and dynamic eligibility rules.
   - PFMS & APBS Payment Batch Dispatch ledger.
   - Fuzzy-logic Smart Exception resolution engine (name mismatches, legacy certificate endorsements).
   - Tamper-proof cryptographic national audit trail.

5. **👨‍👩‍👧 Parent & Family Portal**
   - Consolidated household scholarship passbook.
   - Multi-ward academic and attendance tracking.
   - Direct-to-bank DBT remittance ledger with bank UTR reference numbers.
   - Digital parental consent authorizations and audio summaries.

6. **🤝 CSC Rural Facilitation & Assisted Kiosk Desk**
   - High-voice 5-step guided wizard for first-generation tribal learners.
   - Edge offline camp caching and batch synchronization queue.
   - VLE kiosk applicant biometric registration.
   - Public application and DBT status lookup.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Lucide Icons, Vanilla CSS Design System
- **State & Routing**: Component-driven role isolation, persistent database bridge
- **Backend / Mock API**: Custom Vite API middleware (`/api/auth/*`) simulating central government databases
- **Data Persistence**: `data/db.json` logging all login sessions, authentication methods, and user profiles
- **Accessibility**: High-contrast mode, multi-step font scaling (A, A+, A++), multilingual switcher, offline resilience caching

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/srinith-25/SIH-2-scholarship.git
cd SIH-2-scholarship

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔒 Security & Privacy

- Compliant with Digital Personal Data Protection Act (DPDP) standards.
- Zero middleman intervention: All financial disbursements routed directly via NPCI Aadhaar Payment Bridge System (APBS).
- End-to-end auditability with SHA-256 digital seals on all institutional and state sanction orders.
