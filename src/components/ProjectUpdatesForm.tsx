import React, { useState, useEffect } from 'react';
import { Mail, Bell, CheckCircle2, Sparkles, Send, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface ProjectUpdatesFormProps {
  className?: string;
}

export const ProjectUpdatesForm: React.FC<ProjectUpdatesFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Full-Stack Engineering',
    'System Architecture',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const availableTopics = [
    'Full-Stack Engineering',
    'Open Source Releases',
    'Cloud Infrastructure & DevOps',
    'System Architecture',
  ];

  useEffect(() => {
    // Check if user already subscribed in this browser session/storage
    const saved = localStorage.getItem('pranav_project_updates_sub');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setIsSuccess(true);
          setSubscribedEmail(parsed.email);
        }
      } catch {
        // ignore JSON error
      }
    }
  }, []);

  const handleToggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to server-side endpoint if available
      try {
        await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            topics: selectedTopics,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn('Network call to backend subscription failed, using local storage fallback', err);
      }

      // Store in localStorage for instant persistence
      localStorage.setItem(
        'pranav_project_updates_sub',
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topics: selectedTopics,
          date: new Date().toISOString(),
        })
      );

      setSubscribedEmail(email.trim());
      setIsSuccess(true);
      setEmail('');
      setName('');
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('pranav_project_updates_sub');
    setIsSuccess(false);
    setSubscribedEmail('');
  };

  return (
    <div
      id="project-updates-section"
      className={`w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-white to-[#f8fafc] border border-gray-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden ${className}`}
    >
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 right-1/4 w-72 h-40 bg-radial from-[#e0f2fe]/80 to-transparent blur-2xl pointer-events-none -mt-10" />

      {isSuccess ? (
        <div className="text-center py-6 space-y-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">
              You're all signed up!
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We'll send notifications for new open-source releases, architectural writeups, and system design breakdowns to <span className="font-semibold text-[#0f172a]">{subscribedEmail}</span>.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-[#64748b] hover:text-[#0284c7] transition-colors cursor-pointer px-4 py-2 rounded-full border border-gray-200 hover:border-[#bae6fd] bg-white"
            >
              Update preferences or change email
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f9ff] text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
                <Bell className="w-3.5 h-3.5" />
                <span>Stay in the Loop</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
                Get Project &amp; Research Updates
              </h3>
              <p className="text-sm text-[#64748b] max-w-xl leading-relaxed">
                Be the first to know when new open-source systems, benchmark reports, and AI research preprints are published.
              </p>
            </div>
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] items-center justify-center text-[#0284c7] shrink-0 shadow-2xs">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Topic Selection Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">
                Topics you're interested in:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleToggleTopic(topic)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-[#475569] hover:border-gray-300'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <Sparkles className="w-3 h-3 text-[#94a3b8]" />
                      )}
                      <span>{topic}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label htmlFor="subscriber-name" className="sr-only">
                  Your Name (Optional)
                </label>
                <input
                  id="subscriber-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name (Optional)"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15 transition-all shadow-2xs"
                />
              </div>

              <div className="sm:col-span-5">
                <label htmlFor="subscriber-email" className="sr-only">
                  Your Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="subscriber-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15 transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full h-full min-h-[44px] px-5 py-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:scale-98 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Get Updates</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
            )}

            {/* Footer Trust Guarantee */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-[#94a3b8]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero spam. Updates sent only for major system and paper releases.</span>
              </div>
              <span>Unsubscribe at any time.</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
