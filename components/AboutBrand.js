import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ============================================================
// 🖼️  PICTURE LOCATION — BRAND SECTION
// ============================================================
// A large editorial image sits on the LEFT side of this section.
// It should ideally be a lifestyle / product flat-lay photo.
//
// HOW TO ADD YOUR IMAGE:
//   1. Put your file in /public/images/  e.g. brand-story.jpg
//   2. Set BRAND_IMAGE below to '/images/brand-story.jpg'
//
// Recommended size: 800 × 1000 px (portrait), JPG or WebP.
// ============================================================
const BRAND_IMAGE = '/images/Cosmetic_World.png';

export default function AboutBrand() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="our-story" className="bg-cream py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — image area */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image frame */}
            <div className="relative aspect-[4/5] bg-ivory border border-gold/20 overflow-hidden flex items-center justify-center">
              {BRAND_IMAGE ? (
                <img
                  src={BRAND_IMAGE}
                  alt="Cosmetic World brand story"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Placeholder */
                <div className="text-center text-gold/30">
                  <div className="font-accent text-6xl mb-3">BRAND</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase">
                    🖼️ Add brand-story.jpg here
                  </div>
                </div>
              )}
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-8 -right-8 bg-obsidian p-8 z-10">
              <div className="font-display text-5xl font-black text-gold">100%</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-gold/40 mt-2">
                Natural Sourced
              </div>
            </div>

            {/* Quote card */}
            <div className="absolute top-8 -right-6 bg-white border border-gold/15 p-5 max-w-[180px] shadow-xl z-10">
              <p className="font-heading italic text-sm font-semibold text-soft-black leading-snug">
                "Beauty is a ritual, not a routine."
              </p>
              <span className="font-mono text-[9px] tracking-widest uppercase text-gold mt-2 block">
                — Cosmetic World
              </span>
            </div>
          </motion.div>

          {/* RIGHT — text */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              className="section-tag mb-6"
            >
              Our Story
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(36px,4.5vw,64px)] font-black leading-none text-soft-black mb-8"
            >
              Beauty Rooted<br />
              <span className="font-heading italic font-bold text-gold">in Nature</span>
            </motion.h2>

            {[
              "Cosmetic World was born from a simple conviction — that the most powerful beauty ingredients are already found in nature. We set out to bridge ancient remedies and contemporary luxury.",
              "From the gold mines of ancient Egypt to the rice fields of East Asia, every ingredient in our collection carries centuries of wisdom. We honour that heritage through rigorous modern science.",
              "Our commitment is to deliver an upper-echelon beauty experience to those who appreciate authenticity, quality, and the transformative power of nature's finest gifts.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="font-body text-sm leading-relaxed text-muted mb-5"
              >
                {para}
              </motion.p>
            ))}

            <motion.a
              href="#products"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="inline-block mt-6 font-body font-semibold text-[11px] tracking-widest uppercase bg-soft-black text-cream px-10 py-4 hover:bg-gold hover:text-obsidian transition-colors duration-300"
            >
              Explore Collection
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
