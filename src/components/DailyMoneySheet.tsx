import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PREDEFINED_CATEGORIES } from "./daily-money/categories";
import { ExpenseItem } from "./daily-money/types";
import IncomeSection from "./daily-money/IncomeSection";
import ExpenseCategory from "./daily-money/ExpenseCategory";
import AddExpenseForm from "./daily-money/AddExpenseForm";
import ExpensesSummary from "./daily-money/ExpensesSummary";
const DailyMoneySheet = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  // Initialize expenses with predefined categories
  useEffect(() => {
    const initialExpenses: ExpenseItem[] = [];

    // Add tithe and savings with percentages
    [...PREDEFINED_CATEGORIES.tithes, ...PREDEFINED_CATEGORIES.savings].forEach(item => {
      initialExpenses.push({
        category: item.name.includes("Ahorro") ? "Ahorros" : "Diezmos y Ofrendas",
        name: item.name,
        amount: 0,
        percentage: item.percentage
      });
    });

    // Add other expense categories
    [...PREDEFINED_CATEGORIES.food, ...PREDEFINED_CATEGORIES.housing, ...PREDEFINED_CATEGORIES.education, ...PREDEFINED_CATEGORIES.personal].forEach(item => {
      const category = PREDEFINED_CATEGORIES.food.includes(item) ? "Alimentación" : PREDEFINED_CATEGORIES.housing.includes(item) ? "Vivienda y Servicios" : PREDEFINED_CATEGORIES.education.includes(item) ? "Educación" : "Personal";
      initialExpenses.push({
        category,
        name: item,
        amount: 0
      });
    });
    setExpenses(initialExpenses);
  }, []);

  // Update percentage-based amounts when income changes
  useEffect(() => {
    if (income > 0) {
      const updatedExpenses = expenses.map(expense => {
        if (expense.percentage) {
          return {
            ...expense,
            amount: Math.round(income * expense.percentage / 100)
          };
        }
        return expense;
      });
      setExpenses(updatedExpenses);
    }
  }, [income, expenses]);
  const handleAddExpense = (name: string, category: string, amount: number) => {
    setExpenses([...expenses, {
      category,
      name,
      amount
    }]);
  };
  const handleRemoveExpense = (index: number) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };
  const handleUpdateExpenseAmount = (index: number, amount: number) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = amount;
    setExpenses(newExpenses);
  };

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {} as Record<string, ExpenseItem[]>);
  return <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-[24px] py-[24px] my-0">
          <FileText className="w-5 h-5 mr-2" />
          Planilla de Manejo Diario del Dinero
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Planilla de Manejo Diario del Dinero</SheetTitle>
          <SheetDescription>
            Registra tus ingresos y gastos para un mejor control financiero
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Income Section */}
          <IncomeSection income={income} setIncome={setIncome} />

          {/* Expenses Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-700">Gastos</h3>
            
            {/* Expenses List By Category */}
            {Object.keys(expensesByCategory).map(category => <ExpenseCategory key={category} category={category} expenses={expensesByCategory[category]} allExpenses={expenses} onUpdateAmount={handleUpdateExpenseAmount} onRemove={handleRemoveExpense} />)}

            {/* Add New Expense */}
            <AddExpenseForm onAddExpense={handleAddExpense} categories={Object.keys(expensesByCategory)} />
          </div>

          {/* Summary Section */}
          <ExpensesSummary expenses={expenses} income={income} />
        </div>
      </SheetContent>
    </Sheet>;
};
export default DailyMoneySheet;