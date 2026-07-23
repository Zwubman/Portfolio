import { motion } from 'framer-motion';
import { useGetSkillsQuery } from '../../store/services/skillsApi';
import {
  FileCode2, FileType, Atom, Layers, Palette, Server, Zap, Box,
  Database, HardDrive, Table2, GitBranch, Container, Code2
} from 'lucide-react';

const iconMap = {
  FileCode2, FileType, Atom, Layers, Palette, Server, Zap, Box,
  Database, HardDrive, Table2, GitBranch, Container, Code2,
};

const categoryColors = {
  Frontend: { bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: 'text-blue-400' },
  Backend: { bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-400' },
  Databases: { bg: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: 'text-amber-400' },
  Tools: { bg: 'from-fuchsia-500/10 to-pink-500/10', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400', icon: 'text-fuchsia-400' },
};

export default function SkillsSection() {
  const { data: skills = [], isLoading } = useGetSkillsQuery();

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-100 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Skills & Technologies
          </h2>
          <p className="text-purple-200/50 max-w-xl mx-auto">
            The tools and technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, items], catIdx) => {
              const colors = categoryColors[category] || categoryColors.Frontend;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                  className={`group relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
                >
                  <h3 className={`text-lg font-bold ${colors.text} mb-5 flex items-center gap-2`}>
                    <div className={`w-2 h-2 rounded-full bg-current`} />
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {items.map((skill, idx) => {
                      const IconComp = iconMap[skill.icon_name] || Code2;
                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#0E0B24]/60 border border-white/5 hover:border-white/10 transition-all"
                        >
                          <IconComp size={16} className={colors.icon} />
                          <span className="text-sm text-purple-100/80 font-medium">{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
