'use client'

import { useState, useEffect, useCallback } from 'react'

interface TypingEffectProps {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TypingEffect({
  words,
  className = '',
  typeSpeed = 70,
  deleteSpeed = 35,
  pauseTime = 2000,
}: TypingEffectProps) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = words[wordIndex]

    if (!isDeleting) {
      setText(current.substring(0, text.length + 1))
      if (text.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }
    } else {
      setText(current.substring(0, text.length - 1))
      if (text.length - 1 === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [text, wordIndex, isDeleting, words, pauseTime])

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed + Math.random() * 40
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typeSpeed, deleteSpeed])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-current align-text-bottom" />
    </span>
  )
}
