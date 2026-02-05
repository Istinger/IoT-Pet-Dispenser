const PageHeader = ({ title, breadcrumb }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          {breadcrumb}
          <span className="text-slate-900 font-medium">{title}</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm active:scale-95">
            Save Changes
          </button>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
