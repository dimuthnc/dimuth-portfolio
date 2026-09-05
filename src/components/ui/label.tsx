import * as React from "react"

import { cn } from "@/lib/utils"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

/** Form labels are structure, so they take the mono label face. */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("site-label", className)} {...props} />
))
Label.displayName = "Label"

export { Label }
