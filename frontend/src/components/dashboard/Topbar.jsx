import { Bell, LogOut, Menu, X } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { LayoutDashboard, Calendar, Heart, Settings } from "lucide-react"

const Topbar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
        {/* Botón hamburguesa solo móvil */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h2 className="text-base sm:text-lg font-bold">Overview</h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 sm:h-5 w-4 sm:w-5" />
            <span className="hidden sm:inline text-sm font-medium">Cerrar</span>
          </button>
        </div>
      </header>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50" onClick={() => setMenuOpen(false)}>
          <div className="bg-slate-50 w-64 h-full p-6 border-r border-slate-100" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1">
              <NavItem 
                icon={LayoutDashboard}
                label="Dashboard" 
                active={location.pathname === '/menu'}
                onClick={() => { navigate('/menu'); setMenuOpen(false) }} 
              />
              <NavItem 
                icon={Calendar}
                label="Schedule"
                active={location.pathname === '/feedingSchedule'}
                onClick={() => { navigate('/feedingSchedule'); setMenuOpen(false) }} 
              />
              <NavItem 
                icon={Heart}
                label="Pets"
                active={location.pathname === '/petProfile'}
                onClick={() => { navigate('/petProfile'); setMenuOpen(false) }} 
              />
              <NavItem 
                icon={Settings}
                label="Settings"
                active={location.pathname === '/settings'}
                onClick={() => { navigate('/settings'); setMenuOpen(false) }} 
              />
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
      active
        ? "bg-white text-blue-600 shadow-sm border border-slate-100"
        : "text-slate-600 hover:bg-white"
    }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
)

export default Topbar
