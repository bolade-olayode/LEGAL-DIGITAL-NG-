import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Extract initial for avatar (e.g., "T" for test@lawyer.com)
  const emailInitial = user.email ? user.email[0].toUpperCase() : 'U';

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Browse Cases', href: '/posts', icon: '⚖️' }, 
    { name: 'Saved Judgments', href: '/dashboard/saved', icon: '🔖' },
    { name: 'Recent History', href: '/dashboard/history', icon: '🕒' },
    { name: 'Legal Digital AI', href: '/dashboard/ai', icon: '🤖', badge: 'NEW' },
  ]

  return (
    // OUTER CONTAINER: Locked to screen height (h-screen) & hidden overflow to prevent double scrollbars
    <div className="h-screen bg-[#F3F4F6] flex font-montserrat overflow-hidden">
      
      {/* SIDEBAR: Fixed width, scrolls internally if needed (overflow-y-auto) */}
      <aside className="w-72 bg-[#050298] text-white flex flex-col shadow-2xl z-20 overflow-y-auto shrink-0">
        
        {/* Brand Area */}
        <div className="h-20 flex items-center px-8 border-b border-white/10 shrink-0">
           <span className="text-2xl font-bold tracking-tight">
             Legal<span className="text-[#FFC107]">Digital</span>
           </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-8 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            >
              <span className="mr-4 text-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.name}
              
              {/* Optional "NEW" Badge */}
              {item.badge && (
                <span className="ml-auto bg-[#FFC107] text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Mini Profile (Bottom of Sidebar) */}
        <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFC107] to-yellow-600 flex items-center justify-center text-blue-900 font-bold shadow-lg">
              {emailInitial}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate w-32">
                {user.email}
              </p>
              <form action="/auth/signout" method="post">
                <button className="text-xs text-blue-200 hover:text-[#FFC107] transition-colors flex items-center mt-0.5">
                  Sign out &rarr;
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT: Takes remaining width, SCROLLS INTERNALLY (overflow-y-auto) */}
      <main className="flex-1 overflow-y-auto relative bg-[#F3F4F6]">
        
        {/* SPECIALIZED DASHBOARD HEADER (Sticky) */}
        <header className="bg-white h-20 shadow-sm border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
           <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
           
           <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-[#050298] transition-colors relative">
                 <span className="text-xl">🔔</span>
                 <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              <span className="text-sm text-gray-500 font-medium">Standard Plan</span>
           </div>
        </header>

        {/* Page Content Injection */}
        <div className="p-8 pb-20">
           {children}
        </div>
      </main>
    </div>
  )
}