import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Search, 
  Bell, 
  User, 
  ArrowRight, 
  Sun, 
  WifiOff, 
  Wifi, 
  ShieldCheck, 
  Info,
  X
} from 'lucide-react';
import { useRecords } from '../../context/RecordContext';

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const { effectiveOffline, isOnline } = useRecords();
  const [showStatusModal, setShowStatusModal] = useState(false);

  if (isLanding) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#087F5B] flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-5 h-5 fill-white/20" />
            </div>
            <span className="text-xl font-extrabold text-[#17211D] tracking-tight">
              Edge<span className="text-[#087F5B]">Ayu</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#66736D]">
            <a href="#home" className="hover:text-[#087F5B] transition">Home</a>
            <a href="#how-it-works" className="hover:text-[#087F5B] transition">How It Works</a>
            <a href="#features" className="hover:text-[#087F5B] transition">Features</a>
            <a href="#technology" className="hover:text-[#087F5B] transition">Technology</a>
            <a href="#impact" className="hover:text-[#087F5B] transition">Impact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49] transition shadow-sm flex items-center gap-1.5"
            >
              <span>Try EdgeAyu</span>
            </Link>

            <div className="p-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#66736D] text-xs flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-[#F59F00]" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-[#DCE7E2] px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-40">
        
        {/* Search Bar / Mobile Brand */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <Link to="/" className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#087F5B] flex items-center justify-center text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm text-[#17211D]">EdgeAyu</span>
          </Link>

          <div className="relative w-full hidden md:block">
            <Search className="w-4 h-4 text-[#66736D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients, symptoms..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-xs text-[#17211D] placeholder-[#66736D] focus:outline-none focus:border-[#087F5B]"
            />
          </div>
        </div>

        {/* Top Header Actions / User Info */}
        <div className="flex items-center gap-3">
          
          {/* Clickable Status Panel Trigger */}
          <button
            onClick={() => setShowStatusModal(true)}
            className={`px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 transition ${
              effectiveOffline
                ? 'bg-[#E8F5F0] text-[#087F5B] border-[#087F5B]/30'
                : 'bg-[#FFF9DB] text-[#D97706] border-[#FFE066]'
            }`}
            title="Click to view Edge AI System Status"
          >
            <span className={`h-2 w-2 rounded-full ${effectiveOffline ? 'bg-[#087F5B] animate-pulse' : 'bg-[#D97706]'}`}></span>
            <span>{effectiveOffline ? '🟢 OFFLINE MODE' : '🟡 NETWORK AVAILABLE'}</span>
          </button>

          <button className="p-2 rounded-xl text-[#66736D] hover:bg-[#F7FAF9] transition relative hidden sm:block" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#087F5B] rounded-full"></span>
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-[#DCE7E2]">
            <div className="w-8 h-8 rounded-full bg-[#E8F5F0] border border-[#087F5B]/30 flex items-center justify-center text-[#087F5B] font-bold text-xs">
              H
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#17211D]">Health Worker</div>
              <div className="text-[10px] text-[#66736D]">PHC • Tadepalligudem</div>
            </div>
          </div>
        </div>

      </header>

      {/* SYSTEM STATUS PANEL MODAL */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-[#DCE7E2]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E2] mb-4">
              <div className="flex items-center gap-2 font-bold text-[#17211D] text-sm">
                <ShieldCheck className="w-5 h-5 text-[#087F5B]" />
                <span>EdgeAyu System Status</span>
              </div>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-[#66736D] hover:text-[#17211D] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-mono mb-4">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                <span className="text-[#66736D]">Network Status:</span>
                <strong className={isOnline ? 'text-[#D97706]' : 'text-[#087F5B]'}>
                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </strong>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                <span className="text-[#66736D]">Processing Mode:</span>
                <strong className="text-[#087F5B]">LOCAL PROTOTYPE</strong>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                <span className="text-[#66736D]">Cloud API Calls:</span>
                <strong className="text-[#66736D]">DISABLED (0)</strong>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2]">
                <span className="text-[#66736D]">Data Uploaded:</span>
                <strong className="text-[#087F5B]">0 BYTES</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#66736D] leading-relaxed mb-4">
              EdgeAyu is designed for local processing in low-connectivity settings. All prototype processing is simulated locally in the browser.
            </p>

            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49]"
            >
              Close Status Panel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
