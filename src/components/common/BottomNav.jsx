import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Scan, FileText, Settings } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { label: 'New Intake', path: '/app/assessment', icon: PlusCircle },
    { label: 'Scan Vitals', path: '/app/scanner', icon: Scan, highlight: true },
    { label: 'Records', path: '/app/records', icon: FileText },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#DCE7E2] px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/app/records' && location.pathname.startsWith('/app/records'));

          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-0.5 relative -top-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#087F5B] text-white flex items-center justify-center shadow-md shadow-[#087F5B]/30">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-[#087F5B]">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
                isActive ? 'text-[#087F5B] font-bold' : 'text-[#66736D] hover:text-[#17211D]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
