import { useContext, useEffect, useState } from "react"
import { Camera, User, Mail } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

const ProfileCard = () => {
  const { token } = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      setError("")
      const currentToken = token || localStorage.getItem("token")
      if (!currentToken) {
        setError("No hay sesion activa.")
        return
      }

      const decoded = decodeToken(currentToken)
      if (!decoded || !decoded.id) {
        setError("No se pudo obtener el usuario.")
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

      try {
        const response = await fetch(`${apiBaseUrl}/api/users/${decoded.id}`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          setError(data.message || "No se pudo cargar el usuario.")
          return
        }

        setUser(data.user)
      } catch (fetchError) {
        console.error("Error fetching user:", fetchError)
        setError("Error al conectar con el servidor.")
      }
    }

    fetchUser()
  }, [token])

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBVP7Wr5kH-IZlHLN4Kao5AzmG43E63tqlsgmmswxv4_Ky6TXI2WhJ8ovaM7xrr98mEEt6CockvnVzQ5AMfmDpzkQa1A83M7CrK8Y20WMM9MlsdVdpwpw6mV3MHTCl0wgzPtCEc6mdaf3KOeesqSF8OqnDSULoNx4ggliXkh8Bs1bKtF-FdC9duTIS-JpwSZWMaAjtVPm663i__GwkUE0w8cpELHBSalfWTUy4i1dldM757OcaGEr8Y0BJLCqTMBK8TzxUgve5LkXg"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <button className="absolute bottom-0 right-0 p-1.5 bg-white border rounded-full">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-lg">{user?.name || "-"}</h3>
          <p className="text-sm text-slate-500">Premium Plan Member</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input label="Full Name" icon={User} value={user?.name || ""} readOnly />
      <Input
        label="Email Address"
        icon={Mail}
        value={user?.email || ""}
        type="email"
        readOnly
      />
    </div>
  )
}

const Input = ({ label, icon: Icon, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        {...props}
        className="w-full pl-10 py-2.5 rounded-xl bg-slate-50 border focus:ring-blue-600 focus:border-blue-600 text-sm"
      />
    </div>
  </div>
)

export default ProfileCard
