import { loadProfile } from "@/lib/content";
import ContactForm from "@/components/contact-form";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";

export const dynamic = "force-dynamic";

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
    <div className="fx-shell fx-shell--narrow">
      <header className="site-pagehead">
        <p className="fx-eyebrow">
          Contact{profile.city ? <><span className="fx-dot" aria-hidden />{profile.city}</> : null}
        </p>
        <h1 className="fx-title">Say hello.</h1>
        <p className="fx-lead mt-4">I’d love to hear from you. Send me a message and I’ll get back to you.</p>
      </header>

      <section aria-labelledby="contact-direct">
        <h2 id="contact-direct" className="sr-only">Direct contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="fx-panel">
            <div className="fx-panel__head">
              <Mail aria-hidden className="size-4 text-ink-faint" />
              <span className="fx-panel__label">Email</span>
            </div>
            <a href={`mailto:${email}`} className="fx-link break-all">{email}</a>
          </div>
          <div className="fx-panel">
            <div className="fx-panel__head">
              <Phone aria-hidden className="size-4 text-ink-faint" />
              <span className="fx-panel__label">Phone</span>
            </div>
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="fx-link">{phone}</a>
          </div>
        </div>
      </section>

      {/* A person writing to me — amber. */}
      <section aria-labelledby="contact-form" className="fx-panel fx-panel--human mt-6">
        <div className="fx-panel__head">
          <span className="fx-panel__label">Message</span>
        </div>
        <h2 id="contact-form" className="site-h3 mb-6">Send a message</h2>
        <ContactForm />
      </section>
    </div>
  );
}
