"use client"

import { useId, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

type Errors = Partial<Record<"name" | "email" | "message", string>>

export function ContactForm() {
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const hpId = useId()

  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const canSubmit = useMemo(() => !pending, [pending])

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const message = String(data.get("message") || "").trim()
    const errs: Errors = {}
    if (!name) errs.name = "Please enter your name."
    if (!email) errs.email = "Please enter your email."
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Please enter a valid email."
    if (!message) errs.message = "Please enter a message."
    else if (message.length < 10) errs.message = "Message is too short."
    return errs
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Honeypot
    const hp = (form.querySelector("input[name='company']") as HTMLInputElement | null)?.value
    if (hp) {
      // silently drop
      toast.success("Your message has been sent successfully!")
      form.reset()
      return
    }

    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      toast.error("Please fix the highlighted fields.")
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      toast.error("Contact form is not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT.")
      return
    }

    try {
      setPending(true)
      const data = new FormData(form)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      toast.success("Your message has been sent successfully!")
      form.reset()
      setErrors({})
    } catch {
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={nameId}>Name</Label>
          <Input id={nameId} name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? nameId + "-err" : undefined} required />
          {errors.name && (
            <p id={nameId + "-err"} className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor={emailId}>Email</Label>
          <Input id={emailId} name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? emailId + "-err" : undefined} required />
          {errors.email && (
            <p id={emailId + "-err"} className="mt-1 text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor={messageId}>Message</Label>
        <Textarea id={messageId} name="message" placeholder="How can I help?" aria-invalid={!!errors.message} aria-describedby={errors.message ? messageId + "-err" : undefined} required />
        {errors.message && (
          <p id={messageId + "-err"} className="mt-1 text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor={hpId}>Company</label>
        <input id={hpId} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
