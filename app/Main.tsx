'use client'

import Link from '@/components/Link'
import Image from '@/components/Image'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Reveal, StaggerContainer, StaggerItem, AnimatedCounter } from '@/components/Motion'
import TypingEffect from '@/components/TypingEffect'
import WordReveal from '@/components/WordReveal'

// --- Experience data ---
const experience = [
  {
    period: 'Янв 2020 — Июн 2025',
    duration: '5 лет 6 мес',
    role: 'Директор E-commerce / IT',
    company: 'ГК «Империал» — Фабрика мебели',
    desc: 'Руководство e-commerce направлением с полной P&L ответственностью. Масштабирование интернет-выручки с 300K до 26M ₽/мес. Цифровая трансформация всех бизнес-процессов. Управление командой до 60 человек в 7 департаментах.',
    chips: ['P&L ответственность', '7 департаментов', 'Рост x87', '60 человек'],
  },
  {
    period: '2019 — 2020',
    duration: '1 год',
    role: 'Digital-консультант',
    company: 'Фриланс',
    desc: 'Консультирование бизнеса по цифровизации и выходу в онлайн. Разработка digital-стратегий, аудит маркетинговых каналов, настройка аналитики и CRM-систем.',
    chips: ['Digital-стратегия', 'CRM', 'Аналитика'],
  },
  {
    period: '2014 — 2019',
    duration: '5 лет',
    role: 'Интернет-маркетолог → Руководитель digital',
    company: 'Рост через позиции',
    desc: 'Карьерный рост от специалиста по продажам к интернет-маркетингу. Построение маркетинговых команд, управление рекламными бюджетами до 120M ₽ с ROI до 420%.',
    chips: ['ROI 420%', 'Бюджет 120M', 'Построение команд'],
  },
]

// --- Competencies (4-column lists) ---
const competencies = [
  {
    title: 'Управление',
    items: [
      'Стратегическое планирование',
      'P&L управление',
      'Построение департаментов с нуля',
      'Управление командами до 60 чел',
      'OKR / KPI системы',
      'Scrum / Agile / Kanban',
      'Бюджетирование IT',
      'Vendor management',
    ],
  },
  {
    title: 'Технологии',
    items: [
      '1С: УТ, ERP, интеграции',
      'Next.js / React / TypeScript',
      'React Native / Expo / iOS',
      'Python / FastAPI',
      'PostgreSQL, Supabase',
      'CI/CD, Docker',
      'Sentry, Grafana, Umami',
      'REST API, микросервисы',
    ],
  },
  {
    title: 'E-commerce',
    items: [
      'Маркетплейсы (WB, Ozon, Lamoda)',
      'Собственный интернет-магазин',
      'WMS / фулфилмент',
      'CRM и сквозная аналитика',
      'Retention-маркетинг',
      'Unit-экономика',
      'Платёжные системы и эквайринг',
    ],
  },
  {
    title: 'AI',
    items: [
      'LLM-агенты и чат-боты',
      'AI-генерация контента и копирайтинг',
      'Генерация видео и AI-аватары',
      'Предиктивная аналитика',
      'RAG-системы и базы знаний',
      'Автоматизация через n8n / Make',
      'Промпт-инжиниринг и fine-tuning',
      'AI для e-commerce и маркетинга',
    ],
  },
]

// --- Featured projects ---
const featuredProjects = [
  {
    badge: 'Featured',
    title: 'RevioMP — SaaS-аналитика для маркетплейсов',
    role: 'Founder & Developer',
    desc: 'Полный цикл создания SaaS-платформы: аналитика продаж, юнит-экономика, прогнозирование остатков для продавцов Wildberries и Ozon. React 19 + FastAPI + Supabase.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Supabase', 'Tailwind'],
    link: 'https://reviomp.ru',
    linkText: 'reviomp.ru',
  },
  {
    badge: 'Собственный бренд',
    title: 'BIXIRUN — фитнес-маркетплейс и таймер тренировок',
    role: 'Founder / Full-stack Developer',
    desc: 'Мобильное приложение в App Store для покупки спортивных добавок со встроенным интервальным таймером и видеозаписью тренировок. Собственный бренд БАДов.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Redux', 'iOS Native'],
    link: 'https://bixirun.ru',
    linkText: 'bixirun.ru',
  },
]

