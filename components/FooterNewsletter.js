import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="bg-obsidian py-28 px-8 md:px-16 text-center relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/5 rounded-full pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/5 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="font-mono text-[10px] tracking-widest uppercase text-gold mb-5">Stay Connected</div>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] font-black text-gold-light leading-none mb-4">
          Join the<br />
          <span className="font-heading italic font-bold text-gold">Cosmetic World</span>
          <br />Circle
        </h2>
        <p className="font-body text-sm text-cream/30 mb-12">
          Be the first to know about new launches, exclusive offers and beauty rituals.
        </p>
        {sent ? (
          <div className="font-heading italic text-xl font-bold text-gold">You're on the list. ✦</div>
        ) : (
          <div className="flex gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-white/5 border border-gold/20 text-cream/70 font-body text-sm placeholder-gold/20 outline-none focus:border-gold/50 transition-colors"
            />
<button
  onClick={async () => {
    if (!email) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      setSent(true)
    } catch {
      setSent(true) // still show success to user even if network blips
    }
  }}
  className="font-body font-semibold text-[10px] tracking-widests uppercase bg-gold text-obsidian px-8 py-4 hover:bg-gold-light transition-colors"
>
  Subscribe
</button>
          </div>
        )}
      </div>
    </section>
  )
}

export function Footer() {
const links = {
  Products: [
    { label: '24K Gold Face Wash', href: '#' },
    { label: 'Ancient Glow Shampoo', href: '#' },
    { label: 'Tea Tree Face Wash', href: '#' },
    { label: 'Lavender Shower Gel', href: '#' },
  ],
  Company: [
    { label: 'Our Story', href: '#' },
    { label: 'Founder', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Support: [
    { label: 'Shipping Policy', href: '/support#shipping' },
    { label: 'Returns', href: '/support#returns' },
    { label: 'Privacy Policy', href: '/support#privacy' },
    { label: 'FAQ', href: '/support#faq' },
  ],
}

  return (
    <footer className="bg-[#080807] px-8 md:px-16 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-16 border-b border-gold/8">
          <div>
            <div className="font-accent text-3xl tracking-widest text-gold mb-1">COSMETIC</div>
            <div className="font-accent text-3xl tracking-widest text-gold-light mb-6">WORLD</div>
            <p className="font-body text-xs text-cream/20 leading-relaxed mb-8">
              Premium natural beauty by Azlan Khan. Crafted for those who demand the extraordinary.
            </p>
            <div className="flex gap-3">
              {['in', 'ig', 'fb', 'yt'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-gold/15 flex items-center justify-center font-mono text-[9px] text-gold/40 hover:border-gold/50 hover:text-gold transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              {section === 'Support' ? (
  <Link href="/support" className="font-mono text-[10px] tracking-widest uppercase text-gold mb-6 hover:text-gold-light transition-colors block">
    {section}
  </Link>
) : (
  <div className="font-mono text-[10px] tracking-widest uppercase text-gold mb-6">{section}</div>
)}
              <ul className="space-y-3">
{items.map((item) => (
  <li key={item.label}>
    <Link href={item.href} className="font-body text-xs text-cream/25 hover:text-gold-light transition-colors">
      {item.label}
    </Link>
  </li>
))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <div className="font-mono text-[10px] text-cream/15">
            © 2024 Cosmetic World by Azlan Khan. All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-gold/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/20 inline-block" />
            Shopify checkout integration coming soon
          </div>
        </div>
      </div>
    </footer>
  )
}
