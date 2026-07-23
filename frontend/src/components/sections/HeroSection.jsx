import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated orbs background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-fuchsia-700/10 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/8 rounded-full blur-[140px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/10 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-purple-200/80 text-sm font-medium tracking-wide">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="text-purple-100/90">Hi, I'm </span>
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
            Wubamlak
          </span>
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <Sparkles size={20} className="text-fuchsia-400/70" />
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-200/70" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Full Stack Developer
          </span>
          <Sparkles size={20} className="text-fuchsia-400/70" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-purple-200/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build scalable, performant web applications with modern technologies.
          Specializing in React, Node.js, and PostgreSQL — turning ideas into
          elegant digital solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-3.5 rounded-xl border border-purple-500/30 text-purple-200 font-semibold text-sm hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Mail size={16} />
            Get In Touch
          </button>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium text-purple-300/50 bg-purple-500/5 border border-purple-500/10 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-300/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-purple-400/20 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-purple-400/50 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
