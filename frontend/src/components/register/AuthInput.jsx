import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react"
import { useState } from "react"

const iconMap = {
  user: User,
  mail: Mail,
  lock: Lock,
}

const AuthInput = ({
  label,
  type = "text",
  placeholder,
  icon,        // "user" | "mail" | "lock"
  showToggle,  // true para password
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false)

  const Icon = icon ? iconMap[icon] : null
  const isPassword = type === "password"
  const inputType = isPassword && show ? "text" : type

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {/* Icono izquierdo */}
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2
                       h-5 w-5 text-slate-400 pointer-events-none"
          />
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className={`
            w-full h-12 rounded-xl
            bg-slate-50 border border-slate-200
            text-slate-900 placeholder:text-slate-400
            px-4 ${Icon ? "pl-11" : ""}
            ${isPassword ? "pr-11" : ""}
            focus:bg-white focus:border-cyan-500
            focus:ring-2 focus:ring-cyan-500/20
            outline-none transition-all
          `}
        />

        {/* Toggle password */}
        {isPassword && showToggle && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       text-slate-400 hover:text-slate-600 transition-colors"
          >
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthInput
