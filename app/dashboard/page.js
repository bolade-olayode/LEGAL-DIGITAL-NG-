import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Dynamic Greeting based on time
  const hour = new Date().getHours();
  let greeting = 'Good Morning';
  if (hour >= 12) greeting = 'Good Afternoon';
  if (hour >= 17) greeting = 'Good Evening';

  const username = user.email.split('@')[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* 1. HERO SECTION */}
      <div className="bg-gradient-to-r from-[#050298] to-[#0a0a4a] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              {greeting}, <span className="capitalize">{username}</span>.
            </h1>
            <p className="text-blue-200 max-w-xl">
              Ready to continue your research? You have access to <b>35,000+ Appellate Court Decisions </b>
            </p>
            
            <div className="mt-8 flex gap-4">
               <Link href="/posts" className="bg-[#FFC107] text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition shadow-lg transform hover:-translate-y-0.5">
                  Start New Search
               </Link>
               <button className="bg-white/10 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
                  View Saved Cases
               </button>
            </div>
         </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Card 1 */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-[#050298] group-hover:text-white transition-colors">
                  🔖
               </div>
               <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2 this week</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">12</h3>
            <p className="text-sm text-gray-500 mt-1">Saved Judgments</p>
         </div>

         {/* Card 2 */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  🕒
               </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">45</h3>
            <p className="text-sm text-gray-500 mt-1">Total Searches</p>
         </div>

         {/* Card 3 */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  💎
               </div>
               <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Gold Plan</h3>
            <p className="text-sm text-gray-500 mt-1">Valid until Dec 2025</p>
         </div>
      </div>

      {/* 3. RECENT ACTIVITY (Mockup) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-[#050298] font-medium hover:underline">View All</button>
         </div>
         
         <div className="divide-y divide-gray-50">
            {/* Activity Item 1 */}
            <div className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">
                     📄
                  </div>
                  <div>
                     <p className="text-sm font-semibold text-gray-900">Read: State v. Ilori (2014)</p>
                     <p className="text-xs text-gray-500">Supreme Court • Criminal Law</p>
                  </div>
               </div>
               <span className="text-xs text-gray-400">2 hours ago</span>
            </div>

            {/* Activity Item 2 */}
            <div className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center text-lg">
                     🔍
                  </div>
                  <div>
                     <p className="text-sm font-semibold text-gray-900">Searched: "Election Petition"</p>
                     <p className="text-xs text-gray-500">Found 342 results</p>
                  </div>
               </div>
               <span className="text-xs text-gray-400">Yesterday</span>
            </div>
             {/* Activity Item 3 */}
            <div className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-lg">
                     🔖
                  </div>
                  <div>
                     <p className="text-sm font-semibold text-gray-900">Saved: UBA Plc v. Jargaba</p>
                     <p className="text-xs text-gray-500">Court of Appeal • Banking</p>
                  </div>
               </div>
               <span className="text-xs text-gray-400">3 days ago</span>
            </div>
         </div>
      </div>
    </div>
  )
}