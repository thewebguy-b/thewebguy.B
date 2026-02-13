import React, { useRef, useState } from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { ShieldCheck, Lock, Unlock } from 'lucide-react';

const StudioMetric: React.FC<{ label: string, value: string, delay?: number }> = ({ label, value, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="flex flex-col gap-2 border-l border-white/20 pl-4 md:pl-6"
  >
    <span className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-[0.2em] md:tracking-[0.3em]">{label}</span>
    <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase">{value}</span>
  </motion.div>
);

const MagneticButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Disable magnetic on mobile
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.4);
      y.set((e.clientY - centerY) * 0.4);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className="relative w-40 h-40 md:w-64 md:h-64 rounded-full bg-white flex items-center justify-center overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute inset-0 bg-[#F4C2C2] scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full origin-center" />
      <div className="relative z-10 text-center">
        <span className="text-[10px] md:text-[12px] font-black text-slate-900 uppercase tracking-widest block mb-2">Initiate</span>
        <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">PROJECT</span>
      </div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 border border-slate-900/10 border-dashed rounded-full" 
      />
    </motion.button>
  );
};

const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [activeTab, setActiveTab] = useState<'status' | 'tech' | 'secure'>('status');
  const [isDecrypted, setIsDecrypted] = useState(false);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const tabs = {
    status: {
      title: "Uptime 99.9%",
      desc: "Our architecture is built for persistent availability and flawless execution across all global clusters."
    },
    tech: {
      title: "Rust / React / Next",
      desc: "The bleeding edge of performance. We deploy blazing fast systems wrapped in artistic clarity."
    },
    secure: {
      title: "Secure Channels",
      desc: "Direct access to the studio director. Communication encrypted through high-end signal nodes."
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-[#8BA888] overflow-hidden flex flex-col justify-center"
    >
      {/* Background Kinetic Text */}
      <motion.div 
        style={{ y, opacity: 0.08 }}
        className="absolute top-1/2 left-0 w-full flex justify-center pointer-events-none select-none"
      >
        <span className="text-[80vw] md:text-[60vw] font-black text-white tracking-tighter leading-none uppercase"> NEXUS </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
        
        {/* Left: Interactive Info Hub */}
        <div className="lg:col-span-6 space-y-12 md:space-y-24">
          <motion.div style={{ opacity }}>
             <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-12">
               LET'S BUILD <br />
               <span className="serif italic text-[#F4C2C2] font-light lowercase">meaningful</span> THINGS.
             </h2>
             <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
               <StudioMetric label="Established" value="2024.B" />
               <StudioMetric label="Execution" value="High.Res" delay={0.1} />
               <StudioMetric label="Studio Vol" value="001/Archive" delay={0.2} />
               <StudioMetric label="Latency" value="< 100ms" delay={0.3} />
             </div>
          </motion.div>

          {/* Interactive Console */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/20 backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="flex flex-wrap gap-4 md:gap-8 mb-8 md:mb-10 border-b border-white/10 pb-6">
              {(Object.keys(tabs) as Array<keyof typeof tabs>).map(key => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === key ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                >
                  {key}
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">{tabs[activeTab].title}</h4>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm">{tabs[activeTab].desc}</p>
                
                {activeTab === 'secure' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6"
                  >
                    <button 
                      onClick={() => setIsDecrypted(!isDecrypted)}
                      className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all group"
                    >
                      {isDecrypted ? <Unlock size={14} className="text-[#F4C2C2]" /> : <Lock size={14} className="text-white/40" />}
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">
                        {isDecrypted ? 'Signal Decrypted' : 'Decrypt Signal Node'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isDecrypted && (
                        <motion.a
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          href="https://wa.me/917559421749"
                          target="_blank"
                          className="text-base md:text-lg font-mono font-bold text-[#F4C2C2] hover:underline"
                        >
                          +91 75594 21749
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4C2C2]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        </div>

        {/* Right: The Project Initiator */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end gap-12">
           <MagneticButton onClick={() => window.location.href = 'mailto:thewebguy.b@gmail.com'} />
           
           <div className="text-center lg:text-right space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.4em] md:tracking-[0.5em]">Direct Access</span>
                <a href="mailto:thewebguy.b@gmail.com" className="text-xl md:text-2xl font-bold text-white hover:text-[#F4C2C2] transition-colors">thewebguy.b@gmail.com</a>
              </div>
              <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium">Global Operations // GMT +5:30</p>
           </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="absolute bottom-12 left-6 md:left-24 flex items-center gap-6 md:gap-12 opacity-40 pointer-events-none">
        <div className="flex items-center gap-3 md:gap-4">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
           <span className="text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest">System Online</span>
        </div>
        <div className="w-px h-6 md:h-8 bg-white/40" />
        <span className="text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest">© 2025 THEWEBGUY.B studio</span>
      </div>
    </section>
  );
};

export default CTA;