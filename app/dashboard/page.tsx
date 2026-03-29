"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const C = {
  vermillion: "#E8220A", vermillionLight: "#FEF0EE",
  saffron: "#F5A623", saffronLight: "#FFF8EB",
  offWhite: "#FDF6EC", deepInk: "#1A1208",
  border: "#F0E8D8", borderDark: "#E5D9C3",
  cardBg: "#FFFDF9", surfaceBg: "#FAF7F1",
  textMuted: "#8C7E6A", textSecondary: "#5C4F3A",
  greenSoft: "#E8F5E9", greenText: "#2E7D32",
  yellowSoft: "#FFF8E1", yellowText: "#F57F17",
  redSoft: "#FFEBEE", redText: "#C62828",
  blueSoft: "#E3F2FD", blueText: "#1565C0",
  purpleSoft: "#F3E5F5", purpleText: "#6A1B9A",
  pinkSoft: "#FCE4EC", pinkText: "#AD1457",
};

// ============ RESPONSIVE HOOK ============
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// ============ SHARED COMPONENTS ============
function NavIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? C.vermillion : C.textMuted;
  const s = { width: 20, height: 20, fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactElement> = {
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
    green: { bg: C.greenSoft, color: C.greenText }, yellow: { bg: C.yellowSoft, color: C.yellowText },
    red: { bg: C.redSoft, color: C.redText }, blue: { bg: C.blueSoft, color: C.blueText },
    purple: { bg: C.purpleSoft, color: C.purpleText }, pink: { bg: C.pinkSoft, color: C.pinkText },
    gray: { bg: "#F0ECE3", color: C.textSecondary },
  };
  const st = styles[variant] || styles.green;
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: st.bg, color: st.color, fontFamily: "'Tiro Bangla', serif", whiteSpace: "nowrap" }}>{text}</span>;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, ...style }}>{children}</div>;
}

function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, color: C.textMuted }}>
      <div style={{ width: 56, height: 56, borderRadius: 28, background: C.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 24 }}>{icon}</div>
      <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: C.textSecondary, margin: "0 0 4px", textAlign: "center" }}>{title}</p>
      <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted, margin: 0, textAlign: "center" }}>{subtitle}</p>
    </div>
  );
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,18,8,0.4)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: "16px 16px 0 0", padding: 24, width: "100%", maxWidth: 480, maxHeight: "85vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 18, fontWeight: 600, color: C.deepInk, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.textMuted, padding: 8 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted, marginBottom: 4 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surfaceBg, fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: C.deepInk, outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

function Btn({ children, onClick, primary = true, disabled = false, style: s }: { children: React.ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "10px 20px", borderRadius: 8, border: primary ? "none" : `1px solid ${C.border}`, fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 500, cursor: disabled ? "default" : "pointer",
      background: primary ? C.vermillion : C.cardBg, color: primary ? "#fff" : C.textSecondary, opacity: disabled ? 0.6 : 1, transition: "all 0.2s", ...s
    }}>{children}</button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.vermillion : C.borderDark, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", position: "absolute", top: 2, left: on ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
    </div>
  );
}

function ComingSoonOverlay({ pageName, children }: { pageName: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ filter: "blur(2px)", opacity: 0.4, pointerEvents: "none" }}>{children}</div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
        <div style={{ background: C.saffronLight, border: `2px solid ${C.saffron}`, borderRadius: 16, padding: "24px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🚧</div>
          <h2 style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 20, color: C.deepInk, margin: "0 0 8px" }}>শীঘ্রই আসছে</h2>
          <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted, margin: 0 }}>{pageName} ফিচারটি শীঘ্রই চালু হবে</p>
        </div>
      </div>
    </div>
  );
}

// ============ NAV CONFIG ============
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

const pageLabels: Record<string, string> = {
  dashboard: "ড্যাশবোর্ড", messages: "মেসেজ", orders: "অর্ডার", products: "প্রোডাক্ট",
  customers: "কাস্টমার", courier: "কুরিয়ার", payment: "পেমেন্ট", hisab: "হিসাব",
  autoreply: "অটো-রিপ্লাই সেটিংস", settings: "সেটিংস",
};

// ============ PRODUCTS PAGE ============
function ProductsPage({ sellerId }: { sellerId: string }) {
  const mobile = useIsMobile();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", in_stock: true });
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from("products").select("*").eq("seller_id", sellerId).order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }, [sellerId]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function addProduct() {
    if (!form.name || !form.price) return;
    setSaving(true);
    await supabase.from("products").insert({ seller_id: sellerId, name: form.name, price: parseFloat(form.price), description: form.description, category: form.category || null, in_stock: form.in_stock });
    setForm({ name: "", price: "", description: "", category: "", in_stock: true });
    setShowAdd(false); setSaving(false); fetchProducts();
  }

  async function deleteProduct(id: string) {
    if (!confirm("এই প্রোডাক্টটি মুছে ফেলতে চান?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "flex-end", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: C.cardBg, borderRadius: 8, border: `1px solid ${C.border}`, flex: 1, maxWidth: mobile ? "100%" : 300 }}>
          <span style={{ color: C.textMuted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="প্রোডাক্ট খুঁজুন..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }} />
        </div>
        <Btn onClick={() => setShowAdd(true)} style={{ width: mobile ? "100%" : "auto" }}>+ নতুন প্রোডাক্ট</Btn>
      </div>
      {loading ? <p style={{ textAlign: "center", color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>লোড হচ্ছে...</p> :
        filtered.length === 0 ? <Card><EmptyState icon="📦" title="কোনো প্রোডাক্ট নেই" subtitle="নতুন প্রোডাক্ট যোগ করুন" /></Card> :
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(p => (
            <Card key={p.id} style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 100, background: C.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 32, opacity: 0.3 }}>📦</span>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: C.deepInk }}>৳{p.price?.toLocaleString()}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <Badge text={p.in_stock ? "স্টক আছে" : "স্টক নেই"} variant={p.in_stock ? "green" : "red"} />
                  {p.category && <Badge text={p.category} variant="gray" />}
                </div>
                <button onClick={() => deleteProduct(p.id)} style={{ marginTop: 8, background: "none", border: "none", color: C.redText, fontSize: 11, cursor: "pointer", fontFamily: "'Tiro Bangla', serif", padding: 0 }}>মুছে ফেলুন</button>
              </div>
            </Card>
          ))}
        </div>
      }
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="নতুন প্রোডাক্ট যোগ করুন">
        <Input label="প্রোডাক্টের নাম *" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="যেমন: জামদানি শাড়ি" />
        <Input label="দাম (৳) *" value={form.price} onChange={v => setForm({ ...form, price: v })} type="number" placeholder="3500" />
        <Input label="বিবরণ" value={form.description} onChange={v => setForm({ ...form, description: v })} placeholder="প্রোডাক্টের বিস্তারিত" />
        <Input label="ক্যাটাগরি" value={form.category} onChange={v => setForm({ ...form, category: v })} placeholder="পোশাক, গহনা, ইত্যাদি" />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary }}>স্টকে আছে</span>
          <Toggle on={form.in_stock} onChange={v => setForm({ ...form, in_stock: v })} />
        </div>
        <Btn onClick={addProduct} disabled={saving || !form.name || !form.price} style={{ width: "100%" }}>{saving ? "সেভ হচ্ছে..." : "প্রোডাক্ট যোগ করুন"}</Btn>
      </Modal>
    </div>
  );
}

