import { supabase } from '@/lib/supabase'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import CaseFilters from '@/app/components/CaseFilters'

const ITEMS_PER_PAGE = 20

export default async function Posts({ searchParams }) {
  // 1. CHECK ACCESS (Subscription Gate Logic)
  // We check the user session server-side to show/hide the warning
  const serverSupabase = await createClient()
  const { data: { user } } = await serverSupabase.auth.getUser()

  // 2. PREPARE PARAMETERS
  // await searchParams is required in Next.js 15
  const params = await searchParams
  const page = parseInt(params.page) || 1
  const year = params.year || 'All Years'
  const court = params.category || 'All Courts'
  const letter = params.letter || 'All Letters'


  // 3. BUILD THE DATABASE QUERY
  let query = supabase
    .from('cases')
    .select(`
      id, 
      title, 
      slug, 
      case_year, 
      categories(name),
      tags(name)
    `, { count: 'exact' })
    // CHANGE THIS LINE:
    // Old: .order('case_year', { ascending: false }) 
    // New: Order by title, A -> Z
    .order('title', { ascending: true }) 
    .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

  // Apply filters if they are selected
  if (year !== 'All Years') query = query.eq('case_year', year)
  if (court !== 'All Courts') query = query.eq('categories.name', court)
  if (letter !== 'All Letters') query = query.ilike('title', `${letter}%`)

  const { data: posts, count } = await query
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-montserrat pb-20">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-3xl font-bold text-[#050298] mb-2">Browse Appellate Court Decisions</h1>
           <p className="text-gray-500">
             Accessing {count?.toLocaleString()} judgments from the database.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. FILTER WIDGET */}
        <div className="mb-8">
           <CaseFilters />
        </div>

        {/* 3. ACCESS WARNING (Shows only if NOT logged in) */}
        {!user && (
           <div className="bg-yellow-50 border-l-4 border-[#FFC107] p-4 mb-8 rounded-r-md">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                   <span className="text-2xl">🔒</span>
                   <p className="text-yellow-900 text-sm">
                      <strong>Public Preview Mode:</strong> You are viewing a limited list. Log in to access full case documents and advanced search.
                   </p>
                </div>
                <Link href="/login" className="px-4 py-2 bg-[#FFC107] text-blue-900 text-sm font-bold rounded shadow-sm hover:bg-yellow-400 transition-colors">
                  Log In Now
                </Link>
              </div>
           </div>
        )}

        {/* 4. RESULTS LIST */}
        <div className="space-y-4">
          {posts?.map((post) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.slug}`}
              className="block bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              {/* TITLE: Only render if title exists */}
              {post.title && (
                <h2 className="text-lg font-bold text-gray-800 uppercase mb-4 leading-snug group-hover:text-[#050298] transition-colors">
                  {post.title}
                </h2>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50 mt-2">
                 
                 {/* LEFT: Tags (Gray Pills) - Only render if tags exist */}
                 <div className="flex flex-wrap items-center gap-2">
                    {post.tags && post.tags.length > 0 ? (
                       <>
                         <span className="text-xs font-bold text-gray-500 mr-1">Tags:</span>
                         {post.tags.slice(0, 3).map((tag, i) => (
                           <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                             {tag.name}
                           </span>
                         ))}
                         {post.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                         )}
                       </>
                    ) : (
                       // Optional: You can remove this span if you want it completely empty
                       <span className="text-xs text-gray-400 italic">Uncategorized</span>
                    )}
                 </div>

                 {/* RIGHT: Court (Green Pills) & Year */}
                 <div className="flex items-center gap-2">
                    {/* Render Court Name if available */}
                    {post.categories?.map((cat, i) => (
                       <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 uppercase tracking-wider">
                         {cat.name}
                       </span>
                    ))}
                    
                    {/* Render Year if available */}
                    {post.case_year && (
                       <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                         {post.case_year}
                       </span>
                    )}
                 </div>

              </div>
            </Link>
          ))}
        </div>

        {/* 5. PAGINATION */}
        <div className="mt-12 flex justify-center gap-2">
          {page > 1 && (
            <Link 
              href={`/posts?page=${page - 1}`} 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              &larr; Prev
            </Link>
          )}
          
          <span className="px-4 py-2 bg-[#050298] text-white rounded font-medium shadow-sm">
             Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link 
              href={`/posts?page=${page + 1}`} 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              Next &rarr;
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}