import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  // 1. Create the Supabase client
  const supabase = await createClient()

  // 2. Sign out (this clears the cookies)
  await supabase.auth.signOut()

  // 3. Redirect user back to the Login page
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  })
}