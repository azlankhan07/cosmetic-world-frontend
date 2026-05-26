import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ============================================================
// 🖼️  PICTURE LOCATION — FOUNDER / ABOUT ME SECTION
// ============================================================
// A portrait photo of Azlan Khan renders in the left column.
//
// HOW TO ADD YOUR PHOTO:
//   1. Put your photo in /public/images/  e.g. azlan-khan.jpg
//   2. Set FOUNDER_IMAGE below to '/images/azlan-khan.jpg'
//
// Recommended: A professional headshot or brand photo.
// Size: 700 × 900 px (portrait), JPG or WebP.
// ============================================================
const FOUNDER_IMAGE = '/images/P2.png'; // e.g. '/images/azlan-khan.jpg'

const achievements = [
  { num: '5+', label: 'Years E-Commerce' },
  { num: '3+', label: 'Years Digital Marketing' },
  { num: '100%', label: 'Quality Guaranteed' },
  { num: '✦', label: 'Passion-Driven Brand' },
]

export default function AboutMe() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  return (
    <section ref={ref} id="founder" className="bg-ivory py-16 px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Founder portrait */}
        <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  className="relative mx-auto"
>
            <div className="relative aspect-[3/4] bg-soft-black overflow-hidden flex items-center justify-end max-h-[90vh]">
              {FOUNDER_IMAGE ? (
                <img
                  src={FOUNDER_IMAGE}
                  alt="Azlan Khan — Founder"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Placeholder initials until photo is added */
                <div className="text-center">
                  <div className="font-display text-[140px] font-black text-gold/10 leading-none select-none">
                    AK
                  </div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-gold/20 mt-4">
                    🖼️ Add azlan-khan.jpg here
                  </div>
                </div>
              )}
            </div>

            {/* Name card overlay */}
            <div className="absolute bottom-0 right-0 translate-x-4 translate-y-4 bg-gold px-5 py-3">
              <div className="font-display text-2xl font-black text-obsidian">Azlan Khan</div>
              <div className="font-mono text-[8px] tracking-widest uppercase text-obsidian/60 mt-0.5">
                Founder · E-Commerce & Digital Marketing
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Story */}
          <div className="pt-0">
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              className="section-tag mb-6"
            >
              The Founder
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-display text-[clamp(28px,3.5vw,48px)] font-black leading-none text-soft-black mb-6"
            >
              Meet{' '}
              <span className="font-heading italic font-bold text-gold">Azlan</span>
              <br />Khan
            </motion.h2>

            {[
              'My journey into e-commerce began not in a boardroom, but with a genuine frustration — quality beauty products were either unaffordable for most, or the affordable ones were loaded with harsh chemicals. I knew there had to be a better way.',
              'Starting as a self-taught digital marketer, I spent years studying consumer behaviour, brand-building, and the art of building trust online. I ran campaigns across multiple categories — testing what resonates, what converts, and what builds loyalty.',
              'Cosmetic World is the culmination of that journey — a brand built with the rigour of a marketer, the eye of a curator, and the conviction of someone who believes in what they sell. Every product I offer is one I would proudly give to my own family.',
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="font-body text-sm leading-relaxed text-muted mb-3"
              >
                {para}
              </motion.p>
            ))}

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gold/15"
            >
              {achievements.map((a) => (
                <div key={a.label} className="bg-white border border-gold/10 p-5">
                  <div className="font-display text-3xl font-black text-gold">{a.num}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-muted mt-1">{a.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
