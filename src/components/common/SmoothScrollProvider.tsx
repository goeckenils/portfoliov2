'use client';

import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/gsap-config';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize smooth scrolling after component mounts
    const smoother = initSmoothScroll();

    return () => {
      // Cleanup on unmount
      smoother?.kill();
    };
  }, []);

  return <>{children}</>;
}
