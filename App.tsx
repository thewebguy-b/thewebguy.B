
import React, { useState, useEffect } from 'react';
/* Fix for motion component prop types by casting to any */
import { motion as motionBase, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';
const motion = motionBase as any;
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import BrandWheel from './components/BrandWheel.tsx';
import Services from './components/Services.tsx';
import Differentiation from './components/Differentiation.tsx';
import Work from './components/Work.tsx';
import Process from './components/Process.tsx';
import About from './components/About.tsx';
import CTA from './components/CTA.tsx';
import Footer from './components/Footer.tsx';
import CaseStudyModal from './components/CaseStudyModal.tsx';
import ServiceDetailModal from './components/ServiceDetailModal.tsx';
import LegalModal from './components/LegalModal.tsx';
import FloatingDock from './components/ui/FloatingDock.tsx';
import { CaseStudyProps, ServiceDetail } from './types.ts';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [onClick], [data-cursor]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const springConfig = { stiffness: 500, damping: 50, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none hidden md:block">
      <motion.div
        className="absolute w-5 h-5 border border-white rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.7 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent'
        }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimFinished, setIsAnimFinished] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CaseStudyProps | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [legalType, setLegalType] = useState<'legal' | 'privacy' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isAnimFinished) {
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAnimFinished]);

  const isDetailOpen = !!selectedProject || !!selectedService || !!legalType;

  return (
    <div className="relative min-h-screen bg-[#8BA888] overflow-x-hidden selection:bg-white selection:text-slate-900">
      <CustomCursor />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[110] bg-[#8BA888] flex items-center justify-center overflow-hidden"
            exit={{ 
              y: "-100%",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            <div className="flex flex-col items-center">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs font-bold tracking-[0.8em] text-white/40 uppercase mb-8"
              >
                Studio Node
              </motion.h2>
              
              <div className="flex items-center text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                  THEWEBGUY
                </motion.span>
                
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                  className="text-[#F4C2C2]"
                >
                  .
                </motion.span>
                
                <motion.span
                  initial={{ x: 300, y: -200, opacity: 0, rotate: -45 }}
                  animate={{ 
                    x: 0, 
                    y: [ -200, 0, -50, 0, -20, 0], 
                    opacity: 1, 
                    rotate: 0 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 1.4, 
                    ease: "easeOut",
                    y: {
                      duration: 1.5,
                      times: [0, 0.4, 0.6, 0.8, 0.9, 1],
                      ease: "easeOut"
                    }
                  }}
                  onAnimationComplete={() => setIsAnimFinished(true)}
                  className="inline-block"
                >
                  B
                </motion.span>
              </div>

              {/* Decorative loading bar */}
              <div className="mt-12 w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <Navbar isForcedOpen={isMenuOpen} setIsForcedOpen={setIsMenuOpen} />
            
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: isDetailOpen ? 0.97 : 1,
                filter: isDetailOpen ? 'blur(15px)' : 'blur(0px)',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              }}
            >
              <Hero />
              
              <section id="services">
                <Services onSelectService={setSelectedService} />
              </section>
              <section id="different"><Differentiation /></section>
              
              <BrandWheel />
              
              <section id="work">
                <Work onSelectProject={(p) => setSelectedProject(p)} />
              </section>
              <section id="process"><Process /></section>
              <section id="about"><About /></section>
              <CTA />
              <Footer onLegalOpen={() => setLegalType('legal')} onPrivacyOpen={() => setLegalType('privacy')} />
            </motion.div>

            <FloatingDock onMenuOpen={() => setIsMenuOpen(true)} />
            
            <ServiceDetailModal 
              service={selectedService} 
              onClose={() => setSelectedService(null)} 
            />

            <CaseStudyModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />

            <LegalModal 
              type={legalType} 
              onClose={() => setLegalType(null)} 
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
