/** Supabase configuration and client initialization with resilience for build-time environments. */
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (typeof window !== 'undefined') {
    console.log('Supabase Configuration Check:', {
      urlPresent: !!url,
      keyPresent: !!key,
    })
  }

  if (!url || !key) {
    if (typeof window === 'undefined') {
      console.warn('Supabase URL or Key missing during server-side execution.')
    }
    
    // Return a robust mock to prevent crashes in the UI
    const mockAuth = {
      onAuthStateChange: (cb: any) => {
        // Immediately trigger with null session if needed, or just return unsubscribe
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
      signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
      signInWithOAuth: async () => ({ error: { message: 'Supabase not configured' } }),
      signUp: async () => ({ error: { message: 'Supabase not configured' } }),
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signOut: async () => ({ error: null }),
    }

    return { 
      auth: mockAuth,
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null })
          }),
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      })
    } as any
  }

  return createBrowserClient(url, key)
}

export const supabase = typeof window !== 'undefined' ? createClient() : ({} as any)
