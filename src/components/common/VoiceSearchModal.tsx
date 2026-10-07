import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (query: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onTranscript,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const [simulationCountdown, setSimulationCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setSimulationCountdown(null);
      return;
    }

    // Check for web speech recognition support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();

        return () => {
          try {
            recognition.stop();
          } catch (e) {
            // Ignore
          }
        };
      } catch (err) {
        setRecognitionSupported(false);
      }
    } else {
      setRecognitionSupported(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulate = (sample: string) => {
    setTranscript(sample);
    setIsListening(false);
    setTimeout(() => {
      onTranscript(sample);
      onClose();
    }, 400);
  };

  const handleApply = () => {
    if (transcript.trim()) {
      onTranscript(transcript.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close voice search"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ambient pulse */}
        <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-60" />
          <div className="absolute inset-2 rounded-full bg-blue-500/30 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Mic className="h-8 w-8 animate-bounce" />
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 font-display">
          {isListening ? 'Listening to your voice...' : 'Speak what you need'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Say "Electrician", "Order water cans", "AC service", or "Hotels in Hyderabad"
        </p>

        {/* Live speech transcription display */}
        <div className="mt-5 min-h-[56px] p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 flex items-center justify-center">
          {transcript ? (
            <span className="text-primary font-bold">"{transcript}"</span>
          ) : (
            <span className="text-slate-400 italic font-normal">Listening for audio speech...</span>
          )}
        </div>

        {transcript && (
          <button
            onClick={handleApply}
            className="mt-4 w-full py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <span>Search "{transcript}"</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {/* Voice Samples / One-Tap Simulation */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-left">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Or try voice voice sample:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Need Electrician immediately',
              'Book AC repair service',
              'Order 20L Water Can',
              'Hotels in Hyderabad',
              'Plumber pipe leakage',
              'Milk and vegetables delivery',
            ].map((sample) => (
              <button
                key={sample}
                onClick={() => handleSimulate(sample)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/80 text-slate-700 hover:text-primary text-xs font-semibold transition-all hover:scale-102 cursor-pointer flex items-center gap-1.5"
              >
                <Volume2 className="h-3 w-3 text-slate-400" />
                <span>{sample}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
