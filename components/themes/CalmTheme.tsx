'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PortfolioData } from '@/lib/data';
import { Sparkles, Mail, Linkedin as LinkedinIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePersonalization } from '@/lib/context/personalization-context';

interface CalmThemeProps {
  data: PortfolioData;
  onSwitchVibe: () => void;
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Component10Vector({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[470.953px] relative shrink-0 w-[845.001px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 845.001 470.953">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

type Text2Props = {
  text: string;
  badge: 'Case study' | 'Showcase';
};

function Text2({ text, badge }: Text2Props) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-heading font-normal leading-[30px] not-italic relative shrink-0 text-[#0f172a] text-[24px] text-nowrap tracking-[-0.4px]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>{text}</p>
      <BadgeText text={badge} />
    </div>
  );
}

type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full">
      <p className="basis-0 font-[var(--font-body)] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#4b5563] text-[14px]">{text}</p>
    </div>
  );
}

type TextProps = {
  text: string;
  badge: 'Case study' | 'Showcase';
};

function Text({ text, badge }: TextProps) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-heading font-normal leading-[30px] not-italic relative shrink-0 text-[#0f172a] text-[24px] text-nowrap tracking-[-0.4px]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>{text}</p>
      <BadgeText text={badge} />
    </div>
  );
}

type BadgeTextProps = {
  text: string;
};

