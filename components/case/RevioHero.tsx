'use client'

/**
 * Hero-сцены RevioMP в шапке страницы проекта: та же сцена, что на главной reviomp.ru, без
 * заголовка, кнопок продукта, подложки и табов. От 768 px десктопная сцена (экран кабинета под
 * лупой) и сцена телефона («кабинет в кадре») стоят рядом, уже 768 px остаётся только телефон.
 * Пауза вне экрана, при reduced motion обе стоят на первом кадре.
 */
import { useEffect, useRef, useState } from 'react'
import { HeroDesktopStage } from './hero/HeroDesktopStage'
import { HeroPhoneStage } from './hero/HeroPhoneStage'
import { desktopCss, phoneCss } from './hero/heroScenes'
import { BLANK, DESK_MEDIA } from './hero/heroAssets'
import './hero/revio-hero.css'

const SCENE_CSS = `${desktopCss()}\n${phoneCss()}`
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function settled(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', finish)
      void img
        .decode()
        .catch(() => undefined)
        .then(() => resolve())
    }
    const onLoad = () => {
      if (img.currentSrc && img.currentSrc !== BLANK) finish()
    }
    img.addEventListener('load', onLoad)
    img.addEventListener('error', finish)
    if (img.complete && img.currentSrc && img.currentSrc !== BLANK) finish()
  })
}

/** Снимки показанных сцен: от 768 px обе, уже — только телефон (десктоп скрыт, его снимки не качаются). */
function visibleStageImages(root: HTMLElement): HTMLImageElement[] {
  const desk = window.matchMedia(DESK_MEDIA).matches
  return [
    ...root.querySelectorAll<HTMLImageElement>(
      desk ? '.hd-stage img, .hp-stage img' : '.hp-stage img'
    ),
  ]
}

export default function RevioHero() {
  const ref = useRef<HTMLDivElement>(null)
  const [layersReady, setLayersReady] = useState(false)
  const [started, setStarted] = useState(false)

  // Первые кадры сцен грузятся с приоритетом; остальные слои получают srcset после них (layersReady)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia(REDUCED_MOTION).matches) return
    const leads = visibleStageImages(el).filter(
      (img) => img.getAttribute('fetchpriority') === 'high'
    )
    if (leads.length === 0) return
    let alive = true
    void Promise.all(leads.map(settled)).then(() => {
      if (alive) setLayersReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  // Сцены стартуют разом, когда загружены все их снимки: лупа показывает ровно то, что под ней
  useEffect(() => {
    const el = ref.current
    if (!layersReady || !el) return
    let alive = true
    void Promise.all(visibleStageImages(el).map(settled)).then(() => {
      if (alive) setStarted(true)
    })
    return () => {
      alive = false
    }
  }, [layersReady])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia(REDUCED_MOTION).matches) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      const visible = entries[entries.length - 1].isIntersecting
      el.toggleAttribute('data-hero-paused', !visible)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="revio-hero not-prose mb-10" data-hero-wait={started ? undefined : ''}>
      <style>{SCENE_CSS}</style>
      <div className="revio-hero-row">
        <div className="revio-hero-desk">
          <HeroDesktopStage ready={layersReady} />
        </div>
        <div className="revio-hero-phone">
          <HeroPhoneStage ready={layersReady} />
        </div>
      </div>
    </div>
  )
}
