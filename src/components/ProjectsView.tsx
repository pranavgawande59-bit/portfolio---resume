import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Activity,
  Flame,
  Layers,
  Clock,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export const ProjectsView: React.FC = () => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend & APIs', 'Cloud Architecture'];

  // Filter projects by status tab and category
  const filteredProjects = projectsData.filter((p) => {
    const matchesStatus =
      selectedStatusTab === 'all'
        ? true
        : selectedStatusTab === 'in-progress'
        ? p.status === 'in-progress'
        : p.status === 'completed';

    const matchesCategory = selectedCategory === 'All' ? true : p.category === selectedCategory;

    return matchesStatus && matchesCategory;
  });

  const ongoingCount = projectsData.filter((p) => p.status === 'in-progress').length;
  const completedCount = projectsData.filter((p) => p.status === 'completed').length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0f9ff] text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineered Systems</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
          Architected &amp; Ongoing Projects
        </h1>
        <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
          Production-grade web applications, responsive user interfaces, RESTful microservices, and distributed cloud infrastructure.
        </p>
      </div>

      {/* Main Filter Section with generous gaps */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-4 border-b border-gray-100">
          {/* Status Tabs with increased gap and breathing room */}
          <div className="flex items-center gap-1.5 p-1.5 bg-gray-100/90 rounded-2xl w-full lg:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedStatusTab('all')}
              className={`flex-1 lg:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                selectedStatusTab === 'all'
                  ? 'bg-white text-[#0f172a] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Projects</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono">
                {projectsData.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedStatusTab('in-progress')}
              className={`flex-1 lg:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                selectedStatusTab === 'in-progress'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'text-[#64748b] hover:text-[#0284c7]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span>Ongoing Projects</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                  selectedStatusTab === 'in-progress' ? 'bg-[#0369a1] text-white' : 'bg-sky-100 text-[#0284c7]'
                }`}
              >
                {ongoingCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedStatusTab('completed')}
              className={`flex-1 lg:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                selectedStatusTab === 'completed'
                  ? 'bg-white text-[#0f172a] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Shipped / Production</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono">
                {completedCount}
              </span>
            </button>
          </div>

          {/* Category Filter Pills with generous spacing */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid with increased gap */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] flex items-center justify-center mx-auto shadow-2xs">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
              No Projects Listed
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              New project case studies and software repositories will be listed here as they are published and open-sourced.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isOngoing = project.status === 'in-progress';

            return (
              <div
                key={project.id}
                className={`bg-white rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group ${
                  isOngoing
                    ? 'border-2 border-[#bae6fd] hover:border-[#0284c7] relative overflow-hidden'
                    : 'border border-gray-200/90 hover:border-[#38bdf8]'
                }`}
              >
                {/* Ongoing background accent indicator */}
                {isOngoing && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e0f2fe] to-transparent -mr-6 -mt-6 rounded-bl-full pointer-events-none" />
                )}

                <div className="space-y-4">
                  {/* Top Badge Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#e0f2fe] text-[#0369a1]">
                        {project.category}
                      </span>

                      {isOngoing ? (
                        <span className="text-[10px] font-bold text-[#0284c7] bg-[#f0f9ff] border border-[#bae6fd] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0284c7]"></span>
                          </span>
                          In Active Dev
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Shipped
                        </span>
                      )}
                    </div>

                    {project.featured && !isOngoing && (
                      <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#0284c7] transition-colors flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
                    </h3>
                    <p className="text-xs text-[#0284c7] font-medium mt-1">{project.tagline}</p>
                  </div>

                  {/* Progress bar if Ongoing */}
                  {isOngoing && project.progressPercentage && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-[#f0f9ff]/70 border border-[#e0f2fe]">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-[#0369a1] flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-[#0284c7]" /> Development Progress
                        </span>
                        <span className="text-[#0284c7] font-mono">{project.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0284c7] h-full rounded-full transition-all duration-500"
                          style={{ width: `${project.progressPercentage}%` }}
                        />
                      </div>
                      {project.expectedCompletion && (
                        <div className="flex items-center gap-1 text-[11px] text-[#64748b] pt-0.5">
                          <Clock className="w-3 h-3 text-[#0284c7]" />
                          <span>Target release: {project.expectedCompletion}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metric Box */}
                  <div className="p-3 bg-[#f8fafc] border border-gray-100 rounded-xl">
                    <p className="text-xs font-semibold text-[#0f172a] flex items-start gap-1.5">
                      {isOngoing ? (
                        <Flame className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                      )}
                      <span>{project.metrics}</span>
                    </p>
                  </div>

                  {/* Architecture Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Core Architecture:
                    </span>
                    <ul className="text-xs text-[#64748b] space-y-1">
                      {project.architectureHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#0284c7] mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Tech stack & External links */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-gray-500 hover:text-[#0f172a] hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 text-xs"
                        title="View Repository"
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
            );
          })}
        </div>
      )}
    </div>
  );
};
