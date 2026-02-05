import {
  Dog,
  Search,
  Scale,
} from "lucide-react"

const iconMap = {
  dog: Dog,
  search: Search,
  scale: Scale,
}

const PetInput = ({
  label,
  type = "text",
  placeholder,
  icon,
  min,
  max,
  step,
}) => {
  const Icon = icon ? iconMap[icon] : null

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-slate-700 text-sm font-bold ml-0.5">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2
                       h-5 w-5 text-slate-400 pointer-events-none"
          />
        )}

        <input
          type={type}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          onKeyDown={(e) => {
            // bloquea signo negativo
            if (e.key === "-" || e.key === "e") {
              e.preventDefault()
            }
          }}
          className={`
            w-full py-3.5 rounded-xl
            border border-slate-200 bg-white
            text-slate-900 placeholder:text-slate-400
            px-4 ${Icon ? "pl-12" : ""}
            focus:ring-4 focus:ring-blue-100
            focus:border-blue-500
            outline-none transition-all
          `}
        />
      </div>
    </div>
  )
}

export default PetInput
