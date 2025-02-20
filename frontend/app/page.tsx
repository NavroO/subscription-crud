"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExpenseChart from "./components/ExpenseChart";
import SubscriptionsToCancel from "./components/SubscriptionsToCancel";
import BudgetProgress from "./components/BudgetProgress";
import RenewalReminders from "./components/RenewalReminders";
import { useEffect, useState } from "react";
import { LoadingState } from "@/components/loading.state";

interface IDashboardInfo {
  total_subscriptions: number;
  monthly_spend: number;
  potential_savings: number;
}

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState<IDashboardInfo | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/subscriptions/getDashboardInfo"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setDashboardInfo(data);
        console.log("State updated with data:", data);
        console.log("Current state:", dashboardInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardInfo ? (
          <Card>
            <CardHeader>
              <CardTitle>Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {dashboardInfo.total_subscriptions}
              </p>
              <Link href="/subscriptions">
                <Button className="mt-4">View All</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <LoadingState name="Total Subscriptions" />
        )}
        {dashboardInfo ? (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${dashboardInfo.monthly_spend.toFixed(2)}
              </p>
              <Link href="/expenses">
                <Button className="mt-4">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <LoadingState name="Monthly Spend" />
        )}
        {dashboardInfo ? (
          <Card>
            <CardHeader>
              <CardTitle>Potential Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${dashboardInfo.potential_savings.toFixed(2)}
              </p>
              <Link href="/recommendations">
                <Button className="mt-4">View Recommendations</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <LoadingState name="Potential Savings" />
        )}
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
  );
}
