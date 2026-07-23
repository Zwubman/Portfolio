import { motion } from 'framer-motion';
import { Code2, Server, Layers, Lightbulb } from 'lucide-react';

const cards = [
  {
    title: 'Full Stack Developer',
    icon: Layers,
    description:
      'I build end-to-end web applications from pixel-perfect frontends to scalable, robust RESTful backends.',
    color: '#7c3aed',
  },
  {
    title: 'Frontend Developer',
    icon: Code2,
    description:
      'I craft clean, responsive, and animated UI experiences using React, TypeScript, and Tailwind CSS.',
    color: '#9333ea',
  },
  {
    title: 'Backend Developer',
    icon: Server,
    description:
      'I design high-performance APIs and database architectures using Node.js, Express, and PostgreSQL.',
    color: '#a21caf',
  },
  {
    title: 'Problem Solving',
    icon: Lightbulb,
    description:
      'I approach every challenge analytically, breaking complex requirements into elegant, maintainable code.',
    color: '#7e22ce',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-violet-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
            Introduction
          </p>
          <div className="flex items-end gap-6">
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Overview.
            </h2>
            <div
              className="flex-1 h-px mb-3 hidden sm:block"
              style={{ background: 'linear-gradient(to right, var(--border-hover), transparent)' }}
            />
          </div>
        </motion.div>

        {/* Bio text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mb-20"
          style={{ color: 'var(--text-secondary)' }}
        >
          I'm a skilled software developer with a strong passion for building scalable and
          efficient web applications. Experienced in JavaScript and TypeScript, I work with
          frameworks like React on the frontend and Node.js & Express on the backend, paired
          with databases like PostgreSQL and MongoDB. I'm a quick learner who collaborates
          closely with clients to create real-world solutions that make an impact. Let's
          build something amazing together!
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative p-6 rounded-2xl card-base cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${card.color}18`, border: `1px solid ${card.color}35` }}
                >
                  <Icon size={24} style={{ color: card.color }} />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {card.description}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, ${card.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
