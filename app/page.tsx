'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export default function Dashboard() {
  const [customers, setCustomers] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: customersData } = await supabase
      .from('customers').select('*').order('first_seen', { ascending: false })
    const { data: messagesData } = await supabase
      .from('messages').select('*').order('created_at', { ascending: false }).limit(20)
    const { data: productsData } = await supabase
      .from('products').select('*').order('created_at', { ascending: false })
    setCustomers(customersData || [])
    setMessages(messagesData || [])
    setProducts(productsData || [])
    setLoading(false)
  }

  async function addProduct() {
    if (!newProduct.name || !newProduct.price) return
    setSaving(true)
    const { data: seller } = await supabase
      .from('sellers').select('id').limit(1)
    if (!seller || seller.length === 0) {
      alert('No seller found. Send a message first to initialize.')
      setSaving(false)
      return
    }
    await supabase.from('products').insert({
      seller_id: seller[0].id,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      description: newProduct.description,
      in_stock: true
    })
    setNewProduct({ name: '', price: '', description: '' })
    setSaving(false)
    fetchData()
  }

  async function deleteProduct(id: string) {
    await supabase.from('products').delete().eq('id', id)
    fetchData()
  }

  async function toggleStock(id: string, current: boolean) {
    await supabase.from('products').update({ in_stock: !current }).eq('id', id)
    fetchData()
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-green-400">DamKoto 🛒</h1>
          <p className="text-gray-500 text-xs">Seller Dashboard</p>
        </div>
        <div className="flex gap-2">
          {['dashboard', 'products', 'messages'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-gray-400 text-sm">Customers</p>
                <p className="text-4xl font-bold text-white mt-1">{customers.length}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-gray-400 text-sm">Messages</p>
                <p className="text-4xl font-bold text-white mt-1">{messages.length}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-gray-400 text-sm">Products</p>
                <p className="text-4xl font-bold text-green-400 mt-1">{products.length}</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800">
              <div className="p-5 border-b border-gray-800">
                <h2 className="font-semibold">Recent Customers</h2>
              </div>
              {customers.length === 0 ? (
                <p className="p-5 text-gray-400">No customers yet</p>
              ) : (
                <div className="divide-y divide-gray-800">
                  {customers.map(c => (
                    <div key={c.id} className="p-4 flex justify-between">
                      <div>
                        <p className="font-medium">{c.name || 'Customer'}</p>
                        <p className="text-gray-500 text-xs">{c.facebook_user_id}</p>
                      </div>
                      <p className="text-green-400 text-sm">{c.message_count} messages</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            {/* Add product form */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-6">
              <h2 className="font-semibold mb-4">Add New Product</h2>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <input
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                  placeholder="Product name"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
                <input
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                  placeholder="Price in BDT"
                  type="number"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                />
                <input
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                  placeholder="Description (optional)"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <button
                onClick={addProduct}
                disabled={saving}
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50">
                {saving ? 'Saving...' : '+ Add Product'}
              </button>
            </div>

            {/* Product list */}
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              <div className="p-5 border-b border-gray-800">
                <h2 className="font-semibold">Your Products ({products.length})</h2>
              </div>
              {products.length === 0 ? (
                <p className="p-5 text-gray-400">No products yet. Add your first product above!</p>
              ) : (
                <div className="divide-y divide-gray-800">
                  {products.map(p => (
                    <div key={p.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-gray-400 text-sm">{p.description || 'No description'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-green-400 font-semibold">৳{p.price}</p>
                        <button
                          onClick={() => toggleStock(p.id, p.in_stock)}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            p.in_stock
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                          }`}>
                          {p.in_stock ? 'In Stock' : 'Out of Stock'}
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-400 hover:text-red-300 text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="p-5 border-b border-gray-800">
              <h2 className="font-semibold">All Messages</h2>
            </div>
            {messages.length === 0 ? (
              <p className="p-5 text-gray-400">No messages yet</p>
            ) : (
              <div className="divide-y divide-gray-800">
                {messages.map(m => (
                  <div key={m.id} className="p-4 flex gap-3 items-start">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium mt-1 shrink-0 ${
                      m.direction === 'incoming'
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-green-900 text-green-300'
                    }`}>
                      {m.direction === 'incoming' ? '📩 Customer' : '🤖 DamKoto'}
                    </span>
                    <p className="text-gray-200 flex-1">{m.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}