function BadgeText({ text }: BadgeTextProps) {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] items-center justify-center px-[4px] py-[2px] relative rounded-[6px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
      <p className="font-[var(--font-body)] font-medium leading-[16px] not-italic relative shrink-0 text-[#4b5563] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}

function AnimatedCircle({ 
  initialX, 
  initialY, 
  initialColor, 
  endColor, 
  initialRx, 
  initialRy, 
  endRx, 
  endRy,
  duration = 8,
  delay = 0,
  movementPattern,
  scrollSpeed = 0.5
}: { 
  initialX: number;
  initialY: number;
  initialColor: string;
  endColor: string;
  initialRx: number;
  initialRy: number;
  endRx: number;
  endRy: number;
  duration?: number;
  delay?: number;
  movementPattern?: { x: number[]; y: number[] };
  scrollSpeed?: number;
}) {
  const { scrollY } = useScroll();
  // Transform scroll to move circles down (positive direction) when scrolling down
  const scrollYTransformed = useTransform(scrollY, [0, 3000], [0, 3000 * scrollSpeed]);
  const defaultPattern = { x: [0, 60, -40, 50, 0], y: [0, -80, 40, -60, 0] };
  const pattern = movementPattern || defaultPattern;
  
  // Circles move down (positive Y) when scrolling down
  const yTransform = useTransform(scrollYTransformed, (scroll) => scroll);
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${initialX}px`,
        top: `${initialY}px`,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          x: pattern.x,
        }}
        style={{
          y: yTransform,
          willChange: 'transform',
        }}
        transition={{
          x: {
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }
        }}
      >
        <motion.div
          animate={{
            y: pattern.y,
          }}
          style={{
            willChange: 'transform',
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        >
          <motion.div
            animate={{
              backgroundColor: [initialColor, endColor, initialColor],
              scaleX: [1, (endRx / initialRx), 1],
              scaleY: [1, (endRy / initialRy), 1],
              borderRadius: ['50%', '45%', '50%'],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
            style={{
              width: `${initialRx * 2}px`,
              height: `${initialRy * 2}px`,
              filter: 'blur(60px)',
              willChange: 'transform, background-color',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Component({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} data-name="Component 6" style={style}>
      {/* Pink circle - morphing from #FEEAE6 80% to #F9D8D1 80% */}
      <AnimatedCircle
        initialX={-206}
        initialY={-55}
        initialColor="rgba(254, 234, 230, 0.8)"
        endColor="rgba(249, 216, 209, 0.8)"
        initialRx={283}
        initialRy={259.5}
        endRx={400}
        endRy={350}
        duration={10}
        delay={0}
        movementPattern={{ x: [0, 200, -150, 180, 0], y: [0, -150, 120, -140, 0] }}
        scrollSpeed={0.8}
      />
      
      {/* Blue circle - morphing from #3F94E9 30% to #3580CB 30% */}
      <AnimatedCircle
        initialX={765}
        initialY={-83}
        initialColor="rgba(63, 148, 233, 0.3)"
        endColor="rgba(53, 128, 203, 0.3)"
        initialRx={424}
        initialRy={168.5}
        endRx={550}
        endRy={250}
        duration={12}
        delay={1}
        movementPattern={{ x: [0, -180, 220, -150, 0], y: [0, 150, -200, 160, 0] }}
        scrollSpeed={1.0}
      />
      
      {/* Light blue circle - morphing from #E7F4FF 20% to #CADDEB 40% */}
      <AnimatedCircle
        initialX={274}
        initialY={-226}
        initialColor="rgba(231, 244, 255, 0.2)"
        endColor="rgba(202, 221, 235, 0.4)"
        initialRx={457.5}
        initialRy={268}
        endRx={600}
        endRy={400}
        duration={14}
        delay={2}
        movementPattern={{ x: [0, 250, -200, 180, 0], y: [0, -180, 220, -150, 0] }}
        scrollSpeed={0.9}
      />
    </div>
  );
}

function Component1({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} data-name="Component 10" style={{ overflow: 'visible', ...style }}>
      <Component className="absolute inset-0" style={{ overflow: 'visible' }} />
    </div>
  );
}

function Button({ label, isActive }: { label: string; isActive?: boolean }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (label === 'Work') {
      e.preventDefault();
      e.stopPropagation();
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
          projectsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // Adjust scroll position to be a bit higher
          setTimeout(() => {
            window.scrollBy({
              top: -150,
              behavior: 'smooth'
            });
          }, 100);
        }
      });
    } else if (label === 'About') {
      e.preventDefault();
      e.stopPropagation();
      // Navigate to adaptive portfolio page with hash
      router.push('/work/adaptive-portfolio#designer-section');
    }
  };

  // For About, handle navigation with router
  if (label === 'About') {
    return (
      <motion.div 
        className="content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer" 
        data-name="Button"
        whileHover={{ scale: 1.05, opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
      >
        <p className={`font-[var(--font-body)] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-nowrap ${isActive ? '[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline' : ''}`}>{label}</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer" 
      data-name="Button"
      whileHover={{ scale: 1.05, opacity: 0.8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <p className={`font-[var(--font-body)] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-nowrap ${isActive ? '[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline' : ''}`}>{label}</p>
    </motion.div>
  );
}

function SparklesIcon() {
  return <Sparkles size={16} style={{ color: '#9E5AF1' }} />;
}

function Button2({ label, onSwitchVibe }: { label: string; onSwitchVibe: () => void }) {
  return (
    <motion.div 
      className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0 cursor-pointer" 
      data-name="Button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onSwitchVibe}
    >
      <SparklesIcon />
      <p className="font-[var(--font-body)] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap" style={{ color: '#9E5AF1' }}>{label}</p>
    </motion.div>
  );
}

function Frame7({ navItems, switchVibeLabel, onSwitchVibe }: { navItems: Array<{ label: string }>; switchVibeLabel: string; onSwitchVibe: () => void }) {
  return (
    <motion.div 
      className="content-stretch flex gap-[26px] items-center relative shrink-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {navItems.map((item, index) => (
        <Button key={index} label={item.label} isActive={index === 0} />
      ))}
      <Button2 label={switchVibeLabel} onSwitchVibe={onSwitchVibe} />
    </motion.div>
  );
}

function Frame5() {
  return (
    <motion.div 
      className="w-full"
      style={{ marginTop: '-90px', marginLeft: '-20px', transform: 'scale(1.2)' }}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 1.5, 
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 50,
        damping: 15
      }}
    >
      <Image 
        src="/images/calm_hero.svg" 
        alt="Hero" 
        width={1200}
        height={600}
        className="w-full h-auto"
        priority
      />
    </motion.div>
  );
}

function Frame6({ hero }: { hero: PortfolioData['hero'] }) {
  return (
    <div className="w-full relative shrink-0">
      <Frame5 />
    </div>
  );
}

function Envelope() {
  return <Mail size={16} className="text-white" />;
}

function Button3() {
  return (
    <motion.a 
      href="mailto:jenny8880@gmail.com"
      className="bg-[rgba(44,57,146,0.3)] content-stretch flex items-center justify-center relative rounded-[8px] shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] shrink-0 size-[36px] cursor-pointer" 
      data-name="Button"
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(44,57,146,0.4)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Envelope />
    </motion.a>
  );
}

function Linkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function Button4() {
  return (
    <motion.a 
      href="https://www.linkedin.com/in/jenny-vainshtein-a30b0362/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(44,57,146,0.3)] content-stretch flex items-center justify-center relative rounded-[8px] shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] shrink-0 size-[36px] cursor-pointer" 
      data-name="Button"
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(44,57,146,0.4)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Linkedin />
    </motion.a>
  );
}

function Frame4() {
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] items-center relative shrink-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <Button3 />
      <Button4 />
    </motion.div>
  );
}

function Frame24({ hero }: { hero: PortfolioData['hero'] }) {
  return (
    <div className="w-[940px] flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame6 hero={hero} />
      <Frame4 />
    </div>
  );
}

function ProjectCard({ project }: { project: PortfolioData['projects'][0] }) {
  // Determine image dimensions based on project
  const getImageDimensions = () => {
    if (project.id === 'philips') {
      return { height: '228px', width: '334px' };
    } else if (project.id === 'selected-work') {
      return { height: '224px', width: '318px' };
    }
    return { height: '246px', width: '360px' };
  };
  
  // Get the detail page URL for projects with contentImages
  const getProjectUrl = () => {
    if (project.id === 'kemtai') return '/work/kemtai';
    if (project.id === 'philips') return '/work/medical';
    if (project.id === 'adaptive-portfolio') return '/work/adaptive-portfolio';
    return '#'; // No detail page for other projects
  };
  
  const imageDims = getImageDimensions();
  const projectUrl = getProjectUrl();
  const hasDetailPage = project.id === 'kemtai' || project.id === 'philips' || project.id === 'adaptive-portfolio';
  
  const cardContent = (
    <motion.div 
      className="bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col items-start pb-[28px] pt-[12px] px-[12px] relative rounded-[16px] shrink-0 w-[460px] cursor-pointer"
      whileHover={{ y: -4, boxShadow: '0px 4px 20px 0px rgba(133,116,180,0.15)' }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <motion.div 
          className="content-stretch flex flex-col h-[310px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full"
          style={{ backgroundColor: project.imageBackgroundColor }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`relative shrink-0`} style={{ height: imageDims.height, width: imageDims.width }} data-name={`image ${project.id}`}>
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={project.image} />
          </div>
        </motion.div>
        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="content-stretch flex flex-col items-start px-[8px] py-[12px] relative w-full">
              <Text text={project.title} badge={project.badge} />
              <Text1 text={project.description} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  if (hasDetailPage) {
    return (
      <Link href={projectUrl} className="block w-full">
        {cardContent}
      </Link>
    );
  }
  
  return cardContent;
}

function Frame20({ projects }: { projects: PortfolioData['projects'] }) {
  // Split projects into two columns
  const leftColumn = projects.slice(0, 2);
  const rightColumn = projects.slice(2);
  
  return (
    <div id="projects-section" className="content-stretch flex gap-[32px] items-center relative shrink-0" style={{ marginTop: '60px' }}>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
        {leftColumn.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
        {rightColumn.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Frame21({ hero, projects }: { hero: PortfolioData['hero']; projects: PortfolioData['projects'] }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center px-[208px] py-0 relative w-full">
          <Frame24 hero={hero} />
          <Frame20 projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Frame25({ data, onSwitchVibe }: { data: PortfolioData; onSwitchVibe: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-end pb-[128px] pt-[44px] px-[36px] relative w-full min-h-screen">
          <Frame7 navItems={data.navigation.items} switchVibeLabel={data.navigation.switchVibeButton.label} onSwitchVibe={onSwitchVibe} />
          <Frame21 hero={data.hero} projects={data.projects} />
        </div>
      </div>
    </div>
  );
}

export default function CalmTheme({ data, onSwitchVibe }: CalmThemeProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative min-h-screen w-full" data-name="Calm" style={{ 
      overflowX: 'hidden', 
      overflowY: 'visible',
      background: 'linear-gradient(to bottom, #E6E9FA 0%, #F6F6F8 55%, #F9F9FB 100%)'
    }}>
      <Component1 className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ minHeight: '100vh', overflow: 'visible', willChange: 'transform' }} />
      <Frame25 data={data} onSwitchVibe={onSwitchVibe} />
    </div>
  );
}

