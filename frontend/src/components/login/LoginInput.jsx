const LoginInput = ({ label, type, icon, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-900">
        {label}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full rounded-lg border border-slate-200 px-12 py-3.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
        />
      </div>
    </div>
  )
}

export default LoginInput
