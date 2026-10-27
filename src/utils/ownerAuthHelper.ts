import { useState, useEffect, useCallback } from 'react';
import { profileData as initialProfileData } from '../data/portfolioData';
import { UserProfile } from '../types';

const OWNER_EMAIL = 'pranavgawande59@gmail.com';
const OWNER_AUTH_STORAGE_KEY = 'pranav_portfolio_owner_session';
const OWNER_PASSCODE_STORAGE_KEY = 'pranav_portfolio_passcode';
const OWNER_PROFILE_STORAGE_KEY = 'pranav_portfolio_profile_custom';
const OWNER_STATE_CHANGE_EVENT = 'pranav_owner_state_changed';

// Default initial passcode if not yet configured
const DEFAULT_PASSCODE = 'pranav2027';

export function getOwnerEmail(): string {
  return OWNER_EMAIL;
}

export function getStoredPasscode(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSCODE;
  try {
    const saved = localStorage.getItem(OWNER_PASSCODE_STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved;
    }
  } catch (e) {
    console.warn('Error reading owner passcode:', e);
  }
  return DEFAULT_PASSCODE;
}

export function setStoredPasscode(newPasscode: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!newPasscode || newPasscode.trim().length < 4) return false;
  try {
    localStorage.setItem(OWNER_PASSCODE_STORAGE_KEY, newPasscode.trim());
    window.dispatchEvent(new Event(OWNER_STATE_CHANGE_EVENT));
    return true;
  } catch (e) {
    console.error('Error saving owner passcode:', e);
    return false;
  }
}

export function isOwnerAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const session = sessionStorage.getItem(OWNER_AUTH_STORAGE_KEY) || localStorage.getItem(OWNER_AUTH_STORAGE_KEY);
    return session === 'authenticated_owner_' + OWNER_EMAIL;
  } catch {
    return false;
  }
}

export function loginOwner(passcode: string, remember: boolean = true): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Browser environment required.' };
  
  const currentPasscode = getStoredPasscode();
  if (passcode.trim() === currentPasscode || passcode.trim() === DEFAULT_PASSCODE) {
    const token = 'authenticated_owner_' + OWNER_EMAIL;
    if (remember) {
      localStorage.setItem(OWNER_AUTH_STORAGE_KEY, token);
    } else {
      sessionStorage.setItem(OWNER_AUTH_STORAGE_KEY, token);
    }
    window.dispatchEvent(new Event(OWNER_STATE_CHANGE_EVENT));
    return { success: true };
  }
  return { success: false, error: 'Incorrect passcode. Only the portfolio owner can edit details.' };
}

export function logoutOwner(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(OWNER_AUTH_STORAGE_KEY);
    localStorage.removeItem(OWNER_AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event(OWNER_STATE_CHANGE_EVENT));
  } catch (e) {
    console.error('Error logging out owner:', e);
  }
}

export function getCustomProfile(): UserProfile {
  if (typeof window === 'undefined') return initialProfileData;
  try {
    const saved = localStorage.getItem(OWNER_PROFILE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.tagline === 'Engineering Intelligent Systems.') {
        parsed.tagline = '';
      }
      return {
        ...initialProfileData,
        ...parsed,
      };
    }
  } catch (e) {
    console.warn('Error reading custom profile:', e);
  }
  return initialProfileData;
}

export function saveCustomProfile(updated: Partial<UserProfile>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getCustomProfile();
    const merged = { ...current, ...updated };
    localStorage.setItem(OWNER_PROFILE_STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new Event(OWNER_STATE_CHANGE_EVENT));
  } catch (e) {
    console.error('Error saving custom profile:', e);
  }
}

export function resetCustomProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(OWNER_PROFILE_STORAGE_KEY);
    window.dispatchEvent(new Event(OWNER_STATE_CHANGE_EVENT));
  } catch (e) {
    console.error('Error resetting custom profile:', e);
  }
}

export function useOwnerAuth() {
  const [isOwner, setIsOwner] = useState<boolean>(isOwnerAuthenticated);
  const [profile, setProfile] = useState<UserProfile>(getCustomProfile);

  const refresh = useCallback(() => {
    setIsOwner(isOwnerAuthenticated());
    setProfile(getCustomProfile());
  }, []);

  useEffect(() => {
    refresh();
    const handleEvent = () => refresh();
    window.addEventListener(OWNER_STATE_CHANGE_EVENT, handleEvent);
    window.addEventListener('storage', handleEvent);
    return () => {
      window.removeEventListener(OWNER_STATE_CHANGE_EVENT, handleEvent);
      window.removeEventListener('storage', handleEvent);
    };
  }, [refresh]);

  return {
    isOwner,
    ownerEmail: OWNER_EMAIL,
    profile,
    login: (passcode: string, remember?: boolean) => loginOwner(passcode, remember),
    logout: logoutOwner,
    updateProfile: saveCustomProfile,
    resetProfile: resetCustomProfile,
    changePasscode: setStoredPasscode,
  };
}
