import { Bell, LogOut } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Topbar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-lg font-bold">Overview</h2>

      <div className="flex items-center gap-4">


        <button className="relative p-2 rounded-lg hover:bg-slate-50">
          <Bell className="h-5 w-5 text-slate-400" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full" />
        </button>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Cerrar Session</span>
        </button>
      </div>
    </header>
  )
}

export default Topbar
