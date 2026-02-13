
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseStudyProps } from '../types.ts';

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    id: "01",
    label: "WEB ARCHITECTURE",
    layout: "left",
    link: "https://loopbits.netlify.app/",
    title: (
      <>
        Synthesizing audio<br />
        and logic with 
        <span className="type__expand inline-flex items-center mx-4">
          <span className="type__expand-img rounded-full overflow-hidden inline-block align-middle">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/vxcvqkgY/Screenshot-2026-02-12-180524.png)' }}></span>
          </span>
          <span className="anim text-white ml-4">Loopbits.</span>
        </span>
      </>
    ),
    description: "A DEEP DIVE INTO PROCEDURAL AUDIO GENERATION AND MODERN WEB INTERFACES. WE ENGINEERED A SEAMLESS SONIC EXPERIENCE THAT TRANSCENDS TRADITIONAL BROWSER LIMITATIONS THROUGH SPATIAL UI DESIGN."
  },
  {
    id: "02",
    label: "PLATFORM DESIGN",
    layout: "center",
    link: "https://jobvisit.netlify.app/",
    title: (
      <>
        Redefining the<br />
        career portal at<br />
        <span className="type__expand inline-flex items-center justify-center w-full my-4">
          <span className="text-right mr-4 text-white">JobVisit </span>
          <span className="type__expand-img rounded-full overflow-hidden inline-block align-middle">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/hRD3hxr4/Screenshot-2026-02-12-181237.png)' }}></span>
          </span>
          <span className="anim italic serif lowercase ml-4 text-[#F4C2C2]">ecosystem.</span>
        </span>
      </>
    ),
    description: "STRATEGIC UI/UX FOR HIGH-VOLUME RECRUITMENT. WE FOCUSED ON REDUCING COGNITIVE FRICTION BETWEEN TALENT AND OPPORTUNITY, BUILDING A ROBUST INFRASTRUCTURE CAPABLE OF SCALING WITH GLOBAL DEMAND."
  },
  {
    id: "03",
    label: "IDENTITY ARCHIVE",
    layout: "right",
    link: "https://yashborane.netlify.app/",
    title: (
      <>
        A digital canvas<br />
        for personal 
        <span className="type__expand block w-full my-6">
          <span className="type__expand-img rounded-full overflow-hidden block ml-auto mr-0">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/HDWBkYD7/Screenshot-2026-02-12-181425.png)' }}></span>
          </span>
        </span>
        branding mastery.
      </>
    ),
    description: "CRAFTING A PERSONAL LEGACY THROUGH MINIMALIST TYPOGRAPHY AND INTENTIONAL MOTION. THIS PORTFOLIO ARCHITECTURE SERVES AS A TESTAMENT TO THE POWER OF SILENCE IN DIGITAL STORYTELLING."
  },
  {
    id: "04",
    label: "MINIMALIST COMMERCE",
    layout: "left",
    link: "https://lessbutreal.netlify.app/",
    title: (
      <>
        The philosophy<br />
        of curated 
        <span className="type__expand inline-flex items-center mx-4">
          <span className="type__expand-img rounded-full overflow-hidden inline-block align-middle">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/pvnRK1k4/Screenshot-2026-02-12-181009.png)' }}></span>
          </span>
          <span className="anim text-[#F4C2C2] ml-4">essentialism.</span>
        </span>
      </>
    ),
    description: "LESS BUT REAL REPRESENTS A SHIFT IN E-COMMERCE THINKING. WE STRIPPED AWAY THE NOISE TO FOCUS ON THE PRODUCT, CREATING A TACTILE DIGITAL ENVIRONMENT THAT HONORS CRAFTSMANSHIP AND QUALITY."
  },
  {
    id: "05",
    label: "CULTURAL RETAIL",
    layout: "center",
    link: "https://tyohaar-kart.netlify.app/",
    title: (
      <>
        Bridging tradition<br />
        and modern 
        <span className="type__expand inline-flex items-center justify-center w-full my-4">
          <span className="type__expand-img rounded-full overflow-hidden inline-block align-middle">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/G3MnV4cg/Screenshot-2025-10-15-102413.png)' }}></span>
          </span>
          <span className="anim italic serif lowercase ml-4 text-white">convenience.</span>
        </span>
      </>
    ),
    description: "TYOHAAR KART IS A CELEBRATION OF CULTURAL COMMERCE. WE ARCHITECTED A SCALABLE MARKETPLACE THAT PRESERVES THE VIBRANCY OF TRADITION WHILE LEVERAGING THE VELOCITY OF MODERN WEB TECHNOLOGY."
  },
  {
    id: "06",
    label: "INDUSTRIAL LOGIC",
    layout: "right",
    link: "https://dpl-4.netlify.app/",
    title: (
      <>
        Engineering the<br />
        future of
        <span className="type__expand block w-full my-6">
          <span className="type__expand-img rounded-full overflow-hidden block ml-auto mr-0">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/Xf2zVPzQ/Screenshot-2025-10-15-102639.png)' }}></span>
          </span>
        </span>
        system DPL-4.
      </>
    ),
    description: "A MASTERCLASS IN TECHNICAL PRECISION and UI RIGOR. DPL-4 WAS BUILT FOR OPERATIONAL EFFICIENCY, TRANSLATING COMPLEX INDUSTRIAL DATA INTO AN ELEGANT, ACTIONABLE DASHBOARD ARCHITECTURE."
  },
  {
    id: "07",
    label: "FINTECH SOLUTIONS",
    layout: "left",
    link: "https://sidehustlecapital.netlify.app/",
    title: (
      <>
        Democratizing<br />
        capital for the 
        <span className="type__expand inline-flex items-center mx-4">
          <span className="type__expand-img rounded-full overflow-hidden inline-block align-middle">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/zhZRBPSP/Screenshot-2025-10-15-102950.png)' }}></span>
          </span>
          <span className="anim text-white ml-4">next era.</span>
        </span>
      </>
    ),
    description: "SIDEHUSTLE CAPITAL IS WHERE FINTECH MEETS HUMAN ASPIRATION. WE DESIGNED A SECURE, TRANSPARENT PLATFORM THAT EMPOWERS MODERN ENTREPRENEURS THROUGH INTELLIGENT ASSET MANAGEMENT."
  },
  {
    id: "08",
    label: "ECOMMERCE ARCHITECTURE",
    layout: "center",
    link: "https://rcbricks.netlify.app/",
    title: (
      <>
        Scaling modular<br />
        commerce with
        <span className="type__expand inline-flex items-center justify-center w-full my-4">
          <span className="type__expand-img rounded-full overflow-hidden inline-block align-middle">
            <span className="type__expand-img-inner h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/JRkLxwJV/889shots-so.png)' }}></span>
          </span>
          <span className="anim italic serif lowercase ml-4 text-[#F4C2C2]">RC Bricks.</span>
        </span>
      </>
    ),
    description: "A COMPREHENSIVE E-COMMERCE ECOSYSTEM BUILT FOR SCALE. WE FOCUSED ON A MODULAR DESIGN SYSTEM THAT REFLECTS THE PRODUCT'S CORE PHILOSOPHY, INTEGRATING SEAMLESS CHECKOUT FLOWS AND HIGH-PERFORMANCE VISUALS."
  }
];

