const StatDoughnutCard = ({
  optimalCount = 712,
  warningCount = 94,
  criticalCount = 22,
}) => {
  const totalCount = optimalCount + warningCount + criticalCount
  const optimalPercent = totalCount > 0 ? Math.round((optimalCount / totalCount) * 100) : 0
  const optimalOffset = 251.2 * (1 - optimalPercent / 100)
  const warningOffset = 251.2 * (1 - (warningCount / (totalCount || 1)) * 100 / 100)

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <span className="material-symbols-outlined">humidity_low</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Sensor Health Summary</h3>
            <p className="text-xs text-slate-400">Relative Humidity Monitoring</p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Real-time</span>
      </div>

      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-around">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="text-slate-100"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="currentColor"
              strokeWidth="12"
            />
            <circle
              className="text-emerald-500"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="currentColor"
              strokeDasharray="251.2"
              strokeDashoffset={optimalOffset}
              strokeLinecap="round"
              strokeWidth="12"
              style={{
                transition: "stroke-dashoffset 0.35s",
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
            <circle
              className="text-amber-400"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="currentColor"
              strokeDasharray="251.2"
              strokeDashoffset={warningOffset}
              strokeLinecap="round"
              strokeWidth="12"
              style={{
                transition: "stroke-dashoffset 0.35s",
                transform: "rotate(50deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900">{optimalPercent}%</span>
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-tight">Optimal</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto">
          <div className="flex items-center justify-between gap-8 rounded-lg border border-slate-50 p-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-slate-600">Optimal Range</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{optimalCount} Units</span>
          </div>

          <div className="flex items-center justify-between gap-8 rounded-lg border border-slate-50 p-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="text-sm font-medium text-slate-600">Moderate Warning</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{warningCount} Units</span>
          </div>

          <div className="flex items-center justify-between gap-8 rounded-lg border border-slate-50 p-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="text-sm font-medium text-slate-600">Critical Fault</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{criticalCount} Units</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatDoughnutCard
