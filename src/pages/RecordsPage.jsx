import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  FileText, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle,
  RotateCcw
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function RecordsPage() {
  const navigate = useNavigate();
  const { records, resetDemoData } = useRecords();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.rawSymptomsText?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === 'ALL' || rec.priority === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'HIGH PRIORITY':
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
          
          <DisclaimerBanner />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D] tracking-tight">
                Patient Records
              </h1>
              <p className="text-xs sm:text-sm text-[#66736D]">
                Structured digitized patient records saved in local encrypted storage.
              </p>
            </div>

            <button
              onClick={() => navigate('/app/assessment')}
              className="px-5 py-2.5 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49] transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ New Assessment</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="saas-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#66736D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID, name or symptoms..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs focus:outline-none focus:border-[#087F5B]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'HIGH PRIORITY', label: 'High Priority' },
                { id: 'ROUTINE', label: 'Routine' },
                { id: 'REVIEW REQUIRED', label: 'Review Required' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedFilter === tab.id
                      ? 'bg-[#087F5B] text-white shadow-xs'
                      : 'bg-[#F7FAF9] text-[#66736D] hover:bg-[#E8F5F0] border border-[#DCE7E2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Professional Registry Table */}
          <div className="saas-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F7FAF9] border-b border-[#DCE7E2] text-[#66736D] font-mono uppercase text-[11px]">
                    <th className="py-3 px-4 font-semibold">Patient ID</th>
                    <th className="py-3 px-4 font-semibold">Age / Sex</th>
                    <th className="py-3 px-4 font-semibold">Symptoms</th>
                    <th className="py-3 px-4 font-semibold">Priority</th>
                    <th className="py-3 px-4 font-semibold">Date & Time</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E2]">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-[#66736D]">
                        No patient records found.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        onClick={() => navigate(`/app/records/${record.id}`)}
                        className="hover:bg-[#F7FAF9] transition cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-[#17211D]">
                          {record.id}
                        </td>
                        <td className="py-3.5 px-4 text-[#17211D]">
                          {record.age} / {record.gender?.charAt(0)}
                        </td>
                        <td className="py-3.5 px-4 text-[#66736D] max-w-xs truncate">
                          {record.symptoms?.join(', ') || record.rawSymptomsText}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${getPriorityStyle(record.priority)}`}>
                            {record.priority}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#66736D]">
                          {record.dateFormatted || record.timestamp}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <ChevronRight className="w-4 h-4 text-[#66736D] inline" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
