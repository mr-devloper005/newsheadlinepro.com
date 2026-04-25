'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const items = [
  {
    q: 'What is included in every plan?',
    a: 'All plans include structured press pages, author metadata, and access to the public archive. Higher tiers add analytics, expanded distribution categories, and priority support.',
  },
  {
    q: 'How does distribution differ from the Basic plan?',
    a: 'Basic targets core newsroom categories. Pro and Premium increase syndication-style reach and reporting depth, with Premium offering the strongest multi-channel reach and add-on flexibility.',
  },
  {
    q: 'Can I add multimedia or wire add-ons later?',
    a: 'Yes. You can add multimedia packs, industry vertical boosts, and calendar slots without changing your base contract—billed as add-ons.',
  },
  {
    q: 'How do I cancel or change plans?',
    a: 'Contact the desk with your account email. Downgrades and upgrades are prorated to the next billing period unless otherwise agreed in writing.',
  },
]

export function PricingFaq() {
  return (
    <section className="mt-20 border-t border-stone-200/80 pt-12">
      <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="mt-6 w-full">
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-stone-200/80">
            <AccordionTrigger className="text-left text-sm font-semibold sm:text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-stone-600">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
