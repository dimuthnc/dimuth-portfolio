"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "Blog", href: "/blog" },
	{ name: "About", href: "/about" },
	{ name: "Portfolio", href: "/portfolio" },
	{ name: "Contact", href: "/contact" },
] as const

export function Navbar() {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	// Close menu when navigating
	useEffect(() => {
		setOpen(false)
	}, [pathname])

	const menuId = "mobile-nav"

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			{/* Skip to content link for accessibility */}
			<a
				href="#content"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
			>
				Skip to content
			</a>

			<nav
				aria-label="Main navigation"
				className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
			>
				<div className="flex h-14 items-center justify-between gap-2">
					{/* Left: Primary navigation (desktop) */}
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className="text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
						>
							Dimuth
						</Link>

						<ul
							className="hidden md:flex items-center gap-1"
							role="list"
						>
							{navItems.map((item) => {
								const active =
									item.href === "/"
										? pathname === "/"
										: pathname?.startsWith(item.href)
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											aria-current={
												active ? "page" : undefined
											}
											className={cn(
												"px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
												active &&
													"bg-accent text-accent-foreground"
											)}
										>
											{item.name}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>

					{/* Right: Controls */}
					<div className="flex items-center gap-1">
						<div className="hidden sm:flex items-center gap-1">
							<Button
								asChild
								variant="ghost"
								size="icon"
								aria-label="Open GitHub in new tab"
							>
								<a
									href="https://github.com/dimuth"
									target="_blank"
									rel="noopener"
								>
									<Github />
								</a>
							</Button>
							<Button
								asChild
								variant="ghost"
								size="icon"
								aria-label="Open LinkedIn in new tab"
							>
								<a
									href="https://www.linkedin.com/in/dimuth/"
									target="_blank"
									rel="noopener"
								>
									<Linkedin />
								</a>
							</Button>
						</div>
						<div className="hidden sm:block">
							<ThemeToggle />
						</div>

						{/* Mobile toggle */}
						<div className="flex sm:hidden">
							<Button
								variant="ghost"
								size="icon"
								className="-mr-2"
								aria-label={open ? "Close menu" : "Open menu"}
								aria-controls={menuId}
								aria-expanded={open}
								onClick={() => setOpen((v) => !v)}
							>
								{open ? (
									<X aria-hidden className="size-5" />
								) : (
									<Menu aria-hidden className="size-5" />
								)}
							</Button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					id={menuId}
					hidden={!open}
					className="sm:hidden pb-3"
				>
					<ul
						className="flex flex-col gap-1"
						role="list"
					>
						{navItems.map((item) => {
							const active =
								item.href === "/"
									? pathname === "/"
									: pathname?.startsWith(item.href)
							return (
								<li key={item.href}>
									<Link
										href={item.href}
										aria-current={
											active ? "page" : undefined
										}
										className={cn(
											"block w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
											active &&
												"bg-accent text-accent-foreground"
										)}
									>
										{item.name}
									</Link>
								</li>
							)
						})}
						<li className="flex items-center gap-1 px-1">
							<Button
								asChild
								variant="ghost"
								size="sm"
								aria-label="Open GitHub in new tab"
							>
								<a
									href="https://github.com/dimuth"
									target="_blank"
									rel="noopener"
									className="w-full justify-start"
								>
									<Github /> GitHub
								</a>
							</Button>
							<Button
								asChild
								variant="ghost"
								size="sm"
								aria-label="Open LinkedIn in new tab"
							>
								<a
									href="https://www.linkedin.com/in/dimuth/"
									target="_blank"
									rel="noopener"
									className="w-full justify-start"
								>
									<Linkedin /> LinkedIn
								</a>
							</Button>
						</li>
						<li className="px-1">
							<ThemeToggle />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
