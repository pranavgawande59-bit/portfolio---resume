import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  Mail,
  MapPin,
  ExternalLink,
  Code,
  Layers,
  GraduationCap,
  Sliders,
  CheckCircle2,
  Cpu,
  Terminal,
  Server,
  Cloud,
  Zap,
} from 'lucide-react';
import {
  profileData,
  skillGroups,
  technicalSkillsData,
  certificatesData,
  educationData,
  experienceData,
} from '../data/portfolioData';
import { useAvatar } from '../utils/avatarHelper';
import { useOwnerAuth } from '../utils/ownerAuthHelper';
import { ReviewsSection } from './ReviewsSection';

interface AboutViewProps {
  onOpenHireMe: () => void;
  onOpenOwnerSettings?: (tab?: 'login' | 'edit-profile' | 'security') => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenHireMe, onOpenOwnerSettings }) => {
  const { avatarUrl } = useAvatar();
  const { isOwner, profile } = useOwnerAuth();
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'all' | 'language' | 'framework' | 'cloud-devops'>('all');
  const [skillViewMode, setSkillViewMode] = useState<'progress' | 'badges'>('progress');

  const filteredSkills = technicalSkillsData.filter((skill) => {
    if (selectedSkillCategory === 'all') return true;
    return skill.category === selectedSkillCategory;
  });

  const languageSkills = technicalSkillsData.filter((s) => s.category === 'language');
  const frameworkSkills = technicalSkillsData.filter((s) => s.category === 'framework');
  const cloudDevopsSkills = technicalSkillsData.filter((s) => s.category === 'cloud-devops');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          bar: 'from-[#0284c7] to-[#0ea5e9]',
        };
      case 'Advanced':
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500',
          bar: 'from-[#0284c7] to-[#38bdf8]',
        };
      default:
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500',
          bar: 'from-[#6366f1] to-[#818cf8]',
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'language':
        return <Terminal className="w-3.5 h-3.5" />;
      case 'framework':
        return <Code className="w-3.5 h-3.5" />;
      case 'ai-data':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'cloud-devops':
        return <Cloud className="w-3.5 h-3.5" />;
      default:
        return <Zap className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Bio Header */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={avatarUrl}
            alt={profile.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-[#0284c7]/15 shadow-sm"
          />
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">{profile.name}</h1>
              <span className="px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
                {profile.title}
              </span>
              {isOwner && (
                <button
                  onClick={() => onOpenOwnerSettings?.('edit-profile')}
                  className="px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] border border-[#bae6fd] hover:bg-sky-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Edit Details
                </button>
              )}
            </div>

            <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-[#64748b] pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0284c7]" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#0284c7]" />
                {profile.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills & Proficiency Visualization Section */}
      <div id="skills-proficiency-section" className="space-y-6">
        {/* Section Header with View Mode and Category Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#0284c7]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                Technical Skills &amp; Proficiency
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Benchmarked proficiency across programming languages, modern web frameworks, and cloud infrastructure.
            </p>
          </div>

          {/* View Mode Toggle (Progress Bar vs Badges) */}
          <div className="flex items-center self-start md:self-auto p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setSkillViewMode('progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                skillViewMode === 'progress'
                  ? 'bg-white text-[#0f172a] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Progress Bars</span>
            </button>
            <button
              onClick={() => setSkillViewMode('badges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                skillViewMode === 'badges'
                  ? 'bg-white text-[#0f172a] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Badge Grid</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSkillCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedSkillCategory === 'all'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300'
            }`}
          >
            <span>All Skills</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-mono">
              {technicalSkillsData.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedSkillCategory('language')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedSkillCategory === 'language'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Languages</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-mono">
              {languageSkills.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedSkillCategory('framework')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedSkillCategory === 'framework'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>Frameworks</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-mono">
              {frameworkSkills.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedSkillCategory('cloud-devops')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedSkillCategory === 'cloud-devops'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-[#64748b] hover:border-gray-300'
            }`}
          >
            <Cloud className="w-3 h-3" />
            <span>Cloud &amp; DevOps</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-mono">
              {cloudDevopsSkills.length}
            </span>
          </button>
        </div>

        {/* View 1: Progress Bar Visualization Layout */}
        {skillViewMode === 'progress' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSkills.map((skill) => {
              const levelStyle = getLevelColor(skill.level);
              return (
                <div
                  key={skill.name}
                  className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-2xs hover:border-[#bae6fd] hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-[#f0f9ff] text-[#0284c7]">
                        {getCategoryIcon(skill.category)}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#0f172a] leading-tight">
                          {skill.name}
                        </h3>
                        {skill.experienceYears && (
                          <span className="text-[11px] text-[#64748b]">
                            {skill.experienceYears} experience
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelStyle.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
                        {skill.level}
                      </span>
                      <span className="text-sm font-bold text-[#0f172a] font-mono">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${levelStyle.bar} transition-all duration-700 ease-out`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  {/* Highlight pill / description */}
                  {skill.highlight && (
                    <p className="text-[11px] text-[#64748b] leading-tight flex items-center gap-1 pt-0.5">
                      <span className="text-[#0284c7] font-semibold">Specialization:</span>
                      <span>{skill.highlight}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* View 2: Interactive Badge Matrix Layout */}
        {skillViewMode === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => {
              const levelStyle = getLevelColor(skill.level);
              return (
                <div
                  key={skill.name}
                  className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs hover:border-[#0284c7]/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-[#f0f9ff] text-[#0284c7]">
                        {getCategoryIcon(skill.category)}
                      </span>
                      <h3 className="text-sm font-bold text-[#0f172a]">{skill.name}</h3>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelStyle.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
                      {skill.level}
                    </span>
                  </div>

                  {skill.highlight && (
                    <p className="text-xs text-[#64748b] leading-relaxed">
                      {skill.highlight}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <span className="text-[#64748b]">{skill.experienceYears || 'Active Stack'}</span>
                    <span className="font-bold text-[#0284c7] font-mono">{skill.proficiency}% Proficiency</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Core Architectural Domains */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-[#0284c7]" />
          <h2 className="text-xl font-bold text-[#0f172a]">Core Domain Stacks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-4"
            >
              <h3 className="text-xs font-bold text-[#0284c7] tracking-wider uppercase">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-[#f8fafc] border border-gray-200/80 text-xs font-medium text-[#334155]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Experience */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Briefcase className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-lg font-bold text-[#0f172a]">Experience</h2>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-[#0f172a]">{exp.role}</h3>
                    <p className="text-xs text-[#0284c7] font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                    {exp.period}
                  </span>
                </div>
                <ul className="text-xs text-[#64748b] list-disc list-inside space-y-1">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <GraduationCap className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-lg font-bold text-[#0f172a]">Education</h2>
          </div>

          <div className="space-y-6">
            {educationData.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-[#0f172a]">{edu.degree}</h3>
                    <p className="text-xs text-[#0284c7] font-medium">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">{edu.description}</p>
                {edu.highlights && (
                  <ul className="text-xs text-[#64748b] list-disc list-inside space-y-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client & Collaborator Reviews Section */}
      <ReviewsSection onOpenHireMe={onOpenHireMe} />

      {/* Certifications */}
      {certificatesData.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-xl font-bold text-[#0f172a]">Verified Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificatesData.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider bg-[#f0f9ff] px-2 py-0.5 rounded">
                    {cert.issueDate}
                  </span>
                  <h3 className="text-sm font-semibold text-[#0f172a] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#64748b] font-medium">{cert.issuer}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
