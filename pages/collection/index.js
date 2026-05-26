import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '../../components/Navbar'
import CartSidebar from '../../components/CartSidebar'
import Toast from '../../components/Toast'

function ProductEntry({ product, index, onAddToCart }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Gold divider */}
      {index > 0 && (
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-0" />
      )}

      {/* Product row — alternates left/right */}
      <div className={`grid grid-cols-1 md:grid-cols-2 md:h-screen items-start`}>

        {/* Image side */}
        <div className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <a href={`/products/${product._id}`}>
            <div className="md:sticky md:top-0 md:h-screen md:max-h-screen overflow-hidden h-[100vw]">
              <img
  src={product.image}
  alt={product.name}
  className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
/>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-8 left-8 font-mono text-[9px] tracking-widest uppercase bg-gold text-obsidian px-3 py-1.5">
                  {product.badge}
                </span>
                
              )}


              {/* Category bottom left */}
              <div className="absolute bottom-8 left-8">
                <span className="font-mono text-[9px] tracking-widest uppercase text-gold/70">
                  {product.category}
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Info side */}
        <div className={`flex flex-col justify-center px-6 md:px-12 py-10 md:py-12 bg-obsidian ${isEven ? 'md:order-2' : 'md:order-1'}`}>
          {/* Index number */}
          <span className="font-mono text-[10px] tracking-widest uppercase text-gold/20 mb-6">
            {String(index + 1).padStart(2, '0')} / {String(product.totalCount || '').padStart(2, '0')}
          </span>

          <h2 className="font-display text-[clamp(24px,3vw,44px)] font-black text-cream leading-none mb-4">
            {product.name}
          </h2>

          {/* Stars */}
          {product.avgRating > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} width="12" height="12" viewBox="0 0 24 24"
                    fill={star <= Math.round(product.avgRating) ? '#C9A84C' : 'none'}
                    stroke="#C9A84C" strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span className="font-mono text-[9px] text-gold/50">{product.avgRating} / 5</span>
            </div>
          )}

          <p className="font-body text-cream/50 text-sm leading-relaxed mb-4 max-w-md">
            {product.description}
          </p>

          {/* Ingredients */}
          {product.ingredients?.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[9px] tracking-widest uppercase text-gold/40 mb-3">Key Ingredients</p>
<div className="flex flex-wrap gap-2">
  {product.ingredients.slice(0, 4).map((ing, i) => (
    <span key={i} className="font-body text-xs border border-gold/20 text-gold/60 px-3 py-1">
      {ing}
    </span>
  ))}
  {product.ingredients.length > 4 && (
    <span className="font-body text-xs text-gold/30 px-1 py-1">
      +{product.ingredients.length - 4} more
    </span>
  )}
</div>
            </div>
          )}

          {/* Price */}
          <div className="flex flex-col gap-1 mb-4">
            {product.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="font-body text-sm text-cream/30 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
                <span className="font-mono text-[9px] uppercase bg-gold/10 text-gold px-2 py-0.5">
                  {product.discountPercent}% off
                </span>
              </div>
            )}
            <span className="font-display text-3xl font-black text-gold">
              PKR {product.price.toLocaleString()}
            </span>
          </div>

          {/* Stock */}
<div className="flex items-center gap-3 mb-4 flex-wrap">
  <span className={`font-mono text-[10px] uppercase tracking-widest ${product.countInStock > 0 ? 'text-green-400' : 'text-red-400'}`}>
    {product.countInStock > 0 ? `In Stock · ${product.countInStock} left` : 'Out of Stock'}
  </span>
  {product.deliveryType === 'free' && (
    <span className="font-mono text-[9px] uppercase tracking-widest text-white bg-green-500 px-3 py-1">
      ✦ Free Delivery
    </span>
  )}
</div>
          {/* Buttons */}
          <div className="flex flex-col gap-3 max-w-xs">
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
                className="w-full font-mono text-[11px] tracking-widest uppercase bg-gold text-obsidian py-4 hover:bg-gold/80 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
            )}
            <a
              href={`/products/${product._id}`}
              className="w-full font-mono text-[11px] tracking-widest uppercase border border-gold/30 text-gold/60 py-4 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
            >
              View Details
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

     
    </motion.div>
  )
}

