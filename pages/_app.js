import { useState, useEffect } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import '../styles/globals.css'

function AppContent({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '' })
  const { data: session } = useSession()

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  // Sync next-auth session
  useEffect(() => {
    if (session?.backendToken && !user) {
      const userData = {
        name: session.user.name,
        email: session.user.email,
        token: session.backendToken,
        isAdmin: session.user.isAdmin
      }
      localStorage.setItem('token', session.backendToken)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    }
  }, [session])

  const showToast = (msg) => {
    setToast({ show: true, message: msg })
    setTimeout(() => setToast({ show: false, message: '' }), 3200)
  }

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
      return [...prev, { ...product, quantity: 1, deliveryType: product.deliveryType || 'standard' }]
    })
    showToast(`✦ "${product.name}" added to cart`)
    setCartOpen(true)
  }

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleClearCart = () => setCartItems([])

  const handleLogin = (userData) => {
    setUser(userData)
    showToast(`✦ Welcome back, ${userData.name.split(' ')[0]}!`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    showToast('✦ Logged out successfully')
  }

  const sharedProps = {
    user,
    cartItems,
    cartOpen,
    setCartOpen,
    authOpen,
    setAuthOpen,
    toast,
    onAddToCart: handleAddToCart,
    onRemoveFromCart: handleRemoveFromCart,
    onClearCart: handleClearCart,
    onLogin: handleLogin,
    onLogout: handleLogout,
    showToast,
  }

  return <Component {...pageProps} {...sharedProps} />
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  )
}