'use client'
import { ReactNode, useState } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { Reveal } from '@/components/Motion'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="pt-24 pb-16 sm:pt-28">
      {/* Editorial section header */}
      <Reveal>
        <div className="flex items-baseline justify-between border-b-[3px] border-[#1b2d4e] pb-3 dark:border-[#8fa7cc]">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#1b2d4e] sm:text-4xl md:text-5xl dark:text-gray-100">
            Обо мне
          </h1>
          <span className="hidden text-sm font-medium tracking-widest text-[#1b2d4e]/50 uppercase sm:block dark:text-[#8fa7cc]/60">
            Биография
          </span>
        </div>
      </Reveal>

      {/* Two-column layout */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] lg:gap-16">
        {/* Left column — photo + info */}
        <Reveal direction="left">
          <div className="flex flex-col items-center md:items-start">
            {avatar && (
              <button
                type="button"
                className="group relative flex cursor-pointer flex-col items-center border-none bg-transparent p-0 outline-none"
                onClick={() => setIsVideoPlaying(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setIsVideoPlaying(true)
                  }
                }}
                aria-label="Воспроизвести анимированный аватар"
              >
                <div
                  className={`relative aspect-[3/4] w-full max-w-[280px] overflow-hidden transition-all duration-500 ${
                    !isVideoPlaying
                      ? 'group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#1b2d4e]/10'
                      : ''
                  }`}
                >
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={280}
                    height={373}
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
                  {/* Gradient fade at bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f5f2ed] to-transparent dark:from-[#111110]" />
                </div>
              </button>
            )}

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-[#1b2d4e] dark:text-gray-100">
              {name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#1b2d4e]/60 dark:text-[#8fa7cc]/80">
              {occupation}
            </p>
            <p className="text-sm text-[#1b2d4e]/60 dark:text-[#8fa7cc]/80">{company}</p>

            <div className="mt-5 flex space-x-3">
              {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />}
              {github && <SocialIcon kind="github" href={github} size={5} />}
              {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={5} />}
              {twitter && <SocialIcon kind="telegram" href={twitter} size={5} />}
            </div>
          </div>
        </Reveal>

        {/* Right column — MDX content */}
        <Reveal delay={0.2}>
          <div className="prose prose-neutral dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[#1b2d4e] dark:prose-headings:text-gray-100 prose-a:text-[#1b2d4e] prose-a:underline-offset-2 dark:prose-a:text-[#8fa7cc] max-w-none">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
