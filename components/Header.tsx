'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Magnetic from './Magnetic'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 flex h-16 items-center transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#c8c2b8] bg-[#f5f2ed]/92 backdrop-blur-xl dark:border-[#2e2a24] dark:bg-[#111110]/92'
          : ''
      }`}
    >
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 sm:px-6 xl:max-w-[1380px] xl:px-12">
        <Magnetic strength={0.35}>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <span className="font-display text-2xl tracking-tight text-[#1b2d4e] dark:text-[#8fa7cc]">
              AV.
            </span>
          </Link>
        </Magnetic>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-8 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Magnetic key={link.title} strength={0.3}>
                  <Link
                    href={link.href}
                    className={`group relative inline-block py-1 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-[#1a1a1a] dark:text-[#e8e4de]'
                        : 'text-[#4a4640] hover:text-[#1a1a1a] dark:text-[#b0aaa0] dark:hover:text-[#e8e4de]'
                    }`}
                  >
                    {link.title}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#1b2d4e] transition-all duration-300 dark:bg-[#8fa7cc] ${
                        isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </Magnetic>
              ))}
          </nav>
          <Magnetic strength={0.35}>
            <ThemeSwitch />
          </Magnetic>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
