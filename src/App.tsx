import { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { AiHomeView } from './components/AiHomeView';
import { AboutView } from './components/AboutView';
import { ProjectsView } from './components/ProjectsView';
import { ResearchView } from './components/ResearchView';
import { ResumeView } from './components/ResumeView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { AiChatDrawer } from './components/AiChatDrawer';
import { PdfExportModal } from './components/PdfExportModal';
import { HireMeModal } from './components/HireMeModal';
import { OwnerModeBanner } from './components/OwnerModeBanner';
import { OwnerAuthModal } from './components/OwnerAuthModal';
import { ScrollToTop } from './components/ScrollToTop';
import { useOwnerAuth } from './utils/ownerAuthHelper';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isHireMeOpen, setIsHireMeOpen] = useState<boolean>(false);

  // Owner Authentication & Settings Modal State
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);
  const [ownerModalTab, setOwnerModalTab] = useState<'login' | 'edit-profile' | 'security'>('login');
  const { isOwner } = useOwnerAuth();

  const handleOpenOwnerSettings = (tab: 'login' | 'edit-profile' | 'security' = isOwner ? 'edit-profile' : 'login') => {
    setOwnerModalTab(tab);
    setIsOwnerModalOpen(true);
  };

  const handleAskQuestion = (query: string) => {
    setChatInitialQuery(query);
    setIsAiChatOpen(true);
  };

  const handleOpenAiChat = () => {
    setChatInitialQuery('');
    setIsAiChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-white text-[#0f172a] selection:bg-[#e0f2fe] selection:text-[#0369a1] transition-colors duration-200">
      {/* Owner Mode Status Banner when unlocked */}
      <OwnerModeBanner
        onOpenSettings={(tab) => handleOpenOwnerSettings(tab || 'edit-profile')}
        onOpenPhotoUpload={() => {
          setActiveTab('resume');
        }}
      />

      {/* Top Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiChat={handleOpenAiChat}
        onOpenOwnerSettings={handleOpenOwnerSettings}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full flex flex-col justify-center">
        {activeTab === 'home' && (
          <AiHomeView onAskQuestion={handleAskQuestion} />
        )}
        {activeTab === 'about' && (
          <AboutView
            onOpenHireMe={() => setIsHireMeOpen(true)}
            onOpenOwnerSettings={handleOpenOwnerSettings}
          />
        )}
        {activeTab === 'projects' && <ProjectsView />}
        {activeTab === 'research' && (
          <ResearchView onOpenHireMe={() => setIsHireMeOpen(true)} />
        )}
        {activeTab === 'resume' && (
          <ResumeView
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
            onOpenOwnerSettings={handleOpenOwnerSettings}
          />
        )}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer onOpenOwnerSettings={handleOpenOwnerSettings} />

      {/* Interactive AI Chat Drawer / Modal */}
      <AiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        initialQuery={chatInitialQuery}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsAiChatOpen(false);
        }}
      />

      {/* PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      {/* Contact / Hire Me Modal */}
      <HireMeModal
        isOpen={isHireMeOpen}
        onClose={() => setIsHireMeOpen(false)}
      />

      {/* Owner Authentication & Profile Settings Modal */}
      <OwnerAuthModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        initialTab={ownerModalTab}
      />

      {/* Scroll-to-top Floating Button */}
      <ScrollToTop />
    </div>
  );
}
