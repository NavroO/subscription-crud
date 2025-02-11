import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Subscription } from "../types/subscription"

interface SubscriptionItemProps {
  subscription: Subscription
  onCancel: () => void
}

export default function SubscriptionItem({ subscription, onCancel }: SubscriptionItemProps) {
  return (
    <Link href={`/subscriptions/${subscription.id}`} className="block hover:shadow-lg transition-shadow">
      <Card>
        <CardHeader>
          <CardTitle>{subscription.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${subscription.price.toFixed(2)}/month</p>
          <p className="text-sm text-muted-foreground">Renews on {subscription.renewalDate}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.preventDefault()
              onCancel()
            }}
          >
            Cancel Subscription
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

