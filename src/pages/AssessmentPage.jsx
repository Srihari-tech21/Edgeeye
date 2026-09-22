import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Activity, 
  Mic, 
  MicOff,
  Camera, 
  BrainCircuit, 
  ShieldAlert, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Cpu,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import { evaluateTriage } from '../services/aiService';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentAssessment, setCurrentAssessment, setLatestTriageResult } = useRecords();

  const [age, setAge] = useState(currentAssessment.age || '32');
  const [gender, setGender] = useState(currentAssessment.gender || 'Female');
  const [patientId, setPatientId] = useState(currentAssessment.patientId || 'PAT-025');
  const [symptomsText, setSymptomsText] = useState(currentAssessment.rawSymptomsText || '');

  const [vitals, setVitals] = useState(currentAssessment.vitals || {
    bpSystolic: '120',
    bpDiastolic: '80',
    pulse: '72',
    spo2: '98',
    temperature: '36.8'
  });

  const [redFlags, setRedFlags] = useState(currentAssessment.redFlags || {
    chestPain: false,
    severeBreathingDifficulty: false,
    lossOfConsciousness: false,
    acuteConfusion: false,
    severeBleeding: false,
    severeWeakness: false
  });

  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef(null);

  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Processing locally...');
  const [processingProgress, setProcessingProgress] = useState(0);

  // Sync state if preset loaded from context
  useEffect(() => {
    if (currentAssessment) {
      if (currentAssessment.age) setAge(currentAssessment.age);
      if (currentAssessment.gender) setGender(currentAssessment.gender);
      if (currentAssessment.patientId) setPatientId(currentAssessment.patientId);
      if (currentAssessment.rawSymptomsText) setSymptomsText(currentAssessment.rawSymptomsText);
      if (currentAssessment.vitals) setVitals({ ...currentAssessment.vitals });
      if (currentAssessment.redFlags) setRedFlags({ ...currentAssessment.redFlags });
    }
  }, [currentAssessment]);

  useEffect(() => {
    if (searchParams.get('mode') === 'voice') {
      toggleVoiceInput();
    }
  }, [searchParams]);

  // Real Web Speech API Input
  const toggleVoiceInput = () => {
    setVoiceError('');

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError("Voice input isn't supported in this browser. You can enter symptoms manually.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        if (transcript) {
          setSymptomsText((prev) => (prev ? `${prev} ${transcript.trim()}` : transcript.trim()));
        }
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission denied. Please allow microphone access or enter symptoms manually.');
        } else {
          setVoiceError(`Voice recognition issue (${event.error}). You can enter symptoms manually.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setVoiceError("Voice input error. You can enter symptoms manually.");
      setIsListening(false);
    }
  };

  const handleVitalChange = (field, value) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handleRedFlagToggle = (key) => {
    setRedFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAnalyzeLocally = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Inline Validation Check
    if (!patientId.trim()) {
      setValidationError('Please enter a Patient ID.');
      return;
    }
    if (!symptomsText.trim() && Object.values(redFlags).every((v) => !v)) {
      setValidationError('Please describe symptoms or select reported red flags.');
      return;
    }

    setIsProcessing(true);

    try {
      const assessmentData = {
        age,
        gender,
        patientId,
        rawSymptomsText: symptomsText,
        vitals,
        redFlags
      };

      setCurrentAssessment(assessmentData);

      const result = await evaluateTriage(assessmentData, (msg, prog) => {
        setProcessingMessage(msg);
        setProcessingProgress(prog);
      });

      const fullResult = {
        ...result,
        id: patientId || 'PAT-025',
        name: `Patient #${patientId.replace('PAT-', '') || '025'}`,
        age,
        gender,
        rawSymptomsText: symptomsText
      };

      setLatestTriageResult(fullResult);

      setTimeout(() => {
        setIsProcessing(false);
        navigate('/app/result');
      }, 400);

    } catch (err) {
      console.error("Local analysis error:", err);
      setIsProcessing(false);
    }
  };

  const activeRedFlagCount = Object.values(redFlags).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* PROCESSING MODAL */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-2xl border border-[#DCE7E2]">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-7 h-7 animate-spin" />
              </div>
              <h3 className="text-lg font-bold text-[#17211D] mb-1">{processingMessage}</h3>
              <p className="text-xs text-[#66736D] mb-4">On-device evaluation with WHO & IMAI guideline rules.</p>
              
              <div className="w-full bg-[#F7FAF9] h-2 rounded-full overflow-hidden border border-[#DCE7E2]">
                <div
                  className="bg-[#087F5B] h-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 lg:p-8 max-w-4xl mx-auto w-full pb-24 space-y-6">
          
          {/* COMPACT SAFETY BANNER */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#FFF9DB] border border-[#F59F00]/30 text-[#856404] text-xs font-medium">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#F59F00] shrink-0" />
              <span>AI-assisted decision support • Verify readings • Not a diagnosis</span>
            </div>
          </div>

          {/* Stepper Header */}
          <div className="flex items-center gap-2 text-xs text-[#66736D] overflow-x-auto pb-1 font-medium">
            <div className="flex items-center gap-2 font-bold text-[#087F5B] bg-[#E8F5F0] px-3 py-1.5 rounded-full border border-[#087F5B]/20">
              <span className="w-5 h-5 rounded-full bg-[#087F5B] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Patient Info</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-2 font-bold text-[#087F5B] bg-[#E8F5F0] px-3 py-1.5 rounded-full border border-[#087F5B]/20">
              <span className="w-5 h-5 rounded-full bg-[#087F5B] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Symptoms</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-2 font-bold text-[#087F5B] bg-[#E8F5F0] px-3 py-1.5 rounded-full border border-[#087F5B]/20">
              <span className="w-5 h-5 rounded-full bg-[#087F5B] text-white flex items-center justify-center text-[10px]">3</span>
              <span>Vitals</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="w-5 h-5 rounded-full bg-[#F7FAF9] text-[#66736D] border border-[#CBD5E1] flex items-center justify-center text-[10px]">4</span>
              <span>Review</span>
            </div>
          </div>

          {/* Inline Validation Banner */}
          {validationError && (
            <div className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#FFC9C9] text-[#E03131] text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#E03131]" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleAnalyzeLocally} className="saas-card p-6 sm:p-8 space-y-6">
            
            {/* 1. PATIENT INFORMATION */}
            <div>
              <h2 className="text-sm font-bold text-[#17211D] uppercase tracking-wider mb-3">
                Patient Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">Patient ID</label>
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="PAT-025"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] font-mono text-xs focus:outline-none focus:border-[#087F5B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="32"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs focus:outline-none focus:border-[#087F5B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">Sex</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs focus:outline-none focus:border-[#087F5B]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. SYMPTOMS & VOICE INPUT */}
            <div className="pt-4 border-t border-[#DCE7E2]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-[#17211D] uppercase tracking-wider">
                    Symptoms
                  </h2>
                  {isListening && (
                    <span className="text-[11px] text-[#087F5B] font-mono block mt-0.5">
                      ● Listening... Speak clearly
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    isListening
                      ? 'bg-[#FFF5F5] text-[#E03131] border border-[#FFC9C9] animate-pulse'
                      : 'bg-[#E8F5F0] text-[#087F5B] border border-[#087F5B]/30 hover:bg-[#087F5B]/10'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isListening ? 'Stop' : 'Use Voice'}</span>
                </button>
              </div>

              {/* Voice Browser Warning Banner */}
              {voiceError && (
                <div className="p-3 rounded-xl bg-[#FFF9DB] border border-[#F59F00]/30 text-[#856404] text-xs font-medium mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#F59F00] shrink-0" />
                  <span>{voiceError}</span>
                </div>
              )}

              <textarea
                rows="3"
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                placeholder="Describe symptoms or use voice input..."
                className="w-full p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs leading-relaxed focus:outline-none focus:border-[#087F5B]"
              ></textarea>
            </div>

            {/* 3. VITALS */}
            <div className="pt-4 border-t border-[#DCE7E2]">
              <h2 className="text-sm font-bold text-[#17211D] uppercase tracking-wider mb-3">
                Vitals
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">Blood Pressure</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={vitals.bpSystolic}
                      onChange={(e) => handleVitalChange('bpSystolic', e.target.value)}
                      placeholder="120"
                      className="w-full px-2.5 py-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs font-mono focus:outline-none focus:border-[#087F5B]"
                    />
                    <span className="text-[#66736D] font-bold">/</span>
                    <input
                      type="number"
                      value={vitals.bpDiastolic}
                      onChange={(e) => handleVitalChange('bpDiastolic', e.target.value)}
                      placeholder="80"
                      className="w-full px-2.5 py-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs font-mono focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">Pulse</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={vitals.pulse}
                      onChange={(e) => handleVitalChange('pulse', e.target.value)}
                      placeholder="72"
                      className="w-full px-3 py-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs font-mono focus:outline-none focus:border-[#087F5B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#66736D] font-mono">bpm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">SpO₂</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={vitals.spo2}
                      onChange={(e) => handleVitalChange('spo2', e.target.value)}
                      placeholder="98"
                      className="w-full px-3 py-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs font-mono focus:outline-none focus:border-[#087F5B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#66736D] font-mono">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#66736D] mb-1">Temperature</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={vitals.temperature}
                      onChange={(e) => handleVitalChange('temperature', e.target.value)}
                      placeholder="36.8"
                      className="w-full px-3 py-2 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] text-xs font-mono focus:outline-none focus:border-[#087F5B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#66736D] font-mono">°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. EMERGENCY RED-FLAG DETECTION CHECKLIST */}
            <div className="pt-4 border-t border-[#DCE7E2]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-[#E03131] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#E03131]" />
                  Emergency Red Flags Screener
                </h2>
                {activeRedFlagCount > 0 && (
                  <span className="px-2 py-0.5 rounded bg-[#FFF5F5] text-[#E03131] text-[10px] font-bold border border-[#FFC9C9]">
                    {activeRedFlagCount} CRITICAL ALERT(S)
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'chestPain', label: 'Chest pain' },
                  { id: 'severeBreathingDifficulty', label: 'Severe breathing difficulty' },
                  { id: 'lossOfConsciousness', label: 'Loss of consciousness' },
                  { id: 'acuteConfusion', label: 'Acute confusion' },
                  { id: 'severeBleeding', label: 'Severe bleeding' },
                  { id: 'severeWeakness', label: 'Severe weakness' }
                ].map((rf) => (
                  <label
                    key={rf.id}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition text-xs font-semibold ${
                      redFlags[rf.id]
                        ? 'bg-[#FFF5F5] border-[#E03131] text-[#E03131]'
                        : 'bg-[#F7FAF9] border-[#DCE7E2] text-[#66736D] hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(redFlags[rf.id])}
                      onChange={() => handleRedFlagToggle(rf.id)}
                      className="w-4 h-4 accent-[#E03131] rounded"
                    />
                    <span>{rf.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="pt-6 border-t border-[#DCE7E2] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate('/app/scanner')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#E8F5F0] text-[#087F5B] border border-[#087F5B]/20 text-xs font-bold hover:bg-[#087F5B]/10 transition flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Scan with Camera</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#087F5B] text-white font-bold text-sm hover:bg-[#075E49] transition shadow-md shadow-[#087F5B]/20 flex items-center justify-center gap-2"
              >
                <span>Analyze Locally</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
