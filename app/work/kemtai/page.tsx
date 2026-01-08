'use client';
// Update v1
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function KemtaiShowcase() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full pb-20">
      
      {/* Navigation: Back Button */}
      <div className="w-full max-w-[1440px] px-[120px] py-8">
        <Link href="/work" className="inline-flex items-center text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </div>

      {/* STRIP 1: Intro & Overview */}
      <section className="w-full max-w-[1440px] px-[120px]">
        <Image 
          src="/kemtai/kemtai-section-1.png" 
          alt="Kemtai Computer Vision AI - Intro"
          width={1440} 
          height={900} 
          quality={100}
          priority 
          className="w-full h-auto"
        />
      </section>

      {/* STRIP 2: Visual Identity & Onboarding */}
      <section className="w-full max-w-[1440px] px-[120px]">
        <Image 
          src="/kemtai/kemtai-section-2.png" 
          alt="Kemtai Visual Identity and Pre-Workout Flow"
          width={1440}
          height={900}
          quality={100}
          className="w-full h-auto"
        />
      </section>

      {/* STRIP 3: Care Management & Impact */}
      <section className="w-full max-w-[1440px] px-[120px]">
        <Image 
          src="/kemtai/kemtai-section-3.png" 
          alt="Care Management Dashboard and Project Impact"
          width={1440}
          height={900}
          quality={100}
          className="w-full h-auto"
        />
      </section>

      {/* SEO & Accessibility (Hidden Text) */}
      <div className="sr-only">
        <h1>Kemtai - Computer Vision AI</h1>
        <p>A B2B AI-powered web app for the medical and wellness sectors.</p>
        <h2>Visual Identity</h2>
        <p>Accessible and encouraging. We moved away from sterile medical aesthetics to make therapy feel friendly.</p>
        <h2>Care Management</h2>
        <p>A centralized dashboard for caregivers to manage patient plans and monitor adherence.</p>
        <h2>Impact</h2>
        <p>Serving thousands of active users weekly, bridging the gap between clinical precision and home accessibility.</p>
      </div>

    </main>
  );
}

