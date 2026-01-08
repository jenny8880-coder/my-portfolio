'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Generate random dots with gentle fade in/out animation
function AnimatedDot({ 
  x, 
  y, 
  delay, 
  duration,
  pauseDuration,
  baseSize,
  opacity,
  moveDistance
}: { 
  x: number; 
  y: number; 
  delay: number; 
  duration: number;
  pauseDuration: number;
  baseSize: number;
  opacity: number;
  moveDistance: number;
}) {
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        backgroundColor: 'rgba(212, 165, 116, 0.8)',
        boxShadow: `0 0 ${baseSize * 2}px rgba(212, 165, 116, 0.6)`,
      }}
      animate={{
        opacity: [0, opacity, opacity, 0], // Fade in while going up, fade out while going down
        scale: [0.3, 1.2, 1.2, 0.3], // Small -> big (while up) -> big -> small (while down)
        y: [0, -moveDistance, -moveDistance, 0], // Start at bottom -> move up -> stay up -> move back down
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: ["easeOut", "linear", "easeIn"],
        delay: delay,
        repeatDelay: pauseDuration, // Random pause between animation cycles
        times: [0, 0.45, 0.5, 1], // appear & grow up -> brief pause at top -> shrink & disappear down
      }}
    />
  );
}

export function AnimatedBackground() {
  const [dots, setDots] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    pauseDuration: number;
    baseSize: number;
    opacity: number;
    moveDistance: number;
  }>>([]);

  // Generate dots only on client side to avoid hydration mismatch
  useEffect(() => {
    const count = 36; // Reduced by another 20% from 45
    const gridCols = Math.ceil(Math.sqrt(count * 1.5)); // Create a grid for better distribution
    const gridRows = Math.ceil(count / gridCols);
    const cellWidth = 100 / gridCols;
    const cellHeight = 100 / gridRows;
    
    const generatedDots = Array.from({ length: count }, (_, i) => {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      // Base position in grid cell, then add random offset within cell
      const baseX = col * cellWidth;
      const baseY = row * cellHeight;
      // Random offset within the cell (up to 80% of cell size)
      const offsetX = (Math.random() - 0.5) * cellWidth * 0.8;
      const offsetY = (Math.random() - 0.5) * cellHeight * 0.8;
      
      return {
        id: i,
        x: Math.max(2, Math.min(98, baseX + cellWidth / 2 + offsetX)), // Keep within bounds
        y: Math.max(2, Math.min(98, baseY + cellHeight / 2 + offsetY)), // Keep within bounds
        delay: Math.random() * 10, // Increased delay range for more staggered appearance
        duration: Math.random() * 3 + 2, // 2-5 seconds
        pauseDuration: Math.random() * 2 + 0.5, // Random pause between cycles: 0.5-2.5 seconds
        baseSize: Math.random() * 5.1 + 3, // 3-8.1px (reduced max by 10%)
        opacity: Math.random() * 0.6 + 0.3, // 0.3-0.9
        moveDistance: Math.random() * 20 + 10, // 10-30px movement
      };
    });
    
    setDots(generatedDots);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map((dot) => (
        <AnimatedDot
          key={dot.id}
          x={dot.x}
          y={dot.y}
          delay={dot.delay}
          duration={dot.duration}
          pauseDuration={dot.pauseDuration}
          baseSize={dot.baseSize}
          opacity={dot.opacity}
          moveDistance={dot.moveDistance}
        />
      ))}
    </div>
  );
}

