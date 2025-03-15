
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PiggyBank, FileText } from "lucide-react";
import DailyMoneySheet from "@/components/DailyMoneySheet";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center pt-8">
          <h1 className="text-3xl font-poppins font-bold text-neutral-500 mb-2">
            Financial Saver Genie
          </h1>
          <p className="text-neutral-400">
            Tu asistente inteligente para el ahorro
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/savings")}
            className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4"
          >
            <div className="bg-success-light p-3 rounded-lg">
              <PiggyBank className="text-success-default" size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-neutral-500">Plan de Ahorro</h3>
              <p className="text-sm text-neutral-400">Crea tu plan personalizado</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4"
          >
            <div className="bg-success-light p-3 rounded-lg">
              <FileText className="text-success-default" size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-neutral-500">Planilla de Gastos</h3>
              <p className="text-sm text-neutral-400">Manejo diario del dinero</p>
            </div>
            <DailyMoneySheet />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
