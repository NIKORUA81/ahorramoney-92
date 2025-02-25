
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface SavingsProgressProps {
  currentAmount: number;
  targetAmount: number;
  period: string;
}

const SavingsProgress = ({ currentAmount, targetAmount, period }: SavingsProgressProps) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-neutral-500 mb-4">
        Progreso de Ahorro
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-neutral-400">Meta</p>
          <p className="text-lg font-semibold text-neutral-600">
            ${targetAmount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Periodo</p>
          <p className="text-lg font-semibold text-neutral-600">{period}</p>
        </div>
      </div>
      <div className="w-32 h-32 mx-auto mb-4">
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "#16A34A",
            textColor: "#16A34A",
            trailColor: "#E5E7EB",
          })}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-neutral-400">Ahorrado hasta ahora</p>
        <p className="text-xl font-semibold text-success-default">
          ${currentAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SavingsProgress;
