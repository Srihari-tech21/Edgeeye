import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF9DB] border border-[#F59F00]/30 text-[#856404] text-xs font-medium">
        <AlertTriangle className="w-4 h-4 shrink-0 text-[#F59F00]" />
        <span>AI-assisted decision support prototype. Not for definitive medical diagnosis.</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#FFF9DB] border border-[#F59F00]/30 p-3.5 mb-6 text-[#795200] text-xs leading-relaxed flex items-start gap-3 shadow-xs">
      <ShieldAlert className="w-4 h-4 text-[#F59F00] shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-[#5C3C00]">Clinical Safety Disclaimer:</span>
        EdgeAyu provides AI-assisted decision support and automated vitals digitization. It does <strong>not</strong> replace a qualified healthcare professional or emergency medical services. All records displayed are synthetic demo data.
      </div>
    </div>
  );
}
