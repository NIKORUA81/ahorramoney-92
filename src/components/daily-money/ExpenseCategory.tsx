
import { ExpenseItem as ExpenseItemType } from "./types";
import ExpenseItem from "./ExpenseItem";

interface ExpenseCategoryProps {
  category: string;
  expenses: ExpenseItemType[];
  allExpenses: ExpenseItemType[];
  onUpdateAmount: (index: number, amount: number) => void;
  onRemove: (index: number) => void;
}

const ExpenseCategory = ({ 
  category, 
  expenses, 
  allExpenses, 
  onUpdateAmount, 
  onRemove 
}: ExpenseCategoryProps) => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <h4 className="font-medium text-neutral-600 mb-2">{category}</h4>
      <div className="space-y-2">
        {expenses.map((expense, index) => {
          const expenseIndex = allExpenses.findIndex((e) => e === expense);
          return (
            <ExpenseItem
              key={index}
              expense={expense}
              index={expenseIndex}
              onUpdateAmount={onUpdateAmount}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseCategory;