// ============ ORDERS PAGE ============
function OrdersPage({ sellerId }: { sellerId: string }) {
  const mobile = useIsMobile();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ customer_name: "", product_name: "", amount: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const fetchOrders = useCallback(async () => {
    const { data } = await supabase.from("orders").select("*").eq("seller_id", sellerId).order("created_at", { ascending: false });
    setOrders(data || []); setLoading(false);
  }, [sellerId]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  async function addOrder() {
    if (!form.customer_name || !form.amount) return;
    setSaving(true);
    await supabase.from("orders").insert({ seller_id: sellerId, customer_name: form.customer_name, product_name: form.product_name, amount: parseFloat(form.amount), status: "new", notes: form.notes });
    setForm({ customer_name: "", product_name: "", amount: "", notes: "" });
    setShowAdd(false); setSaving(false); fetchOrders();
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id); fetchOrders();
  }

  const statuses = [
    { key: "new", label: "নতুন", color: C.vermillion, border: "#E8220A" },
    { key: "confirmed", label: "কনফার্ম", color: C.blueText, border: "#1565C0" },
    { key: "paid", label: "পেমেন্ট", color: C.purpleText, border: "#6A1B9A" },
    { key: "shipped", label: "শিপড", color: C.yellowText, border: "#F57F17" },
    { key: "delivered", label: "ডেলিভার্ড", color: C.greenText, border: "#2E7D32" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 20 }}>
        <Btn onClick={() => setShowAdd(true)} style={{ width: mobile ? "100%" : "auto" }}>+ নতুন অর্ডার</Btn>
      </div>
      {loading ? <p style={{ textAlign: "center", color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>লোড হচ্ছে...</p> :
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {statuses.map(col => {
            const colOrders = orders.filter(o => o.status === col.key);
            return (
              <div key={col.key} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 10, borderTop: `3px solid ${col.border}`, minHeight: 200, minWidth: mobile ? 260 : 0, flex: mobile ? "0 0 260px" : 1 }}>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: col.color }}>{col.label}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.textMuted }}>{colOrders.length}</span>
                </div>
                <div style={{ padding: "0 8px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {colOrders.map(o => (
                    <div key={o.id} style={{ background: C.surfaceBg, borderRadius: 8, padding: 10, fontSize: 12 }}>
                      <div style={{ fontFamily: "'Tiro Bangla', serif", fontWeight: 600, color: C.deepInk }}>{o.customer_name}</div>
                      {o.product_name && <div style={{ fontFamily: "'Tiro Bangla', serif", color: C.textMuted, fontSize: 11 }}>{o.product_name}</div>}
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: C.deepInk, marginTop: 4 }}>৳{o.amount?.toLocaleString()}</div>
                      <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                        {statuses.filter(s => s.key !== o.status).slice(0, 2).map(s => (
                          <button key={s.key} onClick={() => updateStatus(o.id, s.key)} style={{ padding: "3px 8px", borderRadius: 4, border: `1px solid ${C.border}`, background: C.cardBg, fontSize: 10, cursor: "pointer", fontFamily: "'Tiro Bangla', serif", color: s.color }}>{s.label}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      }
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="নতুন অর্ডার যোগ করুন">
        <Input label="কাস্টমারের নাম *" value={form.customer_name} onChange={v => setForm({ ...form, customer_name: v })} placeholder="রাহেলা বেগম" />
        <Input label="প্রোডাক্ট" value={form.product_name} onChange={v => setForm({ ...form, product_name: v })} placeholder="জামদানি শাড়ি" />
        <Input label="পরিমাণ (৳) *" value={form.amount} onChange={v => setForm({ ...form, amount: v })} type="number" placeholder="3500" />
        <Input label="নোট" value={form.notes} onChange={v => setForm({ ...form, notes: v })} placeholder="অতিরিক্ত তথ্য" />
        <Btn onClick={addOrder} disabled={saving || !form.customer_name || !form.amount} style={{ width: "100%" }}>{saving ? "সেভ হচ্ছে..." : "অর্ডার যোগ করুন"}</Btn>
      </Modal>
    </div>
  );
}

// ============ CUSTOMERS PAGE ============
function CustomersPage({ sellerId }: { sellerId: string }) {
  const mobile = useIsMobile();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { (async () => {
    const { data } = await supabase.from("customers").select("*").eq("seller_id", sellerId).order("created_at", { ascending: false });
    setCustomers(data || []); setLoading(false);
  })(); }, [sellerId]);

  const filtered = customers.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search));
  const initials = (n: string) => (n || "?").split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: C.cardBg, borderRadius: 8, border: `1px solid ${C.border}`, flex: 1, maxWidth: mobile ? "100%" : 320 }}>
          <span style={{ color: C.textMuted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="নাম বা ফোন দিয়ে খুঁজুন..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }} />
        </div>
      </div>
      {loading ? <p style={{ textAlign: "center", color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>লোড হচ্ছে...</p> :
        filtered.length === 0 ? <Card><EmptyState icon="👥" title="কোনো কাস্টমার নেই" subtitle="কাস্টমার আসলে এখানে দেখাবে" /></Card> :
        mobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(c => (
              <Card key={c.id} style={{ padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: C.saffronLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: C.saffron }}>{initials(c.name)}</div>
                  <div>
                    <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk }}>{c.name || "অজানা"}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.textMuted }}>{c.phone || "ফোন নেই"}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.textSecondary, fontFamily: "'Tiro Bangla', serif" }}>
                  <span>মেসেজ: {c.message_count || 0}</span>
                  <span>প্রথম দেখা: {c.first_seen ? new Date(c.first_seen).toLocaleDateString("bn-BD") : "—"}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Tiro Bangla', serif", fontSize: 13 }}>
              <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["কাস্টমার", "ফোন", "মেসেজ", "প্রথম দেখা"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: C.textMuted, fontSize: 12 }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 16, background: C.saffronLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: C.saffron }}>{initials(c.name)}</div>
                        <span style={{ color: C.deepInk, fontWeight: 500 }}>{c.name || "অজানা"}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>{c.phone || "—"}</td>
                    <td style={{ padding: "12px 16px", color: C.textSecondary }}>{c.message_count || 0}</td>
                    <td style={{ padding: "12px 16px", color: C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>{c.first_seen ? new Date(c.first_seen).toLocaleDateString("bn-BD") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )
      }
    </div>
  );
}

