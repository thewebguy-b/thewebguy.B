
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowUp } from 'lucide-react';

interface FloatingDockProps {
  onMenuOpen: () => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ onMenuOpen }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-light p-2 rounded-full border border-white/40 shadow-2xl flex items-center gap-2"
      >
        <button 
          onClick={onMenuOpen}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          title="Global Menu"
        >
          <Menu size={20} />
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        <button 
          onClick={scrollToTop}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
          title="Return to Peak"
        >
          <ArrowUp size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export default FloatingDock;
