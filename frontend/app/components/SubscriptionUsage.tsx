import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SubscriptionUsageProps {
  name: string
  usagePercentage: number
  usageHours: number
  color: string
}

export default function SubscriptionUsage({ name, usagePercentage, usageHours, color }: SubscriptionUsageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name} Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={usagePercentage} className={`w-full ${color}`} />
          <div className="flex justify-between text-sm">
            <span>{usageHours} hours used</span>
            <span>{usagePercentage}% of typical usage</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

