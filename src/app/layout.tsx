import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Scene from '@/components/Three/Scene'
import Header from '@/components/Navigation/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nova Jobs | AI-Powered Futuristic Job Search',
  description: 'The world\'s most advanced AI job matching platform. Upload your resume and find your dream tech role with our quantum matching engine.',
  keywords: ['AI Job Search', 'Tech Jobs', 'Next.js', 'Three.js', 'Futuristic UI', 'Remote Jobs'],
  authors: [{ name: 'Nova AI' }],
  openGraph: {
    title: 'Nova Jobs | Futuristic AI Job Search',
    description: 'Find your next role in the stars. AI-driven matching for top tech talent.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Scene />
        <Header />
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
