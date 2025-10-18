"use client"

import { useEffect } from "react"

/**
 * Dev-only accessibility checker using @axe-core/react.
 * Loads only in development and only on the client.
 */
export function DevA11y() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (process.env.NODE_ENV === "production") return
    let canceled = false
    ;(async () => {
      try {
        const [{ default: axe }, React, ReactDOM] = await Promise.all([
          import("@axe-core/react"),
          import("react"),
          import("react-dom"),
        ])
        if (!canceled) {
          axe(
            React as unknown as Parameters<typeof axe>[0],
            ReactDOM as unknown as Parameters<typeof axe>[1],
            1000
          )
        }
      } catch {
        // ignore if axe isn't installed or any dynamic import fails
      }
    })()
    return () => {
      canceled = true
    }
  }, [])
  return null
}

export default DevA11y
