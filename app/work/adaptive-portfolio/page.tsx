'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function AdaptivePortfolioShowcase() {
  const [cacheBuster, setCacheBuster] = useState<string>('');

  // Find the adaptive-portfolio project from data
  const project = portfolioData.projects.find(p => p.id === 'adaptive-portfolio');
  const contentImages = project?.contentImages || [];
  
  // Get projects that have detail pages (contentImages)
  const projectsWithDetailPages = portfolioData.projects.filter(p => p.contentImages && p.contentImages.length > 0);
  const currentIndex = projectsWithDetailPages.findIndex(p => p.id === 'adaptive-portfolio');
  const previousProject = currentIndex > 0 ? projectsWithDetailPages[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsWithDetailPages.length - 1 ? projectsWithDetailPages[currentIndex + 1] : null;
  
  // Get URL for a project
  const getProjectUrl = (projectId: string) => {
    if (projectId === 'kemtai') return '/work/kemtai';
    if (projectId === 'philips') return '/work/medical';
    if (projectId === 'adaptive-portfolio') return '/work/adaptive-portfolio';
    return '#';
  };

  // Cache busting for image updates
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

  // Handle hash navigation to scroll to designer section (now at top of 2nd image)
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#designer-section') {
        // Wait for images to load, then scroll to the top of the second image
        const checkAndScroll = () => {
          // Find the section with id="designer-section" (second image)
          const designerSection = document.getElementById('designer-section');
          
          if (designerSection) {
            // Get the actual image element
            const img = designerSection.querySelector('img') as HTMLImageElement;
            
            if (img) {
              // Wait for image to load if not already loaded
              if (!img.complete || img.naturalHeight === 0) {
                img.onload = () => {
                  setTimeout(() => {
                    performScroll(designerSection);
                  }, 200);
                };
                return false;
              }
              
              performScroll(designerSection);
              return true;
            }
          }
          return false;
        };

        const performScroll = (section: HTMLElement) => {
          // Calculate the exact top position of the section
          const sectionTop = section.offsetTop;
          
          // Scroll directly to the top of the section
          requestAnimationFrame(() => {
            window.scrollTo({
              top: sectionTop,
              behavior: 'smooth'
            });
          });
        };

        // Try after a delay to ensure DOM is ready
        setTimeout(() => {
          if (!checkAndScroll()) {
            // If not ready, wait a bit more and try again
            setTimeout(() => {
              if (!checkAndScroll()) {
                // Final attempt after images load
                setTimeout(checkAndScroll, 2000);
              }
            }, 800);
          }
        }, 300);
      }
    };

    // Handle on mount and hash change
    handleScroll();
    window.addEventListener('hashchange', handleScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full pb-20">
      
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

      {/* Render images from contentImages array */}
      {contentImages.map((imagePath, index) => (
        <section 
          key={index} 
          id={index === 1 ? 'designer-section' : undefined}
          className={`w-full max-w-[1440px] px-[120px] ${index > 0 ? 'mt-[30px]' : ''}`}
        >
          <img 
            src={`${imagePath}${cacheBuster}`}
            alt={`${project?.title || 'Adaptive Portfolio'} - Section ${index + 1}`}
            className="w-full h-auto"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
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

      {/* SEO & Accessibility (Hidden Text) */}
      <div className="sr-only">
        <h1>Adaptive Portfolio - Case Study</h1>
        <p>A personalized portfolio experience with adaptive themes and interactive onboarding.</p>
      </div>

    </main>
  );
}
