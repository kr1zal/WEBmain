'use client'

import clsx from 'clsx'
import Image from '@/components/Image'
import { ImageReveal } from '@/components/Motion'

interface Shot {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

interface ScreensProps {
  /** Кадры сеткой 2 колонки (на телефоне 1); пустой список = только пара */
  items: Shot[]
  /** Широкий кадр и кадр телефона рядом, одной высоты */
  pair?: [Shot, Shot]
  /** Один кадр на всю ширину колонки */
  wide?: Shot
}

function Frame({ shot, delay = 0, className }: { shot: Shot; delay?: number; className?: string }) {
  return (
    <ImageReveal delay={delay} className={clsx('min-w-0', className)}>
      <figure className="m-0">
        <a
          href={shot.src}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-gray-200 transition-colors duration-150 ease-out hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
        >
          <Image
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            loading="lazy"
            className="block h-auto w-full"
          />
        </a>
        <figcaption className="mt-2.5 text-[13px] leading-5 text-gray-500 dark:text-gray-400">
          {shot.caption}
        </figcaption>
      </figure>
    </ImageReveal>
  )
}

/** Кадры продукта. Клик открывает кадр целиком в новой вкладке. */
export default function Screens({ items, pair, wide }: ScreensProps) {
  const hasItems = items.length > 0
  return (
    <div className="not-prose my-10">
      {hasItems && (
        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">
          {items.map((shot, i) => (
            <Frame key={shot.src} shot={shot} delay={i % 2 ? 0.05 : 0} />
          ))}
        </div>
      )}
      {pair && (
        // Доли колонок = пропорции кадров (1440×900 и 390×808): кадры получаются одной высоты
        <div
          className={clsx(
            'grid grid-cols-1 gap-7 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,0.4827fr)] sm:gap-5',
            hasItems && 'mt-7'
          )}
        >
          <Frame shot={pair[0]} />
          <Frame shot={pair[1]} delay={0.05} className="max-w-[min(60%,240px)] sm:max-w-none" />
        </div>
      )}
      {wide && <Frame shot={wide} className={clsx((hasItems || pair) && 'mt-7')} />}
    </div>
  )
}
