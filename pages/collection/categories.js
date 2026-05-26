import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import CartSidebar from '../../components/CartSidebar'
import Toast from '../../components/Toast'

const CATEGORY_META = {
  skincare: {
    label: 'Skincare',
    tag: 'For Your Skin',
    description: 'Formulas crafted to cleanse, restore, and illuminate your complexion.',
    accent: '#C9A84C',
  },
  haircare: {
    label: 'Haircare',
    tag: 'For Your Hair',
    description: 'Nourishing treatments rooted in ancient botanical wisdom.',
    accent: '#C9A84C',
  },
  bodycare: {
    label: 'Bodycare',
    tag: 'For Your Body',
    description: 'Luxurious rituals for skin that feels as good as it looks.',
    accent: '#C9A84C',
  },
}

const CATEGORY_ORDER = ['skincare', 'haircare', 'bodycare']

function ProductCard({ product, onAddToCart, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="group relative flex flex-col bg-[#111009] border border-gold/10 hover:border-gold/30 transition-colors duration-300"
    >
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#0D0C0A]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.badge && (
            <span className="absolute top-3 left-3 font-mono text-[8px] tracking-widest uppercase bg-gold text-obsidian px-2 py-1">
              {product.badge}
            </span>
          )}
          {product.deliveryType === 'free' && (
            <span className="absolute bottom-3 left-3 font-mono text-[8px] tracking-widest uppercase bg-green-500 text-white px-2 py-1" style={{ zIndex: 40 }}>
              Free Delivery
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-[9px] tracking-widest uppercase text-cream/70 border border-cream/20 px-4 py-2 backdrop-blur-sm bg-obsidian/40">
              View Details
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-2">
        <span className="font-mono text-[8px] tracking-widest uppercase text-gold/40">
          {product.category}
        </span>
        <Link href={`/products/${product._id}`}>
          <h3 className="font-heading text-sm font-bold text-cream leading-tight hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-sm font-bold text-gold">
            PKR {product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-cream/25 line-through">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <span className={`font-mono text-[8px] uppercase tracking-widest ${product.countInStock > 0 ? 'text-green-400/60' : 'text-red-400/60'}`}>
          {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
        {product.countInStock > 0 && (
          <button
            onClick={() => onAddToCart({
              id: product._id,
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              countInStock: product.countInStock,
              deliveryType: product.deliveryType || 'standard',
            })}
            className="mt-2 w-full font-mono text-[9px] tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 py-2.5 hover:bg-gold hover:text-obsidian transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={11} />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  )
}

function CategorySection({ category, products, onAddToCart }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const meta = CATEGORY_META[category] || { label: category, tag: '', description: '' }

  if (products.length === 0) return null

  return (
    <section ref={ref} className="py-20 px-6 md:px-16 border-t border-gold/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
      >
        <div>
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold/40 flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-gold/30 inline-block" />
            {meta.tag}
          </span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-black text-cream leading-none">
            {meta.label}
          </h2>
        </div>
        <div className="flex items-end gap-6">
          <p className="font-body text-cream/30 text-sm max-w-xs leading-relaxed md:text-right">
            {meta.description}
          </p>
          <span className="font-mono text-[9px] text-gold/25 whitespace-nowrap pb-1">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map((product, i) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}

export default function CategoriesPage({
  user, onLogout, setAuthOpen,
  cartItems = [], setCartOpen, onAddToCart, onRemoveFromCart, onClearCart, toast = { show: false, message: '' }
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => {
        setProducts(res.data.products || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const grouped = products.reduce((acc, p) => {
    const cat = p.category?.toLowerCase() || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  const categoryKeys = [
    ...CATEGORY_ORDER.filter(c => grouped[c]?.length > 0),
    ...Object.keys(grouped).filter(c => !CATEGORY_ORDER.includes(c) && grouped[c]?.length > 0),
  ]

  const tabs = ['all', ...categoryKeys]
  const visibleCategories = activeTab === 'all' ? categoryKeys : [activeTab]

  if (loading) return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      <Head>
        <title>Shop by Category — Cosmetic World</title>
        <meta name="description" content="Browse skincare, haircare and bodycare products." />
      </Head>

      <div className="min-h-screen bg-obsidian">
        <Navbar
          cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          onCartClick={() => setCartOpen(true)}
          user={user}
          onLoginClick={() => setAuthOpen?.(true)}
          onLogout={onLogout}
        />
        <CartSidebar
          isOpen={false}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onRemove={onRemoveFromCart}
          onClearCart={onClearCart}
        />
        <Toast show={toast.show} message={toast.message} />

        <div className="pt-32 pb-0 px-6 md:px-16">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/collection" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-gold/40 hover:text-gold transition-colors">
              <ArrowLeft size={12} />
              Collection
            </Link>
            <span className="text-gold/20 text-xs">·</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-gold/20">Categories</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-0">
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-gold/40 flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold/30 inline-block" />
                Browse
              </span>
              <h1 className="font-display text-[clamp(40px,6vw,80px)] font-black text-cream leading-none">
                Shop by{' '}
                <span className="font-heading italic font-bold text-gold">Category</span>
              </h1>
            </div>
            <p className="font-body text-cream/25 text-sm max-w-xs leading-relaxed md:text-right pb-2">
              {products.length} formulas across {categoryKeys.length} categories — each one crafted with purpose.
            </p>
          </div>

          <div className="flex items-center gap-0 mt-10 border-b border-gold/10">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative font-mono text-[10px] tracking-widest uppercase px-6 py-4 transition-colors duration-200 ${
                  activeTab === tab ? 'text-gold' : 'text-cream/25 hover:text-cream/50'
                }`}
              >
                {tab === 'all' ? 'All' : CATEGORY_META[tab]?.label || tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {visibleCategories.map(cat => (
          <CategorySection
            key={cat}
            category={cat}
            products={grouped[cat] || []}
            onAddToCart={onAddToCart}
          />
        ))}

        {visibleCategories.length === 0 && (
          <div className="py-32 flex flex-col items-center gap-4 text-center">
            <span className="font-display text-5xl text-gold/10">✦</span>
            <p className="font-mono text-[10px] tracking-widest uppercase text-gold/20">No products found</p>
          </div>
        )}

        <div className="py-20 flex flex-col items-center gap-4 border-t border-gold/10 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gold/15" />
            <span className="font-display text-3xl text-gold/15">✦</span>
            <div className="w-12 h-px bg-gold/15" />
          </div>
          <p className="font-mono text-[9px] tracking-widest uppercase text-gold/20">Cosmetic World</p>
          <Link href="/collection"
            className="mt-2 font-mono text-[10px] tracking-widest uppercase border border-gold/15 text-gold/30 px-6 py-3 hover:border-gold/40 hover:text-gold/50 transition-colors">
            View Full Collection
          </Link>
        </div>
      </div>
    </>
  )
}