import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Globe, Users, Package, Award } from 'lucide-react'

const products = [
  '24K Gold Face Wash', 'Tea Tree Face Wash', 'Intensive Brightening Face Wash',
  'Ancient Glow Rice Protein Shampoo', 'Ancient Glow Rice Protein Conditioner',
  'Biotin & Keratin Shampoo', 'Biotin & Keratin Conditioner',
  'Lavender Beads Shower Gel', 'Lemon Beads Shower Gel',
  'Vitamin C Serum', 'Niacinamide Serum', 'Hyaluronic Acid Serum',
  'Acne Free Serum', 'Keratin Nutrition Hair Serum',
  'Hydrating Face & Body Moisturiser', 'Skin Brightening Cream',
  'SPF 60 Sunblock', 'Sweet Bliss Sugar Scrub', 'Whitening Facial Kit'
]

const stats = [
  { number: '30+', label: 'Premium Products' },
  { number: '4', label: 'Countries' },
  { number: '1000+', label: 'Active Members' },
  { number: '100%', label: 'Derma Tested' }
]

const values = [
  { icon: Package, title: 'Premium Quality', desc: 'Every product is meticulously crafted with the highest quality ingredients, meeting global standards and passing rigorous dermatological tests.' },
  { icon: Users, title: 'Empowerment Community', desc: 'Empowering individuals — especially the youth and women of Pakistan — by providing accessible, risk-free opportunities in global direct sales.' },
  { icon: Award, title: 'Expert Guidance', desc: 'Comprehensive training programs, mentorship and proven strategies to help members achieve financial independence and personal growth.' },
  { icon: Globe, title: 'Global Reach', desc: 'Operating across Pakistan, Oman, Azerbaijan and Malaysia — a truly global community built on beauty and entrepreneurship.' }
]

export default function GrowwayPage() {
  return (
    <>
      <Head>
        <title>Growway Global — Our Supply Partner | Cosmetic World</title>
      </Head>

      <div className="min-h-screen bg-cream">

        {/* Header */}
        <div
  className="relative px-8 md:px-16 pb-12 pt-0"
  style={{
    backgroundImage: 'url(/images/GWG_2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    minHeight: '420px',
  }}
>
  {/* Bottom fade so page content blends in */}
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />

  {/* Back link — top left */}
  <div className="relative z-10 pt-6">
    <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-obsidian/60 hover:text-obsidian transition-colors">
      <ArrowLeft size={14} />
      Back to Cosmetic World
    </Link>
  </div>

  {/* Visit Website button — bottom right corner */}
  <div className="relative z-10 flex justify-end mt-auto pt-40">
    <a
      href="https://growwayglobal.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase bg-obsidian text-gold px-6 py-3 hover:bg-gold hover:text-obsidian transition-colors"
    >
      Visit Website
      <ExternalLink size={13} />
    </a>
  </div>
</div>

        {/* Gold line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Stats */}
        <div className="bg-obsidian/5 border-b border-gold/10">
          <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl font-black text-obsidian">{s.number}</p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-gold mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 py-16 flex flex-col gap-20">

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-4">About the Company</p>
              <h2 className="font-display text-4xl font-black text-obsidian mb-6">
                Your Dream, Your Business, <span className="font-heading italic font-bold">Our Support.</span>
              </h2>
              <p className="font-body text-muted leading-relaxed mb-4">
                At Growway Global, the mission is to empower individuals — especially the youth and women of Pakistan — by providing accessible, risk-free opportunities in global direct sales.
              </p>
              <p className="font-body text-muted leading-relaxed">
                Founded by Ajmal Lashari, Growway Global has grown into a movement operating across Pakistan, Oman, Azerbaijan and Malaysia — offering premium cosmetic products, comprehensive training, and a rewarding business model designed for financial independence.
              </p>
            </div>
            <div className="bg-obsidian p-10 flex flex-col gap-4">
              <p className="font-mono text-[9px] tracking-widest uppercase text-gold/50">Headquarters</p>
              <p className="font-body text-cream text-sm">Lahore & Karachi, Pakistan</p>
              <div className="h-px bg-gold/10" />
              <p className="font-mono text-[9px] tracking-widest uppercase text-gold/50">Global Offices</p>
              <p className="font-body text-cream text-sm">Muscat, Oman · Baku, Azerbaijan · Kuala Lumpur, Malaysia</p>
              <div className="h-px bg-gold/10" />
              <p className="font-mono text-[9px] tracking-widest uppercase text-gold/50">Founded by</p>
              <p className="font-body text-cream text-sm">Ajmal Lashari — CEO & Founder</p>
              <div className="h-px bg-gold/10" />
              <p className="font-mono text-[9px] tracking-widest uppercase text-gold/50">Website</p>
              <a href="https://growwayglobal.com" target="_blank" rel="noopener noreferrer"
                className="font-body text-gold text-sm hover:underline flex items-center gap-1">
                growwayglobal.com <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>

          {/* Azlan's role */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-obsidian pt-10 pr-10 md:pt-14 md:pr-14 pb-0 pl-10 md:pl-14 relative overflow-visible"
layout={false}
>
  {/* Animated background orbs */}
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold -translate-y-1/2 translate-x-1/3"
  />
  <motion.div
    animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.07, 0.03] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    className="absolute bottom-0 left-20 w-64 h-64 rounded-full bg-gold translate-y-1/2"
  />

  <div className="relative z-10 flex flex-col md:flex-row gap-12" style={{ alignItems: 'flex-end' }}>

    {/* Image container — clips body, reveals on hover */}
    {/* Outer wrapper — clips only the bottom, allows overflow upward */}
 <div
  className="relative shrink-0 group cursor-pointer"
  style={{
    width: '280px',
    height: '450px',
    flexShrink: 0,
    alignSelf: 'flex-end',
  }}
>
  {/* Gold glow */}
  <motion.div
    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
    style={{
      background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)',
      filter: 'blur(20px)',
    }}
  />

  {/* Image */}
  <img
  src="/images/P5.png"
  alt="Azlan Khan"
  className="absolute bottom-0 left-0 transition-transform duration-700 ease-out group-hover:scale-150"
  style={{
    height: '900px',
    width: '800px',
    objectPosition: 'bottom',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.3))',
    transformOrigin: 'bottom center',
    willChange: 'transform',
  }}
