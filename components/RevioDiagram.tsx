'use client'

// Схема RevioMP в стиле BixirunDiagram: источники слева, кабинет справа, ядро в центре.

const sourceItems = [
  { label: 'Wildberries API', icon: '◫' },
  { label: 'Ozon API', icon: '◳' },
  { label: 'Финансовые отчёты площадок', icon: '≡' },
  { label: 'Рекламные кампании', icon: '◔' },
  { label: 'ЮKassa и Telegram', icon: '◈' },
]

const cabinetItems = [
  { label: 'Дашборд', icon: '▦' },
  { label: 'Юнит-экономика', icon: '▤' },
  { label: 'Монитор заказов', icon: '≣' },
  { label: 'Реклама', icon: '◎' },
  { label: 'Остатки и прогноз', icon: '▥' },
  { label: 'PDF, Excel, бот', icon: '▶' },
]

function FeatureCard({
  label,
  icon,
  accentColor,
}: {
  label: string
  icon: string
  accentColor: 'navy' | 'emerald'
}) {
  const dotClass =
    accentColor === 'navy' ? 'bg-[#1b2d4e] dark:bg-[#8fa7cc]' : 'bg-emerald-500 dark:bg-emerald-400'

  return (
    <div className="group flex items-center gap-3 border-b border-[#eae7e2] px-0 py-2.5 last:border-b-0 dark:border-gray-800">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[11px] text-[#bbb] dark:text-gray-600">
        {icon}
      </span>
      <span className="text-[13px] font-medium text-[#444] dark:text-gray-400">{label}</span>
      <span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
    </div>
  )
}

export default function RevioDiagram() {
  return (
    <div className="my-8 border border-[#e0dcd6] bg-white/80 dark:border-gray-800 dark:bg-[#161615]">
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex items-stretch">
          {/* Left: источники */}
          <div className="flex-1 border-r border-[#eae7e2] p-6 dark:border-gray-800">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1b2d4e] dark:bg-[#8fa7cc]" />
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
                Источники
              </span>
            </div>
            {sourceItems.map((item) => (
              <FeatureCard key={item.label} {...item} accentColor="navy" />
            ))}
          </div>

          {/* Center: ядро */}
          <div className="flex w-[220px] shrink-0 flex-col items-center justify-between p-6">
            <div className="flex flex-col items-center border border-[#eae7e2] bg-[#fafaf8] px-4 py-2.5 dark:border-gray-800 dark:bg-[#1e1e1d]">
              <div className="text-[12px] font-semibold text-[#1b2d4e] dark:text-[#8fa7cc]">
                Синхронизация
              </div>
              <div className="mt-0.5 text-[9px] tracking-[0.02em] text-[#aaa] dark:text-gray-600">
                очередь · крон 30 мин · лимиты
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px border-l border-dashed border-[#d0ccc6] dark:border-gray-700" />
              <div className="flex h-[120px] w-[120px] flex-col items-center justify-center border border-[#1b2d4e]/20 bg-[#f5f2ed] dark:border-[#8fa7cc]/20 dark:bg-[#111110]">
                <div className="text-[18px] font-bold tracking-[-0.02em] text-[#1b2d4e] dark:text-[#8fa7cc]">
                  RevioMP
                </div>
                <div className="mt-0.5 text-[10px] tracking-[0.06em] text-[#999] dark:text-gray-500">
                  Веб + iPhone
                </div>
              </div>
              <div className="h-6 w-px border-l border-dashed border-[#d0ccc6] dark:border-gray-700" />
            </div>
            <div className="flex flex-col items-center border border-[#eae7e2] bg-[#fafaf8] px-4 py-2.5 dark:border-gray-800 dark:bg-[#1e1e1d]">
              <div className="text-[12px] font-semibold text-[#1b2d4e] dark:text-[#8fa7cc]">
                PostgreSQL 17
              </div>
              <div className="mt-0.5 text-[9px] tracking-[0.02em] text-[#aaa] dark:text-gray-600">
                self-host Supabase · RLS · FastAPI
              </div>
            </div>
          </div>

          {/* Right: кабинет */}
          <div className="flex-1 border-l border-[#eae7e2] p-6 dark:border-gray-800">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span className="text-[11px] font-semibold tracking-[0.14em] text-emerald-600 uppercase dark:text-emerald-400">
                Кабинет продавца
              </span>
            </div>
            {cabinetItems.map((item) => (
              <FeatureCard key={item.label} {...item} accentColor="emerald" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex flex-col items-center border-b border-[#eae7e2] py-6 dark:border-gray-800">
          <div className="flex h-[80px] w-[80px] flex-col items-center justify-center border border-[#1b2d4e]/20 bg-[#f5f2ed] dark:border-[#8fa7cc]/20 dark:bg-[#111110]">
            <div className="text-[15px] font-bold tracking-[-0.02em] text-[#1b2d4e] dark:text-[#8fa7cc]">
              RevioMP
            </div>
            <div className="text-[9px] text-[#999] dark:text-gray-500">Веб + iPhone</div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="border-r border-[#eae7e2] p-4 dark:border-gray-800">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b2d4e] dark:bg-[#8fa7cc]" />
              <span className="text-[10px] font-semibold tracking-[0.12em] text-[#1b2d4e] uppercase dark:text-[#8fa7cc]">
                Источники
              </span>
            </div>
            {['Wildberries API', 'Ozon API', 'Финотчёты', 'Реклама', 'ЮKassa, Telegram'].map(
              (item) => (
                <div
                  key={item}
                  className="border-b border-[#eae7e2] py-2 text-[11px] text-[#555] last:border-b-0 dark:border-gray-800 dark:text-gray-400"
                >
                  {item}
                </div>
              )
            )}
          </div>
          <div className="p-4">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold tracking-[0.12em] text-emerald-600 uppercase dark:text-emerald-400">
                Кабинет
              </span>
            </div>
            {['Дашборд', 'Юнит-экономика', 'Заказы', 'Реклама', 'Остатки', 'PDF, Excel, бот'].map(
              (item) => (
                <div
                  key={item}
                  className="border-b border-[#eae7e2] py-2 text-[11px] text-[#555] last:border-b-0 dark:border-gray-800 dark:text-gray-400"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-[#eae7e2] py-4 dark:border-gray-800">
          <div className="text-[11px] font-semibold text-[#1b2d4e] dark:text-[#8fa7cc]">
            Синхронизация · PostgreSQL 17 · FastAPI
          </div>
          <div className="text-[9px] text-[#aaa] dark:text-gray-600">
            очередь · крон 30 мин · self-host Supabase · RLS
          </div>
        </div>
      </div>
    </div>
  )
}
