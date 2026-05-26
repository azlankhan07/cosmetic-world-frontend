import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'

const statusSteps = ['pending', 'processing', 'shipped', 'delivered']

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    label: 'Order Placed',
    desc: 'Your order has been received and is awaiting confirmation.'
  },
  processing: {
    icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    label: 'Processing',
    desc: 'Your order is being prepared and packed with care.'
  },
  shipped: {
    icon: Truck,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    label: 'Shipped',
    desc: 'Your order is on its way to you!'
  },
  delivered: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Delivered',
    desc: 'Your order has been delivered. Enjoy your products!'
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: 'Cancelled',
    desc: 'This order has been cancelled.'
  }
}

function ReviewModal({ item, orderId, onClose, onSubmitted }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!rating) { setError('Please select a star rating'); return }
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        productId: item.product,
        orderId,
        rating,
        comment
      }, { headers: { Authorization: `Bearer ${token}` } })
      onSubmitted(item.product)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-obsidian/70 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase text-gold mb-1">Leave a Review</p>
            <h3 className="font-heading font-bold text-lg text-soft-black leading-tight">{item.name}</h3>
          </div>
          <button onClick={onClose} className="text-muted hover:text-soft-black transition-colors">
            <XCircle size={20} />
          </button>
        </div>

        {/* Stars */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-3">Your Rating</p>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill={(hovered || rating) >= star ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth="1.5">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-3">Comment (optional)</p>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            className="w-full border border-gold/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-gold resize-none bg-cream"
          />
        </div>

        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-obsidian text-gold font-mono text-[10px] tracking-widest uppercase py-4 hover:bg-gold hover:text-obsidian transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </motion.div>
    </div>
  )
}
function StatusTracker({ status }) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-5 py-4">
        <XCircle size={18} className="text-red-500 shrink-0" />
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-red-600 font-semibold">Order Cancelled</p>
          <p className="font-body text-xs text-red-500 mt-0.5">This order has been cancelled.</p>
        </div>
      </div>
    )
  }

  const currentIndex = statusSteps.indexOf(status)

  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute top-5 left-5 right-5 h-px bg-gold/10 z-0" />
      <div
        className="absolute top-5 left-5 h-px bg-gold z-0 transition-all duration-700"
        style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
      />

      <div className="relative z-10 flex justify-between">
        {statusSteps.map((step, i) => {
          const config = statusConfig[step]
          const Icon = config.icon
          const done = i <= currentIndex
          const active = i === currentIndex

          return (
            <div key={step} className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                done
                  ? 'bg-gold border-gold'
                  : 'bg-white border-gold/20'
              } ${active ? 'shadow-lg shadow-gold/20' : ''}`}>
                <Icon size={16} className={done ? 'text-obsidian' : 'text-muted'} />
              </div>
              <span className={`font-mono text-[9px] tracking-widest uppercase text-center leading-tight ${
                done ? 'text-gold' : 'text-muted'
              }`}>
                {config.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Current status description */}
      <div className={`mt-6 px-4 py-3 border ${statusConfig[status].border} ${statusConfig[status].bg}`}>
        <p className={`font-mono text-[10px] tracking-widest uppercase font-semibold ${statusConfig[status].color}`}>
          {statusConfig[status].label}
        </p>
        <p className="font-body text-xs text-muted mt-1">{statusConfig[status].desc}</p>
      </div>
    </div>
  )
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)
  const [reviewItem, setReviewItem] = useState(null)
const [reviewed, setReviewed] = useState([])
const [cancelling, setCancelling] = useState(false)
const [cancelError, setCancelError] = useState('')
const [orderStatus, setOrderStatus] = useState(order.status)
const [orderCreatedAt] = useState(order.createdAt)

const handleReviewed = (productId) => {
  setReviewed(prev => [...prev, productId])
}

// Live countdown
const [timeLeft, setTimeLeft] = useState('')
const [canCancel, setCanCancel] = useState(false)

useEffect(() => {
  const update = () => {
    const ms = 5 * 60 * 60 * 1000 - (Date.now() - new Date(orderCreatedAt).getTime())
    if (ms <= 0) {
      setCanCancel(false)
      setTimeLeft('')
    } else {
      setCanCancel(true)
      const h = Math.floor(ms / (1000 * 60 * 60))
      const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((ms % (1000 * 60)) / 1000)
      setTimeLeft(`${h}h ${m}m ${s}s`)
    }
  }
  update()
  const interval = setInterval(update, 1000)
  return () => clearInterval(interval)
}, [orderCreatedAt])

const handleCancel = async () => {
  if (!confirm('Are you sure you want to cancel this order?')) return
  setCancelling(true)
  setCancelError('')
  try {
    const token = localStorage.getItem('token')
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${order._id}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setOrderStatus('cancelled')
  } catch (err) {
    setCancelError(err.response?.data?.message || 'Failed to cancel order')
  }
  setCancelling(false)
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gold/10 overflow-hidden"
    >
      {/* Order header */}
      <div
        className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-cream/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-1">Order ID</p>
            <p className="font-mono text-sm font-bold text-soft-black">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
          <div className="hidden md:block">
            <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-1">Date</p>
            <p className="font-body text-sm text-soft-black">
              {new Date(order.createdAt).toLocaleDateString('en-PK', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-1">Total</p>
            <p className="font-display text-lg font-black text-soft-black">
              PKR {order.totalPrice?.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-1">Status</p>
<span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 ${statusConfig[orderStatus]?.bg} ${statusConfig[orderStatus]?.color}`}>
  {statusConfig[orderStatus]?.label || orderStatus}
</span>
          </div>
        </div>
        <div className="text-muted">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gold/10 pt-6 flex flex-col gap-6">

{/* Status tracker */}
<StatusTracker status={orderStatus} />

{/* Cancel button */}
{orderStatus !== 'cancelled' && orderStatus !== 'delivered' && orderStatus !== 'shipped' && (
  <div className={`border px-5 py-4 flex flex-col gap-3 ${canCancel ? 'border-red-200 bg-red-50' : 'border-gold/10 bg-cream'}`}>
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <p className="font-mono text-[10px] tracking-widest uppercase text-soft-black font-semibold mb-1">
          Order Cancellation
        </p>
        {canCancel ? (
          <p className="font-body text-xs text-muted">
            You can cancel this order within the next{' '}
            <span className="font-mono text-red-500 font-semibold">{timeLeft}</span>
          </p>
        ) : (
          <p className="font-body text-xs text-muted">
            Cancellation window has expired. Contact support if you need help.
          </p>
        )}
      </div>
      {canCancel && (
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="font-mono text-[10px] tracking-widest uppercase bg-red-500 text-white px-5 py-3 hover:bg-red-600 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {cancelling ? 'Cancelling...' : 'Cancel Order'}
        </button>
      )}
    </div>
    {cancelError && (
      <p className="font-body text-xs text-red-500">{cancelError}</p>
    )}
  </div>
)}

              {/* Items */}
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-4">Items Ordered</p>
                <div className="flex flex-col gap-3">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-cream p-3">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-12 h-14 object-cover" />
                      )}
                      <div className="flex-1">
                        <p className="font-heading font-bold text-sm text-soft-black">{item.name}</p>
                        <p className="font-mono text-[10px] text-muted mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-display font-black text-soft-black">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                        {order.status === 'delivered' && (
                          reviewed.includes(item.product) ? (
                            <span className="font-mono text-[9px] tracking-widest uppercase text-green-600 bg-green-50 px-2 py-1">
                              ✓ Reviewed
                            </span>
                          ) : (
                            <button
                              onClick={() => setReviewItem(item)}
                              className="font-mono text-[9px] tracking-widest uppercase bg-obsidian text-gold px-3 py-2 hover:bg-gold hover:text-obsidian transition-colors whitespace-nowrap"
                            >
                              Review
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-3">Delivery Address</p>
                  <div className="bg-cream p-4">
                    <p className="font-body font-semibold text-sm text-soft-black">{order.shippingAddress?.fullName}</p>
                    <p className="font-body text-xs text-muted mt-1">{order.shippingAddress?.address}</p>
                    <p className="font-body text-xs text-muted">{order.shippingAddress?.city}</p>
                    <p className="font-body text-xs text-muted">📞 {order.shippingAddress?.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-3">Payment</p>
                  <div className="bg-cream p-4">
                    <p className="font-body font-semibold text-sm text-soft-black">
                      {order.paymentMethod || 'Cash on Delivery'}
                    </p>
                    <p className="font-body text-xs text-muted mt-1">
                      {order.isPaid ? '✅ Paid' : '⏳ Pay on delivery'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      {reviewItem && (
        <ReviewModal
          item={reviewItem}
          orderId={order._id}
          onClose={() => setReviewItem(null)}
          onSubmitted={handleReviewed}
        />
      )}
    </motion.div>
  )
}
export default function OrdersPage({ user }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => { setOrders(res.data.orders); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const userName = user?.name || session?.user?.name

  return (
    <>
      <Head>
        <title>My Orders — Cosmetic World</title>
      </Head>

      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-obsidian px-8 md:px-16 py-8 pt-28">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-gold/50 hover:text-gold transition-colors mb-6">
            <ArrowLeft size={14} />
            Back to Store
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-black text-cream">
            My <span className="font-heading italic font-bold text-gold">Orders</span>
          </h1>
          {userName && (
            <p className="font-body text-cream/40 text-sm mt-2">{userName}</p>
          )}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !userName ? (
            <div className="text-center py-20">
              <Package size={48} className="text-gold/20 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-black text-soft-black mb-2">Please log in</h2>
              <p className="font-body text-muted text-sm mb-6">You need to be logged in to view your orders.</p>
              <Link href="/" className="inline-block font-mono text-[11px] tracking-widest uppercase bg-obsidian text-gold px-8 py-4 hover:bg-gold hover:text-obsidian transition-colors">
                Go to Store
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <Package size={48} className="text-gold/20 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-black text-soft-black mb-2">No orders yet</h2>
              <p className="font-body text-muted text-sm mb-6">Your orders will appear here once you place one.</p>
              <Link href="/" className="inline-block font-mono text-[11px] tracking-widest uppercase bg-obsidian text-gold px-8 py-4 hover:bg-gold hover:text-obsidian transition-colors">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-2">
                {orders.length} order{orders.length > 1 ? 's' : ''} found
              </p>
              {orders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}