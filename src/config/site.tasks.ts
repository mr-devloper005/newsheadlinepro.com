export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press releases',
    route: '/updates',
    description: 'Distribute announcements, product news, and media coverage.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
  {
    key: 'profile',
    label: 'Business profiles',
    route: '/profile',
    description: 'Company pages with contact points and credibility signals for journalists and partners.',
    contentType: 'profile',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
  profile: '/profile',
} as const
