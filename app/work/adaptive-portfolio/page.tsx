'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function AdaptivePortfolioShowcase() {
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

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full pb-20">
      
      {/* Back to Projects Navigation */}
      <nav className="w-full max-w-[1440px] px-[120px] py-8 border-b border-gray-200">
        <Link 
          href="/#projects-section"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Back to</span>
            <span className="text-base font-medium group-hover:underline">Projects</span>
          </div>
        </Link>
      </nav>

      {/* Render images from contentImages array */}
      {contentImages.map((imagePath, index) => (
        <section 
          key={index} 
          className={`w-full max-w-[1440px] px-[120px] ${index > 0 ? 'mt-[30px]' : ''}`}
        >
          <Image 
            src={imagePath} 
            alt={`${project?.title || 'Adaptive Portfolio'} - Section ${index + 1}`}
            width={1440} 
            height={900} 
            quality={100}
            priority={index === 0}
            className="w-full h-auto"
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
