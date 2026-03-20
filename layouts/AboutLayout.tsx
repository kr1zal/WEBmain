'use client'

import { useState, useEffect, useRef } from 'react'
import Image from '@/components/Image'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Motion'

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const chapters = [
  { id: 'ch1', label: 'Глава I', title: 'Компьютерный клуб', toc: 'Компьютерный клуб' },
  { id: 'ch2', label: 'Глава II', title: 'Рост и выгорание', toc: 'Рост и выгорание' },
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
    title: 'Честность вместо политики',
    desc: 'Прозрачные KPI, прямые разговоры. Недоговорённость копит проблемы. Открытый спор — решает.',
  },
  {
    title: 'Люди важнее систем',
    desc: '8 человек выросли в руководителей. Текучесть 3%. Лучшее, что я создал — команда, которая работает без меня.',
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
          Мне было шестнадцать, когда я устроился администратором в компьютерный клуб в Орле —
          небольшом городе на 300 тысяч человек. Платили копейки, но был принтер и интернет.
        </P>
        <P>
          Посетители просили помочь с курсовыми и рефератами. Я начал делать это за деньги. Собирал
          email-адреса, позже номера телефонов, рассылал напоминания. Не знал, что это называется
          «работа с базой клиентов». Просто делал то, что работало.
        </P>
        <P>
          <Strong>Все первые деньги я заработал в интернете.</Strong> Орёл — город, где сложно выйти
          на большие деньги: рынок маленький. Но интернет — рынок без границ. Это понимание
          определило всё, что было дальше.
        </P>
      </div>

      {/* Ch 2 */}
      <ChapterHeading id="ch2" label="Глава II" title="Рост и выгорание" />
      <div className="mt-5">
        <P>
          Курсовые стали текстами и переводами статей. Тексты — рекламой в соцсетях. Появились
          Facebook, ВКонтакте — я создавал страницы знакомым, настраивал рекламные кампании,
          продвигал бизнесы. Сарафанка разлеталась быстро: приходили компании, потом крупные —
          агрохолдинги, IT-гиганты.
        </P>
        <P>
          Параллельно — арбитраж трафика на все гео мира. Google, Facebook, Instagram, WeChat.
          Откупал поисковый трафик по низу рынка, перенаправлял на офферы. Разные тематики, разные
          модели монетизации. Это дало мне такое понимание трафика, которое невозможно получить в
          учебниках.
        </P>
        <P>
          В пике я вёл <Hn>13 проектов</Hn> одновременно. С каждым заказчиком — стратегия,
          реализация, тестирование, отчётность. Всё в одного. Я создал команду, открыл компанию — и
          выгорел. Продал свою долю. Оставил один проект, чтобы прокормиться.
        </P>
        <PullQuote>
          Один крупный проект лучше тринадцати мелких. Время в сутках ограничено. Деньги — нет.
        </PullQuote>
      </div>

      {/* Ch 3 */}
      <ChapterHeading id="ch3" label="Глава III" title="Школа управления" />
      <div className="mt-5">
        <P>
          Выгорание стало триггером. Я понял: зарабатывать «руками» — потолок. Осознанно ушёл в
          найм. Не ради зарплаты — ради школы: проектное управление, Jira, Scrum, бюджетирование,
          P&L. Вещи, которые казались бюрократией, оказались инструментами масштабирования.
        </P>
        <P>
          В агентстве Semenov — крутая команда из 6 человек, награды, ROI до <Hn>2082%</Hn>.
          Cosmoscow, HotWiFi, ТЦ «Конструктор». Но я видел экономику агентства изнутри:
          масштабирования — ноль. Меня схантили с офером x3 — и я ушёл строить маркетинг в крупной
          компании.
        </P>
        <P>
          Найм дал то, чего не мог дать фриланс: понимание структуры, планирования, дедлайнов. Как
          управлять не задачами, а людьми. Как ставить процессы, а не тушить пожары. С этим я пришёл
          в Imperial.
        </P>
      </div>

      {/* Ch 4 */}
      <ChapterHeading id="ch4" label="Глава IV" title="Imperial" />
      <div className="mt-5">
        <P>
          Фаундер Валентин Шабанов — из тех лидеров, которые могут заложить в тебя идею и дать
          свободу реализовать. После одного разговора мы ударили по рукам.
        </P>
        <P>
          «Империал» — фабрика мебели: своя логистика, склады, розничная сеть, несколько брендов.
          E-commerce — ноль. Мне сказали: «Делай». Я открыл свою компанию как обособленную
          бизнес-единицу внутри структуры. Свой найм, своя бухгалтерия, полная P&L ответственность.
        </P>
        <P>
          Первая команда: 8 человек — SMM, таргетолог, контекстолог. Запустили квизы, лидформы,
          медийную рекламу. Потом началось СВО, и ритейл резко сместился в онлайн. Нужно было
          мгновенно масштабировать обработку входящего потока. Я взял на себя call center,
          реструктуризировал его в экосистему: холодные звонки, входящие, текстовые обращения,
          клиентский сервис. Весь трафик обработали. Ничего не потеряли.
        </P>

        <FactStrip />

        <P>
          Дальше — наращивание. Забирал смежные функции по принципу:{' '}
          <Strong>кем управляю — за того отвечаю, того мотивирую.</Strong> Логистика, дизайн,
          категорийный менеджмент. 8 департаментов, 60 человек, 5 маркетплейсов — одни из первых в
          нише крупногабарита. С 300 тысяч до 26 миллионов рублей в месяц.
        </P>
        <P>
          Когда объёмы стабилизировались, я начал автоматизировать. На уровне всего холдинга —
          долго, начал со своей компании. Digital-аналитика, бюджеты, SMM, call center — всё, что
          можно было отдать AI, я отдал. Людей не увольнял — переводил в другие подразделения.
          Команда не сопротивлялась, потому что работали только те, кто готов меняться.
        </P>
        <P>
          Отдельная история — команда. Я набирал энергичных людей без опыта на низкую зарплату и
          обучал с нуля лично. По мере роста ответственности — рос и доход. Прозрачная мотивация,
          честные разговоры, конструктивный конфликт вместо натянутых улыбок.{' '}
          <Hn>8 специалистов</Hn> выросли до руководителей направлений. Сегодня они управляют
          отделами в крупных компаниях. Текучесть — <Hn>3%</Hn>.
        </P>
      </div>

      {/* Ch 5 */}
      <ChapterHeading id="ch5" label="Глава V" title="Другие проекты" />
      <div className="mt-5">
        <P>
          Imperial не был единственным. Параллельно — e-commerce для частной клиники. Полностью
          офлайновая, без единого digital-инструмента. Пришёл, увидел, что без digital она не
          выживет. Построил всё руками: call center, AmoCRM, UIS-телефония, маркетинг, сайт. LTV
          пациента вырос в <Hn>9 раз</Hn>. Когда следующим шагом стало конкурировать с CEO — передал
          управление.
        </P>
        <P>
          Политические кампании: <Hn>5 из 5 побед</Hn>. От муниципального до федерального уровня,
          включая Госдуму. Полный digital-штаб: стратегия, таргет, медийка, OOH, контент,
          инфлюенсеры, СМИ. Воронка подводится к дебатам, максимальный охват целевой аудитории.
          Детали под NDA.
        </P>
      </div>

      {/* Ch 6 */}
      <ChapterHeading id="ch6" label="Глава VI" title="Собственные продукты" />
      <div className="mt-5">
        <P>
          Сегодня я строю своё. <Strong>RevioMP</Strong> — SaaS-аналитика для маркетплейсов. У
          каждого маркетплейса свой API, свои сущности, свои циклы синхронизации — я объединяю их в
          единую систему. Начал для жены, увидел потенциал, собрал за месяц.{' '}
          <Strong>BIXIRUN</Strong> — фитнес-приложение с собственным брендом БАДов, уже в App Store.
        </P>
        <P>
          Я не программист в классическом смысле. Я — архитектор: PRD, проектная документация,
          дизайн системы. Код делегирую AI. Начал кодить с появлением GPT — учился через ошибки,
          разбирал каждую строчку, которую генерировала нейросеть. Постепенно освоил стек: React,
          Next.js, Python, FastAPI, Docker. Сегодня могу поднять продакшн-SaaS за месяц в одного.
        </P>
        <P>
          Это не хобби и не подработка. Это путь к тому, чтобы реализовать свою идею, а не чужую.
        </P>
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
