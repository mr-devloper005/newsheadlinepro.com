'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'
import { NavbarAuthControls } from '@/components/shared/navbar-auth-controls'

export const NAVBAR_OVERRIDE_ENABLED = true

const supportLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)
  const taskNav = [enabled.find((t) => t.key === 'mediaDistribution'), enabled.find((t) => t.key === 'profile')].filter(
    (t): t is (typeof enabled)[number] => Boolean(t)
  )
  const navItems = [
    ...taskNav.map((t) => ({ label: t.label, href: t.route, id: t.key })),
    ...supportLinks.map((l) => ({ ...l, id: l.href })),
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--nhp-hero)] text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="border-b border-white/5 bg-[var(--nhp-hero-deep)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-3 px-4 py-2.5 text-[13px] sm:px-6">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-white/90 hover:bg-white/10" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="h-8 border border-white/20 bg-white/10 text-white hover:bg-white/15" asChild>
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          )}
          <Button
            size="sm"
            className="h-8 bg-[var(--nhp-terra)] font-semibold text-stone-900 shadow-sm hover:brightness-105"
            asChild
          >
            <Link href="/create/mediaDistribution">Submit press release</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 p-0.5">
              <img src="/favicon.png?v=20260401" alt="" className="h-8 w-8 object-contain" width="32" height="32" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-[-0.02em] text-white md:text-base">{SITE_CONFIG.name}</span>
              <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-white/50 sm:block">
                {siteContent.navbar.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href.length > 1 && pathname.startsWith(`${item.href}/`))
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition',
                    isActive ? 'bg-white/12 text-white' : 'text-white/80 hover:bg-white/8 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Button variant="ghost" size="icon" className="ml-1 text-white hover:bg-white/10" asChild>
              <Link href="/search" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <Button variant="ghost" size="icon" className="text-white" asChild>
              <Link href="/search" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0a1420] px-4 py-4 md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn('block rounded-lg px-3 py-3 text-sm font-semibold', isActive ? 'bg-white/10' : 'text-white/85')}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
