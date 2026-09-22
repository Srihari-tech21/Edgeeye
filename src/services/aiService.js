/**
 * EdgeAyu Local AI & Guideline Processing Service Abstraction
 */

import { DEMO_SCAN_SAMPLES } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates local OCR camera processing of medical readings/notes
 */
export async function scanVitalsImage(sampleId = "sample-bp-1", onProgress = null) {
  if (onProgress) onProgress("Initializing on-device vision OCR engine...", 20);
  await delay(350);

  if (onProgress) onProgress("Detecting text regions on display...", 50);
  await delay(450);

  if (onProgress) onProgress("Extracting numerical vitals and units...", 80);
  await delay(400);

  if (onProgress) onProgress("Verifying readings locally (Cloud upload: 0 bytes)...", 100);
  await delay(200);

  const matchedSample = DEMO_SCAN_SAMPLES.find((s) => s.id === sampleId) || DEMO_SCAN_SAMPLES[0];

  return {
    success: true,
    sampleId: matchedSample.id,
    extractedVitals: matchedSample.previewVitals,
    confidence: matchedSample.confidence || "96%",
    confidenceScore: parseFloat(matchedSample.confidence) / 100 || 0.96,
    ocrConfidenceDetails: {
      bp: 0.96,
      pulse: 0.94,
      spo2: 0.92,
      temp: 0.91
    },
    rawOcrText: `SYS: ${matchedSample.previewVitals.bpSystolic} DIA: ${matchedSample.previewVitals.bpDiastolic} PUL: ${matchedSample.previewVitals.pulse} SpO2: ${matchedSample.previewVitals.spo2}% TEMP: ${matchedSample.previewVitals.temperature}C`,
    processingTimeMs: 1400,
    engine: "EdgeAyu Local Vision OCR v1.2"
  };
}

/**
 * Simulates local speech-to-text and symptom extraction
 */
export async function parseSpeechInput(simulatedTranscript = "") {
  await delay(700);
  const text = simulatedTranscript || "Patient presents with severe headache, dizziness when standing up, fatigue and mild nausea for 2 days.";
  
  const lower = text.toLowerCase();
  const symptoms = [];
  if (lower.includes("headache")) symptoms.push("Severe frontal headache");
  if (lower.includes("dizzy") || lower.includes("dizziness")) symptoms.push("Dizziness upon standing");
  if (lower.includes("fatigue") || lower.includes("tired")) symptoms.push("General fatigue");
  if (lower.includes("nausea")) symptoms.push("Slight nausea");
  if (lower.includes("fever") || lower.includes("chills")) symptoms.push("Fever with chills");
  if (lower.includes("breath") || lower.includes("breathing")) symptoms.push("Difficulty breathing");

  if (symptoms.length === 0) symptoms.push("Reported general malaise");

  return {
    success: true,
    transcript: text,
    extractedSymptoms: symptoms,
    language: "English (en-US)",
    engine: "EdgeAyu Local Speech Engine (Whisper-Tiny)"
  };
}

/**
 * Core Local Triage Engine
 * Evaluates vitals + symptoms against embedded clinical guidelines offline
 */
