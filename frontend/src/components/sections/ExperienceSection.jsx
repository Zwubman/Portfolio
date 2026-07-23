import { motion } from 'framer-motion';
import { useGetExperiencesQuery } from '../../store/services/experiencesApi';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const mockExperiencesFallback = [
  {
    id: 'me1',
    company: 'Teamwork IT Solution',
    role: 'Full-time Remote Backend Engineer',
    location_type: 'Remote',
    start_date: '2025-06-01',
    end_date: '2026-04-30',
    bullet_points: [
      'Architected RESTful APIs and optimized database schemas for enterprise applications.',
      'Developed core transaction engines for Microfinance and Land Administration Systems.',
      'Implemented multi-tier Role-Based Access Control (RBAC) managing permissions across Woreda, Zone, and Regional levels.',
      'Integrated WebSockets for real-time messaging, dynamic notifications, and automated onboarding pipelines.',
    ],
    order_index: 1,
  },
  {
    id: 'me2',
    company: 'Askuala Link',
    role: 'Remote Software Engineer Intern',
    location_type: 'Remote',
    start_date: '2025-03-01',
    end_date: '2025-06-30',
    bullet_points: [
      'Optimized RESTful APIs across core platforms and submodules.',
      'Integrated payment gateways, banking systems, and SMS APIs for real-time alerts.',
      'Engineered finance and HR submodules to automate fee processing, attendance, and employee tracking.',
    ],
    order_index: 2,
  },
];

export default function ExperienceSection() {
  const { data: serverExperiences = [], isLoading } = useGetExperiencesQuery();
  const experiences =
    serverExperiences && serverExperiences.length > 0 ? serverExperiences : mockExperiencesFallback;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute left-0 top-1/3 w-[350px] h-[350px] bg-purple-900/8 rounded-full blur-[120px] pointer-events-none" />

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
            My work
          </p>
          <div className="flex items-end gap-6">
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Work Experience.
            </h2>
            <div
              className="flex-1 h-px mb-3 hidden sm:block"
              style={{ background: 'linear-gradient(to right, var(--border-hover), transparent)' }}
            />
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid var(--border)', borderTopColor: '#7c3aed' }} />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, var(--timeline-line), transparent)' }}
            />

            <div className="space-y-10">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="relative sm:pl-20"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-6 w-4 h-4 rounded-full hidden sm:block"
                    style={{
                      background: 'linear-gradient(to br, #7c3aed, #a21caf)',
                      boxShadow: '0 0 10px rgba(124,58,237,0.4)',
                      outline: '4px solid var(--bg-primary)',
                    }}
                  />

                  {/* Card */}
                  <div className="group p-6 sm:p-8 rounded-2xl card-base">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        <h3
                          className="text-xl font-bold flex items-center gap-2"
                          style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
                        >
                          <Briefcase size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          {exp.company}
                        </h3>
                        <p className="font-medium text-sm mt-1" style={{ color: 'var(--accent)' }}>
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} /> {exp.location_type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {(exp.bullet_points || []).map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: 'var(--accent)' }}
                          />
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
