'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSettings, updateSettings } from '@/lib/api';

interface SiteSettingsContextType {
  blogsVisible: boolean;
  loading: boolean;
  updateBlogsVisible: (val: boolean) => Promise<boolean>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  blogsVisible: false,
  loading: true,
  updateBlogsVisible: async () => false,
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogsVisible, setBlogsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const settings = await getSettings();
        if (isMounted) {
          setBlogsVisible(settings.blogsVisible);
        }
      } catch (err) {
        console.error('Failed to load site settings:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateBlogsVisible = async (val: boolean): Promise<boolean> => {
    const previous = blogsVisible;
    // Optimistic update
    setBlogsVisible(val);

    try {
      const res = await updateSettings({ blogsVisible: val });
      setBlogsVisible(res.blogsVisible);
      return true;
    } catch (err) {
      console.error('Failed to update blogsVisible setting:', err);
      // Rollback on failure
      setBlogsVisible(previous);
      throw err;
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        blogsVisible,
        loading,
        updateBlogsVisible,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SiteSettingsContext);
