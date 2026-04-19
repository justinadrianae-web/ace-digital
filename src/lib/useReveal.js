// src/lib/useReveal.js
// Hook para animar elementos al hacer scroll
import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 55)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })

    const els = document.querySelectorAll('.reveal')
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
