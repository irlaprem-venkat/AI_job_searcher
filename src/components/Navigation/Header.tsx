'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, User, LogOut, Menu } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { User as SupabaseUser } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null)
    })

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-neon-cyan/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="text-neon-cyan" size={20} />
          </div>
          <span className="text-2xl font-black text-white tracking-widest">
            NOVA<span className="text-neon-cyan">JOBS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/jobs" className="text-sm font-bold text-gray-400 hover:text-neon-cyan transition-colors">EXPLORE</Link>
          {user && <Link href="/dashboard" className="text-sm font-bold text-gray-400 hover:text-neon-cyan transition-colors">DASHBOARD</Link>}
          {user && <Link href="/upload" className="text-sm font-bold text-gray-400 hover:text-neon-cyan transition-colors">UPLOAD</Link>}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="w-10 h-10 rounded-full border border-neon-cyan/50 p-0.5 overflow-hidden hover:scale-105 transition-transform">
                <div className="w-full h-full bg-neon-cyan/10 rounded-full flex items-center justify-center">
                  <User className="text-neon-cyan" size={18} />
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-neon-red transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-neon-cyan transition-all transform active:scale-95"
            >
              SIGN IN
            </Link>
          )}
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
