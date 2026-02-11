'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { usePathname } from 'next/navigation';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export default function TransitionLink({ href, children, className, style, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    
    if (pathname !== href) {
      navigate(href);
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}
