import { ShoppingBasket } from "lucide-react"

const HopperCard = () => {
  return (
    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-center justify-between">
      <div className="space-y-4">
        <div>
          <h3 className="text-xs uppercase font-bold text-slate-400">
            Hopper Level
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold">15%</span>
            <span className="text-slate-400 text-sm">/ 5.0 kg</span>
          </div>
        </div>

        <div className="w-64">
          <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1">
            <span>Critical</span>
            <span>2 Servings left</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[15%]" />
          </div>
        </div>
      </div>

      <div className="relative h-32 w-32 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" className="stroke-slate-100" />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="3"
            strokeDasharray="100"
            strokeDashoffset="85"
            strokeLinecap="round"
            className="stroke-blue-500"
          />
        </svg>
        <ShoppingBasket className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  )
}

export default HopperCard
