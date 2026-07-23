import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProjectsQuery } from '../../store/services/projectsApi';
import { ExternalLink, Github, X, Eye } from 'lucide-react';

const mockProjectsFallback = [
  {
    id: 'mp1',
    title: 'Microfinance Transaction Engine',
    description:
      'A performant transaction ledger engine built for microfinance systems. Architected with atomic transactions to guarantee consistency, comprehensive audit logs, and multi-tier Role-Based Access Control.',
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Sequelize'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: true,
  },
  {
    id: 'mp2',
    title: 'Land Administration System Portal',
    description:
      'An enterprise web application developed to coordinate regional zone and woreda level land registrations. Implemented secure regional RBAC privileges and real-time alerts workflow.',
    tags: ['React', 'Redux Toolkit', 'Node.js', 'PostgreSQL'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: true,
  },
  {
    id: 'mp3',
    title: 'Askuala Payment Hub',
    description:
      'Integrates payment gateways, local banking SMS notification APIs, and automated employee/student onboarding submodules, streamlining real-time financial tracking.',
    tags: ['JavaScript', 'Express.js', 'SMS API', 'REST API'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: false,
  },
  {
    id: 'mp4',
    title: 'Birr Track Finance App',
    description:
      'An offline-first personal budget manager showcasing local SQLite repository integration, robust transaction records, and clean dynamic charts visualization.',
    tags: ['React', 'TypeScript', 'SQLite', 'Tailwind CSS'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: false,
  },
];

// Deterministic gradient per card
const projectGradients = [
  'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(30,27,75,0.8) 100%)',
  'linear-gradient(135deg, rgba(162,28,175,0.3) 0%, rgba(30,27,75,0.8) 100%)',
  'linear-gradient(135deg, rgba(79,70,229,0.3) 0%, rgba(30,27,75,0.8) 100%)',
  'linear-gradient(135deg, rgba(126,34,206,0.3) 0%, rgba(30,27,75,0.8) 100%)',
  'linear-gradient(135deg, rgba(109,40,217,0.3) 0%, rgba(30,27,75,0.8) 100%)',
  'linear-gradient(135deg, rgba(147,51,234,0.3) 0%, rgba(30,27,75,0.8) 100%)',
];

export default function ProjectsSection() {
  const { data: serverProjects = [], isLoading } = useGetProjectsQuery();
  const projects =
    serverProjects && serverProjects.length > 0 ? serverProjects : mockProjectsFallback;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-violet-900/8 rounded-full blur-[120px] pointer-events-none" />

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
            Portfolio
          </p>
          <div className="flex items-end gap-6">
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Projects.
            </h2>
            <div
              className="flex-1 h-px mb-3 hidden sm:block"
              style={{ background: 'linear-gradient(to right, var(--border-hover), transparent)' }}
            />
          </div>
          <p className="max-w-2xl mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            These projects showcase my practical skills and experience, each with descriptions
            and links to code repositories and live demos. They demonstrate my ability to handle
            complex challenges, adapt to different technologies, and oversee projects from start
            to finish.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid var(--border)', borderTopColor: '#7c3aed' }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden card-base"
              >
                {/* Image / gradient header */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: projectGradients[idx % projectGradients.length] }}
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="text-6xl font-black text-white/20"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {project.title?.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(5, 8, 22, 0.65)' }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2.5 rounded-xl transition-all cursor-pointer"
                      style={{ backgroundColor: '#7c3aed', color: '#fff' }}
                    >
                      <Eye size={18} />
                    </button>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl transition-all"
                        style={{ backgroundColor: '#7c3aed', color: '#fff' }}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl transition-all"
                        style={{ backgroundColor: '#a21caf', color: '#fff' }}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold text-[#fbbf24] bg-[#fbbf24]/15 border border-[#fbbf24]/30 rounded-full backdrop-blur-md">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-lg font-bold mb-2 transition-colors"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm line-clamp-2 mb-4 leading-relaxed transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full tech-pill"
                        style={{
                          backgroundColor: 'rgba(124,58,237,0.1)',
                          borderColor: 'rgba(124,58,237,0.2)',
                          borderWidth: '1px',
                          color: 'var(--accent)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            style={{ backgroundColor: 'rgba(5, 8, 22, 0.85)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              {selectedProject.image_url && (
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
                  >
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg transition-all cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedProject.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(124,58,237,0.2)',
                        color: 'var(--accent)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        borderColor: 'var(--accent)',
                        color: 'var(--text-primary)',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-all"
                      style={{ background: 'linear-gradient(to right, #7c3aed, #a21caf)' }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
