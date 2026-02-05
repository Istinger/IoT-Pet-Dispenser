const RegionalFaultsCard = () => {
  const regions = [
    { name: "North America", incidents: "12 Incidents", rose: "65%", amber: "35%" },
    { name: "Europe", incidents: "8 Incidents", rose: "30%", amber: "70%" },
    { name: "Asia Pacific", incidents: "15 Incidents", rose: "80%", amber: "20%" },
    { name: "South America", incidents: "4 Incidents", rose: "50%", amber: "50%" },
  ]

  return (
    <div className="lg:col-span-2 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
            <span className="material-symbols-outlined">report_problem</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Regional Device Faults</h3>
            <p className="text-xs text-slate-400">Categorized Maintenance Logs</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="text-xs font-semibold text-slate-600">Mechanical Failure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-slate-600">Connectivity Issue</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {regions.map((r) => (
          <div key={r.name} className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700">{r.name}</span>
              <span className="text-xs font-medium text-slate-400">{r.incidents}</span>
            </div>

            <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-rose-500" style={{ width: r.rose }} />
              <div className="h-full bg-amber-400" style={{ width: r.amber }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegionalFaultsCard
