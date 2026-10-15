/**
 * Сценарий кабинета в hero — один источник правды для кадров лупы, прокрутки экранов,
 * подсветки, подписей и нажатий (десктоп — «Сборка», телефон — «Кабинет в кадре»).
 *
 * Эталон — доски канваса (tools/hero-canvas: gen_combo5.py → ComboFinal, gen_mobile.py → MobileB).
 * Геометрия задаётся в пикселях макета, а в CSS уходит в единицах cqw контейнера сцены:
 * сцена масштабируется вместе со своей колонкой без скриптов и без сдвига вёрстки.
 *
 * Все анимации сцены — CSS-кадры одной длительности; линза и слои считаются из одних точек
 * с одними временами и одной кривой, поэтому линза показывает ровно то, что под ней. Рамки
 * подсветки (десктоп и телефон) лежат в слое страницы и прокручиваются её же кадрами —
 * оторваться не могут, даже если затухание рамки заходит на прокрутку.
 * Проверка совмещения на живой странице: tools/hero-canvas/check/hero_sync_audit.mjs.
 *
 * Модуль чистый: строит строку CSS, её рендерит HeroSection (попадает в пререндер).
 */

const EASE = 'cubic-bezier(.65,0,.35,1)'

type Pt = readonly [time: number, value: number]

/** Точка маршрута: координаты на странице кабинета (CSS px снимка) и прокрутка страницы в этот момент. */
interface Stop {
  x: number
  y: number
  scroll: number
}

/**
 * Рамка подсветки: элемент на странице кабинета, подпись и окно видимости. `group` — слой, чьими
 * кадрами прокрутки едет рамка (null — экран без прокрутки): поле самой рамки, а не отдельная
 * карта по ключу, где опечатка молча выкидывала рамку (ревью 26.09).
 */
export interface Mark<G> {
  key: string
  group: G
  stop: Stop
  box: readonly [x: number, y: number, w: number, h: number]
  text: string | null
  tIn: number
  tOut: number
}

const pct = (t: number, T: number) => `${((t / T) * 100).toFixed(3)}%`
const num = (v: number) => Number(v.toFixed(4)).toString()

function keyframes<V>(
  name: string,
  points: ReadonlyArray<readonly [number, V]>,
  T: number,
  fmt: (v: V) => string
): string {
  return `@keyframes ${name}{${points.map(([t, v]) => `${pct(t, T)}{${fmt(v)}}`).join('')}}`
}

// ─────────────────────────────── десктоп: «Сборка» ───────────────────────────────

/**
 * Сцена десктопа: экран 720 × 705 макета (страница кабинета 1440 px в половину). Табов под экраном
 * нет: на странице проекта сцена без переключателя (owner 15.10.2026).
 */
export const DESK = {
  W: 720,
  FH: 705,
  S: 0.5,
  R: 100,
  K: 1.9,
  T: 22.2,
} as const
const DM = DESK.S * DESK.K

const S_UE = 6.0
const S_ADS = 16.2
const u = S_UE
const a = S_ADS
const DT = DESK.T

/** Слои экрана: ключ ассета, высота снимка в CSS px, группа прокрутки. */
export const DESK_LAYERS = [
  { key: 'dash', h: 1429, group: 'dash' },
  { key: 'dashDetails', h: 1975, group: 'dash' },
  { key: 'ue', h: 1519, group: 'ue' },
  { key: 'ueOpen', h: 1720, group: 'ue' },
  { key: 'ads', h: 1400, group: null },
] as const
export type DeskLayerKey = (typeof DESK_LAYERS)[number]['key']

const SCROLL_DASH = 546 // низ раскрытой карточки Ozon
const SCROLL_UE = 200 // карточки WB и Ozon раскрытого товара целиком в кадре

