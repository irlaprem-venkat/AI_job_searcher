'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

const MOCK_APPLICATIONS = [
  { id: 1, company: 'Stripe', role: 'Frontend Engineer', status: 'applied', platform: 'LinkedIn', time: '10 mins ago' },
  { id: 2, company: 'Vercel', role: 'React Developer', status: 'applying', platform: 'Greenhouse', time: 'Just now' },
  { id: 3, company: 'Discord', role: 'UI Engineer', status: 'queued', platform: 'Workday', time: '-' },
  { id: 4, company: 'Airbnb', role: 'Software Engineer', status: 'applied', platform: 'Lever', time: '1 hour ago' },
]

export default function JobTracker() {
  return (
    <div className="space-y-4">
      {MOCK_APPLICATIONS.map((app, i) => (
        <motion.div 
          key={app.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              app.status === 'applied' ? 'bg-neon-cyan/20 text-neon-cyan' :
              app.status === 'applying' ? 'bg-neon-magenta/20 text-neon-magenta animate-pulse' :
              'bg-gray-800 text-gray-400'
            }`}>
              {app.status === 'applied' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
            </div>
            <div>
              <h4 className="text-white font-bold">{app.role}</h4>
              <p className="text-gray-400 text-sm">{app.company} • Via {app.platform}</p>
            </div>
          </div>
          
          <div className="text-right">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              app.status === 'applied' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20' :
              app.status === 'applying' ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/20' :
              'bg-gray-800 text-gray-400 border border-gray-700'
            }`}>
              {app.status}
            </span>
            <p className="text-gray-500 text-xs mt-2">{app.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
