export default function Marquee() {
  const items = [
    '24K Gold Skincare',
    'Ancient Glow Haircare',
    'Tea Tree Botanicals',
    'Lavender Body Rituals',
    'Premium Formulas',
    'Ethically Sourced',
    'Natural Ingredients',
    'Cruelty Free',
  ]

  return (
    <div className="bg-gold py-4 overflow-hidden flex">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-accent text-obsidian text-sm tracking-widest mx-6">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian/30 inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}
