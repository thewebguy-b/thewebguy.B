import React, { useState, useEffect } from 'react';
/* Fix for motion component prop types and missing Variants export */
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
type Variants = any;
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight, RefreshCcw, X, BookOpen } from 'lucide-react';

export interface BookPage {
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
  backContent?: React.ReactNode;
  pageNumber: number;
}

export interface InteractiveBookProps {
  coverImage: string;
  bookTitle?: string;
  bookAuthor?: string;
  pages: BookPage[];
  className?: string;
  width?: number;
  height?: number;
}

export default function InteractiveBook({
  coverImage,
  bookTitle = "Book Title",
  bookAuthor = "Author Name",
  pages,
  className,
  width = 400,
  height = 580,
}: InteractiveBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const targetWidth = isOpen ? width * 2 + 120 : width + 100;
      if (screenWidth < targetWidth) {
        setScale((screenWidth - 40) / targetWidth);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, width]);

  const handleOpenBook = () => setIsOpen(true);
  const handleCloseBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setCurrentPageIndex(-1);
  };

  const nextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPageIndex < pages.length - 1) setCurrentPageIndex((prev) => prev + 1);
  };

  const prevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPageIndex >= 0) setCurrentPageIndex((prev) => prev - 1);
  };

  const restartBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPageIndex(-1);
  };

  const coverVariants: Variants = {
    closed: { rotateY: 0, zIndex: 100, transition: { rotateY: { duration: 1, ease: [0.76, 0, 0.24, 1] } } },
    hoverClosed: { rotateY: -25, transition: { rotateY: { duration: 0.5, ease: "easeOut" } } },
    open: { rotateY: -180, zIndex: 0, transition: { rotateY: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } } }
  };

  return (
    <div
      className={cn("relative flex items-center justify-center perspective-[3000px] py-10", className)}
      style={{ 
        width: isOpen ? width * 2 + 120 : width + 100, 
        height: height + 100,
        transition: "width 1.2s cubic-bezier(0.76, 0, 0.24, 1), transform 0.5s ease",
        transform: `scale(${scale})`
      }}
    >
      <div
        className={cn(
          "relative transition-all duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          isOpen ? "translate-x-[25%]" : "translate-x-0"
        )}
        style={{ width, height, transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Shadow */}
        <div className={cn(
            "absolute inset-y-8 -left-8 bg-black/40 blur-[80px] -z-10 rounded-xl pointer-events-none transition-all duration-1000",
            isOpen ? "w-[200%] opacity-20" : "w-full opacity-40"
        )} />

        {/* Front Cover */}
        <motion.div
          className="absolute inset-0 w-full h-full origin-left cursor-pointer"
          initial="closed"
          animate={isOpen ? "open" : (isHovering ? "hoverClosed" : "closed")}
          variants={coverVariants}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={!isOpen ? handleOpenBook : undefined}
          onHoverStart={() => !isOpen && setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* External Leather Surface */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden rounded-r-[6px] rounded-l-[2px] shadow-2xl overflow-hidden"
            style={{ transform: 'translateZ(3px)', backgroundColor: '#1a1a1a' }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-60 mix-blend-overlay" />
            <div className="absolute inset-0 border-[10px] border-white/5 m-4 rounded-[4px]" />
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between text-white z-10">
              <div className="space-y-4">
                 <div className="w-16 h-1 bg-[#F4C2C2] rounded-full" />
                 <span className="text-[10px] font-black tracking-[0.6em] uppercase text-white/40">Studio Archive</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-serif font-black leading-[0.85] uppercase text-[#fdfcfb]">
                  {bookTitle.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-white/20" />
                  <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/60">{bookAuthor}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 w-12 h-12 border border-[#F4C2C2]/30 rotate-45 flex items-center justify-center opacity-40">
                <div className="w-4 h-4 bg-[#F4C2C2]/20 rounded-full" />
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/60 to-transparent border-r border-white/5" />
          </div>

          {/* Inner Left Cover (Visible when Open) */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden rounded-l-[4px] bg-[#FAF9F6] p-8 md:p-16 border-r border-slate-200"
            style={{ transform: 'rotateY(180deg) translateZ(3px)' }}
          >
             <div className="h-full border border-slate-100 p-6 md:p-10 flex flex-col justify-between items-center text-center">
                <div className="w-12 h-px bg-slate-200" />
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-serif italic text-slate-800">The standards we live by.</h3>
                  <p className="text-[10px] leading-loose uppercase tracking-[0.3em] text-slate-400">Limited Studio Edition<br/>Vol 001 // 2025</p>
                </div>
                <button onClick={handleCloseBook} className="group p-3 text-slate-300 hover:text-slate-900 transition-colors">
                   <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
             </div>
          </div>
        </motion.div>

        {/* Pages Stack */}
        <div className="absolute inset-0 w-full h-full z-0" style={{ transformStyle: 'preserve-3d' }}>
          {pages.map((page, index) => {
            const isFlipped = index <= currentPageIndex;
            const isBuried = index < currentPageIndex - 1;

            return (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full origin-left"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateY: 0, zIndex: pages.length - index }}
                animate={{ 
                  rotateY: isFlipped ? -180 : 0,
                  zIndex: isFlipped ? index + 10 : pages.length - index,
                  opacity: isBuried ? 0 : 1
                }}
                transition={{ 
                  rotateY: { duration: 1.1, ease: [0.645, 0.045, 0.355, 1] },
                  opacity: { duration: 0.4 }
                }}
              >
                {/* Front Side of Page */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden bg-[#FAF9F6] rounded-r-[4px] border border-slate-100 flex flex-col"
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <div className="p-8 md:p-16 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-12 md:mb-16">
                      <span className="text-[9px] font-black text-[#F4C2C2] uppercase tracking-[0.5em]">Section 0{index + 1}</span>
                      <span className="text-[9px] font-bold text-slate-300 font-mono tracking-tighter">ARCHIVE.P{page.pageNumber * 2 - 1}</span>
                    </div>
                    <div className="flex-1 space-y-6 md:space-y-10">
                      {page.title && <h3 className="text-2xl md:text-3xl font-serif font-black text-slate-900 uppercase tracking-tighter leading-none">{page.title}</h3>}
                      <div className="text-xs md:text-sm font-medium leading-relaxed text-slate-600/90 tracking-tight overflow-y-auto">
                        {page.content}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.05] pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/5 to-transparent" />
                </div>

                {/* Back Side of Page - Rotated 180deg to avoid mirroring */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden bg-[#FAF9F6] rounded-l-[4px] border-r border-slate-200 flex flex-col"
                  style={{ transform: 'rotateY(180deg) translateZ(1px)' }} 
                >
                  <div className="p-8 md:p-16 h-full flex flex-col">
                     <div className="flex justify-between items-center mb-12 md:mb-16">
                        <span className="text-[9px] font-bold text-slate-300 font-mono tracking-tighter">ARCHIVE.P{page.pageNumber * 2}</span>
                        <div className="w-2 h-2 rounded-full bg-[#F4C2C2]" />
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                        <div className="text-slate-900 text-xs md:text-base">
                          {page.backContent}
                        </div>
                     </div>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/5 to-transparent" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.05] pointer-events-none" />
                </div>
              </motion.div>
            );
          })}

          {/* End Page */}
          <div
            className="absolute inset-0 w-full h-full bg-[#FAF9F6] rounded-r-[4px] border border-slate-200 shadow-inner flex flex-col items-center justify-center p-8 md:p-16 text-center"
            style={{ transform: 'translateZ(-10px)', zIndex: -1 }}
          >
             <div className="space-y-8">
                <div className="w-16 h-16 mx-auto rounded-full border border-slate-100 flex items-center justify-center">
                  <BookOpen size={20} className="text-slate-200" />
                </div>
                <h4 className="serif italic text-3xl text-slate-900">End of Volume.</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest max-w-[1400px] mx-auto leading-loose">The dialogue continues in the next edition.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restartBook}
                  className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-full flex items-center gap-3 mx-auto"
                >
                  <RefreshCcw size={14} /> Restart
                </motion.button>
             </div>
          </div>
        </div>

        {/* Floating Navigation Controls */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-10 glass-light px-8 md:px-12 py-4 md:py-6 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.1)] z-[200] border border-white/40"
            >
              <button 
                onClick={prevPage} 
                disabled={currentPageIndex < 0} 
                className="p-2 md:p-3 text-slate-900 disabled:opacity-20 hover:scale-125 transition-transform"
              >
                {/* Fix: Replaced invalid md:size prop with Tailwind classes for responsive sizing */}
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
              </button>
              
              <div className="flex flex-col items-center min-w-[100px] md:min-w-[140px]">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 opacity-40 mb-1">Navigation</span>
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                  {currentPageIndex < 0 ? "Preface" : currentPageIndex >= pages.length - 1 ? "Conclusion" : `Vol. 0${currentPageIndex + 1}`}
                </span>
              </div>

              <button 
                onClick={nextPage} 
                disabled={currentPageIndex >= pages.length - 1} 
                className="p-2 md:p-3 text-slate-900 disabled:opacity-20 hover:scale-125 transition-transform"
              >
                {/* Fix: Replaced invalid md:size prop with Tailwind classes for responsive sizing */}
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}