import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef()
  const ring = useRef()
  let mx = 0, my = 0, rx = 0, ry = 0

  useEffect(() => {
    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
    }
    window.addEventListener('mousemove', move)

    let raf
    const animRing = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      }
      raf = requestAnimationFrame(animRing)
    }
    raf = requestAnimationFrame(animRing)

    const grow = () => {
      if (ring.current) { ring.current.style.width = '56px'; ring.current.style.height = '56px' }
    }
    const shrink = () => {
      if (ring.current) { ring.current.style.width = '40px'; ring.current.style.height = '40px' }
    }
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot fixed pointer-events-none z-[9999]" />
      <div ref={ring} className="cursor-ring fixed pointer-events-none z-[9998]" style={{ transition: 'width 0.3s, height 0.3s' }} />
    </>
  )
}
