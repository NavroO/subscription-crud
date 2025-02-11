import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const expenses = [
  { id: 1, name: "Netflix", category: "Streaming", amount: 12.99, date: "2023-06-01" },
  { id: 2, name: "Spotify", category: "Music", amount: 9.99, date: "2023-06-05" },
  { id: 3, name: "Adobe Creative Cloud", category: "Productivity", amount: 52.99, date: "2023-06-10" },
  { id: 4, name: "Amazon Prime", category: "Shopping", amount: 14.99, date: "2023-06-15" },
]

export default function ExpenseList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.name}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>${expense.amount.toFixed(2)}</TableCell>
            <TableCell>{expense.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

