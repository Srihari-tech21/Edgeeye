import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Cpu, 
  Database, 
  WifiOff, 
  Lock, 
  RotateCcw,
  HardDrive,
  Info,
  ToggleLeft,
  ToggleRight,
  CheckCircle2
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function SettingsPage() {
  const { resetDemoData, records, demoOfflineMode, setDemoOfflineMode, isOnline } = useRecords();
  const [resetConfirmed, setResetConfirmed] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setResetConfirmed(true);
    setTimeout(() => setResetConfirmed(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 lg:p-8 max-w-4xl mx-auto w-full pb-24 space-y-6">
          
          <DisclaimerBanner />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D] tracking-tight">
                Settings
              </h1>
              <p className="text-xs sm:text-sm text-[#66736D]">
                Manage system engine configuration, data privacy and local storage.
              </p>
            </div>
          </div>

          {/* Reset Confirmation Alert */}
          {resetConfirmed && (
            <div className="p-3.5 rounded-xl bg-[#E8F5F0] border border-[#087F5B]/30 text-[#087F5B] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#087F5B]" />
              <span>LocalStorage cleared! Initial synthetic demo dataset restored successfully.</span>
            </div>
          )}

          {/* DEMO OFFLINE MODE CONTROL */}
          <div className="saas-card p-6 border-[#087F5B]/30 bg-[#E8F5F0]/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-[#087F5B]" />
                  <h2 className="text-sm font-bold text-[#17211D]">Demo Offline Mode</h2>
                </div>
                <p className="text-xs text-[#66736D] mt-1">
                  Forces Offline Mode indicator throughout the prototype for hackathon judging.
                </p>
              </div>

              <button
                onClick={() => setDemoOfflineMode(!demoOfflineMode)}
                className="text-[#087F5B] hover:opacity-80 transition p-1"
                title="Toggle Demo Offline Mode"
              >
                {demoOfflineMode ? (
                  <ToggleRight className="w-9 h-9 text-[#087F5B]" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-[#66736D]" />
                )}
              </button>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-white border border-[#DCE7E2] text-xs text-[#66736D]">
              <strong>Technical Honesty Note:</strong> All prototype processing is simulated locally in the browser memory and encrypted local storage.
            </div>
          </div>

          {/* SYSTEM STATUS MATRIX */}
          <div className="saas-card p-6 space-y-4">
            <h2 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#087F5B]" />
              System Status Matrix
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#66736D] font-mono block">Processing Mode</span>
                  <span className="text-xs font-bold text-[#087F5B] font-mono mt-0.5 block">
                    Local / Offline
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold">
                  LOCAL PROTOTYPE
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#66736D] font-mono block">Internet Connection</span>
                  <span className="text-xs font-bold text-[#17211D] font-mono mt-0.5 block">
                    {isOnline ? 'Network Available' : 'Offline'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold">
                  NOT REQUIRED
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#66736D] font-mono block">Cloud API</span>
                  <span className="text-xs font-bold text-[#66736D] font-mono mt-0.5 block">
                    Disabled
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-[#66736D] text-[10px] font-mono font-bold">
                  0 Requests
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#66736D] font-mono block">Local Storage</span>
                  <span className="text-xs font-bold text-[#087F5B] font-mono mt-0.5 block">
                    Enabled
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold">
                  {records.length} Records
                </span>
              </div>
            </div>
          </div>

          {/* DATA & PRIVACY */}
          <div className="saas-card p-6 space-y-4">
            <h2 className="text-xs font-mono font-bold text-[#17211D] uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
              Data Management & Privacy
            </h2>

            <p className="text-xs text-[#66736D] leading-relaxed">
              EdgeAyu is built around a local-first architecture. All camera OCR processing, speech symptom extraction, and clinical guideline rules run on-device within browser memory. No patient information is transmitted to third-party cloud servers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#DCE7E2]">
              <div>
                <span className="text-xs font-bold text-[#17211D] block">Clear All Data & Reset Records</span>
                <span className="text-[11px] text-[#66736D]">Restores initial synthetic demo records.</span>
              </div>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white border border-[#DCE7E2] hover:bg-[#F7FAF9] text-[#17211D] font-bold text-xs transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Clear All Data</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
