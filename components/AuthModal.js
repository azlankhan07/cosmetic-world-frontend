import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader } from 'lucide-react'
import axios from 'axios'
import { signIn } from 'next-auth/react'

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    if (mode === 'register' && !form.name) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        payload
      )

      localStorage.setItem('token', res.data.user.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      onLogin(res.data.user)
      onClose()
      setForm({ name: '', email: '', password: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
    setLoading(false)
  }

const handleGoogleSignIn = async () => {
  await signIn('google', { callbackUrl: '/' })
}

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 m-auto w-full max-w-md bg-white z-[9999] p-8 shadow-2xl h-fit"
          >
            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4">
              <X size={18} className="text-muted hover:text-soft-black transition-colors" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-2">
                Cosmetic World
              </p>
              <h2 className="font-display text-3xl font-black text-soft-black">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              {mode === 'register' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-muted">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Azlan Khan"
                    className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-widest uppercase text-muted">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-widest uppercase text-muted">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border border-gold/20 px-4 py-3 font-body text-sm text-soft-black focus:outline-none focus:border-gold bg-cream"
                />
              </div>

              {error && (
                <p className="font-mono text-[10px] text-red-500">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-obsidian text-gold font-mono text-[11px] tracking-widest uppercase py-4 hover:bg-gold hover:text-obsidian transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? <Loader size={14} className="animate-spin" /> : null}
                {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gold/20" />
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-gold/20" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full border border-gold/20 py-3 flex items-center justify-center gap-3 hover:border-gold transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
              </svg>
              <span className="font-mono text-[11px] tracking-widest uppercase text-soft-black">
                Continue with Google
              </span>
            </button>

            {/* Switch mode */}
            <p className="font-body text-xs text-muted text-center mt-6">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
                className="text-gold hover:underline"
              >
                {mode === 'login' ? 'Register' : 'Login'}
              </button>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}