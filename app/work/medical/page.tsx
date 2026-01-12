'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function MedicalCaseStudy() {
  const [cacheBuster, setCacheBuster] = useState<string>('');

  // Find the philips project from data
  const project = portfolioData.projects.find(p => p.id === 'philips');
  const contentImages = project?.contentImages || [];
  
  // Get projects that have detail pages (contentImages)
  const projectsWithDetailPages = portfolioData.projects.filter(p => p.contentImages && p.contentImages.length > 0);
  const currentIndex = projectsWithDetailPages.findIndex(p => p.id === 'philips');
  const previousProject = currentIndex > 0 ? projectsWithDetailPages[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsWithDetailPages.length - 1 ? projectsWithDetailPages[currentIndex + 1] : null;
  
  // Get URL for a project
  const getProjectUrl = (projectId: string) => {
    if (projectId === 'kemtai') return '/work/kemtai';
    if (projectId === 'philips') return '/work/medical';
    if (projectId === 'adaptive-portfolio') return '/work/adaptive-portfolio';
    if (projectId === 'selected-work') return '/work/selected-work';
    return '#';
  };

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
      
      {/* Back to Projects Navigation */}
      <nav className="w-full max-w-[1440px] px-[120px] py-8 border-b border-gray-200">
        <Link 
          href="/#projects-section"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-base font-medium group-hover:underline">Back</span>
        </Link>
      </nav>

      {/* STRATEGY: THE IMAGE STACK
        We render the high-fidelity exports as full-width images.
        This preserves 100% of the Figma layout, spacing, and typography.
      */}

      {/* Render images from contentImages array */}
      {contentImages.map((imagePath, index) => (
        <section 
          key={index} 
          className={`w-full max-w-[1440px] px-[120px] flex justify-center ${index === 0 ? 'pt-[56px] mt-0' : 'mt-[32px]'}`}
        >
          <div className="w-full max-w-[1200px]">
            <img 
              src={`${imagePath}${cacheBuster}`}
              alt={`${project?.title || 'EPD - Philips'} - Section ${index + 1}`}
              className="w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </section>
      ))}

      {/* Project Navigation */}
      <nav className="w-full max-w-[1440px] px-[120px] py-12 mt-16 border-t border-gray-200">
        <div className="flex justify-between items-center">
          {/* Previous Project Button */}
          {previousProject ? (
            <Link 
              href={getProjectUrl(previousProject.id)}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Previous Project</span>
                <span className="text-base font-medium group-hover:underline">{previousProject.title}</span>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-wide">Previous Project</span>
                <span className="text-base font-medium">—</span>
              </div>
            </div>
          )}
          
          {/* Next Project Button */}
          {nextProject ? (
            <Link 
              href={getProjectUrl(nextProject.id)}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group ml-auto"
            >
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Next Project</span>
                <span className="text-base font-medium group-hover:underline">{nextProject.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 opacity-50 cursor-not-allowed ml-auto">
              <div className="flex flex-col items-end">
                <span className="text-xs uppercase tracking-wide">Next Project</span>
                <span className="text-base font-medium">—</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          )}
        </div>
      </nav>

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

