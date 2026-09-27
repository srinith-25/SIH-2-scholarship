// Mock Data for Unified Scholarship Platform for Tribal Students (Ministry of Tribal Affairs - MoTA)

export const SCHEMES = [
  {
    id: "top-class",
    name: "National Scholarship for Higher Education (Top Class Education) for ST Students",
    shortName: "Top Class Education Scholarship",
    ministry: "Ministry of Tribal Affairs, Govt. of India",
    level: "Higher Education (UG/PG in Notified Premier Institutes)",
    target: "ST Students studying in notified premier institutes (IITs, NITs, IIMs, AIIMS, NLUs)",
    coverage: "Full tuition fee + ₹86,000/yr living expenses + ₹45,000 one-time computer grant + ₹7,000/yr books",
    incomeCeiling: 600000,
    incomeCeilingLabel: "₹6,00,000 per annum",
    academicCriteria: "Admission to notified Top Class institute (e.g. NIT Rourkela)",
    matchScore: 98,
    status: "Active - Sanctioned",
    compatibilityCategory: "Full Fellowship / Premier",
    deadline: "31 Oct 2026",
    eligibleCriteriaList: [
      { text: "ST Caste Certificate verified via Odisha e-District", met: true },
      { text: "Family annual income ₹1,85,000 is well within ₹6,00,000 ceiling", met: true },
      { text: "Enrolled in notified Top Class Institute (NIT Rourkela - AISHE: U-0355)", met: true },
      { text: "APAAR ID verified with academic credit record", met: true },
      { text: "Aadhaar-seeded bank account validated on PFMS", met: true }
    ],
    incompatibleWith: ["post-matric", "pre-matric", "fellowship"],
    description: "Supports meritorious Scheduled Tribe students pursuing undergraduate or postgraduate studies across 260+ top national institutes."
  },
  {
    id: "post-matric",
    name: "Post-Matric Scholarship Scheme for ST Students",
    shortName: "Post-Matric Scholarship",
    ministry: "Ministry of Tribal Affairs, Govt. of India",
    level: "Class 11, 12, ITI, Diploma, UG, PG, Professional Courses",
    target: "All ST students enrolled in recognized post-matric courses",
    coverage: "Compulsory non-refundable fees + ₹13,500/yr maintenance allowance for hostellers",
    incomeCeiling: 250000,
    incomeCeilingLabel: "₹2,50,000 per annum",
    academicCriteria: "Passed Class 10 / previous academic year",
    matchScore: 92,
    status: "Eligible - Alternative Option",
    compatibilityCategory: "Post-Matric Standard",
    deadline: "15 Nov 2026",
    eligibleCriteriaList: [
      { text: "ST Caste Certificate verified", met: true },
      { text: "Family annual income ₹1,85,000 is within ₹2,50,000 ceiling", met: true },
      { text: "Pursuing recognized Post-Matric course", met: true },
      { text: "Hold no incompatible central scholarship", met: true }
    ],
    incompatibleWith: ["top-class", "pre-matric", "fellowship"],
    description: "Centrally sponsored scheme providing financial assistance to Scheduled Tribe students at post-matriculation or post-secondary stage to complete their education."
  },
  {
    id: "fellowship",
    name: "National Fellowship for ST Students (M.Phil / Ph.D.)",
    shortName: "National Fellowship for ST",
    ministry: "Ministry of Tribal Affairs, Govt. of India",
    level: "M.Phil / Ph.D. Regular & Full-Time Research",
    target: "ST scholars registered for regular M.Phil / Ph.D. courses in Indian Universities",
    coverage: "₹31,000 - ₹35,000/month fellowship + contingency grant + HRA as per norms",
    incomeCeiling: null,
    incomeCeilingLabel: "No Income Ceiling (Merit & Research Enrolment based)",
    academicCriteria: "Post-Graduation + Registration in Ph.D. / M.Phil program",
    matchScore: 40,
    status: "Not Eligible (Academic Level)",
    compatibilityCategory: "Doctoral Research Fellowship",
    deadline: "30 Nov 2026",
    eligibleCriteriaList: [
      { text: "ST Caste Certificate verified", met: true },
      { text: "Currently in UG (B.Tech Year 3); scheme requires Ph.D. registration", met: false },
      { text: "UGC / CSIR NET qualification or Ph.D. enrolment required", met: false }
    ],
    incompatibleWith: ["top-class", "post-matric"],
    description: "Provides financial assistance to 750 ST scholars every year for pursuing higher studies leading to M.Phil and Ph.D. degrees in Science, Humanities and Social Sciences."
  },
  {
    id: "nos",
    name: "National Overseas Scholarship for Scheduled Tribe Students (NOS)",
    shortName: "National Overseas Scholarship",
    ministry: "Ministry of Tribal Affairs, Govt. of India",
    level: "Master's Degree & Ph.D. Abroad",
    target: "ST students seeking higher studies in reputed foreign universities",
    coverage: "100% tuition fees + $15,400 / £9,900 annual maintenance + contingency & airfare",
    incomeCeiling: 600000,
    incomeCeilingLabel: "₹6,00,000 per annum",
    academicCriteria: "Minimum 55% marks in UG / PG + Offer letter from top 500 QS ranked university",
    matchScore: 68,
    status: "May Be Eligible for Higher Studies",
    compatibilityCategory: "Overseas Study Grant",
    deadline: "15 Dec 2026",
    eligibleCriteriaList: [
      { text: "ST Caste Certificate verified", met: true },
      { text: "Family annual income ₹1,85,000 is within ₹6,00,000 ceiling", met: true },
      { text: "Must secure unconditional admission in top 500 QS global university", met: false },
      { text: "Requires graduation with min 55% marks (Currently in Year 3)", met: false }
    ],
    incompatibleWith: ["top-class", "post-matric"],
    description: "Empowers 20 deserving ST candidates annually to pursue Master's, Ph.D. and Post-Doctoral research programs abroad in prestigious international universities."
  },
  {
    id: "pre-matric",
    name: "Pre-Matric Scholarship Scheme for ST Students",
    shortName: "Pre-Matric Scholarship",
    ministry: "Ministry of Tribal Affairs, Govt. of India",
    level: "Classes IX (9th) and X (10th)",
    target: "ST students enrolled in Class 9 or 10 in recognized government/private schools",
    coverage: "₹3,500/yr for day scholars, ₹7,000/yr for hostellers + 10% disability grant",
    incomeCeiling: 250000,
    incomeCeilingLabel: "₹2,50,000 per annum",
    academicCriteria: "Studying in Class IX or X",
    matchScore: 10,
    status: "Not Eligible (Level Completed)",
    compatibilityCategory: "Secondary School Grant",
    deadline: "15 Oct 2026",
    eligibleCriteriaList: [
      { text: "ST Caste Certificate verified", met: true },
      { text: "Student is currently in B.Tech (Higher Education); scheme is only for Classes 9 & 10", met: false }
    ],
    incompatibleWith: ["top-class", "post-matric", "fellowship"],
    description: "Aims to support parents of ST children for education of their wards studying in classes IX and X so that the incidence of drop-out is minimized."
  }
];

