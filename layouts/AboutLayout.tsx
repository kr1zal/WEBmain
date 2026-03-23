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
  { id: 'ch4', label: 'Глава IV', title: 'Точка сборки', toc: 'Точка сборки' },
  { id: 'ch5', label: 'Глава V', title: 'Команда', toc: 'Команда' },
  { id: 'ch6', label: 'Глава VI', title: 'Параллельно', toc: 'Параллельно' },
  { id: 'ch7', label: 'Глава VII', title: 'Собственные продукты', toc: 'Собственные продукты' },
  { id: 'ch8', label: '', title: 'Как я думаю', toc: 'Как я думаю' },
]

const principles = [
  {
    title: 'Пустое место — точка входа',
    desc: 'Там, где нет процессов — строю. Где есть — довожу до результата. Неважно, с какой точки старт — важен результат, который можно измерить.',
  },
  {
    title: 'Результат в деньгах',
    desc: 'Не «внедрили CRM», а «конверсия +40%». Каждое решение проходит фильтр: сколько принесёт или сэкономит.',
  },
  {
    title: 'Прозрачность и прямой диалог',
    desc: 'Управляемый конфликт по Патрику Ленсиони («Пять пороков команды»). Недоговорённость копит проблемы — открытый спор их решает. Команда, которая не спорит, не думает.',
  },
  {
    title: 'Сильная команда — актив бизнеса',
    desc: 'Более 15 руководителей выросли под моим управлением. Я строю команды под задачу бизнеса.',
  },
  {
    title: 'Инструмент под задачу',
    desc: 'Если задача решается звонком — звоню. Если автоматизацией — автоматизирую.',
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
          ограничение полностью — и стал основным инструментом заработка с первых лет.
        </P>
      </div>

      {/* Ch 2 */}
      <ChapterHeading id="ch2" label="Глава II" title="Рост и масштаб" />
      <div className="mt-5">
        <P>
          Курсовые переросли в тексты и переводы. Тексты — в продвижение бизнесов в соцсетях.
          Facebook, ВКонтакте, рекламные кампании, работа с трафиком. Клиенты росли по сарафанке: от
          знакомых — к компаниям, от компаний — к агрохолдингам и IT-платформам. Проекты в FMCG,
          e-commerce, gaming, crypto, fashion, медицине, мебельной индустрии, агросекторе. Годовые
          рекламные бюджеты до 120 млн рублей.
        </P>
        <P>
          Параллельно — performance-маркетинг на международных рынках. Google, Facebook, Instagram.
          CPA-модели, сложные воронки, разные гео — я научился считать трафик как продукт: стоимость
          привлечения, конверсия на каждом этапе, возврат на вложенный рубль.
        </P>
        <P>
          На пике я вёл <Hn>13 проектов</Hn> одновременно. Был стратегом, исполнителем, аналитиком и
          аккаунт-менеджером в одном лице. Создал компанию, набрал команду — но модель не
          масштабировалась: без разделения ролей и выстроенных процессов качество падало
          пропорционально росту. Продал долю, оставил пару проектов. Главный вывод: не количество
          клиентов определяет рост, а система, которая за ними стоит.
        </P>
      </div>

      {/* Ch 3 */}
      <ChapterHeading id="ch3" label="Глава III" title="Школа управления" />
      <div className="mt-5">
        <P>
          Я упёрся в потолок. Заработок «руками» масштабируется до определённого предела — дальше
          нужна система. Я начал системно изучать управление: прошёл курсы по менеджменту,
          корпоративному управлению, финансовому анализу. За пару лет прочитал всю доступную
          литературу по управлению командами и бизнес-процессами — от Друкера и Адизеса до
          операционного менеджмента. То, что раньше казалось бюрократией, оказалось механикой
          масштабирования.
        </P>
        <P>
          Параллельно — осознанный переход в корпоративную среду. Первый опыт — агентство
          performance-маркетинга. Компактная команда, высокая концентрация экспертизы. Но изнутри
          агентство оказалось похоже на мою собственную компанию — те же процессы, тот же потолок. Я
          понял, что мне нужен другой масштаб.
        </P>
        <P>
          Крупный бизнес — другая скорость и другая ответственность. Строил маркетинговые отделы с
          нуля, управлял digital-направлениями, работал с бюджетами в десятки миллионов и командами
          от 15 человек. Здесь я впервые управлял не проектами, а направлениями. Именно здесь я
          научился тому, чему не учат ни курсы, ни книги: как принимаются решения, когда на кону P&L
          всей компании, и как выстраивать процессы, которые переживают смену руководителя.
        </P>
        <P>
          За несколько лет прошёл через e-commerce в разных индустриях — бытовые приборы, освещение,
          мебель. Каталоги на тысячи SKU, федеральная логистика, онлайн + ритейл. Каждый проект
          добавлял масштаб и глубину. Накопленную экспертизу я в полной мере применял в последующих
          проектах.
        </P>
      </div>

      {/* Ch 4 */}
      <ChapterHeading id="ch4" label="Глава IV" title="Точка сборки" />
      <div className="mt-5">
        <P>
          Одна из таких компаний — фабрика мебели: собственное производство, логистика, складская
          инфраструктура, розничная сеть, несколько брендов. E-commerce на момент моего прихода —
          ноль.
        </P>
        <P>
          Основатель компании дал полную свободу действий — и полную ответственность за результат. Я
          открыл обособленную бизнес-единицу внутри компании: свой найм, своя бухгалтерия, полная
          P&L-ответственность.
        </P>
        <P>
          Сначала сам — кабинеты, трафик, первые результаты. Потом под задачи начал нанимать: SMM,
          таргетологи, контекстологи. Постепенно команда выросла до 8 человек. Построил полный
          digital-стек: Яндекс.Директ, Google Ads, медийные кампании, контентные воронки,
          инфлюенсеры, сквозная аналитика от первого касания до сделки.
        </P>
        <P>
          Когда рынок начал массово уходить в онлайн — у нас уже была работающая digital-система.
          Вопрос был не «как начать», а «как обработать поток». Call center прошёл путь от первого
          оператора до полноценной структуры: продажи, сервис, чаты, входящая линия — каждое
          направление со своими процессами, KPI и руководителем.
        </P>
        <P>
          Чтобы управлять результатом — нужно управлять всей цепочкой. Логистика, дизайн,
          категорийный менеджмент перешли под моё управление. 8 департаментов, 60 человек, 4
          маркетплейса — Wildberries, Ozon, СберМегаМаркет, Яндекс.Маркет — одни из первых в нише
          крупногабарита. Выручка выросла в десятки раз.
        </P>
        <P>
          Параллельно с ростом выстраивал автоматизацию: интеграции 1С, CRM, аналитика,
          бюджетирование, операционные процессы. <Hn>70% операций автоматизировано.</Hn>
        </P>
      </div>

      {/* Ch 5 */}
      <ChapterHeading id="ch5" label="Глава V" title="Команда" />
      <div className="mt-5">
        <P>
          Я всегда искал людей с потенциалом и внутренней мотивацией — тех, кому тесно на текущей
          позиции. Брал в команду, обучал, давал ответственность. Доход рос вместе с результатами.
        </P>
        <P>
          В проектах, где я руководил командами, средняя текучесть составляла <Hn>3%</Hn>. Но дело
          не только в удержании. За всю карьеру, во всех проектах, <Hn>более 15 специалистов</Hn>{' '}
          выросли в руководителей направлений. Сегодня среди них — CEO, коммерческие директора,
          основатели собственных компаний.
        </P>
        <P>
          Сильная команда — не та, которая держится на одном человеке. А та, которая работает без
          него.
        </P>
      </div>

      {/* Ch 6 */}
      <ChapterHeading id="ch6" label="Глава VI" title="Параллельно" />
      <div className="mt-5">
        <P>
          <Strong>Медицина.</Strong> Частная клиника, полностью офлайновая — запись в тетрадку, ни
          одного digital-инструмента. Меня порекомендовали, я пришёл и увидел: без цифровой
          инфраструктуры у клиники нет будущего.
        </P>
        <P>
          Выстроил всё последовательно: call center, AmoCRM, UIS-телефония, P&L-отчётность,
          маркетинг — соцсети, Яндекс, Google, отзовики, медицинские площадки, инфлюенсеры. Запустил
          сайт, открыл дополнительные офисы. 5 департаментов, 15 человек. LTV пациента вырос в{' '}
          <Hn>9 раз</Hn>, конверсия — выше <Hn>40%</Hn>, NPS — <Hn>4.6</Hn>. Когда проект вышел на
          операционную стабильность — передал управление и вернулся к основному фокусу.
        </P>
        <P>
          <Strong>Политика.</Strong> Пять кампаний — <Hn>5 из 5 побед</Hn>. Муниципальный,
          региональный, федеральный уровень. Каждая кампания — это полный digital-стек с нуля: SEO,
          YouTube, Instagram, Дзен, TikTok, таргетированная и контекстная реклама, медийные
          кампании, наружная реклама, инфлюенсеры, публикации в СМИ. В последней кампании запустил
          контент-завод на AI — около 2 млн просмотров в месяц. Воронка подводит к дебатам, охват —
          45%+ целевой аудитории. Детали под NDA.
        </P>
      </div>

      {/* Ch 7 */}
      <ChapterHeading id="ch7" label="Глава VII" title="Собственные продукты" />
      <div className="mt-5">
        <P>
          <Strong>RevioMP</Strong> — единая аналитика для маркетплейсов. Пять площадок, пять API,
          пять форматов данных — одна система. Начал как инструмент аналитики продаж собственного
          бренда БАДов, увидел что рынку это нужно не меньше, собрал MVP за месяц.
        </P>
        <P>
          <Strong>BIXIRUN</Strong> — фитнес-приложение с собственным брендом БАДов. Полный цикл:
          продукт, дизайн, разработка, маркетинг, поставщики. В App Store.
        </P>
        <P>
          Оба проекта запустил и развиваю один. Архитектура, дизайн системы, PRD, разработка,
          деплой. Стек: React, Next.js, Python, FastAPI, Docker. В написании кода использую Claude
          Code и Cursor — это позволяет запускать продакшн-продукт за месяц. Контроль качества и
          безопасность — вручную и AI-агентами.
        </P>
        <P>
          Каждый собственный продукт — это полигон. То, что проверено на своих деньгах, я применяю в
          бизнесе.
        </P>
      </div>

      {/* ── Approach ── */}
      <div
        id="ch8"
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
          width={896}
          height={1152}
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
