
import React from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;

const partners = [
  { name: "Sovereign", logo: "https://i.ibb.co/67jCNGpT/Google-AI-Studio-2025-12-08-T06-39-47-083-Z-1.png" },
  { name: "Aether", logo: "https://i.ibb.co/My5vp0C1/Generated-Image-November-13-2025-12-35-PM-1.png" },
  { name: "Nexus", logo: "https://i.ibb.co/nMsJcnK9/Screenshot-2025-10-15-123830-1.png" },
  { name: "Lumina", logo: "https://i.ibb.co/0jmD325X/Google-AI-Studio-2025-09-26-T04-08-02-049-Z-1.png" },
  { name: "Opal", logo: "https://i.ibb.co/j93VP2xQ/Google-AI-Studio-2025-07-27-T04-53-48-234-Z-Picsart-Crop-Image-removebg-preview.png" },
  { name: "Kinetix", logo: "https://i.ibb.co/8DhjQRs4/Google-AI-Studio-2025-09-15-T10-00-09-959-Z.png" },
  { name: "Prism", logo: "https://i.ibb.co/Kjg9DzG0/Black-and-White-Simple-Psychologist-Business-Card-removebg-preview.png" },
  { name: "Zenith", logo: "https://i.ibb.co/r2yHx5zJ/less-but-real-removebg-preview.png" }
];

const BrandWheel: React.FC = () => {
  // Duplicate the array to create a seamless loop
  const loopPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full py-32 bg-[#8BA888] overflow-hidden border-y border-white/10">
      
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/60 mb-4 block"
        >
          Studio Roster
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase"
        >
          Brands we’ve built for <br />
          <span className="serif italic font-light lowercase text-[#F4C2C2]">since the beginning.</span>
        </motion.h2>
      </div>

      {/* The Marquee Container */}
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex whitespace-nowrap gap-10 pr-10"
          animate={{ x: [0, "-33.333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {loopPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 w-52 h-52 md:w-64 md:h-64 bg-white/10 rounded-[3rem] border border-white/10 backdrop-blur-sm flex items-center justify-center p-12 transition-all duration-700 hover:border-white/40 hover:bg-white/20 hover:-translate-y-3 group/card cursor-none"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-full h-full object-contain opacity-70 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Soft edge fades to blend with #8BA888 */}
      <div className="absolute top-0 left-0 h-full w-48 bg-gradient-to-r from-[#8BA888] via-[#8BA888]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-48 bg-gradient-to-l from-[#8BA888] via-[#8BA888]/80 to-transparent z-10 pointer-events-none" />
      
      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default BrandWheel;