export const STUDENT_PROFILE = {
  id: "ST-2026-OD-89211",
  name: "Ananya Munda",
  fatherName: "Somra Munda",
  motherName: "Sumitra Munda",
  dob: "14-04-2004",
  gender: "Female",
  avatar: "AM",
  mobile: "+91 94371 82910",
  email: "ananya.munda@student.nitrkl.ac.in",
  address: "Village: Jarda, PO: Lathikata, Block: Panposh, District: Sundargarh, Odisha - 770037",
  state: "Odisha",
  district: "Sundargarh",
  
  // Verification Badges & Passport Stats
  passportCompletion: 92,
  passportStatus: "Active & Verified",
  passportId: "PASSPORT-ST-2026-9042",
  lastVerifiedDate: "18 Aug 2026",
  
  // Tribal Info
  tribal: {
    category: "Scheduled Tribe (ST)",
    tribeName: "Munda",
    pvtgStatus: "Non-PVTG (Eligible for standard ST affirmative benefits)",
    certificateNo: "OD/ST/2022/41029",
    issuingAuthority: "Tahasildar, Panposh, District Sundargarh",
    issueDate: "14-Jul-2022",
    verifiedSource: "Odisha e-District (State Revenue Portal)",
    status: "Verified",
    digitalSeal: "SHA256:7b91...8c4f"
  },

  // Personal Aadhaar
  aadhaar: {
    maskedNumber: "XXXX-XXXX-8912",
    linkedMobile: "Yes (OTP Verified)",
    vaultReference: "UIDAI-VLT-9821-2026",
    status: "Verified",
    nameOnAadhaar: "Ananya Munda"
  },

  // Academic Profile
  academic: {
    apaarId: "9281-0492-3810",
    abcId: "ABC-9042-3810",
    institutionName: "National Institute of Technology (NIT) Rourkela",
    institutionType: "Institution of National Importance (Top Class Notified)",
    aisheCode: "U-0355",
    udiseCode: "21051500101",
    course: "Bachelor of Technology (B.Tech)",
    discipline: "Computer Science & Engineering",
    currentYear: "Year 3 (5th Semester)",
    rollNumber: "122CS0891",
    enrollmentYear: "2023",
    attendance: "89.4%",
    cgpa: "8.64",
    status: "Verified by NIT Rourkela Registrar"
  },

  // Family & Income
  family: {
    familyIncome: 185000,
    formattedIncome: "₹1,85,000 / year",
    incomeCertificateNo: "OD/INC/2025/89410",
    issuingAuthority: "Revenue Officer, Sundargarh",
    issueDate: "10-Aug-2025",
    expiryDate: "09-Aug-2026",
    daysUntilExpiry: 45,
    status: "Expires in 45 days",
    needsAttention: true,
    domicileCertificateNo: "OD/DOM/2022/19084",
    domicileStatus: "Verified"
  },

  // Bank & DBT
  bank: {
    bankName: "Canara Bank",
    branch: "NIT Campus Branch, Rourkela",
    accountMasked: "******4821",
    ifsc: "CNRB0002841",
    npciSeeded: true,
    dbtStatus: "Active & Mapped to Aadhaar",
    pfmsStatus: "Validated by Public Financial Management System",
    accountHolder: "Ananya Munda",
    status: "Verified"
  },

  // Special Categories
  specialCategories: {
    disability: "None (General Health)",
    disabilityPercentage: "0%",
    udidCard: "Not Applicable",
    firstGenerationLearner: true,
    singleGirlChild: false
  }
};

