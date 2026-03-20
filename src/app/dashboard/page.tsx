'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Bookmark, Calendar } from 'lucide-react'
import { MOCK_JOBS } from '@/lib/mock-data'
import JobCard from '@/components/Jobs/JobCard'

export default function Dashboard() {
  const recommendedJobs = MOCK_JOBS.slice(0, 2);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black text-white tracking-tight">
              WELCOME BACK, <span className="text-neon-cyan">PIONEER</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-neon-cyan mb-2">
                <TrendingUp size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Match Score</span>
              </div>
              <p className="text-3xl font-black text-white">94%</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-neon-magenta mb-2">
                <Bookmark size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Saved Jobs</span>
              </div>
              <p className="text-3xl font-black text-white">12</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-neon-yellow mb-2">
                <Calendar size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Applications</span>
              </div>
              <p className="text-3xl font-black text-white">4</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles size={24} className="text-neon-cyan" />
              <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="space-y-8">
          <div className="glass-neon-magenta p-8 rounded-3xl border border-neon-magenta/20 min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-neon-magenta/20 flex items-center justify-center">
                <Sparkles className="text-neon-magenta" size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">Nova Assistant</h3>
                <p className="text-neon-magenta/60 text-xs font-bold uppercase tracking-widest">Active Core</p>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto mb-6 pr-2">
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                <p className="text-sm text-gray-300">
                  Hello! I've analyzed your resume. You have strong experience in <strong>React</strong> and <strong>Three.js</strong>.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                <p className="text-sm text-gray-300">
                  I recommend applying for the <strong>Senior AI Engineer</strong> role at OpenAI based on your recent projects.
                </p>
              </div>
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="Ask your career wingman..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-magenta/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-neon-magenta text-white text-[10px] font-black rounded-lg">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
