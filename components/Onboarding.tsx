'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeId } from '@/lib/context/personalization-context';

// Animated dots component for ellipsis
function AnimatedDots() {
  return (
    <span className="inline-block">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

// Animated background circles from Calm theme
const AnimatedCircle = ({ 
  color, 
  size, 
  left, 
  top, 
  scrollSpeed 
}: { 
  color: string; 
  size: number; 
  left: string; 
  top: string; 
  scrollSpeed: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        width: size,
        height: size,
        background: color,
        left,
        top,
        filter: 'blur(60px)',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
      animate={{
        scaleX: [1, 1.2, 1],
        scaleY: [1, 1.1, 1],
        y: [0, -30, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const Component = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ overflowY: 'visible' }}>
      <AnimatedCircle 
        color="#F0A5C9" 
        size={400} 
        left="10%" 
        top="20%" 
        scrollSpeed={0.8}
      />
      <AnimatedCircle 
        color="#A5C9F0" 
        size={350} 
        left="70%" 
        top="60%" 
        scrollSpeed={1.0}
      />
      <AnimatedCircle 
        color="#C9F0A5" 
        size={300} 
        left="40%" 
        top="80%" 
        scrollSpeed={0.9}
      />
    </div>
  );
};

const Component1 = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ overflowY: 'visible' }}>
      <AnimatedCircle 
        color="#E8D5F0" 
        size={380} 
        left="20%" 
        top="30%" 
        scrollSpeed={0.85}
      />
      <AnimatedCircle 
        color="#D5F0E8" 
        size={320} 
        left="60%" 
        top="50%" 
        scrollSpeed={0.95}
      />
    </div>
  );
};

interface OnboardingProps {
  onComplete: (theme: ThemeId) => void;
  onSkip: () => void;
}

