
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Bot, Terminal, Power } from 'lucide-react';

interface StudioAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudioAI: React.FC<StudioAIProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Systems online. I am the digital intelligence of THEWEBGUY.B. How shall we proceed?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `You are the "Studio Intelligence" for THEWEBGUY.B. 
          STRICT RULE: You must ONLY use the name "THEWEBGUY.B".
          Your tone is sophisticated, intellectual, minimalist, and helpful. 
          The studio specializes in: 
          1. UI/UX Architecture
          2. Full-stack engineering with React/Next.js/Rust
          3. Luxury brand identity.
          If users ask about projects, mention things like Loopbits, JobVisit, and RC Bricks.
          Keep responses concise and elegant. Always speak as "We" (representing THEWEBGUY.B).`,
          temperature: 0.7,
        }
      });

      const botText = response.text || "Connection flicker detected. THEWEBGUY.B is still standing by.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "System connection error. THEWEBGUY.B session remains available for manual inquiry." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          className="fixed inset-0 md:inset-auto md:bottom-32 md:right-10 z-[300] w-full md:w-[450px] h-[650px] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-slate-800/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F4C2C2] flex items-center justify-center shadow-[0_0_15px_rgba(244,194,194,0.3)]">
                <Terminal size={14} className="text-slate-900" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Studio Concierge</h3>
                <p className="text-[9px] text-white/40 font-mono">NODE: THEWEBGUY.B_INTEL</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-white/5 border border-white/10 text-white font-medium' 
                  : 'bg-slate-800 text-white/80'
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-2 p-2">
                <div className="w-1.5 h-1.5 bg-[#F4C2C2] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#F4C2C2] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[#F4C2C2] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/5 bg-slate-800/30">
            <div className="relative mb-4">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to THEWEBGUY.B..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-14 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F4C2C2]/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 top-2 w-10 h-10 rounded-full bg-[#F4C2C2] text-slate-900 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            
            {/* Take Back Option */}
            <button 
              onClick={onClose}
              className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all group"
            >
              <Power size={12} className="group-hover:rotate-90 transition-transform" />
              Terminate Interaction
            </button>
            
            <p className="text-center mt-4 text-[9px] text-white/20 uppercase tracking-[0.2em]">Neural Node: Active</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudioAI;
