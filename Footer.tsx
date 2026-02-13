
import React from 'react';

interface FooterProps {
  onLegalOpen?: () => void;
  onPrivacyOpen?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalOpen, onPrivacyOpen }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/thewebguy.b' },
    { name: 'Behance', href: 'https://www.behance.net/thewebguyboru' },
    { name: 'Dribbble', href: 'https://dribbble.com/thewebguy-b' }
  ];

  return (
    <footer className="py-20 px-6 md:px-12 bg-transparent border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-black tracking-tighter mb-6 text-white uppercase">THEWEBGUY.B</h3>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed font-medium mb-8">
              Premium digital product studio crafting high-end experiences for global brands. Directed by THEWEBGUY.B.
            </p>
            <div className="flex gap-8">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">Studio</h4>
            <ul className="space-y-4">
              {['Services', 'Work', 'Process', 'About'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                    className="text-sm font-bold text-white hover:text-white/40 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">Inquiries</h4>
            <p className="text-xs text-white/40 mb-2 font-medium">New partnership?</p>
            <a href="mailto:thewebguy.b@gmail.com" className="text-lg font-bold text-white hover:text-white/50 transition-colors tracking-tight">thewebguy.b@gmail.com</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
              &copy; {new Date().getFullYear()} THEWEBGUY.B studio. 
            </p>
            <a 
              href="https://thewebguyb.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[9px] font-black uppercase tracking-[0.6em] text-[#F4C2C2] hover:text-white transition-colors"
            >
              MADE BY THEWEBGUY.B
            </a>
          </div>
          <div className="flex gap-10">
            <button 
              onClick={onLegalOpen}
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white"
            >
              Legal
            </button>
            <button 
              onClick={onPrivacyOpen}
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
