import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Loader, Truck } from 'lucide-react'
import axios from 'axios'

const cities = {
  Punjab: [
    'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Multan',
    'Sialkot', 'Bahawalpur', 'Sargodha', 'Sheikhupura', 'Jhang',
    'Rahim Yar Khan', 'Gujrat', 'Kasur', 'Dera Ghazi Khan', 'Sahiwal',
    'Wah Cantt', 'Okara', 'Chiniot', 'Khanewal', 'Hafizabad'
  ],
  KPK: [
    'Peshawar', 'Mardan', 'Mingora', 'Abbottabad', 'Mansehra',
    'Kohat', 'Bannu', 'Dera Ismail Khan', 'Nowshera', 'Charsadda',
    'Haripur', 'Swabi', 'Karak', 'Hangu', 'Lakki Marwat'
  ],
  Sindh: [
    'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah',
    'Mirpur Khas', 'Khairpur', 'Jacobabad', 'Shikarpur', 'Dadu',
    'Thatta', 'Badin', 'Sanghar', 'Qambar', 'Tando Adam'
  ],
  Islamabad_Capital_Territory: [
    'Islamabad'
  ]
}

function isValidName(name) {
  if (name.length < 3) return false
  // Must have at least two words
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return false
  // Each part must be at least 2 chars and only letters
  if (!parts.every(p => /^[a-zA-Z]{2,}$/.test(p))) return false
  // Block common fake names
  const blocked = ['king', 'prince', 'princess', 'queen', 'boss', 'admin', 'test', 'user', 'fake']
  if (blocked.some(b => name.toLowerCase().includes(b))) return false
  return true
}

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone)
}

export default function CartSidebar({ isOpen, onClose, cartItems, onRemove, onClearCart }) {
  const [step, setStep] = useState('cart')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
  fullName: '',
  address: '',
  country: 'Pakistan',
  province: '',
  city: '',
  phone: ''
})

  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'string'
      ? parseInt(item.price.replace(/[^0-9]/g, ''))
      : item.price
    return sum + price * item.quantity
  }, 0)
  
