
import React, { useRef, useEffect, useState } from 'react';

interface ScannerBeamProps {
  onScanningChange?: (active: boolean) => void;
}

const ScannerBeam: React.FC<ScannerBeamProps> = ({ onScanningChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = window.innerWidth;
    let h = 400; // Height of the scanner section
    
    const particles: any[] = [];
    const maxParticles = 1200;
    const lightBarX = w / 2;
    const lightBarWidth = 4;
    const fadeZone = 80;

    const setupCanvas = () => {
      w = window.innerWidth;
      canvas.width = w;
      canvas.height = h;
    };

    const createParticle = () => {
      const speedMult = isScanning ? 2.5 : 1.2;
      return {
        x: lightBarX + (Math.random() - 0.5) * lightBarWidth,
        y: Math.random() * h,
        vx: (0.5 + Math.random()) * speedMult,
        vy: (Math.random() - 0.5) * 0.4 * speedMult,
        radius: 0.5 + Math.random() * 1.5,
        alpha: 0.6 + Math.random() * 0.4,
        life: 1.0,
        decay: 0.005 + Math.random() * 0.02,
      };
    };

    // Initial particles
    for (let i = 0; i < 400; i++) {
        particles.push(createParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw the Light Bar
      const vGrad = ctx.createLinearGradient(0, 0, 0, h);
      vGrad.addColorStop(0, 'rgba(255,255,255,0)');
      vGrad.addColorStop(fadeZone/h, 'rgba(255,255,255,1)');
      vGrad.addColorStop(1 - fadeZone/h, 'rgba(255,255,255,1)');
      vGrad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.globalCompositeOperation = 'lighter';
      
      // Glow levels
      const intensities = isScanning ? [4, 8, 16] : [2, 4, 8];
      const opacities = isScanning ? [1, 0.8, 0.4] : [0.7, 0.4, 0.2];

      intensities.forEach((mult, i) => {
          const g = ctx.createLinearGradient(lightBarX - lightBarWidth * mult, 0, lightBarX + lightBarWidth * mult, 0);
          g.addColorStop(0, 'rgba(139, 92, 246, 0)');
          g.addColorStop(0.5, `rgba(139, 92, 246, ${opacities[i]})`);
          g.addColorStop(1, 'rgba(139, 92, 246, 0)');
          ctx.fillStyle = g;
          ctx.fillRect(lightBarX - lightBarWidth * mult, 0, lightBarWidth * mult * 2, h);
      });

      // Core white line
      const coreG = ctx.createLinearGradient(lightBarX - 2, 0, lightBarX + 2, 0);
      coreG.addColorStop(0, 'rgba(255,255,255,0)');
      coreG.addColorStop(0.5, 'rgba(255,255,255,1)');
      coreG.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = coreG;
      ctx.fillRect(lightBarX - 2, 0, 4, h);

      // Mask vertical fade
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, w, h);

      // Particles
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0 || p.x > w) {
          particles[i] = createParticle();
        } else {
          let fAlpha = 1;
          if (p.y < fadeZone) fAlpha = p.y / fadeZone;
          else if (p.y > h - fadeZone) fAlpha = (h - p.y) / fadeZone;
          
          ctx.globalAlpha = p.alpha * p.life * fAlpha;
          ctx.fillStyle = '#c4b5fd';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', setupCanvas);
    setupCanvas();
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setupCanvas);
    };
  }, [isScanning]);

  // Expose function to trigger scanning state from parent
  useEffect(() => {
    const handleScanningEvent = (e: CustomEvent) => {
        setIsScanning(e.detail.active);
        if (onScanningChange) onScanningChange(e.detail.active);
    };
    window.addEventListener('setScannerScanning' as any, handleScanningEvent);
    return () => window.removeEventListener('setScannerScanning' as any, handleScanningEvent);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ScannerBeam;