const A: Stop = { x: 1175, y: 345, scroll: 0 } // итог с налогом и чистой прибылью
const DET: Stop = { x: 657, y: 808, scroll: 0 } // кнопка «Детали» у Ozon
const B: Stop = { x: 600, y: 1528, scroll: SCROLL_DASH } // «Вознаграждение Ozon» в деталях
const C: Stop = { x: 860, y: 752, scroll: 0 } // «На чём держится прибыль»
const D: Stop = { x: 1265, y: 1030, scroll: 0 } // прибыль строки «Коллагена»
const ROW: Stop = { x: 247, y: 1022, scroll: 0 } // шеврон строки: нажатие раскрывает её
const WB: Stop = { x: 170, y: 1372, scroll: SCROLL_UE } // карточка WB раскрытого товара
const OZ: Stop = { x: 858, y: 1372, scroll: SCROLL_UE } // карточка Ozon того же товара
const E: Stop = { x: 800, y: 368, scroll: 0 } // ROAS
const F: Stop = { x: 1040, y: 620, scroll: 0 } // ДРР по дням

const deskScreen = (s: Stop) => [s.x * DESK.S, (s.y - s.scroll) * DESK.S] as const

const DESK_LENS: ReadonlyArray<readonly [number, Stop, number]> = [
  [0, A, 1],
  [1.8, A, 1],
  [2.4, DET, 1],
  [2.5, DET, 0.9],
  [2.6, DET, 1],
  [3.4, B, 1],
  [5.4, B, 1],
  [u, C, 1],
  [u + 1.8, C, 1],
  [u + 2.5, D, 1],
  [u + 4.1, D, 1],
  [u + 4.7, ROW, 1],
  [u + 4.8, ROW, 0.9],
  [u + 4.9, ROW, 1],
  [u + 5.7, WB, 1],
  [u + 7.3, WB, 1],
  [u + 7.9, OZ, 1],
  [u + 9.6, OZ, 1],
  [a, E, 1],
  [a + 1.9, E, 1],
  [a + 2.6, F, 1],
  [a + 5.4, F, 1],
  [DT, A, 1],
]

const DESK_SCROLL: Record<'dash' | 'ue', Pt[]> = {
  dash: [
    [0, 0],
    [2.6, 0],
    [3.4, SCROLL_DASH],
    [S_UE - 0.01, SCROLL_DASH],
    [S_UE, 0],
    [DT, 0],
  ],
  ue: [
    [0, 0],
    [u + 4.9, 0],
    [u + 5.7, SCROLL_UE],
    [S_ADS - 0.01, SCROLL_UE],
    [S_ADS, 0],
    [DT, 0],
  ],
}

const DESK_OPACITY: Record<DeskLayerKey, Pt[]> = {
  dash: [
    [0, 1],
    [S_UE - 0.6, 1],
    [S_UE, 0],
    [DT - 0.6, 0],
    [DT, 1],
  ],
  dashDetails: [
    [0, 0],
    [2.45, 0],
    [2.6, 1],
    [S_UE - 0.6, 1],
    [S_UE, 0],
    [DT, 0],
  ],
  ue: [
    [0, 0],
    [S_UE - 0.6, 0],
    [S_UE, 1],
    [S_ADS - 0.6, 1],
    [S_ADS, 0],
    [DT, 0],
  ],
  ueOpen: [
    [0, 0],
    [u + 4.75, 0],
    [u + 4.9, 1],
    [S_ADS - 0.6, 1],
    [S_ADS, 0],
    [DT, 0],
  ],
  ads: [
    [0, 0],
    [S_ADS - 0.6, 0],
    [S_ADS, 1],
    [DT - 0.6, 1],
    [DT, 0],
  ],
}

export const DESK_RIPPLES = [
  { key: 'det', stop: DET, t0: 2.42 },
  { key: 'row', stop: ROW, t0: u + 4.72 },
] as const

