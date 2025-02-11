import SubscriptionRecommendations from "../components/SubscriptionRecommendations"
import AIRecommendations from "../components/AIRecommendations"
import SubscriptionComparison from "../components/SubscriptionComparison"

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recommendations</h1>
      <SubscriptionRecommendations />
      <AIRecommendations />
      <SubscriptionComparison />
    </div>
  )
}

