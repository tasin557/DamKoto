"use client";

import { useState } from "react";

const COLORS = {
  vermillion: "#E8220A",
  vermillionLight: "#FEF0EE",
  saffron: "#F5A623",
  saffronLight: "#FFF8EB",
  offWhite: "#FDF6EC",
  deepInk: "#1A1208",
  border: "#F0E8D8",
  borderDark: "#E5D9C3",
  cardBg: "#FFFDF9",
  surfaceBg: "#FAF7F1",
  textMuted: "#8C7E6A",
  textSecondary: "#5C4F3A",
  greenSoft: "#E8F5E9",
  greenText: "#2E7D32",
  yellowSoft: "#FFF8E1",
  yellowText: "#F57F17",
  redSoft: "#FFEBEE",
  redText: "#C62828",
  blueSoft: "#E3F2FD",
  blueText: "#1565C0",
  purpleSoft: "#F3E5F5",
  purpleText: "#6A1B9A",
  pinkSoft: "#FCE4EC",
  pinkText: "#AD1457",
};

const navItems = [
  { id: "dashboard", label: "ড্যাশবোর্ড", icon: "grid" },
  { id: "messages", label: "মেসেজ", icon: "message" },
  { id: "orders", label: "অর্ডার", icon: "order" },
  { id: "products", label: "প্রোডাক্ট", icon: "product" },
  { id: "customers", label: "কাস্টমার", icon: "customer" },
  { id: "courier", label: "কুরিয়ার", icon: "courier" },
  { id: "payment", label: "পেমেন্ট", icon: "payment" },
  { id: "hisab", label: "হিসাব", icon: "hisab" },
  { id: "autoreply", label: "অটো-রিপ্লাই", icon: "autoreply" },
  { id: "settings", label: "সেটিংস", icon: "settings" },
];

function NavIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? COLORS.vermillion : COLORS.textMuted;
  const s = { width: 20, height: 20, fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, JSX.Element> = {
    grid: <svg {...s} viewBox="0 0 20 20"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg>,
    message: <svg {...s} viewBox="0 0 20 20"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H7l-4 3V5a1 1 0 011-1z"/></svg>,
    order: <svg {...s} viewBox="0 0 20 20"><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 6h6M7 10h6M7 14h3"/></svg>,
    product: <svg {...s} viewBox="0 0 20 20"><rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/><rect x="2" y="11" width="7" height="7" rx="1"/><rect x="11" y="11" width="7" height="7" rx="1"/></svg>,
    customer: <svg {...s} viewBox="0 0 20 20"><circle cx="7" cy="7" r="3"/><circle cx="14" cy="7" r="2.5"/><path d="M1 17c0-3 2.5-5 6-5s6 2 6 5"/><path d="M13 12c2 0 4.5 1.5 4.5 4"/></svg>,
    courier: <svg {...s} viewBox="0 0 20 20"><rect x="1" y="4" width="11" height="10" rx="1"/><path d="M12 8h4l3 3v3h-7"/><circle cx="5" cy="15.5" r="1.5"/><circle cx="15" cy="15.5" r="1.5"/></svg>,
    payment: <svg {...s} viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 8h16"/><path d="M6 12h3"/></svg>,
    hisab: <svg {...s} viewBox="0 0 20 20"><path d="M3 16V4"/><path d="M3 16h14"/><path d="M6 12l3-4 3 2 4-6"/></svg>,
    autoreply: <svg {...s} viewBox="0 0 20 20"><path d="M4 8a6 6 0 0112 0"/><path d="M10 2v6l3 2"/><path d="M3 14h14a1 1 0 010 2H3a1 1 0 010-2z"/></svg>,
    settings: <svg {...s} viewBox="0 0 20 20"><circle cx="10" cy="10" r="3"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M3.5 16.5l1.4-1.4M15.1 4.9l1.4-1.4"/></svg>,
  };
  return icons[type] || null;
}

function Badge({ text, variant = "green" }: { text: string; variant?: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    green: { bg: COLORS.greenSoft, color: COLORS.greenText },
    yellow: { bg: COLORS.yellowSoft, color: COLORS.yellowText },
    red: { bg: COLORS.redSoft, color: COLORS.redText },
    blue: { bg: COLORS.blueSoft, color: COLORS.blueText },
    purple: { bg: COLORS.purpleSoft, color: COLORS.purpleText },
    pink: { bg: COLORS.pinkSoft, color: COLORS.pinkText },
    gray: { bg: "#F0ECE3", color: COLORS.textSecondary },
  };
  const s = styles[variant] || styles.green;
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: s.bg, color: s.color, fontFamily: "'Tiro Bangla', serif", whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

function Card({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, ...style }}>
      {children}
    </div>
  );
}

function ComingSoonOverlay({ pageName, children }: { pageName: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ filter: "blur(2px)", opacity: 0.4, pointerEvents: "none" }}>{children}</div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
        <div style={{ background: COLORS.saffronLight, border: `2px solid ${COLORS.saffron}`, borderRadius: 16, padding: "32px 48px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🚧</div>
          <h2 style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: COLORS.deepInk, margin: "0 0 8px" }}>শীঘ্রই আসছে</h2>
          <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textMuted, margin: 0 }}>{pageName} ফিচারটি শীঘ্রই চালু হবে</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48, color: COLORS.textMuted }}>
      <div style={{ width: 64, height: 64, borderRadius: 32, background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 28, color: COLORS.textMuted }}>
        {icon}
      </div>
      <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 16, fontWeight: 600, color: COLORS.textSecondary, margin: "0 0 4px" }}>{title}</p>
      <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.textMuted, margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function DashboardHome() {
  const orderPipeline = [
    { label: "নতুন", count: 0, color: COLORS.vermillion, bg: COLORS.redSoft },
    { label: "কনফার্ম", count: 0, color: COLORS.blueText, bg: COLORS.blueSoft },
    { label: "পেমেন্ট", count: 0, color: COLORS.purpleText, bg: COLORS.purpleSoft },
    { label: "শিপড", count: 0, color: COLORS.yellowText, bg: COLORS.yellowSoft },
    { label: "ডেলিভার্ড", count: 0, color: COLORS.greenText, bg: COLORS.greenSoft },
    { label: "রিটার্ন", count: 0, color: COLORS.pinkText, bg: COLORS.pinkSoft },
  ];
  const topProducts = [
    { name: "জামদানি শাড়ি", price: "৳৩,৫০০", sales: "42 বিক্রি" },
    { name: "কটন থ্রী-পিস", price: "৳১,২০০", sales: "28 বিক্রি" },
    { name: "গোল্ড প্লেটেড নেকলেস", price: "৳৮৫০", sales: "15 বিক্রি" },
  ];
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary }}>আজকের সারসংক্ষেপ</span>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.redSoft, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.vermillion, fontSize: 14 }}>📊</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div><div style={{ fontSize: 28, fontWeight: 700, color: COLORS.deepInk, fontFamily: "'DM Sans', sans-serif" }}>0</div><div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'Tiro Bangla', serif" }}>অর্ডার</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 700, color: COLORS.deepInk, fontFamily: "'DM Sans', sans-serif" }}>৳0</div><div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'Tiro Bangla', serif" }}>আয়</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, color: COLORS.yellowText, fontSize: 12, fontFamily: "'Tiro Bangla', serif" }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.yellowText, display: "inline-block" }}></span> 0 পেন্ডিং
          </div>
        </Card>

        <Card>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary, marginBottom: 16 }}>অর্ডার পাইপলাইন</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {orderPipeline.map((p, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontFamily: "'Tiro Bangla', serif", background: p.bg, color: p.color, fontWeight: 500 }}>
                {p.label} {p.count}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary }}>সাম্প্রতিক মেসেজ</span>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.vermillion, cursor: "pointer" }}>সব দেখুন →</span>
          </div>
          <EmptyState icon="💬" title="কোনো মেসেজ নেই" subtitle="নতুন মেসেজ এখানে দেখাবে" />
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary }}>টপ প্রোডাক্ট</span>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.vermillion, cursor: "pointer" }}>সব প্রোডাক্ট →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topProducts.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: COLORS.textMuted }}>📦</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.deepInk, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textMuted }}>{p.price}</div>
                </div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted }}>{p.sales}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary }}>কাস্টমার হাইলাইট</span>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.vermillion, cursor: "pointer" }}>কাস্টমার তালিকা →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[{ n: "0", l: "নতুন আজকে" }, { n: "3", l: "রিপিট" }, { n: "5", l: "মোট" }].map((c, i) => (
              <div key={i} style={{ textAlign: "center", padding: 12, background: COLORS.surfaceBg, borderRadius: 10 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.deepInk, fontFamily: "'DM Sans', sans-serif" }}>{c.n}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'Tiro Bangla', serif", marginTop: 2 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary }}>কুরিয়ার স্ট্যাটাস</span>
            <span style={{ color: COLORS.textMuted, fontSize: 14 }}>📋</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[{ n: "0", l: "ট্রানজিটে" }, { n: "0", l: "ডেলিভার্ড" }, { n: "0", l: "রিটার্ন" }].map((c, i) => (
              <div key={i} style={{ textAlign: "center", padding: 10, background: COLORS.surfaceBg, borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.deepInk, fontFamily: "'DM Sans', sans-serif" }}>{c.n}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'Tiro Bangla', serif" }}>{c.l}</div>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "10px 0", border: `1px dashed ${COLORS.borderDark}`, borderRadius: 8, background: "transparent", color: COLORS.textSecondary, fontFamily: "'Tiro Bangla', serif", fontSize: 13, cursor: "pointer" }}>
            + নতুন পার্সেল বুক করুন
          </button>
        </Card>
      </div>
    </div>
  );
}

function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { id: "all", label: "সব" },
    { id: "needs_reply", label: "রিপ্লাই দরকার" },
    { id: "auto", label: "অটো-রিপ্লাই" },
    { id: "resolved", label: "সমাধান" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 0, height: "calc(100vh - 130px)", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: COLORS.cardBg, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: COLORS.surfaceBg, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
            <span style={{ color: COLORS.textMuted }}>🔍</span>
            <input placeholder="মেসেজ খুঁজুন..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.deepInk }} />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "4px 12px", borderRadius: 20, border: "none", fontSize: 12, fontFamily: "'Tiro Bangla', serif", cursor: "pointer", background: activeTab === t.id ? COLORS.vermillion : "transparent", color: activeTab === t.id ? "#fff" : COLORS.textMuted, fontWeight: 500, transition: "all 0.2s" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <EmptyState icon="💬" title="কোনো মেসেজ নেই" subtitle="নতুন মেসেজ এখানে দেখাবে" />
        </div>
      </div>
      <div style={{ background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EmptyState icon="💬" title="একটি মেসেজ সিলেক্ট করুন" subtitle="কথোপকথন দেখতে বাম দিক থেকে সিলেক্ট করুন" />
      </div>
    </div>
  );
}

function OrdersPage() {
  const [viewMode, setViewMode] = useState("kanban");
  const columns = [
    { label: "নতুন", count: 0, color: COLORS.vermillion, borderColor: "#E8220A" },
    { label: "কনফার্ম", count: 0, color: COLORS.blueText, borderColor: "#1565C0" },
    { label: "পেমেন্ট", count: 0, color: COLORS.purpleText, borderColor: "#6A1B9A" },
    { label: "শিপড", count: 0, color: COLORS.yellowText, borderColor: "#F57F17" },
    { label: "ডেলিভার্ড", count: 0, color: COLORS.greenText, borderColor: "#2E7D32" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: COLORS.cardBg, borderRadius: 8, border: `1px solid ${COLORS.border}`, flex: 1, maxWidth: 280 }}>
          <span style={{ color: COLORS.textMuted }}>🔍</span>
          <input placeholder="অর্ডার খুঁজুন..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }} />
        </div>
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          <button onClick={() => setViewMode("kanban")} style={{ padding: "8px 12px", border: "none", background: viewMode === "kanban" ? COLORS.vermillion : COLORS.cardBg, color: viewMode === "kanban" ? "#fff" : COLORS.textMuted, cursor: "pointer", fontSize: 14 }}>▥</button>
          <button onClick={() => setViewMode("list")} style={{ padding: "8px 12px", border: "none", borderLeft: `1px solid ${COLORS.border}`, background: viewMode === "list" ? COLORS.vermillion : COLORS.cardBg, color: viewMode === "list" ? "#fff" : COLORS.textMuted, cursor: "pointer", fontSize: 14 }}>☰</button>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", background: COLORS.vermillion, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          + নতুন অর্ডার
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: 12 }}>
        {columns.map((col, i) => (
          <div key={i} style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 10, borderTop: `3px solid ${col.borderColor}`, minHeight: 300 }}>
            <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: col.color }}>{col.label}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textMuted }}>{col.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsPage() {
  const products = [
    { name: "জামদানি শাড়ি", price: "৳3,500", oldPrice: "৳4,500", stock: true, category: "পোশাক", stockLabel: "" },
    { name: "কটন থ্রী-পিস", price: "৳1,200", oldPrice: null, stock: true, category: "পোশাক", stockLabel: "" },
    { name: "গোল্ড প্লেটেড নেকলেস", price: "৳850", oldPrice: null, stock: false, category: "গহনা", stockLabel: "সীমিত" },
    { name: "হ্যান্ডমেড জুট ব্যাগ", price: "৳450", oldPrice: null, stock: false, category: "হ্যান্ডক্রাফট", stockLabel: "স্টক নেই" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: COLORS.cardBg, borderRadius: 8, border: `1px solid ${COLORS.border}`, flex: 1, maxWidth: 300 }}>
          <span style={{ color: COLORS.textMuted }}>🔍</span>
          <input placeholder="প্রোডাক্ট খুঁজুন..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", background: COLORS.vermillion, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          + নতুন প্রোডাক্ট
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {products.map((p, i) => (
          <Card key={i} style={{ padding: 0, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s" }}>
            <div style={{ height: 160, background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 40, opacity: 0.3 }}>📦</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: COLORS.deepInk, marginBottom: 4 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.deepInk }}>{p.price}</span>
                {p.oldPrice && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textMuted, textDecoration: "line-through" }}>{p.oldPrice}</span>}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                {p.stock ? <Badge text="স্টক আছে" variant="green" /> : p.stockLabel === "সীমিত" ? <Badge text="সীমিত" variant="yellow" /> : <Badge text="স্টক নেই" variant="red" />}
                <Badge text={p.category} variant="gray" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CustomersPage() {
  const customers = [
    { name: "রাকেলা বেগম", phone: "01812345678", orders: 5, spend: "৳12,500", risk: "কম ঝুঁকি", riskV: "green", tags: ["VIP"] },
    { name: "নাসিমা আক্তার", phone: "01912345678", orders: 3, spend: "৳7,200", risk: "কম ঝুঁকি", riskV: "green", tags: [] },
    { name: "সাবরিনা ইসলাম", phone: "01612345678", orders: 1, spend: "৳3,500", risk: "মাঝারি ঝুঁকি", riskV: "yellow", tags: [] },
    { name: "তানিয়া রহমান", phone: "01512345678", orders: 8, spend: "৳22,000", risk: "কম ঝুঁকি", riskV: "green", tags: ["VIP", "প্রোমোশন"] },
    { name: "মুনমুন সরকার", phone: "01712345679", orders: 0, spend: "৳0", risk: "উচ্চ ঝুঁকি", riskV: "red", tags: ["সমস্যা"] },
  ];
  const initials = (n: string) => n.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: COLORS.cardBg, borderRadius: 8, border: `1px solid ${COLORS.border}`, flex: 1, maxWidth: 320 }}>
          <span style={{ color: COLORS.textMuted }}>🔍</span>
          <input placeholder="নাম বা ফোন দিয়ে খুঁজুন..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", background: COLORS.cardBg, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" }}>
          ⬇ এক্সপোর্ট
        </button>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {["কাস্টমার", "ফোন", "অর্ডার", "মোট খরচ", "ঝুঁকি", "ট্যাগ"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: COLORS.textMuted, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 16, background: COLORS.saffronLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: COLORS.saffron, fontFamily: "'Tiro Bangla', serif" }}>{initials(c.name)}</div>
                    <span style={{ color: COLORS.deepInk, fontWeight: 500 }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: COLORS.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>{c.phone}</td>
                <td style={{ padding: "12px 16px", color: COLORS.textSecondary, textAlign: "center" }}>{c.orders}</td>
                <td style={{ padding: "12px 16px", color: COLORS.deepInk, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{c.spend}</td>
                <td style={{ padding: "12px 16px" }}><Badge text={c.risk} variant={c.riskV} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {c.tags.map((t, j) => <Badge key={j} text={t} variant={t === "VIP" ? "blue" : t === "প্রোমোশন" ? "purple" : "red"} />)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function AutoReplyPage() {
  const [botOn, setBotOn] = useState(true);
  const [commentReply, setCommentReply] = useState(true);
  const [messengerReply, setMessengerReply] = useState(true);
  const [tone, setTone] = useState("formal");
  const [lang, setLang] = useState("bangla");

  function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
    return (
      <div onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? COLORS.vermillion : COLORS.borderDark, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", position: "absolute", top: 2, left: on ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>
      <Card style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: COLORS.deepInk }}>{botOn ? "বট চালু আছে" : "বট বন্ধ আছে"}</div>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted }}>আজকে ৫০ টির মধ্যে ০টি ব্যবহৃত</div>
        </div>
        <Toggle on={botOn} onChange={setBotOn} />
      </Card>

      <Card>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.deepInk, marginBottom: 16 }}>AI আচরণ</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>রিপ্লাই টোন</div>
            <select value={tone} onChange={e => setTone(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.cardBg, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.deepInk, outline: "none" }}>
              <option value="formal">ফর্মাল (আপনি)</option>
              <option value="casual">ক্যাজুয়াল (তুমি)</option>
            </select>
          </div>
          <div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>ভাষা</div>
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.cardBg, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.deepInk, outline: "none" }}>
              <option value="bangla">বাংলা</option>
              <option value="english">English</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[{ label: "কমেন্টে অটো-রিপ্লাই", desc: "Facebook Page পোস্টের কমেন্টে উত্তর", on: commentReply, set: setCommentReply },
            { label: "মেসেঞ্জারে অটো-রিপ্লাই", desc: "ডাইরেক্ট মেসেজে উত্তর", on: messengerReply, set: setMessengerReply }
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: COLORS.deepInk }}>{item.label}</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted }}>{item.desc}</div>
              </div>
              <Toggle on={item.on} onChange={item.set} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: COLORS.deepInk }}>রিপ্লাই টেমপ্লেট</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${COLORS.border}`, background: COLORS.cardBg, fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textSecondary, cursor: "pointer" }}>ডিফল্ট যোগ করুন</button>
            <button style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${COLORS.border}`, background: COLORS.cardBg, fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textSecondary, cursor: "pointer" }}>+ নতুন</button>
          </div>
        </div>
        <EmptyState icon="💬" title="কোনো টেমপ্লেট নেই" subtitle="ডিফল্ট টেমপ্লেট যোগ করুন অথবা নতুন তৈরি করুন" />
      </Card>
    </div>
  );
}

