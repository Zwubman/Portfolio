import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProjectsQuery } from '../../store/services/projectsApi';
import { ExternalLink, Github, X, Eye, Star } from 'lucide-react';

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Gather unique tags
  const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags || []))];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => (p.tags || []).includes(activeFilter));

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-100 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Featured Projects
          </h2>
          <p className="text-purple-200/50 max-w-xl mx-auto">
            A selection of projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        {/* Filter tags */}
        {allTags.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                  activeFilter === tag
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-200'
                    : 'bg-transparent border-purple-500/10 text-purple-300/50 hover:border-purple-500/30 hover:text-purple-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Star size={48} className="mx-auto text-purple-500/20 mb-4" />
            <p className="text-purple-200/40 text-lg">No projects yet. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-4xl font-bold text-purple-500/20" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {project.title?.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#0E0B24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:bg-purple-500/30 transition-all cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:bg-purple-500/30 transition-all"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:bg-purple-500/30 transition-all"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 rounded-full backdrop-blur-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-purple-100 mb-2">{project.title}</h3>
                  <p className="text-purple-200/50 text-sm line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs text-purple-300/60 bg-purple-500/10 border border-purple-500/10 rounded-md"
                      >
                        {tag}
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
            className="fixed inset-0 z-50 bg-[#0E0B24]/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-[#13102e] border border-purple-500/20 overflow-hidden shadow-2xl"
            >
              {/* Header image */}
              {selectedProject.image_url && (
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-purple-100">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg text-purple-300/50 hover:text-white hover:bg-purple-500/10 transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-purple-200/60 leading-relaxed mb-6">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedProject.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-purple-300/70 bg-purple-500/10 border border-purple-500/15 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm font-medium hover:bg-purple-500/20 transition-all"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-medium hover:opacity-90 transition-all"
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
