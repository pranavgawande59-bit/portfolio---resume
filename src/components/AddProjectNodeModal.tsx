import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, PlusCircle, Server, Check, Link, Image as ImageIcon, Code } from 'lucide-react';

interface AddProjectNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectItem) => void;
  editingProject?: ProjectItem | null;
}

export const AddProjectNodeModal: React.FC<AddProjectNodeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
}) => {
  const [title, setTitle] = useState(editingProject?.title || '');
  const [category, setCategory] = useState<ProjectItem['category']>(
    editingProject?.category || 'Full-Stack'
  );
  const [tagline, setTagline] = useState(editingProject?.tagline || '');
  const [description, setDescription] = useState(editingProject?.description || '');
  const [imageUrl, setImageUrl] = useState(
    editingProject?.imageUrl ||
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
  );
  const [githubUrl, setGithubUrl] = useState(
    editingProject?.githubUrl || 'https://github.com/pranavgawande59'
  );
  const [demoUrl, setDemoUrl] = useState(editingProject?.demoUrl || '');
  const [metrics, setMetrics] = useState(
    editingProject?.metrics || '40% latency reduction with sub-second queries'
  );
  const [techStackInput, setTechStackInput] = useState(
    editingProject?.techStack.join(', ') || 'React, TypeScript, Node.js, Docker'
  );
  const [highlightsInput, setHighlightsInput] = useState(
    editingProject?.architectureHighlights.join('\n') ||
    'Microservice architecture with event-driven data pipeline\nAutomated container health probes and graceful degradation'
  );
  const [sourceSnippet, setSourceSnippet] = useState(
    editingProject?.sourceSnippet ||
    `// Pro Hub Node Controller\nexport async function handleNodeRequest(req, res) {\n  return res.json({ status: 'healthy', node: 'pro-hub-01' });\n}`
  );
  const [status, setStatus] = useState<ProjectItem['status']>(
    editingProject?.status || 'completed'
  );
  const [progressPercentage, setProgressPercentage] = useState(
    editingProject?.progressPercentage || 85
  );
  const [featured, setFeatured] = useState(editingProject?.featured || false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const techStack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const architectureHighlights = highlightsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newProject: ProjectItem = {
      id: editingProject?.id || `proj-${Date.now()}`,
      title: title.trim(),
      category,
      tagline: tagline.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      githubUrl: githubUrl.trim(),
      demoUrl: demoUrl.trim() || undefined,
      metrics: metrics.trim(),
      techStack: techStack.length > 0 ? techStack : ['TypeScript', 'Node.js'],
      architectureHighlights:
        architectureHighlights.length > 0
          ? architectureHighlights
          : ['Scalable distributed architecture'],
      sourceSnippet: sourceSnippet.trim() || undefined,
      status,
      progressPercentage: status === 'in-progress' ? Number(progressPercentage) : undefined,
      featured,
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col z-10 border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center font-bold">
              <PlusCircle className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#0284c7] uppercase tracking-wider">
                Pro Hub Node Creator
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0f172a]">
                {editingProject ? 'Edit Pro Hub Node' : 'Add New Pro Hub Node'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a]">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. ProHub: Microservices Mesh"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white bg-[#f8fafc]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a]">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectItem['category'])}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend & APIs">Backend &amp; APIs</option>
                <option value="Cloud Architecture">Cloud Architecture</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a]">Deployment Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectItem['status'])}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
              >
                <option value="completed">Shipped / Production</option>
                <option value="in-progress">In Active Development</option>
              </select>
            </div>
          </div>

          {status === 'in-progress' && (
            <div className="space-y-1.5 p-3 rounded-xl bg-[#f0f9ff] border border-[#bae6fd]">
              <div className="flex justify-between text-xs font-bold text-[#0369a1]">
                <span>Progress Percentage</span>
                <span>{progressPercentage}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="99"
                value={progressPercentage}
                onChange={(e) => setProgressPercentage(Number(e.target.value))}
                className="w-full accent-[#0284c7] cursor-pointer"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a]">Tagline</label>
            <input
              type="text"
              placeholder="Short headline summary..."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a]">Description *</label>
            <textarea
              rows={3}
              required
              placeholder="Detailed architecture and engineering overview..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Project Mockup / Preview Image URL</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/pranavgawande59/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Live Demo URL (Optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a]">Key Benchmark Metric</label>
            <input
              type="text"
              placeholder="e.g. 15,000+ req/sec with <15ms latency"
              value={metrics}
              onChange={(e) => setMetrics(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a]">
              Tech Stack (Comma-separated)
            </label>
            <input
              type="text"
              placeholder="Node.js, Express, Docker, Redis, AWS"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a]">
              Architecture Highlights (One per line)
            </label>
            <textarea
              rows={3}
              placeholder="High-speed reverse proxy with health probes&#10;Redis caching layer"
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#f8fafc] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Source Blueprint / Architecture Code Snippet</span>
            </label>
            <textarea
              rows={4}
              placeholder="// Architecture code snippet"
              value={sourceSnippet}
              onChange={(e) => setSourceSnippet(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] bg-[#0b1120] text-sky-200 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featured-node"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded text-[#0284c7] focus:ring-[#0284c7] w-4 h-4 cursor-pointer"
            />
            <label htmlFor="featured-node" className="text-xs font-semibold text-[#0f172a] cursor-pointer">
              Feature this node at the top of the Pro Hub
            </label>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{editingProject ? 'Update Node' : 'Deploy Node to Pro Hub'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
