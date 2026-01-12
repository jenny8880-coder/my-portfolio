'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animated background circles from Calm theme (same as onboarding)
const AnimatedCircle = ({ 
  color, 
  size, 
  left, 
  top, 
  scrollSpeed 
}: { 
  color: string; 
  size: number; 
  left: string; 
  top: string; 
  scrollSpeed: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        width: size,
        height: size,
        background: color,
        left,
        top,
        filter: 'blur(60px)',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
      animate={{
        scaleX: [1, 1.2, 1],
        scaleY: [1, 1.1, 1],
        y: [0, -30, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const BackgroundCircles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ overflowY: 'visible' }}>
      <AnimatedCircle 
        color="#F0A5C9" 
        size={400} 
        left="10%" 
        top="20%" 
        scrollSpeed={0.8}
      />
      <AnimatedCircle 
        color="#A5C9F0" 
        size={350} 
        left="70%" 
        top="60%" 
        scrollSpeed={1.0}
      />
      <AnimatedCircle 
        color="#C9F0A5" 
        size={300} 
        left="40%" 
        top="80%" 
        scrollSpeed={0.9}
      />
      <AnimatedCircle 
        color="#E8D5F0" 
        size={380} 
        left="20%" 
        top="30%" 
        scrollSpeed={0.85}
      />
      <AnimatedCircle 
        color="#D5F0E8" 
        size={320} 
        left="60%" 
        top="50%" 
        scrollSpeed={0.95}
      />
    </div>
  );
};

export default function MobileBlock() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      // Desktop breakpoint: show mobile block if screen width is less than 1024px
      const isSmallScreen = window.innerWidth < 1024;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  if (!isMobile) {
    return null;
  }

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center z-[9999]" 
      style={{ 
        overflowX: 'hidden', 
        overflowY: 'visible',
        background: 'linear-gradient(to bottom, #E6E9FA 0%, #F6F6F8 55%, #F9F9FB 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundCircles />
      
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-8"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image 
          src="/empty-state.png" 
          alt="Please view on desktop" 
          width={600}
          height={400}
          className="w-full max-w-[600px] h-auto"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
