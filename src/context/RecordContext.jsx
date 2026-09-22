import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DEMO_RECORDS, DEMO_SCENARIOS } from '../data/mockData';

const RecordContext = createContext();

export function RecordProvider({ children }) {
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('edgeayu_records');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_RECORDS;
    } catch (e) {
      return INITIAL_DEMO_RECORDS;
    }
  });

  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [demoOfflineMode, setDemoOfflineMode] = useState(() => {
    try {
      const saved = localStorage.getItem('edgeayu_demo_offline');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [currentAssessment, setCurrentAssessment] = useState({
    age: '54',
    gender: 'Female',
    patientId: 'PAT-024',
    rawSymptomsText: 'Severe frontal headache for 2 days, dizziness upon standing, fatigue and mild nausea.',
    symptoms: ['Severe frontal headache', 'Dizziness upon standing', 'General fatigue'],
    vitals: {
      bpSystolic: '168',
      bpDiastolic: '102',
      pulse: '108',
      spo2: '94',
      temperature: '38.2'
    },
    redFlags: {
      chestPain: false,
      severeBreathingDifficulty: false,
      lossOfConsciousness: false,
      acuteConfusion: false,
      severeBleeding: false,
      severeWeakness: false
    }
  });

  const [latestTriageResult, setLatestTriageResult] = useState(null);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('edgeayu_records', JSON.stringify(records));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem('edgeayu_demo_offline', JSON.stringify(demoOfflineMode));
    } catch (e) {
      console.warn("LocalStorage offline toggle error:", e);
    }
  }, [demoOfflineMode]);

  const addRecord = (newRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  const getRecordById = (id) => {
    return records.find((r) => r.id === id) || records[0];
  };

  const resetDemoData = () => {
    setRecords(INITIAL_DEMO_RECORDS);
    localStorage.removeItem('edgeayu_records');
  };

  const loadScenario = (scenarioId) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId) || DEMO_SCENARIOS[0];
    setCurrentAssessment({
      age: scenario.age,
      gender: scenario.gender,
      patientId: scenario.patientId,
      rawSymptomsText: scenario.rawSymptomsText,
      symptoms: scenario.rawSymptomsText.split(', '),
      vitals: { ...scenario.vitals },
      redFlags: { ...scenario.redFlags }
    });
  };

  const updateCurrentVitals = (vitalsObj) => {
    setCurrentAssessment((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, ...vitalsObj }
    }));
  };

  // Determine effective offline display status
  const effectiveOffline = demoOfflineMode || !isOnline;

  return (
    <RecordContext.Provider
      value={{
        records,
        currentAssessment,
        setCurrentAssessment,
        latestTriageResult,
        setLatestTriageResult,
        addRecord,
        getRecordById,
        resetDemoData,
        loadScenario,
        updateCurrentVitals,
        isOnline,
        demoOfflineMode,
        setDemoOfflineMode,
        effectiveOffline
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}

export function useRecords() {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error('useRecords must be used within a RecordProvider');
  }
  return context;
}
