export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px", fontFamily: "sans-serif", color: "#1a1208", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: "#1a1208" }}>Privacy Policy</h1>
      <p style={{ color: "#7a6548", marginBottom: 40 }}>Last updated: June 2025</p>
      <p style={{ marginBottom: 24, color: "#1a1208" }}>DamKoto is an AI-powered auto-reply tool for Bangladeshi Facebook commerce sellers. This Privacy Policy explains what data we collect, how we use it, and your rights.</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "#1a1208" }}>1. What We Collect</h2>
      <p style={{ color: "#1a1208" }}>When you connect your Facebook Page, we collect: your Page ID, Page name, Page Access Token, incoming customer messages, and the product catalog you enter. We do not collect payment information.</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "#1a1208" }}>2. How We Use Your Data</h2>
      <p style={{ color: "#1a1208" }}>We use your data solely to: detect customer comments on your Page, generate AI replies using the Claude API, and display your dashboard. We do not sell your data or use it for advertising.</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "#1a1208" }}>3. Facebook Permissions</h2>
      <p style={{ color: "#1a1208" }}>We request pages_read_engagement and pages_manage_engagement to read and reply to comments, and pages_messaging to handle Messenger messages. All permissions are used solely to provide the auto-reply service.</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "#1a1208" }}>4. Data Deletion</h2>
      <p style={{ color: "#1a1208" }}>To delete your data, email tasinrahman557@gmail.com with subject "Data Deletion Request" and your Facebook Page ID. We will delete all data within 7 business days. You can also revoke access via Facebook Settings → Security and Login → Business Integrations.</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "#1a1208" }}>5. Third-Party Services</h2>
      <p style={{ color: "#1a1208" }}>We use Anthropic (Claude API) for reply generation and Supabase for database storage. Both are bound by their own privacy policies.</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "#1a1208" }}>6. Contact</h2>
      <p style={{ color: "#1a1208" }}>Email: tasinrahman557@gmail.com</p>
      <p style={{ color: "#1a1208" }}>Website: dam-koto-eight.vercel.app</p>
    </main>
    </div>
  );
}
