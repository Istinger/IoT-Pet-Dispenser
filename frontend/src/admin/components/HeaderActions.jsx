const HeaderActions = () => {
  const handleAction = (action) => {
    console.log(`Admin header action: ${action}`)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative hidden lg:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="material-symbols-outlined text-slate-400">search</span>
        </div>
        <input
          className="h-10 w-64 rounded-lg border-none bg-slate-100 pl-10 text-sm focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search devices..."
          type="text"
        />
      </div>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
        onClick={() => handleAction("notifications")}
      >
        <span className="material-symbols-outlined">notifications</span>
      </button>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
        onClick={() => handleAction("settings")}
      >
        <span className="material-symbols-outlined">settings</span>
      </button>

      <div className="ml-2 h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
        <img
          alt="User"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuArTdker1evW0uy9ACqN2-DbZszs28MXupLSDIl4cOow3P6jRuYxRnWNKRIkzQYH8_QJQudhoMWxZlYidymQ3ArbHaR_R3hrNAj0CR54b-O4Fj6JuM2iKpym-quasSvBdrowber_M70FPqHsgaDe6uFkVJLjrxtoztmOeVErHy1MMb6cvyTOS367fRao5JQNoGdzEyz5-QqZ1DvPLTDfTCQ8mRXojyOxHqxCh4To0_Dn5VuqZ2bJHbMotZJ5cufqnJIRt0RUnKUK9kD"
        />
      </div>
    </div>
  )
}

export default HeaderActions
