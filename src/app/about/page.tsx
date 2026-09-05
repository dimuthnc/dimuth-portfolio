import Link from "next/link";
import CollapsibleSection from "@/components/collapsible-section";
import { ExternalLink, FileDown, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "About";
  const description =
    "Professional summary, skills, experience, education, and publications of Dimuth Menikgamage.";
  const url = canonical("/about");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${title} — Dimuth Menikgamage`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  };
}

const skills = [
  { group: "Languages", items: ["Java", "JavaScript / TypeScript", "Python", "Shell"] },
  {
    group: "Frameworks & tools",
    items: ["Spring Boot", "Apache Camel", "Kafka", "Kubernetes", "Docker", "OpenAPI", "GitHub / GitLab", "Argo CD"],
  },
  {
    group: "Domains",
    items: ["Open Banking", "IAM", "Enterprise Integration", "Microservices", "Observability", "Security"],
  },
];

const experience = [
  {
    company: "Crédit Agricole Corporate and Investment Bank",
    role: "Senior Software Engineer",
    period: "Oct 2023 — Present",
    points: [
      "Designed a multi-purpose integration platform with Apache Camel and Kafka.",
      "Implemented audit and replay via event sourcing; integrated payment flows.",
    ],
  },
  {
    company: "WSO2",
    role: "Associate Technical Lead / Senior Software Engineer",
    period: "Jan 2018 — Sep 2023",
    points: [
      "Led Open Banking Accelerator (OB 3.0) delivery and client deployments.",
      "Improved system performance by 75%; delivered features and consulting.",
    ],
  },
];

const publications = [
  {
    title: "Why Banks Should Consider Becoming Third Party Providers",
    venue: "WSO2 Library",
    href: "https://wso2.com/library/article/why-banks-should-become-tpps/",
  },
  {
    title: "A Deep Dive of Transaction Risk Analysis for Open Banking and PSD2",
    venue: "Medium",
    href: "https://medium.com/@dimuth/a-deep-dive-transaction-risk-analysis-open-banking-psd2",
  },
  {
    title: "Integrating Fraud detection systems with Open Banking",
    venue: "Medium",
    href: "https://medium.com/",
  },
  {
    title: "How to limit number of active concurrent user sessions with WSO2 Identity Server",
    venue: "WSO2 Library",
    href: "https://wso2.com/library/",
  },
];

export default function AboutPage() {
  return (
    <div className="fx-shell fx-shell--narrow">
      <header className="site-pagehead">
        <p className="fx-eyebrow">About</p>
        <h1 className="fx-title">Eight years of banking-grade integration, shipped.</h1>
        <p className="fx-lead mt-5">
          Software engineer with 8+ years across banking and financial services, API
          management, IAM, middleware, and distributed systems. A record of microservices
          architecture, enterprise integration, open banking compliance, and application
          security — designing scalable platforms, improving performance, and leading teams.
        </p>
        <div className="fx-cluster mt-8">
          <a
            href="/docs/cv.pdf"
            download="Dimuth-Menikgamage-CV.pdf"
            aria-label="Download CV as PDF"
            className="fx-button"
          >
            <FileDown aria-hidden />
            Download CV
          </a>
          <Link
            href="https://www.linkedin.com/in/dimuththaraka"
            target="_blank"
            rel="noopener"
            aria-label="Open LinkedIn in new tab"
            className="fx-button fx-button--quiet"
          >
            <Linkedin aria-hidden />
            LinkedIn
          </Link>
        </div>
      </header>

      <div className="fx-stack fx-stack--loose">
        <CollapsibleSection title="Key skills" id="skills">
          <div className="grid gap-6 sm:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group}>
                <p className="fx-panel__label mb-3 block">{s.group}</p>
                <div className="fx-cluster gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="fx-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Work experience" id="experience">
          <ol className="fx-stack list-none p-0 m-0">
            {experience.map((job) => (
              <li key={job.company} className="fx-panel">
                <div className="fx-panel__head">
                  <span className="fx-panel__label">{job.role}</span>
                  <span className="fx-panel__count">{job.period}</span>
                </div>
                <h3 className="site-h3">{job.company}</h3>
                <ul className="site-facts mt-3">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="Education" id="education">
          <div className="fx-panel">
            <div className="fx-panel__head">
              <span className="fx-panel__label">B.Sc. (Hons) in Engineering</span>
              <span className="fx-panel__count">GPA 3.61 / 4.20</span>
            </div>
            <h3 className="site-h3">University of Moratuwa</h3>
            <p className="fx-prose mt-2">
              Computer Science &amp; Engineering — Second Class Upper Division.
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Certifications" id="certifications">
          <div className="fx-cluster">
            <span className="fx-tag fx-tag--human">CKAD</span>
            <span className="fx-prose">Certified Kubernetes Application Developer, 2025</span>
          </div>
        </CollapsibleSection>

        {/* Recognition of my own work — amber. */}
        <CollapsibleSection title="Achievements" id="achievements">
          <div className="fx-panel fx-panel--human">
            <ul className="site-facts">
              <li>Mathematics Olympiad, Sri Lanka — High Distinctions (2009, 2010)</li>
              <li>IEEEXtreme World Rank: 314 (2015), 424 (2016)</li>
              <li>G.C.E A/L: A grades for all three subjects (Top 2%)</li>
            </ul>
          </div>
        </CollapsibleSection>

        {/* Things I wrote — amber. */}
        <CollapsibleSection title="Publications" id="publications">
          <div className="fx-stack">
            {publications.map((pub) => (
              <article key={pub.href} className="fx-panel fx-panel--human">
                <div className="fx-panel__head">
                  <span className="fx-panel__label">{pub.venue}</span>
                </div>
                <a
                  className="site-titlelink site-h3 inline-block"
                  href={pub.href}
                  target="_blank"
                  rel="noopener"
                >
                  {pub.title}
                  <ExternalLink aria-hidden className="ml-2 inline size-3.5 align-baseline" />
                </a>
              </article>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
