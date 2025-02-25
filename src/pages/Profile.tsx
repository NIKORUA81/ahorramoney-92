
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-poppins font-semibold text-neutral-500 mb-4">
          Mi Perfil
        </h1>
        <p className="text-neutral-400">
          Próximamente podrás gestionar tu perfil y preferencias aquí.
        </p>
      </motion.div>
    </div>
  );
};

export default Profile;
