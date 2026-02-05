const BarChartMini = ({ bars }) => {
  const fallbackBars = [
    { h: "35%", label: "06:00", active: false },
    { h: "60%", label: "08:00", active: false },
    { h: "95%", label: "10:00", active: true },
    { h: "50%", label: "12:00", active: false },
    { h: "45%", label: "14:00", active: false },
    { h: "75%", label: "16:00", active: false },
    { h: "85%", label: "18:00", active: false },
    { h: "40%", label: "20:00", active: false },
  ]
  const chartBars = bars && bars.length > 0 ? bars : fallbackBars

  return (
    <div className="flex h-56 items-end justify-between gap-2 px-2 pb-2">
      {chartBars.map((b) => (
        <div key={b.label} className="group relative flex h-full flex-1 flex-col items-center justify-end">
          <div
            className={[
              "w-full rounded-t-lg transition-all",
              b.active ? "bg-emerald-500 shadow-md shadow-emerald-100" : "bg-emerald-100 group-hover:bg-emerald-200",
            ].join(" ")}
            style={{ height: b.h }}
          />
          <span className={["mt-3 text-[10px] font-bold", b.active ? "text-slate-900" : "text-slate-400"].join(" ")}>
            {b.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default BarChartMini
