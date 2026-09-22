import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Scan, 
  FileText, 
  Settings, 
  Leaf, 
  WifiOff, 
  ShieldCheck 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { label: 'New Assessment', path: '/app/assessment', icon: PlusCircle },
    { label: 'Scan Vitals', path: '/app/scanner', icon: Scan },
    { label: 'Patient Records', path: '/app/records', icon: FileText },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#DCE7E2] min-h-screen flex flex-col justify-between p-4 shrink-0 hidden md:flex">
      <div>
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2.5 px-3 py-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#087F5B] flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-5 h-5 fill-white/20" />
          </div>
          <span className="text-xl font-extrabold text-[#17211D] tracking-tight">
            Edge<span className="text-[#087F5B]">Ayu</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/app/records' && location.pathname.startsWith('/app/records'));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#E8F5F0] text-[#087F5B] font-bold border border-[#087F5B]/20'
                    : 'text-[#66736D] hover:text-[#17211D] hover:bg-[#F7FAF9]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#087F5B]' : 'text-[#66736D]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card */}
      <div className="p-3.5 rounded-xl bg-[#E8F5F0] border border-[#087F5B]/20">
        <div className="flex items-center gap-2 text-xs font-bold text-[#087F5B] mb-0.5">
          <span className="h-2 w-2 rounded-full bg-[#087F5B] animate-pulse"></span>
          <span>Offline Mode</span>
        </div>
        <p className="text-[11px] text-[#66736D]">All features available</p>
      </div>
    </aside>
  );
}
