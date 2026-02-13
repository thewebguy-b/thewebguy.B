
import React from 'react';
/* Fix for motion component prop types */
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { ServiceDetail } from '../types.ts';

const services: ServiceDetail[] = [
  { 
    id: "brand",
    title: "Brand Strategy", 
    label: "Intelligence",
    desc: "We define the narrative that positions your product as a market leader from day one.",
    icon: "I.",
    longDesc: "Strategy is the blueprint of digital authority. We don't just design logos; we architect market dominance through precise positioning and narrative sovereignty.",
    methodology: ["Competitive Deconstruction", "Narrative Architecture", "Visual Sovereignty", "Market Positioning"],
    techStack: ["Brand Audit 2.0", "Archetype Mapping", "Psychological Profiling"],
    logicSnippet: `// thewebguy.b Identity Protocol
class Identity {
  constructor(vision) {
    this.core = vision.narrative;
    this.marketPosition = "LEADER";
    this.brandSuffix = ".b";
  }
  
  resonate(user) {
    return user.emotions.trigger(this.core);
  }
}`
  },
  { 
    id: "design",
    title: "Interface Design", 
    label: "Experience",
    desc: "High-fidelity UI systems built on user psychology and modern conversion standards.",
    icon: "II.",
    longDesc: "Interfaces should be felt, not just seen. thewebguy.b crafts digital environments that act as a natural extension of the human psyche through fluid motion.",
    methodology: ["Cognitive Friction Reduction", "Fluid Motion Systems", "Atomic Design Logic", "Accessibility First"],
    techStack: ["Figma Enterprise", "Framer Motion 12", "Adobe Suite"],
    logicSnippet: `// thewebguy.b Motion Logic
const interface = {
  responsiveness: "FLUID",
  stagger: 0.1,
  ease: [0.76, 0, 0.24, 1],
  render(context) {
    return context.elements.map(e => 
      e.animate({ opacity: 1, scale: 1 })
    );
  }
};`
  },
  { 
    id: "dev",
    title: "Full-Stack Dev", 
    label: "Execution",
    desc: "Robust, performant codebases using React, Next.js, and advanced cloud architectures.",
    icon: "III.",
    longDesc: "Performance is a core studio feature. We write clean, resilient code meant to withstand global traffic spikes without compromising on elegance or speed.",
    methodology: ["Edge Infrastructure", "TypeScript Sovereignty", "Micro-interaction Logic", "Cloudflare Optimization"],
    techStack: ["React 19", "Next.js", "Rust / WASM", "Tailwind CSS"],
    logicSnippet: `// thewebguy.b Node Deployment
export async function deploy(project) {
  const cluster = await node.provision();
  return cluster.compile({
    ssr: true,
    edge: "GLOBAL",
    cache: "OPTIMIZED",
    stack: ["thewebguy.b_core"]
  });
}`
  },
  { 
    id: "growth",
    title: "Product Growth", 
    label: "Scale",
    desc: "Iterative refinement and data-led design to scale user base and retention.",
    icon: "IV.",
    longDesc: "Launching is just the beginning. thewebguy.b provides the tactical monitoring and iterative polish required for product longevity and market scale.",
    methodology: ["Conversion Funnel Tuning", "Data-Led Iteration", "Retention Engineering", "A/B Performance Logic"],
    techStack: ["PostHog", "Mixpanel", "Google Analytics 4", "Heatmap Logic"],
    logicSnippet: `// thewebguy.b Growth Loop
while (product.active) {
  const data = await monitor.analytics();
  if (data.retention < studioThreshold) {
    product.optimize(data.frictionPoints);
  }
  await wait(TICK_RATE);
}`
  }
];

interface ServicesProps {
  onSelectService: (service: ServiceDetail) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40 mb-6 block"
          >
            Studio Core Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-white"
          >
            Architecting <br />
            <span className="serif italic font-light lowercase text-[#F4C2C2]">the intelligence.</span>
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/40 text-[10px] max-w-xs font-black uppercase tracking-widest leading-relaxed"
        >
          Specialized nodes of digital execution by thewebguy.b. Each module is engineered for maximum resonance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectService(s)}
            className="group relative p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-white/40 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col min-h-[480px]"
          >
            {/* Roman Numeral Accent */}
            <span className="text-5xl serif italic font-light text-white/10 group-hover:text-[#F4C2C2] transition-colors mb-16 block">
              {s.icon}
            </span>
            
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-4 block">
                {s.label}
              </span>
              <h4 className="text-3xl font-black uppercase tracking-tighter text-white mb-6 leading-tight group-hover:tracking-normal transition-all duration-500">
                {s.title}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed font-medium mb-10">
                {s.desc}
              </p>
            </div>

            {/* Interaction Indicator */}
            <div className="pt-8 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
               <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Module Details</span>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F4C2C2] group-hover:scale-110 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-slate-900" strokeWidth="3"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
               </div>
            </div>

            {/* Subtle Inner Glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F4C2C2]/5 rounded-full blur-[100px] group-hover:bg-[#F4C2C2]/10 transition-all duration-1000" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