export const ACTIVE_APPLICATION = {
  applicationId: "APP-2026-TCE-98102",
  schemeId: "top-class",
  schemeName: "National Scholarship for Higher Education (Top Class Education) for ST Students",
  academicYear: "2026-27 (Renewal - Year 3)",
  appliedDate: "12 Jul 2026",
  sanctionAmount: 112000,
  disbursedAmount: 112000,
  currentStatus: "Amount Credited via DBT",
  statusBadge: "Credited",
  statusColor: "green",
  humanDescription: "Your scholarship amount of ₹1,12,000 has been successfully credited directly to your Canara Bank account (ending in 4821) through the Aadhaar Payment Bridge System (DBT).",
  timeline: [
    {
      title: "Application Submitted",
      date: "12 Jul 2026, 11:20 AM",
      status: "completed",
      description: "Submitted with 1-click Scholarship Passport. Zero physical documents required."
    },
    {
      title: "Automated Data & Document Verification",
      date: "12 Jul 2026, 11:25 AM",
      status: "completed",
      description: "Auto-verified via UIDAI, DigiLocker, and Odisha e-District API."
    },
    {
      title: "Institution Verification",
      date: "18 Jul 2026, 04:15 PM",
      status: "completed",
      description: "Verified by Nodal Officer, NIT Rourkela (Fee schedule & attendance confirmed)."
    },
    {
      title: "State Tribal Welfare Verification",
      date: "26 Jul 2026, 02:40 PM",
      status: "completed",
      description: "Endorsed by State Scholarship Sanctioning Authority, Govt. of Odisha."
    },
    {
      title: "MoTA National Approval & Sanction",
      date: "12 Aug 2026, 05:10 PM",
      status: "completed",
      description: "Sanction Order #MoTA/TCE/2026/OD-8492 generated by Ministry of Tribal Affairs."
    },
    {
      title: "DBT Payment Order Generated (PFMS)",
      date: "15 Aug 2026, 10:00 AM",
      status: "completed",
      description: "Payment file #PFMS-2026-904128 transmitted to National Payments Corporation of India (NPCI)."
    },
    {
      title: "Bank Processing (APBS)",
      date: "18 Sep 2026, 09:30 AM",
      status: "completed",
      description: "Aadhaar Payment Bridge System processed successfully at Canara Bank."
    },
    {
      title: "Amount Credited to Student Account",
      date: "18 Sep 2026, 11:42 AM",
      status: "completed",
      description: "₹1,12,000 credited to A/C ending in 4821. UTR: CANR26081498102."
    }
  ]
};

export const ACTION_REQUIRED_ITEMS = [
  {
    id: "act-1",
    title: "Income Certificate Renewal Needed",
    severity: "warning",
    category: "Certificate Expiry",
    problem: "Your family income certificate (#OD/INC/2025/89410) expires in 45 days (on 09-Aug-2026).",
    why: "Scholarship guidelines require an active certificate valid throughout the academic sanction cycle.",
    actionText: "Fetch Renewed Certificate via DigiLocker",
    deadline: "09 Aug 2026",
    actionType: "digilocker_fetch",
    resolved: false
  },
  {
    id: "act-2",
    title: "Name Formatting Exception Resolved",
    severity: "info",
    category: "Smart Exception",
    problem: "Minor initial mismatch between APAAR ID ('K. Ananya Munda') and Aadhaar ('Ananya Munda').",
    why: "Initials variation common in school records. Resolved via Smart Exception Rule #EX-04.",
    actionText: "View Exception Audit Resolution",
    actionType: "view_exception",
    resolved: true,
    resolvedBy: "Smart Exception Engine (Fuzzy Match Score: 96% + Biometric Hash Concordance)"
  }
];

