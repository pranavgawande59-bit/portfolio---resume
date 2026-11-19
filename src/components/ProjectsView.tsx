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
  Code2,
  PlusCircle,
  Edit2,
  Trash2,
  Server,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useOwnerAuth } from '../utils/ownerAuthHelper';
import { ProjectDetailModal } from './ProjectDetailModal';
import { AddProjectNodeModal } from './AddProjectNodeModal';

export const ProjectsView: React.FC = () => {
  const { isOwner, projects, addOrUpdateProject, deleteProject } = useOwnerAuth();

  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectingProject, setInspectingProject] = useState<ProjectItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend & APIs', 'Cloud Architecture'];

  // Filter projects by status tab and category
  const filteredProjects = projects.filter((p) => {
    const matchesStatus =
      selectedStatusTab === 'all'
        ? true
        : selectedStatusTab === 'in-progress'
        ? p.status === 'in-progress'
        : p.status === 'completed';

    const matchesCategory = selectedCategory === 'All' ? true : p.category === selectedCategory;

    return matchesStatus && matchesCategory;
  });

  const ongoingCount = projects.filter((p) => p.status === 'in-progress').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsAddModalOpen(true);
  };

  const handleEditProject = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    setEditingProject(project);
    setIsAddModalOpen(true);
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Remove this node from Pro Hub?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0f9ff] text-[#0284c7] text-xs font-semibold uppercase tracking-wider border border-[#bae6fd]">
          <Server className="w-3.5 h-3.5" />
          <span>Pro Hub &bull; Engineered Systems</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
          Architected Systems &amp; Pro Hub Nodes
        </h1>
        <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
          Production-grade full-stack systems, high-concurrency microservice gateways, responsive interfaces, and cloud infrastructure architectures.
        </p>

        {isOwner && (
          <div className="pt-2">
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Deploy New Node to Pro Hub</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Filter Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-4 border-b border-gray-100">
          {/* Status Tabs */}
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
                {projects.length}
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

          {/* Category Filter Pills */}
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

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] flex items-center justify-center mx-auto shadow-2xs">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
              {projects.length === 0 ? 'No Projects Listed' : 'No Projects in this Filter'}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              {projects.length === 0
                ? 'All projects have been removed. New projects will appear here once added.'
                : 'Switch categories or status filters above to explore other architected systems.'}
            </p>
          </div>

          {isOwner && projects.length === 0 && (
            <div className="pt-2">
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Your First Project</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isOngoing = project.status === 'in-progress';

            return (
              <div
                key={project.id}
                onClick={() => setInspectingProject(project)}
                className={`bg-white rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer border ${
                  isOngoing
                    ? 'border-[#bae6fd] hover:border-[#0284c7]'
                    : 'border-gray-200 hover:border-[#38bdf8]'
                }`}
              >
                {/* Visual Image Banner with Gradient & Overlay Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-sky-950 text-white p-6">
                      <Server className="w-10 h-10 text-sky-400 mb-2" />
                      <span className="text-xs font-mono text-sky-200">Pro Hub Node</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top image chips */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[#0369a1] shadow-xs">
                        {project.category}
                      </span>

                      {isOngoing ? (
                        <span className="text-[10px] font-bold text-sky-900 bg-sky-200/90 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-wider shadow-xs">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-600"></span>
                          </span>
                          In Dev
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-900 bg-emerald-200/90 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-800" /> Shipped
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {project.featured && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-300/90 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}

                      {isOwner && (
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg">
                          <button
                            onClick={(e) => handleEditProject(e, project)}
                            className="p-1 hover:bg-gray-200 rounded text-gray-700"
                            title="Edit Node"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProject(e, project.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                            title="Delete Node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Image Headline */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-sky-200 line-clamp-1 font-medium drop-shadow-sm">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#0284c7] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-2" />
                      </h3>
                    </div>

                    {/* Progress bar if Ongoing */}
                    {isOngoing && project.progressPercentage && (
                      <div className="space-y-1.5 p-3 rounded-2xl bg-[#f0f9ff]/70 border border-[#e0f2fe]">
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
                    <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Key Benchmark Metric Box */}
                    <div className="p-3 bg-[#f8fafc] border border-gray-100 rounded-2xl">
                      <p className="text-xs font-semibold text-[#0f172a] flex items-start gap-1.5">
                        {isOngoing ? (
                          <Flame className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        <span>{project.metrics}</span>
                      </p>
                    </div>

                    {/* Architecture Highlights preview */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Architecture Highlights:
                      </span>
                      <ul className="text-xs text-[#64748b] space-y-1">
                        {project.architectureHighlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                            <span className="text-[#0284c7] mt-0.5">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Tech stack & Interactive Actions */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5 max-w-[60%]">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] bg-gray-50 text-gray-400 font-medium px-1.5 py-0.5 rounded-md">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setInspectingProject(project)}
                        className="px-2.5 py-1.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#0284c7] rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Inspect Node Specs & Architecture"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Inspect</span>
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-gray-500 hover:text-[#0f172a] hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-1 text-xs"
                          title="Inspect Source Code on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-gray-500 hover:text-[#0284c7] hover:bg-gray-100 rounded-xl transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />

      {/* Add / Edit Project Node Modal */}
      <AddProjectNodeModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        editingProject={editingProject}
        onSave={(updatedProject) => {
          addOrUpdateProject(updatedProject);
        }}
      />
    </div>
  );
};
