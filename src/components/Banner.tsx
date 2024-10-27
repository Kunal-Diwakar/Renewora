'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Banner: React.FC = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Media query for screens >= 1024px

    const runAnimations = () => {
      if (mediaQuery.matches) {
        // GSAP animation setup for banner and info elements
        gsap.to('.banner img', {
          y: () => -window.innerHeight * 0.2, // Adjust scroll speed (e.g., move image up 20% of viewport height)
          ease: 'none',
          scrollTrigger: {
            trigger: '.banner img',
            start: 'top bottom', // Start animation when the top of the image reaches the bottom of the viewport
            end: 'bottom top', // End animation when the bottom of the image reaches the top of the viewport
            scrub: true, // Sync animation with scroll position
          },
        });
        gsap.fromTo(
          '.info',
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.info',
              start: 'top 80%', // Start animation when the top of the element is 80% from the top of the viewport
              end: 'bottom top', // End animation when the bottom of the element reaches the top of the viewport
              scrub: true, // Sync animation with scroll position
              toggleActions: 'play none none none'
            },
          }
        );
      } else {
        // Kill any GSAP animations when screen size is smaller than 1024px
        gsap.killTweensOf('.banner img');
        gsap.killTweensOf('.info');
      }
    };

    // Initial animation setup
    runAnimations();

    // Re-run the animation on resize
    const handleResize = () => {
      gsap.killTweensOf('.banner img'); // Kill any existing tweens
      gsap.killTweensOf('.info');
      runAnimations();
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf('.banner img'); // Clean up animations
      gsap.killTweensOf('.info');
    };
  }, []);

  return (
    <div className='mt-[8rem] w-full h-fit flex flex-col md:flex-row md:gap-16 gap-12 lg:gap-24 items-center'>
      <div className="banner w-[80%] lg:w-[50rem] h-[25rem]">
        <img className='w-full h-full object-cover img-pos rounded-sm' src="/Images/bottle.jpg" alt="banner" />
      </div>

      <div className="info w-60 md:pr-8 lg:pr-[1%]">
        <h1 className='text-4xl text-left tracking-tight leading-8 font-medium'>Biodegradable Packaging</h1>
        <p className='text-base text-left tracking-tight pt-4 leading-5 opacity-90'>Our commitment goes beyond products—each package is designed to break down naturally.</p>
      </div>
    </div>
  );
}

export default Banner;
