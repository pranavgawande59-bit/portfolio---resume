import React, { useState } from 'react';
import { Github, Linkedin, Mail, ShieldCheck, Lock, Share2, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useOwnerAuth } from '../utils/ownerAuthHelper';

interface FooterProps {
  onOpenOwnerSettings?: (tab?: 'login' | 'edit-profile' | 'security') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOwnerSettings }) => {
  const { profile, isOwner } = useOwnerAuth();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${profile.name} | ${profile.title}`,
      text: `Check out ${profile.name}'s portfolio:`,
      url: window.location.href,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback for browsers/environments that do not support navigator.share
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy URL to clipboard:', err);
    }
  };

  return (
    <footer className="w-full py-8 mt-auto border-t border-gray-100 bg-white transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
        {/* Left: Brand Identity */}
        <BrandLogo size="sm" showText={true} />

        {/* Center: Copyright & Owner Mode Status */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-[#64748b] font-normal text-center">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          {onOpenOwnerSettings && (
            <button
              onClick={() => onOpenOwnerSettings(isOwner ? 'edit-profile' : 'login')}
              className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#0284c7] transition-colors cursor-pointer"
              title={isOwner ? 'Owner Dashboard' : 'Owner Sign In'}
            >
              {isOwner ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-600 font-medium">Owner Mode Active</span>
                </>
              ) : (
                <>
                  <Lock className="w-2.5 h-2.5" />
                  <span>Owner Access</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Right: Share Button & Social Icons */}
        <div className="flex items-center gap-3 text-[#64748b]">
          <button
            id="footer-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0f172a] bg-[#f8fafc] hover:bg-[#f0f9ff] hover:text-[#0284c7] border border-gray-200/80 hover:border-[#bae6fd] transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Share portfolio URL"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Share</span>
              </>
            )}
          </button>

          <div className="h-4 w-px bg-gray-200 hidden sm:block" />

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0f172a] transition-colors p-1"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0284c7] transition-colors p-1"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[#0284c7] transition-colors p-1"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