export const MY_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Aadhaar Identity Card",
    type: "Identity Proof",
    source: "UIDAI Vault API",
    verified: true,
    issuedDate: "12-May-2016",
    expiryDate: "Lifelong",
    docRef: "UIDAI-XXXX-8912",
    fileSize: "245 KB (Encrypted)",
    badgeColor: "green"
  },
  {
    id: "doc-2",
    title: "ST Community Certificate (Munda Tribe)",
    type: "Caste Certificate",
    source: "Odisha e-District Portal",
    verified: true,
    issuedDate: "14-Jul-2022",
    expiryDate: "Permanent Validity",
    docRef: "OD/ST/2022/41029",
    fileSize: "380 KB",
    badgeColor: "green"
  },
  {
    id: "doc-3",
    title: "Annual Family Income Certificate",
    type: "Income Proof",
    source: "Odisha e-District Portal",
    verified: true,
    issuedDate: "10-Aug-2025",
    expiryDate: "09-Aug-2026 (45 days left)",
    docRef: "OD/INC/2025/89410",
    fileSize: "310 KB",
    badgeColor: "amber",
    warning: "Requires renewal before upcoming cycle"
  },
  {
    id: "doc-4",
    title: "State Domicile Certificate",
    type: "Residential Proof",
    source: "Odisha e-District Portal",
    verified: true,
    issuedDate: "20-Aug-2022",
    expiryDate: "Permanent",
    docRef: "OD/DOM/2022/19084",
    fileSize: "290 KB",
    badgeColor: "green"
  },
  {
    id: "doc-5",
    title: "APAAR / ABC Academic Credit Card",
    type: "Academic ID",
    source: "Academic Bank of Credits (DigiLocker)",
    verified: true,
    issuedDate: "05-Sep-2023",
    expiryDate: "Lifelong",
    docRef: "APAAR-9281-0492-3810",
    fileSize: "180 KB",
    badgeColor: "green"
  },
  {
    id: "doc-6",
    title: "Class X & XII Board Marksheets",
    type: "Educational Record",
    source: "BSE Odisha / CBSE (DigiLocker)",
    verified: true,
    issuedDate: "22-May-2022",
    expiryDate: "Permanent",
    docRef: "CBSE-ROLL-2022-89104",
    fileSize: "512 KB",
    badgeColor: "green"
  },
  {
    id: "doc-7",
    title: "NIT Rourkela Bonafide & Fee Demand Note",
    type: "Institutional Certificate",
    source: "NIT Rourkela AISHE ERP",
    verified: true,
    issuedDate: "10-Jul-2026",
    expiryDate: "30-Jun-2027",
    docRef: "NITR/ACAD/2026/0891",
    fileSize: "420 KB",
    badgeColor: "green"
  }
];

export const MY_MONEY_DATA = {
  totalReceivedAllYears: 328000,
  currentYearSanction: 112000,
  disbursedAmount: 112000,
  pendingAmount: 0,
  bankDetails: {
    bank: "Canara Bank",
    account: "******4821",
    ifsc: "CNRB0002841",
    dbtStatus: "Direct Benefit Transfer (DBT) Active",
    npciMapper: "Mapped (NPCI APBS Verified)"
  },
  breakdown: [
    { head: "Tuition Fee Reimbursement (Direct Institute/Student)", amount: 75000 },
    { head: "Annual Living & Hostel Maintenance Allowance", amount: 30000 },
    { head: "Annual Books & Stationery Grant", amount: 7000 }
  ],
  transactions: [
    {
      id: "TXN-2026-0814",
      scheme: "Top Class Education (Year 3)",
      amount: 112000,
      status: "Credited",
      date: "18 Sep 2026",
      utr: "CANR26081498102",
      orderNo: "MoTA/TCE/2026/OD-8492"
    },
    {
      id: "TXN-2025-0912",
      scheme: "Top Class Education (Year 2)",
      amount: 108000,
      status: "Credited",
      date: "14 Sep 2025",
      utr: "CANR25091244810",
      orderNo: "MoTA/TCE/2025/OD-7104"
    },
    {
      id: "TXN-2024-0820",
      scheme: "Top Class Education (Year 1 + Computer Allowance)",
      amount: 108000,
      status: "Credited",
      date: "22 Aug 2024",
      utr: "CANR24082019842",
      orderNo: "MoTA/TCE/2024/OD-5982"
    }
  ]
};

