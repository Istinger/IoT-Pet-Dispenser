// src/admin/components/BarChart.jsx
const BarChart = ({ bars }) => {
  const fallback = [
    { label: "Excellent", height: "85%" },
    { label: "Good", height: "60%" },
    { label: "Fair", height: "25%" },
    { label: "Poor", height: "10%" },
  ]
  const chartBars = bars && bars.length > 0 ? bars : fallback

  return (
    <div className="flex h-64 items-end gap-6 px-4">
      {chartBars.map(b => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-slate-900 rounded-t-lg" style={{ height: b.height }} />
          <span className="text-xs text-slate-400">{b.label}</span>
        </div>
      ))}
    </div>
  )
}

export default BarChart
