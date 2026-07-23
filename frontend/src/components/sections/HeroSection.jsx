import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const roles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Problem Solver',
  'Freelancer',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed]  = useState('');
  const [typing, setTyping]         = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Star field */}
      <div className="hero-stars absolute inset-0 pointer-events-none" />

      {/* Radial orbs */}
      <div className="absolute top-[20%] left-[15%] w-[350px] h-[350px] bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[300px] h-[300px] bg-violet-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-24 pb-16">

          {/* ── Left: Text ── */}
          <div className="flex-1 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl font-medium mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", color: 'var(--text-primary)' }}
            >
              Wubamlak
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#c026d3]">
                {' '}Girum
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-2xl sm:text-3xl font-semibold mb-6 h-10 flex items-center"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>{displayed}</span>
              <span className="cursor-blink ml-0.5 inline-block w-0.5 h-7 bg-[#915eff]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              I build scalable, performant web applications with modern technologies.
              Specializing in React, Node.js, and PostgreSQL — turning ideas into elegant
              digital solutions with clean, maintainable code.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded bg-gradient-to-r from-[#7c3aed] to-[#a21caf] text-white font-semibold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 cursor-pointer"
              >
                Get In Touch
              </button>
              <a
                href="mailto:wubamlakgirum@gmail.com"
                className="px-8 py-3.5 rounded border border-[#915eff] font-semibold text-sm hover:bg-[#915eff]/10 transition-all duration-300 flex items-center gap-2"
                style={{ color: '#915eff' }}
              >
                <Mail size={16} />
                wubamlakgirum@gmail.com
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-4"
            >
              {[
                { icon: Github,   href: 'https://github.com/Zwubman',          label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/wubamlak',   label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <div className="relative animate-float">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#c026d3] opacity-20 blur-xl animate-glow" />

              {/* Photo */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1 bg-gradient-to-br from-[#7c3aed] via-[#a21caf] to-[#7c3aed]">
                <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <img
                    src="/profile.jpg"
                    alt="Wubamlak Girum"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating badge — role */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -right-4 top-8 px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold backdrop-blur-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: '#915eff',
                }}
              >
                Full Stack Dev
              </motion.div>

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute -left-4 bottom-10 px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold backdrop-blur-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: '#c026d3',
                }}
              >
                1+ Yr Experience
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center pb-4"
        >
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 transition-colors cursor-pointer group"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="text-xs tracking-widest uppercase font-medium">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full border-2 border-[#7c3aed]/40 group-hover:border-[#7c3aed] flex items-center justify-center transition-colors"
            >
              <ArrowDown size={14} className="text-[#7c3aed]" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
