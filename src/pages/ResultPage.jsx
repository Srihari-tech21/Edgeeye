import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Save, 
  RotateCcw, 
  ArrowLeft, 
  Activity, 
  ShieldAlert,
  FileCheck,
  Check
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function ResultPage() {
  const navigate = useNavigate();
  const { latestTriageResult, addRecord } = useRecords();

  const result = latestTriageResult || {
    id: "PAT-024",
    name: "Patient #024",
    age: 54,
    gender: "Female",
    priority: "HIGH PRIORITY",
    hasCriticalRedFlag: false,
    vitals: {
      bpSystolic: 168,
      bpDiastolic: 102,
      pulse: 108,
      spo2: 94,
      temperature: 38.2
    },
    rawSymptomsText: "Severe frontal headache, dizziness upon standing, fatigue and mild nausea.",
    symptoms: ["Severe frontal headache", "Dizziness upon standing", "General fatigue", "Slight nausea"],
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
      "WHO HEARTS - High Risk Hypertensive Protocol",
      "IMAI - Acute respiratory infections",
      "General warning signs for referral"
    ],
    recommendations: [
      "Refer to nearest health facility for medical evaluation",
      "Monitor vitals regularly in quiet resting position",
      "Educate patient on cardiovascular warning signs",
      "Follow up within 24 hours"
    ],
    processingMode: "LOCAL / OFFLINE"
  };

  const handleSaveRecord = () => {
    addRecord({
      ...result,
      timestamp: "Just now",
      dateFormatted: new Date().toLocaleString()
    });
    navigate('/app/records');
  };

  const isUrgent = result.hasCriticalRedFlag || result.priority === "URGENT CLINICAL ATTENTION";

  return (
    <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 lg:p-8 max-w-4xl mx-auto w-full pb-24 space-y-6">
          
          {/* COMPACT SAFETY BANNER */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#FFF9DB] border border-[#F59F00]/30 text-[#856404] text-xs font-medium">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#F59F00] shrink-0" />
              <span>AI-assisted decision support • Verify readings • Not a diagnosis</span>
            </div>
          </div>

          {/* Top Status Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/app/assessment')}
              className="text-xs text-[#66736D] hover:text-[#17211D] font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assessment</span>
            </button>
          </div>

          {/* URGENT RED FLAG OVERRIDE OR HIGH PRIORITY HEADER */}
          <div className={`p-6 rounded-2xl border shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
            isUrgent ? 'bg-[#FFF5F5] border-[#E03131]' : 'bg-[#FFF5F5] border-[#FFC9C9]'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E03131] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                !
              </div>

              <div>
                <h1 className="text-xl font-extrabold text-[#E03131]">
                  {isUrgent ? 'URGENT CLINICAL ATTENTION' : 'High Priority'}
                </h1>
                <h2 className="text-xs font-bold text-[#C92A2A] mt-0.5">
                  {isUrgent ? 'Critical warning signs reported' : 'Needs medical attention soon'}
                </h2>
                <p className="text-xs text-[#66736D] mt-2 leading-relaxed">
                  {result.urgentMessage || "Based on the captured information, this case should receive prompt clinical review."}
                </p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-white border border-[#FFC9C9] text-[#E03131] text-[11px] font-mono font-bold self-start shrink-0 flex items-center gap-1.5">
              <span>AI-assisted triage</span>
            </div>
          </div>

          {/* WHY THIS WAS FLAGGED & RECOMMENDED ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Why This Was Flagged Card */}
            <div className="saas-card p-6">
              <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#E03131]" />
                Why this was flagged
              </h3>
              <ul className="space-y-2.5 text-xs text-[#66736D]">
                {result.flaggedReasons?.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E03131] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Actions Card */}
            <div className="saas-card p-6">
              <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
                Recommended Actions
              </h3>
              <ul className="space-y-2 text-xs text-[#66736D]">
                {result.recommendations?.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#087F5B] font-bold">+</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RED FLAGS BOX */}
          <div className="p-5 rounded-2xl bg-[#FFF5F5] border border-[#FFC9C9]">
            <h3 className="text-xs font-bold text-[#E03131] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#E03131]" />
              <span>Red Flags — Seek emergency care if:</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#C92A2A]">
              {[
                { label: 'Chest pain', active: result.redFlags?.chestPain },
                { label: 'Severe breathing difficulty', active: result.redFlags?.severeBreathingDifficulty },
                { label: 'Loss of consciousness', active: result.redFlags?.lossOfConsciousness },
                { label: 'Acute confusion', active: result.redFlags?.acuteConfusion },
                { label: 'Severe bleeding', active: result.redFlags?.severeBleeding },
                { label: 'Severe weakness', active: result.redFlags?.severeWeakness }
              ].map((rf, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${rf.active ? 'bg-[#E03131] animate-ping' : 'bg-[#087F5B]'}`}></span>
                  <span>{rf.label}: <strong className={rf.active ? 'text-[#E03131]' : 'text-[#087F5B]'}>{rf.active ? 'YES' : 'ABSENT'}</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* SAFETY DISCLAIMER */}
          <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E2] text-center text-xs text-[#66736D]">
            EdgeAyu provides AI-assisted decision support and does not replace a qualified healthcare professional or emergency medical services.
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <button
              onClick={handleSaveRecord}
              className="py-3.5 px-4 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49] transition shadow-md shadow-[#087F5B]/20 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Patient Record</span>
            </button>

            <button
              onClick={() => navigate('/app/assessment')}
              className="py-3.5 px-4 rounded-xl bg-white border border-[#DCE7E2] text-[#17211D] font-bold text-xs hover:bg-[#F7FAF9] transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-[#087F5B]" />
              <span>New Assessment</span>
            </button>

            <button
              onClick={() => navigate('/app')}
              className="py-3.5 px-4 rounded-xl bg-white border border-[#DCE7E2] text-[#66736D] font-bold text-xs hover:bg-[#F7FAF9] transition flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-[#087F5B]" />
              <span>Back to Dashboard</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
