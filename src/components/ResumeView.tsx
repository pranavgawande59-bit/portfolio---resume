import React, { useRef, useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Brain,
  BadgeCheck,
  Download,
  ChevronRight,
  ExternalLink,
  Calendar,
  Building2,
  Sparkles,
  Camera,
  Upload,
  RotateCcw,
  CheckCircle2,
  X,
  ShieldCheck,
  Lock,
  Edit3,
} from 'lucide-react';
import {
  experienceData,
  educationData,
  skillGroups,
  certificatesData,
} from '../data/portfolioData';
import { useAvatar } from '../utils/avatarHelper';
import { useOwnerAuth } from '../utils/ownerAuthHelper';

interface ResumeViewProps {
  onOpenPdfModal: () => void;
  onOpenOwnerSettings?: (tab?: 'login' | 'edit-profile' | 'security') => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  onOpenPdfModal,
  onOpenOwnerSettings,
}) => {
  const [activeSection, setActiveSection] = React.useState<string>('experience');
  const { avatarUrl, isCustom, updateAvatarFromFile, resetAvatar } = useAvatar();
  const { isOwner, profile } = useOwnerAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAvatarClick = () => {
    if (isOwner) {
      setIsPhotoModalOpen(true);
    } else if (onOpenOwnerSettings) {
      onOpenOwnerSettings('login');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    await handleProcessFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    try {
      setIsUploading(true);
      setErrorMessage(null);
      await updateAvatarFromFile(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
      setIsPhotoModalOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!isOwner) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await handleProcessFile(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-12 relative">
      {/* Left Sidebar Profile Card */}
      <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
        <div className="bg-white p-6 lg:p-7 rounded-3xl shadow-xs border border-gray-200/90 sticky top-24 flex flex-col gap-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <div
              className={`relative mb-4 ${
                isOwner ? 'group cursor-pointer' : 'cursor-default'
              }`}
              onClick={handleAvatarClick}
              onDragOver={(e) => {
                if (isOwner) {
                  e.preventDefault();
                  setDragOver(true);
                }
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              title={
                isOwner
                  ? 'Click or drop a photo to update your headshot'
                  : 'Profile Photo'
              }
            >
              <img
                alt={profile.name}
                className={`w-28 h-28 rounded-full object-cover shadow-sm bg-[#f8fafc] ring-4 ${
                  dragOver
                    ? 'ring-emerald-500 scale-105'
                    : 'ring-[#0284c7]/20'
                } transition-all ${isOwner ? 'group-hover:scale-105' : ''}`}
                src={avatarUrl}
              />
              {/* Photo Change Hover Overlay (Owner Only) */}
              {isOwner && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                  <Camera className="w-6 h-6 mb-1 text-white drop-shadow-sm" />
                  <span className="text-[10px] font-semibold tracking-wide">
                    Update Photo
                  </span>
                </div>
              )}
              <span
                className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                title="Available for Full-Stack & Engineering Roles"
              />
            </div>

            {/* Owner Controls */}
            {isOwner ? (
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="text-[11px] font-medium text-[#0284c7] hover:text-[#0369a1] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Camera className="w-3 h-3" />
                  <span>Change Photo</span>
                </button>
                <span className="text-gray-300">•</span>
                <button
                  onClick={() => onOpenOwnerSettings?.('edit-profile')}
                  className="text-[11px] font-medium text-[#0284c7] hover:text-[#0369a1] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Details</span>
                </button>
              </div>
            ) : null}

            {uploadSuccess && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-2 animate-fade-in font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Photo updated!</span>
              </div>
            )}

            <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xs font-bold text-[#0284c7] mt-1 tracking-wider uppercase">
              {profile.title}
            </p>
          </div>

          {/* Quick Jump Navigation */}
          <div className="flex flex-col gap-1.5 text-sm font-medium">
            <button
              onClick={() => scrollToSection('experience')}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all text-left cursor-pointer ${
                activeSection === 'experience'
                  ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                  : 'text-[#475569] hover:bg-gray-50'
              }`}
            >
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>Experience</span>
            </button>

            <button
              onClick={() => scrollToSection('education')}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all text-left cursor-pointer ${
                activeSection === 'education'
                  ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                  : 'text-[#475569] hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              <span>Education</span>
            </button>

            <button
              onClick={() => scrollToSection('skills')}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all text-left cursor-pointer ${
                activeSection === 'skills'
                  ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                  : 'text-[#475569] hover:bg-gray-50'
              }`}
            >
              <Brain className="w-4 h-4 flex-shrink-0" />
              <span>Skills</span>
            </button>

            {certificatesData.length > 0 && (
              <button
                onClick={() => scrollToSection('certificates')}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all text-left cursor-pointer ${
                  activeSection === 'certificates'
                    ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                    : 'text-[#475569] hover:bg-gray-50'
                }`}
              >
                <BadgeCheck className="w-4 h-4 flex-shrink-0" />
                <span>Certificates</span>
              </button>
            )}
          </div>

          {/* Download PDF Button */}
          <button
            onClick={onOpenPdfModal}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white py-3 px-4 rounded-xl text-sm font-semibold hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Resume</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-12 lg:gap-14">
        {/* Hero / Title Section */}
        <section className="pt-2">
          {profile.tagline && profile.tagline.trim() !== '' && (
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] tracking-tight leading-tight mb-3">
              {profile.tagline}
            </h2>
          )}
          <p className="text-base sm:text-lg text-[#64748b] max-w-3xl leading-relaxed">
            {profile.bio}
          </p>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
            <span className="text-[#0284c7] bg-[#e0f2fe] p-2 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </span>
            <h3 className="text-2xl font-bold text-[#0f172a]">
              Experience
            </h3>
          </div>

          <div className="flex flex-col gap-5">
            {experienceData.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 lg:p-7 rounded-2xl border border-gray-200/90 hover:border-[#38bdf8] hover:shadow-md transition-all group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-[#0f172a] group-hover:text-[#0284c7] transition-colors">
                      {job.role}
                    </h4>
                    <span className="text-sm font-medium text-[#64748b] flex items-center gap-1.5 mt-1">
                      <Building2 className="w-4 h-4 text-[#0284c7]" />
                      {job.company}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#475569] bg-gray-50 border border-gray-200 px-3 py-1 rounded-full w-fit flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {job.period}
                  </span>
                </div>

                <ul className="text-sm text-[#475569] space-y-2 mb-4">
                  {job.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-[#0284c7] mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {job.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                    {job.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#f8fafc] text-[#334155] border border-gray-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
            <span className="text-[#0284c7] bg-[#e0f2fe] p-2 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h3 className="text-2xl font-bold text-[#0f172a]">
              Education
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="bg-white p-6 lg:p-7 rounded-2xl border border-gray-200/90 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-[#0f172a]">
                      {edu.degree}
                    </h4>
                    <span className="text-sm font-semibold text-[#0284c7] mt-0.5 block">
                      {edu.institution}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#475569] bg-gray-50 border border-gray-200 px-3 py-1 rounded-full w-fit">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {edu.description}
                </p>

                {edu.highlights && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                    {edu.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-xs px-3 py-1 rounded-full bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd] flex items-center gap-1.5 font-medium"
                      >
                        <Sparkles className="w-3 h-3 text-[#0284c7]" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Technologies Section */}
        <section id="skills" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
            <span className="text-[#0284c7] bg-[#e0f2fe] p-2 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </span>
            <h3 className="text-2xl font-bold text-[#0f172a]">
              Skills &amp; Technologies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillGroups.map((group, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs ${
                  group.title === 'ARCHITECTURE & CLOUD' ? 'md:col-span-2' : ''
                }`}
              >
                <h4 className="text-xs font-bold text-[#0284c7] mb-3 uppercase tracking-wider">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-[#f8fafc] border border-gray-200 text-[#1e293b] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium hover:border-[#0284c7] hover:text-[#0284c7] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        {certificatesData.length > 0 && (
          <section id="certificates" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
              <span className="text-[#0284c7] bg-[#e0f2fe] p-2 rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-5 h-5" />
              </span>
              <h3 className="text-2xl font-bold text-[#0f172a]">
                Certificates &amp; Credentials
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white p-5 rounded-2xl border border-gray-200/90 hover:border-[#38bdf8] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-[#0f172a] leading-snug">
                        {cert.title}
                      </h4>
                      <span className="text-xs font-semibold text-[#475569] bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        {cert.issueDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#0284c7] mb-3">
                      {cert.issuer}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded bg-gray-50 text-[#475569] border border-gray-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                    <span className="font-mono text-gray-500">
                      ID: {cert.credentialId}
                    </span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0284c7] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Photo Upload / Update Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative flex flex-col gap-5 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0284c7]/10 text-[#0284c7]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Update Resume Photo</h3>
                  <p className="text-xs text-[#64748b]">Upload your portrait or headshot image</p>
                </div>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Preview */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-full object-cover shadow-md ring-4 ring-[#0284c7]/30"
                />
                {isCustom && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    Custom
                  </span>
                )}
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                dragOver
                  ? 'border-[#0284c7] bg-[#f0f9ff]'
                  : 'border-gray-300 hover:border-[#0284c7] hover:bg-[#f8fafc]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="p-3 bg-[#e0f2fe] text-[#0284c7] rounded-full">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#0f172a]">
                Click to browse or drag &amp; drop image here
              </p>
              <p className="text-xs text-[#64748b]">
                Supports WebP, PNG, JPG (e.g. 1000089238.webp)
              </p>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {errorMessage}
              </p>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              {isCustom ? (
                <button
                  type="button"
                  onClick={() => {
                    resetAvatar();
                    setUploadSuccess(true);
                    setTimeout(() => setUploadSuccess(false), 3000);
                  }}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
