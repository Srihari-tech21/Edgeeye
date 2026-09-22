import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  WifiOff, 
  Cpu, 
  Smartphone, 
  Scan, 
  BrainCircuit, 
  FileCheck2, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  Database,
  Mic,
  FileText,
  Users,
  Shield,
  PlayCircle
} from 'lucide-react';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function LandingPage() {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] pb-20">
      
      {/* HERO SECTION */}
      <section id="home" className="relative pt-10 pb-16 border-b border-[#DCE7E2] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#087F5B] uppercase px-3 py-1 rounded-full bg-[#E8F5F0]">
                HEALTHCARE WITHOUT BORDERS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17211D] tracking-tight leading-[1.15]">
                Offline AI for <br />
                <span className="text-[#087F5B]">Frontline Healthcare.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#66736D] leading-relaxed max-w-xl">
                Turn a smartphone or laptop into a private, intelligent clinical assistant — even when the internet isn't available.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/app"
                  className="px-6 py-3.5 rounded-xl bg-[#087F5B] text-white font-bold text-sm hover:bg-[#075E49] transition shadow-md shadow-[#087F5B]/20 flex items-center gap-2"
                >
                  <span>Try EdgeAyu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={scrollToHowItWorks}
                  className="px-6 py-3.5 rounded-xl bg-[#F7FAF9] border border-[#DCE7E2] text-[#17211D] font-bold text-sm hover:bg-[#E8F5F0] transition flex items-center gap-2"
                >
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Three Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#DCE7E2]">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#F7FAF9]">
                  <div className="p-1.5 rounded-lg bg-[#E8F5F0] text-[#087F5B]">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#17211D]">Works Offline</div>
                    <div className="text-[11px] text-[#66736D]">No internet required</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#F7FAF9]">
                  <div className="p-1.5 rounded-lg bg-[#E8F5F0] text-[#087F5B]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#17211D]">Private by Design</div>
                    <div className="text-[11px] text-[#66736D]">Your data stays local</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#F7FAF9]">
                  <div className="p-1.5 rounded-lg bg-[#E8F5F0] text-[#087F5B]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#17211D]">Built for Communities</div>
                    <div className="text-[11px] text-[#66736D]">For frontline health workers</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column Image & Floating Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE7E2] shadow-xl">
                <img
                  src="/hero_health_worker.jpg"
                  alt="Frontline healthcare worker using tablet with patient"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />

                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#DCE7E2] shadow-lg flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#087F5B] animate-pulse"></div>
                  <div>
                    <div className="text-xs font-bold text-[#087F5B] font-mono tracking-wide">
                      ● LOCAL PROCESSING
                    </div>
                    <div className="text-xs text-[#66736D]">
                      No cloud AI required
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SEE EDGEAYU IN ACTION DEMO SECTION */}
      <section className="py-16 bg-[#E8F5F0]/40 border-b border-[#DCE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#087F5B] uppercase tracking-widest block mb-2">
              PRODUCT DEMONSTRATION
            </span>
            <h2 className="text-3xl font-extrabold text-[#17211D]">
              See EdgeAyu in Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="saas-card p-6 border-[#087F5B]/30 relative text-center">
              <div className="w-10 h-10 rounded-full bg-[#087F5B] text-white font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">Capture</h3>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Vitals / Symptoms / Notes through phone camera OCR or speech recognition.
              </p>
            </div>

            <div className="saas-card p-6 border-[#087F5B]/30 relative text-center">
              <div className="w-10 h-10 rounded-full bg-[#087F5B] text-white font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">Process Locally</h3>
              <p className="text-xs text-[#66736D] leading-relaxed">
                OCR + WHO Guidelines + Local AI reasoning directly inside device memory.
              </p>
            </div>

            <div className="saas-card p-6 border-[#087F5B]/30 relative text-center">
              <div className="w-10 h-10 rounded-full bg-[#087F5B] text-white font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">Triage & Digitize</h3>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Priority rating + Explanation + Structured digital record creation.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#087F5B] text-white font-bold text-sm hover:bg-[#075E49] transition shadow-md shadow-[#087F5B]/20"
            >
              <span>Try Interactive Demo →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-16 bg-[#F7FAF9] border-b border-[#DCE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#087F5B] uppercase tracking-widest block mb-2">
              THE RURAL HEALTHCARE CHALLENGE
            </span>
            <h2 className="text-3xl font-extrabold text-[#17211D]">
              Healthcare shouldn't depend on connectivity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="saas-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9DB] text-[#F59F00] flex items-center justify-center font-bold mb-4">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">Unreliable Connectivity</h3>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Rural clinics and community health workers frequently operate in low-bandwidth or zero-grid areas where web tools fail.
              </p>
            </div>

            <div className="saas-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center font-bold mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">Cloud AI Dependency</h3>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Standard AI APIs rely on cloud servers, introducing network latency and privacy risks when transmitting patient data.
              </p>
            </div>

            <div className="saas-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center font-bold mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">Paper-Based Records</h3>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Manual paper notes and physical vital monitor screens lead to transcription errors and lost patient histories.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#E8F5F0] border border-[#087F5B]/30 text-center max-w-2xl mx-auto">
            <span className="text-sm font-bold text-[#087F5B]">
              "EdgeAyu brings intelligence to the edge."
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-white border-b border-[#DCE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#087F5B] uppercase tracking-widest block mb-2">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl font-extrabold text-[#17211D]">
              Four Steps to Offline Clinical Triage
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="saas-card p-6 relative">
              <span className="text-2xl font-black text-[#087F5B]/30 font-mono block mb-2">01</span>
              <div className="flex items-center gap-2 font-bold text-[#17211D] mb-2">
                <Scan className="w-5 h-5 text-[#087F5B]" />
                <span>Capture</span>
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Camera, voice or text input directly through the device interface.
              </p>
            </div>

            <div className="saas-card p-6 relative">
              <span className="text-2xl font-black text-[#087F5B]/30 font-mono block mb-2">02</span>
              <div className="flex items-center gap-2 font-bold text-[#17211D] mb-2">
                <BrainCircuit className="w-5 h-5 text-[#087F5B]" />
                <span>Understand</span>
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Local OCR vision and speech processing extract structured parameters.
              </p>
            </div>

            <div className="saas-card p-6 relative">
              <span className="text-2xl font-black text-[#087F5B]/30 font-mono block mb-2">03</span>
              <div className="flex items-center gap-2 font-bold text-[#17211D] mb-2">
                <Activity className="w-5 h-5 text-[#087F5B]" />
                <span>Triage</span>
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Guideline-assisted AI reasoning checks WHO protocols on-device.
              </p>
            </div>

            <div className="saas-card p-6 relative">
              <span className="text-2xl font-black text-[#087F5B]/30 font-mono block mb-2">04</span>
              <div className="flex items-center gap-2 font-bold text-[#17211D] mb-2">
                <FileCheck2 className="w-5 h-5 text-[#087F5B]" />
                <span>Digitize</span>
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                Structured clinical records stored in local encrypted memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section id="features" className="py-16 bg-[#F7FAF9] border-b border-[#DCE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#087F5B] uppercase tracking-widest block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl font-extrabold text-[#17211D]">
              Built for Frontline Efficiency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="saas-card p-6 saas-card-hover">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center font-bold mb-4">
                <Scan className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">1. Vitals Scanner</h3>
              <p className="text-xs text-[#66736D] leading-relaxed mb-4">
                Capture readings from BP monitors, pulse oximeters, and clinical documents using on-device OCR.
              </p>
              <span className="px-2.5 py-1 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold">
                Local Vision Engine
              </span>
            </div>

            <div className="saas-card p-6 saas-card-hover">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center font-bold mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">2. Symptom Intelligence</h3>
              <p className="text-xs text-[#66736D] leading-relaxed mb-4">
                Capture symptoms through voice or text and structure them automatically for clinical review.
              </p>
              <span className="px-2.5 py-1 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold">
                Speech NLP Engine
              </span>
            </div>

            <div className="saas-card p-6 saas-card-hover">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#087F5B] flex items-center justify-center font-bold mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#17211D] mb-2">3. Clinical Digitization</h3>
              <p className="text-xs text-[#66736D] leading-relaxed mb-4">
                Convert handwritten and unstructured information into searchable digital records.
              </p>
              <span className="px-2.5 py-1 rounded bg-[#E8F5F0] text-[#087F5B] text-[10px] font-mono font-bold">
                Structured Local DB
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="py-16 bg-white border-b border-[#DCE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#087F5B] uppercase tracking-widest block mb-2">
              PRIVACY ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold text-[#17211D]">
              Private by architecture.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="saas-card p-6 border-slate-300">
              <h3 className="text-xs font-mono font-bold text-[#66736D] uppercase mb-4">Traditional Cloud AI</h3>
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#66736D] gap-2 p-4 rounded-xl bg-[#F7FAF9]">
                <span>Patient</span>
                <span>→</span>
                <span>Internet</span>
                <span>→</span>
                <span>Cloud API</span>
                <span>→</span>
                <span>Response</span>
              </div>
            </div>

            <div className="saas-card p-6 border-[#087F5B]/40 bg-[#E8F5F0]/30">
              <h3 className="text-xs font-mono font-bold text-[#087F5B] uppercase mb-4">EdgeAyu Architecture</h3>
              <div className="flex flex-wrap items-center justify-between text-xs font-mono font-bold text-[#087F5B] gap-2 p-4 rounded-xl bg-white border border-[#087F5B]/20">
                <span>Patient</span>
                <span>→</span>
                <span>Phone</span>
                <span>→</span>
                <span>Local AI Engine</span>
                <span>→</span>
                <span>Response</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="saas-card p-4 text-center">
              <div className="text-xs text-[#66736D] font-mono mb-1">INTERNET</div>
              <div className="text-base font-bold text-[#17211D] font-mono">OFF</div>
            </div>
            <div className="saas-card p-4 text-center">
              <div className="text-xs text-[#66736D] font-mono mb-1">CLOUD API</div>
              <div className="text-base font-bold text-[#17211D] font-mono">NONE</div>
            </div>
            <div className="saas-card p-4 text-center">
              <div className="text-xs text-[#66736D] font-mono mb-1">DATA UPLOAD</div>
              <div className="text-base font-bold text-[#17211D] font-mono">0 BYTES</div>
            </div>
            <div className="saas-card p-4 text-center border-[#087F5B]">
              <div className="text-xs text-[#087F5B] font-mono mb-1">PROCESSING</div>
              <div className="text-base font-bold text-[#087F5B] font-mono">LOCAL</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-[#F7FAF9]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17211D] mb-4">
            Healthcare intelligence, wherever it's needed.
          </h2>
          <p className="text-[#66736D] text-base mb-8 max-w-xl mx-auto">
            Experience the EdgeAyu prototype in action today.
          </p>

          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#087F5B] text-white font-bold text-base hover:bg-[#075E49] transition shadow-md shadow-[#087F5B]/20"
          >
            <span>Try EdgeAyu</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#DCE7E2] py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#66736D]">
          <p className="mb-2">EdgeAyu — Offline AI Triage & Digitization Agent Prototype</p>
          <DisclaimerBanner compact />
        </div>
      </footer>
    </div>
  );
}
