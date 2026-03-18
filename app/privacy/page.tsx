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

export default function PrivacyPolicy() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      {/* Top bar */}
      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, background: C.cardBg }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 36 }} />
        </a>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.textMuted, textDecoration: "none" }}>Terms</a>
          <a href="/dashboard" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.vermillion, textDecoration: "none", fontWeight: 500 }}>Dashboard →</a>
        </div>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 28, fontWeight: 700, color: C.deepInk, margin: "0 0 6px" }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.saffron, margin: "0 0 32px" }}>Last updated: June 2025</p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.textSecondary, lineHeight: 1.8, margin: "0 0 32px" }}>
            DamKoto is an AI-powered auto-reply tool for Bangladeshi Facebook commerce sellers. This Privacy Policy explains what data we collect, how we use it, and your rights.
          </p>

          {[
            { title: "1. What We Collect", body: "When you connect your Facebook Page, we collect: your Page ID, Page name, Page Access Token, incoming customer messages, and the product catalog you enter. We do not collect payment information." },
            { title: "2. How We Use Your Data", body: "We use your data solely to: detect customer comments on your Page, generate AI replies using the Claude API, and display your dashboard. We do not sell your data or use it for advertising." },
            { title: "3. Facebook Permissions", body: "We request pages_read_engagement and pages_manage_engagement to read and reply to comments, and pages_messaging to handle Messenger messages. All permissions are used solely to provide the auto-reply service." },
            { title: "4. Data Deletion", body: "To delete your data, email tasinrahman557@gmail.com with subject \"Data Deletion Request\" and your Facebook Page ID. We will delete all data within 7 business days. You can also revoke access via Facebook Settings → Security and Login → Business Integrations." },
            { title: "5. Third-Party Services", body: "We use Anthropic (Claude API) for reply generation and Supabase for database storage. Both are bound by their own privacy policies." },
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
