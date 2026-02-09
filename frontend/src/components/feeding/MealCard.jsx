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
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${tone.bg} rounded-lg ${tone.text}`}>
            <Icon size={20} />
          </div>
          <h5 className="text-lg font-bold text-slate-900">{title}</h5>
        </div>

        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
            {isActive ? "Active" : "Paused"}
          </span>
          <button
            onClick={onDelete}
            disabled={!canDelete || isDeleting}
            className="text-xs font-bold uppercase tracking-wide text-rose-600 hover:text-rose-800 disabled:opacity-40"
            title={canDelete ? "Eliminar" : "Guarda el horario para habilitar eliminar"}
          >
            <span className="inline-flex items-center gap-1">
              <Trash2 size={14} />
              {isDeleting ? "Deleting" : "Delete"}
            </span>
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="text-xs font-bold uppercase tracking-wide text-blue-600 hover:text-blue-800 disabled:opacity-60"
          >
            {isSaving ? "Saving" : "Save"}
          </button>
        </div>
      </div>

      {/* DAYS */}
      <div className="px-6 py-4 border-b flex items-center gap-2">
        <Repeat size={16} className="text-slate-400" />
        {days.map((d, i) => (
          <span
            key={i}
            className="size-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center"
          >
            {d}
          </span>
        ))}
      </div>

      {/* BODY */}
      <div className="p-8 space-y-8 flex-1">

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Dispense Time
            </p>
            <div className="flex items-center gap-2 bg-slate-50 border rounded-xl px-3 py-2">
              <Clock size={16} className="text-slate-400" />
              <input
                type="time"
                value={time}
                onChange={(event) => onTimeChange(event.target.value)}
                className="bg-transparent border-none font-bold text-lg focus:ring-0"
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Current Portion
            </p>
            <p className="text-4xl font-black">
              {portion}
              <span className="text-sm text-slate-400 ml-1">g</span>
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

        <div className="flex gap-3 bg-blue-50/50 p-4 rounded-xl border">
          <Info size={18} className="text-blue-600" />
          <p className="text-xs font-medium text-slate-600">
            Optimal portion for current activity level.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealCard
