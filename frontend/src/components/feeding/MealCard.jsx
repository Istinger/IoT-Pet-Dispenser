import { Clock, Info } from "lucide-react"
import PortionSlider from "./PortionSlider"

const MealCard = ({ title, icon: Icon, time, portion }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
      <header className="p-6 border-b bg-slate-50/30 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Icon className="h-5 w-5" />
          </div>
          <h5 className="text-lg font-bold">{title}</h5>
        </div>
      </header>

      <div className="p-8 space-y-8 flex-1">
        <div className="flex justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Dispense Time
            </span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <input
                type="time"
                defaultValue={time}
                className="bg-slate-50 border rounded-lg px-3 py-1 text-xl font-bold"
              />
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Current Portion
            </span>
            <p className="text-4xl font-black">
              {portion}
              <span className="text-sm text-slate-400 ml-1">g</span>
            </p>
          </div>
        </div>

        <PortionSlider value={portion} />

        <div className="flex items-start gap-4 bg-blue-50/50 p-4 rounded-xl border">
          <Info className="h-5 w-5 text-blue-600" />
          <p className="text-xs font-medium text-slate-600">
            Optimal portion for today's activity level.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealCard
