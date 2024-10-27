import Image from 'next/image';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Feature: React.FC = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Tailwind 'lg' breakpoint

    const scrollAnimation = () => {
      if (mediaQuery.matches) {
        // GSAP animation setup for images to scroll faster
        gsap.to('.first img, .second img', {
          y: () => -window.innerHeight * 0.1, // Move image up by 10% of viewport height
          ease: 'none',
          scrollTrigger: {
            trigger: '.first img, .second img',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      } else {
        // Kill the ScrollTrigger animations when the screen size is smaller than 'lg'
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };

    scrollAnimation(); // Call the animation function when the component mounts

    // Optional: If you need to refresh ScrollTrigger on resize, add an event listener
    const handleResize = () => {
      ScrollTrigger.refresh(); // Refresh ScrollTrigger on resize
      scrollAnimation(); // Re-apply the scroll animation on resize
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listeners and animations on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.killAll(); // Kill all ScrollTrigger instances when the component unmounts
    };
  }, []);

  return (
    <div className="mt-[8rem] h-fit w-full px-16 flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
      <div className="first md:pl-12">
        <Image
          src="/Images/feature-1.webp"
          alt="Feature"
          width={250}
          height={400}
          className="object-cover rounded-md"
        />
        <h2 className="text-3xl lg:text-2xl pt-3 lg:pt-0 font-medium tracking-tight">Harmony.</h2>
        <p className="text-base opacity-90 pt-2 pb-2 lg:pt-0 text-left w-52 font-normal leading-5">
          We craft products that blend innovation and nature, keeping the earth in mind.
        </p>
      </div>

      <div className="second relative md:pr-14">
        <Image
          src="/Images/feature-2.webp"
          alt="Feature"
          width={350}
          height={400}
          className="object-cover rounded-md"
        />
        <div className="imgntext relative h-fit w-full text-right flex flex-col items-end">
          <h2 className="text-3xl lg:text-2xl pt-3 lg:pt-0 font-medium tracking-tight">Synergy.</h2>
          <p className="text-base opacity-90 pt-2 lg:pt-0 pb-2 w-52 font-normal leading-5">
            We create eco-conscious solutions that align your lifestyle with a greener future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
