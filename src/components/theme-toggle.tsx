'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Laptop } from 'lucide-react'

const options = [
  { value: 'light', label: 'Set light theme', Icon: Sun },
  { value: 'dark', label: 'Set dark theme', Icon: Moon },
  { value: 'system', label: 'Use system theme', Icon: Laptop },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="site-segment" role="group" aria-label="Colour theme">
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className="site-iconbtn"
          aria-label={label}
          aria-pressed={mounted ? theme === value : undefined}
          onClick={() => setTheme(value)}
        >
          <Icon aria-hidden />
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
