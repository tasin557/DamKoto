'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Connecting your Facebook Page...')

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      setStatus('Connection cancelled. Redirecting...')
      setTimeout(() => router.push('/'), 2000)
      return
    }

    if (code) {
      handleCallback(code)
    }
  }, [searchParams])

  async function handleCallback(code: string) {
    try {
      setStatus('Exchanging token with Facebook...')
      const response = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri: window.location.origin + '/auth/callback' })
      })
      const data = await response.json()
      if (data.success) {
        setStatus('Connected! Redirecting to dashboard...')
        setTimeout(() => router.push('/dashboard'), 1500)
      } else {
        setStatus('Something went wrong. Please try again.')
        setTimeout(() => router.push('/'), 2000)
      }
    } catch (err) {
      setStatus('Connection failed. Please try again.')
      setTimeout(() => router.push('/'), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-6">🔗</div>
        <h2 className="text-2xl font-bold mb-3">DamKoto</h2>
        <p className="text-gray-400 text-lg">{status}</p>
        <div className="mt-6 flex justify-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
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