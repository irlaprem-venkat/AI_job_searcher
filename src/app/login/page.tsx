'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'
import { Github, Mail, Sparkles, Loader2, Lock, UserPlus, LogIn } from 'lucide-react'

function LoginPageContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      if (errorParam === 'auth-failed') {
        setError('Authentication failed. Please try again.')
      } else {
        setError(errorParam)
      }
    }
    
    const messageParam = searchParams.get('message')
    if (messageParam) {
      setMessage(messageParam)
    }
  }, [searchParams])

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setIsLoading(provider)
    setError(null)
    const redirectTo = `${window.location.origin}/auth/callback`
    console.log('Initiating OAuth Login:', { provider, redirectTo })
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    })
    if (error) {
      setError(error.message)
      setIsLoading(null)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading('email')
    setError(null)
    setMessage(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) setError(error.message)
      else setMessage('Check your email for the confirmation link!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) setError(error.message)
      else window.location.href = '/dashboard'
    }
    setIsLoading(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glimmer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-lg p-10 rounded-[2.5rem] border border-white/5 space-y-8 text-center relative z-10"
      >
        <div className="space-y-3">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5 shadow-xl">
            <Sparkles className="text-neon-cyan" size={32} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            {mode === 'login' ? 'Welcome Back' : 'Join the Galaxy'}
          </h1>
          <p className="text-gray-400 font-light text-sm tracking-wide">
            {mode === 'login' 
              ? 'Access your AI-powered career dashboard.' 
              : 'Start your journey with Nova Jobs today.'}
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 max-w-[240px] mx-auto">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${mode === 'login' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            SIGN IN
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${mode === 'signup' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            CREATE
          </button>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4 pt-4 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="commander@nova.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 glass border border-white/5 rounded-2xl text-white focus:outline-none focus:border-neon-cyan/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-2">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-magenta transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 glass border border-white/5 rounded-2xl text-white focus:outline-none focus:border-neon-magenta/50 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!!isLoading}
            className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-neon-cyan transition-all transform active:scale-[0.98] disabled:opacity-50 mt-4 shadow-xl shadow-white/5"
          >
            {isLoading === 'email' ? (
              <Loader2 className="animate-spin" />
            ) : mode === 'login' ? (
              <><LogIn size={18} /> ACCESS TERMINAL</>
            ) : (
              <><UserPlus size={18} /> INITIALIZE ACCOUNT</>
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold">
              {error}
            </motion.div>
          )}
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl text-neon-cyan text-xs font-bold">
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-4 py-4">
          <div className="flex-1 h-[1px] bg-white/5" />
          <span className="text-[10px] text-gray-600 font-black tracking-widest uppercase">OR QUANTUM SIGN-IN</span>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={!!isLoading}
            className="flex items-center justify-center gap-3 py-4 glass border border-white/5 rounded-2xl text-gray-300 font-bold text-xs hover:border-white/20 transition-all"
          >
            {isLoading === 'google' ? <Loader2 className="animate-spin" size={16} /> : <Mail size={16} className="text-neon-magenta" />}
            GOOGLE
          </button>
          <button
            onClick={() => handleOAuthLogin('github')}
            disabled={!!isLoading}
            className="flex items-center justify-center gap-3 py-4 glass border border-white/5 rounded-2xl text-gray-300 font-bold text-xs hover:border-white/20 transition-all"
          >
            {isLoading === 'github' ? <Loader2 className="animate-spin" size={16} /> : <Github size={16} className="text-neon-cyan" />}
            GITHUB
          </button>
        </div>

        <button 
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="text-[10px] text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-[0.2em]"
        >
          {mode === 'login' ? 'Don’t have an account? Sign Up' : 'Already registered? System Log In'}
        </button>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-neon-cyan" size={48} />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}