const hasStandardDelivery = cartItems.some(item => item.deliveryType !== 'free')
const deliveryCharge = hasStandardDelivery ? 250 : 0
const grandTotal = total + deliveryCharge

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
  if (!form.fullName || !form.address || !form.province || !form.city || !form.phone) {
    alert('Please fill in all fields')
    return
  }
  if (!isValidName(form.fullName)) {
    alert('Please enter a valid full name (first and last name, letters only)')
    return
  }
  if (!isValidPhone(form.phone)) {
    alert('Please enter a valid 10-digit phone number after +92')
    return
  }

  const token = localStorage.getItem('token')
  if (!token) {
    alert('Please login to place an order')
    return
  }

  setLoading(true)
  try {
    const orderItems = cartItems.map(item => ({
      product: item._id,
      name: item.name,
      price: typeof item.price === 'string'
        ? parseInt(item.price.replace(/[^0-9]/g, ''))
        : item.price,
      quantity: item.quantity,
      image: item.image
    }))

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        items: orderItems,
        shippingAddress: {
          ...form,
          phone: '+92' + form.phone
        },
        totalPrice: grandTotal,
        paymentMethod: 'COD'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    onClearCart()
    onClose()
    setStep('cart')
    setForm({ fullName: '', address: '', country: 'Pakistan', province: '', city: '', phone: '' })
    alert('🎉 Order placed! Pay PKR ' + grandTotal.toLocaleString() + ' on delivery.')
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to place order')
  }
  setLoading(false)
}

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" />
                <span className="font-heading font-bold text-lg text-soft-black">
                  {step === 'cart' ? 'Your Cart' : 'Checkout'}
                </span>
              </div>
              <button onClick={onClose}>
                <X size={20} className="text-muted hover:text-soft-black transition-colors" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {step === 'cart' ? (
                <>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted">
                      <ShoppingBag size={48} className="opacity-20" />
                      <p className="font-body text-sm">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item, i) => (
                        <div key={i} className="flex gap-4 border-b border-gold/10 pb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover bg-cream"
                          />
                          <div className="flex-1">
                            <h4 className="font-heading font-bold text-sm text-soft-black leading-tight mb-1">
                              {item.name}
                            </h4>
                            <p className="font-mono text-xs text-gold mb-2">
                              {item.price}
                            </p>
                            <span className="font-mono text-xs text-muted">Qty: {item.quantity}</span>
                          </div>
                          <button onClick={() => onRemove(item.id)}>
                            <Trash2 size={15} className="text-muted hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-4 pt-2">

                  {/* COD Notice */}
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 px-4 py-3">
                    <Truck size={16} className="text-green-600 shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-green-700 font-semibold">
                        Cash on Delivery
                      </p>
                      <p className="font-body text-xs text-green-600 mt-0.5">
                        Pay when your order arrives at your door
                      </p>
                    </div>
                  </div>

                  <p className="font-mono text-[10px] tracking-widest uppercase text-gold mt-2">
  Shipping Details
</p>

{/* Full Name */}
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-widest uppercase text-muted">Full Name</label>
  <input
    type="text"
    name="fullName"
    value={form.fullName}
    onChange={handleChange}
    placeholder="Azlan Khan"
    className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
  />
  <p className="font-body text-[10px] text-muted">Enter your first and last name</p>
</div>

{/* Address */}
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-widest uppercase text-muted">Address</label>
  <input
    type="text"
    name="address"
    value={form.address}
    onChange={handleChange}
    placeholder="House 12, Street 4, Model Town"
    className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
  />
</div>

{/* Country */}
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-widest uppercase text-muted">Country</label>
  <select
    name="country"
    value={form.country}
    disabled
    className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream cursor-not-allowed opacity-70"
  >
    <option value="Pakistan">Pakistan</option>
  </select>
</div>

{/* Province */}
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-widests uppercase text-muted">Province</label>
  <select
    name="province"
    value={form.province}
    onChange={e => setForm({ ...form, province: e.target.value, city: '' })}
    className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
  >
    <option value="">Select Province</option>
    <option value="Punjab">Punjab</option>
    <option value="KPK">KPK</option>
    <option value="Sindh">Sindh</option>
    <option value="Islamabad_Capital_Territory">Islamabad Capital Territory</option>
  </select>
</div>

{/* City */}
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-widests uppercase text-muted">City</label>
  <select
    name="city"
    value={form.city}
    onChange={handleChange}
    disabled={!form.province}
    className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream disabled:opacity-50"
  >
    <option value="">{form.province ? 'Select City' : 'Select a province first'}</option>
    {(cities[form.province] || []).map(city => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
</div>

{/* Phone */}
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-widests uppercase text-muted">Phone Number</label>
  <div className="flex">
    <span className="border border-r-0 border-gold/20 px-4 py-3 font-body text-sm text-muted bg-cream/50 shrink-0">
      +92
    </span>
    <input
      type="text"
      name="phone"
      value={form.phone}
      onChange={e => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 10)
        setForm({ ...form, phone: val })
      }}
      placeholder="3001234567"
      maxLength={10}
      className="flex-1 border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
    />
  </div>
  <p className="font-body text-[10px] text-muted">Enter 10 digits without leading 0</p>
</div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-gold/20 flex flex-col gap-3">
  <div className="flex flex-col gap-2">
  <div className="flex items-center justify-between">
    <span className="font-mono text-xs uppercase tracking-widest text-muted">Subtotal</span>
    <span className="font-body text-sm text-soft-black">PKR {total.toLocaleString()}</span>
  </div>
  {step === 'checkout' && (
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs uppercase tracking-widests text-muted">Delivery</span>
      {deliveryCharge === 0 ? (
        <span className="font-mono text-xs text-green-600 font-semibold">FREE</span>
      ) : (
        <span className="font-body text-sm text-soft-black">PKR {deliveryCharge.toLocaleString()}</span>
      )}
    </div>
  )}
  <div className="flex items-center justify-between border-t border-gold/20 pt-2">
    <span className="font-mono text-xs uppercase tracking-widest text-muted">Total</span>
    <span className="font-display text-xl font-black text-soft-black">
      PKR {(step === 'checkout' ? grandTotal : total).toLocaleString()}
    </span>
  </div>
</div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-obsidian text-gold font-mono text-[11px] tracking-widest uppercase py-4 hover:bg-gold hover:text-obsidian transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="w-full bg-gold text-obsidian font-mono text-[11px] tracking-widest uppercase py-4 hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader size={14} className="animate-spin" /> : <Truck size={14} />}
                      {loading ? 'Placing Order...' : 'Place Order — Cash on Delivery'}
                    </button>
                    <button
                      onClick={() => setStep('cart')}
                      className="w-full border border-gold/20 text-muted font-mono text-[11px] tracking-widest uppercase py-3 hover:border-gold transition-colors"
                    >
                      Back to Cart
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}