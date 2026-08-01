import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Real brand icons via devicons CDN ─── */
const SKILLS = {
  Languages: [
    { name: 'HTML5',      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3',       iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Java',       iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Python',     iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  ],
  Frameworks: [
    { name: 'Tailwind',   iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Express.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true },
    { name: 'NestJS',     iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
  ],
  Libraries: [
    { name: 'React',         iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Redux Toolkit', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
  ],
  Databases: [
    { name: 'MongoDB',    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'Firebase',   iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL',      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  ],
  Tools: [
    { name: 'Git',     iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'GitHub',  iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true },
    { name: 'Postman', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  ],
  Environments: [
    { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Docker',  iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  ],
};

const TABS = Object.keys(SKILLS);

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('Languages');

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Section header — centered, matching reference ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            What I have learnt so far
          </p>
          <h2
            className="text-5xl sm:text-6xl font-black italic"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
          >
            Skills.
          </h2>
        </motion.div>

        {/* ── Bordered card panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1.5px solid rgba(124,58,237,0.45)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <div className="flex">

            {/* ── Left: tab labels ── */}
            <div
              className="flex flex-col"
              style={{ borderRight: '1px solid rgba(124,58,237,0.25)', minWidth: '140px' }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-[18px] text-sm text-left transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={{
                    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: activeTab === tab ? '600' : '400',
                    backgroundColor: 'transparent',
                    borderLeft: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Right: raw icons in horizontal row ── */}
            <div className="flex-1 flex items-center px-8 py-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-5 items-center"
                >
                  {SKILLS[activeTab].map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.18, delay: idx * 0.04 }}
                      whileHover={{ scale: 1.15, y: -3 }}
                      title={skill.name}
                      className="cursor-default"
                    >
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        width={42}
                        height={42}
                        loading="lazy"
                        className="object-contain"
                        style={{
                          filter: skill.invert ? 'invert(1) brightness(0.8)' : 'none',
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
