import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nils Goecke Portfolio',
    short_name: 'Nils Goecke',
    description: 'Nils Goecke - Blending UI/UX, 3D Design, and Fullstack Engineering into seamless digital experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
