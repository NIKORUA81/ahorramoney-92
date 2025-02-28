
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SavingsCalculatorProps {
  onCalculate: (targetAmount: number, timeValue: number, timeUnit: string) => void;
}

const SavingsCalculator = ({ onCalculate }: SavingsCalculatorProps) => {
  const [targetAmount, setTargetAmount] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("meses");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(targetAmount) <= 0 || Number(timeValue) <= 0) return;
    onCalculate(Number(targetAmount), Number(timeValue), timeUnit);
  };

  const isFormValid = Number(targetAmount) > 0 && Number(timeValue) > 0;

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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="timeValue" className="block text-sm text-neutral-400 mb-1">
              Periodo
            </label>
            <Input
              id="timeValue"
              type="number"
              min="1"
              max="365"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              placeholder="Ej: 12"
              className="w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="timeUnit" className="block text-sm text-neutral-400 mb-1">
              Unidad
            </label>
            <select
              id="timeUnit"
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="días">Días</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
            </select>
          </div>
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
