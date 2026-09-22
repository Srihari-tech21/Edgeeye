import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  FileText, 
  Clock, 
  User, 
  Activity, 
  ListChecks,
  Code
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function RecordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecordById } = useRecords();

  const [activeTab, setActiveTab] = useState('summary');
  const record = getRecordById(id);

  if (!record) {
    return (
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Record Not Found</h2>
          <Link to="/app/records" className="text-[#087F5B] underline text-xs font-semibold">Return to Patient Records</Link>
        </div>
      </div>
    );
  }

  // Real JSON File Export using Blob & URL.createObjectURL
  const handleExportJson = () => {
    const jsonString = JSON.stringify(record, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `edgeayu-${record.id || 'PAT-025'}.json`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'HIGH PRIORITY':
      case 'URGENT CLINICAL ATTENTION':
        return 'bg-[#FFF5F5] text-[#E03131] border-[#FFC9C9]';
      case 'REVIEW REQUIRED':
        return 'bg-[#FFF9DB] text-[#D97706] border-[#FFE066]';
      default:
        return 'bg-[#E8F5F0] text-[#087F5B] border-[#087F5B]/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 lg:p-8 max-w-5xl mx-auto w-full pb-24 space-y-6">
          
          <DisclaimerBanner />

          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/app/records')}
              className="text-xs text-[#66736D] hover:text-[#17211D] font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient Records</span>
            </button>

            <button
              onClick={handleExportJson}
              className="px-4 py-2 rounded-xl bg-white border border-[#DCE7E2] text-[#17211D] font-bold text-xs hover:bg-[#F7FAF9] transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Export JSON</span>
            </button>
          </div>

          {/* RECORD TITLE & HEADER */}
          <div className="saas-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE7E2]">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-[#17211D]">{record.id}</h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${getPriorityStyle(record.priority)}`}>
                    {record.priority}
                  </span>
                </div>
                <p className="text-xs text-[#66736D] mt-1 font-mono">
                  {record.age} yrs • {record.gender} • {record.dateFormatted || record.timestamp}
                </p>
              </div>
            </div>

            {/* TAB NAV */}
            <div className="flex items-center gap-4 pt-4 border-b border-[#DCE7E2] text-xs font-semibold">
              <button
                onClick={() => setActiveTab('summary')}
                className={`pb-2 transition ${activeTab === 'summary' ? 'text-[#087F5B] border-b-2 border-[#087F5B] font-bold' : 'text-[#66736D]'}`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('extracted')}
                className={`pb-2 transition ${activeTab === 'extracted' ? 'text-[#087F5B] border-b-2 border-[#087F5B] font-bold' : 'text-[#66736D]'}`}
              >
                Extracted Data
              </button>
              <button
                onClick={() => setActiveTab('guidelines')}
                className={`pb-2 transition ${activeTab === 'guidelines' ? 'text-[#087F5B] border-b-2 border-[#087F5B] font-bold' : 'text-[#66736D]'}`}
              >
                Guidelines
              </button>
            </div>

            {/* SUMMARY CONTENT */}
            {activeTab === 'summary' && (
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column Details */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Patient Info */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-2">
                      Patient Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs text-[#66736D]">
                      <div>
                        <span>Age: </span>
                        <strong className="text-[#17211D]">{record.age} years</strong>
                      </div>
                      <div>
                        <span>Sex: </span>
                        <strong className="text-[#17211D]">{record.gender}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-2">
                      Symptoms
                    </h3>
                    <p className="text-xs text-[#17211D] leading-relaxed p-3 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                      {record.rawSymptomsText || record.symptoms?.join(', ')}
                    </p>
                  </div>

                  {/* Vitals */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-2">
                      Vitals
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                        <span className="text-[10px] text-[#66736D] block">Blood Pressure</span>
                        <strong className="font-mono text-sm text-[#17211D]">
                          {record.vitals?.bpSystolic} / {record.vitals?.bpDiastolic} mmHg
                        </strong>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                        <span className="text-[10px] text-[#66736D] block">Pulse</span>
                        <strong className="font-mono text-sm text-[#17211D]">
                          {record.vitals?.pulse} bpm
                        </strong>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                        <span className="text-[10px] text-[#66736D] block">SpO₂</span>
                        <strong className="font-mono text-sm text-[#17211D]">
                          {record.vitals?.spo2} %
                        </strong>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                        <span className="text-[10px] text-[#66736D] block">Temperature</span>
                        <strong className="font-mono text-sm text-[#17211D]">
                          {record.vitals?.temperature} °C
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Panel: AI Triage & Guidelines */}
                <div className="lg:col-span-5 space-y-6">
                  {/* AI Triage Card */}
                  <div className="p-4 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                    <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase mb-3">
                      AI Triage
                    </h3>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-[#66736D]">Priority:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${getPriorityStyle(record.priority)}`}>
                          {record.priority}
                        </span>
                      </div>

                      <div className="flex justify-between items-start pt-1">
                        <span className="text-[#66736D]">Reason:</span>
                        <span className="text-right text-[#17211D] max-w-[160px] font-medium">
                          {record.flaggedReasons?.[0] || "Multiple abnormal vitals and reported symptoms"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-1 border-t border-[#DCE7E2]">
                        <span className="text-[#66736D]">Processing Mode:</span>
                        <span className="font-mono font-bold text-[#087F5B]">
                          {record.processingMode || "Local / Offline"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Matched Guidelines */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-2">
                      Matched Guidelines
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#66736D]">
                      {record.matchedGuidelines?.map((gl, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#087F5B] font-bold">+</span>
                          <span>{gl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}

            {/* EXTRACTED RAW JSON TAB */}
            {activeTab === 'extracted' && (
              <div className="pt-6 font-mono text-xs text-[#087F5B] bg-[#F7FAF9] p-4 rounded-xl border border-[#DCE7E2] overflow-x-auto">
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </div>
            )}

            {/* GUIDELINES TAB */}
            {activeTab === 'guidelines' && (
              <div className="pt-6 space-y-3 text-xs text-[#66736D]">
                <p className="font-bold text-[#17211D]">Clinical Protocol Decision Rules Applied:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>WHO HEARTS Technical Package — High Risk Hypertensive Management Protocol</li>
                  <li>IMAI Integrated Management of Adult and Adolescent Illness Triage Criteria</li>
                  <li>WHO Emergency Care Triage Protocol for Low-Resource Settings</li>
                </ul>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
