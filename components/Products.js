import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

const fallbackProducts = [
  {
    id: 1,
    name: '24K Gold Face Wash',
    category: 'Skincare · Face',
    price: 'PKR 2,499',
    badge: 'Bestseller',
    desc: 'Real gold particles fused with hyaluronic acid brighten, tighten and revitalise for a mirror-like radiance.',
    icon: '✦',
    image: '/images/FW24k.png',
    bg: 'from-amber-950 to-amber-900',
  },
  {
    id: 2,
    name: 'Ancient Glow Rice Protein Shampoo',
    category: 'Haircare · Scalp',
    price: 'PKR 1,899',
    badge: 'New',
    desc: 'Rooted in centuries of East Asian beauty ritual. Rice protein rebuilds each strand delivering glass-hair shine.',
    icon: '◈',
    image: '/images/ARGPS_4.png',
    bg: 'from-stone-900 to-stone-800',
  },
  {
    id: 3,
    name: 'Tea Tree Face Wash',
    category: 'Skincare · Face',
    price: 'PKR 1,499',
    badge: 'Pure',
    desc: 'Australian tea tree extract meets cool aloe vera — deep-cleansing, pore-tightening, breakout-calming.',
    icon: '❋',
    image: '/images/TTFW_2.png',
    bg: 'from-emerald-950 to-emerald-900',
  },
  {
    id: 4,
    name: 'Lavenders Bead Shower Gel',
    category: 'Body Care · Bath',
    price: 'PKR 1,699',
    badge: 'Luxury',
    desc: 'Micro-exfoliating lavender beads dissolve on contact leaving skin impossibly soft with a lingering floral signature.',
    icon: '✿',
    image: '/images/LBSG_3.png',
    bg: 'from-purple-950 to-purple-900',
  },
]

const categoryBg = {
  skincare: 'from-amber-950 to-amber-900',
  haircare: 'from-stone-900 to-stone-800',
  bodycare: 'from-purple-950 to-purple-900',
}

function formatProduct(p) {
  return {
    id: p._id,
    _id: p._id,
    name: p.name,
    category: p.category,
    price: `PKR ${p.price.toLocaleString()}`,
    originalPrice: p.originalPrice ? `PKR ${p.originalPrice.toLocaleString()}` : null,
    discountPercent: p.discountPercent || null,
    badge: p.badge || '',
    desc: p.description,
    icon: '✦',
    image: p.image,
    bg: categoryBg[p.category] || 'from-stone-900 to-stone-800',
    countInStock: p.countInStock,
    deliveryType: p.deliveryType || 'standard',
  }
}