// ============ MESSAGES PAGE ============
function MessagesPage({ sellerId }: { sellerId: string }) {
  const mobile = useIsMobile();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { (async () => {
    const { data } = await supabase.from("messages").select("*").eq("seller_id", sellerId).order("created_at", { ascending: false }).limit(100);
    setMessages(data || []); setLoading(false);
  })(); }, [sellerId]);

  const grouped: Record<string, any[]> = {};
  messages.forEach(m => { const key = m.customer_name || m.facebook_user_id || "unknown"; if (!grouped[key]) grouped[key] = []; grouped[key].push(m); });
  const conversations = Object.entries(grouped).map(([name, msgs]) => ({ name, msgs, last: msgs[0] }));
  const selectedMsgs = selected ? (grouped[selected] || []).reverse() : [];

  // Mobile: show list or conversation
  if (mobile) {
    if (selected) {
      return (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 130px)" }}>
          <div style={{ padding: 12, borderBottom: `1px solid ${C.border}`, background: C.cardBg, display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: C.textMuted, padding: 4 }}>←</button>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk }}>{selected}</span>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8, background: C.surfaceBg }}>
            {selectedMsgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.direction === "outgoing" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "8px 12px", borderRadius: 12, background: m.direction === "outgoing" ? C.vermillionLight : C.cardBg, border: `1px solid ${C.border}` }}>
                  <p style={{ margin: 0, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk }}>{m.content}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: C.textMuted }}>{new Date(m.created_at).toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" })}</span>
                    {m.direction === "outgoing" && <span style={{ fontSize: 9, background: C.vermillionLight, color: C.vermillion, padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>⚡ AI</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        {loading ? <p style={{ textAlign: "center", color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>লোড হচ্ছে...</p> :
          conversations.length === 0 ? <Card><EmptyState icon="💬" title="কোনো মেসেজ নেই" subtitle="নতুন মেসেজ এখানে দেখাবে" /></Card> :
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {conversations.map(c => (
              <div key={c.name} onClick={() => setSelected(c.name)} style={{ padding: 14, background: C.cardBg, borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 500, color: C.deepInk }}>{c.name}</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.last.content}</div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }

  // Desktop: split panel
  return (
    <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 0, height: "calc(100vh - 130px)", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: C.cardBg, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 16, borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted }}>কথোপকথন ({conversations.length})</span>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {loading ? <p style={{ padding: 16, color: C.textMuted, fontFamily: "'Tiro Bangla', serif", fontSize: 13 }}>লোড হচ্ছে...</p> :
            conversations.length === 0 ? <EmptyState icon="💬" title="কোনো মেসেজ নেই" subtitle="নতুন মেসেজ এখানে দেখাবে" /> :
            conversations.map(c => (
              <div key={c.name} onClick={() => setSelected(c.name)} style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", background: selected === c.name ? C.vermillionLight : "transparent" }}>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 500, color: C.deepInk }}>{c.name}</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.last.content}</div>
              </div>
            ))
          }
        </div>
      </div>
      <div style={{ background: C.surfaceBg, display: "flex", flexDirection: "column" }}>
        {!selected ? <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><EmptyState icon="💬" title="একটি মেসেজ সিলেক্ট করুন" subtitle="বাম দিক থেকে সিলেক্ট করুন" /></div> :
          <div style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {selectedMsgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.direction === "outgoing" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "70%", padding: "8px 14px", borderRadius: 12, background: m.direction === "outgoing" ? C.vermillionLight : C.cardBg, border: `1px solid ${C.border}` }}>
                  <p style={{ margin: 0, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk }}>{m.content}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: C.textMuted }}>{new Date(m.created_at).toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" })}</span>
                    {m.direction === "outgoing" && <span style={{ fontSize: 9, background: C.vermillionLight, color: C.vermillion, padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>⚡ AI</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

// ============ DASHBOARD HOME ============
function DashboardHome({ sellerId, setPage }: { sellerId: string; setPage: (p: string) => void }) {
  const mobile = useIsMobile();
  const [stats, setStats] = useState({ orders: 0, revenue: 0, pending: 0, customers: 0, products: 0, messages: 0 });
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => { (async () => {
    const [ordersRes, customersRes, productsRes, messagesRes] = await Promise.all([
      supabase.from("orders").select("*").eq("seller_id", sellerId),
      supabase.from("customers").select("id").eq("seller_id", sellerId),
      supabase.from("products").select("*").eq("seller_id", sellerId),
      supabase.from("messages").select("*").eq("seller_id", sellerId).order("created_at", { ascending: false }).limit(5),
    ]);
    const orders = ordersRes.data || [];
    const revenue = orders.reduce((sum: number, o: any) => sum + (o.amount || 0), 0);
    const pending = orders.filter((o: any) => o.status === "new").length;
    setStats({ orders: orders.length, revenue, pending, customers: (customersRes.data || []).length, products: (productsRes.data || []).length, messages: (messagesRes.data || []).length });
    setTopProducts((productsRes.data || []).slice(0, 3));
    setRecentMessages(messagesRes.data || []);
  })(); }, [sellerId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 10 : 16 }}>
      {/* Summary + Pipeline: side by side on desktop, stacked on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: mobile ? 10 : 16 }}>
        <Card style={{ padding: mobile ? 14 : 20 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary, marginBottom: 10 }}>আজকের সারসংক্ষেপ</div>
          <div style={{ display: "flex", gap: 20 }}>
            <div><div style={{ fontSize: mobile ? 22 : 24, fontWeight: 700, color: C.deepInk, fontFamily: "'DM Sans'" }}>{stats.orders}</div><div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>অর্ডার</div></div>
            <div><div style={{ fontSize: mobile ? 22 : 24, fontWeight: 700, color: C.deepInk, fontFamily: "'DM Sans'" }}>৳{stats.revenue.toLocaleString()}</div><div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>আয়</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, color: C.yellowText, fontSize: 11, fontFamily: "'Tiro Bangla', serif" }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: C.yellowText, display: "inline-block" }} /> {stats.pending} পেন্ডিং
          </div>
        </Card>
        <Card style={{ padding: mobile ? 14 : 20 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary, marginBottom: 10 }}>অর্ডার পাইপলাইন</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[{ label: "নতুন", bg: C.redSoft, color: C.vermillion }, { label: "কনফার্ম", bg: C.blueSoft, color: C.blueText }, { label: "পেমেন্ট", bg: C.purpleSoft, color: C.purpleText }, { label: "শিপড", bg: C.yellowSoft, color: C.yellowText }, { label: "ডেলিভার্ড", bg: C.greenSoft, color: C.greenText }].map(p => (
              <span key={p.label} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontFamily: "'Tiro Bangla', serif", background: p.bg, color: p.color, fontWeight: 500 }}>{p.label}</span>
            ))}
          </div>
        </Card>
        {!mobile && (
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: C.textSecondary }}>সাম্প্রতিক মেসেজ</span>
              <span onClick={() => setPage("messages")} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.vermillion, cursor: "pointer" }}>সব দেখুন →</span>
            </div>
            {recentMessages.length === 0 ? <EmptyState icon="💬" title="কোনো মেসেজ নেই" subtitle="নতুন মেসেজ এখানে দেখাবে" /> :
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {recentMessages.slice(0, 3).map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 14, background: C.saffronLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: C.saffron, flexShrink: 0 }}>{(m.customer_name || "?")[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.deepInk, fontWeight: 500 }}>{m.customer_name || "অজানা"}</div>
                      <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </Card>
        )}
      </div>

      {/* Mobile: Recent messages full-width */}
      {mobile && (
        <Card style={{ padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary }}>সাম্প্রতিক মেসেজ</span>
            <span onClick={() => setPage("messages")} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.vermillion, cursor: "pointer" }}>সব দেখুন →</span>
          </div>
          {recentMessages.length === 0 ? <EmptyState icon="💬" title="কোনো মেসেজ নেই" subtitle="নতুন মেসেজ এখানে দেখাবে" /> :
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recentMessages.slice(0, 3).map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: C.saffronLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: C.saffron, flexShrink: 0 }}>{(m.customer_name || "?")[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.deepInk, fontWeight: 500 }}>{m.customer_name || "অজানা"}</div>
                    <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.content}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </Card>
      )}

      {/* Products + Customer stats */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: mobile ? 10 : 16 }}>
        <Card style={{ padding: mobile ? 14 : 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary }}>টপ প্রোডাক্ট</span>
            <span onClick={() => setPage("products")} style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.vermillion, cursor: "pointer" }}>সব →</span>
          </div>
          {topProducts.length === 0 ? <EmptyState icon="📦" title="প্রোডাক্ট নেই" subtitle="প্রোডাক্ট যোগ করুন" /> :
            topProducts.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: C.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>📦</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.textMuted }}>৳{p.price?.toLocaleString()}</div>
                </div>
              </div>
            ))
          }
        </Card>
        <Card style={{ padding: mobile ? 14 : 20 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textSecondary, marginBottom: 10 }}>কাস্টমার ও প্রোডাক্ট</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, textAlign: "center", padding: 12, background: C.surfaceBg, borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.deepInk, fontFamily: "'DM Sans'" }}>{stats.customers}</div>
              <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>কাস্টমার</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: 12, background: C.surfaceBg, borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.deepInk, fontFamily: "'DM Sans'" }}>{stats.products}</div>
              <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>প্রোডাক্ট</div>
            </div>
          </div>
        </Card>
        {!mobile && (
          <Card>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, color: C.textSecondary, marginBottom: 12 }}>কুরিয়ার স্ট্যাটাস</div>
            <EmptyState icon="🚚" title="শীঘ্রই আসছে" subtitle="কুরিয়ার ইন্টিগ্রেশন চালু হবে" />
          </Card>
        )}
      </div>
    </div>
  );
}

// ============ AUTO-REPLY PAGE ============
function AutoReplyPage({ sellerId }: { sellerId: string }) {
  const [botOn, setBotOn] = useState(true);
  const [commentReply, setCommentReply] = useState(true);
  const [messengerReply, setMessengerReply] = useState(true);
  const [tone, setTone] = useState("formal");
  const [lang, setLang] = useState("bangla");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => { (async () => {
    const { data } = await supabase.from("seller_settings").select("*").eq("seller_id", sellerId).single();
    if (data) { setBotOn(data.bot_enabled ?? true); setCommentReply(data.comment_reply ?? true); setMessengerReply(data.messenger_reply ?? true); setTone(data.reply_tone || "formal"); setLang(data.reply_language || "bangla"); }
    setLoading(false);
  })(); }, [sellerId]);

  async function saveSettings(updates: Record<string, any>) {
    const { data: existing } = await supabase.from("seller_settings").select("id").eq("seller_id", sellerId).single();
    if (existing) await supabase.from("seller_settings").update(updates).eq("seller_id", sellerId);
    else await supabase.from("seller_settings").insert({ seller_id: sellerId, ...updates });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function handleToggle(field: string, value: boolean, setter: (v: boolean) => void) { setter(value); saveSettings({ [field]: value }); }
  function handleSelect(field: string, value: string, setter: (v: string) => void) { setter(value); saveSettings({ [field]: value }); }

  if (loading) return <p style={{ textAlign: "center", color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>লোড হচ্ছে...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>
      {saved && <div style={{ padding: "8px 16px", background: C.greenSoft, border: `1px solid ${C.greenText}`, borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.greenText, textAlign: "center" }}>✓ সেটিংস সেভ হয়েছে</div>}
      <Card style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: C.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk }}>{botOn ? "বট চালু আছে" : "বট বন্ধ আছে"}</div>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted }}>আজকে ৫০ টির মধ্যে ০টি ব্যবহৃত</div>
        </div>
        <Toggle on={botOn} onChange={v => handleToggle("bot_enabled", v, setBotOn)} />
      </Card>
      <Card>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: C.deepInk, marginBottom: 16 }}>AI আচরণ</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted, marginBottom: 6 }}>রিপ্লাই টোন</div>
            <select value={tone} onChange={e => handleSelect("reply_tone", e.target.value, setTone)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.cardBg, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk }}>
              <option value="formal">ফর্মাল (আপনি)</option><option value="casual">ক্যাজুয়াল (তুমি)</option>
            </select>
          </div>
          <div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted, marginBottom: 6 }}>ভাষা</div>
            <select value={lang} onChange={e => handleSelect("reply_language", e.target.value, setLang)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.cardBg, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk }}>
              <option value="bangla">বাংলা</option><option value="english">English</option><option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
        {[{ label: "কমেন্টে অটো-রিপ্লাই", desc: "Facebook Page পোস্টের কমেন্টে উত্তর", field: "comment_reply", on: commentReply, set: setCommentReply },
          { label: "মেসেঞ্জারে অটো-রিপ্লাই", desc: "ডাইরেক্ট মেসেজে উত্তর", field: "messenger_reply", on: messengerReply, set: setMessengerReply }
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ flex: 1 }}><div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: C.deepInk }}>{item.label}</div><div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted }}>{item.desc}</div></div>
            <Toggle on={item.on} onChange={v => handleToggle(item.field, v, item.set)} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ============ DIVISIONS CONFIG ============
const DIVISIONS = [
  { key: "dhaka", bn: "ঢাকা", defaultCharge: 70, minDays: 2, maxDays: 3 },
  { key: "chittagong", bn: "চট্টগ্রাম", defaultCharge: 120, minDays: 3, maxDays: 5 },
  { key: "rajshahi", bn: "রাজশাহী", defaultCharge: 120, minDays: 3, maxDays: 5 },
  { key: "khulna", bn: "খুলনা", defaultCharge: 120, minDays: 3, maxDays: 5 },
  { key: "barishal", bn: "বরিশাল", defaultCharge: 120, minDays: 3, maxDays: 5 },
  { key: "sylhet", bn: "সিলেট", defaultCharge: 120, minDays: 3, maxDays: 5 },
  { key: "rangpur", bn: "রংপুর", defaultCharge: 120, minDays: 3, maxDays: 5 },
  { key: "mymensingh", bn: "ময়মনসিংহ", defaultCharge: 120, minDays: 3, maxDays: 5 },
];

function SaveToast({ show }: { show: boolean }) {
  if (!show) return null;
  return <div style={{ position: "fixed", bottom: 20, right: 20, padding: "8px 18px", background: C.greenSoft, border: `1px solid ${C.greenText}`, borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.greenText, zIndex: 300, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>✓ সেভ হয়েছে</div>;
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><span style={{ fontSize: 18 }}>{icon}</span><span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 15, fontWeight: 600, color: C.deepInk }}>{title}</span></div>;
}

// ============ SETTINGS PAGE ============
function SettingsPage({ sellerId, pageName }: { sellerId: string; pageName: string }) {
  const mobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [shop, setShop] = useState({ shop_name: "", shop_description: "", advance_payment_type: "none", advance_percentage: 20, free_delivery_enabled: false, free_delivery_threshold: 0 });
  const [delivery, setDelivery] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  // Load all settings
  useEffect(() => {
    (async () => {
      const [shopRes, delRes, payRes] = await Promise.all([
        supabase.from("shop_settings").select("*").eq("seller_id", sellerId).single(),
        supabase.from("delivery_settings").select("*").eq("seller_id", sellerId).order("division"),
        supabase.from("payment_settings").select("*").eq("seller_id", sellerId),
      ]);
      if (shopRes.data) setShop(shopRes.data);
      else setShop(p => ({ ...p, shop_name: pageName }));

      // Init delivery if empty
      if (!delRes.data || delRes.data.length === 0) {
        const rows = DIVISIONS.map(d => ({ seller_id: sellerId, division: d.key, is_enabled: d.key === "dhaka", delivery_charge: d.defaultCharge, estimated_days_min: d.minDays, estimated_days_max: d.maxDays }));
        await supabase.from("delivery_settings").upsert(rows, { onConflict: "seller_id,division" });
        setDelivery(rows);
      } else setDelivery(delRes.data);

      // Init payments if empty
      if (!payRes.data || payRes.data.length === 0) {
        const rows = [
          { seller_id: sellerId, payment_type: "cod", is_enabled: true, account_number: "", account_type: "personal", instructions: "" },
          { seller_id: sellerId, payment_type: "bkash", is_enabled: false, account_number: "", account_type: "personal", instructions: "" },
          { seller_id: sellerId, payment_type: "nagad", is_enabled: false, account_number: "", account_type: "personal", instructions: "" },
          { seller_id: sellerId, payment_type: "rocket", is_enabled: false, account_number: "", account_type: "personal", instructions: "" },
        ];
        await supabase.from("payment_settings").upsert(rows, { onConflict: "seller_id,payment_type" });
        setPayments(rows);
      } else setPayments(payRes.data);

      setLoading(false);
    })();
  }, [sellerId, pageName]);

  async function saveShop(updates: Record<string, any>) {
    const newShop = { ...shop, ...updates };
    setShop(newShop);
    await supabase.from("shop_settings").upsert({ seller_id: sellerId, ...newShop }, { onConflict: "seller_id" });
    flash();
  }

  async function saveDelivery(division: string, updates: Record<string, any>) {
    setDelivery(prev => prev.map(d => d.division === division ? { ...d, ...updates } : d));
    await supabase.from("delivery_settings").update(updates).eq("seller_id", sellerId).eq("division", division);
    flash();
  }

  async function savePayment(paymentType: string, updates: Record<string, any>) {
    setPayments(prev => prev.map(p => p.payment_type === paymentType ? { ...p, ...updates } : p));
    await supabase.from("payment_settings").update(updates).eq("seller_id", sellerId).eq("payment_type", paymentType);
    flash();
  }

  if (loading) return <p style={{ textAlign: "center", color: C.textMuted, fontFamily: "'Tiro Bangla', serif" }}>লোড হচ্ছে...</p>;

  const paymentLabels: Record<string, string> = { cod: "ক্যাশ অন ডেলিভারি (COD)", bkash: "bKash", nagad: "Nagad", rocket: "Rocket" };
  const hasMobileBanking = payments.some(p => ["bkash", "nagad", "rocket"].includes(p.payment_type) && p.is_enabled);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
      <SaveToast show={saved} />

      {/* Shop Info */}
      <Card style={{ padding: mobile ? 16 : 20 }}>
        <SectionHeader icon="🏪" title="দোকানের তথ্য" />
        <Input label="দোকানের নাম" value={shop.shop_name || ""} onChange={v => setShop({ ...shop, shop_name: v })} placeholder="আপনার দোকানের নাম" />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Btn onClick={() => saveShop({ shop_name: shop.shop_name, shop_description: shop.shop_description })} style={{ padding: "6px 16px", fontSize: 12 }}>সেভ করুন</Btn>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: C.greenSoft, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span>✅</span>
          <div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, fontWeight: 600, color: C.greenText }}>Facebook Page কানেক্টেড</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: C.textMuted }}>{pageName}</div>
          </div>
        </div>
      </Card>

      {/* Delivery Settings */}
      <Card style={{ padding: mobile ? 16 : 20 }}>
        <SectionHeader icon="🚚" title="ডেলিভারি সেটিংস" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {DIVISIONS.map(div => {
            const d = delivery.find(x => x.division === div.key) || {};
            return (
              <div key={div.key} style={{ display: "flex", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 8 : 12, padding: 10, background: d.is_enabled ? C.surfaceBg : "#f5f3ee", borderRadius: 8, flexDirection: mobile ? "column" : "row", opacity: d.is_enabled ? 1 : 0.6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: mobile ? "100%" : 140 }}>
                  <Toggle on={d.is_enabled || false} onChange={v => saveDelivery(div.key, { is_enabled: v })} />
                  <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 500, color: C.deepInk }}>{div.bn}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 11, color: C.textMuted }}>৳</span>
                    <input type="number" value={d.delivery_charge || 0} disabled={!d.is_enabled}
                      onBlur={e => saveDelivery(div.key, { delivery_charge: parseFloat(e.target.value) || 0 })}
                      onChange={e => setDelivery(prev => prev.map(x => x.division === div.key ? { ...x, delivery_charge: e.target.value } : x))}
                      style={{ width: 60, padding: "4px 6px", borderRadius: 6, border: `1px solid ${C.border}`, background: d.is_enabled ? "#fff" : C.surfaceBg, fontSize: 13, fontFamily: "'DM Sans'", color: C.deepInk, textAlign: "center" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <input type="number" value={d.estimated_days_min || 2} disabled={!d.is_enabled}
                      onBlur={e => saveDelivery(div.key, { estimated_days_min: parseInt(e.target.value) || 2 })}
                      onChange={e => setDelivery(prev => prev.map(x => x.division === div.key ? { ...x, estimated_days_min: e.target.value } : x))}
                      style={{ width: 36, padding: "4px 4px", borderRadius: 6, border: `1px solid ${C.border}`, background: d.is_enabled ? "#fff" : C.surfaceBg, fontSize: 12, textAlign: "center" }} />
                    <span style={{ fontSize: 11, color: C.textMuted }}>-</span>
                    <input type="number" value={d.estimated_days_max || 5} disabled={!d.is_enabled}
                      onBlur={e => saveDelivery(div.key, { estimated_days_max: parseInt(e.target.value) || 5 })}
                      onChange={e => setDelivery(prev => prev.map(x => x.division === div.key ? { ...x, estimated_days_max: e.target.value } : x))}
                      style={{ width: 36, padding: "4px 4px", borderRadius: 6, border: `1px solid ${C.border}`, background: d.is_enabled ? "#fff" : C.surfaceBg, fontSize: 12, textAlign: "center" }} />
                    <span style={{ fontSize: 11, color: C.textMuted }}>দিন</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Free delivery */}
        <div style={{ marginTop: 16, padding: 12, background: C.surfaceBg, borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: shop.free_delivery_enabled ? 10 : 0 }}>
            <Toggle on={shop.free_delivery_enabled} onChange={v => saveShop({ free_delivery_enabled: v })} />
            <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk }}>ফ্রি ডেলিভারি চালু করুন</span>
          </div>
          {shop.free_delivery_enabled && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, color: C.textMuted }}>সর্বনিম্ন অর্ডার ৳</span>
                <input type="number" value={shop.free_delivery_threshold || 0}
                  onBlur={e => saveShop({ free_delivery_threshold: parseFloat(e.target.value) || 0 })}
                  onChange={e => setShop(prev => ({ ...prev, free_delivery_threshold: parseFloat(e.target.value) || 0 }))}
                  style={{ width: 80, padding: "4px 8px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "'DM Sans'", textAlign: "center" }} />
              </div>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted, margin: "6px 0 0" }}>এই পরিমাণ বা তার বেশি অর্ডারে ডেলিভারি চার্জ মাফ হবে</p>
            </div>
          )}
        </div>
      </Card>

      {/* Payment Settings */}
      <Card style={{ padding: mobile ? 16 : 20 }}>
        <SectionHeader icon="💳" title="পেমেন্ট সেটিংস" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {payments.map(p => (
            <div key={p.payment_type} style={{ padding: 12, background: C.surfaceBg, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: p.is_enabled && p.payment_type !== "cod" ? 10 : 0 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: C.deepInk }}>{paymentLabels[p.payment_type]}</span>
                <Toggle on={p.is_enabled || false} onChange={v => savePayment(p.payment_type, { is_enabled: v })} />
              </div>
              {p.is_enabled && p.payment_type !== "cod" && (
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, flexDirection: mobile ? "column" : "row" }}>
                    <input placeholder="01XXXXXXXXX" value={p.account_number || ""}
                      onChange={e => setPayments(prev => prev.map(x => x.payment_type === p.payment_type ? { ...x, account_number: e.target.value } : x))}
                      onBlur={e => savePayment(p.payment_type, { account_number: e.target.value })}
                      style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "'DM Sans'" }} />
                    <select value={p.account_type || "personal"}
                      onChange={e => savePayment(p.payment_type, { account_type: e.target.value })}
                      style={{ padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "'Tiro Bangla', serif", background: "#fff" }}>
                      <option value="personal">পার্সোনাল</option>
                      <option value="merchant">মার্চেন্ট</option>
                    </select>
                  </div>
                  {p.is_enabled && !p.account_number && (
                    <div style={{ padding: "6px 10px", background: C.redSoft, borderRadius: 6, fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.redText }}>
                      ⚠️ নম্বর ছাড়া কাস্টমারকে ভুল তথ্য দেওয়া হতে পারে!
                    </div>
                  )}
                </div>
              )}
              {p.is_enabled && p.payment_type === "cod" && (
                <div style={{ marginTop: 6, fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted }}>ডেলিভারির সময় পেমেন্ট নেওয়া হবে</div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Advance Payment */}
      <Card style={{ padding: mobile ? 16 : 20 }}>
        <SectionHeader icon="💰" title="অ্যাডভান্স পেমেন্ট" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { key: "none", label: "অ্যাডভান্স লাগবে না", desc: "কাস্টমার ডেলিভারির সময় পেমেন্ট করবে (COD)" },
            { key: "full", label: "পুরো টাকা আগে", desc: "অর্ডার কনফার্মে পুরো টাকা আগে পাঠাতে হবে" },
            { key: "partial", label: "আংশিক অ্যাডভান্স", desc: "অর্ডারের একটি অংশ আগে পাঠাতে হবে" },
            { key: "optional", label: "কাস্টমারের ইচ্ছা", desc: "চাইলে আগে পাঠাতে পারবে, না করলে COD" },
          ].map(opt => (
            <div key={opt.key} onClick={() => saveShop({ advance_payment_type: opt.key })}
              style={{ padding: 12, borderRadius: 8, border: `2px solid ${shop.advance_payment_type === opt.key ? C.vermillion : C.border}`, background: shop.advance_payment_type === opt.key ? C.vermillionLight : "#fff", cursor: "pointer" }}>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 600, color: C.deepInk }}>{opt.label}</div>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted }}>{opt.desc}</div>
            </div>
          ))}
        </div>
        {shop.advance_payment_type === "partial" && (
          <div style={{ marginTop: 12, padding: 12, background: C.surfaceBg, borderRadius: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted }}>অ্যাডভান্সের হার:</span>
              <input type="number" min={1} max={100} value={shop.advance_percentage || 20}
                onChange={e => setShop(prev => ({ ...prev, advance_percentage: parseInt(e.target.value) || 20 }))}
                onBlur={e => saveShop({ advance_percentage: parseInt(e.target.value) || 20 })}
                style={{ width: 50, padding: "4px 6px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 13, textAlign: "center" }} />
              <span style={{ fontSize: 12, color: C.textMuted }}>%</span>
            </div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textSecondary }}>
              উদাহরণ: ৳১,০০০ এর অর্ডারে অ্যাডভান্স = ৳{Math.round(1000 * (shop.advance_percentage || 20) / 100).toLocaleString()}
            </div>
          </div>
        )}
        {["full", "partial"].includes(shop.advance_payment_type) && !hasMobileBanking && (
          <div style={{ marginTop: 10, padding: "8px 12px", background: C.yellowSoft, borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.yellowText }}>
            ⚠️ অ্যাডভান্স পেমেন্ট চালু করতে অন্তত একটি মোবাইল ব্যাংকিং মেথড (bKash/Nagad/Rocket) চালু করুন।
          </div>
        )}
      </Card>
    </div>
  );
}

// ============ ONBOARDING WIZARD ============
function OnboardingWizard({ sellerId, pageName, onComplete }: { sellerId: string; pageName: string; onComplete: () => void }) {
  const mobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [shopName, setShopName] = useState(pageName);
  const [products, setProducts] = useState<any[]>([]);
  const [prodForm, setProdForm] = useState({ name: "", price: "", category: "" });
  const [delivery, setDelivery] = useState(DIVISIONS.map(d => ({ ...d, is_enabled: d.key === "dhaka", charge: d.defaultCharge, min: d.minDays, max: d.maxDays })));
  const [payments, setPayments] = useState([
    { type: "cod", enabled: true, number: "" },
    { type: "bkash", enabled: false, number: "" },
    { type: "nagad", enabled: false, number: "" },
    { type: "rocket", enabled: false, number: "" },
  ]);
  const [advanceType, setAdvanceType] = useState("none");
  const [advancePct, setAdvancePct] = useState(20);
  const [saving, setSaving] = useState(false);

  function addProduct() {
    if (!prodForm.name || !prodForm.price) return;
    setProducts([...products, { name: prodForm.name, price: parseFloat(prodForm.price), category: prodForm.category || null, in_stock: true }]);
    setProdForm({ name: "", price: "", category: "" });
  }

  async function complete() {
    setSaving(true);
    // Save shop
    await supabase.from("shop_settings").upsert({ seller_id: sellerId, shop_name: shopName, advance_payment_type: advanceType, advance_percentage: advancePct }, { onConflict: "seller_id" });
    // Save products
    if (products.length > 0) await supabase.from("products").insert(products.map(p => ({ seller_id: sellerId, ...p })));
    // Save delivery
    await supabase.from("delivery_settings").upsert(delivery.map(d => ({ seller_id: sellerId, division: d.key, is_enabled: d.is_enabled, delivery_charge: d.charge, estimated_days_min: d.min, estimated_days_max: d.max })), { onConflict: "seller_id,division" });
    // Save payments
    await supabase.from("payment_settings").upsert(payments.map(p => ({ seller_id: sellerId, payment_type: p.type, is_enabled: p.enabled, account_number: p.number, account_type: "personal" })), { onConflict: "seller_id,payment_type" });
    setSaving(false);
    onComplete();
  }

  const stepTitles = ["", "দোকানের নাম", "প্রোডাক্ট", "ডেলিভারি", "পেমেন্ট", "অ্যাডভান্স"];
  const totalSteps = 5;

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: mobile ? 16 : 24 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 40, marginBottom: 16 }} />
          {/* Progress */}
          <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} style={{ width: 32, height: 4, borderRadius: 2, background: i < step ? C.vermillion : C.border }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 12, color: C.textMuted }}>ধাপ {step}/{totalSteps} — {stepTitles[step]}</div>
        </div>

        <Card style={{ padding: mobile ? 20 : 28 }}>
          {/* Step 1: Shop Name */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 20, color: C.deepInk, margin: "0 0 8px", textAlign: "center" }}>আপনার দোকানের নাম কী?</h2>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted, textAlign: "center", margin: "0 0 20px" }}>এই নামটি আপনার ড্যাশবোর্ডে দেখাবে</p>
              <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="যেমন: ফাতিমার বুটিক"
                style={{ width: "100%", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 16, fontFamily: "'Tiro Bangla', serif", color: C.deepInk, textAlign: "center", boxSizing: "border-box" }} />
              <Btn onClick={() => { if (shopName.length >= 2) setStep(2); }} disabled={shopName.length < 2} style={{ width: "100%", marginTop: 16, padding: 12 }}>পরবর্তী →</Btn>
            </div>
          )}

          {/* Step 2: Add Products */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 20, color: C.deepInk, margin: "0 0 8px", textAlign: "center" }}>প্রোডাক্ট যোগ করুন</h2>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted, textAlign: "center", margin: "0 0 16px" }}>AI এই তথ্য দিয়ে কাস্টমারকে রিপ্লাই দেবে</p>
              <Input label="প্রোডাক্টের নাম" value={prodForm.name} onChange={v => setProdForm({ ...prodForm, name: v })} placeholder="জামদানি শাড়ি" />
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}><Input label="দাম (৳)" value={prodForm.price} onChange={v => setProdForm({ ...prodForm, price: v })} type="number" placeholder="3500" /></div>
                <div style={{ flex: 1 }}><Input label="ক্যাটাগরি" value={prodForm.category} onChange={v => setProdForm({ ...prodForm, category: v })} placeholder="পোশাক" /></div>
              </div>
              <Btn onClick={addProduct} primary={false} disabled={!prodForm.name || !prodForm.price} style={{ width: "100%", marginBottom: 12 }}>+ যোগ করুন</Btn>
              {products.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                  {products.map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: C.surfaceBg, borderRadius: 6 }}>
                      <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.deepInk }}>{p.name} — ৳{p.price}</span>
                      <button onClick={() => setProducts(products.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: C.redText, cursor: "pointer", fontSize: 14 }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <Btn onClick={() => setStep(3)} primary={false} style={{ flex: 1, padding: 12 }}>এড়িয়ে যান</Btn>
                <Btn onClick={() => setStep(3)} disabled={products.length === 0} style={{ flex: 1, padding: 12 }}>পরবর্তী →</Btn>
              </div>
            </div>
          )}

          {/* Step 3: Delivery */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 20, color: C.deepInk, margin: "0 0 8px", textAlign: "center" }}>কোথায় ডেলিভারি করেন?</h2>
              <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted, textAlign: "center", margin: "0 0 16px" }}>যে বিভাগে পাঠান সেটি চালু করুন</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {delivery.map((d, i) => (
                  <div key={d.key} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, background: d.is_enabled ? C.surfaceBg : "#f5f3ee", borderRadius: 8, opacity: d.is_enabled ? 1 : 0.5 }}>
                    <Toggle on={d.is_enabled} onChange={v => setDelivery(prev => prev.map((x, j) => j === i ? { ...x, is_enabled: v } : x))} />
                    <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: 500, color: C.deepInk, minWidth: 70 }}>{d.bn}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>৳</span>
                      <input type="number" value={d.charge} disabled={!d.is_enabled}
                        onChange={e => setDelivery(prev => prev.map((x, j) => j === i ? { ...x, charge: parseFloat(e.target.value) || 0 } : x))}
                        style={{ width: 50, padding: "4px 4px", borderRadius: 4, border: `1px solid ${C.border}`, fontSize: 12, textAlign: "center" }} />
                    </div>
                  </div>
                ))}
              </div>
              <Btn onClick={() => setStep(4)} style={{ width: "100%", padding: 12 }}>পরবর্তী →</Btn>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 20, color: C.deepInk, margin: "0 0 8px", textAlign: "center" }}>কিভাবে পেমেন্ট নেন?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {payments.map((p, i) => (
                  <div key={p.type} style={{ padding: 12, background: C.surfaceBg, borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: C.deepInk }}>{{ cod: "COD", bkash: "bKash", nagad: "Nagad", rocket: "Rocket" }[p.type]}</span>
                      <Toggle on={p.enabled} onChange={v => setPayments(prev => prev.map((x, j) => j === i ? { ...x, enabled: v } : x))} />
                    </div>
                    {p.enabled && p.type !== "cod" && (
                      <input placeholder="01XXXXXXXXX" value={p.number}
                        onChange={e => setPayments(prev => prev.map((x, j) => j === i ? { ...x, number: e.target.value } : x))}
                        style={{ width: "100%", marginTop: 8, padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "'DM Sans'", boxSizing: "border-box" }} />
                    )}
                  </div>
                ))}
              </div>
              <Btn onClick={() => setStep(5)} style={{ width: "100%", padding: 12 }}>পরবর্তী →</Btn>
            </div>
          )}

          {/* Step 5: Advance Payment */}
          {step === 5 && (
            <div>
              <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 20, color: C.deepInk, margin: "0 0 8px", textAlign: "center" }}>অ্যাডভান্স পেমেন্ট লাগবে?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {[
                  { key: "none", label: "লাগবে না (COD)", desc: "ডেলিভারিতে পেমেন্ট" },
                  { key: "full", label: "পুরো টাকা আগে", desc: "সব আগে পাঠাতে হবে" },
                  { key: "partial", label: "আংশিক অ্যাডভান্স", desc: "একটি অংশ আগে" },
                  { key: "optional", label: "কাস্টমারের ইচ্ছা", desc: "চাইলে আগে দিতে পারবে" },
                ].map(opt => (
                  <div key={opt.key} onClick={() => setAdvanceType(opt.key)}
                    style={{ padding: 12, borderRadius: 8, border: `2px solid ${advanceType === opt.key ? C.vermillion : C.border}`, background: advanceType === opt.key ? C.vermillionLight : "#fff", cursor: "pointer" }}>
                    <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk }}>{opt.label}</div>
                    <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
              {advanceType === "partial" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, justifyContent: "center" }}>
                  <input type="number" min={1} max={100} value={advancePct} onChange={e => setAdvancePct(parseInt(e.target.value) || 20)}
                    style={{ width: 50, padding: "6px 6px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 14, textAlign: "center" }} />
                  <span style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted }}>% অ্যাডভান্স</span>
                </div>
              )}
              <Btn onClick={complete} disabled={saving} style={{ width: "100%", padding: 14, fontSize: 15 }}>{saving ? "সেভ হচ্ছে..." : "🎉 সম্পন্ন!"}</Btn>
            </div>
          )}
        </Card>

        {step > 1 && (
          <button onClick={() => setStep(step - 1)} style={{ display: "block", margin: "12px auto 0", background: "none", border: "none", fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted, cursor: "pointer" }}>← পিছনে যান</button>
        )}
      </div>
    </div>
  );
}

