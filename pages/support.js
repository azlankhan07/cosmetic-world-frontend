import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import { Footer } from '../components/FooterNewsletter'

const sections = [
  {
    id: 'shipping',
    label: 'Shipping Policy',
    icon: '✦',
    content: [
      {
        heading: 'Processing Time',
        body: 'All orders are processed within 1–2 business days. Orders placed on weekends or public holidays are processed on the next business day.',
      },
      {
        heading: 'Delivery Timeframes',
        body: 'Standard delivery within Pakistan takes 3–5 business days. Express delivery is available at checkout and typically arrives within 1–2 business days.',
      },
      {
        heading: 'Shipping Charges',
        body: 'Free standard shipping on all orders above PKR 2,500. A flat shipping fee of PKR 250 applies to orders below that threshold.',
      },
      {
        heading: 'International Shipping',
        body: 'International shipping is not available yet but is coming soon. Stay tuned for updates by subscribing to our newsletter.',
      },
      {
        heading: 'Order Tracking',
        body: 'Once your order is dispatched, you will receive a confirmation email with a tracking number. You can use this to monitor your delivery status in real time.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    icon: '↩',
    content: [
      {
        heading: 'Return Window',
        body: 'We accept returns within 7 days of delivery. Items must be unused, unopened, and in their original packaging to be eligible for a return.',
      },
      {
        heading: 'Non-Returnable Items',
        body: 'For hygiene and safety reasons, opened skincare or haircare products cannot be returned unless they are defective or damaged upon arrival.',
      },
      {
        heading: 'Damaged or Defective Products',
        body: 'If your order arrives damaged or defective, please contact us within 48 hours of receipt with photos of the item and packaging. We will arrange a free replacement or full refund.',
      },
      {
        heading: 'Refund Process',
        body: 'Approved refunds are processed within 5–7 business days back to your original payment method. You will receive an email confirmation once the refund has been initiated.',
      },
      {
        heading: 'How to Initiate a Return',
        body: 'Email us at worldcosmetic274@gmail.com with your order number, reason for return, and supporting photos if applicable. Our team will guide you through the process.',
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: '🔒',
    content: [
      {
        heading: 'Information We Collect',
        body: 'We collect your name, email address, shipping address, and payment details when you place an order. We may also collect browsing data to improve your experience on our website.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'Your information is used solely to process orders, send order updates, and occasionally share relevant offers if you have opted in to our newsletter. We do not sell your data to third parties.',
      },
      {
        heading: 'Data Security',
        body: 'All data is stored securely using industry-standard encryption. Payment information is processed through trusted, PCI-compliant payment gateways and is never stored on our servers.',
      },
      {
        heading: 'Cookies',
        body: 'Our website uses cookies to enhance your browsing experience, remember your cart, and analyse site traffic. You can disable cookies in your browser settings at any time.',
      },
      {
        heading: 'Your Rights',
        body: 'You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at worldcosmetic274@gmail.com.',
      },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: '?',
    content: [
      {
        heading: 'Are your products dermatologically tested?',
        body: 'Yes. Every Cosmetic World product is manufactured by Growway Global and undergoes rigorous dermatological testing before being made available for sale.',
      },
      {
        heading: 'Are your products suitable for sensitive skin?',
        body: 'Most of our products are formulated with natural ingredients and are suitable for sensitive skin. We recommend reviewing the ingredient list on each product page. When in doubt, do a patch test before use.',
      },
      {
        heading: 'Can I modify or cancel my order?',
        body: 'Orders can be modified or cancelled within 5 hours of placement. After that, the order enters processing and cannot be changed. Please contact us immediately if you need to make changes.',
      },
      {
        heading: 'Do you offer Cash on Delivery?',
        body: 'Yes, Cash on Delivery (COD) is available for all orders within Pakistan.',
      },
      {
        heading: 'How do I know which products are right for me?',
        body: 'You can reach out to us via email or WhatsApp and our team will help recommend the right products based on your skin or hair type.',
      },
      {
        heading: 'Do you restock sold-out products?',
        body: 'Yes, we restock regularly. You can subscribe to our newsletter to be notified when a product is back in stock.',
      },
    ],
  },
]

export default function SupportPage() {
  const [active, setActive] = useState('shipping')
  const [openFaq, setOpenFaq] = useState(null)
  const router = useRouter()

  // ✅ Now correctly inside the component
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && sections.find((s) => s.id === hash)) {
      setActive(hash)
    }
  }, [router.asPath])

  const activeSection = sections.find((s) => s.id === active)

  return (
    <>
      <Head>
        <title>Support — Cosmetic World</title>
        <meta name="description" content="Shipping policy, returns, privacy policy and FAQ for Cosmetic World." />
      </Head>

      <Navbar cartCount={0} onCartClick={() => {}} user={null} onLoginClick={() => {}} onLogout={() => {}} />

      {/* Hero Banner */}
      <section className="bg-obsidian pt-32 pb-16 px-8 md:px-16 text-center border-b border-gold/10">
        <p className="font-mono text-[10px] tracking-widest uppercase text-gold/50 mb-4">Help Center</p>
        <h1 className="font-display text-[clamp(40px,6vw,80px)] font-black text-cream leading-none mb-4">
          Support
        </h1>
        <p className="font-body text-sm text-cream/30 max-w-md mx-auto">
          Everything you need to know about orders, shipping, privacy and more.
        </p>
      </section>

      {/* Main Layout */}
      <section className="bg-obsidian min-h-screen px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

          {/* Sidebar Nav */}
          <aside className="md:w-56 shrink-0">
            <ul className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => { setActive(s.id); setOpenFaq(null) }}
                    className={`w-full text-left px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all whitespace-nowrap
                      ${active === s.id
                        ? 'bg-gold text-obsidian'
                        : 'border border-gold/15 text-cream/30 hover:border-gold/40 hover:text-gold'
                      }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            <div className="mb-10 border-b border-gold/10 pb-6">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-2">
                {activeSection.icon} &nbsp;{activeSection.label}
              </p>
            </div>

            {active === 'faq' ? (
              <div className="space-y-3">
                {activeSection.content.map((item, i) => (
                  <div key={i} className="border border-gold/10 hover:border-gold/25 transition-colors">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left"
                    >
                      <span className="font-body text-sm font-semibold text-cream/80">{item.heading}</span>
                      <span className="font-mono text-gold text-lg shrink-0 ml-4">
                        {openFaq === i ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5">
                        <p className="font-body text-sm text-cream/40 leading-relaxed">{item.body}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {activeSection.content.map((item, i) => (
                  <div key={i} className="border-l-2 border-gold/30 pl-6">
                    <h3 className="font-body text-sm font-semibold text-cream/80 mb-2">{item.heading}</h3>
                    <p className="font-body text-sm text-cream/40 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Strip */}
            <div className="mt-16 border border-gold/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-gold mb-2">Still need help?</p>
                <p className="font-body text-sm text-cream/40">
                  Our team is available Monday–Saturday, 10am–6pm PKT.
                </p>
              </div>
              <a
                href="mailto:worldcosmetic274@gmail.com"
                className="font-mono text-[10px] tracking-widest uppercase bg-gold text-obsidian px-8 py-4 hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                Email Support ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}