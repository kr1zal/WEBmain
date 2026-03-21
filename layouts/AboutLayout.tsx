'use client'

import { useState, useEffect, useRef } from 'react'
import Image from '@/components/Image'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Motion'

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const chapters = [
  { id: 'ch1', label: 'Глава I', title: 'Компьютерный клуб', toc: 'Компьютерный клуб' },
  { id: 'ch2', label: 'Глава II', title: 'Рост и масштаб', toc: 'Рост и масштаб' },
  { id: 'ch3', label: 'Глава III', title: 'Школа управления', toc: 'Школа управления' },
  { id: 'ch4', label: 'Глава IV', title: 'Imperial', toc: 'Imperial' },
  { id: 'ch5', label: 'Глава V', title: 'Другие проекты', toc: 'Другие проекты' },
  { id: 'ch6', label: 'Глава VI', title: 'Собственные продукты', toc: 'Собственные продукты' },
  { id: 'ch7', label: '', title: 'Как я думаю', toc: 'Как я думаю' },
]

const principles = [
  {
    title: 'Пустое место — точка входа',
    desc: 'Нет процессов — создам. Нет людей — найду и обучу. Нет инфраструктуры — подниму руками. Хаос — не проблема, а стартовая позиция.',
  },
  {
    title: 'Результат в деньгах',
    desc: 'Не «внедрили CRM», а «конверсия +40%». Каждое решение проходит фильтр: сколько принесёт или сэкономит.',
  },
  {
    title: 'Прозрачность и прямой диалог',
    desc: 'Прозрачные KPI, открытые обсуждения, решение разногласий через конструктивный разговор. Недоговорённость копит проблемы — прямой диалог их решает.',
  },
  {
    title: 'Люди важнее систем',
    desc: 'Около 18 специалистов выросли в руководителей под моим управлением. Текучесть 3%. Лучшее, что я создал — команды, которые работают без меня.',
  },
  {
    title: 'Технология по ROI',
    desc: 'Если задача решается звонком — звоню. Если автоматизацией — автоматизирую. Инструмент под задачу, не наоборот.',
  },
]

const facts = [
  { val: 'x87', label: 'Рост выручки' },
  { val: '60', label: 'Команда' },
  { val: '8', label: 'Департаментов' },
  { val: '70%', label: 'Автоматизация' },
]

/* ═══════════════════════════════════════════
   Desktop TOC — active chapter tracking
   ═══════════════════════════════════════════ */

function useActiveChapter(): string {
  const [activeId, setActiveId] = useState('ch1')
  const intersectingRef = useRef<Map<string, IntersectionObserverEntry>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id) {
            intersectingRef.current.set(entry.target.id, entry)
          }
        }

        let bestId: string | null = null
        let bestTop = Infinity

        for (const [id, entry] of intersectingRef.current) {
          if (entry.isIntersecting && entry.boundingClientRect.top < bestTop) {
            bestTop = entry.boundingClientRect.top
            bestId = id
          }
        }

        if (bestId) {
          setActiveId(bestId)
        }
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: 0,
      }
    )

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeId
}

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

function ChapterHeading({
  id,
  label,
  title,
  first = false,
}: {
  id: string
  label: string
  title: string
  first?: boolean
}) {
  return (
    <Reveal>
      <div
        id={id}
        className={`scroll-mt-28 ${first ? '' : 'mt-14 border-t border-[#e0dcd6] pt-8 sm:mt-12 sm:pt-6 dark:border-gray-700/50'}`}
      >
        {label && (
          <div className="text-[11px] font-semibold tracking-[0.14em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
            {label}
          </div>
        )}
        <h2 className="font-display mt-1 text-[22px] font-semibold tracking-tight text-[#1a1a1a] sm:text-2xl dark:text-gray-100">
          {title}
        </h2>
      </div>
    </Reveal>
  )
}

