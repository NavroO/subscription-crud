"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, PiggyBank } from "lucide-react";
import SubscriptionGoal from "../../components/SubscriptionGoal";
import SubscriptionUsage from "../../components/SubscriptionUsage";

// This would typically come from an API or database
const subscriptions = [
  {
    id: 1,
    name: "Netflix",
    price: 12.99,
    renewalDate: "2023-06-15",
    description: "Streaming service for movies and TV shows",
    savingsPerYear: 0,
    currentUsage: 30,
    usageGoal: 40,
    usagePercentage: 75,
  },
  {
    id: 2,
    name: "Spotify",
    price: 9.99,
    renewalDate: "2023-06-22",
    description: "Music streaming service",
    savingsPerYear: 119.88,
    currentUsage: 45,
    usageGoal: 50,
    usagePercentage: 90,
  },
  {
    id: 3,
    name: "Amazon Prime",
    price: 14.99,
    renewalDate: "2023-07-01",
    description: "Shopping and streaming service",
    savingsPerYear: 0,
    currentUsage: 20,
    usageGoal: 30,
    usagePercentage: 66,
  },
  {
    id: 4,
    name: "Disney+",
    price: 7.99,
    renewalDate: "2023-06-30",
    description: "Streaming service for Disney content",
    savingsPerYear: 95.88,
    currentUsage: 15,
    usageGoal: 25,
    usagePercentage: 60,
  },
];

export default function SubscriptionDetails() {
  const router = useRouter();
  const { id } = useParams();
  const subscription = subscriptions.find((sub) => sub.id === Number(id));

  if (!subscription) {
    return <div>Subscription not found</div>;
  }

  const handleGoalUpdate = (newGoal: number) => {
    console.log(`Updated goal for ${subscription.name} to ${newGoal} hours`);
    // In a real app, you would update this in your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{subscription.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">
              ${subscription.price.toFixed(2)}/month
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Renews on {subscription.renewalDate}
            </p>
            <p className="mb-4">{subscription.description}</p>
            {subscription.savingsPerYear > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="flex items-center p-4">
                  <PiggyBank className="h-6 w-6 text-green-600 mr-2" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Potential Savings
                    </p>
                    <p className="text-green-700">
                      You could save ${subscription.savingsPerYear.toFixed(2)}{" "}
                      per year by canceling this subscription.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
          <CardFooter>
            <Button
              variant={
                subscription.savingsPerYear > 0 ? "default" : "destructive"
              }
              className={
                subscription.savingsPerYear > 0
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
            >
              {subscription.savingsPerYear > 0
                ? "Cancel and Save"
                : "Cancel Subscription"}
            </Button>
          </CardFooter>
        </Card>
        <div className="space-y-6">
          <SubscriptionUsage
            name={subscription.name}
            usagePercentage={subscription.usagePercentage}
            usageHours={subscription.currentUsage}
            color="bg-blue-500"
          />
          {/* <SubscriptionGoal
            name={subscription.name}
            currentUsage={subscription.currentUsage}
            initialGoal={subscription.usageGoal}
            // TODO: Fix me
            onGoalUpdate={function (newGoal: number): void {
              throw new Error("Function not implemented.");
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
