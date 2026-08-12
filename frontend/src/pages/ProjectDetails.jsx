import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Star, Code, Server, Cpu, Database, ShieldAlert } from 'lucide-react';
import { useGetProjectsQuery } from '../store/services/projectsApi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Keep colors consistent with ProjectsSection
const techColorMap = {
  'JavaScript':     { bg: 'rgba(234,179,8,0.15)',   border: 'rgba(234,179,8,0.35)',   color: '#facc15' },
  'TypeScript':     { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.35)',  color: '#60a5fa' },
  'React':          { bg: 'rgba(34,211,238,0.15)',  border: 'rgba(34,211,238,0.35)',  color: '#22d3ee' },
  'Next.js':        { bg: 'rgba(255,255,255,0.1)',  border: 'rgba(255,255,255,0.25)', color: '#e2e8f0' },
  'Redux Toolkit':  { bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.35)',  color: '#a78bfa' },
  'Tailwind CSS':   { bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.35)',   color: '#22d3ee' },
  'Vue':            { bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.35)',  color: '#34d399' },
  'Angular':        { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },
  'Node.js':        { bg: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.35)',   color: '#4ade80' },
  'Express.js':     { bg: 'rgba(161,161,170,0.15)', border: 'rgba(161,161,170,0.35)', color: '#d4d4d8' },
  'NestJS':         { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.35)',  color: '#f472b6' },
  'FastAPI':        { bg: 'rgba(20,184,166,0.15)',  border: 'rgba(20,184,166,0.35)',  color: '#2dd4bf' },
  'Django':         { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.35)',  color: '#34d399' },
  'Flask':          { bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.35)', color: '#94a3b8' },
  'Spring Boot':    { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)',    color: '#4ade80' },
  'PostgreSQL':     { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.35)',  color: '#818cf8' },
  'MySQL':          { bg: 'rgba(251,146,60,0.15)',  border: 'rgba(251,146,60,0.35)',  color: '#fb923c' },
  'MongoDB':        { bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.35)',  color: '#34d399' },
  'SQLite':         { bg: 'rgba(125,211,252,0.15)', border: 'rgba(125,211,252,0.35)', color: '#7dd3fc' },
  'Redis':          { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },
  'Sequelize':      { bg: 'rgba(168,85,247,0.15)',  border: 'rgba(168,85,247,0.35)',  color: '#c084fc' },
  'Prisma':         { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.35)',  color: '#60a5fa' },
  'Docker':         { bg: 'rgba(56,189,248,0.15)',  border: 'rgba(56,189,248,0.35)',  color: '#38bdf8' },
  'Git':            { bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.35)',  color: '#fb923c' },
  'REST API':       { bg: 'rgba(251,191,36,0.15)',  border: 'rgba(251,191,36,0.35)',  color: '#fbbf24' },
  'SMS API':        { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)', color: '#a78bfa' },
  'WebSocket':      { bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)',   color: '#22d3ee' },
  'Python':         { bg: 'rgba(250,204,21,0.15)',  border: 'rgba(250,204,21,0.35)',  color: '#facc15' },
  'Java':           { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },
  'Go':             { bg: 'rgba(34,211,238,0.15)',  border: 'rgba(34,211,238,0.35)',  color: '#22d3ee' },
  'Google Gemini API': { bg: 'rgba(147,51,234,0.15)', border: 'rgba(147,51,234,0.35)', color: '#d8b4fe' },
};

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

// Fallbacks
const mockProjectsFallback = [
  {
    id: 'mp1',
    title: 'Microfinance Transaction Engine',
    description: 'A performant transaction ledger engine built for microfinance systems. Architected with atomic transactions to guarantee consistency, comprehensive audit logs, and multi-tier Role-Based Access Control.',
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Sequelize'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: true,
  },
  {
    id: 'mp2',
    title: 'Land Administration System Portal',
    description: 'An enterprise web application developed to coordinate regional zone and woreda level land registrations. Implemented secure regional RBAC privileges and real-time alerts workflow.',
    tags: ['React', 'Redux Toolkit', 'Node.js', 'PostgreSQL'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: true,
  },
  {
    id: 'mp3',
    title: 'Askuala Payment Hub',
    description: 'Integrates payment gateways, local banking SMS notification APIs, and automated employee/student onboarding submodules, streamlining real-time financial tracking.',
    tags: ['JavaScript', 'Express.js', 'SMS API', 'REST API'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: false,
  },
  {
    id: 'mp4',
    title: 'Birr Track Finance App',
    description: 'An offline-first personal budget manager showcasing local SQLite repository integration, robust transaction records, and clean dynamic charts visualization.',
    tags: ['React', 'TypeScript', 'SQLite', 'Tailwind CSS'],
    github_url: 'https://github.com/Zwubman',
    live_url: '',
    featured: false,
  },
];



export default function ProjectDetails() {
  const { id } = useParams();
  const { data: serverProjects = [], isLoading } = useGetProjectsQuery();

  // Find project by ID or slug
  const allProjects = serverProjects && serverProjects.length > 0 ? serverProjects : mockProjectsFallback;
  const project = allProjects.find(
    (p) => String(p.id) === String(id) || String(p.slug) === String(id) || (p.title && p.title.toLowerCase().includes(String(id).split('-')[0]))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080620] text-white">
        <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#080620] text-white px-4">
        <ShieldAlert size={48} className="text-purple-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-purple-200/60 mb-6">We couldn't retrieve the details for this project.</p>
        <Link to="/" className="px-5 py-2.5 bg-purple-600 rounded-xl font-medium hover:bg-purple-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen flex flex-col bg-[#07051a] text-white selection:bg-[#7c3aed]/30 selection:text-white">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Top bar with back button */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={() => {
              // Scroll to project section if going home
              setTimeout(() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-white transition-all group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Project Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Visuals & Title (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden border border-purple-500/10 bg-[#0e0b30]/60 backdrop-blur-md p-2 shadow-2xl shadow-purple-900/10"
            >
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full rounded-xl object-cover object-top max-h-[500px]"
                />
              ) : (
                <div className="w-full h-80 rounded-xl bg-purple-900/15 flex items-center justify-center text-purple-400">
                  No Preview Image Available
                </div>
              )}

              {project.featured && (
                <div className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-[#fbbf24]/20 border border-[#fbbf24]/40 rounded-full backdrop-blur-md shadow-lg shadow-amber-500/25">
                  <Star size={16} fill="#fbbf24" className="text-[#fbbf24]" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {project.title}
              </h1>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).map((tag) => {
                  const s = getTagStyle(tag);
                  return (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold rounded-full border"
                      style={{
                        backgroundColor: s.bg,
                        borderColor: s.border,
                        color: s.color,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Description & Technical highlights (Col 5) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl border border-purple-500/10 bg-[#0e0b35]/40 backdrop-blur-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-purple-200 border-b border-purple-500/10 pb-2 flex items-center gap-2">
                <Code size={18} className="text-purple-400" />
                Project Overview
              </h3>
              <p className="text-[14.5px] leading-relaxed text-purple-200/80 text-justify">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-purple-500/30 bg-[#7c3aed]/10 text-purple-200 hover:text-white hover:bg-[#7c3aed]/20 transition-all font-medium text-xs sm:text-sm cursor-pointer"
                  >
                    <Github size={16} />
                    View Code Repository
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:opacity-90 hover:scale-[1.01] transition-all font-medium text-xs sm:text-sm cursor-pointer shadow-lg shadow-purple-500/15"
                  >
                    <ExternalLink size={16} />
                    Try Live Application
                  </a>
                )}
              </div>
            </motion.div>

            {/* Engineered Details Container */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              {(project.features && project.features.length > 0) && (
                <>
                  <h3 className="text-lg font-bold text-purple-200 flex items-center gap-2">
                    <Star size={18} className="text-fuchsia-400" />
                    Key Features
                  </h3>

                  <div className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-purple-500/10 bg-[#0e0b35]/20 hover:border-purple-500/30 transition-all flex items-start gap-4"
                      >
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 shrink-0 mt-0.5">
                          <Star size={14} fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-[14.5px] leading-relaxed text-purple-100">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
