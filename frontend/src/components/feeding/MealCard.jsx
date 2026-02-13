import { Sun, Moon, Clock, Repeat, Info, Trash2 } from "lucide-react"

const iconMap = {
  sun: Sun,
  moon: Moon,
}

const colorMap = {
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
}

const MealCard = ({
  title,
  icon,
  color,
  time,
  portion,
  min,
  max,
  days,
  isActive,
  onTimeChange,
  onPortionChange,
  onSave,
  isSaving,
  onDelete,
  canDelete,
  isDeleting,
}) => {
  const Icon = iconMap[icon]
  const tone = colorMap[color] || colorMap.blue

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

      {/* HEADER */}
      <div className="p-3 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50/30 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`p-2 ${tone.bg} rounded-lg ${tone.text}`}>
            <Icon size={18} />
          </div>
          <h5 className="text-base sm:text-lg font-bold text-slate-900">{title}</h5>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <span className={`font-bold ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
            {isActive ? "Active" : "Paused"}
          </span>
          <button
            onClick={onDelete}
            disabled={!canDelete || isDeleting}
            className="font-bold uppercase tracking-wide text-rose-600 hover:text-rose-800 disabled:opacity-40 transition-colors"
            title={canDelete ? "Eliminar" : "Guarda el horario para habilitar eliminar"}
          >
            <span className="inline-flex items-center gap-1">
              <Trash2 size={14} />
              <span className="hidden sm:inline">{isDeleting ? "Deleting" : "Delete"}</span>
            </span>
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="font-bold uppercase tracking-wide text-blue-600 hover:text-blue-800 disabled:opacity-60 transition-colors"
          >
            <span className="hidden sm:inline">{isSaving ? "Saving" : "Save"}</span>
            <span className="sm:hidden">{isSaving ? "..." : "✓"}</span>
          </button>
        </div>
      </div>

      {/* DAYS */}
      <div className="px-3 sm:px-6 py-2 sm:py-4 border-b flex items-center gap-1 sm:gap-2 overflow-x-auto">
        <Repeat size={16} className="text-slate-400 flex-shrink-0" />
        {days.map((d, i) => (
          <span
            key={i}
            className="size-7 sm:size-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
          >
            {d}
          </span>
        ))}
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-8 space-y-4 sm:space-y-8 flex-1">

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 sm:items-center">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Dispense Time
            </p>
            <div className="flex items-center gap-2 bg-slate-50 border rounded-xl px-2 sm:px-3 py-2 mt-1">
              <Clock size={14} className="text-slate-400" />
              <input
                type="time"
                value={time}
                onChange={(event) => onTimeChange(event.target.value)}
                className="bg-transparent border-none font-bold text-base sm:text-lg focus:ring-0 w-full"
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Current Portion
            </p>
            <p className="text-2xl sm:text-4xl font-black">
              {portion}
              <span className="text-xs sm:text-sm text-slate-400 ml-1">g</span>
            </p>
          </div>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={portion}
          onChange={(event) => onPortionChange(Number(event.target.value))}
          className="w-full"
        />

        <div className="flex gap-2 sm:gap-3 bg-blue-50/50 p-3 sm:p-4 rounded-xl border">
          <Info size={16} className="text-blue-600 flex-shrink-0" />
          <p className="text-xs font-medium text-slate-600">
            Optimal portion for current activity level.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealCard
