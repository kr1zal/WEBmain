# ТЗ: Доработка сайта avinogradov.pro

## Дата: 01.12.2025

## Приоритет реализации: Step 2 → Step 1 → Step 3 → Step 4 → Step 5

---

## STEP 1: Hero-фото (30 мин)

### Расположение: Hero секция

**Задача:**

- Добавить профессиональное фото справа от текста
- Desktop: grid 2 колонки (текст | фото)
- Mobile: фото над текстом или скрыть

**Требования к фото:**

- Минимум 400x500px
- Формат WebP
- lazy loading
- Стиль: rounded-2xl или clip-path для нестандартной формы

**Примерный код:**

```jsx
// Hero.jsx
<section className="grid min-h-[80vh] items-center gap-8 px-6 md:grid-cols-2">
  <div className="space-y-6">
    <h1 className="text-4xl font-bold md:text-5xl">Александр Виноградов</h1>
    <p className="text-xl text-gray-400">IT Директор & Эксперт E-commerce</p>
    <p className="text-lg">Масштабирую e-commerce проекты: рост с 300K до 26M ₽/мес</p>
    <div className="flex gap-4">
      <a href="#contact" className="btn-primary">
        Связаться
      </a>
      <a href="/projects" className="btn-secondary">
        Проекты
      </a>
    </div>
  </div>

  <div className="relative">
    <img
      src="/images/hero-photo.webp"
      alt="Александр Виноградов"
      className="mx-auto w-full max-w-md rounded-2xl object-cover"
      loading="lazy"
    />
  </div>
</section>
```

---

## STEP 2: Секция кейсов с цифрами (1-2 часа) ⭐ ПРИОРИТЕТ

### Расположение: между Hero и "Ключевые компетенции"

**Структура данных:**

```js
// data/cases.js
export const cases = [
  {
    id: 'sportpit',
    company: 'Бренд спортивного питания',
    role: 'Директор по развитию',
    period: '2022-2024',
    metrics: [
      {
        label: 'Выручка/мес',
        before: '300K ₽',
        after: '26M ₽',
        growth: '+8567%',
      },
      { label: 'SKU в ассортименте', before: '12', after: '150+' },
      { label: 'Маркетплейсы', before: '1', after: '5' },
    ],
  },
  {
    id: 'automation',
    company: 'Проект автоматизации',
    role: 'Технический директор',
    period: '2023-2024',
    metrics: [
      {
        label: 'Ручных операций',
        before: '40ч/нед',
        after: '2ч/нед',
        growth: '-95%',
      },
      { label: 'Интеграций', before: '0', after: '12+' },
    ],
  },
  {
    id: 'ecom-project',
    company: 'E-commerce проект',
    role: 'IT Директор',
    period: '2024',
    metrics: [
      {
        label: 'Время обработки заказа',
        before: '45 мин',
        after: '5 мин',
        growth: '-89%',
      },
      { label: 'Конверсия', before: '1.2%', after: '3.8%', growth: '+217%' },
    ],
  },
]
```

**Компонент:**

```jsx
// components/CaseStudies.jsx
import { cases } from '@/data/cases'

export default function CaseStudies() {
  return (
    <section className="px-6 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">Результаты в цифрах</h2>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:scale-[1.02] hover:border-zinc-700"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{caseItem.company}</h3>
              <p className="text-sm text-gray-500">
                {caseItem.role} • {caseItem.period}
              </p>
            </div>

            <div className="space-y-4">
              {caseItem.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xs tracking-wide text-gray-500 uppercase">{metric.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">{metric.before}</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-semibold text-white">{metric.after}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        metric.growth.startsWith('+')
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {metric.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## STEP 3: Социальное доказательство (1 час)

### Расположение: после секции кейсов

**Вариант A — Логотипы компаний:**

```jsx
// components/TrustedBy.jsx
const logos = [
  { name: 'Ozon', src: '/logos/ozon.svg' },
  { name: 'Wildberries', src: '/logos/wb.svg' },
  { name: 'Яндекс Маркет', src: '/logos/yandex-market.svg' },
  // добавить релевантные
]

export default function TrustedBy() {
  return (
    <section className="border-y border-zinc-800 px-6 py-16">
      <p className="mb-8 text-center text-sm tracking-wide text-gray-500 uppercase">
        Работал с платформами
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-8 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </section>
  )
}
```

**Вариант B — Отзыв:**

```jsx
// components/Testimonial.jsx
export default function Testimonial() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <svg className="mx-auto mb-6 h-12 w-12 text-zinc-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <blockquote className="mb-6 text-xl text-gray-300 md:text-2xl">
        "Александр выстроил все процессы с нуля — от интеграций с маркетплейсами до автоматизации
        склада. За год выручка выросла в 87 раз."
      </blockquote>

      <div className="flex items-center justify-center gap-4">
        <img src="/testimonials/person.webp" alt="Имя Фамилия" className="h-12 w-12 rounded-full" />
        <div className="text-left">
          <p className="font-semibold">Имя Фамилия</p>
          <p className="text-sm text-gray-500">CEO, Компания</p>
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 4: Микроанимации (1 час)

### Установка: npm install framer-motion

**Обёртка для анимации появления:**

