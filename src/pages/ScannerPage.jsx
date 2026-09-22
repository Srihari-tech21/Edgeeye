import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Scan, 
  CheckCircle2, 
  Upload, 
  RefreshCw, 
  ArrowRight, 
  Activity, 
  AlertCircle,
  Eye,
  Check,
  Edit2,
  ShieldCheck,
  AlertTriangle,
  VideoOff
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useRecords } from '../context/RecordContext';
import { scanVitalsImage } from '../services/aiService';
import { DEMO_SCAN_SAMPLES } from '../data/mockData';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function ScannerPage() {
  const navigate = useNavigate();
  const { updateCurrentVitals } = useRecords();
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [selectedSample, setSelectedSample] = useState(DEMO_SCAN_SAMPLES[0]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [streamInstance, setStreamInstance] = useState(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  
  const [ocrResult, setOcrResult] = useState({
    success: true,
    confidence: "96%",
    confidenceScore: 0.96,
    extractedVitals: {
      bpSystolic: "118",
      bpDiastolic: "76",
      pulse: "72",
      spo2: "98",
      temperature: "36.8"
    }
  });

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (streamInstance) {
      streamInstance.getTracks().forEach((track) => track.stop());
      setStreamInstance(null);
    }
    setIsCameraActive(false);
  };

  // Real Browser Camera API
  const startCamera = async () => {
    setCameraError('');
    setCapturedImage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera unavailable in this browser — upload an image instead.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      setStreamInstance(stream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn("Camera permission/access error:", err);
      setCameraError('Camera unavailable — upload an image instead.');
      setIsCameraActive(false);
    }
  };

  // Capture frame from live video stream using canvas
  const captureVideoFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopCameraStream();
      triggerLocalOcrProcess("sample-bp-1");
    }
  };

  // File Upload / Mobile File Capture Fallback
  const handleFileSelect = (event) => {
    stopCameraStream();
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      setCameraError('');
      triggerLocalOcrProcess(selectedSample.id);
    }
  };

  const triggerLocalOcrProcess = async (sampleId) => {
    setIsScanning(true);

    const res = await scanVitalsImage(sampleId, (msg, prog) => {
      setScanMessage(msg);
      setScanProgress(prog);
    });

    setIsScanning(false);
    setOcrResult({
      ...res,
      extractedVitals: {
        bpSystolic: String(res.extractedVitals.bpSystolic),
        bpDiastolic: String(res.extractedVitals.bpDiastolic),
        pulse: String(res.extractedVitals.pulse),
        spo2: String(res.extractedVitals.spo2),
        temperature: String(res.extractedVitals.temperature)
      }
    });
  };

  const handleSampleSelect = (sample) => {
    stopCameraStream();
    setSelectedSample(sample);
    setCapturedImage(null);
    setCameraError('');
    triggerLocalOcrProcess(sample.id);
  };

  const handleVitalEdit = (field, val) => {
    setOcrResult((prev) => ({
      ...prev,
      extractedVitals: {
        ...prev.extractedVitals,
        [field]: val
      }
    }));
  };

  const handleContinueToTriage = () => {
    if (ocrResult && ocrResult.extractedVitals) {
      updateCurrentVitals({
        bpSystolic: String(ocrResult.extractedVitals.bpSystolic),
        bpDiastolic: String(ocrResult.extractedVitals.bpDiastolic),
        pulse: String(ocrResult.extractedVitals.pulse),
        spo2: String(ocrResult.extractedVitals.spo2),
        temperature: String(ocrResult.extractedVitals.temperature)
      });
    }
    navigate('/app/assessment');
  };

  const isLowConfidence = ocrResult?.confidenceScore < 0.90 || parseInt(ocrResult?.confidence || '96') < 90;

  return (
    <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] flex">
      <Sidebar />

      {/* Hidden File Input & Canvas for Frame Capture */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 lg:p-8 max-w-6xl mx-auto w-full pb-24 space-y-6">
          
          <DisclaimerBanner />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D] tracking-tight">
                Scan Vitals
              </h1>
              <p className="text-xs sm:text-sm text-[#66736D]">
                Capture readings from BP monitors, pulse oximeters and clinical documents.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#087F5B] bg-[#E8F5F0] px-3 py-1.5 rounded-full border border-[#087F5B]/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Cloud Upload: 0 Bytes</span>
            </div>
          </div>

          {/* Preset Sample Tabs */}
          <div className="saas-card p-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#66736D] font-mono mr-2 hidden sm:inline">Try Preset Reading:</span>
            {DEMO_SCAN_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSampleSelect(sample)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  selectedSample.id === sample.id && !capturedImage && !isCameraActive
                    ? 'bg-[#087F5B] text-white shadow-xs'
                    : 'bg-[#F7FAF9] text-[#66736D] hover:bg-[#E8F5F0] border border-[#DCE7E2]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{sample.title}</span>
              </button>
            ))}
          </div>

          {/* Camera Error / Permission Banner */}
          {cameraError && (
            <div className="p-3.5 rounded-xl bg-[#FFF9DB] border border-[#F59F00]/30 text-[#856404] text-xs font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VideoOff className="w-4 h-4 text-[#F59F00] shrink-0" />
                <span>{cameraError}</span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 rounded-lg bg-white border border-[#F59F00]/40 text-xs font-bold hover:bg-[#FFF9DB]"
              >
                Upload Image
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: CAMERA / PREVIEW VIEWFINDER */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-[#DCE7E2] shadow-md flex items-center justify-center">
                
                {/* Live Camera Video Stream */}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
                  autoPlay
                  playsInline
                  muted
                />

                {/* Captured or Preset Image Preview */}
                {!isCameraActive && (
                  <img
                    src={capturedImage || "/bp_monitor_sample.jpg"}
                    alt="Medical reading preview"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Laser scan line when scanning */}
                {isScanning && <div className="scanner-laser-light"></div>}

                {/* Reticle Corner Brackets */}
                <div className="absolute inset-8 border border-white/20 rounded-xl pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#087F5B] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#087F5B] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#087F5B] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#087F5B] rounded-br-lg"></div>
                </div>

                {/* Scanning Spinner Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                    <RefreshCw className="w-8 h-8 text-[#20C997] animate-spin mb-2" />
                    <span className="text-sm font-bold font-mono">Processing locally ({scanProgress}%)...</span>
                    <span className="text-xs text-slate-300 mt-1">Cloud upload: 0 bytes</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {isCameraActive ? (
                  <button
                    onClick={captureVideoFrame}
                    className="col-span-2 py-3.5 px-4 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49] transition shadow-xs flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Frame</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={startCamera}
                      disabled={isScanning}
                      className="py-3 px-4 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49] transition shadow-xs flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>📷 Use Camera</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isScanning}
                      className="py-3 px-4 rounded-xl bg-white border border-[#DCE7E2] text-[#17211D] font-bold text-xs hover:bg-[#F7FAF9] transition flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-[#087F5B]" />
                      <span>📁 Upload Image</span>
                    </button>
                  </>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#E8F5F0] border border-[#087F5B]/20 text-[11px] text-[#087F5B] font-mono text-center">
                Processed locally • Cloud upload: 0 bytes
              </div>
            </div>

            {/* RIGHT COLUMN: EXTRACTED VITALS & DEMO OCR LABEL */}
            <div className="lg:col-span-6">
              <div className="saas-card p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between p-3.5 rounded-xl bg-[#E8F5F0] border border-[#087F5B]/30 mb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold text-[#087F5B]">Values detected</h3>
                        <p className="text-[11px] text-[#66736D]">Verify extracted values before continuing.</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white text-[#087F5B] text-[10px] font-mono font-bold border border-[#087F5B]/30">
                      Demo Extraction
                    </span>
                  </div>

                  {/* Low Confidence Warning callout if < 90% */}
                  {isLowConfidence && (
                    <div className="p-3 rounded-xl bg-[#FFF5F5] border border-[#FFC9C9] text-[#E03131] text-xs font-bold flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-[#E03131]" />
                      <span>Low confidence — please verify manually.</span>
                    </div>
                  )}

                  {/* Extracted Vitals List with Inline Edit */}
                  <div className="space-y-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <span className="text-[11px] text-[#66736D] font-mono block">Blood Pressure</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <input
                            type="number"
                            value={ocrResult?.extractedVitals?.bpSystolic}
                            onChange={(e) => handleVitalEdit('bpSystolic', e.target.value)}
                            className="w-16 px-1.5 py-0.5 rounded bg-white border border-[#DCE7E2] font-mono font-bold text-xs"
                          />
                          <span>/</span>
                          <input
                            type="number"
                            value={ocrResult?.extractedVitals?.bpDiastolic}
                            onChange={(e) => handleVitalEdit('bpDiastolic', e.target.value)}
                            className="w-16 px-1.5 py-0.5 rounded bg-white border border-[#DCE7E2] font-mono font-bold text-xs"
                          />
                          <span className="text-xs text-[#66736D] font-mono">mmHg</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold shrink-0">
                        {ocrResult?.confidence || '96%'} confidence
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <span className="text-[11px] text-[#66736D] font-mono block">Pulse</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <input
                            type="number"
                            value={ocrResult?.extractedVitals?.pulse}
                            onChange={(e) => handleVitalEdit('pulse', e.target.value)}
                            className="w-20 px-1.5 py-0.5 rounded bg-white border border-[#DCE7E2] font-mono font-bold text-xs"
                          />
                          <span className="text-xs text-[#66736D] font-mono">bpm</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold shrink-0">
                        94% confidence
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <span className="text-[11px] text-[#66736D] font-mono block">SpO₂</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <input
                            type="number"
                            value={ocrResult?.extractedVitals?.spo2}
                            onChange={(e) => handleVitalEdit('spo2', e.target.value)}
                            className="w-20 px-1.5 py-0.5 rounded bg-white border border-[#DCE7E2] font-mono font-bold text-xs"
                          />
                          <span className="text-xs text-[#66736D] font-mono">%</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold shrink-0">
                        92% confidence
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <span className="text-[11px] text-[#66736D] font-mono block">Temperature</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <input
                            type="number"
                            step="0.1"
                            value={ocrResult?.extractedVitals?.temperature}
                            onChange={(e) => handleVitalEdit('temperature', e.target.value)}
                            className="w-20 px-1.5 py-0.5 rounded bg-white border border-[#DCE7E2] font-mono font-bold text-xs"
                          />
                          <span className="text-xs text-[#66736D] font-mono">°C</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold shrink-0">
                        91% confidence
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#DCE7E2]">
                  <button
                    onClick={() => {
                      setCapturedImage(null);
                      if (isCameraActive) startCamera();
                      else triggerLocalOcrProcess(selectedSample.id);
                    }}
                    className="px-4 py-3 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] font-bold text-xs hover:bg-[#E8F5F0] transition flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>

                  <button
                    onClick={handleContinueToTriage}
                    className="px-6 py-3.5 rounded-xl bg-[#087F5B] text-white font-bold text-xs hover:bg-[#075E49] transition shadow-md shadow-[#087F5B]/20 flex items-center gap-2"
                  >
                    <span>Continue to Triage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
