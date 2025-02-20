"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, PieChart, Lightbulb, PenToolIcon as Tool, User, Settings, LogOut } from "lucide-react"
import NotificationCenter from "./NotificationCenter"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../context/auth-context"

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { href: "/expenses", icon: PieChart, label: "Expenses" },
  { href: "/recommendations", icon: Lightbulb, label: "Recommendations" },
  { href: "/tools", icon: Tool, label: "Tools" },
]

const profileItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export default function Navigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          SubManager
        </Link>
        <div className="flex items-center space-x-2">
          <NotificationCenter />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              {profileItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
