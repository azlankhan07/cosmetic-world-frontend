import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

export default function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-10 right-8 z-[9999] flex items-center gap-3 bg-soft-black border-l-2 border-gold text-cream-light px-6 py-4 shadow-2xl"
        >
          <ShoppingBag size={14} className="text-gold shrink-0" />
          <span className="font-mono text-[11px] tracking-wide text-cream/80">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
