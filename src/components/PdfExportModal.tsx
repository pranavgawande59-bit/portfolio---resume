import React from 'react';
import { X, Printer, Download, FileText, Building2, GraduationCap, Brain, BadgeCheck, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { profileData, experienceData, educationData, skillGroups, certificatesData } from '../data/portfolioData';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSimulateDownload = () => {
    setDownloading(true);
    // Trigger print dialog as standard PDF generation in browsers
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 400);
  };

  return (
    <div
      id="pdf-export-modal"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Modal Dialog Card in Crisp White Mode */}
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-gray-200/90 max-h-[92vh] flex flex-col transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#f0f9ff] border border-[#e0f2fe] text-[#0284c7]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] leading-tight">
                Resume Document Preview
              </h3>
              <p className="text-xs text-[#64748b] font-medium">
                Formatted for PDF Export &amp; ATS Parsing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-[#334155] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5 text-[#64748b]" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleSimulateDownload}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Preparing...' : 'Export PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer ml-1 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Canvas Document Paper Sheet */}
        <div className="flex-1 overflow-y-auto mt-4 p-5 sm:p-8 bg-[#f8fafc] rounded-2xl border border-gray-200/90 text-[#0f172a] space-y-6">
          {/* Document Paper Header */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 pb-3 border-b border-gray-100">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                  {profileData.name}
                </h1>
                <p className="text-xs sm:text-sm font-bold tracking-wider text-[#0284c7] uppercase mt-0.5">
                  {profileData.title}
                </p>
              </div>
              <div className="text-xs sm:text-right text-[#64748b] font-mono space-y-1">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3 h-3 text-[#0284c7]" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3 h-3 text-[#0284c7]" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
              {profileData.bio}
            </p>
          </div>

          {/* Education */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <GraduationCap className="w-4 h-4 text-[#0284c7]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
                Education
              </h4>
            </div>
            <div className="space-y-3 pt-1">
              {educationData.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm">
                  <div className="flex justify-between font-bold text-[#0f172a]">
                    <span>{edu.degree}</span>
                    <span className="font-normal text-[#64748b] font-mono">{edu.period}</span>
                  </div>
                  <div className="text-xs text-[#0284c7] font-semibold mt-0.5">{edu.institution}</div>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies & Technical Stack */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <Brain className="w-4 h-4 text-[#0284c7]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
                Core Competencies &amp; Technical Stack
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              {skillGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#f8fafc] rounded-xl border border-gray-200/80 hover:border-[#bae6fd] transition-colors"
                >
                  <div className="font-bold text-[11px] uppercase tracking-wider text-[#0284c7] mb-1.5">
                    {group.title}
                  </div>
                  <div className="text-[#334155] font-medium leading-relaxed">
                    {group.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Certifications */}
          {certificatesData.length > 0 && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
                <BadgeCheck className="w-4 h-4 text-[#0284c7]" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
                  Key Certifications
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                {certificatesData.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 bg-[#f8fafc] rounded-xl border border-gray-200/80 flex justify-between items-center hover:border-[#bae6fd] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#0f172a]">{cert.title}</div>
                      <div className="text-[11px] text-[#64748b] mt-0.5">{cert.issuer}</div>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#0284c7] bg-[#f0f9ff] px-2 py-0.5 rounded-lg border border-[#e0f2fe]">
                      {cert.issueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Experience */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <Building2 className="w-4 h-4 text-[#0284c7]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
                Professional Experience
              </h4>
            </div>
            <div className="space-y-4 pt-1">
              {experienceData.map((exp) => (
                <div key={exp.id} className="text-xs sm:text-sm space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-[#0f172a]">
                    <span>
                      {exp.role} &mdash; <span className="text-[#0284c7]">{exp.company}</span>
                    </span>
                    <span className="font-normal text-[#64748b] font-mono text-xs sm:text-right">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-[#334155] space-y-1 pl-1 text-xs leading-relaxed">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

