'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Utility to wrap each word in a span
function splitTextIntoSpans(text: string) {
  return text.split(' ').map((word, index) => (
    <span key={index} className="inline-block animate-word">{word}&nbsp;</span>
  ));
}

const Text: React.FC = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Media query for screens >= 1024px

    const runAnimation = () => {
      if (mediaQuery.matches) {
        // GSAP animations for larger screens
        const wordsAndImages = gsap.utils.toArray('.animate-word, .animate-word img') as HTMLElement[]; // Include images in the selection
        
        wordsAndImages.forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 50, // Start position (from below)
              opacity: 0, // Start with hidden opacity
            },
            {
              y: 0, // Move to natural position
              opacity: 1, // Fade to full opacity
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element, // Trigger animation when this element comes into view
                start: 'top 90%', // Start the animation when the top of the element is 90% from the top of the viewport
                end: 'bottom 60%', // End animation before the element fully leaves
                toggleActions: 'play none none none', // Play the animation once
              },
            }
          );
        });
      } else {
        // Kill any GSAP animations when screen size is smaller than 1024px
        gsap.killTweensOf('.animate-word, .animate-word img');
      }
    };

    // Initial animation setup
    runAnimation();

    // Re-run the animation on resize
    const handleResize = () => {
      gsap.killTweensOf('.animate-word, .animate-word img'); // Kill any existing tweens
      runAnimation();
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf('.animate-word, .animate-word img'); // Clean up animations
    };
  }, []);

  return (
    <div className="mt-[14rem] px-10 flex flex-col gap-4 w-full">
      <h3 className="animate-word uppercase text-base text-center md:text-left font-medium opacity-60">
        {splitTextIntoSpans('our motive')}
      </h3>

      <p className="text-2xl lg:text-3xl font-normal leading-[2.5rem] tracking-tight lg:leading-[2.8rem] text-center md:text-left w-[99%] md:w-[99%] lg:w-[72%]">
        {splitTextIntoSpans(
          `Renewora creates eco-friendly`
        )} 
        <span className="inline-block w-10 lg:w-12 animate-word">
          <img
            className="inline relative object-cover w-16 -top-[0.5rem]"
            src="/Video/paper-bag.gif"
            alt="paper bag"
          />
        </span>{' '}
        {splitTextIntoSpans(
          `from biodegradable waste, helping to reduce environmental impact`
        )}
        <span className="inline-block w-10 lg:w-12 animate-word">
          <img className="inline relative object-cover" src="/Video/eco-earth.gif" alt="eco earth" />
        </span>{' '}
        {splitTextIntoSpans(
          `and promote harmony between`
        )}
        <span className="inline-block w-10 lg:w-12 animate-word">
          <img className="inline relative object-cover" src="/Video/overpopulation.gif" alt="overpopulation" />
        </span>{' '}
        {splitTextIntoSpans(
          `and the planet. We create eco-friendly products that reduce carbon footprints`
        )}
        <span className="inline-block w-10 lg:w-12 animate-word">
          <img className="inline relative object-cover" src="/Video/footprint.gif" alt="footprint" />
        </span>{' '}
        {splitTextIntoSpans(
          `, keeping a watchful`
        )}
        <span className="inline-block w-10 lg:w-12 animate-word">
          <img className="inline relative object-cover" src="/Video/eye.gif" alt="eye" />
        </span>{' '}
        {splitTextIntoSpans(
          `on the planet’s future.`
        )}
      </p>
    </div>
  );
}

export default Text;
