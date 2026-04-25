import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/site-config"
import { Mail, FileText } from "lucide-react"

export default function PressPage() {
  return (
    <PageShell title="Press & media" description="Media contact and brand resources.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>Media contact</h2>
            <a href="mailto:press@newsheadlinepro.com" className="inline-flex items-center gap-2 text-sm font-semibold">
              <Mail className="h-4 w-4 text-[var(--nhp-terra)]" />
              press@newsheadlinepro.com
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Button variant="outline" asChild>
              <Link href="/contact"><FileText className="mr-2 h-4 w-4" />Request brand files</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">&copy; {SITE_CONFIG.name}</p>
    </PageShell>
  )
}
