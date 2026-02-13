
import React, { useEffect, useRef } from 'react';
/* Fix for motion component prop types and missing Variants export */
import { motion as motionBase, AnimatePresence, useScroll, useTransform } from 'framer-motion';
const motion = motionBase as any;
type Variants = any;
import { CaseStudyProps } from '../types';

interface CaseStudyModalProps {
  project: CaseStudyProps | null;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 1, ease: [0.8, 0, 0.2, 1] }}
          ref={containerRef}
          className="fixed inset-0 z-[200] bg-[#8BA888] overflow-y-auto cursor-auto"
        >
          {/* Header Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="fixed top-0 left-0 w-full z-[210] p-6 md:p-10 flex justify-between items-center pointer-events-none"
          >
            <div className="glass-light px-6 py-3 rounded-full border-white/20 pointer-events-auto shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Archive / </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">{project.title}</span>
            </div>
            <button 
              onClick={onClose}
              className="group w-14 h-14 rounded-full glass-light border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#8BA888] transition-all pointer-events-auto shadow-sm"
            >
              <span className="text-xl">✕</span>
            </button>
          </motion.div>

          <div className="relative">
            {/* Hero Image Section */}
            <div className="relative w-full h-screen overflow-hidden bg-[#8BA888]">
              <motion.img 
                style={{ scale: heroScale, opacity: heroOpacity }}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                src={project.img} 
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#8BA888]" />
              
              <div className="absolute bottom-32 left-6 md:left-24 max-w-6xl">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/40 text-[10px] font-bold uppercase tracking-[0.8em] block mb-8"
                >
                  {project.category}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-white"
                >
                  {project.title}
                </motion.h1>
              </div>
            </div>

            {/* Narrative Body */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-[1400px] mx-auto px-6 md:px-24 py-32 grid grid-cols-1 lg:grid-cols-12 gap-32"
            >
              <div className="lg:col-span-4 space-y-16">
                <motion.div variants={staggerItem}>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8">Metadata</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Launch</span>
                      <span className="text-xs font-bold text-white">{project.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Status</span>
                      <span className="text-xs font-bold text-white">Deployed</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-10">Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map(t => (
                      <span key={t} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/60">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-8 space-y-40">
                <motion.section variants={staggerItem}>
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-px bg-white" />
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">The Challenge</h3>
                  </div>
                  <p className="text-3xl md:text-5xl text-white font-medium leading-[1.2] serif italic">
                    "{project.challenge}"
                  </p>
                </motion.section>

                <motion.section variants={staggerItem}>
                   <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-px bg-white" />
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">The Response</h3>
                  </div>
                   <p className="text-xl text-white/60 leading-relaxed font-medium max-w-2xl">
                    {project.solution}
                   </p>
                </motion.section>

                <motion.section variants={staggerItem} className="p-16 bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-sm">
                   <h3 className="text-3xl font-black uppercase tracking-tighter mb-16 text-white">Key Outcomes</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     {project.results.map((res, i) => (
                       <div key={i} className="flex flex-col gap-6">
                         <div className="text-5xl font-black text-white/10 leading-none">0{i + 1}</div>
                         <p className="text-lg font-bold uppercase tracking-widest text-white leading-snug">{res}</p>
                       </div>
                     ))}
                   </div>
                </motion.section>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="py-48 text-center bg-[#97b594] border-t border-white/5">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                 <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-10 block">End Session</span>
                 <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-white">Initiate <br /> <span className="serif italic text-[#F4C2C2] font-light lowercase">growth.</span></h2>
                 <button 
                   onClick={onClose}
                   className="px-20 py-8 bg-white text-[#8BA888] rounded-[2rem] text-sm font-bold uppercase tracking-widest shadow-xl hover:bg-[#F4C2C2] hover:text-white transition-all"
                 >
                   Return to Studio
                 </button>
               </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
