
import React, { useEffect } from 'react';
/* Fix for motion component prop types */
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { X, Shield, FileText, Lock, Globe } from 'lucide-react';

interface LegalModalProps {
  type: 'legal' | 'privacy' | null;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (type) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [type]);

  const content = {
    legal: {
      title: "Terms of Sovereignty",
      subtitle: "Studio Engagement Protocol v1.0",
      icon: <FileText size={32} />,
      sections: [
        {
          num: "I.",
          label: "Engagement Architecture",
          text: "THEWEBGUY.B operates as a premium digital node. All studio engagements are structured around clear architectural milestones defined in the project blueprint. By initiating a project, you agree to the iterative feedback loops required for high-fidelity execution."
        },
        {
          num: "II.",
          label: "Intellectual Sovereignty",
          text: "All creative artifacts, codebases, and brand logics remain the technical property of THEWEBGUY.B until final deployment and settlement. Post-settlement, full IP sovereignty is transferred to the client, while the studio retains the right to archive artifacts for portfolio documentation."
        },
        {
          num: "III.",
          label: "Modular Liability",
          text: "The studio is committed to blazing-fast, performant code. However, THEWEBGUY.B is not liable for downstream failures caused by third-party APIs, legacy infrastructure, or user-initiated deviations from the core architectural logic."
        },
        {
          num: "IV.",
          label: "Jurisdiction",
          text: "All agreements are governed by digital common law and the specific jurisdiction of the studio's primary operating node. Disputes shall be resolved through direct architectural dialogue."
        }
      ]
    },
    privacy: {
      title: "Privacy Protocol",
      subtitle: "Data Integrity & Encryption Logic",
      icon: <Lock size={32} />,
      sections: [
        {
          num: "I.",
          label: "Data Minimalization",
          text: "THEWEBGUY.B adheres to a strict 'Less, but Better' data philosophy. We only collect the essential identifiers—email (thewebguy.b@gmail.com) and secure signal (WhatsApp +91 75594 21749)—necessary for direct studio communication."
        },
        {
          num: "II.",
          label: "Encrypted Channels",
          text: "All project dialogues are conducted through high-end encrypted nodes. We do not sell, leak, or expose your project logic to secondary market entities. Your vision is stored within our secure studio vault."
        },
        {
          num: "III.",
          label: "Right to Erasure",
          text: "Clients maintain full sovereignty over their personal data. At any point post-engagement, a request for 'Full System Wipe' will result in the permanent deletion of your contact identifiers from our active nodes."
        },
        {
          num: "IV.",
          label: "Tracking Policy",
          text: "This interface uses zero persistent tracking cookies. Our only metric is the resonance of our work. No third-party advertising pixels are integrated into the THEWEBGUY.B core."
        }
      ]
    }
  };

  const active = type ? content[type] : null;

  return (
    <AnimatePresence>
      {type && active && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[500] bg-slate-900/95 backdrop-blur-3xl overflow-y-auto"
        >
          {/* Immersive HUD */}
          <div className="max-w-[1000px] mx-auto px-6 py-32 relative">
            <button 
              onClick={onClose}
              className="fixed top-12 right-12 group flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                <X size={24} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Terminate View</span>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-32"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F4C2C2] shadow-2xl">
                  {active.icon}
                </div>
                <div>
                   <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] block mb-2">{active.subtitle}</span>
                   <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">{active.title}</h2>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
               {active.sections.map((s, i) => (
                 <motion.div
                   key={s.num}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + (i * 0.1) }}
                   className="space-y-8"
                 >
                    <div className="flex items-center gap-4">
                       <span className="text-2xl serif italic text-[#F4C2C2] font-light">{s.num}</span>
                       <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">{s.label}</h4>
                    </div>
                    <p className="text-sm font-medium text-white/60 leading-relaxed uppercase tracking-wide">
                      {s.text}
                    </p>
                 </motion.div>
               ))}
            </div>

            {/* Bottom Meta */}
            <div className="mt-48 pt-20 border-t border-white/5 flex flex-col items-center text-center gap-12">
               <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border border-white/10 border-dashed rounded-full flex items-center justify-center"
                  >
                     <Globe size={18} className="text-white/20" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Shield size={40} className="text-[#F4C2C2]/10" />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Studio Verification Node</p>
                  <p className="text-[9px] font-mono text-white/20">AUTH_KEY: THEWEBGUY.B_SECURE_7559421749</p>
                  <button 
                    onClick={onClose}
                    className="mt-12 px-12 py-5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#F4C2C2] transition-colors"
                  >
                    I Acknowledge Protocols
                  </button>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
