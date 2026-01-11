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

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('calm');

  // Check if user is coming from a project detail page (has hash) or has completed onboarding before
  useEffect(() => {
    // Check localStorage for onboarding completion
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
    
    // Check if URL has hash (coming from project detail page)
    const hasHash = typeof window !== 'undefined' && window.location.hash === '#projects-section';
    
    if (hasCompletedOnboarding || hasHash) {
      setShowOnboarding(false);
      
      // If coming from hash, scroll to projects section after a brief delay
      if (hasHash) {
        setTimeout(() => {
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
        }, 100);
      }
    }
  }, []);

  // Cycle through themes: calm -> vibrant -> focused -> calm
  const cycleTheme = () => {
    setCurrentTheme(prev => {
      if (prev === 'calm') return 'vibrant';
      if (prev === 'vibrant') return 'focused';
      return 'calm';
    });
  };

  // Handle onboarding completion with theme selection
  const handleOnboardingComplete = (theme: ThemeId) => {
    setCurrentTheme(theme);
    setShowOnboarding(false);
    // Store completion in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
    }
  };

  if (showOnboarding) {
    return (
      <Onboarding 
        onComplete={handleOnboardingComplete} 
        onSkip={() => handleOnboardingComplete('calm')}
      />
    );
  }

  return (
    <main className="relative min-h-screen transition-colors duration-500">
      <AnimatedBackground theme={currentTheme} />

      <div className="relative z-10">
        {/* 2. FEED THE DATA TO THE THEMES */}
        {currentTheme === 'calm' && <CalmTheme data={portfolioData} onSwitchVibe={cycleTheme} />}
        {currentTheme === 'focused' && <FocusedTheme data={portfolioData} onSwitchVibe={cycleTheme} />}
        {currentTheme === 'vibrant' && <VibrantTheme data={portfolioData} onSwitchVibe={cycleTheme} />}
      </div>
    </main>
  );
}