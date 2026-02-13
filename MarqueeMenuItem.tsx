import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface MarqueeMenuItemProps {
  title: string;
  marqueeItems: { text: string; img?: string }[];
  onClick?: () => void;
}

const MarqueeMenuItem: React.FC<MarqueeMenuItemProps> = ({ title, marqueeItems, onClick }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerWrapRef = useRef<HTMLDivElement>(null);

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
  };

  const findClosestEdge = (ev: React.MouseEvent) => {
    if (!itemRef.current) return 'top';
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    const topEdgeDist = distMetric(x, y, w / 2, 0);
    const bottomEdgeDist = distMetric(x, y, w / 2, h);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent) => {
    if (!marqueeRef.current || !marqueeInnerWrapRef.current) return;
    
    const edge = findClosestEdge(ev);
    const animationDefaults = { duration: 0.6, ease: 'expo.out' };

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerWrapRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerWrapRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (!marqueeRef.current || !marqueeInnerWrapRef.current) return;

    const edge = findClosestEdge(ev);
    const animationDefaults = { duration: 0.6, ease: 'expo.out' };

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerWrapRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  // Double the items for seamless animation
  const displayItems = [...marqueeItems, ...marqueeItems];

  return (
    <div 
      ref={itemRef} 
      className="marquee-menu-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); onClick?.(); }} 
        className="marquee-menu-link serif"
      >
        {title}
      </a>
      <div ref={marqueeRef} className="marquee">
        <div ref={marqueeInnerWrapRef} className="marquee__inner-wrap">
          <div className="marquee__inner" aria-hidden="true">
            {displayItems.map((item, i) => (
              <React.Fragment key={i}>
                <span>{item.text}</span>
                {item.img && (
                  <div 
                    className="marquee__img" 
                    style={{ backgroundImage: `url(${item.img})` }} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeMenuItem;