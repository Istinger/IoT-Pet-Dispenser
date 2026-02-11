import { useContext, useState } from "react"
import { Lock, ChevronRight } from "lucide-react"
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

const SecurityCard = () => {
  const { token } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setError("")
    setSuccess("")
  }

  const handleClose = () => {
    setIsOpen(false)
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setError("")
    setSuccess("")
    setShowPasswords(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setError("")
    setSuccess("")

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Completa todos los campos.")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("La nueva contraseña no coincide.")
      return
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError("La contraseña debe tener al menos 6 caracteres, incluyendo letras y numeros.")
      return
    }

    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) {
      setError("No hay sesion activa.")
      return
    }

    const decoded = decodeToken(currentToken)
    if (!decoded?.id) {
      setError("No se pudo obtener el usuario.")
      return
    }

    setIsSaving(true)
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

    try {
      const response = await fetch(`${apiBaseUrl}/api/users/${decoded.id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        setError(data.message || "No se pudo actualizar la contraseña.")
        return
      }

      setSuccess("Contraseña actualizada.")
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (saveError) {
      console.error("Error updating password:", saveError)
      setError("Error al conectar con el servidor.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mt-8 pt-8 border-t space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">
        Security
      </h4>

      <SecurityItem icon={Lock} label="Change Password" onClick={handleOpen} />

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Cambiar contraseña</h2>
                <p className="text-sm text-slate-500">Actualiza tu contraseña de acceso.</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500">Contrasena actual</label>
                <input
                  name="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">Nueva contrasena</label>
                <input
                  name="newPassword"
                  type={showPasswords ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">Confirmar contrasena</label>
                <input
                  name="confirmPassword"
                  type={showPasswords ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(event) => setShowPasswords(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              Mostrar contrasenas
            </label>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl border text-sm font-bold text-slate-600"
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold disabled:bg-blue-300"
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const SecurityItem = ({ icon: Icon, label, badge, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-lg">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-left">
        <span className="font-medium block">{label}</span>
        {badge && (
          <span className="text-xs font-bold uppercase text-green-600">
            {badge}
          </span>
        )}
      </div>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-400" />
  </button>
)

export default SecurityCard
