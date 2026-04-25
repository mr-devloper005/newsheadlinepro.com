import Link from 'next/link'
import { Check, FileText, Newspaper } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

const benefits = [
  'File and review press releases in one place',
  'Match your public newsroom to your brand voice',
  'Connect distribution with business profile surfaces',
]

export function LoginPageOverride() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100/80 to-[#faf8f5] text-stone-900">
      <NavbarShell />
      <div className="border-b border-stone-900/10 bg-[var(--nhp-hero)] py-10 text-center sm:py-12">
        <h1
          className="text-2xl font-semibold text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Sign in
        </h1>
        <p className="mt-2 text-sm text-white/80">
          Welcome back to {SITE_CONFIG.name} &mdash; {siteContent.navbar.tagline.toLowerCase()}
        </p>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="order-2 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_20px_50px_rgba(28,25,23,0.06)] sm:p-8 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Account</p>
            <form className="mt-6 space-y-4" method="post" action="#">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-stone-700">
                  Email
                </Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-12 rounded-md border-stone-300/80 bg-stone-50/50 text-stone-900 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-stone-700">
                  Password
                </Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 rounded-md border-stone-300/80 bg-stone-50/50 text-stone-900 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <Button
                type="button"
                className="h-12 w-full rounded-md border-0 bg-[var(--nhp-terra)] font-semibold text-stone-900 hover:brightness-105 sm:max-w-xs"
              >
                Sign in
              </Button>
            </form>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/forgot-password"
                className="font-medium text-[var(--nhp-gold)] hover:text-[var(--nhp-terra)] hover:underline"
              >
                Forgot password?
              </Link>
              <Link
                href="/register"
                className="font-semibold text-stone-900 decoration-[#D29F80] decoration-2 underline-offset-2 hover:underline"
              >
                Create account
              </Link>
            </div>
          </div>

          <aside
            className="order-1 space-y-5 rounded-2xl border border-stone-200/80 p-6 lg:order-2 lg:sticky lg:top-24"
            style={{ background: 'color-mix(in srgb, var(--nhp-gold) 8%, white)' }}
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/80 text-[#97866A] shadow-sm">
              <FileText className="h-5 w-5" style={{ color: 'var(--nhp-gold)' }} />
            </div>
            <h2
              className="text-lg font-semibold text-stone-900 sm:text-xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Promote your business
            </h2>
            <p className="text-sm leading-relaxed text-stone-600">
              Distribute company news, improve discoverability, and keep public profiles consistent with the story you
              are telling the market.
            </p>
            <ul className="space-y-3 text-sm text-stone-700">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'color-mix(in srgb, #D29F80 20%, white)' }}
                  >
                    <Check className="h-3 w-3" style={{ color: 'var(--nhp-terra)' }} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="border-t border-stone-200/60 pt-4 text-xs text-stone-500">
              <Newspaper className="mb-1 inline h-3.5 w-3.5" style={{ color: 'var(--nhp-terra)' }} /> Need access for your
              team?{' '}
              <Link href="/contact" className="font-medium text-stone-800 hover:underline">
                Contact the desk
              </Link>
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