```jsx
// components/AnimatedSection.jsx
'use client'
import { motion } from 'framer-motion'

export default function AnimatedSection({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Анимация счётчика для метрик:**

```jsx
// components/AnimatedCounter.jsx
'use client'
import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Извлекаем число из строки типа "26M" или "150+"
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const increment = numericValue / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, numericValue, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
```

**Применение в Hero:**

```jsx
// Hero.jsx с анимацией
'use client'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Hero() {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible" className="...">
      <motion.h1 variants={itemVariants}>...</motion.h1>
      <motion.p variants={itemVariants}>...</motion.p>
      <motion.div variants={itemVariants}>...</motion.div>
    </motion.section>
  )
}
```

---

## STEP 5: Страница /projects (2 часа)

### Файл: app/projects/page.jsx

**Структура данных:**

```js
// data/projects.js
export const projects = [
  {
    id: 'sportpit-scaling',
    title: 'Масштабирование бренда спортпита',
    description:
      'Построил e-commerce инфраструктуру с нуля: интеграции с 5 маркетплейсами, автоматизация склада, аналитика продаж в реальном времени.',
    tags: ['e-commerce', 'ozon', 'wildberries', 'автоматизация'],
    thumbnail: '/projects/sportpit-thumb.webp',
    result: 'Рост выручки с 300K до 26M ₽/мес',
    period: '2022-2024',
    stack: ['n8n', 'PostgreSQL', 'Ozon API', 'WB API', 'Node.js'],
    highlights: [
      'Интеграция с 5 маркетплейсами через единый хаб',
      'Автоматическое обновление остатков и цен',
      'Dashboard с unit-экономикой по каждому SKU',
    ],
  },
  {
    id: 'automation-hub',
    title: 'Центр автоматизации процессов',
    description:
      'Разработал систему автоматизации рутинных операций: от обработки заказов до генерации отчётов.',
    tags: ['n8n', 'api', 'интеграции'],
    thumbnail: '/projects/automation-thumb.webp',
    result: 'Экономия 38 часов в неделю',
    period: '2023-2024',
    stack: ['n8n', 'Make', 'REST API', 'Webhooks', 'Google Sheets API'],
    highlights: [
      '12+ интеграций между сервисами',
      'Автоматические отчёты в Telegram',
      '0 ручного ввода данных',
    ],
  },
  {
    id: 'analytics-dashboard',
    title: 'Аналитический дашборд',
    description: 'Real-time дашборд для отслеживания ключевых метрик e-commerce бизнеса.',
    tags: ['аналитика', 'dashboard', 'bi'],
    thumbnail: '/projects/dashboard-thumb.webp',
    result: 'Решения на основе данных за минуты, не дни',
    period: '2024',
    stack: ['Metabase', 'PostgreSQL', 'Python', 'dbt'],
    highlights: [
      'Unit-экономика в реальном времени',
      'Прогноз стоков и кассовых разрывов',
      'ABC/XYZ анализ ассортимента',
    ],
  },
]
```

**Компонент страницы:**

```jsx
// app/projects/page.jsx
import { projects } from '@/data/projects'
import AnimatedSection from '@/components/AnimatedSection'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">Проекты</h1>
        <p className="mb-12 max-w-2xl text-gray-400">
          Избранные кейсы из опыта в e-commerce и автоматизации
        </p>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <article className="grid items-center gap-8 md:grid-cols-2">
                {/* Thumbnail */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="aspect-video w-full rounded-2xl bg-zinc-800 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <p className="text-gray-400">{project.description}</p>

                  {/* Result highlight */}
                  <div className="rounded-xl border-l-2 border-green-500 bg-gradient-to-r from-green-500/10 to-transparent p-4">
                    <p className="font-medium text-green-400">{project.result}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {project.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-1 text-green-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-zinc-700 px-2 py-1 text-xs text-gray-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  )
}
```

---

## ЧЕКЛИСТ ПЕРЕД ДЕПЛОЕМ

- [ ] Фото hero загружено в /public/images/
- [ ] Все изображения в формате WebP
- [ ] Проверен mobile вид (375px)
- [ ] Lighthouse Performance > 90
- [ ] Добавлены alt-теги ко всем изображениям
- [ ] Проверены ссылки на соцсети
- [ ] Meta-теги и OG-image обновлены

---

## СТРУКТУРА ФАЙЛОВ

```
├── app/
│   ├── page.jsx          # Главная (добавить CaseStudies, TrustedBy)
│   └── projects/
│       └── page.jsx      # Страница проектов
├── components/
│   ├── Hero.jsx          # Обновить с фото
│   ├── CaseStudies.jsx   # NEW
│   ├── TrustedBy.jsx     # NEW
│   ├── Testimonial.jsx   # NEW (опционально)
│   ├── AnimatedSection.jsx # NEW
│   └── AnimatedCounter.jsx # NEW
├── data/
│   ├── cases.js          # NEW
│   └── projects.js       # NEW
└── public/
    ├── images/
    │   └── hero-photo.webp
    ├── logos/
    │   └── *.svg
    └── projects/
        └── *.webp
```

---

## ВРЕМЯ РЕАЛИЗАЦИИ

| Компонент             | Время | Приоритет |
| --------------------- | ----- | --------- |
| CaseStudies + данные  | 1-2ч  | ⭐⭐⭐    |
| Hero с фото           | 30м   | ⭐⭐⭐    |
| TrustedBy/Testimonial | 1ч    | ⭐⭐      |
| Анимации              | 1ч    | ⭐        |
| Projects page         | 2ч    | ⭐⭐      |

**Итого: 5-6 часов на полную реализацию**
