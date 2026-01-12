'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortfolioData } from '@/lib/data';
import { Sparkles, Linkedin, Mail, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePersonalization } from '@/lib/context/personalization-context';

interface VibrantThemeProps {
  data: PortfolioData;
  onSwitchVibe: () => void;
}

// Helper components - Badge with white background and black text, positioned in upper left
function Badge({ text }: { text: string }) {
  return (
    <div className="absolute bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] rounded-[6px] shrink-0 left-[32px] top-[32px] z-20">
      <p className="font-['Inter',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-black text-[12px] text-center text-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>{text}</p>
    </div>
  );
}

function BackgroundImage8({ text, text1 }: { text: string; text1: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-end leading-[1.5] relative shrink-0 w-full">
      <p className="font-['Akshar:Regular',sans-serif] font-normal relative shrink-0 text-[24px] text-nowrap text-white">{text}</p>
      <p className="font-['Akshar:Light',sans-serif] font-light min-w-full relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] w-[min-content]">{text1}</p>
    </div>
  );
}

function BackgroundImage9({ children, bgColor }: React.PropsWithChildren<{ bgColor?: string }>) {
  return (
    <div className="h-[310px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundColor: bgColor }}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center p-[24px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

// Navigation
function Frame28({ navItems }: { navItems: PortfolioData['navigation']['items'] }) {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll Spy using IntersectionObserver API
  useEffect(() => {
    const sections = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'work', label: 'Work' },
      { id: 'contact', label: 'Contact' }
    ];

    // Create IntersectionObserver with options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle 20% of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      let maxRatio = 0;
      let activeId = 'home';

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      // If we found an intersecting section, update active section
      if (maxRatio > 0) {
        const section = sections.find(s => s.id === activeId);
        if (section) {
          setActiveSection(section.label.toLowerCase());
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleNavClick = (label: string) => {
    const sectionId = label.toLowerCase();
    setActiveSection(sectionId);
    // Map "work" to "projects-section" for consistency with other themes
    const elementId = sectionId === 'work' ? 'projects-section' : sectionId;
    const element = document.getElementById(elementId);
    if (element) {
      // Scroll to center the section in the viewport
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    } else {
      console.log('Element not found:', elementId);
    }
  };

  const handleContactClick = () => {
    setActiveSection('contact');
    const element = document.getElementById('contact');
    if (element) {
      // Scroll to center the section in the viewport
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    } else {
      console.log('Contact element not found');
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center">
      {navItems.map((item, index) => {
        const isActive = activeSection === item.label.toLowerCase();
        return (
          <motion.div 
            key={index} 
            className="content-stretch flex gap-[6px] items-center px-[16px] py-[14px] relative rounded-[8px] shrink-0 cursor-pointer"
            onClick={() => handleNavClick(item.label)}
            whileHover={{ 
              x: 12,
              scale: 1.08,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 20
              }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 15
              }
            }}
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1,
              transition: { 
                delay: index * 0.08, 
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <motion.div
              animate={isActive ? { 
                x: [0, 6, 0],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ 
                duration: 0.6, 
                repeat: isActive ? Infinity : 0, 
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            >
              {isActive && <ChevronRight size={20} className="text-white" />}
            </motion.div>
            <motion.p 
              className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap"
              style={{ 
                color: 'white',
                opacity: isActive ? 1 : 0.5,
                fontWeight: isActive ? 600 : 400
              }}
              whileHover={{ 
                opacity: 1,
                scale: 1.05
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.label}
            </motion.p>
          </motion.div>
        );
      })}
      <motion.div 
        className="content-stretch flex gap-[6px] items-center px-[16px] py-[14px] relative rounded-[8px] shrink-0 cursor-pointer"
        onClick={handleContactClick}
        whileHover={{ 
          x: 12,
          scale: 1.08,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transition: { 
            type: "spring",
            stiffness: 400,
            damping: 20
          }
        }}
        whileTap={{ 
          scale: 0.9,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 15
          }
        }}
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          scale: 1,
          transition: { 
            delay: 0.4, 
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
      >
        <motion.div
          animate={activeSection === 'contact' ? { 
            x: [0, 6, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ 
            duration: 0.6, 
            repeat: activeSection === 'contact' ? Infinity : 0, 
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        >
          {activeSection === 'contact' && <ChevronRight size={20} className="text-white" />}
        </motion.div>
        <motion.p 
          className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap"
          style={{ 
            color: 'white',
            opacity: activeSection === 'contact' ? 1 : 0.5,
            fontWeight: activeSection === 'contact' ? 600 : 400
          }}
          whileHover={{ 
            opacity: 1,
            scale: 1.05
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Contact
        </motion.p>
      </motion.div>
    </div>
  );
}

// Switch vibe button
function Frame5({ switchVibeLabel, onSwitchVibe }: { switchVibeLabel: string; onSwitchVibe: () => void }) {
  return (
    <motion.div 
      className="content-stretch flex gap-[6px] h-[52px] items-center justify-center px-[24px] py-[14px] relative rounded-[8px] shrink-0 cursor-pointer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ 
        scale: 1.08, 
        boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      onClick={onSwitchVibe}
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      >
        <Sparkles size={20} className="text-[#ffd700]" />
      </motion.div>
      <motion.p 
        className="font-['Inter',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#ffd700] text-[16px] text-nowrap" 
        style={{ fontFamily: 'Inter, sans-serif' }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {switchVibeLabel}
      </motion.p>
    </motion.div>
  );
}

// Ink drawing animation component with SVG pathLength animation
function InkDrawingAnimation() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/images/ink.svg')
      .then(res => res.text())
      .then(text => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          const paths = svgElement.querySelectorAll('path');
          paths.forEach((path) => {
            const pathElement = path as SVGPathElement;
            const originalFill = pathElement.getAttribute('fill') || '#72C8C1';
            const length = pathElement.getTotalLength();
            
            // Store original fill as data attribute
            pathElement.setAttribute('data-original-fill', originalFill);
            
            // Set up stroke for drawing animation
            pathElement.setAttribute('stroke-dasharray', `${length}`);
            pathElement.setAttribute('stroke-dashoffset', `${length}`);
            pathElement.setAttribute('stroke', originalFill);
            pathElement.setAttribute('stroke-width', '2');
            pathElement.setAttribute('fill', 'none');
          });
          
          const svgString = new XMLSerializer().serializeToString(svgElement);
          setSvgContent(svgString);
          setIsLoaded(true);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (svgContent && isLoaded) {
      // Add CSS animation for path drawing and filling
      let style = document.head.querySelector('#ink-drawing-style') as HTMLStyleElement;
      if (!style) {
        style = document.createElement('style');
        style.id = 'ink-drawing-style';
        document.head.appendChild(style);
      }
      style.textContent = `
        .ink-svg-container svg path {
          animation: drawPath 1.2s ease-in-out forwards, fillPath 0.5s ease-in-out forwards;
          animation-delay: 0.6s, 1.8s;
        }
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fillPath {
          from {
            fill: none;
          }
          to {
            fill: var(--original-fill, #72C8C1);
            stroke: none;
          }
        }
      `;
      
      // Set CSS variable for original fill color
      const container = document.querySelector('.ink-svg-container');
      if (container) {
        const paths = container.querySelectorAll('svg path');
        paths.forEach((path) => {
          const originalFill = path.getAttribute('data-original-fill') || '#72C8C1';
          (path as HTMLElement).style.setProperty('--original-fill', originalFill);
        });
      }
    }
  }, [svgContent, isLoaded]);

  return (
    <motion.div 
      className="relative shrink-0 mt-[-26px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      style={{ overflow: 'visible', width: '536px', height: '181px' }}
    >
      {svgContent ? (
        <motion.div
          className="ink-svg-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ width: '536px', height: '181px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      ) : (
        <motion.img 
          src="/images/ink.svg" 
          alt="" 
          className="block"
          style={{ width: '536px', height: '181px' }}
          initial={{ 
            clipPath: 'inset(0 100% 0 0)',
          }}
          animate={{ 
            clipPath: 'inset(0 0% 0 0)',
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />
      )}
    </motion.div>
  );
}

// Hero text component with slide-in animation
function HeroText({ text, className, style, scrollX, scrollOpacity, slideFrom }: { 
  text: string; 
  className: string; 
  style: React.CSSProperties;
  scrollX: any;
  scrollOpacity: any;
  slideFrom: 'left' | 'right';
}) {
  return (
    <motion.p
      className={className}
      style={{ 
        ...style,
        x: scrollX,
        opacity: scrollOpacity
      }}
      initial={{ 
        opacity: 0, 
        x: slideFrom === 'left' ? -200 : 200 
      }}
      animate={{ 
        opacity: 1, 
        x: 0 
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ scale: 1.02 }}
    >
      {text}
    </motion.p>
  );
}

// Hero section with enhanced animations
function Frame25() {
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(800);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
      const handleResize = () => setViewportHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Transform scroll position to x offset for PRODUCT (slides left)
  const productX = useTransform(
    scrollY,
    [0, viewportHeight * 0.8],
    [0, -300]
  );
  
  // Transform scroll position to x offset for DESIGNER (slides right)
  const designerX = useTransform(
    scrollY,
    [0, viewportHeight * 0.8],
    [0, 300]
  );
  
  // Transform scroll position to opacity (fade out as scrolling)
  const textOpacity = useTransform(
    scrollY,
    [0, viewportHeight * 0.8],
    [1, 0]
  );

  return (
    <div className="relative shrink-0 w-full flex flex-col items-center justify-center" style={{ overflow: 'visible' }}>
      <div className="flex flex-col items-center relative shrink-0 text-white" style={{ overflow: 'visible' }}>
        <HeroText
          text="PRODUCT"
          className="relative shrink-0 text-[200px] leading-[150px] tracking-[-3px] text-center text-white whitespace-nowrap"
          style={{ 
            fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
            fontWeight: 600,
            overflow: 'visible'
          }}
          scrollX={productX}
          scrollOpacity={textOpacity}
          slideFrom="left"
        />
        <div className="relative shrink-0 flex flex-col items-center" style={{ marginTop: '16px', overflow: 'visible' }}>
          <HeroText
            text="DESIGNER"
            className="relative shrink-0 text-[220px] leading-[150px] tracking-[-3px] text-center text-white whitespace-nowrap"
            style={{ 
              fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
              fontWeight: 600,
              overflow: 'visible'
            }}
            scrollX={designerX}
            scrollOpacity={textOpacity}
            slideFrom="right"
          />
          {/* Ink style underline element */}
          <InkDrawingAnimation />
        </div>
      </div>
    </div>
  );
}

function Frame26({ switchVibeLabel, onSwitchVibe }: { switchVibeLabel: string; onSwitchVibe: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end relative shrink-0 w-full">
      <Frame5 switchVibeLabel={switchVibeLabel} onSwitchVibe={onSwitchVibe} />
      <Frame25 />
    </div>
  );
}

// About section - using the full bio text from the image description
function Frame7({ bio }: { bio: PortfolioData['hero']['bio'] }) {
  const aboutText = "Hey there! I'm Jenny, a wife & a mother of two boys, I love hiking and traveling, and I love coffee(!). I'm also an optimist, a thinker, and a dreamer. I'm passionate about art and design and inspired by simple and beautiful experiences. My career has been a diverse journey through both the casual gaming and medical device industries, which is a rather unique combination. This background made me versatile, flexible, and open-minded. I also had the privilege of co-founding and developing a mobile game. It was a wild journey that taught me a lot about myself and my abilities. I try not to take myself too seriously, I'm a fast learner and genuinely care about what I do.";
  
  // Split into paragraphs - first paragraph includes the first three sentences
  const paragraphs = [
    "Hey there! I'm Jenny, a wife & a mother of two boys, I love hiking and traveling, and I love coffee(!). I'm also an optimist, a thinker, and a dreamer. I'm passionate about art and design and inspired by simple and beautiful experiences.",
    "My career has been a diverse journey through both the casual gaming and medical device industries, which is a rather unique combination.",
    "This background made me versatile, flexible, and open-minded.",
    "I also had the privilege of co-founding and developing a mobile game.",
    "It was a wild journey that taught me a lot about myself and my abilities.",
    "I try not to take myself too seriously, I'm a fast learner and genuinely care about what I do."
  ];
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sentenceItem = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        mass: 0.5
      }
    }
  };
  
  return (
    <motion.div 
      className="content-stretch flex flex-col gap-[56px] items-start relative shrink-0 w-full" 
      style={{ zIndex: 1, position: 'relative' }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
    >
      <motion.p 
        className="uppercase"
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 600,
          fontSize: '16px',
          color: '#FFD700',
          letterSpacing: '3px'
        }}
        initial={{ opacity: 0, x: -50, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ 
          scale: 1.1, 
          x: 8,
          transition: { 
            type: "spring",
            stiffness: 400,
            damping: 15
          }
        }}
      >
        01 | ABOUT
      </motion.p>
      <motion.div 
        className="font-['Akshar',sans-serif] font-light leading-[1.5] relative shrink-0 text-white w-full"
        style={{ 
          fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
          fontWeight: 300,
          fontSize: '32px'
        }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {paragraphs.map((paragraph, index) => (
          <motion.span 
            key={index} 
            variants={sentenceItem}
            style={{ display: 'block', marginBottom: index < paragraphs.length - 1 ? '0.5em' : '0.5em' }}
          >
            {paragraph}
          </motion.span>
        ))}
        <motion.span 
          variants={sentenceItem}
          style={{ display: 'block', marginTop: '1em' }}
        >
          <Link 
            href="/work/adaptive-portfolio#designer-section"
            className="text-white hover:text-[#FFD700] transition-colors inline-block"
            style={{ 
              fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
              fontWeight: 400,
              fontSize: '24px',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.6)',
              textUnderlineOffset: '4px'
            }}
          >
            read more
          </Link>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function Frame12({ bio }: { bio: PortfolioData['hero']['bio'] }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame7 bio={bio} />
      {/* About element graphic - positioned under text, 140px down and 90px left */}
      <div 
        className="absolute pointer-events-none" 
        style={{ left: '-90px', bottom: '-140px', zIndex: 0 }}
      >
        <img 
          src="/images/about_element.png" 
          alt="" 
          className="block"
          style={{ maxWidth: '445px', height: 'auto' }}
        />
      </div>
    </div>
  );
}

// Project card component
function ProjectCard({ project }: { project: PortfolioData['projects'][0] }) {
  // Use vibrant images for this theme
  const getVibrantImage = (projectId: string) => {
    const imageMap: Record<string, string> = {
      'kemtai': '/images/kemtai_project_vibrant.png',
      'philips': '/images/philips_project_vibrant.png',
      'adaptive-portfolio': '/images/adaptive_portfolio_vibrant.png',
      'selected-work': '/images/selected_work_vibrant.png'
    };
    return imageMap[projectId] || project.image;
  };
  
  // Get vibrant background colors based on project
  const getVibrantColor = (projectId: string) => {
    const colorMap: Record<string, string> = {
      'kemtai': '#008B66', // Green
      'philips': '#372167', // Purple
      'adaptive-portfolio': '#F07C63', // Orange
      'selected-work': '#2A7B80' // Teal
    };
    return colorMap[projectId] || project.imageBackgroundColor;
  };
  
  const imageSrc = getVibrantImage(project.id);
  const bgColor = getVibrantColor(project.id);
  
  // Get the detail page URL for projects with contentImages
  const getProjectUrl = () => {
    if (project.id === 'kemtai') return '/work/kemtai';
    if (project.id === 'philips') return '/work/medical';
    if (project.id === 'adaptive-portfolio') return '/work/adaptive-portfolio';
    if (project.id === 'selected-work') return '/work/selected-work';
    return '#'; // No detail page for other projects
  };
  
  const projectUrl = getProjectUrl();
  const hasDetailPage = project.id === 'kemtai' || project.id === 'philips' || project.id === 'adaptive-portfolio' || project.id === 'selected-work';
  
  const cardContent = (
    <motion.div 
      className="relative rounded-[20px] overflow-hidden cursor-pointer" 
      style={{ backgroundColor: bgColor, width: '890px', willChange: 'transform' }}
      initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        type: "spring",
        stiffness: 150,
        damping: 18,
        mass: 0.8
      }}
      whileHover={{ 
        scale: 1.01,
        y: -8,
        rotateY: 1,
        rotateX: -1,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        transition: { 
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { 
          type: "spring",
          stiffness: 500,
          damping: 20
        }
      }}
    >
      <Badge text={project.badge} />
      <div className="flex flex-row items-center justify-center h-[310px] relative">
        {/* Left side: Title, Description - positioned at bottom with 32px gaps */}
        <motion.div 
          className="absolute left-[32px] bottom-[32px] flex flex-col gap-[8px] z-10"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <p 
            className="text-white"
            style={{ 
              fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
              fontSize: '24px',
              fontWeight: 400
            }}
          >
            {project.title}
          </p>
          <p 
            className="text-white opacity-80"
            style={{ 
              fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
              fontSize: '16px',
              fontWeight: 300
            }}
          >
            {project.description}
          </p>
        </motion.div>
        {/* Center: Project image - centered in the card with parallax effect */}
        <motion.div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0" 
          style={{ width: '346px', height: '199px', willChange: 'transform' }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <motion.div
            whileHover={{ 
              y: -10,
              scale: 1.1,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            style={{ willChange: 'transform' }}
          >
            <img 
              alt={project.title} 
              className="w-full h-full object-contain" 
              src={imageSrc} 
              style={{ willChange: 'transform' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
  
  if (hasDetailPage) {
    return (
      <Link href={projectUrl} className="block w-full no-underline" style={{ textDecoration: 'none' }}>
        {cardContent}
      </Link>
    );
  }
  
  return cardContent;
}

// Projects section
function Frame20({ projects }: { projects: PortfolioData['projects'] }) {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-start relative shrink-0 w-full">
      {/* Background graphic element */}
      <div className="absolute right-0 bottom-0 pointer-events-none z-0">
        <img 
          src="/images/work_vibrant_bg.svg" 
          alt="" 
          className="block"
          style={{ maxWidth: '100%', height: 'auto', opacity: 0.1 }}
        />
      </div>
      
      <p 
        className="uppercase z-10"
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 600,
          fontSize: '16px',
          color: '#FFD700',
          letterSpacing: '3px'
        }}
      >
        02 | WORK
      </p>
      <motion.div 
        className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}

// Contact section
function Frame10({ social }: { social: PortfolioData['social'] }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isFormValid = formData.firstName.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.message.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using the API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to: 'jenny8880@gmail.com'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const formItem = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[890px]"
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.9, 
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.8
      }}
    >
      <motion.div 
        className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 text-white w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.1
        }}
      >
        <motion.p 
          className="relative shrink-0 text-[30px] tracking-[-0.6px]"
          style={{ 
            fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
            fontWeight: 600
          }}
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1
          }}
          whileHover={{ 
            scale: 1.1,
            x: 8,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 20
            }
          }}
        >
          Let's connect
        </motion.p>
        <motion.p 
          className="opacity-80 relative shrink-0 tracking-[-0.16px]"
          style={{ 
            fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
            fontWeight: 400,
            fontSize: '16px'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }}
          whileHover={{ 
            opacity: 1,
            scale: 1.02,
            transition: { 
              type: "spring",
              stiffness: 300
            }
          }}
        >
          I'm excited to explore new opportunities and collaborate on innovative projects. Let's talk :)
        </motion.p>
      </motion.div>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full"
        variants={formContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="content-stretch flex flex-row gap-[20px] items-start relative shrink-0 w-full"
          variants={formItem}
        >
          {/* Left Column */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 flex-1">
            <motion.div 
              className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
              variants={formItem}
            >
              <motion.label 
                className="text-white text-[14px]" 
                style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
              >
                First name
              </motion.label>
              <motion.input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border-none rounded-[8px] px-[12px] py-[10px] w-full placeholder:text-white/50 focus:outline-none transition-all duration-300"
                placeholder=""
                style={{ 
                  fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
                  color: '#39414D',
                  backgroundColor: formData.firstName.trim() ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                  border: '2px solid transparent'
                }}
                whileFocus={{ 
                  scale: 1.01,
                  backgroundColor: 'rgba(255,255,255,0.65)',
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div 
              className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
              variants={formItem}
            >
              <motion.label 
                className="text-white text-[14px]" 
                style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
              >
                Email
              </motion.label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-none rounded-[8px] px-[12px] py-[10px] w-full placeholder:text-white/50 focus:outline-none transition-all duration-300"
                placeholder=""
                style={{ 
                  fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
                  color: '#39414D',
                  backgroundColor: formData.email.trim() ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                  border: '2px solid transparent'
                }}
                whileFocus={{ 
                  scale: 1.01,
                  backgroundColor: 'rgba(255,255,255,0.65)',
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 flex-1">
            <motion.div 
              className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
              variants={formItem}
            >
              <motion.label 
                className="text-white text-[14px]" 
                style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
              >
                Last name
              </motion.label>
              <motion.input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border-none rounded-[8px] px-[12px] py-[10px] w-full placeholder:text-white/50 focus:outline-none transition-all duration-300"
                placeholder=""
                style={{ 
                  fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
                  color: '#39414D',
                  backgroundColor: formData.lastName.trim() ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                  border: '2px solid transparent'
                }}
                whileFocus={{ 
                  scale: 1.01,
                  backgroundColor: 'rgba(255,255,255,0.65)',
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div 
              className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
              variants={formItem}
            >
              <motion.label 
                className="text-white text-[14px]" 
                style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
              >
                Phone number
              </motion.label>
              <motion.input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-none rounded-[8px] px-[12px] py-[10px] w-full placeholder:text-white/50 focus:outline-none transition-all duration-300"
                placeholder=""
                style={{ 
                  fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
                  color: '#39414D',
                  backgroundColor: formData.phone.trim() ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                  border: '2px solid transparent'
                }}
                whileFocus={{ 
                  scale: 1.01,
                  backgroundColor: 'rgba(255,255,255,0.65)',
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Message field - full width */}
        <motion.div 
          className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
          variants={formItem}
        >
          <motion.label 
            className="text-white text-[14px]" 
            style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}
            whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
          >
            Message
          </motion.label>
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="border-none rounded-[8px] px-[12px] py-[10px] w-full placeholder:text-white/50 focus:outline-none resize-none transition-all duration-300"
            placeholder=""
            style={{ 
              fontFamily: "'Akshar', 'Akshar Fallback', sans-serif",
              color: '#39414D',
              backgroundColor: formData.message.trim() ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
              border: '2px solid transparent'
            }}
            whileFocus={{ 
              scale: 1.01,
              backgroundColor: 'rgba(255,255,255,0.65)',
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        
        <motion.button
          variants={formItem}
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`relative rounded-[8px] shrink-0 w-full mt-[20px] overflow-hidden ${
            isFormValid && !isSubmitting
              ? 'bg-[#334155] cursor-pointer' 
              : 'bg-[#334155]/50 cursor-not-allowed opacity-60'
          }`}
          whileHover={isFormValid && !isSubmitting ? { 
            scale: 1.02,
            boxShadow: '0 8px 24px rgba(51, 65, 85, 0.4)'
          } : {}}
          whileTap={isFormValid && !isSubmitting ? { 
            scale: 0.95,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 15
            }
          } : {}}
          transition={{ 
            duration: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <div aria-hidden="true" className="absolute border border-[#334155] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
          <motion.div 
            className="flex flex-row items-center justify-center size-full"
            whileHover={isFormValid && !isSubmitting ? { x: 4 } : {}}
            transition={{ duration: 0.2 }}
          >
            <div className="content-stretch flex items-center justify-center px-[20px] py-[12px] relative w-full">
              {isSubmitting ? (
                <p className="leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}>Sending...</p>
              ) : submitStatus === 'success' ? (
                <p className="leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-green-400" style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}>Message sent!</p>
              ) : submitStatus === 'error' ? (
                <p className="leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-red-400" style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}>Error. Please try again.</p>
              ) : (
                <p className="leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontFamily: "'Akshar', 'Akshar Fallback', sans-serif" }}>Send message</p>
              )}
            </div>
          </motion.div>
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

function Frame13({ social }: { social: PortfolioData['social'] }) {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-start relative shrink-0 w-full">
      <div className="flex flex-col gap-[50px] items-start">
        <motion.p 
          className="uppercase"
          style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 600,
            fontSize: '16px',
            color: '#FFD700',
            letterSpacing: '3px'
          }}
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.1, 
            x: 8,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 15
            }
          }}
        >
          03 | CONTACT
        </motion.p>
        <motion.a
          href={social.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] cursor-pointer"
          style={{ backgroundColor: 'rgba(209, 213, 219, 0.3)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(209, 213, 219, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={20} className="text-white" fill="#ffffff" strokeWidth={0} />
        </motion.a>
      </div>
      <Frame10 social={social} />
    </div>
  );
}

// Decorative background components
function Component() {
  return (
    <div className="absolute h-[540px] left-0 opacity-60 top-[279px] w-[933px]" data-name="Component 8">
      {/* Decorative geometric pattern - simplified for now */}
    </div>
  );
}

function Group1() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -150]);
  
  return (
    <motion.div 
      className="absolute left-[993px] top-[3208px] pointer-events-none z-0"
      style={{ 
        y: parallaxY,
        willChange: 'transform'
      }}
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    >
      <img 
        src="/images/work_vibrant_bg.svg" 
        alt="" 
        className="block"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </motion.div>
  );
}

// Scroll-linked decorative path component
function ScrollLinkedPath() {
  const { scrollY } = useScroll();
  const [pathLength, setPathLength] = useState(5000);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const pathRef = React.useRef<SVGPathElement>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
      const handleResize = () => setViewportHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Calculate path drawing progress based on scroll
  const pathProgress = useTransform(
    scrollY,
    [0, viewportHeight * 3],
    [0, pathLength]
  );
  
  const pathD = `M 1 0 Q 1 ${viewportHeight * 0.5} 1 ${viewportHeight} T 1 ${viewportHeight * 2} T 1 ${viewportHeight * 3}`;
  
  return (
    <motion.svg
      className="fixed left-[75px] top-0 w-[2px] h-full pointer-events-none z-40"
      style={{ willChange: 'transform', height: '100vh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewBox={`0 0 2 ${viewportHeight * 3}`}
      preserveAspectRatio="none"
    >
      <motion.path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="#72C8C1"
        strokeWidth="2"
        strokeDasharray={pathLength}
        strokeDashoffset={useTransform(pathProgress, (value) => pathLength - value)}
        style={{ opacity: 0.6 }}
      />
    </motion.svg>
  );
}

// Vibrant background SVG with random highlight animations and parallax
function VibrantBackgroundSVG() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<string>('100vh');
  const [svgOpacity, setSvgOpacity] = useState<number>(0.05);
  const { scrollY } = useScroll();
  
  // Parallax effect - background moves slower than foreground
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    // Load SVG content
    fetch('/images/vibrant_bg.svg')
      .then(res => res.text())
      .then(text => {
        // Parse SVG and add animation attributes to paths
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // Make SVG responsive - remove fixed dimensions, keep viewBox
          svgElement.removeAttribute('width');
          svgElement.removeAttribute('height');
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMin meet');
          
          const paths = svgElement.querySelectorAll('path');
          paths.forEach((path) => {
            const delay = Math.random() * 10;
            const duration = 1.5 + Math.random() * 1.5; // 1.5-3 seconds
            const currentStyle = path.getAttribute('style') || '';
            path.setAttribute('style', `${currentStyle}; animation: vibrantHighlight ${duration}s ease-in-out infinite; animation-delay: ${delay}s; opacity: 0.8;`);
          });
          
          const svgString = new XMLSerializer().serializeToString(svgElement);
          setSvgContent(svgString);
        }
      })
      .catch(console.error);

    // Add CSS animation
    let style = document.head.querySelector('#vibrant-svg-style') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'vibrant-svg-style';
      document.head.appendChild(style);
    }
    style.textContent = `
      @keyframes vibrantHighlight {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
    `;

    // Calculate max height - stop before contact section
    const updateMaxHeight = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // Get the top of the contact section relative to viewport
        const rect = contactSection.getBoundingClientRect();
        const viewportTop = rect.top;
        
        // If contact section is in viewport, use its top position
        // If it's below viewport, use a large value
        // If it's above viewport, SVG should be hidden
        if (viewportTop > 0 && viewportTop < window.innerHeight) {
          // Contact section is visible in viewport - stop SVG at its top
          setMaxHeight(`${viewportTop}px`);
        } else if (viewportTop <= 0) {
          // Contact section is above viewport - hide SVG
          setMaxHeight('0px');
        } else {
          // Contact section is below viewport - extend SVG to viewport height
          setMaxHeight(`${window.innerHeight}px`);
        }
      } else {
        // Fallback: use svg-container bottom
        const svgContainer = document.getElementById('svg-container');
        if (svgContainer) {
          const rect = svgContainer.getBoundingClientRect();
          const containerBottom = Math.max(0, rect.bottom);
          setMaxHeight(`${containerBottom}px`);
        } else {
          setMaxHeight('100vh');
        }
      }
    };

    // Calculate scroll-based opacity (fade starts when contact section approaches, fully transparent at end)
    const updateOpacity = () => {
      const contactSection = document.getElementById('contact');
      const viewportHeight = window.innerHeight;
      
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const contactTop = rect.top; // Distance from top of viewport in pixels
        
        // Start fading when contact section is 800px from top of viewport
        // Fully transparent when contact section reaches top of viewport
        const fadeStartDistance = 800;
        const fadeEndDistance = 0;
        
        if (contactTop > fadeStartDistance) {
          // Contact section is far below - full opacity
          setSvgOpacity(0.05);
        } else if (contactTop > fadeEndDistance) {
          // Contact section is approaching - fade out
          const fadeRange = fadeStartDistance - fadeEndDistance;
          const fadeProgress = (fadeStartDistance - contactTop) / fadeRange; // 0 to 1
          const newOpacity = 0.05 * (1 - fadeProgress);
          setSvgOpacity(Math.max(0, newOpacity));
        } else {
          // Contact section is at or above viewport top - fully transparent
          setSvgOpacity(0);
        }
      } else {
        // Fallback: use scroll percentage
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = Math.max(0, documentHeight - viewportHeight);
        
        if (maxScroll > 0) {
          const scrollPercent = (scrollTop / maxScroll) * 100;
          if (scrollPercent < 50) {
            setSvgOpacity(0.05);
          } else if (scrollPercent >= 50 && scrollPercent <= 85) {
            const fadeProgress = (scrollPercent - 50) / 35;
            setSvgOpacity(0.05 * (1 - fadeProgress));
          } else {
            setSvgOpacity(0);
          }
        } else {
          setSvgOpacity(0.05);
        }
      }
    };

    // Update on mount and resize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updateMaxHeight();
      updateOpacity();
    }, 100);
    
    const handleResize = () => {
      updateMaxHeight();
      updateOpacity();
    };
    
    // Use requestAnimationFrame for scroll to avoid performance issues
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateMaxHeight();
        updateOpacity();
      });
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      const existingStyle = document.head.querySelector('#vibrant-svg-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Parse maxHeight to get numeric value for calculations
  const maxHeightValue = maxHeight.includes('px') 
    ? parseFloat(maxHeight.replace('px', '')) 
    : window.innerHeight;

  return (
    <motion.div 
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none z-0" 
      style={{ 
        height: `${maxHeightValue}px`,
        maxHeight: `${maxHeightValue}px`,
        overflow: 'hidden',
        willChange: 'transform, height, opacity',
        y: parallaxY
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {svgContent ? (
        <div 
          className="block w-full"
          style={{ 
            height: '100%',
            maxWidth: '100vw',
            opacity: svgOpacity,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{
              height: '100%',
              width: '100%'
            }}
          />
        </div>
      ) : (
        <div className="block w-full h-full" style={{ opacity: svgOpacity }} />
      )}
    </motion.div>
  );
}

export default function VibrantTheme({ data, onSwitchVibe }: VibrantThemeProps) {
  return (
    <div 
      className="relative min-h-screen w-full" 
      data-name="Vibrant" 
              style={{ 
                backgroundImage: "linear-gradient(to bottom, #3A4894 0%, #47A0A0 48%, #8FBBB2 63%, #8C83B2 85%)",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
    >
      {/* Vibrant background SVG - aligned to top and centered, scales with screen size */}
      <VibrantBackgroundSVG />
      
      {/* Scroll-linked decorative path */}
      <ScrollLinkedPath />
      
      <Group1 />
      <Component />
      <div className="absolute flex h-[540px] items-center justify-center right-[2px] top-0 w-[933px]">
        <div className="flex-none rotate-[180deg]">
          <Component />
        </div>
      </div>
      
      {/* Sections with SVG background (Hero, About, Work) */}
      <div className="relative" id="svg-container">
        {/* Hero Section */}
        <div id="home" className="relative w-full min-h-screen flex items-center justify-center">
          <div className="relative w-full max-w-[1440px] mx-auto px-[96px] pt-[48px] pb-[96px]">
            {/* Navigation Menu - Left side, sticky to stay visible */}
            <div className="fixed left-[75px] top-1/2 transform -translate-y-1/2 z-50">
              <Frame28 navItems={data.navigation.items} />
            </div>
            
            {/* Header with Switch Vibe Button - matching Focused theme positioning */}
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full mb-[64px]">
              <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0"></div>
              <div className="basis-0 content-stretch flex flex-col grow items-end min-h-px min-w-px relative shrink-0" style={{ marginRight: '120px', marginTop: '-20px' }}>
                <Frame5 switchVibeLabel={data.navigation.switchVibeButton.label} onSwitchVibe={onSwitchVibe} />
              </div>
            </div>
            
            {/* Hero Content - Center */}
            <div className="flex flex-col items-center justify-center w-full" style={{ marginTop: '40px' }}>
              <Frame25 />
            </div>
          </div>
        </div>
        {/* Other sections */}
        <div className="relative w-full px-[96px] pb-[80px]" style={{ paddingTop: '360px' }}>
          <div className="max-w-[890px] mx-auto flex flex-col" style={{ gap: '360px' }}>
            <div id="about">
              <Frame12 bio={data.hero.bio} />
            </div>
            <div className="content-stretch flex flex-col gap-[360px] items-start relative shrink-0 w-full">
              <div id="projects-section">
                <Frame20 projects={data.projects} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact section - SVG background stops before this */}
      <div id="contact" className="relative z-10 w-full px-[96px] pb-[200px]" style={{ marginTop: '310px' }}>
        <div className="max-w-[890px] mx-auto">
          <Frame13 social={data.social} />
        </div>
      </div>
    </div>
  );
}
