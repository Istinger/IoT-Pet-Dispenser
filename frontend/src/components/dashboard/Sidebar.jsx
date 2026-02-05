import {
  LayoutDashboard,
  Calendar,
  Heart,
  Settings,
  Dog,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-64 border-r border-slate-100 bg-slate-50 h-screen sticky top-0">
      <div className="p-6 flex flex-col justify-between h-full">

        <div className="space-y-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/menu')}>
            <div className="bg-blue-500 p-2 rounded-xl text-white">
              <Dog className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">SnackBox</h1>
            </div>
          </div>

          <nav className="space-y-1">
            <NavItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={location.pathname === '/menu'}
              onClick={() => navigate('/menu')}
            />
            <NavItem 
              icon={Calendar} 
              label="Schedule"
              active={location.pathname === '/feedingSchedule'}
              onClick={() => navigate('/feedingSchedule')}
            />
            <NavItem 
              icon={Heart} 
              label="Health"
              active={location.pathname === '/petProfile'}
              onClick={() => navigate('/petProfile')}
            />
            <NavItem 
              icon={Settings} 
              label="Settings"
              active={location.pathname === '/settings'}
              onClick={() => navigate('/settings')}
            />
          </nav>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
          <div
            className="h-10 w-10 rounded-full bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcvBxr9H4NM5oBKgmm121GMwoYYku3AcLKYfF9OIJIQfeGPZoc07BXlDGecKDTfmM-ErcJJYQuwcAm_FxCCo5ctd1xuCQUi0ftSrx-d4o5Rg_TG52KRSavmpdxPSWTNk1SrINNq--I7mDnqgIoRAykTW9tjb3bGvOuWuin_DnUViR35YoejSmnSwV6LIuRYZIZ2KAntWs8Zl7LiN9EbOaEJ7ONWYV30fKmiDXG3JYuC81YiF2Iw3K0JP7CNiWPP-9o7Sl4j_SwYGBd')",
            }}
          />
          <div>
            <p className="font-bold text-sm">Cooper</p>
            <p className="text-xs text-slate-400">Labrador</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer
      ${active
        ? "bg-white text-blue-600 shadow-sm border border-slate-100"
        : "text-slate-500 hover:bg-slate-100"}
    `}
  >
    <Icon className="h-5 w-5" />
    {label}
  </div>
)

export default Sidebar
