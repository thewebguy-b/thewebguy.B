
import React, { useState, useEffect } from 'react';

const StudioPulse: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="hidden lg:flex items-center gap-6 px-6 py-2 glass-light rounded-full border border-white/20">
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-slate-900/40 uppercase tracking-widest">Studio Time</span>
        <span className="text-[10px] font-mono font-bold text-slate-900">{formatTime(time)}</span>
      </div>
      <div className="w-px h-6 bg-slate-900/10" />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-slate-900/40 uppercase tracking-widest">Status</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-slate-900 uppercase">Available</span>
        </div>
      </div>
    </div>
  );
};

export default StudioPulse;
