import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGetSkillsQuery } from '../../store/services/skillsApi';
import {
  FileCode2, FileType, Atom, Layers, Palette, Server, Zap, Box,
  Database, HardDrive, Table2, GitBranch, Container, Code2,
  Globe, Layout, Cpu, Braces
} from 'lucide-react';

const iconMap = {
  FileCode2, FileType, Atom, Layers, Palette, Server, Zap, Box,
  Database, HardDrive, Table2, GitBranch, Container, Code2,
  Globe, Layout, Cpu, Braces,
};

const categories = ['Languages', 'Frameworks', 'Libraries', 'Databases', 'Tools', 'Environments'];

const mockSkillsFallback = [
  { id: 'l1', category: 'Languages',    name: 'HTML5',        icon_name: 'Globe',     color: '#e34f26' },
  { id: 'l2', category: 'Languages',    name: 'CSS3',         icon_name: 'Palette',   color: '#1572b6' },
  { id: 'l3', category: 'Languages',    name: 'JavaScript',   icon_name: 'FileCode2', color: '#f7df1e' },
  { id: 'l4', category: 'Languages',    name: 'TypeScript',   icon_name: 'FileType',  color: '#3178c6' },
  { id: 'l5', category: 'Languages',    name: 'Java',         icon_name: 'Cpu',       color: '#ed8b00' },
  { id: 'l6', category: 'Languages',    name: 'Python',       icon_name: 'Braces',    color: '#3776ab' },
  { id: 'fw1', category: 'Frameworks',  name: 'Tailwind CSS', icon_name: 'Palette',   color: '#38bdf8' },
  { id: 'fw2', category: 'Frameworks',  name: 'Express.js',   icon_name: 'Zap',       color: '#7c3aed' },
  { id: 'fw3', category: 'Frameworks',  name: 'NestJS',       icon_name: 'Box',       color: '#e0234e' },
  { id: 'lib1', category: 'Libraries',  name: 'React',        icon_name: 'Atom',      color: '#61dafb' },
  { id: 'lib2', category: 'Libraries',  name: 'Redux Toolkit',icon_name: 'Layers',    color: '#764abc' },
  { id: 'db1', category: 'Databases',   name: 'MongoDB',      icon_name: 'HardDrive', color: '#47a248' },
  { id: 'db2', category: 'Databases',   name: 'Firebase',     icon_name: 'Zap',       color: '#ffca28' },
  { id: 'db3', category: 'Databases',   name: 'PostgreSQL',   icon_name: 'Database',  color: '#336791' },
  { id: 'db4', category: 'Databases',   name: 'MySQL',        icon_name: 'Table2',    color: '#4479a1' },
  { id: 't1',  category: 'Tools',       name: 'Git',          icon_name: 'GitBranch', color: '#f05032' },
  { id: 't2',  category: 'Tools',       name: 'GitHub',       icon_name: 'GitBranch', color: '#915eff' },
  { id: 't3',  category: 'Tools',       name: 'Postman',      icon_name: 'Server',    color: '#ff6c37' },
  { id: 'e1',  category: 'Environments',name: 'Node.js',      icon_name: 'Server',    color: '#5fa04e' },
  { id: 'e2',  category: 'Environments',name: 'Docker',       icon_name: 'Container', color: '#2496ed' },
];

