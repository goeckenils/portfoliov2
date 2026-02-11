import { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import SmoothScrollProvider from '@/components/common/SmoothScrollProvider';
import { TransitionProvider, PageTransitionWrapper } from '@/context/TransitionContext';
import Preloader from '@/components/Preloader/Preloader';
import localFont from 'next/font/local';

const gattica = localFont({
  src: [
    {
      path: '../../public/fonts/Gattica-Medium105.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gattica-Bold105.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gattica-MediumItalic105.otf',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-gattica',
});

export const metadata: Metadata = {
  title: 'Nils Goecke | Digital Portfolio',
  description: 'Nils Goecke - Blending UI/UX, 3D Design, and Fullstack Engineering into seamless digital experiences.',
  icons: {
    icon: '/icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gattica.variable} font-sans antialiased text-black bg-white`}>
        <Preloader />
        <CustomCursor />
          <TransitionProvider>
            <Navigation />
            <Suspense fallback={null}>
              <Sidebar />
            </Suspense>

            <SmoothScrollProvider>
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  <PageTransitionWrapper>
                    {children}
                    <Footer />
                  </PageTransitionWrapper>
                </div>
              </div>
            </SmoothScrollProvider>
          </TransitionProvider>
      </body>
    </html>
  );
}