export const FAMILY_DATA = {
  guardianName: "Somra Munda",
  guardianRelation: "Father",
  familyAadhaarSeeded: true,
  children: [
    {
      id: "child-1",
      name: "Rahul Munda",
      relation: "Son (Age 15)",
      classCourse: "Class X (10th Standard)",
      schoolCollege: "Govt High School, Lathikata, Sundargarh",
      schemeName: "Pre-Matric Scholarship for ST Students",
      amount: 3500,
      status: "Payment Received",
      statusColor: "green",
      dbtDate: "08 Sep 2026",
      actionNeeded: false
    },
    {
      id: "child-2",
      name: "Ananya Munda",
      relation: "Daughter (Age 20)",
      classCourse: "B.Tech Computer Science (Year 3)",
      schoolCollege: "NIT Rourkela",
      schemeName: "Top Class Education for ST Students",
      amount: 112000,
      status: "Payment Received",
      statusColor: "green",
      dbtDate: "18 Sep 2026",
      actionNeeded: true,
      actionText: "Income Certificate renewal in 45 days"
    },
    {
      id: "child-3",
      name: "Sunil Munda",
      relation: "Son (Age 24)",
      classCourse: "Ph.D. Biotechnology (Year 1)",
      schoolCollege: "Utkal University, Bhubaneswar",
      schemeName: "National Fellowship for ST Students",
      amount: 372000,
      status: "State Verification in Progress",
      statusColor: "amber",
      dbtDate: "Expected Oct 2026",
      actionNeeded: false
    }
  ]
};

// MoTA National Admin Dashboard Metrics & Reach Engine
export const MOTA_ADMIN_METRICS = {
  totalApplications: 1482310,
  verifiedApplications: 1240150,
  pendingVerification: 145820,
  sanctionedApplications: 984200,
  paymentPending: 96340,
  paymentCompleted: 887860,
  totalDisbursedCrores: 1428.5,
  exceptionsRequiringReview: 14210,
  potentiallyUnreachedSTStudents: 284100,

  schemeWiseStats: [
    { scheme: "Pre-Matric ST", applications: 684200, sanctioned: 540100, disbursedCr: 216.04, coveragePct: 78.9 },
    { scheme: "Post-Matric ST", applications: 612400, sanctioned: 412800, disbursedCr: 845.20, coveragePct: 71.4 },
    { scheme: "Top Class Higher Ed", applications: 14280, sanctioned: 12450, disbursedCr: 139.44, coveragePct: 94.2 },
    { scheme: "National Fellowship (ST)", applications: 8430, sanctioned: 1850, disbursedCr: 69.37, coveragePct: 88.0 },
    { scheme: "National Overseas (NOS)", applications: 1200, sanctioned: 200, disbursedCr: 158.45, coveragePct: 100.0 }
  ],

  // Reach Engine: Comparing Enrolled ST Cohort (from UDISE+ and AISHE) vs active scholarship recipients
  unreachedPockets: [
    { district: "Mayurbhanj", state: "Odisha", enrolledST: 68400, receivingScholarship: 42100, unreachedGap: 26300, gapPct: "38.4%", riskLevel: "High Priority", campScheduled: "04 Oct 2026" },
    { district: "Bastar", state: "Chhattisgarh", enrolledST: 52100, receivingScholarship: 31800, unreachedGap: 20300, gapPct: "38.9%", riskLevel: "High Priority", campScheduled: "06 Oct 2026" },
    { district: "Khunti", state: "Jharkhand", enrolledST: 39400, receivingScholarship: 26900, unreachedGap: 12500, gapPct: "31.7%", riskLevel: "Medium Priority", campScheduled: "09 Oct 2026" },
    { district: "Koraput", state: "Odisha", enrolledST: 47800, receivingScholarship: 29400, unreachedGap: 18400, gapPct: "38.5%", riskLevel: "High Priority", campScheduled: "11 Oct 2026" },
    { district: "Dindori", state: "Madhya Pradesh", enrolledST: 34100, receivingScholarship: 22800, unreachedGap: 11300, gapPct: "33.1%", riskLevel: "Medium Priority", campScheduled: "14 Oct 2026" },
    { district: "Dahod", state: "Gujarat", enrolledST: 41200, receivingScholarship: 29100, unreachedGap: 12100, gapPct: "29.4%", riskLevel: "Standard", campScheduled: "18 Oct 2026" }
  ],

  stateStatus: [
    { state: "Odisha", totalApps: 218400, verified: 189200, sanctioned: 158400, amountCr: 214.2, reachRate: "81%" },
    { state: "Madhya Pradesh", totalApps: 342100, verified: 288400, sanctioned: 231900, amountCr: 326.8, reachRate: "76%" },
    { state: "Jharkhand", totalApps: 198600, verified: 164200, sanctioned: 132100, amountCr: 192.4, reachRate: "73%" },
    { state: "Chhattisgarh", totalApps: 164300, verified: 139100, sanctioned: 114800, amountCr: 165.9, reachRate: "74%" },
    { state: "Gujarat", totalApps: 142100, verified: 121800, sanctioned: 98400, amountCr: 142.1, reachRate: "79%" },
    { state: "North Eastern States", totalApps: 182400, verified: 162100, sanctioned: 138600, amountCr: 210.6, reachRate: "86%" }
  ]
};

