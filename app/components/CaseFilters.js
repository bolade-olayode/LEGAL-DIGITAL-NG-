'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CaseFilters({ categories, years, letters }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const selectedYear = searchParams.get('year') || ''
  const selectedCategory = searchParams.get('category') || ''
  const selectedLetter = searchParams.get('letter') || ''
  
  const hasActiveFilters = selectedYear || selectedCategory || selectedLetter
  
  const buildFilterUrl = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Reset to page 1 when filters change
    params.delete('page')
    
    return `/posts?${params.toString()}`
  }
  
  const clearAllFilters = () => {
    router.push('/posts')
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Cases</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Year Filter */}
        <div>
          <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-2">
            📅 Year
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => router.push(buildFilterUrl('year', e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#050298] focus:border-transparent"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Filter */}
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            ⚖️ Court
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => router.push(buildFilterUrl('category', e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#050298] focus:border-transparent"
          >
            <option value="">All Courts</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Letter Filter */}
        <div>
          <label htmlFor="letter-filter" className="block text-sm font-medium text-gray-700 mb-2">
            🔤 First Letter
          </label>
          <select
            id="letter-filter"
            value={selectedLetter}
            onChange={(e) => router.push(buildFilterUrl('letter', e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#050298] focus:border-transparent"
          >
            <option value="">All Letters</option>
            {letters.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          {selectedYear && (
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Year: {selectedYear}
              <button
                onClick={() => router.push(buildFilterUrl('year', ''))}
                className="hover:text-blue-900 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {categories.find(c => c.slug === selectedCategory)?.name}
              <button
                onClick={() => router.push(buildFilterUrl('category', ''))}
                className="hover:text-green-900 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {selectedLetter && (
            <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Letter: {selectedLetter}
              <button
                onClick={() => router.push(buildFilterUrl('letter', ''))}
                className="hover:text-purple-900 font-bold"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}