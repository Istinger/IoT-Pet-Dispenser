import BarChartMini from "./BarChartMini"

const PeakHoursCard = ({ bars }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Feeding Peak Hours</h3>
            <p className="text-xs text-slate-400">Dispenser Activation Load</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[10px] font-bold text-slate-600">LIVE</span>
        </div>
      </div>

      <BarChartMini bars={bars} />
    </div>
  )
}

export default PeakHoursCard
