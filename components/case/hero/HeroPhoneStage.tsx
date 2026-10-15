'use client'

/**
 * Сцена телефона hero («Кабинет в кадре»): настоящий мобильный кабинет в окне. Экраны
 * переключаются нажатием на его собственное нижнее меню, содержимое прокручивается, карусель
 * площадок листается пальцем, лупа останавливается на главных числах. Фона нет (owner 25.09:
 * на телефоне движется только кабинет). Геометрия и кадры — в heroScenes.ts.
 * На странице проекта сцена видна на любой ширине (от 768 px рядом с десктопной), снимки качаются всегда.
 */
import { memo } from 'react'
import {
  PHONE_LAYERS,
  PHONE_MARKS,
  PHONE_NAVS,
  PHONE_NAV_BOX,
  PHONE_SWIPE,
  PHONE_TAPS,
  phoneCaptionPos,
  phoneMarkBox,
  pq,
  type PhoneGroup,
} from './heroScenes'
import { BLANK, PHONE_SRC } from './heroAssets'

interface StageProps {
  /** Первый кадр загружен: можно качать остальные слои (HeroSection). */
  ready: boolean
}

interface LayersProps extends StageProps {
  /** Слои в лупе: те же снимки, что в окне, приоритет загрузки им не нужен. */
  inLens: boolean
}

/** Первый слой — первый кадр и LCP: грузится сразу; остальные — после него (ready), не деля с ним канал. */
function Layers({ inLens, ready }: LayersProps) {
  return (
    <>
      {PHONE_LAYERS.map((l, i) => (
        <picture key={l.key} className="hero-pic">
          <source srcSet={i === 0 || ready ? PHONE_SRC[l.key] : undefined} />
          <img
            src={BLANK}
            alt=""
            className={`hp-l-${l.key}`}
            style={{ opacity: l.key === 'mDash' ? 1 : 0 }}
            decoding="async"
            fetchPriority={!inLens && i === 0 ? 'high' : 'low'}
            draggable={false}
          />
        </picture>
      ))}
    </>
  )
}

function marksOf(group: PhoneGroup) {
  return PHONE_MARKS.filter((m) => m.group === group).map((m) => {
    const b = phoneMarkBox(m)
    return (
      <span
        key={m.key}
        className={`hp-hl hp-mark-${m.key}`}
        style={{
          left: pq(b.left),
          top: pq(b.top),
          width: pq(b.width),
          height: pq(b.height),
          animationName: `hp-m-${m.key}`,
        }}
      />
    )
  })
}

export const HeroPhoneStage = memo(function HeroPhoneStage({ ready }: StageProps) {
  return (
    <div className="hp-stage">
      <figure
        className="hp-window"
        aria-label="Мобильный кабинет на демо-данных: дашборд, юнит-экономика и реклама"
      >
        <div className="hp-screens">
          <Layers inLens={false} ready={ready} />
        </div>
        <div aria-hidden="true">
          <div className="hp-hlwrap hp-hl-dash">{marksOf('dash')}</div>
          <div className="hp-hlwrap hp-hl-ue">{marksOf('ue')}</div>
          <div className="hp-hlwrap hp-hl-ads">{marksOf('ads')}</div>
        </div>
        {PHONE_NAVS.map((n, i) => (
          <picture key={n} className="hero-pic">
            <source srcSet={i === 0 || ready ? PHONE_SRC[n] : undefined} />
            <img
              src={BLANK}
              alt=""
              className={`hp-nav hp-${n}`}
              style={{
                left: pq(PHONE_NAV_BOX.left),
                top: pq(PHONE_NAV_BOX.top),
                width: pq(PHONE_NAV_BOX.width),
                height: pq(PHONE_NAV_BOX.height),
                opacity: n === 'mNavDash' ? 1 : 0,
              }}
              decoding="async"
              draggable={false}
            />
          </picture>
        ))}
        <span className="hp-edge" aria-hidden="true" />
      </figure>

      <div className="hp-lens" aria-hidden="true">
        <div className="hp-inner">
          <Layers inLens ready={ready} />
        </div>
      </div>

      <div aria-hidden="true">
        {PHONE_MARKS.map((m) => {
          const p = phoneCaptionPos(m)
          return (
            <span
              key={m.key}
              className={`hp-cap hp-mark-${m.key}`}
              style={{ left: pq(p.left), top: pq(p.top), animationName: `hp-m-${m.key}` }}
            >
              <span className="hp-cap-dot" />
              {m.text}
            </span>
          )
        })}
        {PHONE_TAPS.map((t) => (
          <span key={t.key}>
            <span
              className="hp-tap"
              style={{
                left: pq(t.at[0] - 11),
                top: pq(t.at[1] - 11),
                animationName: `hp-tap-${t.key}`,
              }}
            />
            <span
              className="hp-rip"
              style={{
                left: pq(t.at[0] - 15),
                top: pq(t.at[1] - 15),
                animationName: `hp-rip-${t.key}`,
              }}
            />
          </span>
        ))}
        <span
          className="hp-tap"
          style={{
            left: pq(PHONE_SWIPE.left),
            top: pq(PHONE_SWIPE.top),
            animationName: 'hp-swipe',
          }}
        />
      </div>
    </div>
  )
})
