import type React from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    secondary:
      "bg-base text-text-base border border-border hover:bg-secondary/10 hover:border-secondary-hover",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
