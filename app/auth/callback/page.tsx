'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const C = {
  offWhite: "#FDF6EC",
  deepInk: "#1A1208",
  vermillion: "#E8220A",
  saffron: "#F5A623",
  textMuted: "#8C7E6A",
  border: "#F0E8D8",
  cardBg: "#FFFDF9",
};

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('আপনার Facebook Page কানেক্ট হচ্ছে...')

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      setStatus('কানেকশন বাতিল হয়েছে। রিডাইরেক্ট হচ্ছে...')
      setTimeout(() => router.push('/'), 2000)
      return
    }

    if (code) {
      handleCallback(code)
    }
  }, [searchParams])

  async function handleCallback(code: string) {
    try {
      setStatus('Facebook-এর সাথে টোকেন এক্সচেঞ্জ হচ্ছে...')
      const response = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri: window.location.origin + '/auth/callback' })
      })
      const data = await response.json()
      if (data.success) {
        // Store seller info in localStorage
        localStorage.setItem('damkoto_seller_id', data.seller_id || '')
        localStorage.setItem('damkoto_page_id', data.page_id || '')
        localStorage.setItem('damkoto_page_name', data.page_name || '')
        
        setStatus('কানেক্ট হয়েছে! ড্যাশবোর্ডে যাচ্ছে...')
        setTimeout(() => router.push('/dashboard'), 1500)
      } else {
        setStatus('কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।')
        setTimeout(() => router.push('/'), 2000)
      }
    } catch (err) {
      setStatus('কানেকশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
      setTimeout(() => router.push('/'), 2000)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ marginBottom: 24 }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 48, margin: "0 auto" }} />
        </div>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔗</div>
          <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 16, color: C.deepInk, margin: "0 0 16px" }}>{status}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: 4, background: C.vermillion,
                animation: "bounce 1s infinite",
                animationDelay: `${i * 150}ms`,
              }} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  )
}
