// src/admin/components/FilterSelect.jsx
import { Calendar, Cpu, Filter } from "lucide-react"

const icons = {
  calendar: Calendar,
  cpu: Cpu,
  filter: Filter,
}

const FilterSelect = ({ icon, options, value, onChange }) => {
  const Icon = icon ? icons[icon] : null

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
      )}
      <select
        value={value}
        onChange={onChange}
        className={`h-11 w-full rounded-xl bg-slate-50 border-slate-200 ${Icon ? "pl-10" : "pl-4"} text-sm font-semibold focus:ring-emerald-500/20`}
      >
        {options.map(opt => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect
