export const dynamic = "force-static";

import { loadProfile } from "@/lib/content";
import { Hero } from "@/components/hero";
import type { Metadata } from "next";
import { defaultOgImage, canonical } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await loadProfile();
  const title = `${profile.name}`;
  const description = profile.bio;
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${profile.name} — Portfolio`,
        },
      ],
      type: "profile",
      firstName: profile.name.split(" ")[0],
      lastName: profile.name.split(" ").slice(1).join(" ") || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  };
}

export default async function Home() {
  const profile = await loadProfile();
  const sameAs = [profile.links.linkedin, profile.links.github].filter(Boolean);
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: canonical("/"),
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
      addressCountry: "SG",
    },
  };
  return (
    <>
      <Hero profile={profile} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </>
  );
}
