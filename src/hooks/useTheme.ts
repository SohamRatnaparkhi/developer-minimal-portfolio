import { useEffect, useState } from 'react';

function getCurrentIsDark(): boolean {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  } catch {
    // no-op for SSR or blocked storage
  }
  const hasDarkClass = document.documentElement.classList.contains('dark');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return hasDarkClass || prefersDark;
}

export const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(getCurrentIsDark());

  useEffect(() => {
    // Ensure DOM reflects current state on mount
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setIsDark(getCurrentIsDark());
      }
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => setIsDark(getCurrentIsDark());

    // Observe class changes to <html> so any external toggles are reflected
    const mutationObserver = new MutationObserver(() => {
      setIsDark(getCurrentIsDark());
    });
    mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('storage', handleStorage);
    mediaQueryList.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      mediaQueryList.removeEventListener('change', handleMediaChange);
      mutationObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !getCurrentIsDark();
    setIsDark(nextIsDark);
    if (nextIsDark) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
  };

  return { isDark, toggleTheme };
};