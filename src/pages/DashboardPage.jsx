import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Camera, 
  Mic, 
  Activity, 
  Clock, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  WifiOff,
  ArrowRight,
  PlayCircle,
  Sparkles
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import { DEMO_SCENARIOS } from '../data/mockData';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function DashboardPage() {
  const { records, loadScenario, effectiveOffline } = useRecords();
  const navigate = useNavigate();

  const handleSelectScenario = (scenarioId) => {
    loadScenario(scenarioId);
    navigate('/app/assessment');
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
        <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full pb-24 space-y-6">
          
          {/* COMPACT SAFETY BANNER */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#FFF9DB] border border-[#F59F00]/30 text-[#856404] text-xs font-medium">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#F59F00] shrink-0" />
              <span>AI-assisted decision support • Verify readings • Not a diagnosis</span>
            </div>
            <span className="text-[10px] font-mono text-[#795200] font-bold hidden sm:inline">SYNTHETIC DEMO DATA</span>
          </div>

          {/* Welcome Banner & Offline Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D] tracking-tight">
                Good evening, <span className="text-[#087F5B]">Health Worker</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
                Ready for your next assessment.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#E8F5F0] border border-[#087F5B]/20 flex items-center gap-3 self-start sm:self-auto shadow-xs">
              <WifiOff className="w-5 h-5 text-[#087F5B]" />
              <div>
                <div className="text-xs font-bold text-[#087F5B] flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${effectiveOffline ? 'bg-[#087F5B] animate-pulse' : 'bg-[#D97706]'}`}></span>
                  {effectiveOffline ? 'Offline Mode' : 'Network Available'}
                </div>
                <div className="text-[11px] text-[#66736D]">
                  {effectiveOffline ? 'No internet required' : 'Designed for local processing'}
                </div>
              </div>
            </div>
          </div>

          {/* TRY DEMO SCENARIO SECTION */}
          <div className="saas-card p-5 border-[#087F5B]/30 bg-[#E8F5F0]/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-[#087F5B]" />
                <h2 className="text-xs font-mono font-bold text-[#087F5B] uppercase tracking-wider">
                  Try Demo Scenario (Fast 30s Hackathon Flow)
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#087F5B]/20 text-[#087F5B]">
                SYNTHETIC PRESETS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleSelectScenario(scenario.id)}
                  className="p-3.5 rounded-xl bg-white border border-[#DCE7E2] hover:border-[#087F5B] hover:shadow-sm transition text-left group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#17211D] group-hover:text-[#087F5B] transition">
                      {scenario.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66736D] group-hover:text-[#087F5B] group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-[11px] text-[#66736D] line-clamp-1 mb-1 font-mono">
                    BP {scenario.vitals.bpSystolic}/{scenario.vitals.bpDiastolic} • SpO₂ {scenario.vitals.spo2}%
                  </p>
                  <span className="text-[10px] text-[#087F5B] font-semibold block">
                    Click to load preset →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* QUICK ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/app/assessment"
              className="saas-card p-5 saas-card-hover group flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#17211D] group-hover:text-[#087F5B] transition">
                  New Assessment
                </h3>
                <p className="text-xs text-[#66736D] mt-0.5">
                  Start a patient evaluation
                </p>
              </div>
            </Link>

            <Link
              to="/app/scanner"
              className="saas-card p-5 saas-card-hover group flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#17211D] group-hover:text-[#087F5B] transition">
                  Scan Vitals
                </h3>
                <p className="text-xs text-[#66736D] mt-0.5">
                  Capture from device/photo
                </p>
              </div>
            </Link>

            <Link
              to="/app/assessment?mode=voice"
              className="saas-card p-5 saas-card-hover group flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#17211D] group-hover:text-[#087F5B] transition">
                  Capture Symptoms
                </h3>
                <p className="text-xs text-[#66736D] mt-0.5">
                  Use voice or text
                </p>
              </div>
            </Link>
          </div>

          {/* RECENT ASSESSMENTS TABLE */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[#17211D]">Recent Assessments</h2>
                <p className="text-xs text-[#66736D]">Demonstration clinical records stored locally.</p>
              </div>

              <Link
                to="/app/records"
                className="text-xs font-semibold text-[#087F5B] hover:underline flex items-center gap-1"
              >
                <span>View all ({records.length})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#DCE7E2] text-[#66736D] font-mono uppercase text-[11px]">
                    <th className="py-3 px-3 font-semibold">Patient ID</th>
                    <th className="py-3 px-3 font-semibold">Age / Sex</th>
                    <th className="py-3 px-3 font-semibold">Key Information</th>
                    <th className="py-3 px-3 font-semibold">Priority</th>
                    <th className="py-3 px-3 font-semibold text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E2]/60">
                  {records.slice(0, 4).map((record) => (
                    <tr
                      key={record.id}
                      onClick={() => navigate(`/app/records/${record.id}`)}
                      className="hover:bg-[#F7FAF9] transition cursor-pointer"
                    >
                      <td className="py-3.5 px-3 font-mono font-bold text-[#17211D]">
                        {record.id}
                      </td>
                      <td className="py-3.5 px-3 text-[#17211D]">
                        {record.age} / {record.gender?.charAt(0)}
                      </td>
                      <td className="py-3.5 px-3 text-[#17211D]">
                        BP {record.vitals?.bpSystolic}/{record.vitals?.bpDiastolic}, {record.symptoms?.[0] || 'Checkup'}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${getPriorityStyle(record.priority)}`}>
                          {record.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-[#66736D]">
                        {record.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
