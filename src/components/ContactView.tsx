import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useOwnerAuth } from '../utils/ownerAuthHelper';

export const ContactView: React.FC = () => {
  const { profile } = useOwnerAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Technical Consulting & Development',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Technical Consulting & Development',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 md:py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit border border-[#bae6fd]">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
          Let’s Connect
        </h2>
        <p className="text-base sm:text-lg text-[#64748b] max-w-3xl leading-relaxed">
          Whether you’re looking to discuss software engineering, system architecture, open-source projects, or new career opportunities, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Availability Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Current Status: Open to Opportunities
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">
              Ready for New Challenges
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Actively open to Full-Stack Developer opportunities, backend engineering roles, and innovative technical projects.
            </p>
          </div>

          {/* Contact Details */}
          <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-200/80 flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-[#0284c7] transition-all group shadow-2xs"
            >
              <div className="p-2.5 rounded-xl bg-[#e0f2fe] text-[#0284c7] group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-[#64748b]">
                  Direct Email
                </span>
                <span className="text-sm font-bold text-[#0f172a] truncate">
                  {profile.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-gray-100 text-[#0f172a]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#64748b]">
                  Location
                </span>
                <span className="text-sm font-bold text-[#0f172a]">
                  {profile.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-gray-100 text-[#0f172a]">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#64748b]">
                  Timezone
                </span>
                <span className="text-sm font-bold text-[#0f172a]">
                  IST (UTC+05:30) • Remote Friendly
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
            <h4 className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">
              Developer Ecosystem
            </h4>
            <div className="flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-sm font-semibold hover:bg-gray-100 text-[#0f172a] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-sm font-semibold hover:bg-gray-100 text-[#0f172a] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-sm font-semibold hover:bg-gray-100 text-[#0f172a] transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-200/90 shadow-2xs">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a]">
                  Message Sent!
                </h3>
                <p className="text-sm sm:text-base text-[#64748b] max-w-md">
                  Thank you for reaching out. Pranav will review your message and reply via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-2xl font-bold text-[#0f172a]">
                  Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all"
                  >
                    <option value="Technical Consulting & Development">Technical Consulting &amp; Development</option>
                    <option value="Full-Time Full-Stack Role">Full-Time Full-Stack Role</option>
                    <option value="System Architecture">System Architecture</option>
                    <option value="Collaboration & Mentorship">Collaboration &amp; Mentorship</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, timeline, technical questions, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-[#f8fafc] border border-gray-200 text-[#0f172a] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-4 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
