'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CalmTheme from '@/components/themes/CalmTheme';
import FocusedTheme from '@/components/themes/FocusedTheme';
import VibrantTheme from '@/components/themes/VibrantTheme';
import Onboarding from '@/components/Onboarding';
import { portfolioData } from '@/lib/data';
import { usePersonalization } from '@/lib/context/personalization-context';

type ThemeId = 'calm' | 'focused' | 'vibrant';

export default function Page() {
  const { theme, hasCompletedOnboarding, switchTheme, completeOnboarding } = usePersonalization();
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('hasCompletedOnboarding');
      return completed !== 'true' && !hasCompletedOnboarding;
    }
    return !hasCompletedOnboarding;
  });
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(theme as ThemeId);

  // Sync currentTheme with context theme
  useEffect(() => {
    setCurrentTheme(theme as ThemeId);
  }, [theme]);

  const handleOnboardingComplete = (selectedTheme: ThemeId) => {
    switchTheme(selectedTheme);
    setCurrentTheme(selectedTheme);
    completeOnboarding();
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    switchTheme('calm');
    setCurrentTheme('calm');
    completeOnboarding();
    setShowOnboarding(false);
  };

  const renderTheme = () => {
    switch (currentTheme) {
      case 'focused':
        return <FocusedTheme key="focused" data={portfolioData} />;
      case 'vibrant':
        return <VibrantTheme key="vibrant" data={portfolioData} />;
      default:
        return <CalmTheme key="calm" data={portfolioData} />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showOnboarding ? (
          <Onboarding
            key="onboarding"
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        ) : (
          <motion.div
            key="theme"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {renderTheme()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
