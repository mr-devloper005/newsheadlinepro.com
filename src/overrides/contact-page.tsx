import Image from 'next/image'
import Link from 'next/link'
import { Building2, Clock, Mail, Phone } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const OFFICE =
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1200&q=80&auto=format&fit=crop'

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-stone-50/80 text-stone-900">
      <NavbarShell />
      <div className="border-b border-stone-200/80 bg-white py-12 text-center sm:py-16">
        <h1 className="text-3xl font-semibold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
          Contact us
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-600 sm:text-base">
          Distribution questions, media requests, and account help for {SITE_CONFIG.name}.
        </p>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-8">
            <form className="space-y-4">
              <p className="text-sm text-stone-500">
                Connect this form to your support endpoint. Visual layout only.
              </p>
              <div>
                <Label htmlFor="n">Contact name</Label>
                <Input id="n" name="name" className="mt-1.5" placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="e">Email</Label>
                <Input id="e" name="email" type="email" className="mt-1.5" placeholder="you@company.com" />
              </div>
              <div>
                <Label htmlFor="p">Phone</Label>
                <Input id="p" name="phone" type="tel" className="mt-1.5" placeholder="Optional" />
              </div>
              <div>
                <Label htmlFor="orgType">Organization</Label>
                <select
                  id="orgType"
                  name="orgType"
                  className="mt-1.5 flex h-10 w-full rounded-md border border-stone-300/80 bg-white px-3 text-sm"
                >
                  <option value="">Select</option>
                  <option value="media">Media</option>
                  <option value="company">Company</option>
                  <option value="agency">Agency</option>
                </select>
              </div>
              <div>
                <Label htmlFor="subj">Subject</Label>
                <select id="subj" name="subject" className="mt-1.5 flex h-10 w-full rounded-md border border-stone-300/80 bg-white px-3 text-sm">
                  <option value="">How can we help?</option>
                  <option value="dist">Press distribution</option>
                  <option value="profile">Profile</option>
                </select>
              </div>
              <div>
                <Label htmlFor="m">Message</Label>
                <Textarea id="m" name="message" className="mt-1.5 min-h-[160px]" />
              </div>
              <Button type="button" className="w-full bg-stone-900 sm:w-auto">
                Send
              </Button>
            </form>
          </div>
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-stone-200/80">
              <div className="relative h-44 w-full">
                <Image src={OFFICE} alt="Office" fill className="object-cover" sizes="400px" />
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-stone-200/80 bg-white p-6 text-sm text-stone-700">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Hours</h2>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--nhp-terra)]" />
                Mon–Fri, 9–6 ET
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--nhp-terra)]" />
                <a href="tel:+18005550199" className="font-medium">+1 (800) 555-0199</a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-[var(--nhp-terra)]" />
                <a href="mailto:press@newsheadlinepro.com" className="font-medium">press@newsheadlinepro.com</a>
              </p>
              <p className="flex items-start gap-2 text-stone-600">
                <Building2 className="mt-0.5 h-4 w-4 text-[var(--nhp-terra)]" />
                1200 Market Street, New York, NY
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200/80 bg-[#0b1420] p-6 text-center text-white">
              <p className="text-sm">Need quick answers?</p>
              <Link href="/help" className="mt-2 inline-block rounded border border-white/20 px-4 py-2 text-sm font-semibold">FAQs</Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
