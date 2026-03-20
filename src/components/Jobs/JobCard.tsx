'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Job } from '@/types'
import { MapPin, Briefcase, DollarSign, Clock, ExternalLink } from 'lucide-react'

interface JobCardProps {
  job: Job
}

const levelColors = {
  'Freshers': 'border-neon-cyan text-neon-cyan',
  '1 Year': 'border-neon-blue text-neon-blue',
  '2-3 Years': 'border-neon-yellow text-neon-yellow',
  '4-6 Years': 'border-neon-orange text-neon-orange',
  '7-10 Years': 'border-neon-red text-neon-red',
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className="glass group relative p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full bg-current ${levelColors[job.experience_level].split(' ')[1]}`} />

      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-400 font-medium">{job.company}</p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${levelColors[job.experience_level]}`}>
          {job.experience_level}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin size={16} className="text-neon-cyan" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <DollarSign size={16} className="text-neon-green" />
          {job.salary_range}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Briefcase size={16} className="text-neon-magenta" />
          {job.type}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock size={16} className="text-gray-500" />
          {job.posted_at}
        </div>
      </div>

      <p className="text-sm text-gray-300 line-clamp-2 mb-6 leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map(tag => (
          <span key={tag} className="px-2 py-1 text-[10px] font-bold bg-white/5 border border-white/10 rounded text-gray-400">
            {tag}
          </span>
        ))}
      </div>

      <button className="w-full py-3 bg-white hover:bg-neon-cyan text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group/btn">
        View Details 
        <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
      </button>
    </motion.div>
  )
}