export default function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'q1' | 'q2' | 'q3'>('intro');
  const [selectedAnswers, setSelectedAnswers] = useState<{
    q1?: string;
    q2?: string;
    q3?: string;
  }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId | null>(null);
  const [isSkipping, setIsSkipping] = useState(false);

  const handleOptionSelect = (question: 'q1' | 'q2' | 'q3', option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [question]: option }));
    
    // Add a small delay to show the selection feedback before transitioning
    setTimeout(() => {
      if (question === 'q1') {
        setCurrentStep('q2');
      } else if (question === 'q2') {
        setCurrentStep('q3');
      } else if (question === 'q3') {
        // Determine theme based on Q3 answer
        const themeMap: Record<string, ThemeId> = {
          'Smooth and calm': 'calm',
          'Energetic and playful': 'vibrant',
          'Sharp and professional': 'focused'
        };
        const theme = themeMap[option] || 'calm';
        setSelectedTheme(theme);
        setIsProcessing(true);
        setCurrentStep('q3'); // Keep on q3 to show processing screen
        
        // Wait 5000ms (5 seconds) before completing
        setTimeout(() => {
          // Call onComplete directly - don't set isProcessing to false
          // This prevents the Q3 screen from showing again
          onComplete(theme);
        }, 5000);
      }
    }, 300); // 300ms delay to show selection
  };

  const handleSkip = () => {
    setIsSkipping(true);
    setIsProcessing(true);
    setSelectedTheme(null);
    setCurrentStep('intro'); // Keep on intro to show processing screen
    
    // Wait 5000ms (5 seconds) before completing skip
    setTimeout(() => {
      onSkip();
    }, 5000);
  };

  const handleBack = () => {
    if (currentStep === 'q3') {
      setCurrentStep('q2');
    } else if (currentStep === 'q2') {
      setCurrentStep('q1');
    } else if (currentStep === 'q1') {
      setCurrentStep('intro');
    }
  };

  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case 'intro': return 0;
      case 'q1': return 1;
      case 'q2': return 2;
      case 'q3': return 3;
      default: return 0;
    }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4 + (i * 0.08),
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ 
        overflowX: 'hidden', 
        overflowY: 'visible',
        background: 'linear-gradient(to bottom, #E6E9FA 0%, #F6F6F8 55%, #F9F9FB 100%)'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isProcessing ? 1 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Component />
      <Component1 />
      
      <motion.div
        layout
        className="relative w-full max-w-[380px] mx-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          layout: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            type: "tween"
          },
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
      >
        <motion.div 
          layout
          className="rounded-[24px] pt-[48px] px-[48px] pb-[40px] bg-white/40 backdrop-blur-md cursor-default overflow-hidden"
          style={{
            boxShadow: '0 8px 32px 0 rgba(2, 16, 31, 0.06)'
          }}
          transition={{
            layout: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isProcessing && (
              <motion.div
                key="processing"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  layout: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  opacity: { duration: 0.3 }
                }}
                className="flex flex-col items-center justify-center py-[60px]"
              >
                {/* Magical Loading Animation */}
                <motion.div
                  className="relative w-[88px] h-[88px] mb-[32px] flex items-center justify-center"
                >
                  {/* Central glowing orb */}
                  <motion.div
                    className="absolute w-[44px] h-[44px] rounded-full bg-gradient-to-br from-sky-400 via-purple-400 to-pink-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                      rotate: [0, 360]
                    }}
                    transition={{
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                    style={{
                      filter: 'blur(8px)',
                      boxShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)'
                    }}
                  />
                  
                  {/* Outer pulsing rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-sky-300/40"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-300/40"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 0, 0.4]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                  />
                  
                </motion.div>
                
                {/* Dynamic Text */}
                <motion.p
                  className="text-center text-sky-800 text-[18px] font-medium mt-[30px]"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {selectedTheme === 'calm' && (
                    <>
                      Clearing the noise
                      <AnimatedDots />
                    </>
                  )}
                  {selectedTheme === 'focused' && (
                    <>
                      Sharpening the details
                      <AnimatedDots />
                    </>
                  )}
                  {selectedTheme === 'vibrant' && (
                    <>
                      Mixing colors & energy
                      <AnimatedDots />
                    </>
                  )}
                  {!selectedTheme && (
                    <>
                      Tailoring your experience
                      <AnimatedDots />
                    </>
                  )}
                </motion.p>
              </motion.div>
            )}
            {currentStep === 'intro' && !isProcessing && (
              <motion.div
                key="intro"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { 
                    duration: 0.3,
                    ease: "easeIn"
                  }
                }}
                transition={{ 
                  layout: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                    type: "tween"
                  },
                  opacity: { duration: 0.3 }
                }}
              >
                <motion.h1
                  className="text-[20px] font-semibold mb-[28px] text-center text-sky-800"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    lineHeight: '1.2'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3,
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  Hey there, I'm Jenny.
                </motion.h1>
                <motion.p
                  className="text-[14px] text-center mb-0 text-gray-600 mt-[14px]"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0px',
                    lineHeight: '1.6'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5,
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  To keep things fresh, I designed three ways to view my work. Let's find the one that might fit you.
                </motion.p>
                <div className="flex flex-col gap-[14px] items-center mt-[32px]">
                  <div className="relative inline-block mt-[16px]">
                    <motion.button
                      onClick={() => setCurrentStep('q1')}
                      className="px-[50px] py-[12px] rounded-[6px] font-medium text-[16px] text-white bg-slate-700 relative z-10"
                      style={{
                        fontFamily: 'Inter, sans-serif'
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: '0 8px 24px rgba(75, 85, 99, 0.4)',
                        y: -1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          mass: 1.2
                        }
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 1.2
                        }
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.7,
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      Find my vibe
                    </motion.button>
                    {/* Bubble animations */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute pointer-events-none"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 5
                        }}
                        initial={{ opacity: 0, y: 0, x: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0, 0.4, 0],
                          y: [0, -40, -60],
                          x: [(i - 1) * 8, (i - 1) * 12, (i - 1) * 18],
                          scale: [0.8, 1.2, 0.5]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 1,
                          ease: "easeOut",
                          repeatDelay: 0.5
                        }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full bg-white/50"
                          style={{
                            filter: 'blur(3px)'
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    onClick={handleSkip}
                    className="text-[14px] text-gray-500 bg-transparent border-none mt-[16px]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500
                    }}
                    whileHover={{ 
                      color: '#6b7280',
                      scale: 1.02,
                      y: -1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1.2
                      }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.9,
                      duration: 0.7,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    Skip
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 'q1' && !isProcessing && (
              <motion.div
                key="q1"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { 
                    duration: 0.25,
                    ease: "easeIn"
                  }
                }}
                transition={{ 
                  layout: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  opacity: { 
                    duration: 0.25,
                    delay: 0
                  }
                }}
              >
                <motion.h2
                  key="q1-title"
                  className="text-[20px] font-semibold mb-[32px] text-center text-sky-800"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    lineHeight: '1.3'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  First things first, what's your current mental state?
                </motion.h2>
                <div className="flex flex-col gap-[20px]">
                  {['Just woke up, need coffee', 'In the zone, crushing tasks', 'Open to inspiration'].map((option, i) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionSelect('q1', option)}
                      className="px-[32px] py-[8px] rounded-[12px] text-left font-medium text-[16px]"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        color: '#0c4a6e'
                      }}
                      initial={{ opacity: 0, y: -5, backgroundColor: 'rgba(226, 232, 240, 0.75)' }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        backgroundColor: selectedAnswers.q1 === option ? '#bae6fd' : 'rgba(226, 232, 240, 0.75)'
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.25, 0.1, 0.25, 1],
                        backgroundColor: { duration: 0.2 }
                      }}
                      whileTap={{ 
                        scale: 0.94,
                        y: 1,
                        transition: {
                          type: "spring",
                          stiffness: 600,
                          damping: 20,
                          mass: 0.3
                        }
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 'q2' && !isProcessing && (
              <motion.div
                key="q2"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { 
                    duration: 0.25,
                    ease: "easeIn"
                  }
                }}
                transition={{ 
                  layout: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  opacity: { 
                    duration: 0.25,
                    delay: 0
                  }
                }}
              >
                <motion.h2
                  key="q2-title"
                  className="text-[20px] font-semibold mb-[32px] text-center text-sky-800"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    lineHeight: '1.3'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Ideally, where would you rather be right now?
                </motion.h2>
                <div className="flex flex-col gap-[20px]">
                  {['A quiet minimal art gallery', 'A buzzing tech conference', 'A colorful street festival'].map((option, i) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionSelect('q2', option)}
                      className="px-[32px] py-[8px] rounded-[12px] text-left font-medium text-[16px]"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        color: '#0c4a6e'
                      }}
                      initial={{ opacity: 0, y: -5, backgroundColor: 'rgba(226, 232, 240, 0.75)' }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        backgroundColor: selectedAnswers.q2 === option ? '#bae6fd' : 'rgba(226, 232, 240, 0.75)'
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.25, 0.1, 0.25, 1],
                        backgroundColor: { duration: 0.2 }
                      }}
                      whileTap={{ 
                        scale: 0.94,
                        y: 1,
                        transition: {
                          type: "spring",
                          stiffness: 600,
                          damping: 20,
                          mass: 0.3
                        }
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 'q3' && !isProcessing && (
              <motion.div
                key="q3"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { 
                    duration: 0.25,
                    ease: "easeIn"
                  }
                }}
                transition={{ 
                  layout: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  opacity: { 
                    duration: 0.25,
                    delay: 0
                  }
                }}
              >
                <motion.h2
                  key="q3-title"
                  className="text-[20px] font-semibold mb-[32px] text-center text-sky-800"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    lineHeight: '1.3'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Whatever we do next, how should it feel?
                </motion.h2>
                <div className="flex flex-col gap-[20px]">
                  {[
                    { text: 'Smooth and calm', theme: 'calm' as ThemeId },
                    { text: 'Energetic and playful', theme: 'vibrant' as ThemeId },
                    { text: 'Sharp and professional', theme: 'focused' as ThemeId }
                  ].map((option, i) => (
                    <motion.button
                      key={option.text}
                      onClick={() => handleOptionSelect('q3', option.text)}
                      className="px-[32px] py-[8px] rounded-[12px] text-left font-medium text-[16px]"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        color: '#0c4a6e'
                      }}
                      initial={{ opacity: 0, y: -5, backgroundColor: 'rgba(226, 232, 240, 0.75)' }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        backgroundColor: selectedAnswers.q3 === option.text ? '#bae6fd' : 'rgba(226, 232, 240, 0.75)'
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.25, 0.1, 0.25, 1],
                        backgroundColor: { duration: 0.2 }
                      }}
                      whileTap={{ 
                        scale: 0.94,
                        y: 1,
                        transition: {
                          type: "spring",
                          stiffness: 600,
                          damping: 20,
                          mass: 0.3
                        }
                      }}
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {currentStep !== 'intro' && !isProcessing && (
            <div className="mt-[55px]">
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={handleBack}
                  className="text-[16px] text-gray-500 bg-transparent border-none p-0"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500
                  }}
                  whileHover={{ 
                    color: '#6b7280',
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      mass: 1.2
                    }
                  }}
                  whileTap={{ 
                    scale: 0.95
                  }}
                >
                  ←
                </motion.button>
                <div className="flex gap-[8px] items-center">
                  {[0, 1, 2].map((index) => {
                    const isActive = getCurrentStepIndex() - 1 === index;
                    return (
                      <motion.div
                        key={index}
                        className="rounded-full h-[4px]"
                        layout
                        style={{
                          width: isActive ? 24 : 8,
                          backgroundColor: isActive 
                            ? 'rgba(251, 113, 133, 0.5)' // rose-300 50% opacity
                            : 'rgba(251, 113, 133, 0.25)' // rose-300 25% opacity
                        }}
                        initial={{ 
                          scale: 0.8,
                          opacity: 0.5
                        }}
                        animate={{ 
                          scale: isActive ? 1.05 : 1,
                          opacity: 1,
                          width: isActive ? 24 : 8
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          mass: 0.5,
                          layout: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }}
                        whileHover={!isActive ? {
                          scale: 1.1,
                          opacity: 0.4,
                          transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 25
                          }
                        } : {}}
                      />
                    );
                  })}
                </div>
                <div className="w-[16px]"></div>
              </div>
              <motion.button
                onClick={handleSkip}
                className="text-[14px] text-gray-500 bg-transparent border-none mt-[16px] mx-auto block"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500
                }}
                whileHover={{ 
                  color: '#6b7280',
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1.2
                  }
                }}
                whileTap={{ 
                  scale: 0.98
                }}
              >
                Skip
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
