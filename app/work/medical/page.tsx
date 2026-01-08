'use client';

import { useEffect, useState } from 'react';

export default function MedicalCaseStudy() {
  const [cacheBuster, setCacheBuster] = useState<string>('');

  useEffect(() => {
    // Set cache buster only on client side to avoid hydration mismatch
    setCacheBuster(`?t=${Date.now()}`);
  }, []);

  // Force refresh images on window focus (helps catch file updates)
  useEffect(() => {
    const handleFocus = () => {
      setCacheBuster(`?t=${Date.now()}`);
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      
      {/* STRATEGY: THE IMAGE STACK
        We render the high-fidelity exports as full-width images.
        This preserves 100% of the Figma layout, spacing, and typography.
      */}

      {/* SECTION 1: HERO & INTRO */}
      <section className="w-full max-w-[1440px] px-[120px] pt-[56px] mt-0 flex justify-center">
        <div className="w-full max-w-[1200px]">
          <img 
            src={`/medical/medical-section-1.png${cacheBuster}`}
            alt="KODEX Intracardiac Navigation - Hero Section"
            className="w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* SECTION 2: BASIC INFO */}
      <section className="w-full max-w-[1440px] px-[120px] mt-[32px] flex justify-center">
        <div className="w-full max-w-[1200px]">
          <img 
            src={`/medical/medical-section-2.png${cacheBuster}`}
            alt="Project Context and Monitor Display"
            className="w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* SECTION 3: PROCESS */}
      <section className="w-full max-w-[1440px] px-[120px] mt-[32px] flex justify-center">
        <div className="w-full max-w-[1200px]">
          <img 
            src={`/medical/medical-section-3.png${cacheBuster}`}
            alt="Research, Wireframes, and Process"
            className="w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* SECTION 4: OUTCOME */}
      <section className="w-full max-w-[1440px] px-[120px] mt-[32px] flex justify-center">
        <div className="w-full max-w-[1200px]">
          <img 
            src={`/medical/medical-section-4.png${cacheBuster}`}
            alt="Final User Interface and Summary"
            className="w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* SEO & ACCESSIBILITY LAYER 
        This is invisible to humans but tells Google what this page is about.
      */}
      <div className="sr-only">
        <h1>Medical Case Study: KODEX Intracardiac Navigation</h1>
        <p>Design Lead for Philips EPD. Creating a real-time 3D image of the heart using dielectric imaging.</p>
        <h2>The Problem</h2>
        <p>Long exposure to X-ray for patient and physician during ablation procedures.</p>
        <h2>The Solution</h2>
        <p>A B2B navigation system that visualizes the heart without radiation.</p>
      </div>

    </main>
  );
}

