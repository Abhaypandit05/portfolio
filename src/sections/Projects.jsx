import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import SectionWrapper from '../components/SectionWrapper';

const projectCategories = ['All', 'Frontend', 'Full-Stack'];

// Maps the filter button label to the `category` value used in each project
const categoryMap = {
  Frontend: 'frontend',
  'Full-Stack': 'fullstack',
};

const projects = [
  {
    id: 1,
    title: 'VastuGrid — Platform for Civil Engineers',
    description:
      'A modern web platform for civil engineers with a responsive and user-friendly interface. Uses PostgreSQL for backend database management and data handling, cloud storage for managing project-related data, and EmailJS for contact and communication features. Currently in development.',
    technologies: ['React', 'PostgreSQL', 'Cloud Storage', 'EmailJS'],
    category: 'fullstack',
    image_url: '',
    github_url: '#', // add your repo link
    live_demo_url: '#', // add your live link
  },
  {
    id: 2,
    title: 'BiharBees',
    description:
      'A responsive, deployed frontend website with a modern and user-friendly interface. Integrates the YouTube API to fetch and display dynamic video content efficiently, with UI performance optimized for a smooth experience across devices.',
    technologies: ['React', 'JavaScript', 'YouTube API', 'CSS'],
    category: 'frontend',
    image_url: '',
    github_url: '#', // add your repo link
    live_demo_url: '#', // add your Netlify link
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === categoryMap[activeCategory]);

  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="A collection of projects that showcase my skills and passion for development."
    >
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] text-white shadow-lg shadow-blue-500/20'
                : 'glass text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <motion.div layout className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card overflow-hidden group"
            >
              {/* Image / placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--color-dark-600)] to-[var(--color-dark-800)] overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold gradient-text mb-2">
                        {project.title.charAt(0)}
                      </div>
                      <p className="text-xs text-slate-500 font-mono">{project.title}</p>
                    </div>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-900)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    <Eye size={14} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--color-accent-blue)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-[rgba(59,130,246,0.08)]">
                  {project.github_url && project.github_url !== '#' && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <GithubIcon size={16} />
                      Source Code
                    </a>
                  )}
                  {project.live_demo_url && project.live_demo_url !== '#' && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--color-accent-blue)] hover:text-[var(--color-accent-cyan)] transition-colors ml-auto"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="glass-card max-w-xl w-full p-8 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies?.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {selectedProject.github_url && selectedProject.github_url !== '#' && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm py-2 px-4"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProject.live_demo_url && selectedProject.live_demo_url !== '#' && (
                  <a
                    href={selectedProject.live_demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="mt-6 text-sm text-slate-500 hover:text-white transition-colors"
              >
                ← Back to projects
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}