export type DeskGroup = 'dash' | 'ue' | null
export const DESK_MARKS: Mark<DeskGroup>[] = [
  {
    key: 'a',
    group: 'dash',
    stop: A,
    box: [1077, 191, 339, 267],
    text: 'Налог уже вычтен из прибыли',
    tIn: 0.2,
    tOut: 1.6,
  },
  {
    key: 'det',
    group: 'dash',
    stop: DET,
    box: [612, 790, 91, 36],
    text: null,
    tIn: 2.15,
    tOut: 2.75,
  },
  {
    key: 'b',
    group: 'dash',
    stop: B,
    box: [38, 1494, 662, 66],
    text: 'Каждое удержание до статьи отчёта',
    tIn: 3.6,
    tOut: 5.2,
  },
  {
    key: 'c',
    group: 'ue',
    stop: C,
    box: [752, 733, 652, 82],
    text: 'Какие товары держат прибыль',
    tIn: u + 0.2,
    tOut: u + 1.6,
  },
  {
    key: 'd',
    group: 'ue',
    stop: D,
    box: [30, 994, 1380, 62],
    text: 'Прибыль и маржа каждого товара',
    tIn: u + 2.6,
    tOut: u + 4.8,
  },
  {
    key: 'wb',
    group: 'ue',
    stop: WB,
    box: [42, 1075, 673, 448],
    text: 'Прибыль товара на Wildberries',
    tIn: u + 5.9,
    tOut: u + 7.2,
  },
  {
    key: 'oz',
    group: 'ue',
    stop: OZ,
    box: [729, 1075, 673, 448],
    text: 'Прибыль того же товара на Ozon',
    tIn: u + 8.0,
    tOut: u + 9.5,
  },
  {
    key: 'e',
    group: null,
    stop: E,
    box: [726, 315, 339, 120],
    text: 'Сколько приносит рубль рекламы',
    tIn: a + 0.2,
    tOut: a + 1.7,
  },
  // весь блок графика, как на телефоне: заголовок с легендой, обе кривые от первой точки, подписи оси
  {
    key: 'f',
    group: null,
    stop: F,
    box: [318, 510, 832, 206],
    text: 'ДРР по дням',
    tIn: a + 2.8,
    tOut: a + 5.2,
  },
]

/** Длина в макетных px десктопной сцены → cqw контейнера сцены. */
export const dq = (px: number) => `${num((px / DESK.W) * 100)}cqw`

/** Позиция подписи у точки: под линзой, если помещается в экране, иначе над ней. */
export function deskCaptionPos(mark: Mark<DeskGroup>): { left: number; top: number } {
  const [px, py] = deskScreen(mark.stop)
  const estW = (mark.text?.length ?? 0) * 8.1 + 45
  const left = Math.min(Math.max(px - estW / 2, 12), DESK.W - 12 - estW)
  const top = py + DESK.R + 12 + 34 <= DESK.FH - 8 ? py + DESK.R + 12 : py - DESK.R - 46
  return { left, top }
}

export function deskRipplePos(stop: Stop): { left: number; top: number } {
  const [x, y] = deskScreen(stop)
  return { left: x - 22, top: y - 22 }
}