interface WorkProps {
  onSelectProject: (project: CaseStudyProps) => void;
}

const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.work-section') as HTMLElement[];

    sections.forEach((section) => {
      const expandImg = section.querySelector('.type__expand-img');
      const innerImg = section.querySelector('.type__expand-img-inner');
      const animText = section.querySelector('.anim');
      
      const isMobile = window.innerWidth < 768;

      gsap.fromTo(expandImg, 
        { width: 0 },
        {
          width: isMobile ? '60vw' : '30vw',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(innerImg,
        { scale: 1.6, yPercent: -30 },
        {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      if (animText) {
        gsap.fromTo(animText,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true,
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-transparent pb-32 md:pb-64">
      {workItems.map((item) => (
        <section 
          key={item.id} 
          className="work-section relative w-full px-6 md:px-12 pt-24 md:pt-64 flex flex-col overflow-hidden"
        >
          <div className={`w-full flex ${item.layout === 'right' ? 'justify-end' : item.layout === 'center' ? 'justify-center' : 'justify-start'} mb-8`}>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] text-white/70 uppercase">
              — {item.label}
            </span>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start ${item.layout === 'right' ? 'text-right' : item.layout === 'center' ? 'text-center' : 'text-left'}`}>
            <div 
              className={`lg:col-span-12 xl:col-span-10 cursor-pointer group/title ${item.layout === 'right' ? 'xl:col-start-3' : item.layout === 'center' ? 'xl:col-start-2' : ''}`}
              onClick={() => window.open(item.link, '_blank')}
            >
              <h2 className="serif text-[9vw] md:text-[5vw] leading-[1.1] text-white font-normal tracking-tight transition-opacity group-hover/title:opacity-80 break-words">
                {item.title}
              </h2>
            </div>

            <div className={`lg:col-span-4 mt-8 md:mt-24 ${
              item.layout === 'left' ? 'lg:col-start-8 text-left' : 
              item.layout === 'right' ? 'lg:col-start-1 text-left' : 
              'lg:col-start-5 text-center'
            }`}>
              <p className="text-[10px] md:text-[11px] font-medium leading-relaxed tracking-widest text-white/80 uppercase mb-8">
                {item.description}
              </p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-[9px] md:text-[10px] font-black text-[#F4C2C2] uppercase tracking-[0.3em] md:tracking-[0.4em] border-b border-[#F4C2C2]/50 pb-1 hover:border-[#F4C2C2] transition-colors"
              >
                Visit Live Project →
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Work;
