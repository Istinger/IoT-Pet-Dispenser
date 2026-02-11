import {
  Dog,
  LayoutDashboard,
  Users,
  CalendarDays,
  LineChart,
  Search,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const PetHeader = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-100 px-10 py-4 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-blue-600 cursor-pointer" onClick={() => navigate('/menu')}>
          <Dog className="h-8 w-8" />
          <h2 className="text-xl font-extrabold text-slate-900">SnackBox</h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavItem icon={Users} label="Profiles" active />
        </nav>
      </div>

      <div className="flex items-center gap-6">


        <IconButton icon={LogOut} onClick={handleLogout} className="text-red-500 hover:bg-red-50" />

        <div
          className="h-10 w-10 rounded-full bg-cover border cursor-pointer hover:opacity-80"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdDBsjw1_4ApyZh-I3aKIUxPPcV8O7Q0aqGAm4W6zSKjFui8aQRlr9xyVyQC-AQ0tj7WEcBgO11VnS7IvdPDRQhAiRtPSyXf_bG8s29EWy23uNGwl2Si8cGUyOyRplqdIBwL3GV-jXEpHE6XsoOoJCdhVX4YZ668j6BK3lyuiE2aZpOoRCArRftMIpwyU_GYs8zN2fy8UmTL5G3CvwmRvzitFtQni5XaKWy4Q5QBKIKrc2w8J7mvThn0sA0Qq-SElUYZI8TD-mLgjG')",
          }}
          onClick={() => navigate('/settings')}
        />
      </div>
    </header>
  )
}

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <a
    onClick={onClick}
    className={`flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
      active
        ? "text-blue-600 border-b-2 border-blue-600 pb-4 mt-4"
        : "text-slate-500 hover:text-blue-600"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </a>
)

const IconButton = ({ icon: Icon, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-full text-slate-400 hover:bg-slate-50 transition-colors ${className}`}
  >
    <Icon className="h-5 w-5" />
  </button>
)

export default PetHeader
