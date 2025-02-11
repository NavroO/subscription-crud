"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ReportOption {
  id: string
  label: string
}

const reportOptions: ReportOption[] = [
  { id: "subscriptions", label: "Subscriptions" },
  { id: "expenses", label: "Expenses" },
  { id: "budget", label: "Budget Allocation" },
  { id: "usage", label: "Usage Statistics" },
]

export default function FinancialReportExport() {
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const handleExport = () => {
    // In a real application, this would generate and download the report
    console.log(`Exporting report in ${selectedFormat} format with options:`, selectedOptions)
    alert(`Report exported in ${selectedFormat} format`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Financial Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Export Format</Label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Report Sections</Label>
            <div className="space-y-2">
              {reportOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleExport}>Export Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}

