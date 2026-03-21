'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Briefcase, Zap, Radar, Settings, CheckCircle2 } from 'lucide-react'
import ScanningBackground from '@/components/Three/ScanningBackground'
import JobTracker from '@/components/Jobs/JobTracker'

export default function AutoApplyPage() {
  const [isAutoApplyActive, setIsAutoApplyActive] = useState(false)
  const [jobsFound, setJobsFound] = useState(0)
  const [jobsApplied, setJobsApplied] = useState(0)

  // Simulation effect for UI
  React.useEffect(() => {
    if (!isAutoApplyActive) return

    const findInterval = setInterval(() => {
      setJobsFound((prev) => prev + Math.floor(Math.random() * 3))
    }, 2000)

    const applyInterval = setInterval(() => {
      setJobsApplied((prev) => {
        if (prev < jobsFound) return prev + 1
        return prev
      })
    }, 5000)

    return () => {
      clearInterval(findInterval)
      clearInterval(applyInterval)
    }
  }, [isAutoApplyActive, jobsFound])

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <ScanningBackground isActive={isAutoApplyActive} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Controls & Progress */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            {isAutoApplyActive && (
              <div className="absolute inset-0 bg-neon-cyan/5 animate-pulse" />
            )}
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              AUTO <span className="text-neon-cyan">APPLY</span>
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Let our AI agent tirelessly search, match, and apply to jobs for you 24/7.
            </p>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 mb-8">
              <span className="text-white font-bold tracking-widest uppercase text-sm">
                System Status
              </span>
              <button 
                onClick={() => setIsAutoApplyActive(!isAutoApplyActive)}
                className={`w-16 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                  isAutoApplyActive ? 'bg-neon-cyan' : 'bg-gray-700'
                }`}
              >
                <motion.div 
                  layout
                  className="w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: isAutoApplyActive ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Jobs Found</span>
                  <span className="text-neon-cyan font-bold">{jobsFound}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-neon-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (jobsFound / 100) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Jobs Applied</span>
                  <span className="text-neon-magenta font-bold">{jobsApplied}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-neon-magenta"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (jobsApplied / Math.max(1, jobsFound)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Smart Filters */}
          <div className="glass p-6 rounded-3xl border border-white/5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Settings size={18} className="text-neon-cyan" />
              Smart Filters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">Experience Level</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-neon-cyan outline-none transition-colors">
                  <option>Entry Level (0-2 years)</option>
                  <option>Mid Level (3-5 years)</option>
                  <option>Senior (5+ years)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">Job Type</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-neon-cyan outline-none transition-colors">
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">Desired Salary</label>
                <input type="text" placeholder="$100k - $150k" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-neon-cyan outline-none transition-colors" />
              </div>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors text-sm border border-white/5">
                Update Preferences
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Tracker & AI */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-black text-white tracking-tight mb-6 flex items-center gap-3">
              <Radar className="text-neon-cyan" />
              Application Tracker
            </h2>
            <JobTracker />
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10 border-l-4 border-l-neon-magenta flex items-start gap-4">
             <div className="w-12 h-12 rounded-full bg-neon-magenta/20 flex items-center justify-center shrink-0">
               <Zap className="text-neon-magenta" size={24} />
             </div>
             <div>
               <h3 className="text-white font-bold text-lg">Nova AI Agent</h3>
               <p className="text-gray-400 text-sm mt-1">
                 {isAutoApplyActive 
                   ? "I am currently scanning the web for React developer roles and sending out tailored applications using your profile. Generating personalized cover letters for each..."
                   : "System is offline. Setup your smart filters and toggle 'Auto Apply' to let me handle your job hunt."}
               </p>
             </div>
          </div>
        </div>

      </div>
    </main>
  )
}
