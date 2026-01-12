'use client';

import { useState, useEffect } from 'react';
// 1. IMPORT THE DATA (The Bread)
import { portfolioData } from '@/lib/data'; 
import { type ThemeId } from '@/lib/context/personalization-context';
import Onboarding from '../components/Onboarding';
import CalmTheme from '../components/themes/CalmTheme';
import FocusedTheme from '../components/themes/FocusedTheme';
import VibrantTheme from '../components/themes/VibrantTheme';
import AnimatedBackground from '../components/AnimatedBackground';
import MobileBlock from '../components/MobileBlock';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  // Initialize theme - always start with 'calm' to avoid hydration mismatch
  // Will be updated from localStorage in useEffect
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('calm');

  // Initialize theme from localStorage and check hash navigation
  useEffect(() => {
    // Restore theme from localStorage if available
    const savedTheme = localStorage.getItem('currentTheme') as ThemeId;
    if (savedTheme && ['calm', 'focused', 'vibrant'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }

    // Check if URL has hash (coming from project detail page)
    const hash = window.location.hash;
    const hasProjectsHash = hash === '#projects-section' || hash === '#work';
    
    if (hasProjectsHash) {
      setShowOnboarding(false);
      
      // Scroll to projects section after a brief delay
      setTimeout(() => {
        // Try projects-section first, then work as fallback
        const projectsSection = document.getElementById('projects-section') || document.getElementById('work');
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
      }, 100);
    }
  }, []);

  // Cycle through themes: calm -> vibrant -> focused -> calm
  const cycleTheme = () => {
    setCurrentTheme(prev => {
      let nextTheme: ThemeId;
      if (prev === 'calm') nextTheme = 'vibrant';
      else if (prev === 'vibrant') nextTheme = 'focused';
      else nextTheme = 'calm';
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentTheme', nextTheme);
      }
      
      return nextTheme;
    });
  };

  // Handle onboarding completion with theme selection
  const handleOnboardingComplete = (theme: ThemeId) => {
    setCurrentTheme(theme);
    setShowOnboarding(false);
    // Store completion and theme in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('currentTheme', theme);
    }
  };

  if (showOnboarding) {
    return (
      <>
        <MobileBlock />
        <Onboarding 
          onComplete={handleOnboardingComplete} 
          onSkip={() => handleOnboardingComplete('calm')}
        />
      </>
    );
  }

  return (
    <>
      <MobileBlock />
      <main className="relative min-h-screen transition-colors duration-500">
        <AnimatedBackground theme={currentTheme} />

        <div className="relative z-10">
          {/* 2. FEED THE DATA TO THE THEMES */}
          {currentTheme === 'calm' && <CalmTheme data={portfolioData} onSwitchVibe={cycleTheme} />}
          {currentTheme === 'focused' && <FocusedTheme data={portfolioData} onSwitchVibe={cycleTheme} />}
          {currentTheme === 'vibrant' && <VibrantTheme data={portfolioData} onSwitchVibe={cycleTheme} />}
        </div>
      </main>
    </>
  );
}