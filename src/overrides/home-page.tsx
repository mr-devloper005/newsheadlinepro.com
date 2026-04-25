import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Newspaper, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { getHomeEditorialMockPosts, mergeEditorialPostsForHome } from '@/lib/home-editorial-mock'
import { siteContent } from '@/config/site.content'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const WIRE_MOCKUP =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000&q=80&auto=format&fit=crop'
const PROFILE_MOCKUP =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80&auto=format&fit=crop'
function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the release for the full update.'
  return value.length > 160 ? value.slice(0, 157).trimEnd() + '…' : value
}

function getCategoryLabel(post: SitePost) {
  if (post.content && typeof post.content === 'object') {
    const c = (post.content as { category?: string }).category
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return 'Press'
}

const heroPoints = [
  'Boost business visibility in search, trade press, and partner inboxes',
  'Improve brand recognition with consistent, publish-ready pages',
  'Gain exposure in category feeds journalists actually scan',
]

const testimonials = [
  {
    quote:
      'We cut review cycles in half. Our releases read clean, and the business profile makes follow-up with reporters painless.',
    name: 'Avery Collins',
    role: 'Head of Communications, B2B SaaS',
  },
  {
    quote:
      'The distribution surface feels like a product, not a doc dump. The archive makes older announcements easy to reference.',
    name: 'Miguel Raza',
    role: 'PR Lead, Health Technology',
  },
  {
    quote:
      'Finally, a press hub that looks credible on mobile. Our team posts once and the same story works everywhere we link it.',
    name: 'Sonia Patel',
    role: 'Founder, Climate Hardware',
  },
]

export async function HomePageOverride() {
  const raw = await fetchTaskPosts('mediaDistribution', 20, { fresh: true, revalidate: 120 })
  const posts =
    raw.length > 0
      ? raw
      : mergeEditorialPostsForHome([], getHomeEditorialMockPosts(), 12)
  const recent = posts.slice(0, 5)
  const categoryPreview = CATEGORY_OPTIONS.slice(0, 12)
  const updatesPath = '/updates'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[var(--nhp-hero)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(210, 159, 128, 0.22), transparent 32%), radial-gradient(circle at 80% 10%, rgba(100, 140, 200, 0.18), transparent 28%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,16,0.1)_0%,rgba(6,10,16,0.75)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `repeating-linear-gradient(-12deg, transparent, transparent 48px, rgba(255,255,255,0.06) 48px, rgba(255,255,255,0.06) 49px)`,
          }}
        />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="nhp-fade-in text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            {siteContent.navbar.tagline}
          </p>
          <h1 className="nhp-fade-up mt-6 text-4xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            Distribute your news everywhere
          </h1>
          <p className="nhp-fade-up mt-5 text-lg text-white/85" style={{ animationDelay: '0.08s' }}>
            Reach online channels and traditional media with structured releases, discoverable business profiles, and
            a reading experience built for newsrooms.
          </p>
          <ul className="nhp-fade-up mx-auto mt-10 max-w-xl list-none space-y-3 text-left text-sm text-white/80 sm:text-base" style={{ animationDelay: '0.12s' }}>
            {heroPoints.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Check className="h-3.5 w-3.5 text-[var(--nhp-terra)]" />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div
            className="nhp-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '0.16s' }}
          >
            <Link
              href="/create/mediaDistribution"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md bg-[var(--nhp-terra)] px-6 py-3.5 text-sm font-semibold text-stone-900 shadow-lg shadow-black/20 transition hover:brightness-105"
            >
              Submit press release
            </Link>
            <Link
              href="/create/profile"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Post your profile
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="nhp-fade-up order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--nhp-muted-ink)]">Press release distribution</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                From draft to a publish-ready page journalists can scan in seconds
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--nhp-muted-ink)]">
                Structure your lead, embed supporting media, and file into the archive with categories that make it
                easier for buyers and media to find the right story.
              </p>
              <Link
                href="/updates"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-stone-900 underline decoration-[var(--nhp-terra)] decoration-2 underline-offset-4 transition hover:decoration-stone-900"
              >
                See how releases look <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="nhp-fade-up order-1 flex justify-center lg:order-2">
              <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-stone-100/80 p-2 shadow-[0_28px_64px_rgba(15,23,42,0.12)]">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={WIRE_MOCKUP}
                    alt="Editor reviewing a distributed press document"
                    width={800}
                    height={540}
                    className="h-auto w-full object-cover"
                    priority
                    sizes="(min-width: 1024px) 28rem, 100vw"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-lg border border-border/80 bg-white/95 px-3 py-2 text-xs font-medium text-stone-700 shadow-md">
                  <Newspaper className="h-4 w-4 text-[var(--nhp-gold)]" />
                  Live in archive
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f0eb] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="nhp-fade-up flex justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--nhp-gold)_28%,white)] bg-white p-2 shadow-[0_24px_56px_rgba(20,18,16,0.1)]">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={PROFILE_MOCKUP}
                    alt="Team building a public business profile"
                    width={800}
                    height={520}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 28rem, 100vw"
                  />
                </div>
                <div className="absolute -left-2 top-4 flex items-center gap-2 rounded-r-lg border border-stone-200/90 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm">
                  <Users className="h-3.5 w-3.5 text-[var(--nhp-terra)]" />
                  Public profile
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--nhp-muted-ink)]">Business profile</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                A credible home for the company behind the news
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--nhp-muted-ink)]">
                Pair every announcement with a profile that answers who you are, what you do, and how to reach a real
                person—before the inbox even opens.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/create/profile"
                  className="inline-flex items-center justify-center rounded-md border border-stone-300/90 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-stone-400"
                >
                  Create profile
                </Link>
                <Link href="/profile" className="text-sm font-semibold text-stone-700 underline-offset-4 hover:underline">
                  View directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-stone-100/80 py-12 sm:py-16">
        <p className="nhp-fade-in mx-auto max-w-3xl text-center text-lg font-medium leading-relaxed text-stone-800 sm:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          Over 250,000 companies, from startups to global brands, have trusted a distribution-first platform like ours to
          get their story in front of the right readers.
        </p>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--nhp-muted-ink)]">Client success</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              Client success stories
            </h2>
            <p className="mt-2 text-sm text-[var(--nhp-muted-ink)]">Outcomes from teams using structured press surfaces.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-border/90 bg-stone-50/80 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm leading-relaxed text-stone-800">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 text-xs text-[var(--nhp-muted-ink)]">
                  <p className="font-semibold text-stone-900">{t.name}</p>
                  <p>{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-stone-50/90 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="mb-2 h-1 w-14 rounded-full bg-[var(--nhp-terra)]" />
              <h2 className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Recent press releases
              </h2>
              <ul className="mt-8 divide-y divide-border/90 border-y border-border/80">
                {recent.map((post) => (
                  <li key={post.id} className="group py-4 first:pt-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                      {getCategoryLabel(post)}
                    </p>
                    <Link
                      href={`${updatesPath}/${post.slug}`}
                      className="mt-1 block text-lg font-semibold text-stone-900 transition group-hover:text-[var(--nhp-terra)]"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-2 line-clamp-2 text-sm text-stone-600">{excerpt(post.summary)}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/updates"
                className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-stone-300/90 bg-white px-4 py-2.5 text-sm font-semibold sm:w-auto"
              >
                View all press releases
              </Link>
            </div>

            <div className="space-y-10">
              <div className="rounded-2xl border border-border/90 bg-white p-6 sm:p-8">
                <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  For journalists
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Use our archive and categories to follow companies on your beat. Request clarifications, logos, or
                  executive availability through a single contact path.
                </p>
                <Link
                  href="/contact?topic=press"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-900"
                >
                  Media desk
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-2xl border border-border/80 bg-stone-100/60 p-6 sm:p-8">
                <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  News by category
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {categoryPreview.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/updates?category=${c.slug}`}
                        className="text-sm text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/updates?category=all"
                  className="mt-5 inline-block text-sm font-semibold text-stone-900"
                >
                  View all categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Distribute the next update from {SITE_CONFIG.name}
          </h2>
          <p className="mt-2 text-sm text-stone-600">Submit a new release or publish a business profile in minutes.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/create/mediaDistribution"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md bg-stone-900 px-6 py-3.5 text-sm font-semibold text-stone-50 transition hover:bg-stone-800"
            >
              Submit press release
            </Link>
            <Link
              href="/create/profile"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md border-2 border-[var(--nhp-terra)] bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-50"
            >
              Post your profile
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
