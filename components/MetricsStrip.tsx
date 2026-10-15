'use client'

import { AnimatedCounter } from './Motion'

interface Metric {
  value: number
  suffix: string
  label: string
  detail: string
  barWidth: string
  isStatic?: boolean
  staticText?: string
}

const metrics: Metric[] = [
  { value: 87, suffix: 'x', label: 'Рост выручки', detail: '300K → 26M ₽/мес', barWidth: '87%' },
  {
    value: 60,
    suffix: '',
    label: 'Человек в управлении',
    detail: '7 департаментов',
    barWidth: '60%',
  },
  {
    value: 70,
    suffix: '%',
    label: 'Автоматизация процессов',
    detail: 'Бизнес-процессы',
    barWidth: '70%',
  },
  {
    value: 0,
    suffix: '',
    label: 'Операционная маржинальность',
    detail: 'Стабильный уровень',
    barWidth: '95%',
    isStatic: true,
    staticText: '19–20%',
  },
]

export default function MetricsStrip() {
  return (
    <section className="bg-[#1a1a1a] text-[#f5f2ed] transition-colors duration-400">
      <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-px bg-[#2e2a24] px-0 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="relative bg-[#1a1a1a] px-7 py-10 text-center">
            <div className="font-display text-4xl text-[#8fa7cc] lg:text-5xl">
              {m.isStatic ? (
                <span>{m.staticText}</span>
              ) : (
                <>
                  <AnimatedCounter value={m.value} duration={2} />
                  <span className="text-2xl lg:text-3xl">{m.suffix}</span>
                </>
              )}
            </div>
            <div className="mt-1 text-sm opacity-70">{m.label}</div>
            <div className="mt-2 text-xs opacity-45">{m.detail}</div>
            <div className="absolute right-7 bottom-0 left-7 h-[3px] overflow-hidden rounded-sm bg-white/10">
              <div
                className="h-full rounded-sm bg-[#8fa7cc] transition-[width] duration-1000"
                style={{ width: m.barWidth }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
