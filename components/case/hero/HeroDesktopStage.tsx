'use client'

/**
 * Десктопная сцена hero («Сборка»): экран кабинета, по которому ходит лупа, три экрана
 * (дашборд → юнит-экономика → реклама), подсветка, подписи и нажатия. Табов под экраном нет:
 * на странице проекта сцена без переключателя (owner 15.10.2026).
 * Линий потоков частиц и «порта» слева от экрана нет (сняты 09.10.2026, решение owner): пунктир
 * не читался, воронка шла сквозь последнюю строку заголовка, SMIL-частицы были единственной
 * анимацией главного потока.
 * Вся геометрия и кадры — в heroScenes.ts (единицы cqw: сцена масштабируется с колонкой).
 */
import { memo } from 'react'
import {
  DESK,
  DESK_LAYERS,
  DESK_MARKS,
  DESK_RIPPLES,
  deskCaptionPos,
  deskRipplePos,
  dq,
  type DeskGroup,
} from './heroScenes'
import { BLANK, DESK_MEDIA, DESK_SRC } from './heroAssets'

interface StageProps {
  /** Первый кадр загружен: можно качать остальные слои (HeroSection). */
  ready: boolean
}

interface LayersProps extends StageProps {
  /** Слои в лупе: те же снимки, что на экране, приоритет загрузки им не нужен. */
  inLens: boolean
}

/**
 * Первый слой — первый кадр и LCP: грузится сразу и с высоким приоритетом. Остальные получают
 * srcset только после него (ready): иначе пять снимков делят канал, и первый кадр приходит последним.
 */
function Layers({ inLens, ready }: LayersProps) {
  return (
    <>
      {DESK_LAYERS.map((l, i) => (
        <picture key={l.key} className="hero-pic">
          <source media={DESK_MEDIA} srcSet={i === 0 || ready ? DESK_SRC[l.key] : undefined} />
          <img
            src={BLANK}
            alt=""
            className={`hd-l-${l.key}`}
            style={{ opacity: l.key === 'dash' ? 1 : 0 }}
            decoding="async"
            fetchPriority={!inLens && i === 0 ? 'high' : 'low'}
            draggable={false}
          />
        </picture>
      ))}
    </>
  )
}

function marksOf(group: DeskGroup) {
  return DESK_MARKS.filter((m) => m.group === group).map((m) => {
    const [x, y, w, h] = m.box
    return (
      <span
        key={m.key}
        className={`hd-hl hd-mark-${m.key}`}
        style={{
          left: dq(x * DESK.S - 3),
          top: dq(y * DESK.S - 3),
          width: dq(w * DESK.S + 6),
          height: dq(h * DESK.S + 6),
          borderRadius: dq(m.key === 'det' ? 18 : 9),
          animationName: `hd-m-${m.key}`,
        }}
      />
    )
  })
}

export const HeroDesktopStage = memo(function HeroDesktopStage({ ready }: StageProps) {
  return (
    <div className="hd-stage">
      <figure
        className="hd-frame"
        aria-label="Экраны кабинета на демо-данных: дашборд, юнит-экономика и реклама"
      >
        <div className="hd-screens">
          <Layers inLens={false} ready={ready} />
        </div>
        <div aria-hidden="true">
          <div className="hd-hlwrap hd-hl-dash">{marksOf('dash')}</div>
          <div className="hd-hlwrap hd-hl-ue">{marksOf('ue')}</div>
          <div className="hd-hlwrap">{marksOf(null)}</div>
        </div>
        <span className="hd-edge" aria-hidden="true" />
      </figure>

      <div aria-hidden="true">
        {DESK_RIPPLES.map((r) => {
          const p = deskRipplePos(r.stop)
          return (
            <span
              key={r.key}
              className="hd-ripple"
              style={{ left: dq(p.left), top: dq(p.top), animationName: `hd-ripple-${r.key}` }}
            />
          )
        })}
      </div>

      <div className="hd-lens" aria-hidden="true">
        <div className="hd-inner">
          <Layers inLens ready={ready} />
        </div>
      </div>

      <div aria-hidden="true">
        {DESK_MARKS.filter((m) => m.text).map((m) => {
          const p = deskCaptionPos(m)
          return (
            <span
              key={m.key}
              className={`hd-cap hd-mark-${m.key}`}
              style={{ left: dq(p.left), top: dq(p.top), animationName: `hd-m-${m.key}` }}
            >
              <span className="hd-cap-dot" />
              {m.text}
            </span>
          )
        })}
      </div>
    </div>
  )
})
