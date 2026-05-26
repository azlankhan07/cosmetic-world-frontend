
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, User, LogOut, Search } from 'lucide-react'

export default function Navbar({
  cartCount = 0,
  onCartClick,
  user,
  onLoginClick,
  onLogout
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchHovered, setSearchHovered] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [lastSearched, setLastSearched] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(r => r.json())
      .then(data => setAllProducts(data.products || []))
      .catch(() => {})

    const saved = localStorage.getItem('lastSearchedProduct')

    if (saved) {
      setLastSearched(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const q = searchQuery.toLowerCase()

    setSearchResults(
      allProducts
        .filter(
          p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
        .slice(0, 5)
    )
  }, [searchQuery, allProducts])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Categories', 'Products', 'Our Story', 'Founder', 'Contact']

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between transition-all duration-500 overflow-visible ${
          scrolled
            ? 'bg-[#0D0C0A]/90 backdrop-blur-xl border-b border-gold/10 py-4'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-accent text-3xl tracking-widest text-gold-light">
            COSMETIC
          </span>

          <span className="font-mono text-[9px] tracking-widest2 text-gold/60 uppercase ml-0.5">
            World · By Azlan Khan
          </span>
        </a>

        {/* Desktop Links */}
        <motion.ul
          animate={{ opacity: searchHovered ? 0 : 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="hidden md:flex gap-8 items-center"
        >
          {links.map(link => (
            <li key={link}>
              <a
                 href={link === 'Products' ? '/collection' : link === 'Categories' ? '/collection/categories' : `/#${link.toLowerCase().replace(' ', '-')}`}
                className="font-body text-[11px] tracking-widest uppercase text-cream/60 hover:text-gold transition-colors duration-200 relative group"
              >
                {link}

                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}

          <li>
            <a
              href="/growway"
              className="font-body text-[11px] tracking-widest uppercase text-gold/60 hover:text-gold transition-colors duration-200 relative group"
            >
              Our Supplier

              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        </motion.ul>

        {/* Right Side */}
        <div className="flex items-center gap-6 relative">

          {/* Search */}
          <div
            className="hidden md:flex items-center absolute"
            style={{ zIndex: 10, right: '210px' }}
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => {
              setSearchHovered(false)
              setSearchQuery('')
              setSearchResults([])
            }}
          >
            <motion.div
              animate={{
                width: searchHovered ? 700 : 0,
                opacity: searchHovered ? 1 : 0
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden origin-right"
            >
              <input
                autoFocus={searchHovered}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/10 border border-gold/20 text-cream text-sm px-4 py-2 focus:outline-none focus:border-gold placeholder:text-cream/30 font-body rounded-full"
              />
            </motion.div>

            <button className="ml-2 text-cream/60 hover:text-gold transition-colors">
              <Search size={17} />
            </button>

            {/* Search Dropdown */}
            <AnimatePresence>
              {searchHovered && (searchResults.length > 0 || (lastSearched && !searchQuery)) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 mt-0 w-full bg-obsidian border border-gold/20 shadow-2xl z-50 rounded-3xl overflow-hidden"
                >

                  {/* Search Results */}
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <a
                        key={product._id}
                        href={`/products/${product._id}`}
                        onClick={() =>
                          localStorage.setItem(
                            'lastSearchedProduct',
                            JSON.stringify(product)
                          )
                        }
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gold/10 transition-colors border-b border-gold/10 last:border-0"
                      >
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-12 object-cover bg-cream/10"
                          />
                        )}

                        <div>
                          <p className="font-heading font-bold text-sm text-cream leading-tight">
                            {product.name}
                          </p>

                          <p className="font-mono text-[9px] uppercase tracking-widest text-gold mt-0.5">
                            {product.category}
                          </p>

                          <p className="font-body text-xs text-gold mt-0.5">
                            PKR {product.price?.toLocaleString()}
                          </p>
                        </div>
                      </a>
                    ))
                  ) : (
                    lastSearched &&
                    !searchQuery && (
                      <div className="flex items-center gap-3 px-4 py-3">

                        <p className="font-mono text-[9px] uppercase tracking-widest text-gold/50 mr-1">
                          Last Viewed
                        </p>

                        <a
                          href={`/products/${lastSearched._id}`}
                          className="flex items-center gap-3 flex-1 hover:bg-gold/10 transition-colors rounded-lg px-2 py-1"
                        >
                          {lastSearched.image && (
                            <img
                              src={lastSearched.image}
                              alt={lastSearched.name}
                              className="w-10 h-12 object-cover bg-cream/10"
                            />
                          )}

                          <div>
                            <p className="font-heading font-bold text-sm text-cream leading-tight">
                              {lastSearched.name}
                            </p>

                            <p className="font-mono text-[9px] uppercase tracking-widest text-gold mt-0.5">
                              {lastSearched.category}
                            </p>

                            <p className="font-body text-xs text-gold mt-0.5">
                              PKR {lastSearched.price?.toLocaleString()}
                            </p>
                          </div>
                        </a>

                        <button
                          onClick={() => {
                            localStorage.removeItem('lastSearchedProduct')
                            setLastSearched(null)
                          }}
                          className="ml-auto text-cream/30 hover:text-gold transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/orders"
                className="hidden md:block font-mono text-[10px] tracking-widest uppercase text-cream/60 hover:text-gold transition-colors"
              >
                My Orders
              </a>

              <span className="font-mono text-[10px] tracking-widest uppercase text-gold/70">
                {user.name.split(' ')[0]}
              </span>

              <button onClick={onLogout} title="Logout">
                <LogOut
                  size={16}
                  className="text-cream/50 hover:text-gold transition-colors"
                />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-cream/60 hover:text-gold transition-colors"
            >
              <User size={15} />
              Login
            </button>
          )}
{/* Mobile Search Icon */}
<button
  className="md:hidden text-cream/70 hover:text-gold transition-colors"
  onClick={() => setMobileSearchOpen(true)}
>
  <Search size={20} />
</button>
          {/* Cart */}
          <button onClick={onCartClick} className="relative group">
            <ShoppingBag
              size={20}
              className="text-cream/70 group-hover:text-gold transition-colors"
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-obsidian text-[9px] flex items-center justify-center font-body font-600">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            className="md:hidden text-cream/70"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-obsidian flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
               href={link === 'Products' ? '/collection' : link === 'Categories' ? '/collection/categories' : `#${link.toLowerCase().replace(' ', '-')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-display text-4xl text-gold-light hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
  href="/growway"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: links.length * 0.08 }}
  className="font-display text-4xl text-gold-light hover:text-gold transition-colors"
  onClick={() => setMenuOpen(false)}
>
  Our Supplier
</motion.a>
{user && (
  <motion.a
    href="/orders"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: (links.length + 1) * 0.08 }}
    className="font-display text-4xl text-gold-light hover:text-gold transition-colors"
    onClick={() => setMenuOpen(false)}
  >
    My Orders
  </motion.a>
)}
            {user ? (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  onLogout()
                  setMenuOpen(false)
                }}
                className="font-mono text-sm tracking-widest uppercase text-cream/50 hover:text-gold transition-colors"
              >
                Logout
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  onLoginClick()
                  setMenuOpen(false)
                }}
                className="font-mono text-sm tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
              >
                Login / Register
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Search Overlay */}
<AnimatePresence>
  {mobileSearchOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-obsidian flex flex-col md:hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gold/10">
        <Search size={18} className="text-gold/50 shrink-0" />
        <input
          autoFocus
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 bg-transparent text-cream text-sm focus:outline-none placeholder:text-cream/30 font-body"
        />
        <button
          onClick={() => {
            setMobileSearchOpen(false)
            setSearchQuery('')
            setSearchResults([])
          }}
          className="text-cream/50 hover:text-gold transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <a
              key={product._id}
              href={`/products/${product._id}`}
              onClick={() => {
                localStorage.setItem('lastSearchedProduct', JSON.stringify(product))
                setMobileSearchOpen(false)
                setSearchQuery('')
                setSearchResults([])
              }}
              className="flex items-center gap-4 px-5 py-4 border-b border-gold/10 hover:bg-gold/5 transition-colors"
            >
              {product.image && (
                <img src={product.image} alt={product.name} className="w-12 h-14 object-cover bg-cream/10 shrink-0" />
              )}
              <div>
                <p className="font-heading font-bold text-sm text-cream leading-tight">{product.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-gold mt-1">{product.category}</p>
                <p className="font-body text-xs text-gold/70 mt-0.5">PKR {product.price?.toLocaleString()}</p>
              </div>
            </a>
          ))
        ) : searchQuery.trim() ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="font-display text-4xl text-gold/20">✦</span>
            <p className="font-mono text-[10px] tracking-widest uppercase text-cream/30">No results found</p>
          </div>
        ) : lastSearched ? (
          <div className="px-5 py-4">
            <p className="font-mono text-[9px] uppercase tracking-widest text-gold/40 mb-3">Last Viewed</p>
            <a
              href={`/products/${lastSearched._id}`}
              onClick={() => setMobileSearchOpen(false)}
              className="flex items-center gap-4 py-2"
            >
              {lastSearched.image && (
                <img src={lastSearched.image} alt={lastSearched.name} className="w-12 h-14 object-cover bg-cream/10 shrink-0" />
              )}
              <div>
                <p className="font-heading font-bold text-sm text-cream leading-tight">{lastSearched.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-gold mt-1">{lastSearched.category}</p>
                <p className="font-body text-xs text-gold/70 mt-0.5">PKR {lastSearched.price?.toLocaleString()}</p>
              </div>
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="font-display text-4xl text-gold/20">✦</span>
            <p className="font-mono text-[10px] tracking-widest uppercase text-cream/30">Start typing to search</p>
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  )
}

