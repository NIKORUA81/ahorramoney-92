
import { motion } from "framer-motion";
import SavingsProgress from "@/components/SavingsProgress";
import SavingsCalculator from "@/components/SavingsCalculator";

const Savings = () => {
  const handleCalculate = (targetAmount: number, months: number) => {
    console.log("Calculando ahorro:", { targetAmount, months });
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
          currentAmount={1000}
          targetAmount={10000}
          period="12 meses"
        />
      </motion.div>
    </div>
  );
};

export default Savings;
