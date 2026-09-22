import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { DEMO_SCENARIOS } from '../data/mockData';

const RecordContext = createContext();

export function RecordProvider({ children }) {
  const [records, setRecords] = useState(() => storageService.getRecords());

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

  useEffect(() => {
    try {
      localStorage.setItem('edgeayu_demo_offline', JSON.stringify(demoOfflineMode));
    } catch (e) {
      console.warn("LocalStorage offline toggle error:", e);
    }
  }, [demoOfflineMode]);

  const addRecord = (newRecord) => {
    const updated = storageService.saveRecord(newRecord);
    setRecords(updated);
  };

  const getRecordById = (id) => {
    return storageService.getRecord(id);
  };

  const resetDemoData = () => {
    const res = storageService.clearRecords();
    setRecords(res);
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
