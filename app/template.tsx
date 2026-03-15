'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (prefersReducedMotion || !isMounted) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
