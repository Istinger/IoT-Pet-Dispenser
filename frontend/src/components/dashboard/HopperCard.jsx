import { ShoppingBasket } from "lucide-react"

const HopperCard = ({ capacityGrams = 5000, servingGrams = 50, weightFood }) => {
  const grams = typeof weightFood === "number" ? Math.max(0, weightFood) : null
  const percent = grams === null ? 0 : Math.min(100, (grams / capacityGrams) * 100)
  const servingsLeft = grams === null ? 0 : Math.max(0, Math.floor(grams / servingGrams))
  const label = grams === null
    ? "Desconocido"
    : percent < 20
      ? "Critico"
      : percent < 40
        ? "Advertencia"
        : "OK"
  const barTone = percent < 20 ? "bg-rose-500" : percent < 40 ? "bg-amber-500" : "bg-blue-500"
  const textTone = percent < 20 ? "text-rose-500" : percent < 40 ? "text-amber-500" : "text-blue-500"
  const strokeTone = percent < 20 ? "stroke-rose-500" : percent < 40 ? "stroke-amber-500" : "stroke-blue-500"
  return (
    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-center justify-between">
      <div className="space-y-4">
        <div>
          <h3 className="text-xs uppercase font-bold text-slate-400">
            Nivel de comida
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold">{Math.round(percent)}%</span>
            <span className="text-slate-400 text-sm">/ {grams === null ? "--" : (capacityGrams / 1000).toFixed(1)} kg</span>
          </div>
        </div>

        <div className="w-64">
          <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1">
            <span>{label}</span>
            <span>{grams === null ? "--" : `${servingsLeft} Servings left`}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className={`${barTone} h-full rounded-full`} style={{ width: `${Math.round(percent)}%` }} />
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
            strokeDashoffset={100 - Math.round(percent)}
            strokeLinecap="round"
            className={strokeTone}
          />
        </svg>
        <ShoppingBasket className={`h-8 w-8 ${textTone}`} />
      </div>
    </div>
  )
}

export default HopperCard
