"use client"

import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_1fr]"
      // Header h-14 (3.5rem) + main py-8 (top+bottom 4rem) -> prevent desktop overflow
    >
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dimuth Menikgamage
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Senior Software Engineer @ Crédit Agricole CIB
          </p>
        </div>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
          Seasoned engineer building reliable web platforms and developer tools. Passionate about
          performance, clean DX, and thoughtful UI systems. Based in Paris; collaborating globally.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="default">
            <Link href="https://www.linkedin.com/in/dimuth/" target="_blank" rel="noopener" aria-label="Open LinkedIn profile in a new tab">
              <Linkedin />
              LinkedIn
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://github.com/dimuth" target="_blank" rel="noopener" aria-label="Open GitHub profile in a new tab">
              <Github />
              GitHub
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center lg:justify-end"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
      >
        <div
          className="relative size-40 sm:size-48 lg:size-56 rounded-full border bg-gradient-to-br from-muted to-background shadow-sm"
          aria-hidden="true"
        >
          {/* Avatar placeholder; swap with an Image later */}
          <Image
            src="/favicon.ico"
            alt="Avatar placeholder"
            fill
            className="rounded-full object-cover opacity-0"
            sizes="(max-width: 1024px) 12rem, 14rem"
            priority
          />
          <div className="absolute inset-0 grid place-items-center text-muted-foreground">
            <span className="text-sm">Avatar</span>
          </div>
        </div>
      </motion.div>

      {/* Enforce full-screen height without desktop scroll */}
      <style jsx>{`
        section { min-height: calc(100vh - 3.5rem - 4rem); }
        @media (max-width: 1023px) { section { min-height: auto; } }
      `}</style>
    </section>
  );
}
