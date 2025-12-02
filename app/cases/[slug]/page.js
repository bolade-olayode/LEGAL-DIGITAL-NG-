import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function CasePage({ params }) {
  const { slug } = params
  
  // Fetch case with its categories and tags
  const { data: caseData, error } = await supabase
    .from('cases')
    .select(`
      *,
      case_categories (
        categories (id, name, slug)
      ),
      case_tags (
        tags (id, name, slug)
      )
    `)
    .eq('slug', slug)
    .single()
  
  if (error || !caseData) {
    console.error('Error fetching case:', error)
    notFound()
  }
  
  // Extract categories and tags
  const categories = caseData.case_categories?.map(cc => cc.categories) || []
  const tags = caseData.case_tags?.map(ct => ct.tags) || []
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Case Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {caseData.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {caseData.case_year && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                📅 {caseData.case_year}
              </span>
            )}
            {caseData.first_letter && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                🔤 {caseData.first_letter}
              </span>
            )}
          </div>
          
          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-md hover:bg-green-200 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300 transition"
                  >
                    {tag.name}
                  </Link>
                ))}
                {tags.length > 10 && (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    +{tags.length - 10} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Case Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: caseData.content }}
          />
        </div>
        
        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/posts"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to All Cases
          </Link>
        </div>
      </div>
    </div>
  )
}

// Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params
  
  const { data: caseData } = await supabase
    .from('cases')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()
  
  if (!caseData) {
    return {
      title: 'Case Not Found'
    }
  }
  
  return {
    title: `${caseData.title} | Legal Digital NG`,
    description: caseData.excerpt || `Read the full legal case: ${caseData.title}`,
  }
}