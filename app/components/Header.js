import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-[#050298] text-white rounded-lg flex items-center justify-center text-xl shadow-lg group-hover:rotate-3 transition-transform">
              ⚖️
            </div>
            <span className="text-2xl font-bold text-[#050298] tracking-tight">
              Legal<span className="text-[#FFC107]">Digital</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-[#050298] transition-colors">
              Home
            </Link>
            <Link href="/posts" className="text-sm font-medium text-gray-600 hover:text-[#050298] transition-colors">
              Browse Cases
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-[#050298] transition-colors">
              About Us
            </Link>
          </nav>

          {/* 3. Auth Buttons (The "Smart" Part) */}
          <div className="flex items-center gap-3">
            {user ? (
              // OPTION A: User is Logged In -> Show Dashboard Button
              <Link 
                href="/dashboard"
                className="flex items-center gap-3 pl-1 pr-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full border border-blue-100 transition-all group"
              >
                <div className="h-8 w-8 rounded-full bg-[#050298] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="text-sm font-bold text-[#050298] group-hover:translate-x-0.5 transition-transform">
                  Dashboard &rarr;
                </span>
              </Link>
            ) : (
              // OPTION B: User is Guest -> Show TWO Buttons
              <>
                {/* Secondary Button: Sign In */}
                <Link 
                  href="/login"
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-[#050298] transition-colors"
                >
                  Sign In
                </Link>

                {/* Primary Button: Register (Yellow) */}
                <Link 
                  href="/login" // Points to same page since it has "Create Account"
                  className="px-5 py-2.5 bg-[#FFC107] hover:bg-[#ffcf40] text-blue-900 text-sm font-bold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}