import Link from 'next/link'


export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* Logo */}
<Link href="/" className="flex items-center">
  <div className="text-xl font-bold">
    <span className="text-[#050298]">Legal</span>
    <span className="text-[#FFC107]">Digital</span>
    <span className="text-[#050298] align-super text-xs">NG</span>
  </div>
</Link>
        
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-[#050298] font-medium transition"
            >
              Home
            </Link>
            <Link 
              href="/posts" 
              className="text-gray-700 hover:text-[#050298] font-medium transition"
            >
              Browse Cases
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-[#050298] font-medium transition"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-[#050298] font-medium transition"
            >
              Contact
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/posts"
              className="hidden sm:inline-block bg-[#050298] text-white px-6 py-2 rounded-lg hover:bg-[#0402c4] transition font-medium"
            >
              Search Cases
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-[#050298]"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}