import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Navigation from "./components/Navigation"
import { AuthProvider } from "./context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Subscription Manager",
  description: "Manage your subscriptions easily",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen bg-gray-100">
            <Navigation />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

