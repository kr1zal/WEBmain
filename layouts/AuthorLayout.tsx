'use client'
import { ReactNode, useState } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Обо мне
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
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
                  className={`relative h-48 w-48 overflow-hidden rounded-full transition-all duration-300 ${!isVideoPlaying ? 'group-hover:ring-primary-500/50 group-hover:scale-105 group-hover:ring-4' : ''}`}
                >
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={192}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                  {isVideoPlaying && (
                    <video
                      src="/static/images/avatar.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
              </button>
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="telegram" href={twitter} />
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