export function desktopCss(): string {
  const { R, T } = DESK
  const [ax, ay] = deskScreen(A)
  const lens = DESK_LENS.map(([t, s, k]) => [t, [s, k] as const] as const)
  const kf: string[] = [
    keyframes('hd-lens', lens, T, ([s, k]) => {
      const [x, y] = deskScreen(s)
      return `transform:translate(${dq(x - R)},${dq(y - R)}) scale(${k})`
    }),
    keyframes('hd-inner', lens, T, ([s]) => {
      const [x, y] = deskScreen(s)
      return `transform:translate(${dq(R - (x / DESK.S) * DM)},${dq(R - (y / DESK.S) * DM)})`
    }),
  ]
  for (const group of ['dash', 'ue'] as const) {
    kf.push(
      keyframes(
        `hd-scroll-${group}-f`,
        DESK_SCROLL[group],
        T,
        (v) => `transform:translateY(${dq(-v * DESK.S)})`
      )
    )
    kf.push(
      keyframes(
        `hd-scroll-${group}-i`,
        DESK_SCROLL[group],
        T,
        (v) => `transform:translateY(${dq(-v * DM)})`
      )
    )
  }
  for (const layer of DESK_LAYERS) {
    kf.push(keyframes(`hd-op-${layer.key}`, DESK_OPACITY[layer.key], T, (v) => `opacity:${v}`))
  }
  for (const r of DESK_RIPPLES) {
    const pts: ReadonlyArray<readonly [number, readonly [number, number]]> = [
      [0, [0, 0.4]],
      [r.t0, [0, 0.4]],
      [r.t0 + 0.04, [0.8, 0.5]],
      [r.t0 + 0.53, [0, 1.9]],
      [T, [0, 1.9]],
    ]
    kf.push(
      keyframes(`hd-ripple-${r.key}`, pts, T, ([o, s]) => `opacity:${o};transform:scale(${s})`)
    )
  }
  for (const m of DESK_MARKS) {
    const pts: Pt[] = [
      [0, 0],
      [Math.max(m.tIn - 0.15, 0.01), 0],
      [m.tIn, 1],
      [m.tOut, 1],
      [m.tOut + 0.2, 0],
      [T, 0],
    ]
    kf.push(keyframes(`hd-m-${m.key}`, pts, T, (v) => `opacity:${v}`))
  }
  const layerRules = DESK_LAYERS.map((l) => {
    const f = [`hd-op-${l.key} ${T}s ${EASE} infinite`]
    const i = [`hd-op-${l.key} ${T}s ${EASE} infinite`]
    if (l.group) {
      f.push(`hd-scroll-${l.group}-f ${T}s ${EASE} infinite`)
      i.push(`hd-scroll-${l.group}-i ${T}s ${EASE} infinite`)
    }
    return [
      `.hd-frame .hd-l-${l.key}{width:${dq(1440 * DESK.S)};height:${dq(l.h * DESK.S)};animation:${f.join(',')}}`,
      `.hd-inner .hd-l-${l.key}{width:${dq(1440 * DM)};height:${dq(l.h * DM)};animation:${i.join(',')}}`,
    ].join('')
  }).join('')

  return [
    ...kf,
    `.hd-lens{width:${dq(2 * R)};height:${dq(2 * R)};transform:translate(${dq(ax - R)},${dq(ay - R)});animation:hd-lens ${T}s ${EASE} infinite}`,
    `.hd-inner{width:${dq(1440 * DM)};height:${dq(2000 * DM)};transform:translate(${dq(R - (ax / DESK.S) * DM)},${dq(R - (ay / DESK.S) * DM)});animation:hd-inner ${T}s ${EASE} infinite}`,
    layerRules,
    ...['dash', 'ue'].map((g) => `.hd-hl-${g}{animation:hd-scroll-${g}-f ${T}s ${EASE} infinite}`),
    // размеры классов — тоже в cqw: всё, что зависит от масштаба сцены, живёт здесь
    `.hd-stage{aspect-ratio:${DESK.W}/${DESK.FH}}`,
    `.hd-frame,.hd-screens,.hd-hlwrap{height:${dq(DESK.FH)}}`,
    `.hd-frame,.hd-edge{border-radius:${dq(12)}}`,
    `.hd-hl,.hd-cap,.hd-ripple{animation-duration:${T}s;animation-timing-function:linear;animation-iteration-count:infinite}`,
    `.hd-cap{height:${dq(34)};padding:0 ${dq(14)};gap:${dq(8)};border-radius:${dq(17)};font-size:${dq(14)}}`,
    `.hd-cap-dot{width:${dq(7)};height:${dq(7)}}`,
    `.hd-ripple{width:${dq(44)};height:${dq(44)}}`,
  ].join('\n')
}

// ─────────────────────────────── телефон: «Кабинет в кадре» ───────────────────────────────

/**
 * Сцена телефона: окно 300 × 649 макета = полный экран телефона 390 × 844 в масштабе s, в нём мобильный
 * кабинет (на главной reviomp.ru окно 456 — обрезка под первый экран; на странице проекта окно целиком,
 * owner 15.10.2026).
 */
