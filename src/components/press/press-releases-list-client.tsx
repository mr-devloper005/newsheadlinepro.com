'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ContentImage } from '@/components/shared/content-image'
import { buildPostUrl } from '@/lib/task-data'
import { normalizeCategory, isValidCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { getLocalPostsForTask } from '@/lib/local-posts'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stripHtml = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

type Range = 'all' | '7d' | '30d' | '90d'

function inRange(publishedAt: string | null | undefined, r: Range) {
  if (r === 'all' || !publishedAt) return true
  const t = new Date(publishedAt).getTime()
  if (Number.isNaN(t)) return true
  const now = Date.now()
  const d = (now - t) / 864e5
  if (r === '7d') return d <= 7
  if (r === '30d') return d <= 30
  if (r === '90d') return d <= 90
  return true
}

function getImageUrl(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const m = media.find((x) => x?.url)?.url
  if (m) return m
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  if (typeof c.image === 'string') return c.image
  if (Array.isArray(c.images) && c.images[0] && typeof c.images[0] === 'string') return c.images[0]
  if (typeof c.logo === 'string') return c.logo
  return '/placeholder.svg?height=400&width=600'
}

export function PressReleasesListClient({
  task,
  initialPosts,
  category,
  searchHint,
}: {
  task: TaskKey
  initialPosts: SitePost[]
  category: string
  searchHint: string
}) {
  const [q, setQ] = useState('')
  const [dateRange, setDateRange] = useState<Range>('all')
  const localPosts = getLocalPostsForTask(task)

  const merged = useMemo(() => {
    const bySlug = new Set<string>()
    const combined: Array<SitePost & { localOnly?: boolean }> = []
    localPosts.forEach((post) => {
      if (post.slug) bySlug.add(post.slug)
      combined.push(post)
    })
    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return
      combined.push(post)
    })

    const normalizedCategory = category ? normalizeCategory(category) : 'all'
    const catFiltered = (() => {
      if (normalizedCategory === 'all') {
        return combined.filter((post) => {
          const content = post.content && typeof post.content === 'object' ? post.content : {}
          const value = typeof (content as { category?: string }).category === 'string' ? (content as { category: string }).category : ''
          return !value || isValidCategory(value)
        })
      }
      return combined.filter((post) => {
        const content = post.content && typeof post.content === 'object' ? post.content : {}
        const value =
          typeof (content as { category?: string }).category === 'string' ? normalizeCategory((content as { category: string }).category) : ''
        return value === normalizedCategory
      })
    })()

    const withRange = catFiltered.filter((p) => inRange(p.publishedAt, dateRange))

    const nq = q.trim().toLowerCase()
    if (!nq) return withRange
    return withRange.filter((post) => {
      const title = (post.title || '').toLowerCase()
      const sum = (post.summary || '').toLowerCase()
      const body = stripHtml(String((post.content as { body?: string } | null)?.body || '')).toLowerCase()
      return title.includes(nq) || sum.includes(nq) || body.includes(nq)
    })
  }, [category, dateRange, initialPosts, localPosts, q, task])

  if (!merged.length) {
    return <div className="rounded-xl border border-dashed border-stone-300/90 bg-white/50 py-12 text-center text-sm text-stone-600">No press releases match these filters yet.</div>
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder={searchHint}
            className="h-12 rounded-md border-stone-300/80 bg-white pl-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Time</span>
          {(
            [
              ['all', 'All'],
              ['7d', '7d'],
              ['30d', '30d'],
              ['90d', '90d'],
            ] as const
          ).map(([val, label]) => (
            <Button
              key={val}
              type="button"
              size="sm"
              variant={dateRange === val ? 'default' : 'outline'}
              className={
                dateRange === val
                  ? 'bg-stone-900 text-white'
                  : 'border-stone-300/80 bg-white text-stone-700'
              }
              onClick={() => setDateRange(val)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {merged.map((post) => {
          const localOnly = (post as { localOnly?: boolean }).localOnly
          const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug)
          const d = post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : ''
          return (
            <Link
              key={post.id}
              href={href}
              className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <ContentImage
                  src={getImageUrl(post)}
                  alt={post.title}
                  fill
                  className="object-cover transition group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex max-w-[85%] truncate rounded-sm bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-800">
                  {String((post.content as { category?: string } | null)?.category || 'Press')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="line-clamp-2 text-base font-semibold text-stone-900 group-hover:text-[var(--nhp-terra)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h2>
                {post.summary ? <p className="mt-2 line-clamp-2 text-sm text-stone-600">{stripHtml(post.summary)}</p> : null}
                <p className="mt-auto pt-3 text-xs text-stone-500">{d}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function ProfileBrowseClient({
  task,
  initialPosts,
  category,
}: {
  task: TaskKey
  initialPosts: SitePost[]
  category: string
}) {
  const [q, setQ] = useState('')

  const localPosts = getLocalPostsForTask(task)

  const merged = useMemo(() => {
    const bySlug = new Set<string>()
    const combined: Array<SitePost & { localOnly?: boolean }> = []
    localPosts.forEach((post) => {
      if (post.slug) bySlug.add(post.slug)
      combined.push(post)
    })
    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return
      combined.push(post)
    })

    const normalizedCategory = category ? normalizeCategory(category) : 'all'
    const catFiltered =
      normalizedCategory === 'all'
        ? combined
        : combined.filter((post) => {
            const content = post.content && typeof post.content === 'object' ? post.content : {}
            const value =
              typeof (content as { category?: string }).category === 'string'
                ? normalizeCategory((content as { category: string }).category)
                : ''
            return value === normalizedCategory
          })

    const nq = q.trim().toLowerCase()
    if (!nq) return catFiltered
    return catFiltered.filter((post) => (post.title || '').toLowerCase().includes(nq) || (post.summary || '').toLowerCase().includes(nq))
  }, [category, initialPosts, localPosts, q])

  if (!merged.length) {
    return <div className="rounded-xl border border-dashed py-10 text-center text-sm text-stone-600">No public profiles in this view yet.</div>
  }

  return (
    <div>
      <div className="mb-6 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-11 pl-9"
            placeholder="Filter by company name"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {merged.map((post) => {
          const localOnly = (post as { localOnly?: boolean }).localOnly
          const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug)
          return (
            <Link
              key={post.id}
              href={href}
              className="flex gap-4 rounded-xl border border-stone-200/90 bg-stone-50/80 p-4 transition hover:border-stone-300 hover:bg-white"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-stone-200/80">
                <ContentImage
                  src={getImageUrl(post)}
                  alt={post.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Profile</p>
                <h2 className="text-lg font-semibold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h2>
                {post.summary ? <p className="mt-1 line-clamp-2 text-sm text-stone-600">{post.summary}</p> : null}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
