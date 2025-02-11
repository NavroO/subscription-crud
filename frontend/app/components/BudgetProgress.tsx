import { Progress } from "@/components/ui/progress"

interface BudgetProgressProps {
  current: number
  max: number
}

export default function BudgetProgress({ current, max }: BudgetProgressProps) {
  const percentage = (current / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Budget Progress</span>
        <span className="text-sm font-medium">{`$${current.toFixed(2)} / $${max.toFixed(2)}`}</span>
      </div>
      <Progress value={percentage} className="w-full" />
    </div>
  )
}