export const PHONE = {
  W: 300,
  H: (300 * 844) / 390,
  R: 60,
  K: 1.4,
  T: 19.3,
} as const
const PS = PHONE.W / 390
const PM = PS * PHONE.K
const PT = PHONE.T
/** Нижнее меню кабинета занимает 780..844 px экрана: контент виден до 780 и прокручивается до этой границы. */
const CONTENT_H = 780
const NAVY = CONTENT_H * PS // верх нижнего меню кабинета в окне
const NAVX = 12 * PS

export const PHONE_LAYERS = [
  { key: 'mDash', h: 1820, group: 'dash' },
  { key: 'mUe', h: 1700, group: 'ue' },
  { key: 'mUeOpen', h: 2200, group: 'ue' },
  { key: 'mUeOpenOz', h: 2200, group: 'ue' },
  { key: 'mAds', h: 1400, group: 'ads' },
] as const
export type PhoneLayerKey = (typeof PHONE_LAYERS)[number]['key']
export const PHONE_NAVS = ['mNavDash', 'mNavUe', 'mNavAds'] as const
export type PhoneNavKey = (typeof PHONE_NAVS)[number]

/** Предел прокрутки слоя: его конец у верха нижнего меню, дальше пустого поля в окне нет. */
const LAYER_H = Object.fromEntries(PHONE_LAYERS.map((l) => [l.key, l.h])) as Record<
  PhoneLayerKey,
  number
>
const SCROLL_DASH_P = LAYER_H.mDash - CONTENT_H // 1040
const SCROLL_UE_P = LAYER_H.mUe - CONTENT_H // 920
const SCROLL_UE_OPEN = LAYER_H.mUeOpen - CONTENT_H // 1420
const SCROLL_ADS_P = LAYER_H.mAds - CONTENT_H // 620

const P1: Stop = { x: 258, y: 305, scroll: 0 } // итог с налогом и чистой прибылью
const P2: Stop = { x: 145, y: 1740, scroll: SCROLL_DASH_P } // карточка Ozon: налог и чистая прибыль
const P3: Stop = { x: 95, y: 186, scroll: 0 } // юнит-экономика: прибыль по всем товарам
const P4: Stop = { x: 110, y: 1976, scroll: SCROLL_UE_OPEN } // раскрытый товар, WB
const P5: Stop = { x: 110, y: 1976, scroll: SCROLL_UE_OPEN } // тот же товар, Ozon (карусель пролистана)
const P6: Stop = { x: 70, y: 570, scroll: 0 } // реклама: ROAS
const P7: Stop = { x: 250, y: 1085, scroll: SCROLL_ADS_P } // ДРР по дням
const TAP_CARD: Stop = { x: 300, y: 1446, scroll: SCROLL_UE_P } // нажатие на карточку «Коллагена»

const phoneScreen = (s: Stop) => [s.x * PS, (s.y - s.scroll) * PS] as const

