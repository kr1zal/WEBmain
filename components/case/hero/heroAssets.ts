/**
 * Снимки демо-кабинета для hero-сцены RevioMP (перенесено с reviomp.ru, 15.10.2026).
 * Файлы лежат в public/static/images/reviomp/hero/, обновлять вместе с hero продукта.
 */
import type { DeskLayerKey, PhoneLayerKey, PhoneNavKey } from './heroScenes'

const BASE = '/static/images/reviomp/hero'
const dash = `${BASE}/hero-dash.webp`
const dashDetails = `${BASE}/hero-dash-details.webp`
const ue = `${BASE}/hero-ue.webp`
const ueOpen = `${BASE}/hero-ue-open.webp`
const ads = `${BASE}/hero-ads.webp`
const mDash = `${BASE}/hero-m-dash.webp`
const mUe = `${BASE}/hero-m-ue.webp`
const mUeOpen = `${BASE}/hero-m-ue-open.webp`
const mUeOpenOz = `${BASE}/hero-m-ue-open-oz.webp`
const mAds = `${BASE}/hero-m-ads.webp`
const mNavDash = `${BASE}/hero-m-nav-dash.webp`
const mNavUe = `${BASE}/hero-m-nav-ue.webp`
const mNavAds = `${BASE}/hero-m-nav-ads.webp`

export const DESK_SRC: Record<DeskLayerKey, string> = { dash, dashDetails, ue, ueOpen, ads }
export const PHONE_SRC: Record<PhoneLayerKey | PhoneNavKey, string> = {
  mDash,
  mUe,
  mUeOpen,
  mUeOpenOz,
  mAds,
  mNavDash,
  mNavUe,
  mNavAds,
}

/** Прозрачный 1×1: запасной src у <picture>. Десктопные снимки <source media> качает только от 768 px, телефонные — всегда. */
export const BLANK =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export const DESK_MEDIA = '(min-width: 768px)'
