import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { CopyLinkButton } from '@/components/press/copy-link-button'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts, getPostImages } from '@/lib/task-data'
import { getTaskConfig, type TaskKey, SITE_CONFIG } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function shareUrls(absolute: string, title: string) {
  const e = encodeURIComponent(absolute)
  const t = encodeURIComponent(title)
  return {
    x: `https://twitter.com/intent/tweet?url=${e}&text=${t}`,
    in: `https://www.linkedin.com/sharing/share-offsite/?url=${e}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${e}`,
  }
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const taskConfig = getTaskConfig(task)
  const route = taskConfig?.route || '/updates'
  const related = (await fetchTaskPosts(task, 12, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 4)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml(
    (typeof content.body === 'string' && content.body) || (post.summary as string) || '',
    'Full body will appear when provided by your publishing workflow.',
  )
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt) || post.summary || null
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null
  const author = (typeof content.author === 'string' && content.author) || post.authorName || 'Editorial'
  const category = typeof content.category === 'string' ? content.category : 'Press'
  const images = getPostImages(post)
  const leadImage = images[0] || '/placeholder.svg?height=640&width=1200'
  const pageUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${buildPostUrl(task, post.slug)}`
  const s = shareUrls(pageUrl, post.title || '')
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt || undefined,
    author: { '@type': 'Person', name: author },
  }

  if (task === 'profile') {
    return (
      <div className="min-h-screen bg-stone-50/90 text-stone-900">
        <NavbarShell />
        <main className="pb-16">
          <div className="border-b border-stone-200/80 bg-gradient-to-b from-amber-50/40 to-stone-100/80 py-8">
            <div className="mx-auto flex max-w-5xl items-start gap-6 px-4 sm:px-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm sm:h-24 sm:w-24">
                <Image
                  src={images[0] || '/placeholder.svg?height=128&width=128'}
                  alt={post.title}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Business profile</p>
                <h1 className="mt-1 text-2xl font-semibold sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h1>
                {subtitle ? <p className="mt-2 text-sm text-stone-600">{subtitle}</p> : null}
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="pt-4 text-sm text-stone-500">
              {dateStr} · {author}
            </p>
            <div className="prose article-content mt-6 max-w-none text-stone-800">
              <RichContent html={html} />
            </div>
            <div className="mt-10 border-t border-stone-200/80 pt-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Related profiles</h2>
              <ul className="mt-3 space-y-2">
                {related.slice(0, 3).map((p) => (
                  <li key={p.id}>
                    <Link href={buildPostUrl('profile', p.slug)} className="font-medium text-stone-900 hover:text-[var(--nhp-terra)]">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50/80 text-stone-900">
      <NavbarShell />
      <SchemaJsonLd data={articleJsonLd} />
      <div className="border-b border-stone-200/80 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 text-left text-sm text-stone-500 sm:px-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="px-1.5">·</span>
          <Link href={route} className="hover:underline">
            {taskConfig?.label}
          </Link>
          <span className="px-1.5">·</span>
          <span className="text-stone-600">{post.title}</span>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-2 inline-flex rounded border border-stone-200/90 bg-amber-50/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-stone-800">
          {category}
        </div>
        <h1
          className="mt-1 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h1>
        {subtitle && subtitle !== post.title ? (
          <p className="mt-3 max-w-2xl text-lg text-stone-600 italic" style={{ fontFamily: 'var(--font-display)' }}>
            {subtitle}
          </p>
        ) : null}
        <p className="mt-4 text-sm text-stone-600">
          {author}
          {dateStr ? <span> · {dateStr}</span> : null}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={s.x}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-stone-200/80 bg-white px-3 py-1.5 text-xs font-medium text-stone-800"
          >
            <Twitter className="h-3.5 w-3.5" />
            X / Twitter
          </a>
          <a
            href={s.in}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-stone-200/80 bg-white px-3 py-1.5 text-xs font-medium text-stone-800"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href={s.fb}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-stone-200/80 bg-white px-3 py-1.5 text-xs font-medium text-stone-800"
          >
            <Facebook className="h-3.5 w-3.5" />
            Facebook
          </a>
          <CopyLinkButton url={pageUrl} />
        </div>

        <div className="relative mt-8 h-[min(52vh,480px)] w-full overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-200/40 shadow-inner">
          <Image
            src={leadImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1152px, 100vw"
            priority
          />
        </div>

        <div className="prose article-content mt-8 max-w-none sm:mt-10">
          <RichContent html={html} />
        </div>

        {related.length ? (
          <section className="mt-14 border-t border-stone-200/80 pt-10">
            <div className="mb-4 h-1 w-12 rounded bg-[var(--nhp-terra)]" />
            <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Related {taskConfig?.label}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.id}>
                  <Link
                    href={buildPostUrl(task, p.slug)}
                    className="block rounded-lg border border-stone-200/80 bg-white p-3 transition hover:border-stone-300"
                  >
                    <span className="text-sm font-medium text-stone-900 line-clamp-2">{p.title}</span>
                    {p.summary ? <span className="mt-1 block line-clamp-1 text-xs text-stone-600">{p.summary}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
