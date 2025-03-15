
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface SavingsCalendarProps {
  targetAmount: number;
  dailyAmount: number;
  period: string;
  onSavingsUpdate: (savedAmount: number) => void;
}

interface CalendarDay {
  day: number;
  amount: number;
  completed: boolean;
  amountSaved: number;
}

const SavingsCalendar = ({ targetAmount, dailyAmount, period, onSavingsUpdate }: SavingsCalendarProps) => {
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [savedAmount, setSavedAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 10;
  
  // Initialize calendar days when inputs change
  useEffect(() => {
    // Parse the period string to get the total days
    const [value, unit] = period.split(" ");
    let totalDays = parseInt(value);
    
    if (unit === "semanas") {
      totalDays = totalDays * 7;
    } else if (unit === "meses") {
      totalDays = totalDays * 30;
    }

    // Initialize calendar days
    const calendarDays: CalendarDay[] = [];
    for (let i = 1; i <= totalDays; i++) {
      calendarDays.push({
        day: i,
        amount: dailyAmount,
        completed: false,
        amountSaved: 0
      });
    }
    setDays(calendarDays);
    
    // Reset saved amount
    setSavedAmount(0);
    
    // Notify parent component - but only when the inputs change
    onSavingsUpdate(0);
  }, [targetAmount, dailyAmount, period]); // Removed onSavingsUpdate from dependencies

  const markDayComplete = (index: number) => {
    const updatedDays = [...days];
    const day = updatedDays[index];
    
    // Toggle completion state
    day.completed = !day.completed;
    
    // Update amount saved
    day.amountSaved = day.completed ? day.amount : 0;
    
    setDays(updatedDays);
    
    // Update total saved amount
    const newSavedAmount = updatedDays.reduce(
      (total, day) => total + day.amountSaved, 
      0
    );
    setSavedAmount(newSavedAmount);
    
    // Notify parent component
    onSavingsUpdate(newSavedAmount);
  };

  const getTotalPages = () => {
    return Math.ceil(days.length / daysPerPage);
  };

  const getDisplayedDays = () => {
    const startIndex = currentPage * daysPerPage;
    return days.slice(startIndex, startIndex + daysPerPage);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-neutral-500 mb-4">
        Calendario de Ahorro
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-neutral-400">Progreso Total</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-neutral-600">
            ${savedAmount.toLocaleString()} / ${targetAmount.toLocaleString()}
          </p>
          <p className="text-lg font-semibold text-green-600">
            {targetAmount > 0 ? Math.round((savedAmount / targetAmount) * 100) : 0}%
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 font-medium text-neutral-500 mb-2 text-sm">
          <div>Día</div>
          <div>Cantidad</div>
          <div>Estado</div>
        </div>
        
        <div className="space-y-2">
          {getDisplayedDays().map((day, index) => (
            <div 
              key={day.day} 
              className={`grid grid-cols-3 p-2 rounded-lg text-sm ${day.completed ? 'bg-green-50' : 'bg-white'}`}
            >
              <div className="font-medium">Día {day.day}</div>
              <div>${day.amount.toLocaleString()}</div>
              <div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={day.completed ? "bg-green-100 border-green-500 text-green-700" : ""}
                  onClick={() => markDayComplete(index + currentPage * daysPerPage)}
                >
                  {day.completed ? "Completado" : "Pendiente"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {getTotalPages() > 1 && (
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Anterior
          </Button>
          <span className="text-sm text-neutral-500">
            Página {currentPage + 1} de {getTotalPages()}
          </span>
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.min(getTotalPages() - 1, prev + 1))}
            disabled={currentPage === getTotalPages() - 1}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavingsCalendar;
