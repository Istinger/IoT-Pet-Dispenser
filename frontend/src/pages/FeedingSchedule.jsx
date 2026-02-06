
import { Sun, Moon, LogOut } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/layout/Sidebar"
import FeedingSummary from "../components/feeding/feedingSummary"
import InstantFeed from "../components/feeding/InstantFeed"
import MealCard from "../components/feeding/MealCard"
import { AuthContext } from "../context/AuthContext"

const FeedingSchedulePage = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex items-start justify-between">
            <div>
              <p className="text-blue-600 text-sm font-bold uppercase">
                Active Plan: High Protein Diet
              </p>
              <h3 className="text-4xl font-extrabold">
                Max's Feeding Plan
              </h3>
              <p className="text-slate-500">
                Adjust portions and timing for your Golden Retriever
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Cerrar Sesion</span>
            </button>
          </header>

          <FeedingSummary />
          <InstantFeed />

          <div className="grid xl:grid-cols-2 gap-8">
            <MealCard title="Breakfast" icon={Sun} time="07:30" portion={350} />
            <MealCard title="Dinner" icon={Moon} time="19:00" portion={600} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default FeedingSchedulePage
