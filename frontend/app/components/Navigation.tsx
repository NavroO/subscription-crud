"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, PieChart, Lightbulb, PenToolIcon as Tool, User, Settings } from "lucide-react"
import NotificationCenter from "./NotificationCenter"

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { href: "/expenses", icon: PieChart, label: "Expenses" },
  { href: "/recommendations", icon: Lightbulb, label: "Recommendations" },
  { href: "/tools", icon: Tool, label: "Tools" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">SubManager</h1>
        <NotificationCenter />
      </div>
      <ul className="space-y-2 p-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

