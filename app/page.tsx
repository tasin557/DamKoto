'use client'
import { useState } from 'react'

const C = {
  vermillion: "#E8220A",
  vermillionLight: "#FEF0EE",
  saffron: "#F5A623",
  saffronLight: "#FFF8EB",
  offWhite: "#FDF6EC",
  deepInk: "#1A1208",
  border: "#F0E8D8",
  cardBg: "#FFFDF9",
  surfaceBg: "#FAF7F1",
  textMuted: "#8C7E6A",
  textSecondary: "#5C4F3A",
};

export default function Landing() {
  const [loading, setLoading] = useState(false)

  function connectFacebook() {
    setLoading(true)
    const appId = process.env.NEXT_PUBLIC_META_APP_ID
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
    const scope = encodeURIComponent('pages_show_list,pages_messaging,pages_manage_metadata')
    const url = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
    window.location.href = url
  }

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, color: C.deepInk }}>

      {/* Navbar */}
      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, background: C.cardBg }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 36 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/privacy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.textMuted, textDecoration: "none" }}>Privacy</a>
          <a href="/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.textMuted, textDecoration: "none" }}>Terms</a>
          <button
            onClick={connectFacebook}
            style={{ background: C.vermillion, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            শুরু করুন — ফ্রি
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: C.vermillionLight, color: C.vermillion, fontSize: 13, padding: "4px 16px", borderRadius: 20, marginBottom: 24, fontFamily: "'Tiro Bangla', serif", fontWeight: 500 }}>
          🇧🇩 বাংলাদেশের F-commerce সেলারদের জন্য তৈরি
        </div>
        <h1 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 48, fontWeight: 700, lineHeight: 1.3, margin: "0 0 24px", color: C.deepInk }}>
          "দাম কত?" — এখন থেকে<br />
          <span style={{ color: C.vermillion }}>DamKoto জবাব দেবে</span>
        </h1>
        <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 18, color: C.textSecondary, maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.8 }}>
          আপনার Facebook Page-এর সব comment ও message-এ automatically Bangla-তে reply দেবে। আপনি শুধু ব্যবসা বাড়ান।
        </p>
        <button
          onClick={connectFacebook}
          disabled={loading}
          style={{ background: C.vermillion, color: "#fff", border: "none", padding: "16px 40px", borderRadius: 12, fontFamily: "'Tiro Bangla', serif", fontSize: 17, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.6 : 1, transition: "opacity 0.2s", boxShadow: "0 4px 20px rgba(232, 34, 10, 0.25)" }}>
          {loading ? 'কানেক্ট হচ্ছে...' : '🔗 আপনার Facebook Page কানেক্ট করুন — ফ্রি'}
        </button>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.textMuted, marginTop: 16 }}>কোনো ক্রেডিট কার্ড লাগবে না • ফ্রিতে শুরু করুন</p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { icon: "⚡", title: "অটো রিপ্লাই", desc: "Customer লিখলে \"দাম কত?\" — DamKoto সাথে সাথে price, stock সব জানিয়ে দেবে।" },
            { icon: "📦", title: "অর্ডার ট্র্যাকিং", desc: "সব order এক জায়গায়। কে order দিয়েছে, কে pay করেছে, কার delivery pending — সব দেখুন।" },
            { icon: "👥", title: "কাস্টমার ডেটাবেস", desc: "আপনার সব customer automatically save হয়। Facebook বন্ধ হলেও আপনার data থাকবে।" },
          ].map((f, i) => (
            <div key={i} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 16, fontWeight: 600, color: C.deepInk, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary, margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: C.cardBg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 28, fontWeight: 600, color: C.deepInk, margin: "0 0 40px" }}>কিভাবে কাজ করে?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
            {[
              { step: "১", title: "Page কানেক্ট করুন", desc: "Facebook Page লিংক করুন" },
              { step: "২", title: "প্রোডাক্ট যোগ করুন", desc: "আপনার পণ্যের তালিকা দিন" },
              { step: "৩", title: "অটো রিপ্লাই চালু!", desc: "DamKoto AI জবাব দেবে" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: C.vermillionLight, color: C.vermillion, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontFamily: "'Noto Serif Bengali', serif", fontSize: 20, fontWeight: 700 }}>{s.step}</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 26, fontWeight: 600, color: C.deepInk, margin: "0 0 16px" }}>আজই শুরু করুন</h2>
        <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: C.textSecondary, margin: "0 0 24px" }}>৫ মিনিটেই সেটআপ। কোনো টেকনিক্যাল জ্ঞান লাগবে না।</p>
        <button
          onClick={connectFacebook}
          style={{ background: C.saffron, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 10, fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(245, 166, 35, 0.3)" }}>
          ফ্রিতে শুরু করুন →
        </button>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.cardBg }}>
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted }}>
          DamKoto — দাম কত থেকে শুরু, বাকিটা আমরা সামলাই ❤️
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="/privacy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.textMuted, textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.textMuted, textDecoration: "none" }}>Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}
