import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const HeaderActions = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="flex items-center gap-3">
      <button
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        onClick={handleLogout}
        type="button"
      >
        Cerrar sesion
      </button>
      <div className="ml-2 h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
        <img
          alt="User"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuArTdker1evW0uy9ACqN2-DbZszs28MXupLSDIl4cOow3P6jRuYxRnWNKRIkzQYH8_QJQudhoMWxZlYidymQ3ArbHaR_R3hrNAj0CR54b-O4Fj6JuM2iKpym-quasSvBdrowber_M70FPqHsgaDe6uFkVJLjrxtoztmOeVErHy1MMb6cvyTOS367fRao5JQNoGdzEyz5-QqZ1DvPLTDfTCQ8mRXojyOxHqxCh4To0_Dn5VuqZ2bJHbMotZJ5cufqnJIRt0RUnKUK9kD"
        />
      </div>
    </div>
  )
}

export default HeaderActions
