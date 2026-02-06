const levels = [
  { value: "low", label: "Bajo", desc: "Ritmo más lento" },
  { value: "moderate", label: "Moderado", desc: "Activo" },
  { value: "high", label: "Alto", desc: "Atlético" },
]

const ActivitySelector = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-bold text-slate-700">
        Nivel de actividad
      </label>

      <div className="grid grid-cols-3 gap-3">
        {levels.map((l) => (
          <label key={l.value} className="cursor-pointer">
            <input 
              type="radio" 
              name="activity" 
              value={l.value}
              checked={value === l.value}
              onChange={onChange}
              className="sr-only peer" 
            />
            <div className="p-4 rounded-xl border border-slate-200 bg-white
              peer-checked:border-blue-500 peer-checked:bg-blue-50
              peer-checked:ring-1 peer-checked:ring-blue-500
              hover:bg-slate-50 transition-all text-center">
              <p className="text-sm font-bold">{l.label}</p>
              <p className="text-[10px] uppercase tracking-tight text-slate-400">
                {l.desc}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default ActivitySelector
