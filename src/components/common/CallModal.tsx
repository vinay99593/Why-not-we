import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

export const CallModal: React.FC = () => {
  const { isCallModalOpen, setIsCallModalOpen, callPartnerName } = useApp();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callStatus, setCallStatus] = useState<'Connecting...' | 'Ringing...' | 'Connected'>('Connecting...');

  useEffect(() => {
    if (!isCallModalOpen) {
      setCallDuration(0);
      setCallStatus('Connecting...');
      return;
    }

    const t1 = setTimeout(() => {
      setCallStatus('Ringing...');
    }, 1000);

    const t2 = setTimeout(() => {
      setCallStatus('Connected');
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isCallModalOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCallModalOpen && callStatus === 'Connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallModalOpen, callStatus]);

  if (!isCallModalOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallModalOpen(false);
    setCallDuration(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 text-white p-8 text-center shadow-2xl flex flex-col items-center">
        {/* Status Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold mb-6">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Encrypted In-App Call</span>
        </div>

        {/* Avatar with pulse ring */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl">
            {callPartnerName ? callPartnerName.charAt(0) : 'P'}
          </div>
        </div>

        {/* Partner Name & Call Info */}
        <h3 className="text-xl font-bold font-display">{callPartnerName || 'Service Provider'}</h3>
        <p className="text-sm text-slate-400 mt-1">
          {callStatus === 'Connected' ? (
            <span className="text-emerald-400 font-mono font-semibold">{formatTime(callDuration)}</span>
          ) : (
            callStatus
          )}
        </p>

        {/* Audio features */}
        <div className="flex items-center justify-center gap-6 my-8 w-full">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Mute microphone"
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-4 rounded-full transition-all ${
              isSpeaker ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
            title="Speakerphone"
          >
            {isSpeaker ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="h-16 w-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
          title="End Call"
        >
          <PhoneOff className="h-7 w-7" />
        </button>
        <span className="text-xs text-slate-400 mt-3 font-medium">End Call</span>
      </div>
    </div>
  );
};
