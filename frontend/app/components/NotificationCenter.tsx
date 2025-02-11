"use client"

import React from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  message: string
  date: Date
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    { id: "1", message: "Your Netflix subscription will renew tomorrow", date: new Date() },
    { id: "2", message: "You have exceeded your monthly budget", date: new Date(Date.now() - 86400000) },
  ])

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem key={notif.id} className="flex justify-between items-start">
              <div>
                <p>{notif.message}</p>
                <p className="text-sm text-gray-500">{notif.date.toLocaleString()}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => clearNotification(notif.id)}>
                Clear
              </Button>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

