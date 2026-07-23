import { motion } from 'framer-motion';
import { useGetExperiencesQuery } from '../../store/services/experiencesApi';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = useGetExperiencesQuery();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute left-0 top-1/3 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            Career
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-100 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Work Experience
          </h2>
          <p className="text-purple-200/50 max-w-xl mx-auto">
            My professional journey building enterprise-grade applications.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-fuchsia-500/20 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30 ring-4 ring-[#0E0B24]" />

                  {/* Card */}
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-purple-100 flex items-center gap-2">
                          <Briefcase size={18} className="text-fuchsia-400" />
                          {exp.company}
                        </h3>
                        <p className="text-purple-300/70 font-medium text-sm mt-1">{exp.role}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-purple-300/50">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {exp.location_type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                        </span>
                      </div>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-2.5">
                      {(exp.bullet_points || []).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm text-purple-200/60 leading-relaxed">
                          <ChevronRight size={14} className="text-purple-400/50 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
