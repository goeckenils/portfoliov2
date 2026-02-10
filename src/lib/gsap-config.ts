'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, Flip);
    if (ScrollSmoother) {
        gsap.registerPlugin(ScrollSmoother);
    }
}

export { gsap, ScrollTrigger, ScrollSmoother, Flip };

// Utility function to initialize smooth scrolling
export const initSmoothScroll = () => {
    if (typeof window === 'undefined') return null;
    // Check if ScrollSmoother is available (it's a paid plugin)
    if (!ScrollSmoother) {
        console.warn('ScrollSmoother not found. Skipping smooth scroll initialization.');
        return null;
    }

    return ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
    });
};

// Text split utility for animations
export const splitText = (element: HTMLElement) => {
    const text = element.textContent || '';
    const words = text.split(' ');

    element.innerHTML = words
        .map(word => {
            const chars = word.split('');
            return `<span class="word">${chars
                .map(char => `<span class="char">${char}</span>`)
                .join('')}</span>`;
        })
        .join(' ');
};

// Reveal animation for text
export const revealText = (element: HTMLElement, options = {}) => {
    const chars = element.querySelectorAll('.char');

    gsap.from(chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        ...options,
    });
};

// Fade in animation for images
export const fadeInImage = (element: HTMLElement, options = {}) => {
    gsap.from(element, {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        ...options,
    });
};
