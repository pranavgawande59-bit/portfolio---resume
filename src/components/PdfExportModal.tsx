import React, { useEffect, useState } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  educationData,
  certificatesData,
} from '../data/portfolioData';
import { useOwnerAuth } from '../utils/ownerAuthHelper';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const { profile, projects } = useOwnerAuth();

  // Attach body class for print styling isolation and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('pdf-modal-open');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.classList.remove('pdf-modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSimulateDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 350);
  };

  // Fallback ATS projects if no custom projects have been added in owner mode
  const fallbackProjects = [
    {
      id: 'ats-p1',
      title: 'Full-Stack Web Architecture & REST API Service',
      role: 'Full-Stack Development',
      techStack: 'React 18, Node.js, Express, SQL, Tailwind CSS',
      points: [
        'Architected end-to-end full-stack web application with responsive React component tree and performant Express REST endpoints.',
        'Designed normalized relational SQL database schema; implemented indexing and connection pooling with sub-40ms query execution.',
        'Implemented client-side state caching, asynchronous API middleware, CORS validation, and responsive mobile-first UI components.',
      ],
    },
    {
      id: 'ats-p2',
      title: 'Distributed System Services & Algorithmic Engine',
      role: 'Backend Engineering',
      techStack: 'Python, Java SE, Docker, AWS S3, RESTful APIs',
      points: [
        'Developed high-throughput data processing and algorithmic routing in Python and Core Java with multithreading and OOP patterns.',
        'Containerized application workloads into isolated Docker environments, standardizing reproducible builds across testing and staging.',
        'Integrated structured JSON logging, health-check endpoints, and automated validation tests ensuring zero regressions.',
      ],
    },
  ];

  // Dynamic projects list pulling from live ownerAuth projects if present
  const displayProjects =
    projects && projects.length > 0
      ? projects.slice(0, 3).map((p) => ({
          id: p.id,
          title: p.title,
          role: p.category || 'Full-Stack Engineering',
          techStack: p.techStack && p.techStack.length > 0 ? p.techStack.join(', ') : 'React, Node.js, SQL',
          points: [
            p.description,
            ...(p.architectureHighlights || []),
            ...(p.metrics ? [`Key Metric: ${p.metrics}`] : []),
          ]
            .filter(Boolean)
            .slice(0, 3),
        }))
      : fallbackProjects;

  return (
    <div
      id="pdf-export-modal"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        id="pdf-modal-card"
        className="bg-white rounded-2xl max-w-4xl w-full p-3 sm:p-5 shadow-2xl border border-gray-200/90 max-h-[94vh] flex flex-col transition-all my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Chrome Header (Hidden on Print) */}
        <div className="modal-chrome flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-gray-200/90 gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  ATS-Ready One-Page Resume
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f0f9ff] text-[#0284c7] border border-[#e0f2fe]">
                  <Sparkles className="w-3 h-3" /> Live Synced
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Formatted for single-page A4 print &amp; strict ATS keyword parsers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              title="Print directly"
            >
              <Printer className="w-4 h-4 text-gray-600" />
              <span>Print</span>
            </button>
            <button
              onClick={handleSimulateDownload}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Save as PDF"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing...' : 'Export PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer ml-1 transition-colors"
              title="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ATS Print Guidance Banner (Hidden on Print) */}
        <div className="modal-chrome mb-3 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-gray-600 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
            <span>
              <strong>Print Guidance:</strong> In the browser dialog, select <strong>Destination: Save as PDF</strong> and <strong>Paper Size: A4</strong>. All modal borders and buttons are suppressed automatically.
            </span>
          </div>
          <span className="font-mono text-[10px] text-gray-400 shrink-0 hidden md:inline">
            1-Page ATS Standard
          </span>
        </div>

        {/* Paper Canvas Scroll Area */}
        <div
          id="pdf-modal-scroll-area"
          className="flex-1 overflow-y-auto bg-slate-100/90 p-2 sm:p-5 rounded-xl border border-slate-200 flex justify-center"
        >
          {/* THE PRINTABLE ATS RESUME SHEET */}
          <div
            id="ats-resume-sheet"
            className="bg-white text-gray-900 w-full max-w-[794px] min-h-[1050px] p-6 sm:p-8 shadow-sm rounded-sm border border-gray-200/70 font-sans space-y-3.5"
          >
            {/* Header: Name, Title & Contact Bar */}
            <div className="text-center border-b border-gray-800 pb-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-gray-950 uppercase font-sans">
                {profile.name}
              </h1>
              <div className="text-xs font-bold tracking-widest text-gray-700 uppercase mt-0.5">
                {profile.title}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[10.5px] text-gray-600 font-mono mt-1.5">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gray-700 no-print" />
                  <span>{profile.email}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-700 no-print" />
                  <span>{profile.location}</span>
                </span>
                {profile.linkedin && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Linkedin className="w-3 h-3 text-gray-700 no-print" />
                      <span>{profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </span>
                  </>
                )}
                {profile.github && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Github className="w-3 h-3 text-gray-700 no-print" />
                      <span>{profile.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1">
                Professional Summary
              </h2>
              <p className="text-[10.5px] leading-relaxed text-gray-800">
                {profile.bio}
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
                Technical Skills &amp; Core Competencies
              </h2>
              <div className="space-y-1 text-[10.5px] leading-tight text-gray-800">
                <div>
                  <span className="font-bold text-gray-950">Languages: </span>
                  <span>Python, Java, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3</span>
                </div>
                <div>
                  <span className="font-bold text-gray-950">Frameworks &amp; Web Technologies: </span>
                  <span>React 18, Node.js, Express.js, RESTful APIs, Tailwind CSS, Responsive Design</span>
                </div>
                <div>
                  <span className="font-bold text-gray-950">Cloud &amp; DevOps: </span>
                  <span>AWS Cloud (EC2, S3, IAM), Docker Containerization, Git, GitHub, Linux Shell</span>
                </div>
                <div>
                  <span className="font-bold text-gray-950">Core Foundations: </span>
                  <span>Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Relational Database Design, Microservices</span>
                </div>
              </div>
            </section>

            {/* Technical Projects */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
                Technical Projects &amp; Software Engineering
              </h2>
              <div className="space-y-2.5">
                {displayProjects.map((proj) => (
                  <div key={proj.id} className="text-[10.5px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-950 text-[11px]">
                        {proj.title}
                      </span>
                      <span className="text-gray-500 font-mono text-[10px] italic">
                        {proj.role}
                      </span>
                    </div>
                    <div className="text-[10px] font-semibold text-gray-600 mb-0.5">
                      Technologies: <span className="font-normal text-gray-700">{proj.techStack}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-gray-800 text-[10px] leading-normal">
                      {proj.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
                Education
              </h2>
              <div className="space-y-2">
                {educationData.map((edu) => (
                  <div key={edu.id} className="text-[10.5px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-950 text-[11px]">
                        {edu.degree}
                      </span>
                      <span className="font-mono text-gray-600 text-[10px] font-medium whitespace-nowrap ml-2">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-gray-700 font-medium text-[10.5px]">
                      {edu.institution}
                    </div>
                    {edu.description && (
                      <div className="text-gray-600 text-[10px] leading-tight mt-0.5">
                        {edu.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Verified Certifications */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
                Verified Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                {certificatesData.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div className="pr-1">
                      <span className="font-semibold text-gray-950">{cert.title}</span>
                      <span className="text-gray-500"> &mdash; {cert.issuer.split('/')[0].trim()}</span>
                    </div>
                    <span className="font-mono text-gray-500 font-medium ml-1 whitespace-nowrap text-[9.5px]">
                      {cert.issueDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