function PullQuote({ children }: { children: string }) {
  return (
    <Reveal>
      <blockquote className="my-8 border-l-[3px] border-[#1b2d4e] py-1 pl-5 dark:border-[#8fa7cc]">
        <p className="text-[17px] leading-relaxed font-normal text-[#1a1a1a] sm:text-lg dark:text-gray-200">
          {children}
        </p>
      </blockquote>
    </Reveal>
  )
}

function FactStrip() {
  return (
    <Reveal>
      <div className="-mx-5 my-8 grid grid-cols-2 gap-px bg-[#e0dcd6] sm:mx-0 sm:grid-cols-4 dark:bg-gray-700/50">
        {facts.map((f) => (
          <div key={f.label} className="bg-[#f5f2ed] py-5 text-center sm:p-4 dark:bg-[#111110]">
            <div className="text-[22px] font-semibold text-[#1b2d4e] sm:text-[22px] dark:text-[#8fa7cc]">
              {f.val}
            </div>
            <div className="mt-0.5 text-[10px] tracking-[0.08em] text-[#999] uppercase dark:text-gray-500">
              {f.label}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[17px] leading-[1.85] text-[#444] sm:mb-[18px] sm:text-base dark:text-gray-400">
      {children}
    </p>
  )
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[#1a1a1a] dark:text-gray-200">{children}</strong>
}

function Hn({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-[#1b2d4e] dark:text-[#8fa7cc]">{children}</span>
}

/* ═══════════════════════════════════════════
   Story content (shared between mobile & desktop)
   ═══════════════════════════════════════════ */

function StoryContent() {
  return (
    <>
      {/* Ch 1 */}
      <ChapterHeading id="ch1" label="Глава I" title="Компьютерный клуб" first />
      <div className="mt-5">
        <P>
          Орёл — город на 300 тысяч. Первые деньги я заработал в шестнадцать, администратором
          компьютерного клуба. Зарплата — символическая. Зато были принтер и выход в интернет.
        </P>
        <P>
          Посетители клуба заказывали курсовые и рефераты. Я собрал базу контактов — сначала email,
          потом телефоны — и запустил рассылки с напоминаниями о сезоне сдачи. Терминов «CRM» и
          «retention-маркетинг» я тогда не знал. Знал одно: если клиенту напомнить вовремя, он
          вернётся.
        </P>
        <P>
          Рынок Орла ограничен — 300 тысяч человек, замкнутая экономика. Интернет снимал это
          ограничение полностью. <Strong>Все первые деньги я заработал в сети.</Strong> Финансовая
          самостоятельность — со школы.
        </P>
      </div>

      {/* Ch 2 */}
      <ChapterHeading id="ch2" label="Глава II" title="Рост и масштаб" />
      <div className="mt-5">
        <P>
          Курсовые переросли в тексты и переводы. Тексты — в продвижение бизнесов в соцсетях.
          Facebook, ВКонтакте, рекламные кампании, работа с трафиком. Клиенты росли по сарафанке: от
          знакомых — к компаниям, от компаний — к агрохолдингам и IT-платформам. За 13 лет — более
          50 проектов в FMCG, e-commerce, gaming, crypto, агросекторе. Бюджеты до 120 млн рублей,
          средний ROI выше 300%.
        </P>
        <P>
          Параллельно — арбитраж трафика на всех гео мира. Google, Facebook, Instagram, WeChat.
          Низкочастотная семантика, клоакинг, CPA и revshare. Работа с серыми вертикалями дала
          понимание трафика, которого не получить ни в университете, ни в корпоративном
          digital-отделе.
        </P>
        <P>
          На пике я вёл <Hn>13 проектов</Hn> одновременно. Создал команду, зарегистрировал компанию
          — и увидел потолок: на таком объёме невозможно удерживать качество. Продал долю, оставил
          один-два проекта и сфокусировался.
        </P>
        <PullQuote>
          Один-два крупных проекта лучше тринадцати мелких. Время в сутках ограничено. Деньги — нет.
        </PullQuote>
      </div>

      {/* Ch 3 */}
      <ChapterHeading id="ch3" label="Глава III" title="Школа управления" />
      <div className="mt-5">
        <P>
          Точка пересмотра. Заработок «руками» масштабируется до определённого предела — дальше
          нужна система. Я осознанно перешёл в корпоративную среду: стратегическое планирование,
          P&L, оргструктуры, проектное управление. То, что казалось бюрократией, оказалось механикой
          масштабирования.
        </P>
        <P>
          Агентство Semenov: шесть человек, награды, ROI до <Hn>2082%</Hn> на проектах Cosmoscow,
          HotWiFi, ТЦ «Конструктор». Я видел экономику агентского бизнеса изнутри — потенциала для
          масштабирования не было. Ушёл по офферу x3.
        </P>
        <P>
          Дальше — несколько лет в крупном бизнесе. Разные компании, разные масштабы: построение
          маркетинговых отделов, управление digital-направлениями, работа с бюджетами и командами.
          Каждый проект прибавлял уровень — как устроены решения на уровне P&L, как выстраивать
          процессы, которые работают без ежедневного вмешательства. С этим фундаментом я пришёл в
          Imperial.
        </P>
      </div>

      {/* Ch 4 */}
      <ChapterHeading id="ch4" label="Глава IV" title="Imperial" />
      <div className="mt-5">
        <P>
          «Империал» — фабрика мебели: собственное производство, логистика, складская
          инфраструктура, розничная сеть, несколько брендов. E-commerce на момент моего прихода —
          ноль.
        </P>
        <P>
          Фаундер Валентин Шабанов — из тех, кто закладывает идею и даёт свободу реализовать. После
          одного разговора мы договорились. Я открыл обособленную бизнес-единицу внутри компании:
          свой найм, своя бухгалтерия, полная P&L-ответственность.
        </P>
        <P>
          Первая команда — 8 человек: SMM, таргетологи, контекстологи. Построил полный digital-стек:
          Яндекс.Директ, Google Ads, медийные кампании, контентные воронки, инфлюенсеры, сквозная
          аналитика от первого касания до сделки. Потом началось СВО — ритейл резко сместился в
          онлайн.
        </P>
        <P>
          В этот момент я создал и развил call center как полноценную структуру: обособленные отделы
          продаж, сервисного обслуживания, обработки чатов, входящей линии. Каждое направление —
          свои процессы, KPI и руководитель. Это позволило системно обрабатывать весь входящий поток
          на постоянной основе.
        </P>

        <FactStrip />

        <P>
          Наращивание шло по принципу:{' '}
          <Strong>кем управляю — за того отвечаю, того мотивирую.</Strong> Логистика, дизайн,
          категорийный менеджмент. 8 департаментов, 60 человек, 5 маркетплейсов — Wildberries, Ozon,
          СберМегаМаркет, Яндекс.Маркет, KazanExpress — одни из первых в нише крупногабарита.
          Выручка выросла с 300 тысяч до 26 миллионов рублей в месяц: <Hn>x87</Hn>.
        </P>
        <P>
          Когда объёмы стабилизировались, начал автоматизировать. Быстро менять процессы на уровне
          всей компании — долго, начал со своей бизнес-единицы. Digital-аналитика, бюджеты, SMM,
          call center — всё, что можно было передать AI, я передал.{' '}
          <Hn>70% операционных процессов автоматизировано.</Hn> Людей не увольнял — переводил в
          смежные подразделения. Команда не сопротивлялась: в ней оставались только те, кто готов
          меняться.
        </P>
        <P>
          Отдельная тема — люди. Я искал специалистов с потенциалом и внутренней мотивацией. Обучал
          лично — владею каждым навыком, который требую от команды. Доход рос вместе с
          ответственностью: прозрачная мотивация, прямой диалог, разногласия решаются в открытую. За
          всю карьеру, во всех проектах, <Hn>около 18 специалистов</Hn> выросли в руководителей
          направлений. Сегодня они управляют отделами в крупных компаниях. Текучесть в Imperial —{' '}
          <Hn>3%</Hn>.
        </P>
      </div>

      {/* Ch 5 */}
      <ChapterHeading id="ch5" label="Глава V" title="Другие проекты" />
      <div className="mt-5">
        <P>
          Imperial не был единственным. Параллельно — e-commerce для частной клиники. Полностью
          офлайновая, ни одного digital-инструмента. Я увидел, что без цифровой инфраструктуры она
          не выживет. Построил всё с нуля: создал call center, внедрил AmoCRM, интегрировал
          UIS-телефонию, запустил маркетинг и сайт. 5 департаментов, 15 человек. LTV пациента вырос
          в <Hn>9 раз</Hn>. Когда следующим логическим шагом стало конкурировать с CEO — передал
          управление и сфокусировался на Imperial.
        </P>
        <P>
          Политические кампании: <Hn>5 из 5 побед</Hn>. Муниципальный, региональный, федеральный
          уровень. Полный digital-стек: SEO, YouTube, Instagram, Дзен, TikTok, таргетированная и
          контекстная реклама, медийные кампании, наружная реклама, инфлюенсеры, публикации в СМИ.
          Воронка подводит к дебатам, охват — 45%+ целевой аудитории. Детали под NDA.
        </P>
      </div>

      {/* Ch 6 */}
      <ChapterHeading id="ch6" label="Глава VI" title="Собственные продукты" />
      <div className="mt-5">
        <P>
          Сегодня я строю своё. <Strong>RevioMP</Strong> — SaaS-аналитика для маркетплейсов. У
          каждой площадки свой API, свои сущности, свои циклы синхронизации — я объединяю их в
          единую систему. Начал как инструмент для жены, увидел рыночный потенциал, собрал за месяц.{' '}
          <Strong>BIXIRUN</Strong> — фитнес-приложение с собственным брендом БАДов, уже в App Store.
        </P>
        <P>
          Я не программист в классическом смысле. Я — архитектор: PRD, проектная документация,
          дизайн системы, безопасность. Код делегирую AI. Начал кодить с появлением GPT — учился
          через ошибки, разбирал каждую строчку, которую генерировала нейросеть. Освоил стек: React,
          Next.js, Python, FastAPI, Docker. Сегодня поднимаю продакшн-SaaS за месяц в одного.
        </P>
        <P>Это не хобби. Это фундамент собственного бизнеса.</P>
      </div>

      {/* ── Approach ── */}
      <div
        id="ch7"
        className="mt-14 scroll-mt-28 border-t-2 border-[#e0dcd6] pt-8 sm:mt-12 dark:border-gray-700/50"
      >
        <Reveal>
          <h2 className="font-display mb-7 text-[22px] font-semibold tracking-tight text-[#1a1a1a] sm:text-2xl dark:text-gray-100">
            Как я думаю
          </h2>
        </Reveal>

        <StaggerContainer>
          {principles.map((p, i) => (
            <StaggerItem key={p.title}>
              <div
                className={`grid grid-cols-[44px_1fr] py-[18px] sm:grid-cols-[48px_1fr] ${
                  i < principles.length - 1
                    ? 'border-b border-[#eae7e2] dark:border-gray-700/30'
                    : ''
                }`}
              >
                <div className="text-[24px] font-light text-[#d0ccc6] sm:text-[26px] dark:text-gray-700">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1a1a1a] sm:text-base dark:text-gray-200">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.7] text-[#777] sm:text-sm dark:text-gray-500">
                    {p.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════
   Back to top (mobile)
   ═══════════════════════════════════════════ */

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-5 bottom-6 z-40 flex h-10 w-10 items-center justify-center border border-[#e0dcd6] bg-[#f5f2ed]/90 backdrop-blur-sm transition-opacity hover:border-[#1b2d4e] lg:hidden dark:border-gray-700 dark:bg-[#111110]/90 dark:hover:border-[#8fa7cc]"
      aria-label="Наверх"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[#1b2d4e] dark:text-[#8fa7cc]"
      >
        <path d="M8 14V2M8 2L3 7M8 2l5 5" />
      </svg>
    </button>
  )
}

/* ═══════════════════════════════════════════
   Main layout
   ═══════════════════════════════════════════ */

export default function AboutLayout() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const activeId = useActiveChapter()

  const avatarButton = (width: number, height: number, className: string) => (
    <button
      type="button"
      className={`group relative flex shrink-0 cursor-pointer flex-col items-center border-none bg-transparent p-0 outline-none lg:items-start ${className}`}
      onClick={() => setIsVideoPlaying(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsVideoPlaying(true)
        }
      }}
      aria-label="Воспроизвести анимированный аватар"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#1b2d4e]/10">
        <Image
          src="/static/images/avatar.png"
          alt="Александр Виноградов"
          width={width}
          height={height}
          className="h-full w-full object-cover"
        />
        {isVideoPlaying && (
          <video
            src="/static/images/avatar.mp4"
            autoPlay
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            onEnded={() => setIsVideoPlaying(false)}
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f5f2ed] to-transparent dark:from-[#111110]" />
      </div>
    </button>
  )

  return (
    <>
      <BackToTop />
      <section className="pt-24 pb-16 sm:pt-28">
        {/* Page header */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b-[3px] border-[#1b2d4e] pb-3 dark:border-[#8fa7cc]">
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#1b2d4e] sm:text-4xl md:text-5xl dark:text-gray-100">
              Обо мне
            </h1>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
              История
            </span>
          </div>
        </Reveal>

        {/* Mobile hero — photo centered, only on mobile */}
        <div className="mt-10 lg:hidden">
          <Reveal>
            <div className="mb-10 flex flex-col items-center">
              <div className="w-[180px] sm:w-[220px]">{avatarButton(220, 293, '')}</div>
              <div className="mt-4 text-center">
                <div className="text-xl font-semibold text-[#1a1a1a] dark:text-gray-100">
                  Александр Виноградов
                </div>
                <div className="mt-1 text-[11px] font-semibold tracking-[0.1em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
                  Head of E-commerce · IT Director · CAIO
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Main layout: sidebar (desktop only) + article (always) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Sidebar — hidden on mobile */}
          <Reveal direction="left">
            <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
              <div className="max-w-[260px]">{avatarButton(260, 347, '')}</div>

              <div className="mt-3.5 text-lg font-semibold text-[#1a1a1a] dark:text-gray-100">
                Александр Виноградов
              </div>
              <div className="mt-0.5 text-[11px] leading-relaxed font-semibold tracking-[0.1em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
                Head of E-commerce
                <br />
                IT Director · CAIO
              </div>

              {/* TOC */}
              <nav className="mt-6 border-t border-[#e0dcd6] pt-4 dark:border-gray-700/50">
                <div className="mb-2.5 text-[11px] font-semibold tracking-[0.12em] text-[#999] uppercase dark:text-gray-500">
                  Содержание
                </div>
                {chapters.map((ch) => (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(ch.id)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        history.pushState(null, '', '#' + ch.id)
                      }
                    }}
                    className={`block py-1 text-[13px] no-underline transition-colors ${
                      activeId === ch.id
                        ? 'font-semibold text-[#1b2d4e] dark:text-[#8fa7cc]'
                        : 'text-[#666] hover:text-[#1b2d4e] dark:text-gray-500 dark:hover:text-[#8fa7cc]'
                    }`}
                  >
                    {ch.toc}
                  </a>
                ))}
              </nav>
            </aside>
          </Reveal>

          {/* Article — rendered ONCE, no duplicate IDs */}
          <article className="px-1 lg:px-0">
            <StoryContent />
          </article>
        </div>
      </section>
    </>
  )
}
