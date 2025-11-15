import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'African Art Gallery',
    short_name: 'African Art',
    description: 'African Art Gallery App',
    start_url: '/',
    display: 'fullscreen',
    // display: 'standalone',
    orientation: 'landscape',
    background_color: '#FAF8F4',
    theme_color: '#161615',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
