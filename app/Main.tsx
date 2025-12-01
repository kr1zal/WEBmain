'use client'

import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="flex flex-col space-y-12 px-4 pt-6 pb-12 sm:px-6 lg:px-8"
      >
        {/* Hero Section: Split Layout on Desktop */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-16">
          {/* Left Column: Image */}
          <motion.div
            variants={fadeInUp}
            className="flex w-full justify-center md:w-1/2 md:justify-start"
          >
            <button
              type="button"
              className="group relative flex cursor-pointer flex-col items-center border-none bg-transparent p-0 outline-none"
              onClick={() => setIsVideoPlaying(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsVideoPlaying(true)
                }
              }}
            >
              <div
                className={`relative aspect-[11/14] w-full max-w-xs overflow-hidden rounded-2xl border-4 border-gray-200 shadow-2xl transition-all duration-300 sm:max-w-sm dark:border-gray-800 ${!isVideoPlaying ? 'group-hover:ring-primary-500/50 group-hover:scale-105 group-hover:ring-4' : ''}`}
              >
                <Image
                  src="/static/images/avatar.png"
                  alt="Александр Виноградов"
                  width={550}
                  height={700}
                  className="h-full w-full object-cover object-center"
                  priority
                />
                {isVideoPlaying && (
                  <video
                    src="/static/images/avatar.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 z-10 h-full w-full object-cover object-center"
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                )}
              </div>
            </button>
          </motion.div>

          {/* Right Column: Text & Actions */}
          <div className="flex w-full flex-col items-center space-y-6 text-center md:w-1/2 md:items-start md:text-left">
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
                Александр Виноградов
              </h1>
              <p className="text-primary-600 dark:text-primary-400 mt-4 text-xl font-medium">
                IT Директор | Эксперт E-commerce | Цифровая Трансформация
              </p>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="max-w-lg text-lg leading-7 text-gray-600 dark:text-gray-300"
            >
              Масштабирую бизнес через технологии и данные. <br className="hidden md:block" />
              Рост выручки с 300K до 26M ₽/мес. <br className="hidden md:block" />
              Строю команды, автоматизирую процессы, даю результат.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row"
            >
              <Link
                href="/projects"
                className="bg-primary-600 hover:bg-primary-700 rounded-lg px-8 py-3 text-center text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Смотреть проекты
              </Link>
              <Link
                href="/about"
                className="text-primary-600 border-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 rounded-lg border-2 bg-white px-8 py-3 text-center text-base font-semibold shadow-md transition-all duration-200 hover:shadow-lg dark:bg-transparent dark:hover:bg-gray-800"
              >
                Обо мне
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Competencies Section */}
        <motion.div variants={fadeInUp} className="w-full pt-16">
          <h2 className="mb-10 text-center text-3xl leading-8 font-bold tracking-tight text-gray-900 md:text-left dark:text-gray-100">
            Ключевые компетенции
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
            >
              <h3 className="text-primary-600 dark:text-primary-400 mb-4 text-2xl font-bold">
                Управление
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Команды до 60 человек</li>
                <li>• P&L Ответственность</li>
                <li>• Agile/Scrum Процессы</li>
                <li>• Кризис-менеджмент</li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
            >
              <h3 className="text-primary-600 dark:text-primary-400 mb-4 text-2xl font-bold">
                E-commerce
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Unit-экономика и ROI</li>
                <li>• Маркетплейсы (WB, Ozon)</li>
                <li>• Рост выручки в 87 раз</li>
                <li>• Омниканальная стратегия</li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
            >
              <h3 className="text-primary-600 dark:text-primary-400 mb-4 text-2xl font-bold">
                Tech & AI
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Автоматизация (n8n, Make)</li>
                <li>• React Native (Expo)</li>
                <li>• SQL / PostgreSQL</li>
                <li>• Внедрение AI агентов</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
