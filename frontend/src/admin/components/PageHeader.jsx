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
    </div>
  )
}

export default PageHeader
