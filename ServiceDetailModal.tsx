
import React, { useEffect } from 'react';
/* Fix for motion component prop types */
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { X, ArrowRight, Activity, Zap, Terminal, Power } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  useEffect(() => {
    if (service) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[400] bg-[#8BA888] overflow-y-auto"
        >
          {/* Immersive Header */}
          <div className="relative h-[60vh] flex flex-col justify-center items-center px-6 text-center border-b border-white/10">
             {/* Background Roman Numeral */}
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-[50vw] serif italic font-light text-white">{service.icon}</span>
             </div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5, duration: 1.2 }}
               className="relative z-10"
             >
                <span className="text-[10px] font-black text-[#F4C2C2] uppercase tracking-[1em] mb-8 block">THEWEBGUY.B // Capability Node</span>
                <h2 className="text-7xl md:text-[10vw] font-black text-white uppercase tracking-tighter leading-none mb-12">{service.title}</h2>
                <div className="flex gap-4 justify-center">
                  {service.techStack.map(t => (
                    <span key={t} className="px-5 py-2 glass-light rounded-full text-[9px] font-black uppercase tracking-widest text-white/80">{t}</span>
                  ))}
                </div>
             </motion.div>

             {/* Close Utility */}
             <button 
                onClick={onClose}
                className="absolute top-10 right-10 group flex flex-col items-center gap-3"
             >
                <div className="w-16 h-16 rounded-full glass-light border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all shadow-2xl">
                   <X size={24} />
                </div>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Return to Studio</span>
             </button>
          </div>

          {/* Deep Intel Section */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-24 py-32 grid grid-cols-1 lg:grid-cols-12 gap-32">
             
             {/* Left: Narrative & Strategy */}
             <div className="lg:col-span-7 space-y-24">
                <section>
                   <div className="flex items-center gap-6 mb-12">
                      <Activity size={18} className="text-[#F4C2C2]" />
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Studio Methodology</h3>
                   </div>
                   <p className="text-3xl md:text-5xl text-white font-medium serif italic leading-[1.3] mb-12">
                      "{service.longDesc}"
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-4">Key Protocols</h4>
                         <ul className="space-y-4">
                            {service.methodology.map(m => (
                               <li key={m} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C2C2]" />
                                  {m}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-4">Studio Focus</h4>
                         <p className="text-sm font-medium text-white/60 leading-relaxed uppercase tracking-wide">
                            THEWEBGUY.B prioritizes high-fidelity outcomes through intentional technical constraint and artistic liberation.
                         </p>
                      </div>
                   </div>
                </section>
             </div>

             {/* Right: Logic & Code Execution */}
             <div className="lg:col-span-5">
                <div className="sticky top-12 space-y-12">
                   <div className="bg-slate-900 rounded-[3rem] p-12 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                      <div className="flex items-center justify-between mb-10">
                         <div className="flex gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500/30" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                         </div>
                         <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-white/20" />
                            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">node_0{service.id}.sys</span>
                         </div>
                      </div>
                      <pre className="text-[11px] md:text-xs font-mono text-[#F4C2C2]/80 leading-relaxed overflow-x-auto selection:bg-white selection:text-slate-900">
                         <code>{service.logicSnippet}</code>
                      </pre>
                      <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Zap size={14} className="text-emerald-400" />
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">Running Optimized</span>
                         </div>
                      </div>
                   </div>

                   <button 
                      onClick={() => window.location.href = 'mailto:thewebguy.b@gmail.com'}
                      className="w-full py-8 bg-white text-slate-900 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-[#F4C2C2] transition-all group"
                   >
                      Integrate with THEWEBGUY.B
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
             </div>
          </div>

          {/* Immersive Footer */}
          <div className="py-48 text-center bg-[#97b594] border-t border-white/5 flex flex-col items-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="max-w-xl"
             >
                <Power size={48} className="text-white/20 mx-auto mb-12" />
                <h3 className="text-6xl font-black text-white uppercase tracking-tighter mb-10 leading-none">The dialogue <br /> <span className="serif italic text-[#F4C2C2] font-light lowercase">begins</span> here.</h3>
                <button 
                   onClick={onClose}
                   className="px-16 py-6 border-2 border-white text-white rounded-full text-[10px] font-black uppercase tracking-[0.6em] hover:bg-white hover:text-slate-900 transition-all"
                >
                   Return to Interface
                 </button>
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
