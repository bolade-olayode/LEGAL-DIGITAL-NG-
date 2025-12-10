import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import CaseFilters from '../components/CaseFilters'

const ITEMS_PER_PAGE = 20

export default async function PostsPage({ searchParams }) {
  const params = await searchParams
  const currentPage = parseInt(params?.page || '1')
  const selectedYear = params?.year || ''
  const selectedCategory = params?.category || ''
  const selectedLetter = params?.letter || ''
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  
  // Start building the query
  let caseIds = null
  
  // Handle category filtering
  if (selectedCategory) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', selectedCategory)
      .single()
    
    if (categoryData) {
      const { data: caseCategoryData } = await supabase
        .from('case_categories')
        .select('case_id')
        .eq('category_id', categoryData.id)
      
      caseIds = caseCategoryData?.map(cc => cc.case_id) || []
    }
  }
  
  // Build main query
  let query = supabase
    .from('cases')
    .select(`
      id, 
      title, 
      slug,
      case_categories (
        categories (id, name, slug)
      ),
      case_tags (
        tags (id, name, slug)
      )
    `, { count: 'exact' })
  
  // Apply filters
  if (caseIds !== null) {
    query = query.in('id', caseIds)
  }
  
  if (selectedYear) {
    query = query.eq('case_year', parseInt(selectedYear))
  }
  
  if (selectedLetter) {
    query = query.eq('first_letter', selectedLetter)
  }
  
  // Execute query
  const { data: cases, error, count } = await query
    .order('published_at', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1)
  
  if (error) {
    console.error('Error fetching cases:', error)
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cases</h1>
          <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
  
  // Fetch filter options
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name')
  
  // Generate year and letter options
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  
  // Calculate pagination
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1
  
  // Build pagination URL
  const buildPageUrl = (page) => {
    const urlParams = new URLSearchParams()
    if (selectedYear) urlParams.set('year', selectedYear)
    if (selectedCategory) urlParams.set('category', selectedCategory)
    if (selectedLetter) urlParams.set('letter', selectedLetter)
    if (page > 1) urlParams.set('page', page.toString())
    
    const queryString = urlParams.toString()
    return `/posts${queryString ? `?${queryString}` : ''}`
  }
  
  const hasActiveFilters = selectedYear || selectedCategory || selectedLetter
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Browse Appelate Court Decisions
          </h1>
          <p className="text-gray-600">
            {hasActiveFilters 
              ? `Found ${count?.toLocaleString() || 0} cases matching your filters`
              : `Browse all ${count?.toLocaleString() || 0} cases in our database`
            }
          </p>
        </div>
        
        {/* Filters - Client Component */}
        <CaseFilters 
          categories={categories || []}
          years={years}
          letters={letters}
        />
        
        {/* Cases List */}
        {cases && cases.length > 0 ? (
          <div className="space-y-4 mb-8">
            {cases.map((caseItem) => {
              const tags = caseItem.case_tags?.map(ct => ct.tags).filter(Boolean) || []
              const itemCategories = caseItem.case_categories?.map(cc => cc.categories).filter(Boolean) || []
              
              return (
                <Link
                  key={caseItem.id}
                  href={`/posts/${caseItem.slug}`}
                  className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {caseItem.title}
                  </h2>
                  
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 text-sm">
                    <div className="flex-1">
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-gray-600 font-medium">Tags:</span>
                          {tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {tag.name}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-gray-500 text-xs">
                              +{tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {tags.length > 0 && itemCategories.length > 0 && (
                      <div className="hidden md:block h-6 w-px bg-gray-300 mx-2"></div>
                    )}
                    
                    <div className="flex-shrink-0">
                      {itemCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center md:justify-end">
                          <span className="text-gray-600 font-medium">Court:</span>
                          {itemCategories.map((cat) => (
                            <span
                              key={cat.id}
                              className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
            <Link
              href="/posts"
              className="inline-block px-6 py-3 bg-[#050298] text-white rounded-lg hover:bg-[#0402c4] transition font-medium"
            >
              View All Cases
            </Link>
          </div>
        )}
        
        {/* Pagination */}
        {cases && cases.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
            <div className="flex flex-1 justify-between sm:hidden">
              {hasPrevPage ? (
                <Link
                  href={buildPageUrl(currentPage - 1)}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </Link>
              ) : (
                <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                  Previous
                </span>
              )}
              {hasNextPage ? (
                <Link
                  href={buildPageUrl(currentPage + 1)}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </Link>
              ) : (
                <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
            
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                  {hasPrevPage ? (
                    <Link
                      href={buildPageUrl(currentPage - 1)}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 cursor-not-allowed">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = idx + 1
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx
                    } else {
                      pageNum = currentPage - 2 + idx
                    }
                    
                    const isCurrentPage = pageNum === currentPage
                    
                    return (
                      <Link
                        key={pageNum}
                        href={buildPageUrl(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          isCurrentPage
                            ? 'z-10 bg-[#050298] text-white'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  })}
                  
                  {hasNextPage ? (
                    <Link
                      href={buildPageUrl(currentPage + 1)}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 cursor-not-allowed">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}