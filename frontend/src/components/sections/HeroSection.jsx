import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const fullText = "Software developer";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect logic
  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 120);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 3000); // Wait before clearing
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 60);
      } else {
        timeout = setTimeout(() => setIsTyping(true), 500);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ── Background Waves ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-90">
        <svg viewBox="0 0 1440 600" className="absolute bottom-0 w-full h-[60vh] object-cover" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--accent-start)" fillOpacity="0.18" d="M0,350L60,330C120,310,240,270,360,265C480,260,600,290,720,310C840,330,960,340,1080,315C1200,290,1320,230,1380,200L1440,170L1440,600L1380,600C1320,600,1200,600,1080,600C960,600,840,600,720,600C600,600,480,600,360,600C240,600,120,600,60,600L0,600Z"></path>
        </svg>
        <svg viewBox="0 0 1440 600" className="absolute bottom-0 w-full h-[45vh] object-cover" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--accent)" fillOpacity="0.12" d="M0,200L48,225C96,250,192,300,288,300C384,300,480,250,576,215C672,180,768,160,864,180C960,200,1056,260,1152,280C1248,300,1344,280,1392,270L1440,260L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z"></path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-10 flex flex-col h-full h-full flex-1">
        
        {/* ── Top Left Text Area ── */}
        <div className="flex items-start gap-4 sm:gap-6 mt-10 md:mt-20 shrink-0 relative z-20">
          {/* Vertical line structure */}
          <div className="flex flex-col items-center mt-2">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--accent-start)' }} />
            <div className="w-1 sm:h-80 h-40" style={{ background: 'linear-gradient(to bottom, var(--accent-start), transparent)' }} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="text-6xl sm:text-7xl md:text-[5.5rem] font-black leading-tight tracking-tight mb-2"
              style={{ fontFamily: "'Poppins', sans-serif", color: 'var(--text-primary)' }}
            >
              Hi, I'm <span style={{ color: '#d8b4fe' }}>Wubamlak</span>
            </h1>
            
            {/* Typewriter text */}
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center h-12"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>{displayedText}</span>
              <span className="cursor-blink inline-block w-1 h-[80%] ml-1" style={{ backgroundColor: 'var(--text-secondary)' }} />
            </div>
          </motion.div>
        </div>

        {/* ── Center Computer Image ── */}
        <motion.div 
          className="w-full flex justify-center relative mt-2 sm:mt-8 lg:mt-12 pointer-events-none z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Soft themed glow behind the image so it blends on both dark & light backgrounds */}
          <div className="w-full max-w-[900px] relative flex justify-center">
            {/* Glow backdrop — purple in dark, soft lavender in light */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, var(--bg-secondary) 30%, transparent 75%)',
                transform: 'scaleX(1.1)',
                zIndex: 0,
              }}
            />
            <div 
              className="w-full relative"
              style={{
                zIndex: 1,
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 55%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse at 50% 55%, black 55%, transparent 80%)'
              }}
            >
              <img 
                src="/computer_desk.png" 
                alt="3D Computer Desk" 
                className="w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex justify-center"
      >
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-8 h-12 rounded-3xl border-2 flex justify-center p-1 cursor-pointer transition-colors"
          style={{ borderColor: 'var(--text-secondary)' }}
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--text-secondary)' }}
          />
        </button>
      </motion.div>

    </section>
  );
}