const PHONE_LENS: ReadonlyArray<readonly [number, Stop]> = [
  [0, P1],
  [1.8, P1],
  [2.6, P2],
  [4.4, P2],
  [4.7, P2],
  [5.2, P3],
  [7.1, P3],
  [9.4, P4],
  [11.1, P4],
  [11.5, P5],
  [12.9, P5],
  [13.7, P6],
  [15.6, P6],
  [16.4, P7],
  [18.2, P7],
  [18.9, P1],
  [PT, P1],
]
const PHONE_LENS_OP: Pt[] = [
  [0, 1],
  [4.4, 1],
  [4.6, 0],
  [5.3, 0],
  [5.5, 1],
  [7.1, 1],
  [7.3, 0],
  [9.45, 0],
  [9.65, 1],
  [12.9, 1],
  [13.1, 0],
  [13.8, 0],
  [14.0, 1],
  [18.2, 1],
  [18.4, 0],
  [19.0, 0],
  [19.2, 1],
  [PT, 1],
]
const PHONE_SCROLL: Record<'dash' | 'ue' | 'ads', Pt[]> = {
  dash: [
    [0, 0],
    [1.8, 0],
    [2.6, SCROLL_DASH_P],
    [5.19, SCROLL_DASH_P],
    [5.2, 0],
    [PT, 0],
  ],
  ue: [
    [0, 0],
    [7.4, 0],
    [8.2, SCROLL_UE_P],
    [8.7, SCROLL_UE_P],
    [9.5, SCROLL_UE_OPEN],
    [13.79, SCROLL_UE_OPEN],
    [13.8, 0],
    [PT, 0],
  ],
  ads: [
    [0, 0],
    [15.6, 0],
    [16.4, SCROLL_ADS_P],
    [19.09, SCROLL_ADS_P],
    [19.1, 0],
    [PT, 0],
  ],
}
const PHONE_OPACITY: Record<PhoneLayerKey, Pt[]> = {
  mDash: [
    [0, 1],
    [4.9, 1],
    [5.3, 0],
    [18.7, 0],
    [19.1, 1],
    [PT, 1],
  ],
  mUe: [
    [0, 0],
    [4.9, 0],
    [5.3, 1],
    [13.4, 1],
    [13.8, 0],
    [PT, 0],
  ],
  mUeOpen: [
    [0, 0],
    [8.45, 0],
    [8.65, 1],
    [13.4, 1],
    [13.8, 0],
    [PT, 0],
  ],
  mUeOpenOz: [
    [0, 0],
    [11.2, 0],
    [11.5, 1],
    [13.4, 1],
    [13.8, 0],
    [PT, 0],
  ],
  mAds: [
    [0, 0],
    [13.4, 0],
    [13.8, 1],
    [18.7, 1],
    [19.1, 0],
    [PT, 0],
  ],
}
const PHONE_NAV_OPACITY: Record<PhoneNavKey, Pt[]> = {
  mNavDash: [
    [0, 1],
    [4.9, 1],
    [4.95, 0],
    [18.7, 0],
    [18.75, 1],
    [PT, 1],
  ],
  mNavUe: [
    [0, 0],
    [4.9, 0],
    [4.95, 1],
    [13.4, 1],
    [13.45, 0],
    [PT, 0],
  ],
  mNavAds: [
    [0, 0],
    [13.4, 0],
    [13.45, 1],
    [18.7, 1],
    [18.75, 0],
    [PT, 0],
  ],
}
const TAPS = {
  dash: [48.6 * PS, NAVY + 28 * PS] as const,
  ue: [195 * PS, NAVY + 28 * PS] as const,
  ads: [268.2 * PS, NAVY + 28 * PS] as const,
}

export const PHONE_TAPS = [
  { key: 't1', at: TAPS.ue, t0: 4.75 },
  { key: 't2', at: phoneScreen(TAP_CARD), t0: 8.3 },
  { key: 't3', at: TAPS.ads, t0: 13.25 },
  { key: 't4', at: TAPS.dash, t0: 18.55 },
] as const
/** Палец листает карусель площадок справа налево. */
export const PHONE_SWIPE = {
  left: 250,
  top: phoneScreen({ x: 200, y: 1880, scroll: SCROLL_UE_OPEN })[1] - 11,
  dx: -150,
} as const

export type PhoneGroup = 'dash' | 'ue' | 'ads'
export const PHONE_MARKS: Mark<PhoneGroup>[] = [
  {
    key: 'a',
    group: 'dash',
    stop: P1,
    box: [201, 132, 177, 258],
    text: 'Налог уже вычтен',
    tIn: 0.2,
    tOut: 1.6,
  },
  {
    key: 'b',
    group: 'dash',
    stop: P2,
    box: [12, 1222, 177, 568],
    text: 'Чистая прибыль по Ozon',
    tIn: 2.8,
    tOut: 4.2,
  },
  {
    key: 'c',
    group: 'ue',
    stop: P3,
    box: [12, 132, 177, 118],
    text: 'Прибыль по всем товарам',
    tIn: 5.6,
    tOut: 7.0,
  },
  {
    key: 'd',
    group: 'ue',
    stop: P4,
    box: [13, 1677, 364, 431],
    text: 'Прибыль товара на Wildberries',
    tIn: 9.8,
    tOut: 11.0,
  },
  {
    key: 'e',
    group: 'ue',
    stop: P5,
    box: [13, 1677, 364, 431],
    text: 'Тот же товар на Ozon',
    tIn: 11.6,
    tOut: 12.8,
  },
  {
    key: 'f',
    group: 'ads',
    stop: P6,
    box: [12, 518, 177, 118],
    text: 'Отдача рубля рекламы',
    tIn: 14.1,
    tOut: 15.5,
  },
  {
    key: 'g',
    group: 'ads',
    stop: P7,
    box: [16, 990, 358, 170],
    text: 'ДРР по дням',
    tIn: 16.5,
    tOut: 18.1,
  },
]

