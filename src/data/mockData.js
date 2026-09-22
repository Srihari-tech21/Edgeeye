// Synthetic clinical demo data for EdgeAyu prototype
// IMPORTANT: All data here is completely synthetic for demonstration purposes.

export const DEMO_SCENARIOS = [
  {
    id: "scenario-bp",
    title: "Elevated BP",
    subtitle: "Stage 2 Hypertensive Risk",
    patientId: "PAT-024",
    age: "54",
    gender: "Female",
    vitals: {
      bpSystolic: "168",
      bpDiastolic: "102",
      pulse: "108",
      spo2: "94",
      temperature: "38.2"
    },
    rawSymptomsText: "Severe frontal headache, dizziness upon standing, fatigue and mild nausea.",
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: false,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    }
  },
  {
    id: "scenario-resp",
    title: "Respiratory Concern",
    subtitle: "Hypoxia & Tachycardia Alert",
    patientId: "PAT-026",
    age: "48",
    gender: "Male",
    vitals: {
      bpSystolic: "124",
      bpDiastolic: "82",
      pulse: "112",
      spo2: "89",
      temperature: "37.4"
    },
    rawSymptomsText: "Severe shortness of breath when walking, persistent cough, chest tightness.",
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: true,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    }
  },
  {
    id: "scenario-[#087F5B]",
    title: "Routine Check",
    subtitle: "Standard Vitals Baseline",
    patientId: "PAT-023",
    age: "32",
    gender: "Male",
    vitals: {
      bpSystolic: "118",
      bpDiastolic: "76",
      pulse: "72",
      spo2: "98",
      temperature: "36.8"
    },
    rawSymptomsText: "Routine primary checkup. Patient reports feeling well with no current complaints.",
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: false,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    }
  }
];

export const INITIAL_DEMO_RECORDS = [
  {
    id: "PAT-024",
    name: "Patient #024",
    age: 54,
    gender: "Female",
    timestamp: "2 mins ago",
    dateFormatted: new Date(Date.now() - 2 * 60 * 1000).toLocaleString(),
    priority: "HIGH PRIORITY",
    vitals: {
      bpSystolic: 168,
      bpDiastolic: 102,
      pulse: 108,
      spo2: 94,
      temperature: 38.2
    },
    symptoms: ["Severe frontal headache", "Dizziness upon standing", "General fatigue", "Slight nausea"],
    rawSymptomsText: "Patient presents with severe frontal headache for 2 days, dizziness upon standing, fatigue, and mild nausea.",
    flaggedReasons: [
      "Blood Pressure 168/102 mmHg → Elevated reading detected (Stage 2 Hypertensive Risk)",
      "Pulse 108 bpm → Increased pulse detected (Tachycardia)",
      "SpO2 94% → Borderline oxygen saturation detected",
      "Symptoms Headache + dizziness → Requires clinical review"
    ],
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: false,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    },
    matchedGuidelines: [
      "WHO HEARTS Technical Package - High Risk Hypertensive Management Protocol",
      "Integrated Management of Adult and Adolescent Illness (IMAI) Triage Criteria"
    ],
    recommendations: [
      "Refer to nearest health facility for medical evaluation",
      "Monitor vitals regularly in quiet resting position",
      "Educate patient on cardiovascular warning signs",
      "Follow up within 24 hours"
    ],
    processingMode: "LOCAL / OFFLINE",
    confidenceScore: 0.96,
    ocrConfidence: {
      bp: 0.96,
      pulse: 0.94,
      spo2: 0.92,
      temp: 0.91
    }
  },
  {
    id: "PAT-023",
    name: "Patient #023",
    age: 32,
    gender: "Male",
    timestamp: "18 mins ago",
    dateFormatted: new Date(Date.now() - 18 * 60 * 1000).toLocaleString(),
    priority: "ROUTINE",
    vitals: {
      bpSystolic: 122,
      bpDiastolic: 78,
      pulse: 74,
      spo2: 98,
      temperature: 36.8
    },
    symptoms: ["Mild sore throat", "Runny nose", "Occasional dry cough"],
    rawSymptomsText: "Complaining of mild throat discomfort and clear nasal discharge for 24 hours. No fever or shortness of breath.",
    flaggedReasons: [
      "Blood Pressure 122/78 mmHg → Normal resting range",
      "SpO2 98% → Normal oxygen saturation",
      "All monitored vitals within standard clinical thresholds"
    ],
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: false,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    },
    matchedGuidelines: [
      "IMAI Primary Care Protocol for Upper Respiratory Infection"
    ],
    recommendations: [
      "Standard supportive care and oral hydration.",
      "Re-evaluate if symptoms persist past 5 days or if fever develops."
    ],
    processingMode: "LOCAL / OFFLINE",
    confidenceScore: 0.99,
    ocrConfidence: {
      bp: 0.99,
      pulse: 0.98,
      spo2: 0.99,
      temp: 0.99
    }
  },
  {
    id: "PAT-022",
    name: "Patient #022",
    age: 41,
    gender: "Female",
    timestamp: "42 mins ago",
    dateFormatted: new Date(Date.now() - 42 * 60 * 1000).toLocaleString(),
    priority: "REVIEW REQUIRED",
    vitals: {
      bpSystolic: 138,
      bpDiastolic: 88,
      pulse: 92,
      spo2: 96,
      temperature: 38.4
    },
    symptoms: ["Fever with chills", "Body aches", "Mild loss of appetite"],
    rawSymptomsText: "Acute onset of high fever and severe myalgia for 12 hours. Reports chills and body aches.",
    flaggedReasons: [
      "Temperature 38.4°C → Moderate fever detected",
      "Blood Pressure 138/88 mmHg → Stage 1 Pre-hypertensive threshold"
    ],
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: false,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    },
    matchedGuidelines: [
      "Acute Febrile Illness Assessment Guidelines - Community Level"
    ],
    recommendations: [
      "Screen for endemic febrile illnesses.",
      "Administer antipyretic care as per local protocol and recheck temperature."
    ],
    processingMode: "LOCAL / OFFLINE",
    confidenceScore: 0.94,
    ocrConfidence: {
      bp: 0.95,
      pulse: 0.94,
      spo2: 0.96,
      temp: 0.93
    }
  }
];

export const DEMO_SCAN_SAMPLES = [
  {
    id: "sample-bp-1",
    title: "Digital BP Monitor Screen",
    subtitle: "Automatic Upper Arm Monitor",
    category: "Vitals Monitor",
    previewVitals: {
      bpSystolic: 118,
      bpDiastolic: 76,
      pulse: 72,
      spo2: 98,
      temperature: 36.8
    },
    confidence: "96%",
    imagePlaceholder: "SYS 118 / DIA 76"
  },
  {
    id: "sample-oximeter-1",
    title: "Fingertip Pulse Oximeter",
    subtitle: "LED Display Reading",
    category: "SpO2 & Pulse",
    previewVitals: {
      bpSystolic: 120,
      bpDiastolic: 80,
      pulse: 88,
      spo2: 93,
      temperature: 37.1
    },
    confidence: "92%",
    imagePlaceholder: "SpO2 93% / Pulse 88"
  },
  {
    id: "sample-paper-note",
    title: "Analog Triage Paper Slip",
    subtitle: "Handwritten Clinical Notes",
    category: "Paper Record",
    previewVitals: {
      bpSystolic: 142,
      bpDiastolic: 90,
      pulse: 98,
      spo2: 95,
      temperature: 38.8
    },
    confidence: "88%", // Low confidence test!
    imagePlaceholder: "Handwritten Slip"
  }
];
