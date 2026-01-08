'use client';

import React from 'react';
import Link from 'next/link';
import { PortfolioData } from '@/lib/data';
import { Sparkles, Mail, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePersonalization } from '@/lib/context/personalization-context';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface FocusedThemeProps {
  data: PortfolioData;
}

// Helper component for badge
function Badge({ text }: { text: string }) {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex gap-[4px] items-center justify-center left-[13px] px-[4px] py-[2px] rounded-[6px] top-[14px]">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
      <p className="font-[var(--font-body)] font-medium leading-[16px] not-italic relative shrink-0 text-[#4b5563] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}

// Navigation header
function Frame28({ name, switchVibeLabel }: { name: string; switchVibeLabel: string }) {
  const { theme, switchTheme } = usePersonalization();
  
  const handleClick = () => {
    // Cycle through all themes: focused -> vibrant -> calm -> focused
    if (theme === 'focused') {
      switchTheme('vibrant');
    } else if (theme === 'vibrant') {
      switchTheme('calm');
    } else {
      switchTheme('focused');
    }
  };
  
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
        <motion.p 
          className="font-body font-medium leading-[26px] not-italic relative shrink-0 text-[#C99C6F] text-[16px] text-nowrap tracking-[5px]" 
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {name.toUpperCase()} | PRODUCT DESIGNER
        </motion.p>
      </div>
      <div className="basis-0 content-stretch flex flex-col grow items-end min-h-px min-w-px relative shrink-0">
        <motion.div 
          className="content-stretch flex gap-[6px] h-[52px] items-center justify-center px-[24px] py-[14px] relative rounded-[8px] shrink-0 cursor-pointer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          onClick={handleClick}
        >
          <Sparkles size={20} className="text-white" />
          <p className="font-body font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontFamily: 'var(--font-body)' }}>{switchVibeLabel}</p>
        </motion.div>
      </div>
    </div>
  );
}

