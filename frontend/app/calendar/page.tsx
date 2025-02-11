import SubscriptionCalendar from "../components/SubscriptionCalendar"

const dummyPayments = [
  { id: "1", date: new Date(2023, 5, 15), amount: 12.99, subscriptionName: "Netflix" },
  { id: "2", date: new Date(2023, 5, 20), amount: 9.99, subscriptionName: "Spotify" },
  { id: "3", date: new Date(2023, 5, 25), amount: 14.99, subscriptionName: "Amazon Prime" },
  { id: "4", date: new Date(2023, 6, 1), amount: 4.99, subscriptionName: "Apple TV+" },
]

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment Calendar</h1>
      <SubscriptionCalendar payments={dummyPayments} />
    </div>
  )
}

