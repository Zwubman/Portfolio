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
