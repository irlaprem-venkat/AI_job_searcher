import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-magenta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 text-center space-y-8 max-w-4xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
          NOVA<span className="text-neon-cyan neon-text-cyan">JOBS</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
          The future of job hunting is here. AI-driven matching, 3D exploration, and cosmic career growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
          <Link 
            href="/jobs"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neon-cyan transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Explore Jobs
          </Link>
          <Link 
            href="/upload"
            className="px-8 py-4 glass border border-white/10 text-white font-bold rounded-full hover:border-neon-magenta transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Upload Resume
          </Link>
        </div>
      </div>

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 border-[0.5px] border-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
    </main>
  );
}
