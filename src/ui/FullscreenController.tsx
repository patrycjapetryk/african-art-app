'use client';

import { useEffect } from 'react';

export function FullscreenController() {
  useEffect(() => {
    const goFullscreen = () => {
      const el = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    };

    document.addEventListener('click', goFullscreen, { once: true });

    return () => {
      document.removeEventListener('click', goFullscreen);
    };
  }, []);

  return null; // komponent nie renderuje nic
}
