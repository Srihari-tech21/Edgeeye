import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecordProvider } from './context/RecordContext';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import ScannerPage from './pages/ScannerPage';
import ResultPage from './pages/ResultPage';
import RecordsPage from './pages/RecordsPage';
import RecordDetailPage from './pages/RecordDetailPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <RecordProvider>
      <Router>
        <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<DashboardPage />} />
              <Route path="/app/assessment" element={<AssessmentPage />} />
              <Route path="/app/scanner" element={<ScannerPage />} />
              <Route path="/app/result" element={<ResultPage />} />
              <Route path="/app/records" element={<RecordsPage />} />
              <Route path="/app/records/:id" element={<RecordDetailPage />} />
              <Route path="/app/settings" element={<SettingsPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </RecordProvider>
  );
}
