const PageHeader = () => {
  const handleSync = () => {
    console.log("Admin overview sync")
  }

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">
          Operator Dashboard
        </h1>
        <p className="mt-1 text-slate-500">
          Real-time telemetry and health diagnostics for pet feeder nodes
        </p>
      </div>

      <button
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600 active:scale-95"
        onClick={handleSync}
      >
        <span className="material-symbols-outlined !text-[20px]">refresh</span>
        Sync Live Data
      </button>
    </div>
  )
}

export default PageHeader
