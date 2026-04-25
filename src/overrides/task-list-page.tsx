import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import { taskIntroCopy } from '@/config/site.content'
import { PressReleasesListClient, ProfileBrowseClient } from '@/components/press/press-releases-list-client'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 48, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const profileIntro = task === 'profile' ? intro : null
  const prIntro = task === 'mediaDistribution' ? intro : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50/90 to-white text-stone-900">
      <NavbarShell />
      <div className="border-b border-stone-200/80 bg-[#0b1420] py-12 text-center text-white sm:py-16">
        <h1 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
          {task === 'mediaDistribution' ? 'Latest press releases' : taskConfig?.label || 'Directory'}
        </h1>
        {taskConfig?.description ? <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80">{taskConfig.description}</p> : null}
      </div>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {task === 'mediaDistribution' && prIntro ? (
          <div className="mb-8 rounded-2xl border border-stone-200/80 bg-white/80 p-6 sm:p-8">
            {prIntro.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="text-sm text-stone-600">
                {p}
              </p>
            ))}
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
              {prIntro.links.map((l) => (
                <Link key={l.href} href={l.href} className="text-stone-900 hover:underline">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {task === 'profile' && profileIntro ? (
          <div className="mb-8 max-w-3xl border-l-4 border-[var(--nhp-terra)] bg-white/80 py-4 pl-5">
            <h2 className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {profileIntro.title}
            </h2>
            {profileIntro.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="mt-2 text-sm text-stone-600">
                {p}
              </p>
            ))}
          </div>
        ) : null}
        <div className="mb-6 flex flex-col gap-4 border-b border-stone-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <form className="flex flex-wrap items-end gap-3" method="get" action={taskConfig?.route || '/'}>
            <div>
              <label htmlFor="nhp-cat" className="text-[11px] font-bold uppercase text-stone-500">
                Category
              </label>
              <select
                id="nhp-cat"
                name="category"
                defaultValue={normalizedCategory === 'all' ? 'all' : normalizedCategory}
                className="mt-1.5 h-10 min-w-[180px] rounded-md border border-stone-300/80 bg-white px-3 text-sm"
              >
                <option value="all">All</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="h-10 rounded-md bg-stone-900 px-4 text-sm font-semibold text-white">
              Apply
            </button>
          </form>
          {task === 'mediaDistribution' ? (
            <Link href="/search" className="text-sm font-semibold text-[var(--nhp-terra)]">
              Global search
            </Link>
          ) : null}
        </div>
        {task === 'mediaDistribution' ? (
          <PressReleasesListClient task={task} initialPosts={posts} category={normalizedCategory} searchHint="Search…" />
        ) : task === 'profile' ? (
          <ProfileBrowseClient task={task} initialPosts={posts} category={normalizedCategory} />
        ) : (
          <p className="text-sm text-stone-600">Route available. Add override styling for this task if needed.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
