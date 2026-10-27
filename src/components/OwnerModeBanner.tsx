import React from 'react';
import { ShieldCheck, Settings, LogOut, Camera } from 'lucide-react';
import { useOwnerAuth } from '../utils/ownerAuthHelper';

interface OwnerModeBannerProps {
  onOpenSettings: (tab?: 'edit-profile' | 'security') => void;
  onOpenPhotoUpload?: () => void;
}

export const OwnerModeBanner: React.FC<OwnerModeBannerProps> = ({
  onOpenSettings,
  onOpenPhotoUpload,
}) => {
  const { isOwner, ownerEmail, logout } = useOwnerAuth();

  if (!isOwner) return null;

  return (
    <div className="bg-gradient-to-r from-[#0f172a] via-[#0284c7] to-[#0f172a] text-white text-xs py-2 px-4 sticky top-0 z-50 shadow-md flex items-center justify-between gap-3 animate-fade-in border-b border-sky-400/30">
      <div className="flex items-center gap-2 max-w-[60%] sm:max-w-none truncate">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <ShieldCheck className="w-4 h-4 text-sky-200 shrink-0" />
        <span className="font-semibold text-white tracking-wide truncate">
          Owner Mode Active: <span className="font-normal text-sky-100">{ownerEmail}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onOpenPhotoUpload && (
          <button
            onClick={onOpenPhotoUpload}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            <Camera className="w-3 h-3 text-sky-200" />
            <span>Upload Photo</span>
          </button>
        )}
        <button
          onClick={() => onOpenSettings('edit-profile')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors cursor-pointer"
        >
          <Settings className="w-3 h-3 text-sky-200" />
          <span>Edit Details</span>
        </button>
        <button
          onClick={logout}
          title="Lock & Logout Owner Mode"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white font-medium transition-colors cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span className="hidden sm:inline">Lock</span>
        </button>
      </div>
    </div>
  );
};
