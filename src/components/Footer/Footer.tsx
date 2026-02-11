'use client';

import TransitionLink from '@/components/common/TransitionLink';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isShopPage = pathname === '/news';

  return (
    <footer className="w-full pt-32 pb-12 px-3 lg:px-4 xl:px-6">
      <div className="md:ml-[var(--column)] md:pl-4">
        {/* Main CTA Section */}
        {(!isShopPage && pathname !== '/about') && (
          <div className="relative bg-black text-white rounded-2xl p-8 md:p-16 mb-12 overflow-hidden">
            {/* 3D Logo Background Image */}
            <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[85%] md:w-[65%] aspect-square z-0 opacity-40 pointer-events-none">
              <Image
                src="/images/Hero (2).png"
                alt="3D Logo"
                fill
                className="object-contain"
              />
            </div>

            <div className="relative max-w-7xl z-10">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tight">
                Let's Work Together
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-md">
                    Have a project in mind? Get in touch and let's create something meaningful together.
                  </p>
                  <a
                    href="mailto:contact@nilsgoecke.com"
                    className="inline-block text-2xl md:text-4xl font-bold hover:opacity-60 transition-opacity decoration-2 underline-offset-4"
                  >
                    contact@nilsgoecke.com
                  </a>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg md:text-xl hover:opacity-60 transition-opacity"
                    >
                      Instagram ↗
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg md:text-xl hover:opacity-60 transition-opacity"
                    >
                      Twitter ↗
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg md:text-xl hover:opacity-60 transition-opacity"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Legal/Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-gray-200">
          <div>
            <p className="text-sm tracking-wide font-bold mb-1">Nils Goecke</p>
            <p className="text-xs text-gray-500">Multidisciplinary Designer & Engineer</p>
          </div>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>© 2025 Nils Goecke. All rights reserved.</span>
            <TransitionLink href="/privacy" className="hover:text-black transition-colors pointer-events-auto">
              Privacy Policy
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