const gridProjects = [
  {
    num: '01',
    title: 'Запуск интернет-магазина Imperial',
    role: 'Руководитель проекта',
    desc: 'Полный цикл создания e-commerce платформы: от выбора стека до запуска в продакшн.',
    tags: ['Next.js', '1С', 'REST API', 'PostgreSQL'],
  },
  {
    num: '02',
    title: 'Автоматизация склада и WMS',
    role: 'IT Director',
    desc: 'Внедрение WMS, штрихкодирование, автоматизация приёмки и отгрузки. Сокращение ошибок на 80%.',
    tags: ['WMS', '1С ERP', 'Barcode', 'Процессы'],
  },
  {
    num: '03',
    title: 'Маркетплейс-экспансия',
    role: 'Head of E-commerce',
    desc: 'Выход на Wildberries, Ozon и Lamoda. Автоматизация фидов, ценообразования, контента.',
    tags: ['Wildberries', 'Ozon', 'Lamoda', 'API'],
  },
  {
    num: '04',
    title: 'BI-аналитика и дашборды',
    role: 'Product Owner',
    desc: 'Система сквозной аналитики: от рекламных каналов до повторных покупок.',
    tags: ['Grafana', 'PostgreSQL', 'ETL', 'KPI'],
  },
]

// --- Speaking topics ---
const speakingTopics = [
  {
    num: 'I',
    title: 'Цифровая трансформация в ритейле',
    desc: 'Как перевести бизнес-процессы из Excel в автоматизированные системы. Реальные кейсы и результаты.',
  },
  {
    num: 'II',
    title: 'AI в e-commerce: практический опыт',
    desc: 'Внедрение AI-автоматизации в операционные процессы маркетплейсов. LLM-агенты и предиктивная аналитика.',
  },
  {
    num: 'III',
    title: 'Системный рост онлайн-продаж',
    desc: 'От первого заказа до системного канала продаж. Стратегия, команда, технологии и метрики роста.',
  },
]

