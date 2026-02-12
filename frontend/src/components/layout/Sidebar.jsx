import {
  Dog,
  LayoutDashboard,
  CalendarClock,
  History,
  Settings,
  Plus,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

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
            icon={Settings} 
            label="Device Settings"
            active={location.pathname === '/settings'}
            onClick={() => navigate('/settings')}
          />

          <ActivePet navigate={navigate} />
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

const ActivePet = ({ navigate }) => {
  const { token } = useContext(AuthContext)
  const [activePet, setActivePet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivePet = async () => {
      try {
        if (!token) {
          setLoading(false)
          return
        }

        // Decodificar el token para obtener el userId
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        const { id: userId } = JSON.parse(jsonPayload)

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
        const response = await fetch(`${apiBaseUrl}/api/pets/active/${userId}`)
        const data = await response.json()

        if (data.success) {
          setActivePet(data.pet)
        }
      } catch (error) {
        console.error('Error fetching active pet:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivePet()
  }, [token])

  if (loading || !activePet) {
    return (
      <div className="mt-8">
        <p className="mb-2 px-4 text-[10px] uppercase font-bold text-slate-400">
          Active Pets
        </p>
        <div className="px-4 py-3 text-sm text-slate-500">
          No active pet
        </div>
      </div>
    )
  }

  return (
    <>
      <p className="mt-8 mb-2 px-4 text-[10px] uppercase font-bold text-slate-400">
        Active Pets
      </p>
      <div 
        onClick={() => navigate('/petProfile')}
        className="flex items-center gap-3 px-4 py-2 bg-white border rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      >
        <div
          className="h-8 w-8 rounded-full bg-cover"
          style={{
            backgroundImage: activePet.profileImage 
              ? `url('${activePet.profileImage}')`
              : "url('https://via.placeholder.com/32?text=' + activePet.name[0])"
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate">{activePet.name}</p>
          <p className="text-[10px] text-slate-500">{activePet.breed}</p>
        </div>
        <div className="h-2 w-2 bg-emerald-500 rounded-full" />
      </div>
    </>
  )
}

export default Sidebar
