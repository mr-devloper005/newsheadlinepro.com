import Link from 'next/link'
import { BarChart2, Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const sideBenefits = [
  'Be found by prospects, journalists, and partners',
  'Increase search and archive visibility for your story',
  'Build trust with a clear business profile alongside releases',
]

export function RegisterPageOverride() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100/80 to-[#faf8f5] text-stone-900">
      <NavbarShell />
      <div className="border-b border-stone-900/10 bg-[var(--nhp-hero)] py-10 text-center sm:py-12">
        <h1
          className="text-2xl font-semibold text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Create your account
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-sm text-white/85">
          Join {SITE_CONFIG.name} to file press releases, manage your company profile, and use the public newsroom.
        </p>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <aside
            className="space-y-4 rounded-2xl border border-stone-200/80 p-5 lg:sticky lg:top-24"
            style={{ background: 'color-mix(in srgb, var(--nhp-terra) 6%, white)' }}
          >
            <div
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border text-[#D29F80]"
              style={{ borderColor: 'color-mix(in srgb, #97866A 35%, white)', background: 'white' }}
            >
              <BarChart2 className="h-6 w-6" style={{ color: 'var(--nhp-terra)' }} />
            </div>
            <h2
              className="text-lg font-semibold"
              style={{ color: 'var(--nhp-gold)', fontFamily: 'var(--font-display)' }}
            >
              Promote your business
            </h2>
            <ul className="space-y-2.5 text-sm leading-relaxed text-stone-700">
              {sideBenefits.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
            <p className="pt-1 text-xs text-stone-600">Plans and add-ons are available on the pricing page when you are ready to scale.</p>
            <Button variant="outline" className="w-full border-stone-300/90 text-stone-900 hover:bg-white" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </aside>

          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_20px_50px_rgba(28,25,23,0.06)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Sign up</p>
            <form className="mt-5 space-y-3" method="post" action="#">
              <div className="space-y-1.5">
                <Label htmlFor="co">Company</Label>
                <Input
                  id="co"
                  name="company"
                  placeholder="Company or organization"
                  className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="em">Email</Label>
                <Input
                  id="em"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ph">Phone</Label>
                <Input
                  id="ph"
                  name="phone"
                  type="tel"
                  placeholder="Optional"
                  className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="web">Website</Label>
                <Input
                  id="web"
                  name="website"
                  type="url"
                  placeholder="https://"
                  className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="un">Username</Label>
                <Input
                  id="un"
                  name="username"
                  autoComplete="username"
                  placeholder="Choose a username"
                  className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="pw1">Password</Label>
                  <Input
                    id="pw1"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pw2">Confirm</Label>
                  <Input
                    id="pw2"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    className="h-11 rounded-md border-stone-300/80 bg-stone-50/40 focus-visible:border-[var(--nhp-gold)] focus-visible:ring-[var(--nhp-gold)]/25"
                  />
                </div>
              </div>
              <p className="pt-1 text-xs leading-relaxed text-stone-500">
                By creating an account, you agree to the{' '}
                <Link href="/terms" className="font-medium text-[var(--nhp-terra)] underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-medium text-[var(--nhp-terra)] underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <Button
                type="button"
                className="h-12 w-full rounded-md border-0 bg-[var(--nhp-terra)] font-semibold text-stone-900 hover:brightness-105"
              >
                Sign up
              </Button>
            </form>
            <p className="mt-5 text-sm text-stone-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-stone-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
