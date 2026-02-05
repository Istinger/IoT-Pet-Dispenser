const AdminFooter = () => {
  return (
    <footer className="mt-8 border-t border-slate-100 py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-10 md:flex-row">
        <p className="text-sm font-medium text-slate-400">
          © 2024 IoT Operations Insights. Optimization for React/Vite/Tailwind.
        </p>
        <div className="flex gap-8">
          <a className="text-sm font-bold text-slate-500 hover:text-emerald-500 transition-colors" href="#">
            Documentation
          </a>
          <a className="text-sm font-bold text-slate-500 hover:text-emerald-500 transition-colors" href="#">
            Support
          </a>
          <a className="text-sm font-bold text-slate-500 hover:text-emerald-500 transition-colors" href="#">
            API Keys
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AdminFooter
