import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { code, redirectUri } = await request.json()

    // Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v22.0/oauth/access_token?` +
      `client_id=${process.env.NEXT_PUBLIC_META_APP_ID}` +
      `&client_secret=${process.env.META_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code=${code}`
    )
    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      return NextResponse.json({ success: false, error: 'No token received' })
    }

    // Get list of pages the user manages
    const pagesRes = await fetch(
      `https://graph.facebook.com/v22.0/me/accounts?access_token=${tokenData.access_token}`
    )
    const pagesData = await pagesRes.json()

    if (!pagesData.data || pagesData.data.length === 0) {
      return NextResponse.json({ success: false, error: 'No pages found' })
    }

    // Save each page to Supabase
    for (const page of pagesData.data) {
      const existing = await supabase
        .from('sellers')
        .select('id')
        .eq('facebook_page_id', page.id)
        .single()

      if (!existing.data) {
        await supabase.from('sellers').insert({
          facebook_page_id: page.id,
          page_name: page.name,
          page_access_token: page.access_token
        })
      } else {
        await supabase.from('sellers').update({
          page_access_token: page.access_token,
          page_name: page.name
        }).eq('facebook_page_id', page.id)
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json({ success: false, error: 'Server error' })
  }
}