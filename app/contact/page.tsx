'use client'

import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import Magnetic from '@/components/Magnetic'
import { Reveal } from '@/components/Motion'

/* ═══════════════════════════════════════════
   Icons
   ═══════════════════════════════════════════ */

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M11.944 0A12 12 0 1 0 24 12.056A12.01 12.01 0 0 0 11.944 0Zm5.573 7.26l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394a.752.752 0 0 1-.6.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.203-.657-.643.136-.953l11.566-4.458c.537-.194 1.006.131.832.95Z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8m-4-4v4" />
  </svg>
)

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const contacts = [
  {
    icon: <TelegramIcon />,
    label: 'Telegram',
    value: '@alv1nogradov',
    href: 'https://t.me/alv1nogradov',
    context: 'Быстрые вопросы, знакомство',
    response: 'В течение дня',
    preferred: true,
  },
  {
    icon: <MailIcon />,
    label: 'Email',
    value: 'kr1zal@yandex.ru',
    href: 'mailto:kr1zal@yandex.ru',
    context: 'Деловые предложения, вакансии',
    response: 'До 24 часов',
    copyable: true,
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: 'Александр Виноградов',
    href: siteMetadata.linkedin || '#',
    context: 'Карьерные возможности',
    response: '2-3 дня',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'kr1zal',
    href: 'https://github.com/kr1zal',
    context: 'Open source, код',
    response: 'По мере возможности',
  },
]

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */

export default function ContactPage() {
  const [toast, setToast] = useState<string | null>(null)

  function copyEmail() {
    navigator.clipboard.writeText('kr1zal@yandex.ru')
    setToast('Email скопирован')
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className="pt-24 pb-16 sm:pt-28">
      {/* Header */}
      <Reveal>
        <div className="mb-8 flex items-baseline justify-between border-b-[3px] border-[#1b2d4e] pb-3 dark:border-[#8fa7cc]">
          <h1 className="font-display text-3xl tracking-tight text-[#1b2d4e] sm:text-4xl dark:text-gray-100">
            Контакт
          </h1>
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            На связи
          </span>
        </div>
      </Reveal>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Left — statement + meta */}
        <Reveal>
          <div>
            <p className="max-w-[480px] text-[22px] leading-[1.45] font-light text-[#1a1a1a] sm:text-[26px] dark:text-gray-100">
              Обсудим{' '}
              <strong className="font-semibold text-[#1b2d4e] dark:text-[#8fa7cc]">
                e-commerce стратегию
              </strong>
              , цифровую трансформацию или возможности сотрудничества
            </p>

            {/* Status */}
            <div className="mt-5 inline-flex items-center gap-2 border border-[#e0dcd6] px-3 py-1.5 dark:border-gray-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-[#666] dark:text-gray-400">
                Открыт для предложений
              </span>
            </div>

            {/* Meta */}
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[#bbb] dark:text-gray-600">
                  <ClockIcon />
                </span>
                <span className="text-[13px] text-[#888] dark:text-gray-500">
                  <strong className="font-medium text-[#555] dark:text-gray-400">Москва</strong>,
                  UTC+3
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#bbb] dark:text-gray-600">
                  <PinIcon />
                </span>
                <span className="text-[13px] text-[#888] dark:text-gray-500">
                  Удалённо · Россия и СНГ
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#bbb] dark:text-gray-600">
                  <MonitorIcon />
                </span>
                <span className="text-[13px] text-[#888] dark:text-gray-500">
                  COO · Head of E-com · Консалтинг
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right — contacts with response time inline */}
        <div>
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.06}>
              <Magnetic strength={0.08}>
                <div
                  className={`group flex items-start justify-between gap-4 py-5 transition-all duration-200 hover:pl-2 ${
                    i < contacts.length - 1
                      ? 'border-b border-[#e0dcd6] dark:border-gray-700/50'
                      : ''
                  }`}
                >
                  {/* Left side */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-[0.1em] text-[#999] uppercase dark:text-gray-500">
                        {c.label}
                      </span>
                      {c.preferred && (
                        <span className="border border-emerald-500 px-1.5 py-px text-[9px] font-semibold tracking-[0.06em] text-emerald-500 uppercase">
                          preferred
                        </span>
                      )}
                    </div>

                    <div className="mt-1">
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-lg font-medium text-[#1a1a1a] no-underline transition-colors group-hover:text-[#1b2d4e] sm:text-xl dark:text-gray-200 dark:group-hover:text-[#8fa7cc]"
                      >
                        {c.value}
                      </a>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[13px] text-[#999] dark:text-gray-500">
                        {c.context}
                      </span>
                      {c.response && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 border border-[#e8e5e0] px-2 py-0.5 whitespace-nowrap dark:border-gray-700/50">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-3 w-3 text-[#ccc] dark:text-gray-600"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <span className="text-[11px] font-medium text-[#aaa] dark:text-gray-500">
                            {c.response}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right side — actions */}
                  <div className="flex shrink-0 items-center gap-2 pt-5">
                    {c.copyable && (
                      <button
                        onClick={copyEmail}
                        className="flex h-8 w-8 items-center justify-center border border-[#e0dcd6] text-[#bbb] transition-all hover:border-[#1b2d4e] hover:text-[#1b2d4e] dark:border-gray-700 dark:text-gray-600 dark:hover:border-[#8fa7cc] dark:hover:text-[#8fa7cc]"
                        title="Скопировать email"
                      >
                        <CopyIcon />
                      </button>
                    )}
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex h-8 w-8 items-center justify-center border border-[#e0dcd6] text-[#bbb] transition-all hover:border-[#1b2d4e] hover:text-[#1b2d4e] dark:border-gray-700 dark:text-gray-600 dark:hover:border-[#8fa7cc] dark:hover:text-[#8fa7cc]"
                      title="Открыть"
                    >
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </Magnetic>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 bg-[#1b2d4e] px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 dark:bg-[#8fa7cc] dark:text-[#111110] ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
        }`}
      >
        {toast}
      </div>
    </div>
  )
}
