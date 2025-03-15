
import { ExpenseItem } from "./types";

interface ExpensesSummaryProps {
  expenses: ExpenseItem[];
  income: number;
}

const ExpensesSummary = ({ expenses, income }: ExpensesSummaryProps) => {
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getBalanceRemaining = () => {
    return income - getTotalExpenses();
  };

  const getCategoryTotals = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    return categoryTotals;
  };

  return (
    <div className="space-y-2 border-t pt-4">
      <h3 className="text-lg font-medium text-neutral-700">Resumen</h3>
      
      {/* Category Totals */}
      <div className="space-y-1">
        {Object.entries(getCategoryTotals()).map(([category, total]) => (
          <div key={category} className="flex justify-between">
            <span className="text-sm">{category}:</span>
            <span className="text-sm font-medium">${total.toLocaleString()}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between font-medium text-neutral-700 border-t pt-2">
        <span>Total Gastos:</span>
        <span>${getTotalExpenses().toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-medium text-neutral-700">
        <span>Ingreso:</span>
        <span>${income.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-bold text-neutral-700 border-t pt-2">
        <span>Balance:</span>
        <span className={getBalanceRemaining() < 0 ? "text-red-600" : "text-green-600"}>
          ${getBalanceRemaining().toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ExpensesSummary;
