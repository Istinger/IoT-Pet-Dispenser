import {
  Dog,
  LayoutDashboard,
  CalendarClock,
  History,
  Settings,
  Plus,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-6 flex flex-col gap-8 h-full">
        <Brand onClick={() => navigate('/menu')} />

        <nav className="flex flex-col gap-1 flex-1">
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={location.pathname === '/menu'}
            onClick={() => navigate('/menu')}
          />
          <NavItem
            icon={CalendarClock}
            label="Feeding Schedule"
            active={location.pathname === '/feedingSchedule'}
            onClick={() => navigate('/feedingSchedule')}
          />
          <NavItem 
            icon={History} 
            label="Nutrition Logs"
            active={location.pathname === '/nutrition'}
            onClick={() => navigate('/nutrition')}
          />
          <NavItem 
            icon={Settings} 
            label="Device Settings"
            active={location.pathname === '/settings'}
            onClick={() => navigate('/settings')}
          />

          <ActivePet />
        </nav>

        <button onClick={() => navigate('/registerPet')} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 bg-white border font-bold hover:bg-slate-100">
          <Plus className="h-4 w-4" />
          Add New Pet
        </button>
      </div>
    </aside>
  )
}

const Brand = ({ onClick }) => (
  <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
    <div className="bg-blue-600 rounded-xl p-2 text-white">
      <Dog />
    </div>
    <div>
      <h1 className="font-bold">SnackBox</h1>
      <p className="text-xs text-slate-500">Large Breed Edition</p>
    </div>
  </div>
)

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
      active
        ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100"
        : "text-slate-600 hover:bg-white hover:shadow-sm"
    }`}
  >
    <Icon className="h-5 w-5" />
    <span className="text-sm">{label}</span>
  </div>
)

const ActivePet = () => (
  <>
    <p className="mt-8 mb-2 px-4 text-[10px] uppercase font-bold text-slate-400">
      Active Pets
    </p>
    <div className="flex items-center gap-3 px-4 py-2 bg-white border rounded-xl shadow-sm">
      <div
        className="h-8 w-8 rounded-full bg-cover"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC90WdJ1NGH8GJs-mWNk_RitMtqa0_60v_TPb6WeuaoJwKqyrEttApjAPCLdh_wx6aQuIx8txY7F9GaLzmb0BVMmd7tkP2mfOD0SlAQ46xn8WSEDDyGcN8J5wmUko4OrVw744lSgdyPYPe1X5dahBcTUB900jQZqU4IFjxwjIdT_mv4rnMtNlFKY-On8k07mdOyb68-9iA00ZF3NZ6DE84qw-dXGLA6oi0PxW-6OEcyLR6qu-W97FZPFhYrODSZUoDOpbUsFfDAlWyl')",
        }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold truncate">Max</p>
        <p className="text-[10px] text-slate-500">Golden Retriever</p>
      </div>
      <div className="h-2 w-2 bg-emerald-500 rounded-full" />
    </div>
  </>
)

export default Sidebar
