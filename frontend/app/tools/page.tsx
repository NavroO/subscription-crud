import BillSplitter from "../components/BillSplitter"
import PaymentIntegration from "../components/PaymentIntegration"
import SubscriptionUsageTracker from "../components/SubscriptionUsageTracker"
import SmartBudgetAllocation from "../components/SmartBudgetAllocation"
import SubscriptionMarketplace from "../components/SubscriptionMarketplace"
import FinancialReportExport from "../components/FinancialReportExport"

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tools</h1>
      <SubscriptionUsageTracker />
      <SmartBudgetAllocation />
      <SubscriptionMarketplace />
      <BillSplitter />
      <PaymentIntegration />
      <FinancialReportExport />
    </div>
  )
}