export default function CollectionPage({
  user, onLogout, setAuthOpen,
  cartItems, setCartOpen, onAddToCart, onRemoveFromCart, onClearCart, toast
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [localToast, setLocalToast] = useState({ show: false, message: '' })

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setToast({ show: true, message: `✦ "${product.name}" added to cart` })
    setTimeout(() => setToast({ show: false, message: '' }), 3200)
    setCartOpen(true)
  }

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => {
        const prods = res.data.products || []
        setProducts(prods)
        setLoading(false)
        // Fetch reviews for each product
        prods.forEach(p => {
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${p._id}`)
            .then(r => setReviews(prev => ({ ...prev, [p._id]: r.data.avgRating })))
            .catch(() => {})
        })
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      <Head>
        <title>The Collection — Cosmetic World</title>
        <meta name="description" content="Our full signature collection of luxury natural beauty products." />
      </Head>

      <div className="min-h-screen bg-obsidian">
<Navbar
  cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
  onCartClick={() => setCartOpen(true)}
  user={user}
  onLoginClick={() => setAuthOpen(true)}
  onLogout={onLogout}
/>
  <CartSidebar
    isOpen={cartOpen}
    onClose={() => setCartOpen(false)}
    cartItems={cartItems}
    onRemove={handleRemoveFromCart}
    onClearCart={() => setCartItems([])}
  />
  <Toast show={toast.show} message={toast.message} />

        {/* Hero header */}
        <div className="relative h-screen flex flex-col items-center justify-center bg-obsidian overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
          </div>

          {/* Back link */}
          <div className="absolute top-8 left-8 md:top-10 md:left-16 z-10 pt-16">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-gold/40 hover:text-gold transition-colors">
              <ArrowLeft size={13} />
              Back to Store
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 text-center px-8"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-gold/40">
              ✦ Cosmetic World
            </span>
            <h1 className="font-display text-[clamp(48px,8vw,120px)] font-black text-cream leading-none">
              The{' '}
              <span className="font-heading italic font-bold text-gold">Collection</span>
            </h1>
            <p className="font-body text-cream/30 text-sm max-w-md leading-relaxed">
              Each formula is a marriage of ancient ingredient wisdom and modern scientific formulation.
            </p>
            <div className="flex items-center gap-3 mt-4" style={{ transform: 'translateY(-20px)' }}>
              <div className="w-12 h-px bg-gold/20" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-gold/30">
                {products.length} Formulas
              </span>
              <div className="w-12 h-px bg-gold/20" />
            </div>
          </motion.div>

{/* Scroll hint */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5 }}
  className="absolute bottom-10 flex flex-col items-center gap-6"
>
  <div className="flex items-center gap-3">
{['Skincare', 'Haircare', 'Bodycare'].map((cat) => (
  <Link
    key={cat}
    href="/collection/categories"
    className="relative font-mono text-[10px] tracking-widest uppercase text-gold/40 hover:text-gold border border-gold/15 hover:border-gold/40 px-6 py-3 transition-colors duration-200 overflow-hidden group"
  >
    {/* Shimmer sweep */}
    <span
      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 40%, rgba(255,240,180,0.25) 50%, rgba(201,168,76,0.15) 60%, transparent 100%)',
      }}
    />
    {/* Ambient glitter — always animating */}
    {/* Always-on slow shimmer */}
<span
  className="absolute inset-0"
  style={{
    background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 40%, rgba(255,240,180,0.13) 50%, rgba(201,168,76,0.08) 60%, transparent 100%)',
    animation: 'slowShimmer 3.5s ease-in-out infinite',
  }}
/>
    <span
      className="absolute inset-0 opacity-0 hover:opacity-100"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        animation: 'pulseGlow 2.5s ease-in-out infinite',
      }}
    />
    <span className="relative z-10">{cat}</span>
  </Link>
))}
  </div>
  <span className="font-mono text-[8px] tracking-widest uppercase text-gold/20">Scroll to explore</span>
  <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent"
  />
</motion.div>
        </div>

        {/* Products */}
        {products.map((product, index) => (
          <ProductEntry
            key={product._id}
            product={{ ...product, avgRating: reviews[product._id] || 0, totalCount: products.length }}
            index={index}
            onAddToCart={handleAddToCart}
          />
        ))}

        {/* End of collection */}
        <div className="py-32 flex flex-col items-center gap-6 text-center px-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gold/20" />
            <span className="font-display text-5xl text-gold/20">✦</span>
            <div className="w-16 h-px bg-gold/20" />
          </div>
          <p className="font-mono text-[9px] tracking-widest uppercase text-gold/30">End of Collection</p>
          <p className="font-body text-cream/20 text-sm max-w-xs leading-relaxed">
            More formulas are being crafted with ancient wisdom and modern science.
          </p>
          <Link href="/"
            className="mt-4 font-mono text-[10px] tracking-widest uppercase border border-gold/20 text-gold/40 px-8 py-4 hover:border-gold/50 hover:text-gold/70 transition-colors">
            Back to Store
          </Link>
        </div>

      </div>
    </>
  )
}