function SettingsPage() {
  const plans = [
    { name: "ফ্রি", price: "৳০", features: ["৫০ অটো রিপ্লাই/দিন", "বেসিক কাস্টমার ম্যানেজমেন্ট"], current: true },
    { name: "স্টার্টার", price: "৳৪৯৯/মাস", features: ["আনলিমিটেড অটো রিপ্লাই", "অর্ডার ম্যানেজমেন্ট", "কাস্টমার ইনসাইটস", "এক্সপোর্ট"], current: false },
    { name: "গ্রোথ", price: "৳৯৯৯/মাস", features: ["সব কিছু + কুরিয়ার ইন্টিগ্রেশন", "bKash ইন্টিগ্রেশন", "ফোন সাপোর্ট প্রায়োরিটি"], current: false },
    { name: "বিজনেস", price: "৳২,৯৯৯/মাস", features: ["সব কিছু + হোয়াইট লেবেল", "কাস্টমার ইনসাইটস", "AI কন্টাইনার"], current: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 18 }}>🏪</span>
          <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: COLORS.deepInk }}>দোকানের তথ্য</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏪</div>
          <button style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${COLORS.border}`, background: COLORS.cardBg, fontSize: 12, color: COLORS.textSecondary, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>⬆ লোগো আপলোড</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[{ l: "দোকানের নাম", v: "ফাতিমার বুটিক" }, { l: "মালিকের নাম", v: "ফাতিমা আক্তার" }, { l: "ফোন", v: "01712345678" }, { l: "ইমেইল", v: "fatima@example.com" }].map((f, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{f.l}</div>
              <input defaultValue={f.v} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surfaceBg, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.deepInk, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>ঠিকানা (পিকআপ)</div>
            <input defaultValue="বনানী, ঢাকা-১২১৩" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surfaceBg, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.deepInk, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 18 }}>💳</span>
          <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: COLORS.deepInk }}>পেমেন্ট সেটিংস</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>bKash নম্বর</div>
            <input defaultValue="01712345678" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surfaceBg, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: COLORS.deepInk, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>Nagad নম্বর</div>
            <input defaultValue="01XXXXXXXXX" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surfaceBg, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: COLORS.deepInk, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 18 }}>🚚</span>
          <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: COLORS.deepInk }}>ডেলিভারি সেটিংস</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[{ l: "ঢাকা চার্জ (৳)", v: "60" }, { l: "বাইরে চার্জ (৳)", v: "120" }, { l: "ডেলিভারি (দিন)", v: "2-3" }].map((f, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{f.l}</div>
              <input defaultValue={f.v} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surfaceBg, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: COLORS.deepInk, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </Card>

      <div>
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: COLORS.deepInk, marginBottom: 12 }}>সাবস্ক্রিপশন প্ল্যান</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ background: COLORS.cardBg, border: p.current ? `2px solid ${COLORS.vermillion}` : `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: COLORS.deepInk }}>{p.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.deepInk, margin: "4px 0 12px" }}>{p.price}</div>
              {p.features.map((f, j) => (
                <div key={j} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: COLORS.textSecondary, display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 4 }}>
                  <span style={{ color: COLORS.greenText }}>✓</span> {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button style={{ width: "100%", padding: "12px 0", background: COLORS.vermillion, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
        সেটিংস সেভ করুন
      </button>
    </div>
  );
}

function CourierPage() {
  return (
    <ComingSoonOverlay pageName="কুরিয়ার">
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button style={{ padding: "8px 20px", background: COLORS.vermillion, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13 }}>+ নতুন পার্সেল বুক</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[{ l: "ট্রানজিটে", n: "0", c: COLORS.blueText }, { l: "ডেলিভার্ড", n: "0", c: COLORS.greenText }, { l: "রিটার্ন", n: "0", c: COLORS.redText }, { l: "মোট খরচ", n: "৳0", c: COLORS.deepInk }].map((s, i) => (
            <Card key={i}><div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted }}>{s.l}</div><div style={{ fontSize: 24, fontWeight: 700, color: s.c, fontFamily: "'DM Sans', sans-serif" }}>{s.n}</div></Card>
          ))}
        </div>
        <Card><EmptyState icon="📦" title="কোনো পার্সেল নেই" subtitle="নতুন পার্সেল বুক করুন" /></Card>
      </div>
    </ComingSoonOverlay>
  );
}

