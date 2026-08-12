import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGetProjectsQuery } from '../../store/services/projectsApi';
import { ExternalLink, Github, Eye, Star } from 'lucide-react';

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

// Distinct smooth colors per technology
const techColorMap = {
  // JavaScript family
  'JavaScript':     { bg: 'rgba(234,179,8,0.15)',   border: 'rgba(234,179,8,0.35)',   color: '#facc15' },
  'TypeScript':     { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.35)',  color: '#60a5fa' },

  // Frontend frameworks
  'React':          { bg: 'rgba(34,211,238,0.15)',  border: 'rgba(34,211,238,0.35)',  color: '#22d3ee' },
  'Next.js':        { bg: 'rgba(255,255,255,0.1)',  border: 'rgba(255,255,255,0.25)', color: '#e2e8f0' },
  'Redux Toolkit':  { bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.35)',  color: '#a78bfa' },
  'Tailwind CSS':   { bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.35)',   color: '#22d3ee' },
  'Vue':            { bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.35)',  color: '#34d399' },
  'Angular':        { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },

  // Backend frameworks
  'Node.js':        { bg: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.35)',   color: '#4ade80' },
  'Express.js':     { bg: 'rgba(161,161,170,0.15)', border: 'rgba(161,161,170,0.35)', color: '#d4d4d8' },
  'NestJS':         { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.35)',  color: '#f472b6' },
  'FastAPI':        { bg: 'rgba(20,184,166,0.15)',  border: 'rgba(20,184,166,0.35)',  color: '#2dd4bf' },
  'Django':         { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.35)',  color: '#34d399' },
  'Flask':          { bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.35)', color: '#94a3b8' },
  'Spring Boot':    { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)',    color: '#4ade80' },

  // Databases
  'PostgreSQL':     { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.35)',  color: '#818cf8' },
  'MySQL':          { bg: 'rgba(251,146,60,0.15)',  border: 'rgba(251,146,60,0.35)',  color: '#fb923c' },
  'MongoDB':        { bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.35)',  color: '#34d399' },
  'SQLite':         { bg: 'rgba(125,211,252,0.15)', border: 'rgba(125,211,252,0.35)', color: '#7dd3fc' },
  'Redis':          { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },
  'Sequelize':      { bg: 'rgba(168,85,247,0.15)',  border: 'rgba(168,85,247,0.35)',  color: '#c084fc' },
  'Prisma':         { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.35)',  color: '#60a5fa' },

  // Tools / Infra
  'Docker':         { bg: 'rgba(56,189,248,0.15)',  border: 'rgba(56,189,248,0.35)',  color: '#38bdf8' },
  'Git':            { bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.35)',  color: '#fb923c' },
  'REST API':       { bg: 'rgba(251,191,36,0.15)',  border: 'rgba(251,191,36,0.35)',  color: '#fbbf24' },
  'SMS API':        { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)', color: '#a78bfa' },
  'WebSocket':      { bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)',   color: '#22d3ee' },

  // Languages
  'Python':         { bg: 'rgba(250,204,21,0.15)',  border: 'rgba(250,204,21,0.35)',  color: '#facc15' },
  'Java':           { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },
  'Go':             { bg: 'rgba(34,211,238,0.15)',  border: 'rgba(34,211,238,0.35)',  color: '#22d3ee' },
};

// Deterministic fallback for unknown tags
const hashColor = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  const hue = Math.abs(h) % 360;
  return {
    bg:     `hsla(${hue},70%,60%,0.12)`,
    border: `hsla(${hue},70%,60%,0.3)`,
    color:  `hsl(${hue},80%,72%)`,
  };
};

const getTagStyle = (tag) => techColorMap[tag] || hashColor(tag);

export default function ProjectsSection() {
  const { data: serverProjects = [], isLoading } = useGetProjectsQuery();
  const projects =
    serverProjects && serverProjects.length > 0 ? serverProjects : mockProjectsFallback;

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
          <p className="max-w-2xl mt-4 leading-relaxed text-justify" style={{ color: 'var(--text-secondary)' }}>
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
                    <Link
                      to={`/projects/${project.id}`}
                      className="p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                      style={{ backgroundColor: '#7c3aed', color: '#fff' }}
                    >
                      <Eye size={18} />
                    </Link>
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
                    <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#fbbf24]/15 border border-[#fbbf24]/40 rounded-full backdrop-blur-md shadow-lg shadow-amber-500/20">
                      <Star size={14} className="text-[#fbbf24]" fill="#fbbf24" />
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
                    {project.summary || project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || []).slice(0, 4).map((tag) => {
                      const s = getTagStyle(tag);
                      return (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: s.bg,
                            border: `1px solid ${s.border}`,
                            color: s.color,
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