function ProductCard({ product, index, onAdd, hoveredId, setHoveredId }) {
  const [hovered, setHovered] = useState(false)
  const isHovered = hoveredId === product.id || hoveredId === product._id
  const isBlurred = hoveredId !== null && !isHovered
  const [reviews, setReviews] = useState({ avgRating: 0, count: 0 })
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!product._id) return
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${product._id}`)
      .then(res => setReviews({ avgRating: res.data.avgRating, count: res.data.count }))
      .catch(() => {})
  }, [product._id])

  useEffect(() => {
    const handleScroll = () => setHoveredId(null)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      onMouseEnter={() => { setHovered(true); setHoveredId(product.id || product._id) }}
      onMouseLeave={() => { setHovered(false); setHoveredId(null) }}
      className="group relative bg-ivory flex flex-col cursor-pointer"
      style={{
        filter: isBlurred ? 'blur(2px) brightness(0.7)' : 'none',
        transition: 'filter 0.5s ease',
      }}
      onClick={() => window.location.href = `/products/${product._id}`}
    >
      {/* Product image area */}
      <div
        className={`relative aspect-[5/5] bg-gradient-to-b ${product.bg} flex items-center justify-center`}
        style={{ overflow: 'visible' }}
      >
        {product.image ? (
          <motion.div
            animate={{ scale: isHovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: isHovered ? 30 : 1,
              transformOrigin: 'center center',
              pointerEvents: 'none',
              borderRadius: isHovered ? '12px' : '0px',
              overflow: 'hidden',
              transition: 'border-radius 0.5s ease',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 opacity-40">
            <span className="text-7xl text-gold">{product.icon}</span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold/50">
              Add product image
            </span>
          </div>
        )}

        {/* Badge */}
        {product.badge ? (
          <span className="absolute top-2 md:top-4 left-2 md:left-4 font-mono text-[7px] md:text-[9px] tracking-widest uppercase bg-obsidian text-gold px-2 md:px-3 py-1 md:py-1.5" style={{ zIndex: 40 }}>
            {product.badge}
          </span>
        ) : null}

        {/* Free Delivery Badge */}
        {product.deliveryType === 'free' && (
          <span
            className="absolute left-4 font-mono text-[9px] tracking-widest uppercase bg-green-500 text-white px-3 py-1.5"
            style={{ zIndex: 40, bottom: '20px', top: 'auto', fontSize: '9px', letterSpacing: '0.08em', lineHeight: '1' }}
          >
            Free Delivery
          </span>
        )}

        {/* Stars */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1" style={{ zIndex: 40 }}>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(star => (
              <svg key={star} width="9" height="9" viewBox="0 0 24 24"
                fill={star <= Math.round(reviews.avgRating) ? '#C9A84C' : 'none'}
                stroke="#C9A84C" strokeWidth="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          {reviews.count > 0 && (
            <span className="font-mono text-[8px] text-gold/60">
              {reviews.avgRating} ({reviews.count})
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{ zIndex: 40 }}
        >
          {product.countInStock > 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(product) }}
              className="w-full font-body font-semibold text-[10px] tracking-widest uppercase bg-gold text-obsidian py-3 hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={13} />
              Add to Cart
            </button>
          ) : (
            <div className="w-full font-body font-semibold text-[10px] tracking-widest uppercase bg-obsidian/80 text-cream/50 py-3 flex items-center justify-center gap-2 cursor-not-allowed">
              Out of Stock
            </div>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div className="overflow-hidden">
        <div className="p-3 md:p-6 flex flex-col bg-cream border-b border-x border-gold/10 h-44 md:h-64">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold mb-2">
            {product.category}
          </span>
          <h3 className="font-heading text-sm md:text-xl font-bold text-soft-black leading-tight mb-1 md:mb-3">
            {product.name}
          </h3>
          <p className="font-body text-[10px] md:text-xs leading-relaxed text-muted mb-1 line-clamp-2 md:line-clamp-4">
            {product.desc}
          </p>
          <a
            href={`/products/${product._id}`}
            onClick={e => e.stopPropagation()}
            className="font-mono text-[9px] tracking-widest uppercase text-gold hover:text-gold-light transition-colors mb-4"
          >
            More →
          </a>
          <div className="flex items-center justify-between pt-4 border-t border-gold/10">
            <div className="flex flex-col gap-0.5">
              {product.originalPrice && (
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-xs text-muted line-through">{product.originalPrice}</span>
                  <span className="font-mono text-[8px] uppercase tracking-wide bg-gold/10 text-gold px-1.5 py-0.5 rounded-sm">
                    {product.discountPercent}% off
                  </span>
                </div>
              )}
              <span className="font-display text-sm md:text-xl font-black text-soft-black">{product.price}</span>
            </div>
            <span className={`font-mono text-[9px] uppercase tracking-widest ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.countInStock > 0 ? `In Stock · ${product.countInStock}` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products({ onAddToCart }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  const [products, setProducts] = useState(fallbackProducts)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [hoveredId, setHoveredId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const trackRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const colsPerPage = isMobile ? 2 : 4
  const itemsPerPage = colsPerPage

  const canGoLeft = carouselIndex > 0
  const canGoRight = carouselIndex + itemsPerPage < products.length

  // Unified scroll function — syncs both arrow clicks and swipe position
  const scrollToIndex = (index) => {
    const newIndex = Math.max(0, Math.min(index, products.length - 1))
    setCarouselIndex(newIndex)
    if (isMobile && trackRef.current) {
      const cardWidth = trackRef.current.offsetWidth / colsPerPage
      trackRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' })
    }
  }

  // Sync carouselIndex when user swipes manually
  const handleScroll = () => {
    if (!isMobile || !trackRef.current) return
    const cardWidth = trackRef.current.offsetWidth / colsPerPage
    const newIndex = Math.round(trackRef.current.scrollLeft / cardWidth)
    setCarouselIndex(newIndex)
  }

  const fetchProducts = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => {
        if (res.data.products && res.data.products.length > 0) {
          setProducts(res.data.products.map(formatProduct))
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchProducts()
    const interval = setInterval(fetchProducts, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handlePageScroll = () => setHoveredId(null)
    window.addEventListener('scroll', handlePageScroll)
    return () => window.removeEventListener('scroll', handlePageScroll)
  }, [])

  return (
    <>
      {/* Header section */}
      <section id="products" className="bg-white pt-32 px-0">
        <div className="max-w-screen-2xl mx-auto">
          <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 px-4 md:px-8">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                className="section-tag mb-5"
              >
                The Collection
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-[clamp(36px,5vw,72px)] font-black leading-none text-soft-black"
              >
                Our{' '}
                <span className="font-heading italic font-bold text-gold">Signature</span>
                <br />
                Formulas
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="font-body text-sm text-muted max-w-xs leading-relaxed md:text-right"
            >
              Each product is a marriage of ancient ingredient wisdom and modern scientific formulation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Carousel section */}
      <section className="bg-white pb-32" style={{ overflowX: 'clip', overflowY: 'visible' }}>
        <div className="relative" style={{ overflowX: 'clip', overflowY: 'visible' }}>

          {/* Left Arrow */}
          {canGoLeft && (
            <button
              onClick={() => { setDirection(-1); scrollToIndex(carouselIndex - 1) }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-obsidian text-gold flex items-center justify-center hover:bg-gold hover:text-obsidian transition-colors shadow-xl"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* MOBILE: native scroll + snap */}
          {isMobile ? (
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ overflowY: 'visible', WebkitOverflowScrolling: 'touch' }}
            >
              <div
                className="flex"
                style={{
                  width: `${(products.length + 1) * 50}vw`,
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  boxSizing: 'border-box',
                }}
              >
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className="snap-start flex-shrink-0 px-0.5"
                    style={{ width: '50vw' }}
                  >
                    <ProductCard
                      product={p}
                      index={i}
                      onAdd={onAddToCart}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                    />
                  </div>
                ))}
                {/* End Card mobile */}
                <div className="snap-start flex-shrink-0 px-0.5" style={{ width: '50vw' }}>
                  <div className="relative aspect-[5/5] bg-gradient-to-b from-stone-950 to-obsidian flex flex-col items-center justify-center gap-4 px-4">
                    <p className="font-display text-xl font-black text-cream/60 leading-tight text-center">
                      You've seen<br />
                      <span className="font-heading italic text-gold/60">them all</span>
                    </p>
                    <p className="font-body text-[10px] text-cream/50 leading-relaxed text-center">
                      More formulas are being crafted. Check back soon.
                    </p>
                  </div>
                  <div className="p-3 flex flex-col bg-cream border-b border-x border-gold/10 h-44">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-gold/60 mb-2">Coming Soon</span>
                    <h3 className="font-heading text-sm font-bold text-soft-black/50 leading-tight mb-2">New Arrivals</h3>
                    <p className="font-body text-[10px] leading-relaxed text-muted/70">Our next formula is in the making.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DESKTOP: framer-motion transform carousel */
            <div style={{ overflowX: 'clip', overflowY: 'visible' }}>
              <motion.div
                animate={{ x: `calc(-${carouselIndex * 25}%)` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex"
                style={{
                  width: `${products.length * 25}%`,
                  paddingLeft: carouselIndex > 0 ? '0px' : '32px',
                  paddingRight: canGoRight ? '2px' : '32px',
                  transition: 'padding 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxSizing: 'border-box',
                }}
              >
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    style={{
                      width: `${100 / products.length}%`,
                      zIndex: hoveredId === p.id || hoveredId === p._id ? 20 : 1,
                      position: 'relative',
                      overflow: 'visible',
                    }}
                    className="flex-shrink-0 px-0.5"
                  >
                    <ProductCard
                      product={p}
                      index={i}
                      onAdd={onAddToCart}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                    />
                  </div>
                ))}

                {/* End Card desktop */}
                <div
                  style={{ width: `${100 / products.length}%` }}
                  className="flex-shrink-0 px-0.5"
                >
                  <div className="relative aspect-[4/4] bg-gradient-to-b from-stone-950 to-obsidian flex flex-col items-center justify-center gap-6 px-8">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-gold/40">
                        The Collection
                      </span>
                      <span className="font-display text-4xl font-black text-gold/60 text-center leading-tight">
                        ✦
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center">
                      <p className="font-display text-2xl font-black text-cream/60 leading-tight">
                        You've seen<br />
                        <span className="font-heading italic text-gold/60">them all</span>
                      </p>
                      <p className="font-body text-[11px] text-cream/50 leading-relaxed max-w-[160px]">
                        More formulas are being crafted. Check back soon.
                      </p>
                    </div>
                    <div className="absolute bottom-8 flex items-center gap-2">
                      <div className="w-6 h-px bg-gold/40" />
                      <span className="font-mono text-[8px] tracking-widest uppercase text-gold/50">End of Collection</span>
                      <div className="w-6 h-px bg-gold/40" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col bg-cream border-b border-x border-gold/10 h-64">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-gold/60 mb-2">
                      Coming Soon
                    </span>
                    <h3 className="font-heading text-xl font-bold text-soft-black/50 leading-tight mb-3">
                      New Arrivals
                    </h3>
                    <p className="font-body text-xs leading-relaxed text-muted/70 flex-1">
                      Our next formula is in the making. Ancient ingredients, modern science.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Right Arrow */}
          {canGoRight && (
            <button
              onClick={() => { setDirection(1); scrollToIndex(carouselIndex + 1) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-obsidian text-gold flex items-center justify-center hover:bg-gold hover:text-obsidian transition-colors shadow-xl"
            >
              <ChevronRight size={22} />
            </button>
          )}

        </div>
      </section>
    </>
  )
}