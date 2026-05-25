import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    text: 'The 24K Gold Face Wash is unlike anything I have ever tried. My skin looks genuinely radiant after two weeks. Completely converted.',
    name: 'Fatima Malik',
    loc: 'Lahore, Pakistan',
  },
  {
    text: 'The Ancient Glow shampoo gave me the kind of shine I only used to see in advertisements. It feels expensive because it genuinely is a premium experience.',
    name: 'Nadia Hussain',
    loc: 'Karachi, Pakistan',
  },
  {
    text: 'I was sceptical at first but the Tea Tree Face Wash cleared my skin in under a month. Azlan clearly knows what he is doing — this brand has my full trust.',
    name: 'Aisha Rehman',
    loc: 'Islamabad, Pakistan',
  },
]

export default function Testimonials() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-tag justify-center mb-5 before:hidden"
          >
            What Clients Say
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[clamp(36px,5vw,72px)] font-black leading-none text-soft-black"
          >
            Loved by{' '}
            <span className="font-heading italic font-bold text-gold">Thousands</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-cream p-10 border-t-2 border-gold flex flex-col"
            >
              <div className="flex gap-0.5 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-heading italic font-semibold text-base text-soft-black leading-relaxed flex-1 mb-8">
                "{t.text}"
              </p>
              <div>
                <div className="font-body font-semibold text-sm tracking-wide text-soft-black">{t.name}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-gold mt-1">{t.loc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
