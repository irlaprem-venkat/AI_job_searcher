import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    if (typeof window === 'undefined') {
      console.warn('Supabase URL or Key missing during server-side execution.')
    }
    // Return a dummy client or handle it in the UI
    return {} as any
  }

  return createBrowserClient(url, key)
}

export const supabase = typeof window !== 'undefined' ? createClient() : ({} as any)
