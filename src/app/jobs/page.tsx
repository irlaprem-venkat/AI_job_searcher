'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_JOBS } from '@/lib/mock-data'
import { ExperienceLevel } from '@/types'
import JobCard from '@/components/Jobs/JobCard'
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'

const CATEGORIES: ExperienceLevel[] = ['Freshers', '1 Year', '2-3 Years', '4-6 Years', '7-10 Years']

export default function JobExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<ExperienceLevel | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesCategory = selectedCategory === 'All' || job.experience_level === selectedCategory
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-neon-cyan font-bold tracking-widest uppercase text-sm">
            <Sparkles size={16} />
            AI-Powered Extraction
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            EXPLORE <span className="text-transparent border-b-4 border-neon-cyan bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">JOBS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Browse through curated opportunities from top tech giants and disruptive startups.
          </p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search roles, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 glass border border-white/5 rounded-2xl text-white focus:outline-none focus:border-neon-cyan/50 transition-all"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            selectedCategory === 'All' 
            ? 'bg-white text-black translate-y-[-4px] shadow-lg shadow-white/10' 
            : 'glass text-gray-400 border border-white/5 hover:border-white/20'
          }`}
        >
          All Opportunities
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              selectedCategory === cat 
              ? 'bg-neon-cyan text-black translate-y-[-4px] shadow-lg shadow-neon-cyan/20' 
              : 'glass text-gray-400 border border-white/5 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredJobs.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-500 text-xl font-light">
            No cosmic opportunities found in this sector. Try broadening your search.
          </p>
        </div>
      )}
    </div>
  )
}
