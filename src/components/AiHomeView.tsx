import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  FolderOpen,
  Cpu,
  GraduationCap,
  Briefcase,
  HelpCircle,
  RefreshCw,
  Search,
} from 'lucide-react';
import { ProjectUpdatesForm } from './ProjectUpdatesForm';

interface AiHomeViewProps {
  onAskQuestion: (query: string) => void;
}

export const AiHomeView: React.FC<AiHomeViewProps> = ({ onAskQuestion }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAskQuestion(inputValue.trim());
      setInputValue('');
    }
  };

  const tryAskingPills = [
    {
      label: 'My skills',
      query: 'What are Pranav\'s strongest skills and technologies?',
      icon: <RefreshCw className="w-3.5 h-3.5 text-[#0284c7]" />,
    },
    {
      label: 'My projects',
      query: 'Tell me about the projects Pranav has built.',
      icon: <FolderOpen className="w-3.5 h-3.5 text-[#0284c7]" />,
    },
    {
      label: 'My experience',
      query: 'What is Pranav\'s work experience in AI and Full-Stack development?',
      icon: <Briefcase className="w-3.5 h-3.5 text-[#0284c7]" />,
    },
    {
      label: 'Why should I hire him?',
      query: 'Why should I hire Pranav Gawande as a Full-Stack Developer?',
      icon: <HelpCircle className="w-3.5 h-3.5 text-[#0284c7]" />,
    },
  ];

  const exploreCards = [
    {
      id: 'skills-card',
      icon: <Code2 className="w-5 h-5 text-[#0284c7]" />,
      bgIcon: 'bg-[#e0f2fe]',
      title: 'What are his strongest skills?',
      query: 'What are his strongest technical skills, frameworks, and architecture capabilities?',
    },
    {
      id: 'projects-card',
      icon: <FolderOpen className="w-5 h-5 text-[#0284c7]" />,
      bgIcon: 'bg-[#e0f2fe]',
      title: 'What systems has he built?',
      query: 'What software systems, architectures, and full-stack solutions does Pranav build?',
    },
    {
      id: 'stack-card',
      icon: <Cpu className="w-5 h-5 text-[#0284c7]" />,
      bgIcon: 'bg-[#e0f2fe]',
      title: 'What is his full-stack experience?',
      query: 'Tell me about his full-stack development experience, web frameworks, and cloud capabilities.',
    },
    {
      id: 'edu-card',
      icon: <GraduationCap className="w-5 h-5 text-[#0284c7]" />,
      bgIcon: 'bg-[#e0f2fe]',
      title: 'Share his education details.',
      query: 'Share his education details, degree, university, GPA ranking, and specialization.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-14 flex flex-col items-center justify-center">
      {/* Top Badge: AI PORTFOLIO */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
        <span>AI PORTFOLIO</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a] text-center mb-4">
        Hi, I'm Pranav Gawande
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#64748b] text-center max-w-xl mx-auto mb-10 leading-relaxed font-normal">
        Ask me anything about my work, skills, projects, education, or experience.
      </p>

      {/* Centerpiece Input Bar with Radial Glow */}
      <div className="relative w-full max-w-2xl mb-8 group">
        {/* Luminous cyan/blue radial ambient glow */}
        <div className="absolute -inset-4 bg-radial from-cyan-200/50 via-sky-100/30 to-transparent rounded-full blur-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white border border-gray-200/90 hover:border-[#38bdf8] focus-within:border-[#0284c7] focus-within:ring-4 focus-within:ring-[#0284c7]/10 rounded-full shadow-sm transition-all px-5 py-3.5"
        >
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full bg-transparent text-[#0f172a] placeholder:text-[#94a3b8] text-base sm:text-lg outline-none font-normal"
          />
          <button
            type="submit"
            aria-label="Submit search"
            disabled={!inputValue.trim()}
            className="ml-2 p-2 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white disabled:opacity-30 disabled:hover:bg-[#0284c7] transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* "Try asking:" Section */}
      <div className="flex flex-col items-center gap-3.5 mb-14 w-full">
        <span className="text-xs sm:text-sm font-medium text-[#64748b]">Try asking:</span>
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl">
          {tryAskingPills.map((pill) => (
            <button
              key={pill.label}
              onClick={() => onAskQuestion(pill.query)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-medium text-[#334155] hover:text-[#0284c7] hover:border-[#0284c7] hover:bg-[#f0f9ff] transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              {pill.icon}
              <span>{pill.label}</span>
            </button>
          ))}
        </div>

        {/* AI status note */}
        <div className="flex items-center gap-2 mt-3 text-xs text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AI is based on my portfolio</span>
        </div>
      </div>

      {/* "You can ask me about" Section */}
      <div className="w-full mt-4">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-bold text-[#0f172a] tracking-tight">
            You can ask me about
          </h2>
          <Sparkles className="w-4 h-4 text-[#0284c7]" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exploreCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onAskQuestion(card.query)}
              className="group bg-white border border-gray-200/90 hover:border-[#38bdf8] hover:shadow-md rounded-2xl p-5 text-left transition-all duration-200 flex flex-col justify-between min-h-[140px] cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full ${card.bgIcon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <p className="text-sm font-semibold text-[#1e293b] group-hover:text-[#0284c7] transition-colors leading-snug">
                {card.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Project & Research Updates Sign-up Form */}
      <ProjectUpdatesForm className="mt-14" />
    </div>
  );
};