// Institution Verification Queue (e.g. NIT Rourkela)
export const INSTITUTION_QUEUE = [
  {
    id: "INST-NITR-001",
    studentName: "Arjun Gond",
    apaarId: "9281-0492-4912",
    course: "B.Tech Metallurgical Engg (Year 2)",
    scheme: "Top Class Education for ST",
    feeDemanded: "₹75,000",
    attendance: "91.2%",
    cgpa: "7.92",
    stCertStatus: "Verified (MP e-District)",
    submissionDate: "24 Sep 2026",
    status: "Pending Institutional Sign-Off"
  },
  {
    id: "INST-NITR-002",
    studentName: "Kavita Soren",
    apaarId: "9281-0492-7714",
    course: "B.Tech Electrical Engg (Year 4)",
    scheme: "Top Class Education for ST",
    feeDemanded: "₹75,000",
    attendance: "88.6%",
    cgpa: "8.14",
    stCertStatus: "Verified (Jharkhand e-District)",
    submissionDate: "25 Sep 2026",
    status: "Pending Institutional Sign-Off"
  },
  {
    id: "INST-NITR-003",
    studentName: "Deepak Bhil",
    apaarId: "9281-0492-1108",
    course: "M.Tech Structural Engg (Year 1)",
    scheme: "Top Class Education for ST",
    feeDemanded: "₹68,000",
    attendance: "94.0%",
    cgpa: "8.40",
    stCertStatus: "Verified (Rajasthan e-District)",
    submissionDate: "26 Sep 2026",
    status: "Pending Institutional Sign-Off"
  }
];

// State Officer Verification Queue (e.g. Odisha Tribal Welfare)
export const STATE_OFFICER_QUEUE = [
  {
    id: "ST-OD-2026-904",
    studentName: "Laxman Ho",
    district: "Mayurbhanj",
    institution: "MPC Autonomous College, Baripada",
    course: "B.Sc Forestry (Year 2)",
    scheme: "Post-Matric Scholarship for ST",
    stCertNo: "OD/ST/2023/18291",
    annualIncome: "₹1,40,000",
    pvtg: "No",
    status: "Pending State Welfare Verification"
  },
  {
    id: "ST-OD-2026-905",
    studentName: "Shanti Birhor",
    district: "Sundargarh",
    institution: "Govt Women's College, Rourkela",
    course: "B.A Economics (Year 1)",
    scheme: "Post-Matric Scholarship for ST",
    stCertNo: "OD/ST/2024/99120",
    annualIncome: "₹90,000",
    pvtg: "Yes (Particularly Vulnerable Tribal Group - Birhor)",
    status: "Priority PVTG Fast-Track Verification"
  },
  {
    id: "ST-OD-2026-906",
    studentName: "Hemant Oram",
    district: "Sambalpur",
    institution: "VSSUT Burla",
    course: "B.Tech Civil Engg (Year 3)",
    scheme: "Top Class Education for ST",
    stCertNo: "OD/ST/2022/88124",
    annualIncome: "₹2,10,000",
    pvtg: "No",
    status: "Pending State Welfare Verification"
  }
];

// Chatbot JAGO Knowledge Base & FAQ
export const JAGO_FAQS = [
  {
    question: "Which scholarship can I apply for?",
    reply: "Based on your verified Scholarship Passport (B.Tech at NIT Rourkela, ST Munda, Income ₹1.85L), you are currently awarded the **Top Class Education Scholarship** (₹1,12,000/yr). You are also eligible for the **Post-Matric Scholarship**, but cannot hold both concurrently due to scheme compatibility rules. After completing B.Tech, you will qualify for the **National Fellowship (Ph.D.)** or the **National Overseas Scholarship (NOS)**."
  },
  {
    question: "Why is my application pending?",
    reply: "Good news! Your current application **APP-2026-TCE-98102** is no longer pending. It was successfully sanctioned by MoTA on 12 August 2026, and the complete amount of ₹1,12,000 was credited to your Canara Bank account on 18 September 2026."
  },
  {
    question: "What document is missing or requires update?",
    reply: "Your **Family Income Certificate** (#OD/INC/2025/89410) expires in **45 days** (on 09-Aug-2026). All other documents (ST certificate, Aadhaar, APAAR ID, Bank DBT mapper) are 100% verified. You can tap 'Fetch Renewed Certificate' in your Documents wallet to auto-sync from Odisha e-District."
  },
  {
    question: "Has my scholarship amount been released?",
    reply: "Yes! ₹1,12,000 was released via Direct Benefit Transfer (DBT) on **18 September 2026**. Payment Reference UTR: **CANR26081498102**. Please check your SMS or Canara Bank account ending in 4821."
  },
  {
    question: "Can I renew my scholarship for the next academic year?",
    reply: "Yes! With our **Renewal AutoPilot**, you will not need to fill another lengthy form. Once your Year 3 (6th sem) mark sheet is published in the Academic Bank of Credits (APAAR), you will receive a 1-tap renewal prompt. Just confirm your current enrollment and updated income certificate."
  },
  {
    question: "How do I raise a grievance if payment is delayed?",
    reply: "You can tap 'File Grievance' right here in the app. Choose the category (e.g. Payment Delay or Document Issue), and your ticket will be routed directly to the MoTA DBT Helpdesk with an SLA turnaround of 48 hours."
  }
];

