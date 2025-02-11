"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SubscriptionGoalProps {
  name: string
  currentUsage: number
  initialGoal: number
  onGoalUpdate: (newGoal: number) => void
}

export default function SubscriptionGoal({ name, currentUsage, initialGoal, onGoalUpdate }: SubscriptionGoalProps) {
  const [goal, setGoal] = React.useState(initialGoal)
  const [isEditing, setIsEditing] = React.useState(false)
  const [tempGoal, setTempGoal] = React.useState(initialGoal.toString())

  const usagePercentage = Math.min((currentUsage / goal) * 100, 100)

  const handleSave = () => {
    const newGoal = Number.parseInt(tempGoal, 10)
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal)
      onGoalUpdate(newGoal)
    }
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{name} Goal</span>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleSave}>
              Save
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={usagePercentage} className="w-full" />
          <div className="flex justify-between text-sm">
            <span>{currentUsage} hours used</span>
            {isEditing ? (
              <Input
                type="number"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="w-20 h-6 text-right"
              />
            ) : (
              <span>{goal} hours goal</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

