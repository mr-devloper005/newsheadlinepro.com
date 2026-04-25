export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '4xxbt3f3st',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Newsheadlinepro',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press release distribution and media reach',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Distribute your news, reach journalists, and build discoverable business profiles for partners and the public.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'newsheadlinepro.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://newsheadlinepro.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
