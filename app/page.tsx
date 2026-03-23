'use client'
import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { const c = () => setMobile(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return mobile;
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useIsMobile();

  function connectFacebook() {
    setLoading(true);
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const scope = encodeURIComponent('pages_show_list,pages_messaging,pages_manage_metadata');
    window.location.href = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  }

  const hero = useInView(); const features = useInView(); const howItWorks = useInView();
  const stats = useInView(); const testimonials = useInView(); const pricing = useInView(); const cta = useInView();

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC", color: "#1A1208", overflow: "hidden" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
        .cta-btn { transition: all 0.3s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(232, 34, 10, 0.35) !important; }
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26, 18, 8, 0.08); }
        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: #E8220A !important; }
        .testimonial-card { transition: all 0.3s ease; }
        .testimonial-card:hover { transform: translateY(-3px); }
        .pattern-bg { background-image: radial-gradient(circle at 1px 1px, rgba(26,18,8,0.03) 1px, transparent 0); background-size: 24px 24px; }
      `}</style>

      {/* === NAVBAR === */}
      <nav style={{ padding: mobile ? "12px 16px" : "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F0E8D8", background: "rgba(255, 253, 249, 0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: mobile ? 32 : 38 }} />
        </a>
        {mobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#5C4F3A", padding: 4 }}>{menuOpen ? "✕" : "☰"}</button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="#features" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5C4F3A", textDecoration: "none", fontWeight: 500 }}>ফিচার</a>
            <a href="#how-it-works" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5C4F3A", textDecoration: "none", fontWeight: 500 }}>কিভাবে কাজ করে</a>
            <a href="#pricing" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5C4F3A", textDecoration: "none", fontWeight: 500 }}>প্ল্যান</a>
            <a href="/dashboard" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5C4F3A", textDecoration: "none", fontWeight: 500 }}>ড্যাশবোর্ড</a>
            <button onClick={connectFacebook} className="cta-btn" style={{ background: "#E8220A", color: "#fff", border: "none", padding: "9px 22px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(232,34,10,0.2)" }}>শুরু করুন — ফ্রি</button>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {mobile && menuOpen && (
        <div style={{ position: "fixed", top: 56, left: 0, right: 0, background: "#FFFDF9", borderBottom: "1px solid #F0E8D8", zIndex: 99, padding: 16, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 8px 20px rgba(26,18,8,0.08)" }}>
          <a href="#features" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, color: "#5C4F3A", textDecoration: "none", padding: "8px 0" }}>ফিচার</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, color: "#5C4F3A", textDecoration: "none", padding: "8px 0" }}>কিভাবে কাজ করে</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, color: "#5C4F3A", textDecoration: "none", padding: "8px 0" }}>প্ল্যান</a>
          <a href="/dashboard" style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, color: "#5C4F3A", textDecoration: "none", padding: "8px 0" }}>ড্যাশবোর্ড</a>
          <button onClick={connectFacebook} style={{ background: "#E8220A", color: "#fff", border: "none", padding: "12px 0", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>শুরু করুন — ফ্রি</button>
        </div>
      )}

      {/* === HERO === */}
      <section ref={hero.ref} className="pattern-bg" style={{ position: "relative", padding: mobile ? "48px 16px 40px" : "100px 24px 80px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className={hero.visible ? "fade-up" : ""} style={{ opacity: hero.visible ? undefined : 0, display: "inline-flex", alignItems: "center", gap: 8, background: "#FFFDF9", border: "1px solid #F0E8D8", padding: "6px 16px", borderRadius: 24, marginBottom: 20, boxShadow: "0 2px 12px rgba(26,18,8,0.04)" }}>
            <span style={{ fontSize: 14 }}>🇧🇩</span>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: mobile ? 11 : 13, color: "#5C4F3A" }}>বাংলাদেশের F-commerce সেলারদের জন্য তৈরি</span>
          </div>

          <h1 className={hero.visible ? "fade-up" : ""} style={{ opacity: hero.visible ? undefined : 0, animationDelay: "0.15s", fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 30 : 54, fontWeight: 700, lineHeight: 1.25, margin: "0 0 20px", color: "#1A1208" }}>
            কাস্টমার জিজ্ঞেস করে<br />
            <span style={{ color: "#E8220A", position: "relative", display: "inline-block" }}>
              "দাম কত?"
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 10, overflow: "visible" }} viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0 8 Q50 0, 100 6 Q150 12, 200 4" stroke="#F5A623" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>
            <br />
            <span style={{ fontSize: mobile ? 22 : 42, fontWeight: 600, color: "#5C4F3A" }}>DamKoto সাথে সাথে জবাব দেয়</span>
          </h1>

          <p className={hero.visible ? "fade-up" : ""} style={{ opacity: hero.visible ? undefined : 0, animationDelay: "0.3s", fontFamily: "'Tiro Bangla', serif", fontSize: mobile ? 14 : 18, color: "#8C7E6A", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.8, padding: mobile ? "0 8px" : 0 }}>
            আপনার Facebook Page-এর কমেন্ট ও মেসেজে AI-powered Bangla অটো-রিপ্লাই। আপনি ঘুমান, DamKoto বিক্রি করে।
          </p>

          <div className={hero.visible ? "fade-up" : ""} style={{ opacity: hero.visible ? undefined : 0, animationDelay: "0.45s" }}>
            <button onClick={connectFacebook} disabled={loading} className="cta-btn" style={{ background: "#E8220A", color: "#fff", border: "none", padding: mobile ? "14px 28px" : "18px 48px", borderRadius: 14, fontFamily: "'Tiro Bangla', serif", fontSize: mobile ? 15 : 18, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.6 : 1, boxShadow: "0 6px 28px rgba(232, 34, 10, 0.28)", width: mobile ? "100%" : "auto" }}>
              {loading ? 'কানেক্ট হচ্ছে...' : '🔗  Facebook Page কানেক্ট করুন'}
            </button>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: mobile ? 12 : 20, marginTop: 16, flexWrap: "wrap" }}>
              {["ফ্রিতে শুরু", "ক্রেডিট কার্ড লাগবে না", "২ মিনিটে সেটআপ"].map((t, i) => (
                <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#8C7E6A" }}>✓ {t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Preview - hide on mobile */}
        {!mobile && (
          <div className={hero.visible ? "fade-up" : ""} style={{ opacity: hero.visible ? undefined : 0, animationDelay: "0.6s", maxWidth: 900, margin: "60px auto 0", background: "#FFFDF9", border: "1px solid #F0E8D8", borderRadius: 16, padding: 6, boxShadow: "0 20px 60px rgba(26, 18, 8, 0.08)" }}>
            <div style={{ background: "#FAF7F1", borderRadius: 12, padding: "20px 24px", display: "flex", gap: 16 }}>
              <div style={{ width: 160, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "#E8220A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontFamily: "'Noto Serif Bengali', serif", fontWeight: 700, fontSize: 7, lineHeight: 1 }}>দাম<br/>কত?</span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#8C7E6A" }}>DamKoto</span>
                </div>
                {["ড্যাশবোর্ড", "মেসেজ", "অর্ডার", "প্রোডাক্ট"].map((item, i) => (
                  <div key={i} style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, fontFamily: "'Tiro Bangla', serif", color: i === 0 ? "#E8220A" : "#8C7E6A", background: i === 0 ? "#FEF0EE" : "transparent", marginBottom: 3 }}>{item}</div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
                  {[{ l: "আজকের অর্ডার", v: "১২", c: "#E8220A" }, { l: "আয়", v: "৳৪২,৫০০", c: "#1A1208" }, { l: "নতুন কাস্টমার", v: "৮", c: "#2E7D32" }].map((s, i) => (
                    <div key={i} style={{ background: "#FFFDF9", border: "1px solid #F0E8D8", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 9, color: "#8C7E6A" }}>{s.l}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#FFFDF9", border: "1px solid #F0E8D8", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 9, color: "#8C7E6A", marginBottom: 8 }}>সাম্প্রতিক মেসেজ</div>
                  {[{ name: "রাহেলা বেগম", msg: "এই শাড়িটার দাম কত?" }, { name: "নাসিমা আক্তার", msg: "ডেলিভারি চার্জ কত ঢাকায়?" }].map((m, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: i > 0 ? "1px solid #F0E8D8" : "none" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 12, background: "#FFF8EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, color: "#F5A623", flexShrink: 0 }}>{m.name[0]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 10, color: "#1A1208", fontWeight: 500 }}>{m.name}</div>
                        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 9, color: "#8C7E6A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.msg}</div>
                      </div>
                      <span style={{ fontSize: 8, background: "#FEF0EE", color: "#E8220A", padding: "2px 6px", borderRadius: 4, fontWeight: 600, flexShrink: 0 }}>⚡ AI replied</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* === STATS === */}
      <section ref={stats.ref} style={{ background: "#FFFDF9", borderTop: "1px solid #F0E8D8", borderBottom: "1px solid #F0E8D8", padding: mobile ? "28px 16px" : "40px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "center", gap: mobile ? 24 : 64, flexWrap: "wrap" }}>
          {[{ value: 500, suffix: "+", label: "সেলার ব্যবহার করছে" }, { value: 15000, suffix: "+", label: "অটো রিপ্লাই পাঠানো" }, { value: 98, suffix: "%", label: "কাস্টমার সন্তুষ্টি" }].map((s, i) => (
            <div key={i} className={stats.visible ? "fade-up" : ""} style={{ opacity: stats.visible ? undefined : 0, animationDelay: `${i * 0.15}s`, textAlign: "center", minWidth: mobile ? 90 : 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 24 : 36, fontWeight: 700, color: "#E8220A" }}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: mobile ? 11 : 13, color: "#8C7E6A", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURES === */}
      <section ref={features.ref} id="features" style={{ padding: mobile ? "48px 16px" : "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div className={features.visible ? "fade-up" : ""} style={{ opacity: features.visible ? undefined : 0, textAlign: "center", marginBottom: mobile ? 28 : 48 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#E8220A", textTransform: "uppercase", letterSpacing: 2 }}>ফিচারসমূহ</span>
          <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 22 : 34, fontWeight: 700, color: "#1A1208", margin: "12px 0 0" }}>আপনার ব্যবসার জন্য যা দরকার</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: mobile ? 12 : 20 }}>
          {[
            { icon: "⚡", title: "AI অটো রিপ্লাই", desc: "\"দাম কত?\" লিখলে DamKoto সাথে সাথে দাম, স্টক জানিয়ে দেয়। ২৪/৭ চালু।", bg: "#FEF0EE" },
            { icon: "📦", title: "অর্ডার ম্যানেজমেন্ট", desc: "Kanban বোর্ডে সব অর্ডার ট্র্যাক করুন — নতুন থেকে ডেলিভার্ড পর্যন্ত।", bg: "#E3F2FD" },
            { icon: "👥", title: "কাস্টমার ডেটাবেস", desc: "সব কাস্টমার অটো সেভ। VIP ট্যাগ, অর্ডার হিস্ট্রি এক জায়গায়।", bg: "#F3E5F5" },
            { icon: "🏷️", title: "প্রোডাক্ট ক্যাটালগ", desc: "পণ্যের তালিকা রাখুন — AI এটাই ব্যবহার করে রিপ্লাই দেয়।", bg: "#FFF8E1" },
            { icon: "🤖", title: "স্মার্ট AI সেটিংস", desc: "টোন ও ভাষা সিলেক্ট করুন — ফর্মাল, ক্যাজুয়াল, বাংলা বা English।", bg: "#E8F5E9" },
            { icon: "📊", title: "বিজনেস ড্যাশবোর্ড", desc: "সেল, রেভিনিউ, টপ প্রোডাক্ট — সব এক নজরে।", bg: "#FFEBEE" },
          ].map((f, i) => (
            <div key={i} className={`feature-card ${features.visible ? "fade-up" : ""}`} style={{ opacity: features.visible ? undefined : 0, animationDelay: `${i * 0.1}s`, background: "#FFFDF9", border: "1px solid #F0E8D8", borderRadius: 14, padding: mobile ? 20 : 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: "#1A1208", margin: "0 0 6px" }}>{f.title}</h3>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: "#5C4F3A", margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
	      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#8C7E6A", margin: "4px 0 0" }}>© 2026 Gazi Tasin Rahman. All rights reserved.</p>
            </div>
          ))}
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section ref={howItWorks.ref} id="how-it-works" style={{ background: "#FFFDF9", borderTop: "1px solid #F0E8D8", borderBottom: "1px solid #F0E8D8", padding: mobile ? "48px 16px" : "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className={howItWorks.visible ? "fade-up" : ""} style={{ opacity: howItWorks.visible ? undefined : 0, textAlign: "center", marginBottom: mobile ? 32 : 56 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#F5A623", textTransform: "uppercase", letterSpacing: 2 }}>সেটআপ</span>
            <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 22 : 34, fontWeight: 700, color: "#1A1208", margin: "12px 0 0" }}>মাত্র ৩টি ধাপে শুরু করুন</h2>
          </div>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "center", gap: mobile ? 28 : 40, position: "relative" }}>
            {!mobile && <div style={{ position: "absolute", top: 36, left: "22%", right: "22%", height: 2, background: "linear-gradient(to right, #F0E8D8, #E8220A, #F0E8D8)", zIndex: 0 }} />}
            {[
              { step: "১", title: "Page কানেক্ট করুন", desc: "Facebook Login দিয়ে আপনার Page যোগ করুন", icon: "🔗" },
              { step: "২", title: "প্রোডাক্ট যোগ করুন", desc: "পণ্যের নাম, দাম ও স্টক তথ্য দিন", icon: "📝" },
              { step: "৩", title: "অটো রিপ্লাই চালু!", desc: "DamKoto AI এখন থেকে রিপ্লাই দেবে", icon: "🚀" },
            ].map((s, i) => (
              <div key={i} className={howItWorks.visible ? "fade-up" : ""} style={{ opacity: howItWorks.visible ? undefined : 0, animationDelay: `${i * 0.2}s`, textAlign: "center", flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: mobile ? "row" : "column", alignItems: "center", gap: mobile ? 16 : 0 }}>
                <div style={{ width: mobile ? 56 : 72, height: mobile ? 56 : 72, borderRadius: "50%", background: "linear-gradient(135deg, #E8220A, #F5A623)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 8px 24px rgba(232,34,10,0.2)", ...(mobile ? {} : { margin: "0 auto 16px" }) }}>
                  <span style={{ fontSize: mobile ? 22 : 28 }}>{s.icon}</span>
                </div>
                <div style={{ textAlign: mobile ? "left" : "center" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#E8220A", marginBottom: 4 }}>ধাপ {s.step}</div>
                  <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: "#1A1208", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: "#8C7E6A" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section ref={testimonials.ref} style={{ padding: mobile ? "48px 16px" : "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div className={testimonials.visible ? "fade-up" : ""} style={{ opacity: testimonials.visible ? undefined : 0, textAlign: "center", marginBottom: mobile ? 24 : 48 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#E8220A", textTransform: "uppercase", letterSpacing: 2 }}>সেলারদের মতামত</span>
          <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 22 : 34, fontWeight: 700, color: "#1A1208", margin: "12px 0 0" }}>যারা ব্যবহার করছেন, তারা কী বলছেন</h2>
        </div>
        <div style={{ display: "flex", gap: 16, overflowX: mobile ? "auto" : "visible", paddingBottom: mobile ? 8 : 0 }}>
          {[
            { name: "ফারহানা আক্তার", shop: "ফারহানার বুটিক", text: "রাতে অর্ডার মিস হত, এখন DamKoto সব রিপ্লাই দিচ্ছে। সেল ৪০% বেড়ে গেছে!" },
            { name: "তানভীর হাসান", shop: "TH Electronics", text: "কমেন্টে দাম জিজ্ঞেস করলে আগে ১ ঘণ্টা পরে রিপ্লাই দিতাম। এখন ১ সেকেন্ডে হয়।" },
            { name: "নুসরাত জাহান", shop: "নুসরাতের গহনা", text: "Setup মাত্র ৫ মিনিট লেগেছে। বাংলায় রিপ্লাই দেয়, কাস্টমার খুশি!" },
          ].map((t, i) => (
            <div key={i} className={`testimonial-card ${testimonials.visible ? "fade-up" : ""}`} style={{ opacity: testimonials.visible ? undefined : 0, animationDelay: `${i * 0.15}s`, background: "#FFFDF9", border: "1px solid #F0E8D8", borderRadius: 14, padding: 20, minWidth: mobile ? 260 : 0, flex: mobile ? "0 0 260px" : 1 }}>
              <div style={{ color: "#F5A623", fontSize: 14, marginBottom: 10, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: "#5C4F3A", lineHeight: 1.8, margin: "0 0 14px" }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: "linear-gradient(135deg, #FEF0EE, #FFF8EB)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: "#E8220A" }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: "#1A1208" }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#8C7E6A" }}>{t.shop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === PRICING === */}
      <section ref={pricing.ref} id="pricing" style={{ background: "#FFFDF9", borderTop: "1px solid #F0E8D8", borderBottom: "1px solid #F0E8D8", padding: mobile ? "48px 16px" : "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className={pricing.visible ? "fade-up" : ""} style={{ opacity: pricing.visible ? undefined : 0, textAlign: "center", marginBottom: mobile ? 28 : 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#F5A623", textTransform: "uppercase", letterSpacing: 2 }}>প্রাইসিং</span>
            <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 22 : 34, fontWeight: 700, color: "#1A1208", margin: "12px 0 0" }}>সহজ ও সাশ্রয়ী প্ল্যান</h2>
          </div>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: mobile ? 16 : 20, alignItems: mobile ? "stretch" : "flex-start", justifyContent: "center" }}>
            {[
              { name: "ফ্রি", price: "৳০", period: "চিরকাল", features: ["৫০ অটো রিপ্লাই/দিন", "বেসিক কাস্টমার লিস্ট", "১টি Facebook Page"], popular: false, cta: "ফ্রিতে শুরু করুন" },
              { name: "গ্রোথ", price: "৳৯৯৯", period: "/মাস", features: ["আনলিমিটেড অটো রিপ্লাই", "অর্ডার ম্যানেজমেন্ট", "কাস্টমার ইনসাইটস", "কুরিয়ার ইন্টিগ্রেশন", "bKash ইন্টিগ্রেশন"], popular: true, cta: "শুরু করুন" },
              { name: "বিজনেস", price: "৳২,৯৯৯", period: "/মাস", features: ["সব কিছু + হোয়াইট লেবেল", "মাল্টি-পেজ সাপোর্ট", "ডেডিকেটেড সাপোর্ট", "কাস্টম AI ট্রেনিং"], popular: false, cta: "যোগাযোগ করুন" },
            ].map((plan, i) => (
              <div key={i} className={pricing.visible ? "fade-up" : ""} style={{ opacity: pricing.visible ? undefined : 0, animationDelay: `${i * 0.15}s`, background: plan.popular ? "linear-gradient(135deg, #1A1208, #2C2218)" : "#FFFDF9", border: plan.popular ? "2px solid #E8220A" : "1px solid #F0E8D8", borderRadius: 16, padding: mobile ? 24 : 32, position: "relative", flex: 1, transform: !mobile && plan.popular ? "scale(1.04)" : "none" }}>
                {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#E8220A", color: "#fff", padding: "4px 16px", borderRadius: 20, fontFamily: "'Tiro Bangla', serif", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>সবচেয়ে জনপ্রিয়</div>}
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: plan.popular ? "#F5A623" : "#1A1208", marginBottom: 4 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 28 : 36, fontWeight: 700, color: plan.popular ? "#fff" : "#1A1208" }}>{plan.price}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: plan.popular ? "rgba(255,255,255,0.5)" : "#8C7E6A" }}>{plan.period}</span>
                </div>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.8)" : "#5C4F3A" }}>
                    <span style={{ color: plan.popular ? "#F5A623" : "#2E7D32", fontSize: 12 }}>✓</span> {f}
                  </div>
                ))}
                <button onClick={connectFacebook} className="cta-btn" style={{ width: "100%", marginTop: 16, padding: "12px 0", border: plan.popular ? "none" : "1px solid #F0E8D8", borderRadius: 10, fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, cursor: "pointer", background: plan.popular ? "#E8220A" : "transparent", color: plan.popular ? "#fff" : "#1A1208" }}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section ref={cta.ref} style={{ padding: mobile ? "48px 16px" : "80px 24px", textAlign: "center" }}>
        <div className={cta.visible ? "fade-up" : ""} style={{ opacity: cta.visible ? undefined : 0, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 22 : 34, fontWeight: 700, color: "#1A1208", margin: "0 0 16px" }}>
            আজই আপনার <span style={{ color: "#E8220A" }}>F-commerce</span> অটোমেট করুন
          </h2>
          <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: mobile ? 13 : 15, color: "#8C7E6A", margin: "0 0 28px", lineHeight: 1.8 }}>
            প্রতিদিন শত শত &ldquo;দাম কত?&rdquo; কমেন্টের উত্তর দিতে গিয়ে ক্লান্ত? DamKoto-কে কাজটা করতে দিন।
          </p>
          <button onClick={connectFacebook} className="cta-btn" style={{ background: "linear-gradient(135deg, #E8220A, #C81D08)", color: "#fff", border: "none", padding: mobile ? "14px 32px" : "18px 56px", borderRadius: 14, fontFamily: "'Tiro Bangla', serif", fontSize: mobile ? 15 : 18, fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 32px rgba(232, 34, 10, 0.3)", width: mobile ? "100%" : "auto" }}>
            এখনই শুরু করুন — ফ্রি →
          </button>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer style={{ borderTop: "1px solid #F0E8D8", padding: mobile ? "24px 16px" : "32px 40px", background: "#FFFDF9" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "center" : "center", gap: mobile ? 16 : 0, textAlign: mobile ? "center" : "left" }}>
          <div>
            <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 28, marginBottom: 6 }} />
            <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: "#8C7E6A", margin: 0 }}>দাম কত থেকে শুরু, বাকিটা আমরা সামলাই ❤️</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/privacy" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8C7E6A", textDecoration: "none" }}>Privacy</a>
            <a href="/terms" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8C7E6A", textDecoration: "none" }}>Terms</a>
            <a href="/dashboard" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8C7E6A", textDecoration: "none" }}>Dashboard</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
