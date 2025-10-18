import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Profile } from "@/lib/content"

export function Hero({ profile }: { profile: Profile }) {
  const { name, title, bio, links } = profile
  return (
    <section className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:min-h-[calc(100vh-7.5rem)]">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
          <p className="text-base text-muted-foreground sm:text-lg">{title}</p>
        </div>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">{bio}</p>
        <div className="flex flex-wrap items-center gap-3">
          {links?.linkedin && (
            <Button asChild variant="default">
              <Link href={links.linkedin} target="_blank" rel="noopener" aria-label="Open LinkedIn profile in a new tab">
                <Linkedin aria-hidden />
                LinkedIn
              </Link>
            </Button>
          )}
          {links?.github && (
            <Button asChild variant="outline">
              <Link href={links.github} target="_blank" rel="noopener" aria-label="Open GitHub profile in a new tab">
                <Github aria-hidden />
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="relative size-40 sm:size-48 lg:size-56 overflow-hidden rounded-full border bg-gradient-to-br from-muted to-background shadow-sm">
          <Image
            src="/images/avatar.jpg"
            alt={`${name} avatar`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 12rem, 14rem"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
