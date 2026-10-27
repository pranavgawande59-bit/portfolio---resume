import { useState, useEffect, useCallback } from 'react';
import { profileData } from '../data/portfolioData';

const AVATAR_STORAGE_KEY = 'pranav_custom_avatar';
const AVATAR_CHANGE_EVENT = 'pranav_avatar_changed';

export function getStoredAvatar(): string {
  if (typeof window === 'undefined') return profileData.avatarUrl;
  try {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved;
    }
  } catch (err) {
    console.warn('Failed to read avatar from localStorage:', err);
  }
  return profileData.avatarUrl;
}

export function saveCustomAvatar(dataUrl: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
    window.dispatchEvent(new Event(AVATAR_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to save avatar to localStorage:', err);
  }
}

export function resetCustomAvatar(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AVATAR_STORAGE_KEY);
    window.dispatchEvent(new Event(AVATAR_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to reset avatar:', err);
  }
}

export async function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image file (e.g., PNG, JPG, WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 512;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(dataUrl);
      };
      img.onerror = () => {
        reject(new Error('Failed to parse uploaded image.'));
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file from disk.'));
    };
    reader.readAsDataURL(file);
  });
}

export function useAvatar() {
  const [avatarUrl, setAvatarUrl] = useState<string>(getStoredAvatar);
  const [isCustom, setIsCustom] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(AVATAR_STORAGE_KEY);
  });

  const refresh = useCallback(() => {
    const current = getStoredAvatar();
    setAvatarUrl(current);
    setIsCustom(current !== profileData.avatarUrl);
  }, []);

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener(AVATAR_CHANGE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(AVATAR_CHANGE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refresh]);

  const updateAvatarFromFile = async (file: File): Promise<string> => {
    const dataUrl = await processImageFile(file);
    saveCustomAvatar(dataUrl);
    return dataUrl;
  };

  const updateAvatarFromDataUrl = (dataUrl: string) => {
    saveCustomAvatar(dataUrl);
  };

  const resetAvatar = () => {
    resetCustomAvatar();
  };

  return {
    avatarUrl,
    isCustom,
    updateAvatarFromFile,
    updateAvatarFromDataUrl,
    resetAvatar,
  };
}
