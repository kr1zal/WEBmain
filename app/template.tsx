'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Первое монтирование — гидрация серверного HTML: страница уже на экране, проявлять её заново
// нельзя (вспышка). Анимация перехода только при последующих переходах по ссылкам.
let isFirstMount = true

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [animateIn] = useState(() => !isFirstMount)

  useEffect(() => {
    isFirstMount = false
  }, [])

  return (
    <motion.div
      initial={animateIn && !prefersReducedMotion ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
