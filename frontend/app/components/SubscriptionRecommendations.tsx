import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Recommendation {
  id: string
  title: string
  description: string
  savings: number
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Switch to Spotify Family Plan",
    description: "Based on your household size, switching to a family plan could save you money.",
    savings: 35.88,
  },
  {
    id: "2",
    title: "Downgrade Netflix to Standard Plan",
    description: "Your usage suggests you might not need the Premium plan features.",
    savings: 48,
  },
  {
    id: "3",
    title: "Cancel unused gym membership",
    description: "You haven't used your gym membership in the last 3 months. Consider canceling to save money.",
    savings: 240,
  },
]

export default function SubscriptionRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardHeader>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{rec.description}</p>
                <p className="font-semibold">Potential yearly savings: ${rec.savings.toFixed(2)}</p>
                <Button className="mt-2">Apply Recommendation</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

