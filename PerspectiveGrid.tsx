
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const PerspectiveGrid: React.FC = () => {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-500, 500], [5, -5]);
  const rotateY = useTransform(springX, [-500, 500], [-5, 5]);
  const translateY = useTransform(scrollY, [0, 1000], [0, -200]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 perspective-[2000px]"
    >
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          y: translateY,
          transformStyle: 'preserve-3d' 
        }}
        className="absolute inset-[-100px] opacity-[0.08]"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) scale(2.5)',
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#8BA888] via-transparent to-[#8BA888]" />
    </div>
  );
};

export default PerspectiveGrid;