export const PHONE_NAV_BOX = { left: NAVX, top: NAVY, width: 366 * PS, height: 56 * PS } as const

/** Длина в макетных px сцены телефона → cqw контейнера сцены. */
export const pq = (px: number) => `${num((px / PHONE.W) * 100)}cqw`

/** Рамка подсветки в координатах страницы экрана: на место её ставит прокрутка обёртки слоя. */
export function phoneMarkBox(mark: Mark<PhoneGroup>): {
  left: number
  top: number
  width: number
  height: number
} {
  const [x, y, w, h] = mark.box
  return { left: x * PS - 2, top: y * PS - 2, width: w * PS + 4, height: h * PS + 4 }
}

export function phoneCaptionPos(mark: Mark<PhoneGroup>): { left: number; top: number } {
  const [px, py] = phoneScreen(mark.stop)
  const estW = (mark.text?.length ?? 0) * 6.9 + 34
  const left = Math.min(Math.max(px - estW / 2, 6), PHONE.W - 6 - estW)
  const top = py + PHONE.R + 8 + 26 <= NAVY - 6 ? py + PHONE.R + 8 : py - PHONE.R - 34
  return { left, top }
}

export function phoneCss(): string {
  const { R, T } = PHONE
  const [sx, sy] = phoneScreen(P1)
  const kf: string[] = [
    keyframes('hp-lens', PHONE_LENS, T, (s) => {
      const [x, y] = phoneScreen(s)
      return `transform:translate(${pq(x - R)},${pq(y - R)})`
    }),
    keyframes('hp-inner', PHONE_LENS, T, (s) => {
      const [x, y] = phoneScreen(s)
      return `transform:translate(${pq(R - (x / PS) * PM)},${pq(R - (y / PS) * PM)})`
    }),
    keyframes('hp-lens-op', PHONE_LENS_OP, T, (v) => `opacity:${v}`),
  ]
  for (const group of ['dash', 'ue', 'ads'] as const) {
    kf.push(
      keyframes(
        `hp-scroll-${group}-f`,
        PHONE_SCROLL[group],
        T,
        (v) => `transform:translateY(${pq(-v * PS)})`
      )
    )
    kf.push(
      keyframes(
        `hp-scroll-${group}-i`,
        PHONE_SCROLL[group],
        T,
        (v) => `transform:translateY(${pq(-v * PM)})`
      )
    )
  }
  for (const layer of PHONE_LAYERS)
    kf.push(keyframes(`hp-op-${layer.key}`, PHONE_OPACITY[layer.key], T, (v) => `opacity:${v}`))
  for (const nav of PHONE_NAVS)
    kf.push(keyframes(`hp-op-${nav}`, PHONE_NAV_OPACITY[nav], T, (v) => `opacity:${v}`))
  for (const tap of PHONE_TAPS) {
    const t0 = tap.t0
    const tapPts: ReadonlyArray<readonly [number, readonly [number, number]]> = [
      [0, [0, 1]],
      [t0 - 0.15, [0, 1]],
      [t0, [0.9, 0.8]],
      [t0 + 0.25, [0.9, 0.8]],
      [t0 + 0.45, [0, 1]],
      [T, [0, 1]],
    ]
    const ripPts: ReadonlyArray<readonly [number, readonly [number, number]]> = [
      [0, [0, 0.4]],
      [t0 + 0.05, [0, 0.4]],
      [t0 + 0.09, [0.8, 0.5]],
      [t0 + 0.6, [0, 2]],
      [T, [0, 2]],
    ]
    kf.push(
      keyframes(`hp-tap-${tap.key}`, tapPts, T, ([o, s]) => `opacity:${o};transform:scale(${s})`)
    )
    kf.push(
      keyframes(`hp-rip-${tap.key}`, ripPts, T, ([o, s]) => `opacity:${o};transform:scale(${s})`)
    )
  }
  const swipe: ReadonlyArray<readonly [number, readonly [number, number]]> = [
    [0, [0, 0]],
    [11.05, [0, 0]],
    [11.1, [0.9, 0]],
    [11.5, [0.9, PHONE_SWIPE.dx]],
    [11.6, [0, PHONE_SWIPE.dx]],
    [T, [0, PHONE_SWIPE.dx]],
  ]
  kf.push(
    keyframes('hp-swipe', swipe, T, ([o, dx]) => `opacity:${o};transform:translateX(${pq(dx)})`)
  )
  for (const m of PHONE_MARKS) {
    const pts: Pt[] = [
      [0, 0],
      [Math.max(m.tIn - 0.15, 0.01), 0],
      [m.tIn, 1],
      [m.tOut, 1],
      [m.tOut + 0.2, 0],
      [T, 0],
    ]
    kf.push(keyframes(`hp-m-${m.key}`, pts, T, (v) => `opacity:${v}`))
  }

  const layerRules = PHONE_LAYERS.map((l) =>
    [
      `.hp-window .hp-l-${l.key}{width:${pq(390 * PS)};height:${pq(l.h * PS)};animation:hp-op-${l.key} ${T}s ${EASE} infinite,hp-scroll-${l.group}-f ${T}s ${EASE} infinite}`,
      `.hp-inner .hp-l-${l.key}{width:${pq(390 * PM)};height:${pq(l.h * PM)};animation:hp-op-${l.key} ${T}s ${EASE} infinite,hp-scroll-${l.group}-i ${T}s ${EASE} infinite}`,
    ].join('')
  ).join('')

  return [
    ...kf,
    `.hp-lens{width:${pq(2 * R)};height:${pq(2 * R)};transform:translate(${pq(sx - R)},${pq(sy - R)});animation:hp-lens ${T}s ${EASE} infinite,hp-lens-op ${T}s linear infinite}`,
    `.hp-inner{width:${pq(390 * PM)};height:${pq(2400 * PM)};transform:translate(${pq(R - (sx / PS) * PM)},${pq(R - (sy / PS) * PM)});animation:hp-inner ${T}s ${EASE} infinite}`,
    layerRules,
    ...PHONE_NAVS.map((n) => `.hp-${n}{animation:hp-op-${n} ${T}s linear infinite}`),
    ...(['dash', 'ue', 'ads'] as const).map(
      (g) => `.hp-hl-${g}{animation:hp-scroll-${g}-f ${T}s ${EASE} infinite}`
    ),
    `.hp-stage{aspect-ratio:${PHONE.W}/${PHONE.H}}`,
    `.hp-window,.hp-edge{border-radius:${pq(22)}}`,
    `.hp-hl{border-radius:${pq(12)}}`,
    `.hp-hl,.hp-cap,.hp-tap,.hp-rip{animation-duration:${T}s;animation-iteration-count:infinite}`,
    `.hp-hl,.hp-cap,.hp-rip{animation-timing-function:linear}.hp-tap{animation-timing-function:${EASE}}`,
    `.hp-cap{height:${pq(26)};padding:0 ${pq(10)};gap:${pq(6)};border-radius:${pq(13)};font-size:${pq(12)}}`,
    `.hp-cap-dot{width:${pq(6)};height:${pq(6)}}`,
    `.hp-tap{width:${pq(22)};height:${pq(22)}}.hp-rip{width:${pq(30)};height:${pq(30)}}`,
  ].join('\n')
}
