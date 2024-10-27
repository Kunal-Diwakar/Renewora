'use client';
/* eslint-disable @next/next/no-img-element */
import { RiArrowDownLine } from "@remixicon/react";
import { useEffect } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Media query for screens >= 1024px (lg in Tailwind)

    const runAnimation = () => {
      if (mediaQuery.matches) {
        // GSAP timeline animations for larger screens
        const tl = gsap.timeline();

        tl.fromTo(
          '.emhemeral',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.3,
            delay: 1,
          }
        ).fromTo(
          '.sustain',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.3,
            delay: 1,
          },
          ".8"
        ).fromTo(
          '.scroll',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.3,
            delay: 1,
          },
          "1"
        );
      } else {
        // Kill any GSAP animations when screen size is smaller than 1024px
        gsap.killTweensOf('.emhemeral, .sustain, .scroll');
      }
    };

    // Initial animation setup
    runAnimation();

    // Re-run the animation on resize
    const handleResize = () => {
      gsap.killTweensOf('.emhemeral, .sustain, .scroll'); // Kill any existing tweens
      runAnimation();
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf('.emhemeral, .sustain, .scroll'); // Clean up animations
    };
  }, []);

  return (
    <div className="w-full mt-36 lg:mt-52 px-10 flex-col-reverse md:flex-row flex justify-between items-center gap-32 xl:gap-0">
      <div className="sustain md:mt-40 flex flex-col justify-start w-80 lg:w-60 lg:mt-12">
        <h1 className="text-xl lg:text-lg font-medium leading-3 lg:leading-4">01.</h1>
        <h1 className="text-3xl lg:text-2xl font-medium tracking-tight">Sustainability.</h1>
        <p className="text-base opacity-90 pt-2 pb-2 text-left w-52 font-normal leading-5">
          We create products that prioritize the environment
        </p>
        <div className="w-full lg:w-60 h-40">
          <img
            className="object-contain rounded-md select-none"
            src="/Images/hero-1.webp"
            alt="plant"
          />
        </div>
      </div>

      <div className="emhemeral relative w-96 rounded-md h-[30rem]">
        <div className="headings absolute -top-[12%] md:-top-[8%] md:-left-[20%] lg:-top-[25%] lg:-left-[32%]">
          <h1 className="z-50 text-6xl lg:text-[6rem] tracking-[-0.07em] font-normal leading-[3.5rem] lg:leading-[4.5rem]">
            Ephemeral
          </h1>
          <h1 className="z-50 text-6xl lg:text-[6rem] tracking-[-0.07em] font-normal leading-[3.5rem] lg:leading-[4.5rem]">
            Equilibrium.
          </h1>
        </div>
        <img className="w-full h-full object-cover rounded-md select-none" src="/Images/hero-2.webp" alt="plant" />
        <p className="absolute text-base pt-4 lg:text-base opacity-80 text-left w-52 md:w-44 font-medium leading-5 lg:leading-4">
          Commited to sustainability, eco-friendly choices for better tomorrow.
        </p>
      </div>

      <div className="scroll hidden lg:flex items-center justify-center gap-4 mt-52 opacity-80">
        <div className="w-[4vw] h-[4vw] pt-1 flex justify-center items-center border border-black opacity-75 rounded-full">
          <RiArrowDownLine size={20} />
        </div>
        <h3>Scroll Down</h3>
      </div>
    </div>
  );
}

export default Hero;
