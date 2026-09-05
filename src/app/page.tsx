export const dynamic = "force-static";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { loadBlogs, loadProfile, loadProjects } from "@/lib/content";
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

function shortDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default async function Home() {
  const [profile, posts, projects] = await Promise.all([
    loadProfile(),
    loadBlogs(),
    loadProjects(),
  ]);
  const latest = posts.slice(0, 3);
  const pinned = projects.filter((p) => p.pinned).slice(0, 3);

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
    <div className="fx-shell">
      <div className="py-6 sm:py-10">
        <Hero profile={profile} articleCount={posts.length} />
      </div>

      <div className="mt-16 grid gap-12 border-t border-rule pt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
        {/* Writing — amber, because it is mine. */}
        <section aria-labelledby="home-writing">
          <div className="site-section__head">
            <div>
              <p className="fx-eyebrow fx-eyebrow--human">Writing</p>
              <h2 id="home-writing" className="site-section__title">Latest articles</h2>
            </div>
            <Link href="/blog" className="fx-link inline-flex items-center gap-1 text-small whitespace-nowrap">
              All articles <ArrowRight aria-hidden />
            </Link>
          </div>
          <div className="fx-stack">
            {latest.map((post) => {
              const href = post.type === "internal" ? `/blog/${post.slug}` : post.url;
              const external = post.type === "external";
              return (
                <article key={href} className="fx-panel fx-panel--human">
                  <div className="fx-panel__head">
                    <span className="fx-panel__label">{post.source}</span>
                    <span className="fx-panel__count">{shortDate(post.date)}</span>
                  </div>
                  <h3 className="site-h3">
                    <Link
                      href={href}
                      className="site-titlelink"
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {post.title}
                      {external ? <ExternalLink aria-hidden className="ml-2 inline size-3.5 align-baseline" /> : null}
                    </Link>
                  </h3>
                  <p className="fx-prose mt-2 line-clamp-2">{post.excerpt}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Work — teal, because it is code. */}
        <section aria-labelledby="home-work">
          <div className="site-section__head">
            <div>
              <p className="fx-eyebrow fx-eyebrow--machine">Work</p>
              <h2 id="home-work" className="site-section__title">Pinned projects</h2>
            </div>
            <Link href="/portfolio" className="fx-link inline-flex items-center gap-1 text-small whitespace-nowrap">
              Portfolio <ArrowRight aria-hidden />
            </Link>
          </div>
          <div className="fx-stack">
            {pinned.map((p) => (
              <article key={`${p.kind}:${p.title}`} className="fx-panel fx-panel--machine">
                <div className="fx-panel__head">
                  <span className="fx-panel__label">{p.kind === "repo" ? "Repository" : "Site"}</span>
                  {p.date ? <span className="fx-panel__count">{shortDate(p.date)}</span> : null}
                </div>
                <h3 className="site-h3">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="site-titlelink">
                    {p.title}
                    <ExternalLink aria-hidden className="ml-2 inline size-3.5 align-baseline" />
                  </a>
                </h3>
                <p className="fx-prose mt-2 line-clamp-2">{p.description}</p>
                <div className="fx-cluster mt-4">
                  {p.tags?.map((t) => (
                    <span key={t} className="fx-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </div>
  );
}
