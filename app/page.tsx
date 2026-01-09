'use client';

import { useState } from 'react';
import Onboarding from '../components/Onboarding';
import CalmTheme from '../components/themes/CalmTheme';
import FocusedTheme from '../components/themes/FocusedTheme';
import VibrantTheme from '../components/themes/VibrantTheme';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<'calm' | 'focused' | 'vibrant'>('calm');

  // FIX: Added the missing onSkip prop here!
  if (showOnboarding) {
    return (
      <Onboarding 
        onComplete={() => setShowOnboarding(false)} 
        onSkip={() => setShowOnboarding(false)}
      />
    );
  }

  return (
    <main className="relative min-h-screen transition-colors duration-500">
      <AnimatedBackground theme={currentTheme} />

      <div className="fixed top-6 right-6 z-50 flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
        <button onClick={() => setCurrentTheme('calm')} className="px-4 py-2 rounded-full text-sm font-medium bg-white/80 hover:bg-white transition">Calm</button>
        <button onClick={() => setCurrentTheme('focused')} className="px-4 py-2 rounded-full text-sm font-medium bg-black/80 text-white hover:bg-black transition">Focused</button>
        <button onClick={() => setCurrentTheme('vibrant')} className="px-4 py-2 rounded-full text-sm font-medium bg-purple-600/80 text-white hover:bg-purple-600 transition">Vibrant</button>
      </div>

      <div className="relative z-10">
        {currentTheme === 'calm' && <CalmTheme />}
        {currentTheme === 'focused' && <FocusedTheme />}
        {currentTheme === 'vibrant' && <VibrantTheme />}
      </div>
    </main>
  );
}