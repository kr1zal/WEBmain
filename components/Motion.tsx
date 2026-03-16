'use client'

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

// --- Reveal on scroll ---

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const directionOffset = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Stagger container + items ---

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  stagger?: number
}

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.1,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Animated counter ---

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(latest) {
        setDisplayValue(Math.round(latest))
      },
    })

    return () => controls.stop()
  }, [isInView, value, duration, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}

// --- Scroll-active card (mobile hover substitute) ---
// On mobile: card is dimmed by default, lights up when near center of viewport,
// dims again when scrolled away. On desktop (md+): no effect, hover works instead.

interface ScrollActiveCardProps {
  children: ReactNode
  className?: string
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

export function ScrollActiveCard({ children, className = '' }: ScrollActiveCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const isMobile = useIsMobile()

  const mobileStyle: React.CSSProperties = isMobile
    ? {
        opacity: isInView ? 1 : 0.4,
        transform: isInView ? 'scale(1)' : 'scale(0.97)',
        transition:
          'opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
      }
    : {}

  return (
    <div ref={ref} className={`${className} ${isInView ? 'in-view' : ''}`} style={mobileStyle}>
      {children}
    </div>
  )
}

// --- Image reveal ---

interface ImageRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ImageReveal({ children, className = '', delay = 0 }: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
