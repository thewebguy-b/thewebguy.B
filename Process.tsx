
import React, { useRef, useEffect, useState } from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase, useMotionValue, animate } from 'framer-motion';
const motion = motionBase as any;
import ScannerBeam from './ui/ScannerBeam.tsx';

const steps = [
  { 
    id: '01', 
    title: 'DISCOVERY', 
    label: 'IMMERSION', 
    desc: 'Deep-diving into market behavior and product logic.',
    logic: `/**
 * @process Immersion
 * @input { MarketData, UserInterviews }
 */
function discover() {
  const context = analyze(raw_data);
  return blueprint(context);
}`
  },
  { 
    id: '02', 
    title: 'STRATEGY', 
    label: 'BLUEPRINT', 
    desc: 'Defining the technical and creative roadmap.',
    logic: `class StrategyFactory {
  constructor(goals) {
    this.roadmap = new Roadmap({
      tech: "Next.js + Cloudflare",
      design: "Luxury Minimalist"
    });
  }
}`
  },
  { 
    id: '03', 
    title: 'INTERFACE', 
    label: 'CRAFT', 
    desc: 'Developing a visual language that speaks authority.',
    logic: `const theme = {
  palette: ["#8BA888", "#F4C2C2"],
  motion: "framer-motion-v12",
  type: "Playfair Display",
  soul: true
};`
  },
  { 
    id: '04', 
    title: 'ENGINEERING', 
    label: 'SCALE', 
    desc: 'Building clean, resilient, and blazing fast systems.',
    logic: `export async function deploy() {
  const node = await cluster.provision();
  node.on('load', (val) => {
    if (val > 0.8) node.scaleOut();
  });
}`
  },
  { 
    id: '05', 
    title: 'REFINEMENT', 
    label: 'POLISH', 
    desc: 'Testing, tuning, and iterative perfection.',
    logic: `while (true) {
  const feedback = await monitor();
  if (feedback.isPerfect) break;
  iterate(feedback.points);
  refinePixels(1.05);
}`
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  // Triple the steps for a seamless looping effect
  const loopingSteps = [...steps, ...steps, ...steps];

  useEffect(() => {
    const checkIntersection = () => {
      const cards = document.querySelectorAll('.scannable-card-container');
      const scannerX = window.innerWidth / 2;
      let active = false;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardLeft = rect.left;
        const cardWidth = rect.width;
        
        const normalLayer = card.querySelector('.card-layer-normal') as HTMLElement;
        const logicLayer = card.querySelector('.card-layer-logic') as HTMLElement;

        // If the card is under the scanner beam
        if (rect.right > scannerX - 20 && rect.left < scannerX + 20) {
            active = true;
        }

        // Calculate reveal based on scanner position
        const relativeX = scannerX - cardLeft;
        const clipPercent = Math.max(0, Math.min(100, (relativeX / cardWidth) * 100));

        if (normalLayer) normalLayer.style.setProperty('--clip-right', `${100 - clipPercent}%`);
        if (logicLayer) logicLayer.style.setProperty('--clip-left', `${clipPercent}%`);
      });

      if (active !== isScanning) {
        setIsScanning(active);
        window.dispatchEvent(new CustomEvent('setScannerScanning', { detail: { active } }));
      }
      
      requestAnimationFrame(checkIntersection);
    };

    const animId = requestAnimationFrame(checkIntersection);
    return () => cancelAnimationFrame(animId);
  }, [isScanning]);

  return (
    <div ref={containerRef} className="relative py-48 bg-transparent overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/60 mb-8 block">Execution Flow</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
            THE <br />
            <span className="serif italic lowercase font-light text-[#F4C2C2]">standard</span> PROCESS.
          </h2>
        </motion.div>
      </div>

      {/* Automatic Looping Container */}
      <div className="relative w-full h-[450px] flex flex-col justify-center">
        {/* Scanner Beam is fixed in center */}
        <ScannerBeam />
        
        {/* Infinite Loop Marquee */}
        <div className="flex w-full">
          <motion.div 
            className="flex items-center gap-16 px-12 h-full"
            animate={{ x: [0, "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {loopingSteps.map((step, idx) => (
              <div key={`${step.id}-${idx}`} className="scannable-card-container group">
                {/* Step ID Marker */}
                <div className="absolute -top-12 left-0 flex items-center gap-3">
                  <span className="text-[10px] font-black text-white">{step.id}</span>
                  <div className="w-8 h-px bg-white/30" />
                </div>

                {/* Normal Layer */}
                <div className="card-layer card-layer-normal border border-white/20 glass-light p-10 flex flex-col justify-between backdrop-blur-md">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/70">{step.label}</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">{step.title}</h3>
                    <p className="text-white font-medium text-xs leading-relaxed max-w-[240px]">{step.desc}</p>
                  </div>
                </div>

                {/* Logic Layer (Revealed by Scanner) */}
                <div className="card-layer card-layer-logic shadow-2xl">
                  <div className="logic-content opacity-90">
                    <div className="text-[9px] text-[#F4C2C2] font-bold mb-4 uppercase tracking-widest">// SYSTEM DECODED</div>
                    {step.logic}
                    <div className="absolute bottom-6 right-8 text-[8px] font-bold text-white/50">
                        STATUS: OPTIMIZED
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 mt-20 flex justify-between items-end">
         <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Automation Mode</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Running Loop v2.0</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <p className="max-w-[240px] text-[10px] text-white/70 font-medium leading-relaxed uppercase">
              The scanner beam automatically decodes technical logic as each module passes through the core.
            </p>
         </div>
         <div className="hidden lg:block">
            <span className="serif italic text-white/[0.15] text-5xl">Engineered for absolute clarity.</span>
         </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[150px] pointer-events-none -z-10" />
    </div>
  );
};

export default Process;
