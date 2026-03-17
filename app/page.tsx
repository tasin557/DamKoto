'use client'
import { useState } from 'react'

export default function Landing() {
  const [loading, setLoading] = useState(false)

  function connectFacebook() {
    setLoading(true)
    const appId = process.env.NEXT_PUBLIC_META_APP_ID
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
    const scope = encodeURIComponent('pages_show_list,pages_messaging,pages_manage_metadata,pages_read_engagement')
    const url = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div>
          <span className="text-xl font-bold text-green-400">DamKoto</span>
          <span className="text-gray-500 text-sm ml-2">🛒</span>
        </div>
        <button
          onClick={connectFacebook}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
          Get Started Free
        </button>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-green-900 text-green-300 text-sm px-3 py-1 rounded-full mb-6">
          🇧🇩 Made for Bangladeshi F-commerce sellers
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          "দাম কত?" — এখন থেকে<br />
          <span className="text-green-400">DamKoto জবাব দেবে</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          আপনার Facebook Page-এর সব comment ও message-এ automatically Bangla-তে reply দেবে। 
          আপনি শুধু ব্যবসা বাড়ান।
        </p>
        <button
          onClick={connectFacebook}
          disabled={loading}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition disabled:opacity-50">
          {loading ? 'Connecting...' : '🔗 Connect Your Facebook Page — Free'}
        </button>
        <p className="text-gray-500 text-sm mt-4">No credit card required • Free to start</p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Auto Reply</h3>
            <p className="text-gray-400 text-sm">
              Customer লিখলে "দাম কত?" — DamKoto সাথে সাথে price, stock সব জানিয়ে দেবে।
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold text-lg mb-2">Order Tracking</h3>
            <p className="text-gray-400 text-sm">
              সব order এক জায়গায়। কে order দিয়েছে, কে pay করেছে, কার delivery pending — সব দেখুন।
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-lg mb-2">Customer Database</h3>
            <p className="text-gray-400 text-sm">
              আপনার সব customer automatically save হয়। Facebook বন্ধ হলেও আপনার data থাকবে।
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-6 text-center text-gray-500 text-sm">
        DamKoto — দাম কত থেকে শুরু, বাকিটা আমরা সামলাই 💚
      </div>

    </div>
  )
}