// Hero section
function Frame27({ bio }: { bio: PortfolioData['hero']['bio'] }) {
  // Extract the main statement from bio text
  // For Focused theme, we'll use a transformed version of the bio
  const words = bio.text.split(' ');
  const highlightedWords = bio.highlightedWords.map(w => w.toLowerCase());
  
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <div className="content-stretch flex flex-col items-start relative shrink-0">
        <motion.p 
          className="font-light leading-[152px] not-italic relative shrink-0 text-[136px] tracking-[-8px] w-[992px]" 
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.span 
            style={{ color: 'rgba(225, 225, 225, 0.9)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Crafting digital
          </motion.span>
        </motion.p>
        <motion.p 
          className="font-light leading-[152px] not-italic relative shrink-0 text-[136px] tracking-[-8px] w-[992px]" 
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <motion.span 
            style={{ color: 'rgba(225, 225, 225, 0.9)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            experiences that
          </motion.span>
        </motion.p>
        <motion.p 
          className="font-light leading-[152px] not-italic relative shrink-0 text-[136px] tracking-[-8px] w-[992px]" 
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.span 
            className="text-[#C99C6F]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
            matter
          </motion.span>
        </motion.p>
      </div>
      <motion.div 
        className="content-stretch flex items-center justify-center relative shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      >
        <p className="font-light not-italic relative shrink-0 text-[#e5e7eb] text-[24px]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}>
          {bio.text}
        </p>
      </motion.div>
    </div>
  );
}

// View work button
function Button1() {
  const handleClick = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      setTimeout(() => {
        window.scrollBy({
          top: -150,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <motion.div 
      className="content-stretch flex gap-[8px] items-center justify-center px-[28px] py-[20px] relative shrink-0 cursor-pointer overflow-hidden group"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
      onClick={handleClick}
    >
      <div aria-hidden="true" className="absolute border border-[#C99C6F] border-solid inset-0 pointer-events-none z-10" />
      <motion.div
        className="absolute inset-0 bg-[#C99C6F]"
        initial={{ x: '-100%' }}
        variants={{
          initial: { x: '-100%' },
          hover: { x: '0%' }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.p 
        className="font-normal leading-[24px] not-italic relative shrink-0 text-[20px] text-nowrap z-10 text-[#C99C6F]" 
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
        variants={{
          initial: { color: '#C99C6F' },
          hover: { color: '#000000' }
        }}
        transition={{ duration: 0.3 }}
      >
        VIEW WORK
      </motion.p>
      <motion.svg 
        className="relative shrink-0 size-[24px] self-center z-10" 
        fill="none" 
        viewBox="0 0 32 32"
        animate={{
          x: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.path 
          clipRule="evenodd" 
          d="M16 4L26 14L16 24M26 14H6" 
          stroke="#C99C6F"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fillRule="evenodd"
          variants={{
            initial: { stroke: '#C99C6F' },
            hover: { stroke: '#000000' }
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
}

// Project card component
function ProjectCard({ project, isLarge = false }: { project: PortfolioData['projects'][0]; isLarge?: boolean }) {
  // Use focused image if available, otherwise fall back to regular image
  const imageSrc = project.imageFocused || project.image;
  
  const largeCard = (
    <motion.div
      className="bg-[#1c222f] h-[336px] overflow-hidden relative w-full cursor-pointer"
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0px 8px 30px 0px rgba(0,0,0,0.4)' }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.img 
        alt={project.title} 
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
        src={imageSrc}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <Badge text={project.badge} />
      <motion.div 
        className="absolute flex flex-col items-start left-[24px] right-[24px] z-10" 
        style={{ bottom: '40px' }}
        initial={{ opacity: 1 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.p 
          className="font-inter font-medium leading-[1.5] not-italic relative shrink-0 text-[20px] text-nowrap text-white" 
          style={{ fontFamily: 'var(--font-inter)' }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.p>
        <p className="basis-0 font-inter font-normal grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-white text-[14px]" style={{ fontFamily: 'var(--font-inter)' }}>{project.description}</p>
      </motion.div>
    </motion.div>
  );

  const regularCard = (
    <motion.div
      className="bg-[#1c222f] h-[280px] overflow-hidden relative w-full cursor-pointer"
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0px 8px 30px 0px rgba(0,0,0,0.4)' }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.img 
        alt={project.title} 
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
        src={imageSrc}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <Badge text={project.badge} />
      <motion.div 
        className="absolute flex flex-col items-start left-[24px] right-[24px] z-10" 
        style={{ bottom: '40px' }}
        initial={{ opacity: 1 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.p 
          className="font-inter font-medium leading-[1.5] not-italic relative shrink-0 text-[20px] text-nowrap text-white" 
          style={{ fontFamily: 'var(--font-inter)' }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.p>
        <p className="basis-0 font-inter font-normal grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-white text-[14px]" style={{ fontFamily: 'var(--font-inter)' }}>{project.description}</p>
      </motion.div>
    </motion.div>
  );

  const cardContent = isLarge ? largeCard : regularCard;

  // Wrap with Link if it's a linkable project
  if (project.id === 'philips') {
    return (
      <Link href="/work/medical" className="block w-full">
        {cardContent}
      </Link>
    );
  }

  if (project.id === 'kemtai') {
    return (
      <Link href="/work/kemtai" className="block w-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// Projects grid
function Frame20({ projects }: { projects: PortfolioData['projects'] }) {
  return (
    <div id="projects-section" className="flex flex-col gap-[24px] items-start relative shrink-0 w-full max-w-[990px] mx-auto mt-[40px]">
      {/* First row - large card (full width) */}
      <motion.div
        className="flex items-center relative shrink-0 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        <ProjectCard project={projects[0]} isLarge={true} />
      </motion.div>
      
      {/* Second row - left column (stacked) and right column (selected work) */}
      <motion.div
        className="flex gap-[24px] items-start relative shrink-0 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      >
        {/* Left column - two cards stacked vertically */}
        <div className="flex flex-col gap-[24px] items-start relative shrink-0 flex-1">
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>
        
        {/* Right column - selected work card */}
        {projects[3] && (
          <motion.div 
            className="bg-[#1c222f] h-[584px] overflow-hidden relative w-[429px] cursor-pointer"
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0px 8px 30px 0px rgba(0,0,0,0.4)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.img 
              alt={projects[3].title} 
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
              src={projects[3].imageFocused || projects[3].image}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <Badge text={projects[3].badge} />
            <motion.div 
              className="absolute bottom-[40px] flex flex-col items-start left-[24px] right-[24px] z-10"
              initial={{ opacity: 1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.p 
                className="font-inter font-medium leading-[1.5] not-italic relative shrink-0 text-[20px] text-nowrap text-white" 
                style={{ fontFamily: 'var(--font-inter)' }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                {projects[3].title}
              </motion.p>
              <p className="basis-0 font-inter font-normal grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-white text-[14px]" style={{ fontFamily: 'var(--font-inter)' }}>{projects[3].description}</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Social icons
function Frame30({ social }: { social: PortfolioData['social'] }) {
  return (
    <div className="content-stretch flex gap-[31px] items-start relative shrink-0">
      <motion.a
        href={social.email.url}
        className="content-stretch flex items-center justify-center relative shrink-0 size-[48px] cursor-pointer border border-[#c99c6f]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Mail size={24} className="text-[#c99c6f]" />
      </motion.a>
      <motion.a
        href={social.linkedin.url}
        className="content-stretch flex items-center justify-center relative shrink-0 size-[48px] cursor-pointer border border-[#c99c6f]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Linkedin size={24} className="text-[#c99c6f]" fill="#c99c6f" strokeWidth={0} />
      </motion.a>
    </div>
  );
}

export default function FocusedTheme({ data }: FocusedThemeProps) {
  return (
    <motion.div 
      className="content-stretch flex items-start justify-center relative w-full min-h-screen overflow-x-hidden" 
      data-name="Focused"
      animate={{
        background: [
          'radial-gradient(ellipse 600px 450px at 295px 300px, rgba(49,39,32,1) 0%, rgba(12,12,12,1) 75%) no-repeat center / 100% 100%',
          'radial-gradient(ellipse 650px 500px at 295px 300px, rgba(49,39,32,1) 0%, rgba(12,12,12,1) 75%) no-repeat center / 100% 100%',
          'radial-gradient(ellipse 600px 450px at 295px 300px, rgba(49,39,32,1) 0%, rgba(12,12,12,1) 75%) no-repeat center / 100% 100%',
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <AnimatedBackground />
      <div className="content-stretch flex flex-col gap-[96px] items-center pb-[96px] pt-[48px] px-[96px] relative shrink-0 w-full max-w-[1440px] z-10">
        {/* Main content */}
        <div className="relative shrink-0 w-full">
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[112px] items-center px-[128px] py-0 relative w-full">
              {/* Header and Hero */}
              <motion.div 
                className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Frame28 name={data.hero.name} switchVibeLabel={data.navigation.switchVibeButton.label} />
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
                  <Frame27 bio={data.hero.bio} />
                  <Button1 />
                </div>
              </motion.div>
              
              {/* Projects */}
              <Frame20 projects={data.projects} />
            </div>
          </div>
        </div>
        
        {/* Social icons */}
        <motion.div
          className="mt-[40px] mb-[40px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Frame30 social={data.social} />
        </motion.div>
      </div>
    </motion.div>
  );
}