// --- Typing roles ---
const typingRoles = [
  'IT Director',
  'Chief AI Officer',
  'E-commerce Expert',
  'Спикер',
  'Digital Transformation Lead',
]

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_340px] md:gap-16">
          {/* Text */}
          <div>
            <Reveal>
              <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-gray-100">
                Александр
                <br />
                Виноградов
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-5 h-7 text-lg font-medium text-[#1b2d4e] dark:text-[#8fa7cc]">
                <TypingEffect words={typingRoles} />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
                IT-директор и руководитель e-commerce с{' '}
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  11+ летним опытом
                </strong>
                . Строю IT-инфраструктуру, автоматизирую бизнес-процессы и масштабирую
                онлайн-продажи в fashion-ритейле.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-3 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
                Фокус:{' '}
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  CTO, IT Director, Head of E-commerce, Chief AI Officer
                </strong>{' '}
                — позиции, где технологии и AI напрямую двигают бизнес-результат.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/projects"
                  className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px hover:shadow-md dark:bg-gray-100 dark:text-gray-900"
                >
                  Смотреть проекты
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-px hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600"
                >
                  Обо мне
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Photo */}
          <Reveal delay={0.15} direction="right">
            <div>
              <button
                type="button"
                className="group relative cursor-pointer border-none bg-transparent p-0 outline-none"
                onClick={() => setIsVideoPlaying(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setIsVideoPlaying(true)
                }}
                aria-label="Воспроизвести анимированный аватар"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/static/images/avatar.png"
                    alt="Александр Виноградов"
                    width={680}
                    height={907}
                    className="h-full w-full object-cover object-center saturate-[0.85] transition-[filter] duration-500 group-hover:saturate-100"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#f5f2ed] to-transparent dark:from-[#111110]" />
                  {isVideoPlaying && (
                    <video
                      src="/static/images/avatar.mp4"
                      autoPlay
                      muted
                      playsInline
                      preload="none"
                      className="absolute inset-0 z-10 h-full w-full object-cover object-center"
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                  )}
                </div>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl border-l-4 border-[#1b2d4e] pl-7 dark:border-[#8fa7cc]">
          <WordReveal
            text="Цифровая трансформация — это не про технологии. Это про то, как бизнес думает, принимает решения и создает ценность для клиента."
            className="font-display text-2xl leading-snug font-normal text-gray-900 italic sm:text-3xl dark:text-gray-100"
          />
          <cite className="mt-4 block text-xs font-medium tracking-widest text-gray-400 uppercase not-italic dark:text-gray-500">
            Подход к управлению
          </cite>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section className="py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-gray-900 pb-3 dark:border-gray-100">
            <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Опыт
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Карьерный путь
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {experience.map((exp, i) => (
            <Reveal key={exp.period} delay={i * 0.1}>
              <div className="grid grid-cols-1 border-b border-gray-200 py-8 md:grid-cols-[240px_1fr] dark:border-gray-800">
                <div className="pr-8 text-sm font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
                  {exp.period}
                  <span className="mt-1 block text-xs normal-case opacity-70">{exp.duration}</span>
                </div>
                <div className="mt-2 border-gray-200 md:mt-0 md:border-l md:pl-8 dark:border-gray-800">
                  <h3 className="font-display text-xl text-gray-900 dark:text-gray-100">
                    {exp.role}
                  </h3>
                  <div className="mt-1 text-sm font-medium text-[#1b2d4e] dark:text-[#8fa7cc]">
                    {exp.company}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {exp.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-sm bg-[#e8dfd3] px-3 py-1 text-xs font-medium text-[#1b2d4e] dark:bg-[#2e2a24] dark:text-[#8fa7cc]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ COMPETENCIES (4-column lists) ═══ */}
      <section className="py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-gray-900 pb-3 dark:border-gray-100">
            <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Компетенции
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Области экспертизы
            </span>
          </div>
        </Reveal>

        <div className="border-t border-gray-200 pt-10 dark:border-gray-800">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {competencies.map((col, i) => (
              <StaggerItem
                key={col.title}
                className={`border-gray-200 px-5 py-8 sm:px-6 lg:px-8 dark:border-gray-800 ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${i < 2 ? 'border-b lg:border-b-0' : ''} ${
                  i < 3 ? 'lg:border-r' : 'lg:border-r-0'
                }`}
              >
                <h3 className="group/title font-display relative inline-block text-lg text-gray-900 dark:text-gray-100">
                  {col.title}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#1b2d4e] transition-all duration-300 group-hover/title:w-full dark:bg-[#8fa7cc]" />
                </h3>
                <ul className="mt-5 flex flex-col gap-0">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-start gap-2.5 py-2 transition-all duration-200 hover:pl-1"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 transition-colors duration-200 group-hover/item:bg-[#1b2d4e] dark:bg-gray-700 dark:group-hover/item:bg-[#8fa7cc]" />
                      <span className="text-sm leading-relaxed text-gray-600 transition-colors duration-200 group-hover/item:text-gray-900 dark:text-gray-400 dark:group-hover/item:text-gray-100">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-gray-900 pb-3 dark:border-gray-100">
            <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Проекты
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Избранные реализации
            </span>
          </div>
        </Reveal>

        {/* Featured projects */}
        {featuredProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="group relative mb-4 overflow-hidden border border-gray-200 bg-white/80 p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#1b2d4e] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10 dark:border-gray-800 dark:bg-[#1a1916] dark:hover:border-[#8fa7cc] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              {/* Left accent line */}
              <div className="absolute top-0 left-0 h-0 w-1 bg-[#1b2d4e] transition-all duration-500 ease-out group-hover:h-full dark:bg-[#8fa7cc]" />
              <span className="inline-block border border-[#1b2d4e] px-2.5 py-0.5 text-[11px] font-semibold tracking-widest text-[#1b2d4e] uppercase transition-colors duration-300 group-hover:border-[#1b2d4e]/40 dark:border-[#8fa7cc] dark:text-[#8fa7cc]">
                {p.badge}
              </span>
              <h3 className="font-display mt-4 text-2xl text-gray-900 sm:text-3xl dark:text-gray-100">
                {p.title}
              </h3>
              <div className="mt-1 text-xs font-semibold tracking-[.12em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
                {p.role}
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 font-light text-gray-500 dark:text-gray-400">
                {p.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-gray-300 px-3 py-1 text-[11px] font-medium tracking-wider text-gray-500 uppercase transition-all duration-300 group-hover:border-[#1b2d4e]/50 group-hover:text-[#1b2d4e] dark:border-gray-700 dark:text-gray-400 dark:group-hover:border-[#8fa7cc]/50 dark:group-hover:text-[#8fa7cc]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#1b2d4e] transition-[gap] duration-200 hover:gap-2.5 dark:text-[#8fa7cc]"
              >
                {p.linkText} <span>→</span>
              </a>
            </div>
          </Reveal>
        ))}

        {/* Grid projects */}
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
          {gridProjects.map((p) => (
            <StaggerItem key={p.num}>
              <div className="group relative flex h-full flex-col overflow-hidden border border-gray-200 bg-white/80 p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#1b2d4e] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10 dark:border-gray-800 dark:bg-[#1a1916] dark:hover:border-[#8fa7cc] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* Left accent line */}
                <div className="absolute top-0 left-0 h-0 w-1 bg-[#1b2d4e] transition-all duration-500 ease-out group-hover:h-full dark:bg-[#8fa7cc]" />
                <div className="font-display mb-6 text-5xl leading-none font-light text-gray-300 transition-colors duration-400 group-hover:text-[#1b2d4e] dark:text-gray-700 dark:group-hover:text-[#8fa7cc]">
                  {p.num}
                </div>
                <h3 className="font-display text-xl text-gray-900 sm:text-2xl dark:text-gray-100">
                  {p.title}
                </h3>
                <div className="mt-1.5 text-xs font-semibold tracking-[.12em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
                  {p.role}
                </div>
                <p className="mt-4 text-sm leading-relaxed font-light text-gray-500 dark:text-gray-400">
                  {p.desc}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-gray-300 px-3 py-1 text-[11px] font-medium tracking-wider text-gray-500 uppercase transition-all duration-300 group-hover:border-[#1b2d4e]/50 group-hover:text-[#1b2d4e] dark:border-gray-700 dark:text-gray-400 dark:group-hover:border-[#8fa7cc]/50 dark:group-hover:text-[#8fa7cc]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
            >
              Все проекты →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ═══ SPEAKING ═══ */}
      <section className="py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-gray-900 pb-3 dark:border-gray-100">
            <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Выступления
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Спикер
            </span>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.1}>
          {speakingTopics.map((topic) => (
            <StaggerItem key={topic.num}>
              <motion.div
                whileHover={
                  prefersReducedMotion ? {} : { y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="h-full rounded border border-gray-200 bg-white/80 p-7 dark:border-gray-800 dark:bg-[#1a1916]"
              >
                <div className="font-display text-2xl text-[#1b2d4e] opacity-40 dark:text-[#8fa7cc]">
                  {topic.num}
                </div>
                <h3 className="font-display mt-3 text-lg leading-snug text-gray-900 dark:text-gray-100">
                  {topic.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {topic.desc}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-gray-400 dark:text-gray-500">
            Пишите, если хотите пригласить как спикера
          </p>
        </Reveal>
      </section>
    </>
  )
}
