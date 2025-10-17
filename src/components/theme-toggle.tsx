'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Laptop } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const current = theme === 'system' ? systemTheme : theme

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" aria-label="Set light theme" onClick={() => setTheme('light')}>
        <Sun />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Set dark theme" onClick={() => setTheme('dark')}>
        <Moon />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Use system theme" onClick={() => setTheme('system')}>
        <Laptop />
      </Button>
      <span className="text-sm text-muted-foreground">
        {mounted ? `Theme: ${current ?? 'system'}` : '…'}
      </span>
    </div>
  )
}

