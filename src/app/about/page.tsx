import Link from "next/link"
import Image from "next/image"
import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/site-config"

const values = [
  {
    title: "Clarity over noise",
    description: "Headlines, decks, and body copy stay legible so an announcement does not get lost in heavy UI chrome.",
  },
  {
    title: "Built for filing cadence",
    description: "From one release a quarter to weekly product news, the same template scales without breaking your brand voice.",
  },
  {
    title: "Business context, not just text",
    description: "Profiles and metadata help buyers, journalists, and partners connect the story to a real organization.",
  },
]

const HERO =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&auto=format&fit=crop"

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a press distribution and business profile platform for teams that need a serious public newsroom without enterprise bloat.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[4/3] w-full">
            <Image src={HERO} alt="" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              A newsroom surface for modern comms teams
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.name} began as a response to crowded, template-heavy press pages. The team focused on
              typography, hierarchy, and a distribution archive that feels like a product—not a PDF drop zone.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Today, the same stack supports long-form releases, business profiles, and search-friendly discovery. The
              experience is tuned for comms, marketing, and agency partners who need speed without giving up control.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>· Headquartered in the US with a distributed media desk</li>
              <li>· Security and privacy practices aligned with standard business SaaS expectations</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} className="border-border bg-card">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
