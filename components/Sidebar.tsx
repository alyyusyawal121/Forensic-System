"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  ClipboardCheck,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    href: "/korban",
    label: "Data Korban",
    icon: Users,
    id: "korban",
  },
  {
    href: "/cases",
    label: "Data Kasus",
    icon: FolderOpen,
    id: "kasus",
  },
  {
    href: "/victims",
    label: "Tindakan Forensik",
    icon: ClipboardCheck,
    id: "forensik",
  },
]

export function SidebarPage() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-64 border-r border-border/50 bg-gradient-to-b from-background via-background to-muted/20 backdrop-blur-sm md:block">
      <nav className="flex h-full flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                  : "text-muted-foreground hover:bg-accent/80 hover:text-foreground hover:scale-[1.01] hover:shadow-md",
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute -left-1 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-r-full bg-primary-foreground shadow-lg animate-in slide-in-from-left duration-300" />
              )}

              {/* Icon */}
              <div className="relative">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive
                      ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      : "group-hover:scale-110 group-hover:rotate-3",
                  )}
                />
                {isActive && (
                  <span className="absolute inset-0 -z-10 scale-150 animate-pulse rounded-full bg-primary-foreground/20 blur-md" />
                )}
              </div>

              <span className="flex-1 font-semibold tracking-wide">
                {item.label}
              </span>

              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-in fade-in zoom-in duration-300" />
              )}

              {/* Hover shimmer */}
              <span
                className={cn(
                  "absolute inset-0 -z-10 rounded-xl opacity-0 transition-all duration-300",
                  !isActive && "group-hover:opacity-100",
                )}
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent to-transparent group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
              </span>
            </Link>
          )
        })}

        {/* Bottom Info Card */}
        <div className="mt-auto animate-in fade-in slide-in-from-bottom duration-500">
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-muted/80 via-muted/50 to-background p-4 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 opacity-50" />

            <div className="relative">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-3 w-3 text-primary animate-pulse" />
                <p className="text-xs font-semibold text-foreground">
                  Sistem Forensik
                </p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Kelola data korban, kasus, dan tindakan forensik digital dengan
                aman.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}