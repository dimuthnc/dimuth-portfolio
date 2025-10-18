import Link from "next/link";
import { loadProfile } from "@/lib/content";
import ContactForm from "@/components/contact-form";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact";
  const description = "Get in touch with Dimuth Menikgamage. Send a message or reach out via email or phone.";
  const url = canonical("/contact");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${title} — Dimuth Menikgamage` }] },
    twitter: { card: "summary_large_image", title, description, images: [defaultOgImage] },
  };
}

export default async function ContactPage() {
  const profile = await loadProfile();
  const email = profile.email;
  const phone = profile.phone;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
        <p className="text-sm text-muted-foreground">I’d love to hear from you. Send me a message and I’ll get back to you.</p>
      </header>

      <section aria-labelledby="contact-direct">
        <h2 id="contact-direct" className="sr-only">Direct contact</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`mailto:${email}`}
            className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail className="size-5 text-muted-foreground group-hover:text-foreground" />
            <span className="text-sm">
              <span className="block text-xs text-muted-foreground">Email</span>
              <span className="font-medium">{email}</span>
            </span>
          </Link>
          <Link
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Phone className="size-5 text-muted-foreground group-hover:text-foreground" />
            <span className="text-sm">
              <span className="block text-xs text-muted-foreground">Phone</span>
              <span className="font-medium">{phone}</span>
            </span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="contact-form">
        <h2 id="contact-form" className="text-lg font-semibold tracking-tight">Send a message</h2>
        <div className="rounded-lg border p-4">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
