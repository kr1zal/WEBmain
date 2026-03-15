'use client'

import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface WordRevealProps {
  text: string
  className?: string
  wordDelay?: number
}

export default function WordReveal({ text, className = '', wordDelay = 70 }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(/\s+/)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  if (prefersReducedMotion) {
    return <blockquote className={className}>{text}</blockquote>
  }

  return (
    <blockquote ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: isVisible ? `${i * wordDelay}ms` : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </blockquote>
  )
}
