import Link from "next/link";
import CollapsibleSection from "@/components/collapsible-section";
import { ExternalLink, FileDown, Github, Layers, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "About";
  const description =
    "Professional summary, skills, experience, education, certifications, and publications of Dimuth Menikgamage.";
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
  { group: "Languages", items: ["Java", "Python", "JavaScript / TypeScript", "Ballerina", "Shell", "C"] },
  {
    group: "Java ecosystem",
    items: ["Spring Boot 3", "Java 21+", "Hibernate", "Apache Camel", "JUnit", "Cucumber", "Maven", "Gradle"],
  },
  {
    group: "APIs & integration",
    items: [
      "REST",
      "SOAP / WSDL",
      "gRPC",
      "Apache Kafka",
      "IBM MQ",
      "Enterprise integration patterns",
      "Event sourcing",
      "WSO2 EI / APIM / IS",
    ],
  },
  {
    group: "Operations & DevOps",
    items: ["GitLab CI/CD", "GitHub Actions", "Linux (RHEL)", "Docker", "Kubernetes", "Argo CD", "SonarQube"],
  },
  {
    group: "Performance & observability",
    items: ["Java Flight Recorder", "JDK Mission Control", "Flame graphs", "GC log analysis"],
  },
  { group: "Front-end", items: ["ReactJS", "TypeScript", "SPA development", "OAuth2 / OIDC integration"] },
  { group: "Databases", items: ["Oracle", "PostgreSQL", "MS SQL Server", "MySQL"] },
  {
    group: "Cloud & middleware",
    items: ["AWS", "Cloudflare", "Vercel", "S3", "JBoss", "WebLogic", "Apache Tomcat"],
  },
  {
    group: "Security & standards",
    items: ["OAuth 2.0", "OIDC", "GDPR", "PSD2 / Open Banking", "Australian CDS", "OpenAPI"],
  },
  { group: "AI / ML", items: ["scikit-learn", "XGBoost", "TensorFlow", "AI-assisted engineering"] },
];

const experience = [
  {
    company: "Crédit Agricole Corporate and Investment Bank",
    role: "Senior Software Engineer",
    period: "Oct 2023 — Present",
    points: [
      "Senior engineer on the integration platform team, building enterprise-scale services in Java 21, Spring Boot 3, Apache Camel and Kafka, deployed on the bank’s private cloud via GitLab CI/CD and Argo CD.",
      "Designed and implemented a multi-purpose integration platform connecting S3-compatible object storage, IBM MQ, Kafka and REST APIs — a reusable foundation for cross-system data flows.",
      "Build and maintain CI/CD pipelines on RHEL-based build infrastructure, automating build, test and deployment of banking services.",
      "Developed audit and message-replay capabilities using event sourcing, for regulatory traceability and operational recovery.",
      "Integrated SEPA and cross-border loan payment flows into the bank’s data reporting ecosystem using enterprise integration patterns.",
      "Contribute to architectural decisions, code reviews and quality standards; collaborate with stakeholders on design proposals.",
    ],
  },
  {
    company: "WSO2",
    role: "Software Engineer → Associate Technical Lead",
    period: "Jan 2018 — Sep 2023",
    progression:
      "Software Engineer (2018) → Senior Software Engineer (2019) → Associate Technical Lead (2021–2023)",
    points: [
      "Co-led design and delivery of the WSO2 Open Banking Accelerator with a team of ~10 engineers, adopted by banks across the UK, Europe, Australia, Latin America, the Middle East and APAC; worked onsite with client banks in the UK and Israel.",
      "Drove a 75% performance improvement on the Open Banking platform by profiling with JFR, JDK Mission Control, flame graphs and GC log analysis.",
      "Implemented gateway request routing and execution frameworks, fraud detection / transaction risk integrations, conditional Strong Customer Authentication and gRPC-based data publishing.",
      "Implemented consent management, PII protection and identity compliance controls for GDPR, PSD2 and the Australian Consumer Data Standards.",
      "Built a Selenium-based UI automation framework for WSO2 Open Banking, reducing manual regression effort.",
      "Worked across WSO2 Enterprise Integrator, API Manager and Identity Server with SOAP and REST APIs; contributed Swagger and header validation to API Manager and identity providers to Identity Server.",
      "Owned L1–L3 production support as Support Lead under strict SLAs; also served as Product Owner and Release Manager.",
    ],
  },
];

const certifications = [
  { short: "AWS AI", name: "AWS Certified AI Practitioner", date: "Jul 2026" },
  { short: "CKAD", name: "Certified Kubernetes Application Developer", date: "Mar 2025" },
];

const publications = [
  {
    title: "Why Banks Should Consider Becoming Third Party Providers",
    venue: "WSO2 Library",
    href: "https://wso2.com/library/articles/why-banks-should-consider-becoming-third-party-providers/",
  },
  {
    title: "A Deep Dive of Transaction Risk Analysis for Open Banking and PSD2",
    venue: "WSO2 Library",
    href: "https://wso2.com/articles/2019/05/a-deep-dive-of-transaction-risk-analysis-for-open-banking-and-psd2/",
  },
  {
    title: "Integrating Fraud detection systems with Open Banking",
    venue: "Medium",
    href: "https://medium.com/@dimuthcse/integrating-fraud-detection-systems-with-open-banking-8dc6b36e55f8",
  },
  {
    title: "How to limit number of active concurrent user sessions with WSO2 Identity Server",
    venue: "Medium",
    href: "https://medium.com/@dimuthcse/how-to-limit-number-of-active-concurrent-user-sessions-with-wso2-identity-server-98d0fed61de2",
  },
];

export default function AboutPage() {
  return (
    <div className="fx-shell fx-shell--narrow">
      <header className="site-pagehead">
        <p className="fx-eyebrow">About</p>
        <h1 className="fx-title">Eight years of banking-grade integration, shipped.</h1>
        <p className="fx-lead mt-5">
          Senior Software Engineer with 8+ years designing, building, and operating large-scale
          Java applications in mission-critical environments for global financial institutions.
          Deep expertise in enterprise integration and middleware (Apache Camel, Kafka, WSO2),
          application architecture, and JVM performance engineering, with full-stack capability
          across Spring Boot and ReactJS. I run production systems end to end — CI/CD,
          observability, and L1–L3 support under strict SLAs — while mentoring engineers and
          owning delivery.
        </p>
        <p className="fx-eyebrow mt-5">
          Singapore PR
          <span className="fx-dot" aria-hidden />
          CKAD
          <span className="fx-dot" aria-hidden />
          AWS Certified AI Practitioner
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
          <Link
            href="https://github.com/dimuthnc"
            target="_blank"
            rel="noopener"
            aria-label="Open GitHub in new tab"
            className="fx-button fx-button--quiet"
          >
            <Github aria-hidden />
            GitHub
          </Link>
          <Link href="/portfolio" className="fx-button fx-button--quiet">
            <Layers aria-hidden />
            Portfolio
          </Link>
        </div>
      </header>

      <div className="fx-stack fx-stack--loose">
        <CollapsibleSection title="Key skills" id="skills">
          <div className="grid gap-6 sm:grid-cols-2">
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
                {job.progression ? <p className="fx-prose mt-1">{job.progression}</p> : null}
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
              <span className="fx-panel__count">Mar 2013 — Jan 2018</span>
            </div>
            <h3 className="site-h3">University of Moratuwa, Sri Lanka</h3>
            <p className="fx-prose mt-2">
              Computer Science &amp; Engineering — Second Class Upper Division, GPA 3.61 / 4.20.
            </p>
            <ul className="site-facts mt-3">
              <li>
                Final year project: Spatio-Temporal Forecasting of Dengue Propagation using
                Mobility Data — an ML model combining mobile network big data and weather datasets
                (Python, scikit-learn, XGBoost, TensorFlow, Apache Spark, Flask).
              </li>
            </ul>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Certifications" id="certifications">
          <div className="fx-stack">
            {certifications.map((c) => (
              <div key={c.name} className="fx-cluster">
                <span className="fx-tag fx-tag--human">{c.short}</span>
                <span className="fx-prose">
                  {c.name}, {c.date}
                </span>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Recognition of my own work — amber. */}
        <CollapsibleSection title="Achievements" id="achievements">
          <div className="fx-panel fx-panel--human">
            <ul className="site-facts">
              <li>WSO2 Sustained Outstanding Contribution Award (2019)</li>
              <li>WSO2 Committer (2018)</li>
              <li>Mathematics Olympiad, Sri Lanka — High Distinctions (2009, 2010)</li>
              <li>IEEEXtreme World Rank: 314 (2015), 424 (2016)</li>
              <li>G.C.E A/L: A grades for all three subjects (Top 2%)</li>
            </ul>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Mentoring & leadership" id="leadership">
          <ul className="site-facts">
            <li>
              Mentored interns and junior engineers throughout my career, particularly as Associate
              Technical Lead at WSO2 — onboarding new joiners, guiding technical design, conducting
              code reviews, and supporting their professional development.
            </li>
            <li>
              Led cross-functional initiatives spanning product ownership, release management, and
              L1–L3 technology operations for client-facing banking deployments.
            </li>
          </ul>
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
