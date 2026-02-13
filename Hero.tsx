
import React, { useRef, useEffect } from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { ArrowDownRight, Globe, Cpu, Layers } from 'lucide-react';
import PerspectiveGrid from './ui/PerspectiveGrid.tsx';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movements for parallax
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  // Parallax transforms
  const artRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const artRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const artTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const artTranslateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const textParallaxX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const textParallaxY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#8BA888] py-24"
    >
      <PerspectiveGrid />

      {/* Luxury Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ x: useTransform(smoothX, [-0.5, 0.5], [50, -50]), y: useTransform(smoothY, [-0.5, 0.5], [50, -50]) }}
          className="absolute top-1/4 -left-24 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ x: useTransform(smoothX, [-0.5, 0.5], [-80, 80]), y: useTransform(smoothY, [-0.5, 0.5], [80, -80]) }}
          className="absolute bottom-0 -right-48 w-[50vw] h-[50vw] bg-[#F4C2C2]/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
        
        {/* LEFT SIDE: Kinetic Content */}
        <div className="lg:col-span-7 flex flex-col items-start pt-10">
          
          {/* Status HUD Tag */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 glass-light rounded-full border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">System v.2025.B Active</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">Archive Vol. 001</span>
          </motion.div>

          {/* Main Typography Header */}
          <div className="relative">
            <motion.h1 
              style={{ x: textParallaxX, y: textParallaxY, opacity }}
              className="relative z-20 flex flex-col"
            >
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[8vw] lg:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter text-white"
              >
                Architecting
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="serif italic font-light lowercase text-6xl md:text-[7vw] lg:text-[9vw] text-[#F4C2C2] mt-2 ml-[2vw]"
              >
                digital legacies.
              </motion.span>
            </motion.h1>

            {/* Kinetic Watermark "B" */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.04, scale: 1 }}
              transition={{ duration: 2, delay: 0.1 }}
              className="absolute -top-[5vw] -left-[8vw] text-[40vw] font-black text-white pointer-events-none select-none leading-none z-10"
            >
              B
            </motion.span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-col md:flex-row items-start md:items-end gap-12"
          >
            <p className="max-w-md text-lg md:text-xl font-light text-white/70 leading-relaxed serif italic">
              "We synthesize technical rigor with poetic clarity to craft high-fidelity digital products for those who value 
              <span className="text-white font-medium not-italic"> architectural permanence.</span>"
            </p>
            
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                 {[
                   { icon: <Cpu size={12}/>, label: "Core", val: "Rust/React" },
                   { icon: <Globe size={12}/>, label: "Nodes", val: "Edge Global" }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-1 border-l border-white/20 pl-4">
                      <div className="flex items-center gap-2 text-white/40">
                        {item.icon}
                        <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.val}</span>
                   </div>
                 ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#F4C2C2', color: '#1a202c' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all flex items-center gap-4"
              >
                Initiate Dialogue
                <ArrowDownRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Visual Artifact */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end min-h-[500px]">
          <motion.div 
            style={{ 
              rotateX: artRotateX, 
              rotateY: artRotateY,
              x: artTranslateX,
              y: artTranslateY,
              scale 
            }}
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.4)] group bg-slate-900"
          >
            {/* Visual Layers for depth */}
            <div className="absolute inset-0 z-0">
               <img 
                src="https://www.21kschool.com/bh/wp-content/uploads/sites/18/2023/11/15-Facts-About-Coding-Every-Kid-Should-Know.png" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
                alt="Studio Visual Core"
              />
            </div>

            {/* Glass Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {/* Floating Technical HUD on Card */}
            <div className="absolute top-10 left-10 right-10 flex justify-between items-start z-10">
               <div className="flex flex-col gap-1">
                 <span className="text-[8px] font-black text-[#F4C2C2] uppercase tracking-[0.4em]">Node Index</span>
                 <span className="text-xl font-black text-white tracking-tighter">STUDIO_001</span>
               </div>
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                 <Layers size={14} className="text-white/40" />
               </div>
            </div>

            <div className="absolute bottom-10 left-10 z-10">
               <div className="overflow-hidden mb-2">
                 <motion.p 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  className="text-[10px] font-black text-[#F4C2C2] uppercase tracking-[0.6em]"
                 >
                   Conceptual Frame 01
                 </motion.p>
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none max-w-[200px]">
                 Technical <br /> Poetry.
               </h3>
            </div>

            {/* Interactive Shine */}
            <motion.div 
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                x: useTransform(smoothX, [-0.5, 0.5], [-300, 300])
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-12 p-6 glass-light border-white/20 rounded-3xl hidden md:block z-20 shadow-2xl backdrop-blur-2xl"
          >
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Logic Optimized</span>
               </div>
               <div className="h-px w-full bg-slate-900/10" />
               <p className="text-[10px] font-bold text-slate-900/60 uppercase tracking-widest max-w-[140px]">
                  Runtimes tuned for <span className="text-slate-900">maximum resonance.</span>
               </p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-black uppercase tracking-[1em] text-white/30 rotate-90 mb-4 origin-center">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
