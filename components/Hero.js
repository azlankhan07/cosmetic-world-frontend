import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.13 }
  })
}

export default function Hero() {
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(r => r.json())
      .then(data => setProductCount((data.products || []).length))
      .catch(() => {})
  }, [])

  return (
    <section className="relative min-h-screen bg-obsidian flex items-center overflow-hidden">
      {/* Three.js Canvas */}
      <HeroCanvas />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 px-8 md:px-20 max-w-7xl mx-auto w-full pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div custom={0} variants={fadeUp} className="section-tag mb-8">
            Luxury Natural Beauty
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-display text-[clamp(52px,8vw,110px)] font-black leading-[0.92] text-cream mb-4"
          >
            WHERE
            <br />
            <span className="gold-shimmer-text font-heading italic font-bold">
              NATURE
            </span>
            <br />
            <span className="text-cream/90">BECOMES</span>
            <br />
            <span className="font-accent tracking-widest text-gold text-[clamp(40px,6vw,80px)]">
              LUXURY
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="font-body text-cream/50 text-base md:text-lg leading-relaxed max-w-md mt-8 mb-12"
          >
            Premium skincare and haircare rooted in ancient wisdom — 
            crafted for those who expect nothing less than extraordinary.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4 items-center">
            <a
              href="#products"
              className="font-body font-semibold text-[11px] tracking-widest uppercase bg-gold text-obsidian px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Shop Collection
            </a>
            <a
              href="#our-story"
              className="font-body font-semibold text-[11px] tracking-widest uppercase border border-gold/30 text-gold px-10 py-4 hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              Our Philosophy →
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex gap-12 mt-20 pt-10 border-t border-gold/10"
          >
            {[
              { num: productCount || '—', label: 'Premium Products' },
              { num: '100%', label: 'Natural Ingredients' },
              { num: 'PKR', label: 'Trusted Local Brand' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display text-3xl font-black text-gold">{num}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-cream/30 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 right-12 z-20 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase text-gold/40 rotate-90 origin-center translate-x-6">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  )
}