function PaymentPage() {
  return (
    <ComingSoonOverlay pageName="পেমেন্ট">
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[{ l: "আজকে প্রাপ্ত", n: "৳0" }, { l: "মাসিক মোট", n: "৳0" }, { l: "পেন্ডিং", n: "0" }].map((s, i) => (
            <Card key={i}><div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted }}>{s.l}</div><div style={{ fontSize: 24, fontWeight: 700, color: COLORS.deepInk, fontFamily: "'DM Sans', sans-serif" }}>{s.n}</div></Card>
          ))}
        </div>
        <Card><EmptyState icon="💳" title="কোনো পেমেন্ট নেই" subtitle="পেমেন্ট রেকর্ড এখানে দেখাবে" /></Card>
      </div>
    </ComingSoonOverlay>
  );
}

function HisabPage() {
  return (
    <ComingSoonOverlay pageName="হিসাব">
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button style={{ padding: "8px 20px", background: COLORS.cardBg, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13 }}>+ খরচ যোগ করুন</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[{ l: "আজকের আয়", n: "৳0" }, { l: "মোট খরচ", n: "৳0" }, { l: "আজকের লাভ", n: "৳0" }].map((s, i) => (
            <Card key={i}><div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: COLORS.textMuted }}>{s.l}</div><div style={{ fontSize: 24, fontWeight: 700, color: COLORS.deepInk, fontFamily: "'DM Sans', sans-serif" }}>{s.n}</div></Card>
          ))}
        </div>
        <Card style={{ height: 200 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: COLORS.textSecondary, marginBottom: 12 }}>গত ৭ দিনের ট্রেন্ড</div>
          <div style={{ height: 140, background: COLORS.surfaceBg, borderRadius: 8 }}></div>
        </Card>
      </div>
    </ComingSoonOverlay>
  );
}

