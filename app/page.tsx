'use client';

import { useState } from 'react';
import Onboarding from '../components/Onboarding';
import CalmTheme from '../components/themes/CalmTheme';
import FocusedTheme from '../components/themes/FocusedTheme';
import VibrantTheme from '../components/themes/VibrantTheme';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Home() {
  // State to track if we should show the Onboarding or the Main Site
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // State to track which Theme is active (calm, focused, or vibrant)
  const [currentTheme, setCurrentTheme] = useState<'calm' | 'focused' | 'vibrant'>('calm');

  // If Onboarding is still active, show ONLY that
  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  // Otherwise, show the Portfolio with the selected Theme
  return (
    <main className="relative min-h-screen transition-colors duration-500">
      
      {/* 1. The Background Animation */}
      <AnimatedBackground theme={currentTheme} />

      {/* 2. The Theme Switcher (Floating Menu) */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
        <button 
          onClick={() => setCurrentTheme('calm')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentTheme === 'calm' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-black'
          }`}
        >
          Calm
        </button>
        <button 
          onClick={() => setCurrentTheme('focused')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentTheme === 'focused' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'
          }`}
        >
          Focused
        </button>
        <button 
          onClick={() => setCurrentTheme('vibrant')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentTheme === 'vibrant' ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg' : 'text-gray-500 hover:text-black'
          }`}
        >
          Vibrant
        </button>
      </div>

      {/* 3. The Actual Content (Swaps based on theme) */}
      <div className="relative z-10">
        {currentTheme === 'calm' && <CalmTheme />}
        {currentTheme === 'focused' && <FocusedTheme />}
        {currentTheme === 'vibrant' && <VibrantTheme />}
      </div>

    </main>
  );
}