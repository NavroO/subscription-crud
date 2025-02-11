"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

// This is a mock AI recommendation function
const getAIRecommendations = async (userPreferences: string): Promise<string[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock recommendations based on user preferences
  if (userPreferences.toLowerCase().includes("movie")) {
    return ["Netflix", "Disney+", "HBO Max"]
  } else if (userPreferences.toLowerCase().includes("music")) {
    return ["Spotify", "Apple Music", "Tidal"]
  } else {
    return ["YouTube Premium", "Amazon Prime", "Hulu"]
  }
}

export default function AIRecommendations() {
  const [userPreferences, setUserPreferences] = useState("")
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGetRecommendations = async () => {
    setIsLoading(true)
    try {
      const aiRecommendations = await getAIRecommendations(userPreferences)
      setRecommendations(aiRecommendations)
    } catch (error) {
      console.error("Error getting AI recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter your preferences (e.g., movies, music, etc.)"
            value={userPreferences}
            onChange={(e) => setUserPreferences(e.target.value)}
          />
          <Button onClick={handleGetRecommendations} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              "Get Recommendations"
            )}
          </Button>
          {recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Recommended Subscriptions:</h3>
              <ul className="list-disc list-inside">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

