import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press & media distribution',
  },
  footer: {
    tagline: 'Distribute your news with clarity and reach',
  },
  hero: {
    badge: 'Press distribution',
    title: ['Distribute your news everywhere'],
    description:
      'Reach online channels and traditional media with structured releases, discoverable business profiles, and a reading experience designed for newsrooms and buyers.',
    primaryCta: {
      label: 'View press releases',
      href: '/updates',
    },
    secondaryCta: {
      label: 'Post your profile',
      href: '/create/profile',
    },
    searchPlaceholder: 'Search press releases and topics',
    focusLabel: 'Headlines',
    featureCardBadge: 'Distribution',
    featureCardTitle: 'Your announcement stays scannable in archive and search.',
    featureCardDescription:
      'Use categories, structured summaries, and supporting media to help journalists and partners understand the story quickly.',
  },
  home: {
    metadata: {
      title: 'Press release distribution and media newsroom',
      description:
        'Distribute press releases, reach journalists, and share business updates with a modern, editorial presentation.',
      openGraphTitle: 'Press release distribution and media newsroom',
      openGraphDescription:
        'Publish and distribute company news, announcements, and business profiles in one place.',
      keywords: [
        'press release',
        'media distribution',
        'company news',
        'business profile',
        'public relations',
        'newsroom',
        'announcements',
      ],
    },
    introBadge: 'What we do',
    introTitle: 'Built for announcements people actually read.',
    introParagraphs: [
      'Newsheadlinepro is structured for fast scanning: clear titles, clean article pages, and business surfaces that make follow-up easy.',
      'Whether you are issuing product news or updating partners, the same system keeps the story consistent across discovery and long-form reading.',
    ],
    sideBadge: 'Why teams use it',
    sidePoints: [
      'Press release archive with category-aware browsing.',
      'Authoritative article layout with media support.',
      'Public business profiles to complement your releases.',
      'A calm SaaS experience that does not get in the way of the copy.',
    ],
    primaryLink: {
      label: 'Browse press releases',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Media contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Next step',
    title: 'Ready to file your next story?',
    description:
      'Start a new release, refresh your business profile, or talk with the team about distribution and formatting.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Submit a release',
      href: '/create/mediaDistribution',
    },
  },
  taskSectionHeading: 'Latest from the newsroom',
  taskSectionDescriptionSuffix: 'The newest distributed updates and media posts.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Business profiles',
    description: 'Explore public company and organization profiles linked to the newsroom.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Latest press releases',
    description: 'Browse the archive of company announcements, media advisories, and product news.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: {
    title: 'Business profiles',
    paragraphs: [
      'Each profile is a public surface: who you are, what you do, and how to reach the right people.',
      'Pair profiles with your press program so journalists and partners can move from a headline to a trusted contact in one step.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Create profile', href: '/create/profile' },
    ],
  },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press release archive',
    paragraphs: [
      'Browse issued announcements, advisories, and long-form company updates in a single, consistent reading view.',
      'Filter by category when you are researching a market, beat, or time window.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
