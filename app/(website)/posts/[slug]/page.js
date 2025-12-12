import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Post({ params }) {
  // Await params for Next.js 15
  const { slug } = await params

  // 1. Fetch Case Data
  const { data: post } = await supabase
    .from('cases')
    .select(`
      *,
      categories(id, name, slug),
      tags(id, name, slug)
    `)
    .eq('slug', slug)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-montserrat pb-20">
      
      {/* 1. HEADER STRIP */}
      <div className="bg-white border-b border-gray-200 sticky top-[80px] z-30 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
               <Link href="/posts" className="hover:text-[#050298] transition-colors">&larr; Back to Cases</Link>
               <span className="text-gray-300">/</span>
               <span className="truncate max-w-[200px] font-medium text-gray-900">{post.title}</span>
            </div>
            
            <div className="flex gap-2">
               <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-[#050298] bg-blue-50 rounded border border-blue-100 hover:bg-blue-100 transition-colors">
                  🖨️ Print
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-[#050298] rounded shadow-sm hover:bg-blue-900 transition-colors">
                  🔖 Save Case
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* 2. MAIN CONTENT (Left Column) */}
          <div className="flex-1 min-w-0">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                
                {/* Case Header Info */}
                <div className="text-center border-b border-gray-100 pb-8 mb-8">
                   <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold tracking-wider uppercase rounded-full mb-4">
                      {post.categories?.[0]?.name || 'Judgment'}
                   </span>
                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                      {post.title}
                   </h1>
                   <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                      <span>🗓 {post.case_year}</span>
                      <span>•</span>
                      <span>⚖️ {post.categories?.[0]?.name}</span>
                   </div>
                </div>

                {/* Justices Section (If data exists in excerpt or content) */}
                <div className="bg-blue-50/50 rounded-lg p-6 mb-8 border border-blue-50">
                   <h3 className="text-xs font-bold text-[#050298] uppercase tracking-wide mb-2">Justices</h3>
                   <p className="text-sm text-gray-700 leading-relaxed italic">
                      {/* You might want to add a specific column for 'justices' later. 
                          For now, we leave a placeholder or check excerpt. */}
                      Honorable Justice delivering the judgment...
                   </p>
                </div>

                {/* THE CONTENT BODY */}
                <div 
                  className="prose prose-blue max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-7"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
             </div>
          </div>

          {/* 3. SIDEBAR METADATA (Right Column) */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
             
             {/* Card 1: Key Facts */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-[160px]">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <span className="w-1 h-4 bg-[#FFC107] rounded-full"></span>
                   Case Information
                </h3>
                
                <div className="space-y-4">
                   <div>
                      <p className="text-xs text-gray-500 uppercase">Citation</p>
                      <p className="text-sm font-medium text-gray-900 font-mono bg-gray-50 p-2 rounded mt-1 border border-gray-100">
                        {post.slug.toUpperCase()}
                      </p>
                   </div>
                   
                   <div>
                      <p className="text-xs text-gray-500 uppercase">Court</p>
                      <p className="text-sm font-medium text-gray-900">
                         {post.categories?.map(c => c.name).join(', ') || 'N/A'}
                      </p>
                   </div>

                   <div>
                      <p className="text-xs text-gray-500 uppercase">Year</p>
                      <p className="text-sm font-medium text-gray-900">{post.case_year}</p>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                   <p className="text-xs text-gray-500 uppercase mb-3">Tags</p>
                   <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                         <Link 
                           key={tag.id} 
                           href={`/posts?query=${tag.name}`}
                           className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
                         >
                           #{tag.name}
                         </Link>
                      ))}
                   </div>
                </div>
             </div>

             {/* Card 2: AI Summary Call-to-Action */}
             <div className="bg-gradient-to-br from-[#050298] to-[#1e1b8a] rounded-lg shadow-md p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need a Summary?</h3>
                <p className="text-blue-200 text-sm mb-4">
                   Use our Legal AI to summarize this judgment in seconds.
                </p>
                <button className="w-full py-2 bg-[#FFC107] hover:bg-[#ffcf40] text-blue-900 text-sm font-bold rounded transition-colors shadow-sm">
                   ✨ Generate Summary
                </button>
             </div>

          </aside>

        </div>
      </div>
    </div>
  )
}