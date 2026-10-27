import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Star,
  Quote,
  CheckCircle2,
  PlusCircle,
  X,
  Send,
  ShieldCheck,
  Building2,
  UserCheck,
  Sparkles,
  Filter,
  ExternalLink,
  Mail,
  FileCheck,
  Users,
} from 'lucide-react';
import { reviewsData, profileData } from '../data/portfolioData';
import { TestimonialItem } from '../types';

interface ReviewsSectionProps {
  onOpenHireMe: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenHireMe }) => {
  const [reviews, setReviews] = useState<TestimonialItem[]>(reviewsData);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formRelationship, setFormRelationship] = useState('Client Partner');
  const [formRating, setFormRating] = useState(5);
  const [formMetric, setFormMetric] = useState('');
  const [formTag, setFormTag] = useState('Full-Stack Systems');
  const [formContent, setFormContent] = useState('');

  // Load any user-submitted reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pranav_portfolio_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge avoiding duplicate IDs
          const existingIds = new Set(reviewsData.map((r) => r.id));
          const custom = parsed.filter((r: TestimonialItem) => !existingIds.has(r.id));
          setReviews([...custom, ...reviewsData]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContent.trim() || !formCompany.trim()) return;

    const newReview: TestimonialItem = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      role: formRole.trim() || 'Software Engineer',
      companyOrOrg: formCompany.trim(),
      relationship: formRelationship,
      rating: formRating,
      highlightMetric: formMetric.trim() || undefined,
      tags: [formTag],
      date: 'Just now',
      content: formContent.trim(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      const stored = localStorage.getItem('pranav_portfolio_reviews');
      const prevStored = stored ? JSON.parse(stored) : [];
      localStorage.setItem('pranav_portfolio_reviews', JSON.stringify([newReview, ...prevStored]));
    } catch {
      // ignore
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      // Reset form
      setFormName('');
      setFormRole('');
      setFormCompany('');
      setFormMetric('');
      setFormContent('');
    }, 1400);
  };

  // Derive unique tags
  const allTags = Array.from(new Set(reviews.flatMap((r) => r.tags)));

  const filteredReviews = reviews.filter((r) => {
    if (selectedTag === 'all') return true;
    return r.tags.includes(selectedTag);
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div id="reviews-section" className="space-y-6 pt-2">
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
              Client &amp; Collaborator Endorsements
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#64748b]">
            Professional feedback, verified engineering references, and collaborator testimonials.
          </p>
        </div>

        {/* Rating Score & Action */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
            <span>
              {reviews.length > 0
                ? `${averageRating} Rating (${reviews.length} Endorsement${reviews.length > 1 ? 's' : ''})`
                : 'References Available Upon Request'}
            </span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Leave an Endorsement</span>
          </button>
        </div>
      </div>

      {/* Tag Filters (Only visible if reviews exist) */}
      {reviews.length > 0 && allTags.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTag === 'all'
                  ? 'bg-[#0f172a] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300'
              }`}
            >
              <span>All Endorsements</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-mono">
                {reviews.length}
              </span>
            </button>

            {allTags.map((tag) => {
              const count = reviews.filter((r) => r.tags.includes(tag)).length;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTag === tag
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300'
                  }`}
                >
                  <span>{tag}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-mono">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#64748b] hidden md:inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Peer-Verified Collaborations
          </span>
        </div>
      )}

      {/* Reviews Cards Grid / Empty State */}
      {reviews.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] flex items-center justify-center mx-auto shadow-2xs">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-[#0f172a]">
              No Public Endorsements Posted Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              If we have collaborated on software systems, research papers, or open-source projects, feel free to leave an endorsement or request formal reference letters.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Leave First Endorsement</span>
            </button>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#0f172a] text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((item) => {
            const initials = item.name
              .split(' ')
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('');

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs hover:border-[#bae6fd] hover:shadow-xs transition-all flex flex-col justify-between relative overflow-hidden group space-y-4"
              >
                {/* Subtle watermark quote icon */}
                <Quote className="w-16 h-16 text-gray-100 absolute -bottom-2 -right-2 pointer-events-none group-hover:text-[#f0f9ff] transition-colors" />

                <div className="space-y-3 relative z-10">
                  {/* Top Row: Stars + Metric Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {item.highlightMetric && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{item.highlightMetric}</span>
                      </span>
                    )}
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                {/* Footer: Author Info */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 border border-gray-700/20">
                      {initials}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#0f172a] leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[#64748b] leading-tight">
                        {item.role} • <span className="text-[#0f172a] font-medium">{item.companyOrOrg}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-medium text-[#0284c7] bg-[#f0f9ff] px-2 py-0.5 rounded-lg border border-[#e0f2fe]">
                      {item.relationship}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5">{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Actions Banner */}
      <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7] shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0f172a]">
              Need Formal Letters of Recommendation or Client Contacts?
            </h4>
            <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5">
              Reference contacts and verification letters are readily shared upon request.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenHireMe}
            className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Request References</span>
          </button>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#0f172a] text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Write a Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-[#0284c7]" />
                <h3 className="font-bold text-[#0f172a] text-base">
                  Leave a Review / Endorsement
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            {submitSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0f172a]">
                  Thank You for Your Endorsement!
                </h4>
                <p className="text-xs text-[#64748b]">
                  Your review has been successfully added to the portfolio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#0f172a] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#0f172a] mb-1">
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Architect"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#0f172a] mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CloudTech Labs"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#0f172a] mb-1">
                      Relationship
                    </label>
                    <select
                      value={formRelationship}
                      onChange={(e) => setFormRelationship(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs bg-white"
                    >
                      <option value="Client Partner">Client Partner</option>
                      <option value="Tech Lead / Manager">Tech Lead / Manager</option>
                      <option value="Peer Collaborator">Peer Collaborator</option>
                      <option value="Research Co-Author">Research Co-Author</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#0f172a] mb-1">
                      Rating Score
                    </label>
                    <div className="flex items-center gap-1 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormRating(star)}
                          className="p-1 cursor-pointer hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              formRating >= star
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-200'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-bold text-gray-700">{formRating} / 5</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#0f172a] mb-1">
                      Category Tag
                    </label>
                    <select
                      value={formTag}
                      onChange={(e) => setFormTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs bg-white"
                    >
                      <option value="Full-Stack Systems">Full-Stack Systems</option>
                      <option value="Backend & APIs">Backend &amp; APIs</option>
                      <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                      <option value="Distributed AI">Distributed AI</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#0f172a] mb-1">
                    Key Outcome / Metric Highlight (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delivered 2 weeks ahead of schedule &amp; 99.9% uptime"
                    value={formMetric}
                    onChange={(e) => setFormMetric(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0f172a] mb-1">
                    Your Review &amp; Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your collaboration with Pranav, his technical execution, problem solving, and impact..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0284c7] text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
