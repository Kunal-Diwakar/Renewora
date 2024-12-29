"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/About", label: "About" },
  { path: "/Products", label: "Products" },
  { path: "/Contact", label: "Contact" },
];

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize the timeline with gsap.core.Timeline
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!container.current) return; // Ensure the container is set

    gsap.set(".menu-link-item-holder", { y: 75 });

    // Create the GSAP timeline and store it in tl.current
    tl.current = gsap
      .timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "Power4.InOut",
        delay: -0.75,
      });
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play(); // Play the timeline if menu is open
    } else {
      gsap.fromTo(
        ".nlink",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power4.inOut",
        }
      );
      tl.current?.reverse(); // Reverse the timeline if menu is closed
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar bg-white/60 backdrop-blur top-0 left-0 w-full px-10 py-4 flex justify-between items-center z-10 ">
        <div className="menu-text text-base lg:text-lg font-medium invert-0 select-none">
          <Link className="inline-block nlink" href={"/"}>
            RENEWORA
          </Link>
        </div>

        <div className="menu-open" onClick={toggleMenu}>
          <p className=" nlink uppercase text-base lg:text-lg font-medium cursor-pointer invert-0 select-none">
            MENU
          </p>
        </div>
      </div>

      <div className="menu-overlay fixed top-0 left-0 w-screen h-screen flex z-20 bg-black/90 backdrop-blur-lg clip-overlay">
        <div className="menu-overlay-bar fixed top-0 left-0 w-full px-10 py-4 flex justify-between items-center z-10">
          <div className="menu-text text-white font-medium text-base lg:text-lg select-none">
            <Link href={"/"}>RENEWORA</Link>
          </div>

          <div className="menu-close" onClick={toggleMenu}>
            <p className="uppercase text-base lg:text-lg font-medium text-white cursor-pointer select-none">
              Close
            </p>
          </div>
        </div>

        <div className="menu-close-icon hidden md:flex flex-[2] items-end cursor-pointer pl-12 pb-4">
          <p className="uppercase text-8xl font-medium text-white select-none">
            &#x2715;
          </p>
        </div>

        <div className="menu-copy flex flex-[4] flex-col justify-between pt-36 lg:pt-20 pl-[2rem] md:pl-0">
          <div className="menu-links">
            {menuLinks.map((link, index) => {
              return (
                <div
                  className="menu-link-item w-max clip-menu-items"
                  key={index}
                >
                  <div className="menu-link-item-holder relative">
                    <Link
                      href={link.path}
                      onClick={handleLinkClick}
                      className="menu-link text-white text-6xl md:text-8xl cursor-pointer select-none font-normal tracking-[-0.02em] leading-[90%]"
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="menu-info flex pb-4">
            <div className="menu-info-col text-white text-base flex flex-1 flex-col justify-end font-medium select-none cursor-pointer">
              <Link href={"/"}>Instagram &#8599;</Link>
              <Link href={"/"}>Dribble &#8599;</Link>
              <Link href={"/"}>Linkedin &#8599;</Link>
            </div>

            <div className="menu-info-col flex flex-1 flex-col justify-end">
              <p className="uppercase text-sm font-medium text-white select-none cursor-pointer">
                info@renewora.com
              </p>
              <p className="uppercase text-sm font-medium text-white select-none cursor-pointer">
                2005 025 007
              </p>
            </div>
          </div>
        </div>

        <div className="menu-preview hidden lg:flex flex-[4] justify-end items-end pb-4 pr-12">
          <h2 className="text-2xl">🐒</h2>
        </div>
      </div>
    </div>
  );
};

export default Menu;
