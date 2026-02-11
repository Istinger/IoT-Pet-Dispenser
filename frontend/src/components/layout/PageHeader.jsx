import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

const PageHeader = ({ title, breadcrumb }) => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          {breadcrumb}
          <span className="text-slate-900 font-medium">{title}</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </button>
      </div>
    </header>
  )
}

export default PageHeader
