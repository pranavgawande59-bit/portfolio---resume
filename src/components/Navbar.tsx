import React from 'react';
import { Menu, X, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import { TabType } from '../types';
import { BrandLogo } from './BrandLogo';
import { useOwnerAuth } from '../utils/ownerAuthHelper';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAiChat: () => void;
  onOpenOwnerSettings: (tab?: 'login' | 'edit-profile' | 'security') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiChat,
  onOpenOwnerSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isOwner } = useOwnerAuth();

  const navItems: { id: TabType; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-colors">
      <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
        {/* Brand / Logo: Modern Neural Monogram + Identity */}
        <button
          onClick={() => handleTabClick('home')}
          className="cursor-pointer group focus:outline-none text-left"
          title="Go to Home"
        >
          <BrandLogo size="md" showText={true} />
        </button>

        {/* Desktop Navigation Links (Centered) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#0f172a] font-semibold'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA / Chat with Ved & Owner Access */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#64748b] hover:text-[#0284c7] hover:bg-[#f0f9ff] transition-all cursor-pointer border border-gray-200/60"
          >
            <span>Chat with Ved</span>
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          </button>

          {/* Owner Mode Access Button */}
          <button
            onClick={() => onOpenOwnerSettings(isOwner ? 'edit-profile' : 'login')}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
              isOwner
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                : 'text-gray-400 hover:text-[#0284c7] hover:bg-gray-50'
            }`}
            title={isOwner ? 'Owner Mode Unlocked — Click for Settings' : 'Owner Sign In'}
          >
            {isOwner ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden lg:inline text-[11px]">Owner</span>
              </>
            ) : (
              <Lock className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#64748b] hover:bg-gray-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-2">
          <button
            onClick={() => handleTabClick('home')}
            className={`text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              activeTab === 'home'
                ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                : 'text-[#475569] hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                activeTab === item.id
                  ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                  : 'text-[#475569] hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiChat();
            }}
            className="mt-2 w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Chat with Ved</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOwnerSettings(isOwner ? 'edit-profile' : 'login');
            }}
            className="w-full border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-50"
          >
            {isOwner ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Owner Dashboard &amp; Settings</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-gray-500" />
                <span>Owner Login (Passcode)</span>
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};
