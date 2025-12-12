'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
// ✅ FIX: Import the existing object, don't try to import a function that doesn't exist
import { supabase } from '@/lib/supabase'

export default function CaseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Note: We don't need "const supabase = createClient()" anymore 
  // because we imported the 'supabase' object directly above.
  
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const currentYear = searchParams.get('year') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentLetter = searchParams.get('letter') || ''

  useEffect(() => {
    async function fetchFilters() {
      try {
        // Use the imported supabase object directly
        const { data, error } = await supabase.from('categories').select('name')
        if (error) throw error
        
        setCategories(data?.sort((a, b) => a.name.localeCompare(b.name)) || [])
      } catch (err) {
        console.error('Error fetching filters:', err)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchFilters()
  }, [])

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'All') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/posts?${params.toString()}`)
  }

  const years = Array.from({ length: 66 }, (_, i) => 2025 - i)
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Year Filter */}
      <div className="flex-1">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">📅 Year</label>
        <select 
          value={currentYear}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#050298] focus:border-transparent outline-none transition-all"
        >
          <option value="All">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Court Filter */}
      <div className="flex-1">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">⚖️ Court</label>
        <select 
          value={currentCategory}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          disabled={loading}
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#050298] focus:border-transparent outline-none transition-all disabled:opacity-50"
        >
          <option value="All">All Courts</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Letter Filter */}
      <div className="flex-1">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">🔤 First Letter</label>
        <select 
          value={currentLetter}
          onChange={(e) => handleFilterChange('letter', e.target.value)}
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#050298] focus:border-transparent outline-none transition-all"
        >
          <option value="All">All Letters</option>
          {letters.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </div>
  )
}