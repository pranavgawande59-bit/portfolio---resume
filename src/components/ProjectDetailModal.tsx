import React, { useState } from 'react';
import { ProjectItem } from '../types';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Copy,
  Check,
  Code2,
  Server,
  Zap,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'source'>('overview');
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const isOngoing = project.status === 'in-progress';

  const handleCopyCode = () => {
    if (!project.sourceSnippet) return;
    navigator.clipboard.writeText(project.sourceSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col z-10 border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center font-mono font-bold text-xs">
              <Server className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#0284c7] uppercase tracking-wider">
                Pro Hub Node Inspector
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0f172a] truncate max-w-xs sm:max-w-md">
                {project.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Project Preview Image / Visual Asset */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video max-h-72 border border-gray-200/80 shadow-xs group">
            {project.imageUrl && !imageError ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white p-6 text-center space-y-2">
                <Layers className="w-12 h-12 text-[#38bdf8] stroke-[1.5]" />
                <p className="text-sm font-semibold text-sky-100">{project.title}</p>
                <p className="text-xs text-sky-300/80 max-w-sm">{project.tagline}</p>
              </div>
            )}

            {/* Gradient Overlay with Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#0369a1] shadow-xs">
                {project.category}
              </span>
              {project.featured && (
                <span className="text-[10px] font-bold text-amber-900 bg-amber-400/90 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-900" /> Featured Node
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="font-semibold drop-shadow-sm line-clamp-1">{project.tagline}</span>
              {isOngoing ? (
                <span className="bg-sky-500/90 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {project.progressPercentage || 85}% Dev Complete
                </span>
              ) : (
                <span className="bg-emerald-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-white" /> Production Ready
                </span>
              )}
            </div>
          </div>

          {/* Action Links Bar: GitHub Source & Live Demo */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f8fafc] border border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#64748b]">Repository &amp; Deployment:</span>
            </div>

            <div className="flex items-center gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Tabs: Overview vs Source Architecture */}
          <div className="flex items-center gap-2 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border-b-2 ${
                activeTab === 'overview'
                  ? 'border-[#0284c7] text-[#0284c7]'
                  : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>System Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('source')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border-b-2 ${
                activeTab === 'source'
                  ? 'border-[#0284c7] text-[#0284c7]'
                  : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Source &amp; Architecture Blueprint</span>
            </button>
          </div>

          {activeTab === 'overview' ? (
            <div className="space-y-5">
              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Engineering Scope
                </h4>
                <p className="text-sm text-[#334155] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Benchmarked Metric Box */}
              <div className="p-4 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd]/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#0369a1] uppercase tracking-wider">
                    Performance Benchmark
                  </span>
                  <p className="text-sm font-bold text-[#0f172a] mt-0.5">
                    {project.metrics}
                  </p>
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Core Architecture Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.architectureHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#f8fafc] border border-gray-100 flex items-start gap-2 text-xs text-[#334155]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] mt-1.5 shrink-0" />
                      <span className="leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Pill Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-gray-100 text-[#334155] border border-gray-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#0284c7]" />
                  <span className="text-xs font-bold text-[#0f172a]">
                    Engineered Source Blueprint
                  </span>
                </div>
                {project.sourceSnippet && (
                  <button
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {project.sourceSnippet ? (
                <div className="rounded-2xl bg-[#0b1120] p-4 text-xs font-mono text-[#e2e8f0] overflow-x-auto border border-gray-800 shadow-inner">
                  <pre className="leading-relaxed whitespace-pre font-mono">
                    {project.sourceSnippet}
                  </pre>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-gray-500 rounded-2xl bg-gray-50 border border-gray-200">
                  Detailed repository structure available directly on GitHub.
                </div>
              )}

              {project.githubUrl && (
                <div className="text-xs text-[#64748b] flex items-center justify-between pt-2">
                  <span>Full source tree and documentation hosted on GitHub:</span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0284c7] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Visit Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-gray-100 bg-[#f8fafc] flex items-center justify-between">
          <span className="text-xs text-[#64748b]">
            Architected by Pranav Gawande
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
