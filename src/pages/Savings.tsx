
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SavingsProgress from "@/components/SavingsProgress";
import SavingsCalculator from "@/components/SavingsCalculator";
import SavingsCalendar from "@/components/SavingsCalendar";
import DailyMoneySheet from "@/components/DailyMoneySheet";

const Savings = () => {
  const { toast } = useToast();
  const [savings, setSavings] = useState({
    currentAmount: 0,
    targetAmount: 0,
    period: "0 meses",
    dailyAmount: 0,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalculate = (targetAmount: number, timeValue: number, timeUnit: string) => {
    // Convertimos todo a días para calcular el ahorro diario
    let totalDays = timeValue;
    if (timeUnit === "semanas") {
      totalDays = timeValue * 7;
    } else if (timeUnit === "meses") {
      totalDays = timeValue * 30;
    }
    
    // Calculamos el ahorro diario necesario
    const dailyAmount = targetAmount / totalDays;
    
    setSavings({
      currentAmount: 0, // Iniciamos en 0
      targetAmount: targetAmount,
      period: `${timeValue} ${timeUnit}`,
      dailyAmount: dailyAmount,
    });

    setShowCalendar(true);

    toast({
      title: "Plan de ahorro calculado",
      description: `Para alcanzar tu meta necesitas ahorrar $${dailyAmount.toLocaleString()} diarios durante ${timeValue} ${timeUnit}.`,
      variant: "default",
    });
  };

  const handleSavingsUpdate = (savedAmount: number) => {
    setSavings(prev => ({
      ...prev,
      currentAmount: savedAmount
    }));
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
        
        {showCalendar && (
          <SavingsCalendar 
            targetAmount={savings.targetAmount}
            dailyAmount={savings.dailyAmount}
            period={savings.period}
            onSavingsUpdate={handleSavingsUpdate}
          />
        )}
        
        <DailyMoneySheet />
      </motion.div>
    </div>
  );
};

export default Savings;