// Multilingual translations for UI labels
export const TRANSLATIONS = {
  en: {
    portalTitle: "Unified Scholarship Platform for Tribal Students",
    tagline: "One Student. One Scholarship Passport. Every Opportunity.",
    ministry: "Ministry of Tribal Affairs, Government of India",
    welcome: "Welcome",
    passportCompletion: "Complete",
    oneProfile: "One Profile • Verified Once • Reusable Everywhere",
    scholarshipsForMe: "Scholarships for Me",
    myApplications: "My Applications",
    myDocuments: "My Documents",
    myMoney: "My Money",
    askJago: "Ask JAGO Voice Assistant",
    actionRequired: "Action Required",
    eligible: "Eligible",
    verified: "Verified",
    pending: "Pending",
    assistedMode: "Assisted Mode (CSC)",
    viewPassport: "View Verified Details",
    completePassport: "Complete Passport",
    home: "Home",
    scholarships: "Scholarships",
    applications: "Applications",
    jago: "JAGO",
    profile: "Passport"
  },
  hi: {
    portalTitle: "जनजातीय छात्रों के लिए एकीकृत छात्रवृत्ति मंच",
    tagline: "एक छात्र। एक छात्रवृत्ति पासपोर्ट। हर अवसर।",
    ministry: "जनजातीय कार्य मंत्रालय, भारत सरकार",
    welcome: "नमस्ते",
    passportCompletion: "पूर्ण",
    oneProfile: "एक प्रोफ़ाइल • एक बार सत्यापित • हर जगह पुनः प्रयोज्य",
    scholarshipsForMe: "मेरे लिए छात्रवृत्तियां",
    myApplications: "मेरे आवेदन",
    myDocuments: "मेरे दस्तावेज़",
    myMoney: "मेरी राशि व भुगतान",
    askJago: "जागो (JAGO) आवाज़ सहायक",
    actionRequired: "आवश्यक कार्रवाई",
    eligible: "पात्र",
    verified: "सत्यापित",
    pending: "लंबित",
    assistedMode: "सहायक मोड (CSC)",
    viewPassport: "सत्यापित विवरण देखें",
    completePassport: "पासपोर्ट पूरा करें",
    home: "होम",
    scholarships: "छात्रवृत्तियां",
    applications: "आवेदन",
    jago: "जागो (AI)",
    profile: "पासपोर्ट"
  },
  or: {
    portalTitle: "ଜନଜାତି ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ଏକୀକୃତ ବୃତ୍ତି ପୋର୍ଟାଲ",
    tagline: "ଗୋଟିଏ ଛାତ୍ର। ଗୋଟିଏ ସ୍କଲାରସିପ୍ ପାସପୋର୍ଟ। ସମସ୍ତ ସୁଯୋଗ।",
    ministry: "ଜନଜାତି କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର",
    welcome: "ସ୍ଵାଗତ",
    passportCompletion: "ସମ୍ପୂର୍ଣ୍ଣ",
    oneProfile: "ଗୋଟିଏ ପ୍ରୋଫାଇଲ୍ • ଥରେ ଯାଞ୍ଚ • ସବୁଠି ବ୍ୟବହାରଯୋଗ୍ୟ",
    scholarshipsForMe: "ମୋ ପାଇଁ ବୃତ୍ତି",
    myApplications: "ମୋ ଆବେଦନ",
    myDocuments: "ମୋ ଦସ୍ତାବିଜ",
    myMoney: "ମୋ ଟଙ୍କା ଓ ଡିବିଟି",
    askJago: "ଜାଗୋ (JAGO) ସ୍ୱର ସହାୟକ",
    actionRequired: "ଜରୁରୀ ପଦକ୍ଷେପ",
    eligible: "ଯୋଗ୍ୟ",
    verified: "ଯାଞ୍ଚିତ",
    pending: "ବକେୟା",
    assistedMode: "ସହାୟକ ମୋଡ (CSC)",
    viewPassport: "ଯାଞ୍ଚ ବିବରଣୀ ଦେଖନ୍ତୁ",
    completePassport: "ପାସପୋର୍ଟ ପୂରଣ କରନ୍ତୁ",
    home: "ମୁଖ୍ୟ",
    scholarships: "ବୃତ୍ତି",
    applications: "ଆବେଦନ",
    jago: "ଜାଗୋ",
    profile: "ପାସପୋର୍ଟ"
  },
  sat: {
    portalTitle: "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱯᱞᱮᱴᱯᱷᱚᱨᱢ",
    tagline: "ᱢᱤᱫ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ • ᱢᱤᱫ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱯᱟᱥᱯᱳᱨᱴ • ᱡᱚᱛᱚ ᱫᱟᱣ",
    ministry: "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱵᱮᱯᱟᱨ ᱢᱚᱱᱛᱨᱟᱲᱚᱭ, ᱵᱷᱟᱨᱚᱛ ᱥᱚᱨᱠᱟᱨ",
    welcome: "ᱡᱚᱦᱟᱨ",
    passportCompletion: "ᱯᱩᱨᱟᱹᱣ",
    oneProfile: "ᱢᱤᱫ ᱯᱨᱚᱯᱷᱟᱭᱤᱞ • ᱢᱤᱫ ᱫᱷᱟᱣ ᱯᱩᱨᱟᱹᱣ • ᱡᱚᱛᱚ ᱴᱷᱟᱶ ᱨᱮ ᱠᱟᱹᱢᱤ",
    scholarshipsForMe: "ᱤᱧ ᱞᱟᱹᱜᱤᱫ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ",
    myApplications: "ᱤᱧᱟᱜ ᱫᱚᱨᱠᱷᱟᱥᱛ",
    myDocuments: "ᱤᱧᱟᱜ ᱠᱟᱜᱚᱡᱽ",
    myMoney: "ᱤᱧᱟᱜ ᱴᱟᱠᱟ (DBT)",
    askJago: "ᱡᱟᱜᱳ ᱨᱚᱲ ᱜᱚᱲᱚ",
    actionRequired: "ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱠᱟᱹᱢᱤ",
    eligible: "ᱡᱚᱜᱽ",
    verified: "ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ",
    pending: "ᱵᱟᱝ ᱯᱩᱨᱟᱹᱣ",
    assistedMode: "ᱜᱚᱲᱚ ᱢᱳᱰ (CSC)",
    viewPassport: "ᱵᱤᱵᱚᱨᱚᱱ ᱧᱮᱞ",
    completePassport: "ᱯᱟᱥᱯᱳᱨᱴ ᱯᱩᱨᱟᱹᱣ",
    home: "ᱳᱲᱟᱜ",
    scholarships: "ᱥᱠᱚᱞᱟᱨᱥᱤᱯ",
    applications: "ᱫᱚᱨᱠᱷᱟᱥᱛ",
    jago: "ᱡᱟᱜᱳ",
    profile: "ᱯᱟᱥᱯᱳᱨᱴ"
  },
  te: {
    portalTitle: "గిరిజన విద్యార్థుల సమగ్ర స్కాలర్‌షిప్ పోర్టల్",
    tagline: "ఒక విద్యార్థి. ఒక స్కాలర్‌షిప్ పాస్‌పోర్ట్. ప్రతి అవకాశం.",
    ministry: "గిరిజన వ్యవహారాల మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    welcome: "స్వాగతం",
    passportCompletion: "పూర్తయింది",
    oneProfile: "ఒక ప్రొఫైల్ • ఒకసారి ధృవీకరణ • అన్నింటికీ వర్తింపు",
    scholarshipsForMe: "నా కోసం స్కాలర్‌షిప్‌లు",
    myApplications: "నా దరఖాస్తులు",
    myDocuments: "నా ధృవీకరణ పత్రాలు",
    myMoney: "నా నగదు & DBT ట్రాకింగ్",
    askJago: "JAGO వాయిస్ అసిస్టెంట్",
    actionRequired: "చర్య అవసరం",
    eligible: "అర్హులు",
    verified: "ధృవీకరించబడింది",
    pending: "పెండింగ్",
    assistedMode: "సహాయ మోడ్ (CSC)",
    viewPassport: "వివరాలు చూడండి",
    completePassport: "పాస్‌పోర్ట్ పూర్తి చేయండి",
    home: "హోమ్",
    scholarships: "స్కాలర్‌షిప్‌లు",
    applications: "దరఖాస్తులు",
    jago: "జాగో (AI)",
    profile: "పాస్‌పోర్ట్"
  }
};
