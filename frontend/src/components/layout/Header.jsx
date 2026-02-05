import { Bone } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
            <Bone className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            SnackBox
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="text-sm font-semibold text-slate-600 hover:text-brand-600">
            Iniciar Sesión
          </button>
          <button onClick={() => navigate('/register')} className="h-11 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white shadow-lg hover:bg-brand-700 active:scale-95">
            Registrarse
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
