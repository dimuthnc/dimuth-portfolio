import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Thin wrapper over the library's `.fx-button`. Variants map to the library
 * modifiers (and two site modifiers defined in globals.css):
 *   default — teal wash, the standard action
 *   quiet   — outlined, secondary action
 *   ghost   — no border or wash, for toolbars
 *   signal  — coral, a warning action
 *   link    — inline `.fx-link`
 */
const buttonVariants = cva("fx-button", {
  variants: {
    variant: {
      default: "",
      quiet: "fx-button--quiet",
      ghost: "fx-button--ghost",
      signal: "fx-button--signal",
      link: "fx-link",
    },
    size: {
      default: "",
      sm: "fx-button--sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? type : type ?? "button"}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
