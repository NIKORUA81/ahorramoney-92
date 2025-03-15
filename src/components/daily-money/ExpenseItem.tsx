
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { ExpenseItem as ExpenseItemType } from "./types";

interface ExpenseItemProps {
  expense: ExpenseItemType;
  index: number;
  onUpdateAmount: (index: number, amount: number) => void;
  onRemove: (index: number) => void;
}

const ExpenseItem = ({ expense, index, onUpdateAmount, onRemove }: ExpenseItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1/2">
        <span className="text-sm">{expense.name}</span>
        {expense.percentage ? (
          <span className="text-xs text-gray-500 ml-1">
            ({expense.percentage}%)
          </span>
        ) : null}
      </div>
      <Input
        type="number"
        value={expense.amount || ""}
        onChange={(e) => onUpdateAmount(index, Number(e.target.value))}
        className="flex-1"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="px-2"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

export default ExpenseItem;
