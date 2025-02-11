import SubscriptionList from "../components/SubscriptionList";
import SubscriptionUsage from "../components/SubscriptionUsage";
import SubscriptionGoal from "../components/SubscriptionGoal";
import SharedSubscriptions from "../components/SharedSubscriptions";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Subscriptions</h1>
      <SubscriptionList />
      <div>
        <h2 className="text-2xl font-semibold mb-4">Subscription Usage</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SubscriptionUsage
            name="Netflix"
            usagePercentage={75}
            usageHours={30}
            color="bg-red-500"
          />
          <SubscriptionUsage
            name="Spotify"
            usagePercentage={90}
            usageHours={45}
            color="bg-green-500"
          />
          <SubscriptionUsage
            name="Adobe Creative Cloud"
            usagePercentage={30}
            usageHours={10}
            color="bg-blue-500"
          />
        </div>
      </div>
      {/* TODO: Fix me */}
      {/* <div>
        <h2 className="text-2xl font-semibold mb-4">Subscription Goals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SubscriptionGoal name="Netflix" currentUsage={30} initialGoal={40} onGoalUpdate={() => {}} />
          <SubscriptionGoal name="Spotify" currentUsage={45} initialGoal={50} onGoalUpdate={() => {}} />
          <SubscriptionGoal name="Adobe Creative Cloud" currentUsage={10} initialGoal={20} onGoalUpdate={() => {}} />
        </div>
      </div> */}
      <SharedSubscriptions />
    </div>
  );
}
