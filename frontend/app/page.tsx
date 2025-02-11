import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ExpenseChart from "./components/ExpenseChart"
import SubscriptionsToCancel from "./components/SubscriptionsToCancel"
import BudgetProgress from "./components/BudgetProgress"
import RenewalReminders from "./components/RenewalReminders"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <Link href="/subscriptions">
              <Button className="mt-4">View All</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$124.95</p>
            <Link href="/expenses">
              <Button className="mt-4">View Details</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$215.76</p>
            <Link href="/recommendations">
              <Button className="mt-4">View Recommendations</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetProgress current={124.95} max={200} />
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseChart />
        <SubscriptionsToCancel />
      </div>
      <RenewalReminders />
    </div>
  )
}

