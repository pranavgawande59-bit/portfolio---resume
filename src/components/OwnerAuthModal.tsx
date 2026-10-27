import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  UserCheck,
  Sparkles,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useOwnerAuth } from '../utils/ownerAuthHelper';
import { useAvatar } from '../utils/avatarHelper';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'edit-profile' | 'security';
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
}) => {
  const {
    isOwner,
    ownerEmail,
    profile,
    login,
    logout,
    updateProfile,
    resetProfile,
    changePasscode,
  } = useOwnerAuth();
  const { resetAvatar } = useAvatar();

  const [activeTab, setActiveTab] = useState<'login' | 'edit-profile' | 'security'>(
    isOwner ? 'edit-profile' : 'login'
  );

  // Login state
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Edit Profile Form State
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    tagline: profile.tagline,
    bio: profile.bio,
    email: profile.email,
    location: profile.location,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Security / Change Passcode State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isOwner) {
        setActiveTab(initialTab === 'login' ? 'edit-profile' : initialTab);
      } else {
        setActiveTab('login');
      }
      setFormData({
        name: profile.name,
        title: profile.title,
        tagline: profile.tagline,
        bio: profile.bio,
        email: profile.email,
        location: profile.location,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
      });
      setLoginError('');
      setPassError('');
      setSaveSuccess(false);
      setPassSuccess(false);
    }
  }, [isOpen, isOwner, profile, initialTab]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = login(passcode);
    if (res.success) {
      setLoginSuccess(true);
      setPasscode('');
      setTimeout(() => {
        setLoginSuccess(false);
        setActiveTab('edit-profile');
      }, 700);
    } else {
      setLoginError(res.error || 'Authentication failed. Please check your passcode.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess(false);

    if (newPass.length < 4) {
      setPassError('New passcode must be at least 4 characters long.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New passcodes do not match.');
      return;
    }

    const testLogin = login(currentPass);
    if (!testLogin.success) {
      setPassError('Current passcode is incorrect.');
      return;
    }

    const ok = changePasscode(newPass);
    if (ok) {
      setPassSuccess(true);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setPassSuccess(false), 3500);
    } else {
      setPassError('Failed to update passcode. Try again.');
    }
  };

  const handleResetAllDefaults = () => {
    if (window.confirm('Reset all profile details and custom avatar back to default code settings?')) {
      resetProfile();
      resetAvatar();
      setFormData({
        name: profile.name,
        title: profile.title,
        tagline: profile.tagline,
        bio: profile.bio,
        email: profile.email,
        location: profile.location,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2.5 rounded-2xl ${
                isOwner
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]'
              }`}
            >
              {isOwner ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                  {isOwner ? 'Owner Dashboard & Settings' : 'Owner Authentication'}
                </h3>
                {isOwner && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Unlocked
                  </span>
                )}
              </div>
              <p className="text-xs text-[#64748b]">
                {isOwner
                  ? `Logged in as authorized owner: ${ownerEmail}`
                  : `Protected for portfolio owner (${ownerEmail})`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation if logged in */}
        {isOwner && (
          <div className="flex items-center gap-2 p-1 bg-gray-100/80 rounded-xl mb-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('edit-profile')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'edit-profile'
                  ? 'bg-white text-[#0f172a] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'security'
                  ? 'bg-white text-[#0f172a] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Security &amp; Passcode</span>
            </button>
          </div>
        )}

        {/* Tab 1: Login Form (for Guests / Unauthenticated Viewers) */}
        {!isOwner && (
          <div className="space-y-5">
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#475569]">
              <ShieldAlert className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-[#0f172a]">
                  Owner-Only Modification Protection
                </p>
                <p className="leading-relaxed text-[#64748b]">
                  After deployment, all profile details, headshot photos, and resume credentials are strictly read-only for public visitors. Only the portfolio owner can make changes.
                </p>
                <p className="text-[11px] text-[#0284c7] font-medium pt-0.5">
                  Default initial owner passcode: <code className="bg-sky-100/80 px-1.5 py-0.5 rounded font-mono text-[#0369a1]">pranav2027</code>
                </p>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider block">
                  Owner Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Enter owner passcode..."
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {loginSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Authenticated successfully! Unlocking owner mode...</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#0284c7] hover:bg-[#0369a1] active:scale-98 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Owner Mode</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Edit Profile (Unlocked for Owner) */}
        {isOwner && activeTab === 'edit-profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  Professional Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  Tagline / Hero Hook
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
                />
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2 animate-fade-in font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Profile details updated and saved successfully!</span>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetAllDefaults}
                className="text-xs font-semibold text-gray-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => logout()}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer flex-1 sm:flex-none"
                >
                  Lock &amp; Logout
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer flex-1 sm:flex-none"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 3: Security & Passcode (Unlocked for Owner) */}
        {isOwner && activeTab === 'security' && (
          <form onSubmit={handleChangePasscode} className="space-y-4">
            <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-2xl text-xs text-[#0369a1] space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Custom Owner Passcode</span>
              </p>
              <p className="text-[11px] text-[#0284c7] leading-relaxed">
                Change your secret passcode to ensure no other users or viewers can unlock Owner Mode on deployed instances.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                Current Passcode
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current passcode..."
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                New Passcode
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new passcode (min 4 characters)..."
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                Confirm New Passcode
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-enter new passcode..."
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15"
              />
            </div>

            {passError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2 animate-fade-in font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Owner passcode updated successfully!</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => logout()}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800"
              >
                Lock &amp; Logout
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Update Passcode</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
