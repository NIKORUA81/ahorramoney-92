
import { motion } from "framer-motion";

const Education = () => {
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-poppins font-semibold text-neutral-500 mb-4">
          Educación Financiera
        </h1>
        <p className="text-neutral-400">
          Próximamente encontrarás aquí recursos educativos sobre finanzas personales.
        </p>
      </motion.div>
    </div>
  );
};

export default Education;