/* ── Specialty role cards ── */
const specialtyCards = [
  {
    title: 'Full Stack\nDeveloper',
    borderColors: ['#00d4aa', '#7c3aed'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8"  y="8"  width="16" height="16" rx="3" fill="#7c3aed" opacity="0.9"/>
        <rect x="28" y="8"  width="16" height="16" rx="3" fill="#00d4aa" opacity="0.9"/>
        <rect x="8"  y="28" width="16" height="16" rx="3" fill="#00d4aa" opacity="0.9"/>
        <rect x="28" y="28" width="16" height="16" rx="3" fill="#7c3aed" opacity="0.9"/>
        <rect x="14" y="14" width="24" height="24" rx="5" fill="url(#fs_g)" opacity="0.55"/>
        <defs>
          <linearGradient id="fs_g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#7c3aed"/><stop offset="1" stopColor="#00d4aa"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: 'Frontend\nDeveloper',
    borderColors: ['#00d4aa', '#38bdf8'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="44" height="32" rx="5" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5"/>
        <rect x="4" y="10" width="44" height="9"  rx="5" fill="#38bdf8" opacity="0.25"/>
        <circle cx="12" cy="14.5" r="2" fill="#f87171"/>
        <circle cx="20" cy="14.5" r="2" fill="#fbbf24"/>
        <circle cx="28" cy="14.5" r="2" fill="#34d399"/>
        <rect x="10" y="25" width="14" height="3" rx="1.5" fill="#7c3aed" opacity="0.8"/>
        <rect x="10" y="31" width="22" height="3" rx="1.5" fill="#38bdf8" opacity="0.6"/>
        <rect x="29" y="24" width="12" height="12" rx="2" fill="#7c3aed" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'Backend\nDeveloper',
    borderColors: ['#38bdf8', '#7c3aed'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="14" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="4 2"/>
        <circle cx="26" cy="26" r="8"  fill="url(#be_g)" opacity="0.9"/>
        <path d="M26 12L26 6M26 46L26 40M12 26L6 26M46 26L40 26" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="3" fill="#ffffff"/>
        <defs>
          <linearGradient id="be_g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#7c3aed"/><stop offset="1" stopColor="#38bdf8"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: 'Problem\nSolving',
    borderColors: ['#a21caf', '#7c3aed'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="5"  fill="#a21caf" opacity="0.9"/>
        <circle cx="10" cy="18" r="4"  fill="#7c3aed" opacity="0.85"/>
        <circle cx="42" cy="18" r="4"  fill="#38bdf8" opacity="0.85"/>
        <circle cx="10" cy="36" r="4"  fill="#00d4aa" opacity="0.85"/>
        <circle cx="42" cy="36" r="4"  fill="#7c3aed" opacity="0.85"/>
        <line x1="14" y1="20" x2="22" y2="24" stroke="#a21caf" strokeWidth="1.5"/>
        <line x1="38" y1="20" x2="30" y2="24" stroke="#38bdf8" strokeWidth="1.5"/>
        <line x1="14" y1="34" x2="22" y2="28" stroke="#00d4aa" strokeWidth="1.5"/>
        <line x1="38" y1="34" x2="30" y2="28" stroke="#7c3aed" strokeWidth="1.5"/>
        <line x1="10" y1="22" x2="10" y2="32" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5"/>
        <line x1="42" y1="22" x2="42" y2="32" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'Freelancer',
    borderColors: ['#7c3aed', '#a21caf'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="10" r="5"  fill="#7c3aed" opacity="0.9"/>
        <circle cx="10" cy="32" r="5"  fill="#a21caf" opacity="0.9"/>
        <circle cx="42" cy="32" r="5"  fill="#38bdf8" opacity="0.9"/>
        <circle cx="26" cy="44" r="4"  fill="#00d4aa"  opacity="0.85"/>
        <line x1="26" y1="15" x2="13" y2="28" stroke="#7c3aed" strokeWidth="1.8"/>
        <line x1="26" y1="15" x2="39" y2="28" stroke="#38bdf8" strokeWidth="1.8"/>
        <line x1="13" y1="36" x2="26" y2="41" stroke="#a21caf" strokeWidth="1.8"/>
        <line x1="39" y1="36" x2="26" y2="41" stroke="#00d4aa" strokeWidth="1.8"/>
        <line x1="15" y1="32" x2="37" y2="32" stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.5"/>
      </svg>
    ),
  },
];

export default function SkillsSection() {
  const { data: serverSkills = [], isLoading } = useGetSkillsQuery();
  const skills = serverSkills && serverSkills.length > 0 ? serverSkills : mockSkillsFallback;
  const [activeTab, setActiveTab] = useState('Languages');

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const availableTabs  = categories.filter((c) => groupedSkills[c]?.length > 0);
  const displayTab     = availableTabs.includes(activeTab) ? activeTab : availableTabs[0] || 'Languages';
  const displaySkills  = groupedSkills[displayTab] || [];

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
            What I have learnt so far
          </p>
          <div className="flex items-end gap-6">
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Skills.
            </h2>
            <div
              className="flex-1 h-px mb-3 hidden sm:block"
              style={{ background: 'linear-gradient(to right, var(--border-hover), transparent)' }}
            />
          </div>
        </motion.div>

        {/* ── Specialty Role Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {specialtyCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.09 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative group cursor-default"
            >
              {/* Gradient border shell */}
              <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-70 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${card.borderColors[0]}, ${card.borderColors[1]})`,
                  borderRadius: '16px',
                }}
              />
              {/* Inner card (covers the gradient except the 1.5px border) */}
              <div
                className="relative m-[1.5px] flex flex-col items-center justify-center gap-4 py-8 px-4"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                <div className="flex items-center justify-center w-16 h-16">
                  {card.icon}
                </div>
                <p
                  className="text-sm font-bold text-center leading-snug whitespace-pre-line"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tech Skills ── */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--border)', borderTopColor: '#7c3aed' }}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Category tabs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-48 flex-shrink-0"
            >
              {availableTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className="flex-shrink-0 px-5 py-3 rounded-lg text-sm font-semibold text-left transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={
                    displayTab === cat
                      ? {
                          background: 'linear-gradient(to right, #7c3aed, #a21caf)',
                          color: '#ffffff',
                          boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
                        }
                      : {
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                          backgroundColor: 'transparent',
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Skills grid */}
            <motion.div
              key={displayTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {displaySkills.map((skill, idx) => {
                const IconComp = iconMap[skill.icon_name] || Code2;
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group flex flex-col items-center gap-3 p-5 rounded-xl card-base"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: skill.color ? `${skill.color}15` : '#7c3aed15',
                        border: `1px solid ${skill.color ? `${skill.color}30` : '#7c3aed30'}`,
                      }}
                    >
                      <IconComp size={24} style={{ color: skill.color || '#915eff' }} />
                    </div>
                    <span
                      className="text-sm font-medium text-center transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
