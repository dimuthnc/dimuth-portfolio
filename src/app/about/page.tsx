import Link from "next/link";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "@/components/collapsible-section";
import { FileDown, Linkedin } from "lucide-react";
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

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">About</h1>
          <p className="text-sm text-muted-foreground">
            Professional summary, skills, experience, and more.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a
              href="/docs/cv.pdf"
              download="Dimuth-Menikgamage-CV.pdf"
              aria-label="Download CV as PDF"
            >
              <FileDown className="size-4" />
              Download CV (PDF)
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://www.linkedin.com/in/dimuththaraka"
              target="_blank"
              rel="noopener"
              aria-label="Open LinkedIn in new tab"
            >
              <Linkedin className="size-4" />
              View LinkedIn
            </Link>
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        <CollapsibleSection title="Professional Summary" id="summary">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Experienced and results‑driven Software Engineer with 8+ years across
            banking/financial services, API management, IAM, middleware, and
            distributed systems. Proven record in microservices architecture,
            enterprise integration, open banking compliance, and application
            security. Designed scalable platforms, improved performance, and led
            teams.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Key Skills" id="skills">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium">Languages</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                <li>Java, JavaScript/TypeScript, Python, Shell</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Frameworks & Tools</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                <li>Spring Boot, Apache Camel, Kubernetes, Docker</li>
                <li>Kafka, Swagger/OpenAPI, GitHub/GitLab, Argo CD</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Domains</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                <li>Open Banking, IAM, Enterprise Integration</li>
                <li>Microservices, Observability, Security</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Work Experience" id="experience">
          <ol className="relative border-l pl-6">
            <li className="mb-8 ml-2">
              <div className="absolute -left-[7px] mt-1 size-3 rounded-full border bg-background" />
              <div className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">
                    Crédit Agricole Corporate and Investment Bank
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Oct 2023 – Present
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Senior Software Engineer
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  <li>
                    Designed multi-purpose integration platform with Apache Camel
                    and Kafka.
                  </li>
                  <li>
                    Implemented audit and replay via event sourcing; integrated
                    payment flows.
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-0 ml-2">
              <div className="absolute -left-[7px] mt-1 size-3 rounded-full border bg-background" />
              <div className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">WSO2</h3>
                  <span className="text-xs text-muted-foreground">
                    Jan 2018 – Sep 2023
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Associate Technical Lead / Senior Software Engineer
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  <li>
                    Led Open Banking Accelerator (OB 3.0) delivery and client
                    deployments.
                  </li>
                  <li>
                    Improved system performance by 75%; delivered features and
                    consulting.
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="Education" id="education">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">University of Moratuwa</h3>
              <p className="text-sm text-muted-foreground">
                B.Sc. (Hons) in Engineering, Computer Science & Engineering
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Second Class Upper Division • GPA 3.61 / 4.20
              </p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Certifications" id="certifications">
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>Certified Kubernetes Application Developer (CKAD) — 2025</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Achievements" id="achievements">
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>
              Mathematics Olympiad, Sri Lanka — High Distinctions (2009, 2010)
            </li>
            <li>IEEEXtreme World Rank: 314 (2015), 424 (2016)</li>
            <li>G.C.E A/L: A grades for all three subjects (Top 2%)</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Publications" id="publications">
          <ul className="list-inside list-disc text-sm">
            <li>
              <a
                className="text-primary hover:underline"
                href="https://wso2.com/library/article/why-banks-should-become-tpps/"
                target="_blank"
                rel="noopener"
              >
                Why Banks Should Consider Becoming Third Party Providers (WSO2
                Library)
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://medium.com/@dimuth/a-deep-dive-transaction-risk-analysis-open-banking-psd2"
                target="_blank"
                rel="noopener"
              >
                A Deep Dive of Transaction Risk Analysis for Open Banking and PSD2
                (Medium)
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://medium.com/"
                target="_blank"
                rel="noopener"
              >
                Integrating Fraud detection systems with Open Banking (Medium)
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://wso2.com/library/"
                target="_blank"
                rel="noopener"
              >
                How to limit number of active concurrent user sessions with WSO2
                Identity Server (WSO2 Library)
              </a>
            </li>
          </ul>
        </CollapsibleSection>
      </div>
    </div>
  );
}
