
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IncomeSectionProps {
  income: number;
  setIncome: (income: number) => void;
}

const IncomeSection = ({ income, setIncome }: IncomeSectionProps) => {
  return (
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
  );
};

export default IncomeSection;
