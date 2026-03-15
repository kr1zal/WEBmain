'use client'

import Image from './Image'
import Link from './Link'
import { motion, useReducedMotion } from 'framer-motion'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

const Card = ({ title, description, imgSrc, href }: CardProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -4,
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }
      }
      className={`${
        imgSrc && 'h-full'
      } group overflow-hidden rounded-xl border border-gray-200 bg-white will-change-transform dark:border-gray-800 dark:bg-gray-900/60`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Ссылка на ${title}`}>
            <div className="overflow-hidden">
              <Image
                alt={title}
                src={imgSrc}
                className="aspect-[16/10] w-full object-cover"
                width={544}
                height={340}
              />
            </div>
          </Link>
        ) : (
          <div className="overflow-hidden">
            <Image
              alt={title}
              src={imgSrc}
              className="aspect-[16/10] w-full object-cover"
              width={544}
              height={340}
            />
          </div>
        ))}
      <div className="p-3 sm:p-5">
        <h2 className="font-display mb-1.5 text-sm leading-snug font-semibold tracking-tight text-gray-900 sm:mb-2 sm:text-lg sm:leading-7 dark:text-gray-100">
          {href ? (
            <Link href={href} aria-label={`Ссылка на ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-gray-500 sm:mb-3 sm:text-sm dark:text-gray-400">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="text-primary-600 dark:text-primary-400 inline-flex items-center gap-1 text-xs font-medium sm:text-sm"
            aria-label={`Ссылка на ${title}`}
          >
            Подробнее
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default Card
