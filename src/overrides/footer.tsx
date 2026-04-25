import Link from 'next/link'
import { FileText, User, Search, HelpCircle, FileEdit } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const col = {
  distribution: [
    { label: 'Submit press release', href: '/create/mediaDistribution', icon: FileEdit },
    { label: 'Press archive', href: '/updates', icon: FileText },
    { label: 'Pricing', href: '/pricing', icon: null },
  ],
  account: [
    { label: 'Create account', href: '/register', icon: null },
    { label: 'Sign in', href: '/login', icon: null },
    { label: 'Business profiles', href: '/profile', icon: User },
    { label: 'Post a profile', href: '/create/profile', icon: null },
  ],
  resources: [
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Help', href: '/help', icon: HelpCircle },
    { label: 'Status', href: '/status', icon: null },
    { label: 'Press kit', href: '/press', icon: null },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const

export function FooterOverride() {
  const y = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-[#0a1218] text-white">
      <div
        className="pointer-events-none h-20 bg-[length:400px] bg-bottom bg-no-repeat opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='60' viewBox='0 0 400 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 45 L40 32 L80 40 L120 25 L160 35 L200 20 L240 32 L280 28 L320 15 L360 30 L400 20 L400 60 L0 60Z' fill='%23ffffff' fill-opacity='0.06'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Press distribution</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {col.distribution.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="inline-flex items-center gap-2 transition hover:text-[var(--nhp-terra)]">
                    {l.icon ? <l.icon className="h-3.5 w-3.5 text-[var(--nhp-terra)]" /> : null}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Account</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {col.account.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="inline-flex items-center gap-2 transition hover:text-[var(--nhp-terra)]">
                    {l.icon ? <l.icon className="h-3.5 w-3.5" /> : null}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {col.resources.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="inline-flex items-center gap-2 transition hover:text-[var(--nhp-terra)]">
                    {l.icon ? <l.icon className="h-3.5 w-3.5" /> : null}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {col.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[var(--nhp-terra)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/50">{siteContent.footer.tagline}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {y} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-white/70">
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
