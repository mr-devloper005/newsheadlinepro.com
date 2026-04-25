import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { PricingFaq } from '@/components/press/pricing-faq'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Basic',
    price: '$199',
    period: '/ month',
    blurb: 'Ideal for a steady stream of product and company news.',
    popular: false,
    cta: 'Get started',
    href: '/register',
    features: [
      { label: 'Distribution', value: 'National digital + core categories' },
      { label: 'Analytics', value: 'Read counts, referrers' },
      { label: 'Media reach', value: 'Editorial + trade desk surfaces' },
    ],
  },
  {
    name: 'Pro',
    price: '$449',
    period: '/ month',
    blurb: 'The sweet spot for teams that issue weekly releases and need data.',
    popular: true,
    cta: 'Start Pro trial',
    href: '/register',
    features: [
      { label: 'Distribution', value: 'Pro verticals + industry beats' },
      { label: 'Analytics', value: 'Engagement, geography, and audience segments' },
      { label: 'Media reach', value: 'Expanded pick-up signals + follow-up list' },
    ],
  },
  {
    name: 'Premium',
    price: 'Custom',
    period: '',
    blurb: 'For agencies and public companies with a busy release calendar.',
    popular: false,
    cta: 'Talk to sales',
    href: '/contact?topic=pricing',
    features: [
      { label: 'Distribution', value: 'Multi-region + custom syndication' },
      { label: 'Analytics', value: 'API exports, dashboards, and SLA reporting' },
      { label: 'Media reach', value: 'Strategic support and scheduling' },
    ],
  },
] as const

const comparisonRows = [
  { f: 'Distribution', basic: 'National digital + core', pro: 'Vertical beats + more categories', prem: 'Custom + multi-region' },
  { f: 'Analytics', basic: 'Read & referrer basics', pro: 'Segments, geography, engagement', prem: 'API + dashboards' },
  { f: 'Media reach', basic: 'Editorial surfaces', pro: 'Pick-up + outreach lists', prem: 'Strategic desk' },
] as const

const addons = [
  { t: 'Multimedia wire pack', d: 'Embeds, video poster frames, and gallery module on your release page.' },
  { t: 'Industry boost', d: 'Temporary additional category placement for a launch or conference window.' },
  { t: 'Calendar & embargo tools', d: 'Schedule filing times and share embargoed previews with your reviewers.' },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing and distribution',
    description: 'Plans, distribution tiers, and add-ons for press release distribution on Newsheadlinepro.',
  })
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-50/80 text-stone-900">
      <NavbarShell />
      <div className="border-b border-stone-200/80 bg-gradient-to-b from-white to-stone-50/60 py-12 text-center sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">Transparent tiers</p>
        <h1
          className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Pricing built around how often you file
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-600 sm:text-base">
          All plans work with the same archive and {SITE_CONFIG.name} media surfaces. Upgrade when your cadence and
          reporting needs grow.
        </p>
        <div className="mt-4 inline-flex rounded-md border border-stone-200/80 bg-amber-50/40 px-3 py-1 text-xs font-medium text-stone-700">
          Pro is the most common choice for active newsrooms
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-6 shadow-sm transition ${
                plan.popular
                  ? 'border-[var(--nhp-terra)] bg-white shadow-md ring-2 ring-[var(--nhp-terra)]/20'
                  : 'border-stone-200/80 bg-white/90'
              }`}
            >
              {plan.popular ? (
                <span className="w-fit rounded-full bg-[var(--nhp-terra)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-900">
                  Popular
                </span>
              ) : null}
              <h2 className="mt-1 text-lg font-bold">{plan.name}</h2>
              <p className="mt-2 min-h-10 text-sm text-stone-600">{plan.blurb}</p>
              <p className="mt-4 flex items-baseline gap-0.5">
                <span className="text-3xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {plan.price}
                </span>
                <span className="text-sm text-stone-500">{plan.period}</span>
              </p>
              <ul className="mt-5 grow space-y-2 text-sm text-stone-700">
                {plan.features.map((x) => (
                  <li key={x.label} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--nhp-terra)]" />
                    <span>
                      <span className="font-medium text-stone-900">{x.label}:</span> {x.value}
                    </span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Plan comparison
          </h2>
          <p className="mt-1 text-sm text-stone-600">A quick look at the three dimensions most teams care about.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200/80">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="bg-stone-100/80 text-xs font-bold uppercase tracking-widest text-stone-500">
                  <th className="p-3">Capability</th>
                  <th className="p-3">Basic</th>
                  <th className="p-3">Pro</th>
                  <th className="p-3">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.f} className="border-t border-stone-200/80">
                    <td className="p-3 font-medium text-stone-800">{row.f}</td>
                    <td className="p-3 text-stone-600">{row.basic}</td>
                    <td className="p-3 text-stone-800">{row.pro}</td>
                    <td className="p-3 text-stone-600">{row.prem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Add-ons
          </h2>
          <p className="mt-1 text-sm text-stone-600">Layer on capabilities without moving to a new plan mid-quarter.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {addons.map((a) => (
              <li key={a.t} className="rounded-xl border border-stone-200/80 bg-white p-4 text-sm text-stone-600">
                <p className="font-semibold text-stone-900">{a.t}</p>
                <p className="mt-1">{a.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <PricingFaq />
      </main>
      <Footer />
    </div>
  )
}
