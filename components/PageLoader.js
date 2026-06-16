import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function PageLoader() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleStop = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  if (!loading) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .cw-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0D0C0A;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 0.5px solid rgba(201,168,76,0.25);
          animation: spin linear infinite;
        }
        .orbit-ring::after {
          content: '';
          position: absolute;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #C9A84C;
          top: -3.5px; left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 6px #C9A84C;
        }
        .ring-1 { width: 100px; height: 100px; animation-duration: 3s; top: calc(50% - 50px); left: calc(50% - 50px); }
        .ring-2 { width: 150px; height: 150px; animation-duration: 4.5s; animation-direction: reverse; top: calc(50% - 75px); left: calc(50% - 75px); border-color: rgba(201,168,76,0.15); }
        .ring-3 { width: 210px; height: 210px; animation-duration: 7s; top: calc(50% - 105px); left: calc(50% - 105px); border-color: rgba(201,168,76,0.08); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .cw-logo-center { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .cw-emblem { width: 54px; height: 54px; border: 1.5px solid #C9A84C; border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
        }
        .cw-emblem svg { width: 30px; height: 30px; }
        .cw-wordmark { font-family: 'Playfair Display', Georgia, serif; color: #C9A84C; font-size: 18px; letter-spacing: 6px; text-transform: uppercase; margin: 0; }
        .cw-sub { font-family: sans-serif; font-size: 10px; letter-spacing: 4px; color: rgba(201,168,76,0.45); text-transform: uppercase; margin: 0; }

        .cw-bar-wrap { position: relative; z-index: 2; margin-top: 28px; width: 120px; height: 1px; background: rgba(201,168,76,0.15); overflow: hidden; border-radius: 1px; }
        .cw-bar { height: 100%; background: #C9A84C; width: 0%; animation: fill 2.2s ease-in-out infinite; border-radius: 1px; }
        @keyframes fill { 0% { width: 0%; opacity: 1; } 70% { width: 100%; opacity: 1; } 100% { width: 100%; opacity: 0; } }

        .dots { position: relative; z-index: 2; margin-top: 14px; display: flex; gap: 6px; }
        .dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(201,168,76,0.4); animation: blink 1.4s ease-in-out infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%, 80%, 100% { background: rgba(201,168,76,0.2); } 40% { background: #C9A84C; } }

        .star { position: absolute; border-radius: 50%; background: rgba(201,168,76,0.5); animation: twinkle ease-in-out infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.7; } }
      `}</style>

      <div className="cw-loader-overlay">
        <span className="star" style={{width:'2px',height:'2px',top:'18%',left:'12%',animationDuration:'2.1s'}}></span>
        <span className="star" style={{width:'2px',height:'2px',top:'72%',left:'8%',animationDuration:'3.3s',animationDelay:'0.5s'}}></span>
        <span className="star" style={{width:'3px',height:'3px',top:'25%',left:'85%',animationDuration:'2.7s',animationDelay:'1s'}}></span>
        <span className="star" style={{width:'2px',height:'2px',top:'65%',left:'82%',animationDuration:'1.9s',animationDelay:'0.3s'}}></span>
        <span className="star" style={{width:'2px',height:'2px',top:'45%',left:'6%',animationDuration:'3.8s',animationDelay:'0.8s'}}></span>
        <span className="star" style={{width:'2px',height:'2px',top:'80%',left:'55%',animationDuration:'2.5s',animationDelay:'1.2s'}}></span>

        <div className="orbit-ring ring-3"></div>
        <div className="orbit-ring ring-2"></div>
        <div className="orbit-ring ring-1"></div>

        <div className="cw-logo-center">
          <div className="cw-emblem">
            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3 C9 3 4 8 4 15 C4 22 9 27 15 27 C19 27 22.5 24.5 24.5 21" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M15 3 C21 3 26 8 26 15" stroke="rgba(201,168,76,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
              <text x="15" y="17.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#C9A84C" fontWeight="700">CW</text>
            </svg>
          </div>
          <p className="cw-wordmark">Cosmetic World</p>
          <p className="cw-sub">By Azlan Khan</p>
        </div>

        <div className="cw-bar-wrap">
          <div className="cw-bar"></div>
        </div>

        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </>
  )
}