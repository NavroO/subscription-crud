import ExpenseList from "../components/ExpenseList"
import CategoryManager from "../components/CategoryManager"
import AnalyticsDashboard from "../components/AnalyticsDashboard"

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Expenses</h1>
      <ExpenseList />
      <CategoryManager />
      <AnalyticsDashboard />
    </div>
  )
}

