'use client'
import Banner from '@/components/Banner'
import Feature from '@/components/Feature'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Text from '@/components/Text'
import React from 'react'
import Lenis from 'lenis';
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup when component unmounts
    return () => {
      lenis.destroy();
    };
  }, [])

  return (
    <main className='overflow-hidden'>
      <Hero />
      <Text />
      <Feature />
      <Banner />
      <Footer />
    </main>
  )
}

export default Home;