export async function evaluateTriage(assessmentData, onProgress = null) {
  const { vitals = {}, symptoms = [], rawSymptomsText = "", redFlags = {} } = assessmentData;
  const sys = Number(vitals.bpSystolic) || 120;
  const dia = Number(vitals.bpDiastolic) || 80;
  const pulse = Number(vitals.pulse) || 75;
  const spo2 = Number(vitals.spo2) || 98;
  const temp = Number(vitals.temperature) || 37.0;

  if (onProgress) onProgress("Processing clinical data locally...", 25);
  await delay(300);

  if (onProgress) onProgress("Checking embedded WHO & IMAI guideline rules...", 65);
  await delay(400);

  if (onProgress) onProgress("Generating triage observations...", 95);
  await delay(300);

  const flaggedReasons = [];
  const matchedGuidelines = [];
  const recommendations = [];

  let priority = "ROUTINE";

  // Check critical Red Flags
  const activeRedFlags = Object.entries(redFlags).filter(([_, val]) => Boolean(val)).map(([key]) => {
    switch(key) {
      case 'chestPain': return 'Chest pain';
      case 'severeBreathingDifficulty': return 'Severe breathing difficulty';
      case 'lossOfConsciousness': return 'Loss of consciousness';
      case 'acuteConfusion': return 'Acute confusion';
      case 'severeBleeding': return 'Severe bleeding';
      case 'severeWeakness': return 'Severe weakness';
      default: return key;
    }
  });

  const hasCriticalRedFlag = activeRedFlags.length > 0;

  if (hasCriticalRedFlag) {
    priority = "URGENT CLINICAL ATTENTION";
    flaggedReasons.push(`Emergency Red Flags Reported: ${activeRedFlags.join(', ')} → Requires immediate emergency referral`);
    matchedGuidelines.push("WHO Emergency Care Triage Protocol for Low-Resource Settings");
    recommendations.push("Follow local emergency protocols and seek immediate professional medical assistance.");
    recommendations.push("Arrange urgent emergency transport to nearest acute facility.");
  }

  // Blood Pressure Rule Check
  if (sys >= 160 || dia >= 100) {
    if (!hasCriticalRedFlag) priority = "HIGH PRIORITY";
    flaggedReasons.push(`Blood Pressure ${sys}/${dia} mmHg → Elevated reading detected (Stage 2 Hypertensive Risk)`);
    matchedGuidelines.push("WHO HEARTS - High Risk Hypertensive Protocol");
    recommendations.push("Refer to nearest health facility for medical evaluation");
    recommendations.push("Monitor vitals regularly in quiet resting position");
  } else if (sys >= 140 || dia >= 90) {
    if (priority === "ROUTINE") priority = "REVIEW REQUIRED";
    flaggedReasons.push(`Blood Pressure ${sys}/${dia} mmHg → Stage 1 Pre-hypertensive threshold`);
    matchedGuidelines.push("WHO HEARTS Hypertension Protocol");
    recommendations.push("Follow up within 24 hours");
  } else {
    flaggedReasons.push(`Blood Pressure ${sys}/${dia} mmHg → Normal resting range`);
  }

  // Oxygen Saturation Rule Check
  if (spo2 < 92) {
    if (!hasCriticalRedFlag) priority = "HIGH PRIORITY";
    flaggedReasons.push(`SpO2 ${spo2}% → Low oxygen saturation detected (Critical < 92%)`);
    matchedGuidelines.push("WHO Oxygen Therapy Protocol");
    recommendations.push("Administer emergency oxygen if available and arrange transfer");
  } else if (spo2 <= 94) {
    if (priority === "ROUTINE") priority = "HIGH PRIORITY";
    flaggedReasons.push(`SpO2 ${spo2}% → Borderline oxygen saturation detected`);
    recommendations.push("Monitor SpO2 regularly");
  } else {
    flaggedReasons.push(`SpO2 ${spo2}% → Normal oxygen saturation`);
  }

  // Pulse Rule Check
  if (pulse > 100) {
    flaggedReasons.push(`Pulse ${pulse} bpm → Increased pulse detected (Tachycardia)`);
  }

  // Temperature Rule Check
  if (temp >= 38.0) {
    if (priority === "ROUTINE") priority = "REVIEW REQUIRED";
    flaggedReasons.push(`Temperature ${temp}°C → Fever reading detected`);
    matchedGuidelines.push("IMAI Fever Protocol");
  }

  // Symptoms check
  if (rawSymptomsText || symptoms.length > 0) {
    const symptomSummary = symptoms.length > 0 ? symptoms.slice(0, 2).join(" + ") : "Reported complaints";
    flaggedReasons.push(`Symptoms ${symptomSummary} → Requires clinical review`);
  }

  if (recommendations.length === 0) {
    recommendations.push("Educate on warning signs");
    recommendations.push("Standard routine health maintenance");
  }

  return {
    success: true,
    priority,
    hasCriticalRedFlag,
    urgentMessage: hasCriticalRedFlag ? "Emergency warning signs were reported. Follow local emergency protocols and seek immediate professional medical assistance." : null,
    vitals: { bpSystolic: sys, bpDiastolic: dia, pulse, spo2, temperature: temp },
    symptoms,
    rawSymptomsText,
    flaggedReasons,
    redFlags,
    matchedGuidelines: matchedGuidelines.length > 0 ? matchedGuidelines : ["Standard IMAI Triage Protocol"],
    recommendations,
    processingMode: "LOCAL / OFFLINE",
    confidenceScore: 0.96,
    timestamp: "Just now",
    dateFormatted: new Date().toLocaleString()
  };
}
