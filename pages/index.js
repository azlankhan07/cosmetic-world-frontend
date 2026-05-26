import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Products from '../components/Products'
import AboutBrand from '../components/AboutBrand'
import Values from '../components/Values'
import AboutMe from '../components/AboutMe'
import Testimonials from '../components/Testimonials'
import { Newsletter, Footer } from '../components/FooterNewsletter'
import Toast from '../components/Toast'
import CartSidebar from '../components/CartSidebar'
import AuthModal from '../components/AuthModal'

const Cursor = dynamic(() => import('../components/Cursor'), { ssr: false })

export default function Home({
  user, cartItems, cartOpen, setCartOpen,
  authOpen, setAuthOpen, toast,
  onAddToCart, onRemoveFromCart, onClearCart,
  onLogin, onLogout
}) {
  return (
    <>
      <Head>
        <title>Cosmetic World — Luxury Natural Beauty by Azlan Khan</title>
        <meta name="description" content="Premium skincare and haircare rooted in ancient wisdom." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cursor />
      <Navbar
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        user={user}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={onLogout}
      />

      <main>
        <Hero />
        <Marquee />
        <Products onAddToCart={onAddToCart} />
        <AboutBrand />
        <Values />
        <AboutMe />

        {/* Growway Global Strip */}
        <section className="bg-obsidian py-16 px-8 md:px-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="flex flex-col gap-3 max-w-xl">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gold/50">
                Official Supply Partner
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-cream">
                Powered by{' '}
                <span className="font-heading italic font-bold text-gold">Growway Global</span>
              </h2>
              <p className="font-body text-cream/50 text-sm leading-relaxed">
                Every Cosmetic World product is sourced directly from Growway Global — 
                a premium cosmetic company operating across Pakistan, Oman, Azerbaijan and Malaysia. 
                All products are dermatologically tested and manufactured to global standards.
              </p>
            </div>

            <div className="flex flex-col gap-4 shrink-0">
              <div className="flex gap-6">
                {['30+ Products', '4 Countries', '100% Derma Tested'].map((tag, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <p className="font-display text-lg font-black text-gold">{tag.split(' ')[0]}</p>
                    <p className="font-mono text-[9px] tracking-widest uppercase text-cream/30">
                      {tag.split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href="/growway"
                  className="font-mono text-[10px] tracking-widest uppercase bg-gold text-obsidian px-6 py-3 hover:opacity-80 transition-opacity"
                >
                  Learn More
                </a>
                <a
                  href="https://growwayglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-widest uppercase border border-gold/30 text-gold/60 px-6 py-3 hover:border-gold hover:text-gold transition-colors"
                >
                  Visit Website ↗
                </a>
              </div>
            </div>

          </div>
        </section>

        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
      <Toast show={toast.show} message={toast.message} />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={onRemoveFromCart}
        onClearCart={onClearCart}
      />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={onLogin}
      />
    </>
  )
}