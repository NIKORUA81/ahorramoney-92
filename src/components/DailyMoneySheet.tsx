
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, FileText, Trash2 } from "lucide-react";

// Predefined categories
const PREDEFINED_CATEGORIES = {
  income: ["Salario", "Inversiones", "Otros Ingresos"],
  tithes: [
    { name: "Diezmo", percentage: 10 },
    { name: "Pobres", percentage: 0 },
    { name: "Otros", percentage: 0 },
    { name: "Dar", percentage: 0 },
  ],
  savings: [
    { name: "Ahorro Fijo", percentage: 10 },
    { name: "Ahorro Temporal", percentage: 0 },
    { name: "Ahorros", percentage: 0 },
  ],
  food: [
    "Mercado",
    "Restaurante",
    "Loncheras",
    "Cafetería",
    "Alimentación",
  ],
  housing: [
    "Arriendo o Cuota Hipo.",
    "Energía",
    "Agua",
    "Gas",
    "Internet / Cable",
    "Celular",
    "Reparación",
    "Casa y Servicios",
  ],
  education: [
    "Matricula Colegio",
    "Pension",
    "Mesada Hijos",
    "Mesada Padres",
    "Universidad",
    "Educación",
  ],
  personal: [
    "Peluqueria y Salon",
    "Calzado",
    "Ropa",
    "Cosméticos",
    "Ropa Interior",
  ],
};

interface ExpenseItem {
  category: string;
  name: string;
  amount: number;
  percentage?: number;
}

const DailyMoneySheet = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newExpenseCategory, setNewExpenseCategory] = useState("Otros");

  // Initialize expenses with predefined categories
  useState(() => {
    const initialExpenses: ExpenseItem[] = [];
    
    // Add tithe and savings with percentages
    [...PREDEFINED_CATEGORIES.tithes, ...PREDEFINED_CATEGORIES.savings].forEach(
      item => {
        initialExpenses.push({
          category: item.name.includes("Ahorro") ? "Ahorros" : "Diezmos y Ofrendas",
          name: item.name,
          amount: 0,
          percentage: item.percentage,
        });
      }
    );
    
    // Add other expense categories
    [
      ...PREDEFINED_CATEGORIES.food,
      ...PREDEFINED_CATEGORIES.housing,
      ...PREDEFINED_CATEGORIES.education,
      ...PREDEFINED_CATEGORIES.personal,
    ].forEach(item => {
      const category = 
        PREDEFINED_CATEGORIES.food.includes(item)
          ? "Alimentación"
          : PREDEFINED_CATEGORIES.housing.includes(item)
          ? "Vivienda y Servicios"
          : PREDEFINED_CATEGORIES.education.includes(item)
          ? "Educación"
          : "Personal";
          
      initialExpenses.push({
        category,
        name: item,
        amount: 0,
      });
    });
    
    setExpenses(initialExpenses);
  }, []);

  // Update percentage-based amounts when income changes
  useState(() => {
    if (income > 0) {
      const updatedExpenses = expenses.map(expense => {
        if (expense.percentage) {
          return {
            ...expense,
            amount: Math.round((income * expense.percentage) / 100),
          };
        }
        return expense;
      });
      setExpenses(updatedExpenses);
    }
  }, [income]);

  const handleAddExpense = () => {
    if (newExpenseName && newExpenseCategory) {
      setExpenses([
        ...expenses,
        {
          category: newExpenseCategory,
          name: newExpenseName,
          amount: newExpenseAmount,
        },
      ]);
      setNewExpenseName("");
      setNewExpenseAmount(0);
    }
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

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {} as Record<string, ExpenseItem[]>);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
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
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-700">Ingresos</h3>
            <div className="flex items-center space-x-2">
              <Label htmlFor="income" className="w-24">Ingreso Total:</Label>
              <Input
                id="income"
                type="number"
                value={income || ""}
                onChange={(e) => setIncome(Number(e.target.value))}
                placeholder="Ingresa tu ingreso mensual"
                className="flex-1"
              />
            </div>
          </div>

          {/* Expenses Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-700">Gastos</h3>
            
            {/* Expenses List By Category */}
            {Object.keys(expensesByCategory).map((category) => (
              <div key={category} className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-neutral-600 mb-2">{category}</h4>
                <div className="space-y-2">
                  {expensesByCategory[category].map((expense, index) => {
                    const expenseIndex = expenses.findIndex((e) => e === expense);
                    return (
                      <div key={index} className="flex items-center space-x-2">
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
                          onChange={(e) =>
                            handleUpdateExpenseAmount(expenseIndex, Number(e.target.value))
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExpense(expenseIndex)}
                          className="px-2"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Add New Expense */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-neutral-600 mb-2">Agregar Nuevo Gasto</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <select
                    value={newExpenseCategory}
                    onChange={(e) => setNewExpenseCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="Diezmos y Ofrendas">Diezmos y Ofrendas</option>
                    <option value="Ahorros">Ahorros</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Vivienda y Servicios">Vivienda y Servicios</option>
                    <option value="Educación">Educación</option>
                    <option value="Personal">Personal</option>
                    <option value="Otros">Otros</option>
                    {newCategoryName ? <option value={newCategoryName}>{newCategoryName}</option> : null}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Nombre del gasto"
                    value={newExpenseName}
                    onChange={(e) => setNewExpenseName(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Monto"
                    value={newExpenseAmount || ""}
                    onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                    className="w-1/3"
                  />
                  <Button onClick={handleAddExpense} size="sm" className="bg-green-600 hover:bg-green-700">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Add New Category Input */}
              <div className="mt-2 flex items-center space-x-2">
                <Input
                  placeholder="Nueva categoría"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DailyMoneySheet;
