'use client'

import { useRef, useCallback, useState, useEffect } from 'react'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: keyof JSX.IntrinsicElements
  [key: string]: unknown
}

export default function Magnetic({
  children,
  className = '',
  strength = 0.15,
  as: Tag = 'div',
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      ref.current.style.transition = 'none'
    },
    [strength, prefersReduced]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
    ref.current.style.transition = 'transform 0.4s cubic-bezier(.16,1,.3,1)'
  }, [])

  return (
    // @ts-ignore
    <Tag
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
