const C = {
  vermillion: "#E8220A",
  vermillionLight: "#FEF0EE",
  saffron: "#F5A623",
  offWhite: "#FDF6EC",
  deepInk: "#1A1208",
  border: "#F0E8D8",
  cardBg: "#FFFDF9",
  textMuted: "#8C7E6A",
  textSecondary: "#5C4F3A",
};

export default function TermsOfService() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      {/* Top bar */}
      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, background: C.cardBg }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 36 }} />
        </a>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/privacy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.textMuted, textDecoration: "none" }}>Privacy</a>
          <a href="/dashboard" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.vermillion, textDecoration: "none", fontWeight: 500 }}>Dashboard →</a>
        </div>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 28, fontWeight: 700, color: C.deepInk, margin: "0 0 6px" }}>Terms of Service</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.saffron, margin: "0 0 32px" }}>Last updated: June 2025</p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.textSecondary, lineHeight: 1.8, margin: "0 0 32px" }}>
            By connecting your Facebook Page to DamKoto, you agree to these Terms of Service.
          </p>

          {[
            { title: "1. What DamKoto Does", body: "DamKoto monitors comments and messages on your Facebook Page and automatically responds using your product catalog and the Claude AI model." },
            { title: "2. Your Responsibilities", body: "You are responsible for the accuracy of your product catalog, compliance with Facebook's Terms of Service, and all customer interactions on your Page. Do not use DamKoto to send spam or misleading information." },
            { title: "3. AI-Generated Replies", body: "AI replies may occasionally be incorrect. DamKoto is a tool to assist your business, not a replacement for human judgment. We are not liable for losses resulting from AI-generated replies." },
            { title: "4. Service Availability", body: "We aim for reliable service but do not guarantee 100% uptime. We are not liable for missed messages during outages." },
            { title: "5. Termination", body: "You may disconnect your Page at any time. We may suspend accounts that violate these Terms or Facebook's Platform Policies." },
            { title: "6. Contact", body: "Email: tasinrahman557@gmail.com\nWebsite: dam-koto-eight.vercel.app" },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: C.deepInk, margin: "0 0 10px" }}>{section.title}</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.textSecondary, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{section.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
