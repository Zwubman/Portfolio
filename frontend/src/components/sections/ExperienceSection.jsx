import { motion } from 'framer-motion';
import { useGetExperiencesQuery } from '../../store/services/experiencesApi';

const mockExperiencesFallback = [
  {
    id: 'me1',
    company: 'Askuala / Freelance',
    role: 'Full Stack Developer',
    location_type: 'Remote',
    start_date: '2023-07-01',
    end_date: null, // Present
    bullet_points: [
      'Built AI learning, payment, and chat apps, E-commerce.',
      'Developed RESTful APIs with Node.js, MySQL, and MongoDB.',
      'Implemented security with encryption and authentication.',
      'Backend developer at Askuala, optimizing APIs.',
      'Used Redis caching for performance.',
      'Led and mentored developers.',
      'Explored DevOps, CI/CD, and automation.',
    ],
    order_index: 1,
  },
  {
    id: 'me2',
    company: 'Askuala Link',
    role: 'Backend Developer',
    location_type: 'Remote',
    start_date: '2024-12-01',
    end_date: null, // Present
    bullet_points: [
      'Developed RESTful APIs with Node.js and Express.js.',
      'Optimized backend for performance and scalability.',
      'Implemented JWT for security.',
      'Integrated Chapa for payments and memberships.',
      'Used Redis caching for efficiency.',
      'Encrypted sensitive data with CryptoJS.',
    ],
    order_index: 2,
  },
];

const CodeBadge = () => (
  <div
    className="flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-lg z-10"
    style={{ backgroundColor: '#ffffff', border: '5px solid var(--bg-primary)' }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l-6-6 6-6" stroke="#ef4444" /> {/* Red caret */}
      <path d="M15 6l6 6-6 6" stroke="#3b82f6" /> {/* Blue caret */}
      <path d="M8 12h8" stroke="#eab308" strokeWidth="4" /> {/* Yellow bar in middle to mimic the colorful google-style code icon */}
    </svg>
  </div>
);

export default function ExperienceSection() {
  const { data: serverExperiences = [], isLoading } = useGetExperiencesQuery();
  const experiences =
    serverExperiences && serverExperiences.length > 0 ? serverExperiences : mockExperiencesFallback;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const d = new Date(dateStr);
    const m = d.toLocaleDateString('en-US', { month: 'short' });
    const y = d.getFullYear();
    // Return "July 2023" for full spellings or "Dec 2024" matching image
    return `${d.toLocaleDateString('en-US', { month: 'long' })} ${y}`.replace('December', 'Dec'); 
  };

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            What I have done so far
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
          >
            Work Experience.
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid var(--border)', borderTopColor: '#7c3aed' }} />
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            <div
              className="hidden lg:block absolute left-1/2 top-4 bottom-0 w-[2.5px] -translate-x-1/2"
              style={{ backgroundColor: 'var(--border)' }}
            />

            <div className="space-y-12 lg:space-y-24">
              {experiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col lg:flex-row items-center justify-between ${
                      isLeft ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Badge */}
                    <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 z-10 w-[60px] justify-center">
                      <CodeBadge />
                    </div>

                    {/* Timeline Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                      className="w-full lg:w-[45%]"
                    >
                      <div
                        className="p-8 rounded-lg shadow-xl"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1.5px solid rgba(124, 58, 237, 0.25)',
                        }}
                      >
                        <h3 className="text-2xl font-bold mb-1 leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {exp.role}
                        </h3>
                        {exp.company && (
                          <h4 className="text-[15px] font-medium mb-5" style={{ color: 'var(--text-muted)' }}>
                            {exp.company}
                          </h4>
                        )}
                        {!exp.company && <div className="mb-5" />}

                        <ul className="space-y-3">
                          {(exp.bullet_points || []).map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-4 text-[13.5px] font-normal leading-relaxed"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: 'var(--text-muted)' }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Date + Job Type + Location column */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`hidden lg:flex flex-col w-[45%] gap-1 ${
                        isLeft ? 'items-start pl-8' : 'items-end pr-8'
                      } justify-center`}
                    >
                      {(exp.job_type || exp.location_type) && (
                        <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                          {[exp.job_type, exp.location_type].filter(Boolean).join(' | ')}
                        </span>
                      )}
                      <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                        {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
