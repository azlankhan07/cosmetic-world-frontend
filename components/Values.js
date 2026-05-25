import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  { icon: '✦', name: "Pure Ingredients", text: "Every formula begins with nature's finest — sourced ethically and with clear purpose." },
  { icon: '◈', name: "Cruelty Free", text: "We believe beauty should never come at the cost of another living being." },
  { icon: '❋', name: "Luxury Quality", text: "Formulated to the highest standards — because your skin deserves nothing less." },
  { icon: '✿', name: "Sustainable", text: "From packaging to production, every choice is made with the planet in mind." },
]

export default function Values() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="bg-obsidian grid grid-cols-2 lg:grid-cols-4">
      {values.map((v, i) => (
        <motion.div
          key={v.name}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="py-16 px-10 text-center border-r border-b border-gold/10 last:border-r-0"
        >
          <div className="text-gold text-3xl mb-5">{v.icon}</div>
          <div className="font-heading text-lg font-bold text-gold-light mb-3">{v.name}</div>
          <div className="font-body text-xs text-cream/30 leading-relaxed">{v.text}</div>
        </motion.div>
      ))}
    </div>
  )
}
