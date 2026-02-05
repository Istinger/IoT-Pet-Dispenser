import { Bell } from "lucide-react"

const Topbar = () => {
  return (
    <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-lg font-bold">Overview</h2>

      <div className="flex items-center gap-4">


        <button className="relative p-2 rounded-lg hover:bg-slate-50">
          <Bell className="h-5 w-5 text-slate-400" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  )
}

export default Topbar