// ============ COMING SOON PAGES ============
function CourierPage() { return <ComingSoonOverlay pageName="কুরিয়ার"><Card><EmptyState icon="🚚" title="কোনো পার্সেল নেই" subtitle="নতুন পার্সেল বুক করুন" /></Card></ComingSoonOverlay>; }
function PaymentPage() { return <ComingSoonOverlay pageName="পেমেন্ট"><Card><EmptyState icon="💳" title="কোনো পেমেন্ট নেই" subtitle="পেমেন্ট রেকর্ড এখানে দেখাবে" /></Card></ComingSoonOverlay>; }
function HisabPage() { return <ComingSoonOverlay pageName="হিসাব"><Card><EmptyState icon="📊" title="কোনো হিসাব নেই" subtitle="হিসাবের রেকর্ড এখানে দেখাবে" /></Card></ComingSoonOverlay>; }

// ============ MAIN DASHBOARD ============
export default function DashboardPage() {
  const mobile = useIsMobile();
  const [activePage, setActivePage] = useState("dashboard");
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [pageName, setPageName] = useState("আপনার দোকান");
  const [notConnected, setNotConnected] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const sid = localStorage.getItem("damkoto_seller_id");
    const pn = localStorage.getItem("damkoto_page_name");
    if (sid) {
      setSellerId(sid);
      if (pn) setPageName(pn);
      // Check if onboarding is needed
      supabase.from("shop_settings").select("id").eq("seller_id", sid).single().then(({ data }) => {
        if (!data) setShowOnboarding(true);
        setCheckingOnboarding(false);
      });
    } else {
      setNotConnected(true);
      setCheckingOnboarding(false);
    }
  }, []);

  function connectFacebook() {
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const scope = encodeURIComponent('pages_show_list,pages_messaging,pages_manage_metadata');
    window.location.href = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  }

  function navigateTo(page: string) {
    setActivePage(page);
    if (mobile) setSidebarOpen(false);
  }

  if (notConnected) {
    return (
      <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ textAlign: "center", maxWidth: 400, width: "100%" }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 48, marginBottom: 24 }} />
          <Card>
            <h2 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 18, color: C.deepInk, margin: "0 0 12px" }}>প্রথমে আপনার Facebook Page কানেক্ট করুন</h2>
            <p style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted, margin: "0 0 20px" }}>ড্যাশবোর্ড ব্যবহার করতে আপনার Facebook Page কানেক্ট করতে হবে।</p>
            <Btn onClick={connectFacebook} style={{ width: "100%" }}>🔗 Facebook Page কানেক্ট করুন</Btn>
          </Card>
        </div>
      </div>
    );
  }

  if (!sellerId) return <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontFamily: "'Tiro Bangla', serif", color: C.textMuted }}>লোড হচ্ছে...</p></div>;

  if (checkingOnboarding) return <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontFamily: "'Tiro Bangla', serif", color: C.textMuted }}>লোড হচ্ছে...</p></div>;

  if (showOnboarding) return <OnboardingWizard sellerId={sellerId} pageName={pageName} onComplete={() => setShowOnboarding(false)} />;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardHome sellerId={sellerId} setPage={navigateTo} />;
      case "messages": return <MessagesPage sellerId={sellerId} />;
      case "orders": return <OrdersPage sellerId={sellerId} />;
      case "products": return <ProductsPage sellerId={sellerId} />;
      case "customers": return <CustomersPage sellerId={sellerId} />;
      case "autoreply": return <AutoReplyPage sellerId={sellerId} />;
      case "settings": return <SettingsPage sellerId={sellerId} pageName={pageName} />;
      case "courier": return <CourierPage />;
      case "payment": return <PaymentPage />;
      case "hisab": return <HisabPage />;
      default: return <DashboardHome sellerId={sellerId} setPage={navigateTo} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif", background: C.offWhite, overflow: "hidden" }}>
      {/* Mobile overlay */}
      {mobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(26,18,8,0.4)", zIndex: 90 }} />}

      {/* Sidebar */}
      <aside style={{
        width: 220, background: C.cardBg, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh",
        ...(mobile ? { position: "fixed", left: sidebarOpen ? 0 : -240, top: 0, zIndex: 100, transition: "left 0.25s ease", boxShadow: sidebarOpen ? "4px 0 20px rgba(26,18,8,0.15)" : "none" } : {})
      }}>
        <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/damkoto-logo.png" alt="দাম কত?" style={{ height: 40, width: "auto" }} />
          {mobile && <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.textMuted }}>✕</button>}
        </div>
        <nav style={{ flex: 1, padding: "4px 8px", overflowY: "auto" }}>
          {navItems.map(item => {
            const active = activePage === item.id;
            return <button key={item.id} onClick={() => navigateTo(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: active ? C.vermillionLight : "transparent", color: active ? C.vermillion : C.textSecondary, cursor: "pointer", fontFamily: "'Tiro Bangla', serif", fontSize: 13, fontWeight: active ? 600 : 400, marginBottom: 2, transition: "all 0.15s" }}><NavIcon type={item.icon} active={active} />{item.label}</button>;
          })}
        </nav>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ background: C.saffronLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 11, color: C.textMuted }}>বর্তমান প্ল্যান</div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 14, fontWeight: 600, color: C.deepInk }}>ফ্রি প্ল্যান</div>
            <button style={{ marginTop: 8, width: "100%", padding: "7px 0", background: C.saffron, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Tiro Bangla', serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>⬆ আপগ্রেড করুন</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <header style={{ height: 52, background: C.cardBg, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {mobile && <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.textSecondary, padding: 4 }}>☰</button>}
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 13, color: C.textMuted }}>{pageName}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", cursor: "pointer" }}><span style={{ fontSize: 18, color: C.textMuted }}>🔔</span></div>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: C.surfaceBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.textMuted, cursor: "pointer" }}>👤</div>
          </div>
        </header>
        <main style={{ flex: 1, overflow: "auto", padding: mobile ? 14 : 24 }}>
          <h1 style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: mobile ? 18 : 22, fontWeight: 600, color: C.deepInk, margin: "0 0 16px" }}>{pageLabels[activePage]}</h1>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
