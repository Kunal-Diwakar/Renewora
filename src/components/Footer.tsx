import React, { useState, useRef } from 'react';

const Footer: React.FC = () => {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video when hovered
  const handleMouseEnter = () => {
    setHover(true);
    videoRef.current?.play(); // Play the video
  };

  // Pause video when not hovered
  const handleMouseLeave = () => {
    setHover(false);
    videoRef.current?.pause(); // Pause the video
  };

  return (
    <div className='relative w-full h-screen flex items-center justify-center flex-col overflow-hidden'>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className={`w-full hidden lg:block absolute transition duration-500 rounded-md ${hover ? 'opacity-100' : 'opacity-0'}`}
        src="/Video/bg-back.webm"
      ></video>

      {/* Content */}
      <div className="relative z-40 flex flex-col items-center gap-1 bg-white px-4 py-4 rounded-lg">
        <h1 className='text-xl font-medium tracking-tight'>Think of Future</h1>
        <button
          className='text-xs tracking-tight px-2 py-2 bg-gray-100 border border-gray-400 rounded-xl'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Join The Movement
        </button>
      </div>
    </div>
  );
};

export default Footer;
