
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import SavingsProgress from "@/components/SavingsProgress";
import SavingsCalculator from "@/components/SavingsCalculator";

const Savings = () => {
  const { toast } = useToast();
  const [savings, setSavings] = useState({
    currentAmount: 0,
    targetAmount: 0,
    period: "0 meses",
  });

  const handleCalculate = (targetAmount: number, months: number) => {
    // Calculamos el ahorro mensual necesario
    const monthlyAmount = targetAmount / months;
    
    setSavings({
      currentAmount: 0, // Iniciamos en 0
      targetAmount: targetAmount,
      period: `${months} meses`,
    });

    toast({
      title: "Plan de ahorro calculado",
      description: `Para alcanzar tu meta necesitas ahorrar $${monthlyAmount.toLocaleString()} mensuales durante ${months} meses.`,
      variant: "default", // Cambiado de "success" a "default"
    });
  };

  return (
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-6 p-4"
      >
        <SavingsCalculator onCalculate={handleCalculate} />
        <SavingsProgress
          currentAmount={savings.currentAmount}
          targetAmount={savings.targetAmount}
          period={savings.period}
        />
      </motion.div>
    </div>
  );
};

export default Savings;
