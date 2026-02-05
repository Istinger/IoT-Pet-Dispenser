// src/admin/components/DoughnutChart.jsx
const DoughnutChart = ({ percent = 95 }) => {
  const safePercent = Math.max(0, Math.min(100, percent))
  const dashOffset = 251.2 * (1 - safePercent / 100)

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-12">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          <circle r="40" cx="50" cy="50" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle
            r="40"
            cx="50"
            cy="50"
            stroke="#0f172a"
            strokeWidth="12"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black">{safePercent}%</span>
          <span className="text-xs text-slate-400">Success</span>
        </div>
      </div>
    </div>
  )
}

export default DoughnutChart
