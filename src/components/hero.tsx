import { Github, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Profile } from "@/lib/content"

/**
 * Splits `*phrase*` out of a headline so it can be set in the serif italic.
 * One emphasised phrase per page — the data file is expected to respect that.
 */
function renderHeadline(headline: string) {
  return headline.split("*").map((part, i) =>
    i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>
  )
}

function twoDigits(n: number) {
  return String(Math.max(0, n)).padStart(2, "0")
}

export function Hero({ profile, articleCount }: { profile: Profile; articleCount?: number }) {
  const { name, title, bio, links, headline, city, careerStart } = profile
  const years = careerStart ? new Date().getFullYear() - careerStart : undefined

  return (
    <section className="fx-split items-start">
      <div>
        <p className="fx-eyebrow">
          {name}
          {city ? (
            <>
              <span className="fx-dot" aria-hidden />
              {city}
            </>
          ) : null}
        </p>

        <h1 className="fx-display">{headline ? renderHeadline(headline) : name}</h1>

        <p className="fx-lead mt-6">
          <strong className="text-ink font-medium">{title}.</strong> {bio}
        </p>

        <div className="fx-cluster mt-8">
          {links?.linkedin && (
            <Link
              href={links.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="Open LinkedIn profile in a new tab"
              className="fx-button"
            >
              <Linkedin aria-hidden />
              LinkedIn
            </Link>
          )}
          {links?.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noopener"
              aria-label="Open GitHub profile in a new tab"
              className="fx-button fx-button--quiet"
            >
              <Github aria-hidden />
              GitHub
            </Link>
          )}
        </div>
      </div>

      <aside className="flex flex-col gap-3" aria-label="At a glance">
        <div className="site-avatar">
          <Image
            src="/images/avatar.jpg"
            alt={`${name} portrait`}
            fill
            className="object-cover"
            sizes="10rem"
            priority
          />
        </div>
        {years !== undefined ? (
          <div className="fx-metric">
            <span className="fx-metric__label">Years shipping</span>
            <span className="fx-metric__value">{twoDigits(years)}</span>
          </div>
        ) : null}
        {articleCount !== undefined ? (
          <div className="fx-metric">
            <span className="fx-metric__label">Articles written</span>
            <span className="fx-metric__value fx-metric__value--human">{twoDigits(articleCount)}</span>
          </div>
        ) : null}
      </aside>
    </section>
  )
}

export default Hero
