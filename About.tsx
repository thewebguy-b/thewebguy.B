
import React from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import InteractiveBook, { BookPage } from './ui/InteractiveBook.tsx';

const About: React.FC = () => {
  const pages: BookPage[] = [
    {
      title: "Silence of Authority",
      pageNumber: 1,
      content: (
        <div className="space-y-8">
          <p className="text-lg leading-relaxed italic text-slate-800 font-serif">
            "Design is the silent ambassador of your brand's intent."
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            THEWEBGUY.B operates on the principle that true luxury does not shout. It commands attention through absolute precision and intentional negative space.
          </p>
          <div className="pt-8 border-t border-slate-100 flex gap-4">
             <div className="w-1 h-1 bg-[#F4C2C2] rounded-full mt-1.5" />
             <p className="text-[11px] font-bold text-slate-500 uppercase leading-relaxed tracking-widest">Aesthetic Logic: Minimalism as a Power Move.</p>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-12 text-center p-4">
          <div className="text-5xl serif italic text-slate-200 opacity-50">01.</div>
          <blockquote className="text-xl font-serif font-black text-slate-800 leading-tight">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          <div className="space-y-2">
            <cite className="text-[10px] font-black uppercase tracking-[0.6em] text-[#F4C2C2] block">— Steve Jobs</cite>
            <div className="w-8 h-[1px] bg-slate-200 mx-auto" />
          </div>
        </div>
      )
    },
    {
      title: "Digital Permanence",
      pageNumber: 2,
      content: (
        <div className="space-y-8">
          <p className="text-sm leading-relaxed text-slate-600">
            In a world of flickering trends, THEWEBGUY.B builds for legacy. Our systems are engineered with modular resilience to outlast the hype cycles of the modern web.
          </p>
          <div className="grid grid-cols-2 gap-3">
             {["Modular", "Resilient", "Eternal", "Logic"].map(t => (
               <div key={t} className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 text-center uppercase tracking-[0.4em]">
                 {t}
               </div>
             ))}
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-12 p-4">
          <span className="text-[10px] font-black text-[#F4C2C2] uppercase tracking-[0.5em] block text-center">Foundational Core</span>
          <blockquote className="text-xl font-serif font-black text-slate-800 leading-tight italic text-center">
            "Good design is as little design as possible. Less, but better."
          </blockquote>
          <div className="text-center space-y-4">
            <cite className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-50">— Dieter Rams</cite>
            <p className="text-[9px] font-mono text-slate-300">REF: THEWEBGUY.B_DR_MANIF</p>
          </div>
        </div>
      )
    },
    {
      title: "Technical Poetics",
      pageNumber: 3,
      content: (
        <div className="space-y-8">
          <p className="text-sm leading-relaxed text-slate-600">
            We view the stack as a medium of art. From Rust-compiled backends to fluid React 19 interfaces, every line of code at THEWEBGUY.B is a brushstroke.
          </p>
          <div className="space-y-5">
             {[
               { l: "Architecture", v: "Edge Native" },
               { l: "Runtime", v: "Optimized" },
               { l: "Soul", v: "Embedded" }
             ].map(row => (
               <div key={row.l} className="flex justify-between items-end border-b border-slate-100 pb-2">
                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{row.l}</span>
                 <span className="text-[10px] font-mono text-[#F4C2C2] font-bold">{row.v}</span>
               </div>
             ))}
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-10 p-4 text-center">
          <div className="flex justify-center gap-1">
            {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-300" />)}
          </div>
          <blockquote className="text-xl font-serif font-black text-slate-800 leading-tight">
            "The details are not the details. They make the design."
          </blockquote>
          <cite className="text-[10px] font-black uppercase tracking-[0.6em] text-[#F4C2C2]">— Charles Eames</cite>
          <div className="pt-6 border-t border-slate-50">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engineered Performance</p>
          </div>
        </div>
      )
    },
    {
      title: "Human Resonance",
      pageNumber: 4,
      content: (
        <div className="space-y-8">
          <p className="text-sm leading-relaxed text-slate-700 font-medium">
            Interfaces should not just be usable; they should be resonant. We design for the human psyche, ensuring every interaction feels like a natural extension.
          </p>
          <div className="aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden relative group">
             <img 
               src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 transition-transform duration-[2s]" 
               alt="Empathy System"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
             <div className="absolute bottom-6 left-6">
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">THEWEBGUY.B // Empathy.sys</span>
             </div>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-12 p-4 text-center">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[1em] block">Conclusion</span>
          <blockquote className="text-xl font-serif font-black text-slate-800 leading-tight italic">
            "Content precedes design. Design in the absence of content is decoration."
          </blockquote>
          <cite className="text-[10px] font-black uppercase tracking-[0.6em] text-[#F4C2C2]">— Jeffrey Zeldman</cite>
          <div className="pt-8 flex justify-center gap-6">
             <div className="w-10 h-[1px] bg-slate-200" />
             <div className="w-2 h-2 rounded-full border border-slate-200" />
             <div className="w-10 h-[1px] bg-slate-200" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-48 bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Kinetic Text */}
            <div className="absolute -top-32 -left-20 text-[18vw] font-black text-white/[0.06] pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap uppercase">
               manifesto
            </div>

            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-[2px] bg-[#F4C2C2]" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/60">THEWEBGUY.B Soul</span>
            </div>
            
            <h2 className="text-6xl md:text-[5vw] font-black tracking-tighter uppercase leading-[0.85] mb-16 text-white">
              CRAFTING <br />
              <span className="text-[#F4C2C2] italic serif font-light lowercase">digital</span> ARTIFACTS.
            </h2>
            
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed serif italic max-w-xl mb-16">
              Our studio operates as a laboratory for digital elegance. Explore the principles that guide our every motion.
            </p>
            
            <div className="flex items-center gap-12 border-t border-white/20 pt-16">
               <div className="space-y-2">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block">Studio Identity</span>
                  <span className="text-2xl font-black text-white tracking-tighter uppercase">THEWEBGUY.B</span>
               </div>
               <div className="w-px h-12 bg-white/20" />
               <div className="space-y-2">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block">Status</span>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                     <span className="text-sm font-bold text-white uppercase tracking-widest">Classified</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-7 flex items-center justify-center min-h-[800px] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center relative z-20"
          >
            <InteractiveBook 
              coverImage="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80"
              bookTitle="Studio Manifesto"
              bookAuthor="THEWEBGUY.B"
              pages={pages}
            />
          </motion.div>
          
          {/* Enhanced Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#F4C2C2]/5 rounded-full blur-[200px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default About;
