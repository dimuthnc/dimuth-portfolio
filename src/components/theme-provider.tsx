'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Sets both the `.dark` / `.light` class (Tailwind's darkMode: "class") and
 * `data-fx-theme` on <html>, which is the switch theme/tokens.css reads for
 * its light palette.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute={['class', 'data-fx-theme']}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
