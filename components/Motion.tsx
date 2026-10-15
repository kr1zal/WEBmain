'use client'

import {
  animate,
  inView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useInView,
} from 'framer-motion'
import {
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

// --- Reveal on scroll (Reveal, StaggerContainer + StaggerItem, ImageReveal) ---
// Серверный HTML ничего не прячет: без JS и до гидрации контент виден. Прячет клиент, в layout-эффекте
// до отрисовки: при гидрации только элементы ниже окна (то, что уже на экране или выше, остаётся как
// есть, без вспышки), при монтировании после перехода по ссылке все, как обычный whileInView.
// Спрятанное проявляется, когда входит в окно.

const EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

interface Hidden {
  opacity: number
  x?: number
  y?: number
  scale?: number
  filter?: string
}

const noSubscribe = () => () => {}

/** false — компонент гидрирует серверный HTML (первая загрузка), true — смонтирован на клиенте (переход). */
function useMountedOnClient() {
  const onClient = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false
  )
  const [mountedOnClient] = useState(onClient)
  return mountedOnClient
}

/** stagger задан — проявляются вложенные [data-stagger-item] по очереди, иначе сам элемент. */
function useReveal(
  ref: RefObject<HTMLDivElement | null>,
  { opacity, x = 0, y = 0, scale = 1, filter }: Hidden,
  { duration, delay = 0, stagger }: { duration: number; delay?: number; stagger?: number }
) {
  const mountedOnClient = useMountedOnClient()

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return
    if (!mountedOnClient && root.getBoundingClientRect().top < window.innerHeight) return

    const targets =
      stagger === undefined
        ? [root]
        : [...root.querySelectorAll<HTMLElement>('[data-stagger-item]')]
    const from = {
      opacity: String(opacity),
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      ...(filter && { filter }),
    }
    for (const el of targets) Object.assign(el.style, from)

    // WAAPI с fill: backwards держит начальный кадр на время задержки; inline-стили снимаются сразу,
    // после анимации на элементе ничего не остаётся
    return inView(
      root,
      () => {
        targets.forEach((el, i) => {
          el.animate(
            [from, { opacity: '1', transform: 'none', ...(filter && { filter: 'none' }) }],
            {
              duration: duration * 1000,
              delay: (delay + (stagger ?? 0) * i) * 1000,
              easing: EASE,
              fill: 'backwards',
            }
          )
          el.style.removeProperty('opacity')
          el.style.removeProperty('transform')
          el.style.removeProperty('filter')
        })
      },
      { amount: 0.05 }
    )
  }, [ref, mountedOnClient, opacity, x, y, scale, filter, duration, delay, stagger])
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(
    ref,
    { opacity: 0, ...directionOffset[direction] },
    { duration: duration * 0.67, delay }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
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
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { opacity: 0, y: 24 }, { duration: 0.4, stagger })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
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
    <div data-stagger-item className={className}>
      {children}
    </div>
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
    <div
      ref={ref}
      className={`${className} ${isMobile && isInView ? 'in-view' : ''}`}
      style={mobileStyle}
    >
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
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { opacity: 0, scale: 0.98, filter: 'blur(2px)' }, { duration: 0.5, delay })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
