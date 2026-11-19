import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Zap,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useOwnerAuth } from '../utils/ownerAuthHelper';
import { ProjectDetailModal } from './ProjectDetailModal';

export const PortfolioView: React.FC = () => {
  const { projects } = useOwnerAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend & APIs', 'Cloud Architecture'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 md:py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit border border-[#bae6fd]">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Showcase
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
          Architected Systems &amp; Deployments
        </h2>
        <p className="text-base sm:text-lg text-[#64748b] max-w-3xl leading-relaxed">
          Production-grade web applications, scalable cloud architectures, and modern full-stack deployments.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-[#475569] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
              No Projects Listed
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              New projects and production case studies will appear here once published.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-[#0284c7] hover:shadow-lg transition-all group cursor-pointer"
            >
              {/* Card Image Banner */}
              {project.imageUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs text-sky-200 line-clamp-1 font-medium">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6 lg:p-8 flex flex-col justify-between flex-1">
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[#0284c7] bg-[#f0f9ff] px-3 py-1 rounded-full uppercase tracking-wider border border-[#e0f2fe]">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.status === 'completed' ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Shipped
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                          In Dev
                        </span>
                      )}
                      {project.featured && (
                        <span className="text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-600" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#0284c7] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#64748b] mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies & Source Action */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-gray-50 text-[#475569] border border-gray-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                      title="Inspect Project"
                    >
                      <Code2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Inspect</span>
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-gray-500 hover:text-[#0284c7] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};
