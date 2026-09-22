/**
 * EdgeAyu Local AI & Service Abstraction Module
 * 
 * Future Production Integration Roadmap:
 * React App → FastAPI (localhost:8000) → Local OCR → Local LLM → Guideline Engine
 */

import { DEMO_SCAN_SAMPLES } from '../data/mockData';
import { triageEngine } from './triageEngine';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function captureImage() {
  return { success: true, timestamp: Date.now() };
}

export async function extractVitals(sampleId = "sample-bp-1", onProgress = null) {
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

export async function scanVitalsImage(sampleId = "sample-bp-1", onProgress = null) {
  return extractVitals(sampleId, onProgress);
}

export async function parseSymptoms(simulatedTranscript = "") {
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

export async function parseSpeechInput(simulatedTranscript = "") {
  return parseSymptoms(simulatedTranscript);
}

export async function evaluateTriage(assessmentData, onProgress = null) {
  if (onProgress) onProgress("Processing clinical data locally...", 25);
  await delay(300);

  if (onProgress) onProgress("Checking embedded WHO & IMAI guideline rules...", 65);
  await delay(400);

  if (onProgress) onProgress("Generating triage observations...", 95);
  await delay(300);

  const result = triageEngine.evaluate(assessmentData);
  return {
    success: true,
    ...result
  };
}

export function generateExplanation(result) {
  return result?.observations || [];
}
