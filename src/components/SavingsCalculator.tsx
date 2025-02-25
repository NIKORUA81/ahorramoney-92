
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SavingsCalculatorProps {
  onCalculate: (targetAmount: number, months: number) => void;
}

const SavingsCalculator = ({ onCalculate }: SavingsCalculatorProps) => {
  const [targetAmount, setTargetAmount] = useState("");
  const [months, setMonths] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(targetAmount) <= 0 || Number(months) <= 0) return;
    onCalculate(Number(targetAmount), Number(months));
  };

  const isFormValid = Number(targetAmount) > 0 && Number(months) > 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-neutral-500 mb-4">
        Calculadora de Ahorro
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="targetAmount" className="block text-sm text-neutral-400 mb-1">
            Meta de ahorro ($)
          </label>
          <Input
            id="targetAmount"
            type="number"
            min="0"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Ej: 10000"
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="months" className="block text-sm text-neutral-400 mb-1">
            Periodo (meses)
          </label>
          <Input
            id="months"
            type="number"
            min="1"
            max="120"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="Ej: 12"
            className="w-full"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!isFormValid}
        >
          Generar Plan de Ahorro
        </Button>
      </div>
    </form>
  );
};

export default SavingsCalculator;
