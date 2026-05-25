import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react'
import Navbar from '../../components/Navbar'
import CartSidebar from '../../components/CartSidebar'
import Toast from '../../components/Toast'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

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

  useEffect(() => {
    if (!id) return
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`)
    ]).then(([productRes, reviewRes]) => {
      setProduct(productRes.data.product)
      setReviews(reviewRes.data.reviews)
      setAvgRating(reviewRes.data.avgRating)
      setLoading(false)
    }).catch(() => {
  setError(true)
  setLoading(false)
})
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (error) return (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
    <p className="font-body text-muted">Something went wrong. Please try again.</p>
    <button
      onClick={() => router.back()}
      className="font-mono text-[10px] tracking-widest uppercase text-gold hover:underline"
    >
      Go Back
    </button>
  </div>
)

  if (!product) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="font-body text-muted">Product not found</p>
    </div>
  )

  return (
    <>
      <Head>
        <title>{product.name} — Cosmetic World</title>
      </Head>

      <div className="min-h-screen bg-cream">
  <Navbar
    cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
    onCartClick={() => setCartOpen(true)}
  />
  <CartSidebar
    isOpen={cartOpen}
    onClose={() => setCartOpen(false)}
    cartItems={cartItems}
    onRemove={(id) => setCartItems(prev => prev.filter(item => item.id !== id))}
    onClearCart={() => setCartItems([])}
  />
  <Toast show={toast.show} message={toast.message} />
        {/* Header */}
        <div className="bg-obsidian px-8 md:px-16 py-8 pt-28">
          <Link href="/#products" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-gold/50 hover:text-gold transition-colors mb-6">
            <ArrowLeft size={14} />
            Back to Products
          </Link>
        </div>

        {/* Product */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Image */}
            <div className="aspect-[3/4] bg-obsidian overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-gold">
                  {product.category}
                </span>
                <h1 className="font-display text-4xl font-black text-soft-black leading-tight mt-2">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} width="14" height="14" viewBox="0 0 24 24"
                        fill={star <= Math.round(avgRating) ? '#C9A84C' : 'none'}
                        stroke="#C9A84C" strokeWidth="1.5">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-mono text-xs text-muted">{avgRating} out of 5 ({reviews.length} review{reviews.length > 1 ? 's' : ''})</span>
                </div>
              )}

              {/* Price */}
              <div className="flex flex-col gap-1">
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-muted line-through">PKR {product.originalPrice?.toLocaleString()}</span>
                    <span className="font-mono text-[9px] uppercase bg-gold/10 text-gold px-2 py-0.5">{product.discountPercent}% off</span>
                  </div>
                )}
                <span className="font-display text-3xl font-black text-soft-black">PKR {product.price?.toLocaleString()}</span>
              </div>

              {/* Description */}
              <p className="font-body text-sm text-muted leading-relaxed">{product.description}</p>

              {/* Ingredients */}
              {product.ingredients?.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-gold mb-2">Key Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, i) => (
                      <span key={i} className="font-body text-xs bg-obsidian text-gold px-3 py-1">{ing}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock */}
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.countInStock > 0 ? `In Stock · ${product.countInStock} left` : 'Out of Stock'}
                </span>
                {product.deliveryType === 'free' && (
  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white bg-green-500 px-3 py-1.5 w-fit">
    ✦ Free Delivery
  </span>
)}
              </div>

              {/* Add to cart */}
              {product.countInStock > 0 && (
  <button
    onClick={() => handleAddToCart({
                    id: product._id,
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    countInStock: product.countInStock,
                    deliveryType: product.deliveryType || 'standard',
                  })}
                  className="w-full font-mono text-[11px] tracking-widest uppercase bg-obsidian text-gold py-4 hover:bg-gold hover:text-obsidian transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={15} />
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="mt-20">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-8">Customer Reviews</p>
              <div className="flex flex-col gap-4">
                {reviews.map((review, i) => (
                  <div key={i} className="bg-white border border-gold/10 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-bold text-sm text-soft-black">{review.user?.name}</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(star => (
                            <svg key={i} width="11" height="11" viewBox="0 0 24 24"
                              fill={i <= review.rating ? '#C9A84C' : 'none'}
                              stroke="#C9A84C" strokeWidth="1.5">
                              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-muted">
                        {new Date(review.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="font-body text-sm text-muted leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}