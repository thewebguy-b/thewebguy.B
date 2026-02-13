
import React from 'react';
import { motion } from 'framer-motion';

const Differentiation: React.FC = () => {
  return (
    <div className="py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/40 mb-8 block">The Philosophy</span>
            <h2 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-white mb-12">
              Beyond<br />
              <span className="serif italic font-light lowercase text-[#F4C2C2]">aesthetics.</span>
            </h2>
            <p className="text-xl font-medium serif italic leading-relaxed text-white/60 max-w-md">
              "We believe that true luxury in the digital space is the seamless marriage of high-level engineering and emotional resonance."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-10 bg-white/5 rounded-[2.5rem] backdrop-blur-sm border border-white/10 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-4 block">Core 01</span>
                <h4 className="text-xl font-bold uppercase mb-4 text-white">User Sovereignty</h4>
                <p className="text-white/60 text-xs font-medium leading-relaxed">
                  Every pixel is calculated for clarity, speed, and cognitive ease.
                </p>
             </div>
             <div className="p-10 bg-white/5 rounded-[2.5rem] backdrop-blur-sm border border-white/10 shadow-sm md:mt-12">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-4 block">Core 02</span>
                <h4 className="text-xl font-bold uppercase mb-4 text-white">Elite Ops</h4>
                <p className="text-white/60 text-xs font-medium leading-relaxed">
                  Scalable, modern architectures that support rapid growth without friction.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Differentiation;
