'use client';

import { useState } from 'react';
// 1. IMPORT THE DATA (The Bread)
import { portfolioData } from '@/lib/data'; 
import Onboarding from '../components/Onboarding';
import CalmTheme from '../components/themes/CalmTheme';
import FocusedTheme from '../components/themes/FocusedTheme';
import VibrantTheme from '../components/themes/VibrantTheme';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<'calm' | 'focused' | 'vibrant'>('calm');

  // Cycle through themes: calm -> vibrant -> focused -> calm
  const cycleTheme = () => {
    setCurrentTheme(prev => {
      if (prev === 'calm') return 'vibrant';
      if (prev === 'vibrant') return 'focused';
      return 'calm';
    });
  };

  // Handle onboarding completion with theme selection
  const handleOnboardingComplete = (theme: 'calm' | 'focused' | 'vibrant') => {
    setCurrentTheme(theme);
    setShowOnboarding(false);
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