const pageLabels: Record<string, string> = {
  dashboard: "ড্যাশবোর্ড",
  messages: "মেসেজ",
  orders: "অর্ডার",
  products: "প্রোডাক্ট",
  customers: "কাস্টমার",
  courier: "কুরিয়ার",
  payment: "পেমেন্ট",
  hisab: "হিসাব",
  autoreply: "অটো-রিপ্লাই সেটিংস",
  settings: "সেটিংস",
};

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardHome />;
      case "messages": return <MessagesPage />;
      case "orders": return <OrdersPage />;
      case "products": return <ProductsPage />;
      case "customers": return <CustomersPage />;
      case "courier": return <CourierPage />;
      case "payment": return <PaymentPage />;
      case "hisab": return <HisabPage />;
      case "autoreply": return <AutoReplyPage />;
      case "settings": return <SettingsPage />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif", background: COLORS.offWhite, overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: COLORS.cardBg, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh" }}>
        {/* Logo */}
        <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center" }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 44, width: "auto", objectFit: "contain" }} />
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "4px 8px", overflowY: "auto" }}>
          {navItems.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => setActivePage(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: active ? COLORS.vermillionLight : "transparent", color: active ? COLORS.vermillion : COLORS.textSecondary, cursor: "pointer", fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: active ? 600 : 400, marginBottom: 2, transition: "all 0.15s" }}>
                <NavIcon type={item.icon} active={active} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Plan Badge */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ background: COLORS.saffronLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: COLORS.textMuted }}>বর্তমান প্ল্যান</div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: COLORS.deepInk }}>ফ্রি প্ল্যান</div>
            <button style={{ marginTop: 8, width: "100%", padding: "7px 0", background: COLORS.saffron, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              ⬆ আপগ্রেড করুন
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <header style={{ height: 52, background: COLORS.cardBg, borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: COLORS.textMuted }}>ফাতিমার বুটিক</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: 18, color: COLORS.textMuted }}>🔔</span>
              <span style={{ position: "absolute", top: -2, right: -4, width: 7, height: 7, borderRadius: 4, background: COLORS.vermillion }}></span>
            </div>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: COLORS.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: COLORS.textMuted, cursor: "pointer" }}>👤</div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: "auto", padding: 24 }}>
          <h1 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 22, fontWeight: 600, color: COLORS.deepInk, margin: "0 0 20px" }}>
            {pageLabels[activePage]}
          </h1>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
