
import React, { useState, useEffect } from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import MarqueeMenuItem from './MarqueeMenuItem.tsx';
import StudioPulse from './ui/StudioPulse.tsx';

interface NavbarProps {
  isForcedOpen?: boolean;
  setIsForcedOpen?: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isForcedOpen = false, setIsForcedOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync forced open state if provided
  useEffect(() => {
    if (isForcedOpen !== isOpen) {
      setIsOpen(isForcedOpen);
    }
  }, [isForcedOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (setIsForcedOpen) setIsForcedOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      handleClose();
    }
  };

  const links = [
    { 
      name: "Services", 
      href: "#services",
      marquee: [
        { text: "Architecture", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" },
        { text: "Identity", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop" },
        { text: "Systems", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" }
      ]
    },
    { 
      name: "Work", 
      href: "#work",
      marquee: [
        { text: "Archives", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
        { text: "Showcase", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" },
        { text: "Legacy", img: "https://images.unsplash.com/photo-1449156003053-96432b778721?q=80&w=2070&auto=format&fit=crop" }
      ]
    },
    { 
      name: "Process", 
      href: "#process",
      marquee: [
        { text: "Blueprint", img: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1932&auto=format&fit=crop" },
        { text: "Craft", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" },
        { text: "Logic", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" }
      ]
    },
    { 
      name: "About", 
      href: "#about",
      marquee: [
        { text: "Manifesto", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" },
        { text: "Studio", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" },
        { text: "Vision", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2070&auto=format&fit=crop" }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/thewebguy.b' },
    { name: 'Behance', href: 'https://www.behance.net/thewebguyboru' },
    { name: 'Dribbble', href: 'https://dribbble.com/thewebguy-b' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass-light px-8 py-4 rounded-full mx-6 shadow-sm border-white/40' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('#root'); }} className="text-xl font-black tracking-tighter flex items-center gap-3 group">
             <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rounded-lg group-hover:bg-slate-700 transition-colors duration-500 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
               <span className="text-white text-xs font-black uppercase">B.</span>
             </div>
             <span className="tracking-[0.05em] text-sm font-bold uppercase text-slate-900">THEWEBGUY.B</span>
          </a>

          <div className="flex items-center gap-8">
            <StudioPulse />
            <button 
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 glass-light rounded-full hover:scale-105 transition-transform shadow-sm border border-white/40"
              aria-label="Open Menu"
            >
              <div className="w-6 h-0.5 bg-slate-900" />
              <div className="w-6 h-0.5 bg-slate-900" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="navigation-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#F4C2C2] flex flex-col items-center justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-slate-900 pointer-events-none select-none tracking-tighter opacity-[0.05] uppercase">
              STUDIO
            </div>

            <button 
              onClick={handleClose}
              className="absolute top-10 right-10 w-16 h-16 flex items-center justify-center bg-slate-900 text-white rounded-full hover:rotate-90 transition-all duration-500 z-[110] shadow-xl"
              aria-label="Close Menu"
            >
              <span className="text-2xl leading-none">✕</span>
            </button>

            <div className="w-full flex flex-col relative z-10 py-20">
              {links.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                >
                  <MarqueeMenuItem 
                    title={l.name} 
                    marqueeItems={l.marquee} 
                    onClick={() => scrollToSection(l.href)}
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-16 text-center"
              >
                <a 
                  href="mailto:thewebguy.b@gmail.com"
                  className="text-[12px] font-bold uppercase tracking-[0.5em] text-slate-800 hover:text-slate-950 transition-colors"
                >
                  Inquire THEWEBGUY.B →
                </a>
              </motion.div>
            </div>
            
            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-12 z-10">
               {socialLinks.map(s => (
                 <a 
                  key={s.name} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-800 hover:text-slate-950 transition-colors"
                >
                  {s.name}
                </a>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
