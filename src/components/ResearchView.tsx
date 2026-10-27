import React, { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  FileText,
  Sparkles,
  Quote,
  Mail,
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  FlaskConical,
  Users,
} from 'lucide-react';
import { researchData, profileData } from '../data/portfolioData';

interface ResearchViewProps {
  onOpenHireMe?: () => void;
}

export const ResearchView: React.FC<ResearchViewProps> = () => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | 'ongoing' | 'published'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (id: string, bibtex?: string) => {
    if (!bibtex) return;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const ongoingCount = researchData.filter((r) => r.status === 'in-progress' || r.status === 'under-review').length;
  const publishedCount = researchData.filter((r) => r.status === 'published').length;

  const filteredResearch = researchData.filter((item) => {
    if (selectedStatusTab === 'all') return true;
    if (selectedStatusTab === 'ongoing') return item.status === 'in-progress' || item.status === 'under-review';
    if (selectedStatusTab === 'published') return item.status === 'published';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0f9ff] text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Publications &amp; Active Research</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
          Research &amp; Technical Papers
        </h1>
        <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
          Academic publications, technical whitepapers, and ongoing research initiatives in intelligent systems and distributed computing.
        </p>
      </div>

      {/* Main Status Toggle (All / Ongoing / Published) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-4 border-b border-gray-100">
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
            <span>All Works</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono">
              {researchData.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedStatusTab('ongoing')}
            className={`flex-1 lg:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
              selectedStatusTab === 'ongoing'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'text-[#64748b] hover:text-[#0284c7]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>Ongoing Research</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                selectedStatusTab === 'ongoing' ? 'bg-[#0369a1] text-white' : 'bg-sky-100 text-[#0284c7]'
              }`}
            >
              {ongoingCount}
            </span>
          </button>

          <button
            onClick={() => setSelectedStatusTab('published')}
            className={`flex-1 lg:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
              selectedStatusTab === 'published'
                ? 'bg-white text-[#0f172a] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Peer-Reviewed &amp; Published</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono">
              {publishedCount}
            </span>
          </button>
        </div>

        <div className="text-xs text-[#64748b] flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#0284c7]" />
          <span>Active focus: Distributed Systems &amp; Cloud Infrastructure</span>
        </div>
      </div>

      {/* Research Papers List / Empty State */}
      {filteredResearch.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] flex items-center justify-center mx-auto shadow-2xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
              No Research Papers Listed
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Academic publications, preprints, and research manuscripts will be listed here as they are published and released.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filteredResearch.map((paper) => {
            const isOngoing = paper.status === 'in-progress' || paper.status === 'under-review';

            return (
              <div
                key={paper.id}
                className={`bg-white rounded-2xl p-6 sm:p-8 transition-all flex flex-col gap-6 relative overflow-hidden ${
                  isOngoing
                    ? 'border-2 border-[#bae6fd] hover:border-[#0284c7] shadow-2xs hover:shadow-md'
                    : 'border border-gray-200/90 hover:border-[#38bdf8] hover:shadow-md'
                }`}
              >
              {/* Background ambient accent for ongoing research */}
              {isOngoing && (
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#e0f2fe] to-transparent -mr-6 -mt-6 rounded-bl-full pointer-events-none" />
              )}

              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0284c7]">
                    <FileText className="w-4 h-4" />
                    <span>{paper.conferenceOrVenue}</span>
                  </div>

                  {paper.status === 'in-progress' && (
                    <span className="text-[10px] font-bold text-[#0284c7] bg-[#f0f9ff] border border-[#bae6fd] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0284c7]"></span>
                      </span>
                      In Progress
                    </span>
                  )}

                  {paper.status === 'under-review' && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                      <Clock className="w-3 h-3 text-amber-600" />
                      Under Peer Review
                    </span>
                  )}

                  {paper.status === 'published' && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Published
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full w-fit">
                  {paper.year}
                </span>
              </div>

              {/* Paper Title */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-snug">
                  {paper.title}
                </h2>
                {paper.collaborators && (
                  <p className="text-xs text-[#64748b] flex items-center gap-1.5 mt-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0284c7]" />
                    <span>Affiliation: {paper.collaborators.join(', ')}</span>
                  </p>
                )}
              </div>

              {/* Progress & Stage for Ongoing Research */}
              {isOngoing && (
                <div className="p-4 rounded-xl bg-[#f0f9ff]/80 border border-[#e0f2fe] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-semibold text-[#0369a1]">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>Current Stage: {paper.stage || 'Active Research & Benchmarking'}</span>
                    </span>
                    {paper.progressPercentage && (
                      <span className="font-mono text-[#0284c7]">{paper.progressPercentage}% Completed</span>
                    )}
                  </div>

                  {paper.progressPercentage && (
                    <div className="w-full bg-sky-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0284c7] h-full rounded-full transition-all duration-500"
                        style={{ width: `${paper.progressPercentage}%` }}
                      />
                    </div>
                  )}

                  {paper.expectedVenueOrDate && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#64748b] pt-0.5">
                      <Clock className="w-3 h-3 text-[#0284c7]" />
                      <span>Timeline: {paper.expectedVenueOrDate}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Abstract */}
              <div className="bg-[#f8fafc] p-5 rounded-xl border border-gray-100">
                <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-[#0284c7]" />
                  {isOngoing ? 'Research Overview & Hypothesis' : 'Abstract'}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              {/* Key Findings */}
              <div>
                <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">
                  {isOngoing ? 'Observed Benchmark Findings & Milestones' : 'Key Empirical Benchmark Results'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paper.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-gray-100 flex items-start gap-2.5 shadow-2xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#0284c7] mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-[#1e293b] leading-relaxed">
                        {finding}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-gray-50 border border-gray-200/80 text-gray-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {paper.bibtex && (
                    <button
                      onClick={() => handleCopyBibtex(paper.id, paper.bibtex)}
                      className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-[#334155] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === paper.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">BibTeX Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                          <span>Copy BibTeX</span>
                        </>
                      )}
                    </button>
                  )}

                  <a
                    href={`mailto:${profileData.email}?subject=${encodeURIComponent(
                      isOngoing ? `Early Collaboration / Preprint Inquiry: ${paper.title}` : `Paper Request: ${paper.title}`
                    )}`}
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{isOngoing ? 'Inquire / Collaborate' : 'Request Preprint PDF'}</span>
                  </a>
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
