import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    engagementType: 'Full-Time Full-Stack Engineer',
    budgetRange: '$10k - $25k',
    timeline: 'Immediate / Next 2-4 Weeks',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200/90 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                Hire Pranav Gawande
              </h3>
              <p className="text-xs text-[#64748b] font-semibold uppercase tracking-wider">
                Full-Stack &amp; Engineering Advisory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-[#0f172a]">
              Proposal Received!
            </h4>
            <p className="text-sm text-[#475569] max-w-md">
              Thank you for considering Pranav. We have received your project parameters and will respond within 24 hours to coordinate an introductory technical review.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            {/* Value Props */}
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#f8fafc] border border-gray-100 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                <span className="text-[11px] font-semibold text-[#334155]">
                  Deterministic AI
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-[#0284c7]" />
                <span className="text-[11px] font-semibold text-[#334155]">
                  Rapid Deployment
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Award className="w-4 h-4 text-[#0284c7]" />
                <span className="text-[11px] font-semibold text-[#334155]">
                  Production Scale
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vertex Dynamics"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@vertex.ai"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Engagement Model
                </label>
                <select
                  value={formData.engagementType}
                  onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                >
                  <option value="Full-Time Full-Stack Engineer">Full-Time Full-Stack Engineer</option>
                  <option value="Contract / System Engineering">Contract / System Engineering</option>
                  <option value="Advisory & Code Audit">Advisory &amp; Code Audit</option>
                  <option value="Web App & API Development">Web App &amp; API Development</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                Project Scope &amp; Deliverables *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe your technical requirements, architecture specs, or target milestones..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Submitting Proposal...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Engagement Inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