/>

  {/* Hint */}
 <div className="absolute inset-0 z-40" />
<p className="absolute bottom-4 left-4 z-30 font-mono text-[8px] tracking-widest uppercase text-gold/40 group-hover:opacity-0 transition-opacity duration-300 whitespace-nowrap">
  Hover to reveal
</p>
</div>
    {/* Text content */}
    <div className="flex flex-col gap-5 pb-10 md:pb-14">
      <p className="font-mono text-[10px] tracking-widest uppercase text-gold/50">My Role at Growway Global</p>
      <h2 className="font-display text-3xl md:text-4xl font-black text-cream">
        Azlan Khan — <span className="font-heading italic font-bold text-gold">Consultant</span>
      </h2>
      <p className="font-body text-cream/60 leading-relaxed max-w-xl">
        As an official consultant at Growway Global, I bridge the gap between premium cosmetic manufacturing and the end consumer. My role involves product selection, digital marketing strategy, and building the e-commerce presence that brings these exceptional products directly to your door through Cosmetic World.
      </p>
      <p className="font-body text-cream/60 leading-relaxed max-w-xl">
        Every product you purchase on Cosmetic World is sourced directly through Growway Global — ensuring authenticity, quality assurance, and dermatologically tested standards with every order.
      </p>
    </div>

  </div>
</motion.div>

          {/* Values */}
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-4">What They Stand For</p>
            <h2 className="font-display text-4xl font-black text-obsidian mb-10">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gold/10 p-8"
                >
                  <v.icon size={20} className="text-gold mb-4" />
                  <h3 className="font-heading font-bold text-lg text-obsidian mb-3">{v.title}</h3>
                  <p className="font-body text-muted text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-4">Product Catalogue</p>
            <h2 className="font-display text-4xl font-black text-obsidian mb-10">Their Full Range</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map((p, i) => (
                <div key={i} className="bg-white border border-gold/10 px-5 py-4">
                  <p className="font-body text-sm text-soft-black">{p}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://growwayglobal.com/ProductListView.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase bg-obsidian text-gold px-8 py-4 hover:bg-gold hover:text-obsidian transition-colors"
              >
                View Full Catalogue on Growway
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="bg-obsidian py-16 text-center px-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-gold/50 mb-4">Ready to Shop?</p>
          <h2 className="font-display text-4xl font-black text-cream mb-6">
            Explore Cosmetic World
          </h2>
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase border border-gold text-gold px-8 py-4 hover:bg-gold hover:text-obsidian transition-colors">
            Back to Store
          </Link>
        </div>

      </div>
    </>
  )
}