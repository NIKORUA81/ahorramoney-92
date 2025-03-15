
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface AddExpenseFormProps {
  onAddExpense: (name: string, category: string, amount: number) => void;
  categories: string[];
}

const AddExpenseForm = ({ onAddExpense, categories }: AddExpenseFormProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newExpenseCategory, setNewExpenseCategory] = useState("Otros");

  const handleAddExpense = () => {
    if (newExpenseName && newExpenseCategory) {
      onAddExpense(newExpenseName, newExpenseCategory, newExpenseAmount);
      setNewExpenseName("");
      setNewExpenseAmount(0);
    }
  };

  return (
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
  );
};

export default AddExpenseForm;
