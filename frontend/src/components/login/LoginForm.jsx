import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"
import LoginInput from "./LoginInput"
import LoginDivider from "./LoginDivider"

const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const commonDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "proton.me",
    "protonmail.com",
    "live.com",
    "aol.com",
    "zoho.com",
    "gmx.com",
    "snackbox.com"
  ]

  const isValidEmailDomain = (value) => {
    const normalized = value.trim().toLowerCase()
    const emailMatch = normalized.match(/^[^\s@]+@([^\s@]+)$/)
    if (!emailMatch) {
      return false
    }

    return commonDomains.includes(emailMatch[1])
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!isValidEmailDomain(email)) {
      toast.error("Usa un correo valido")
      return
    }

    setLoading(true)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success && data.token) {
        const userRole = data.role || 'user'
        login(data.token, userRole)
        toast.success('Acesso exitoso')
        
        // Redirigir según el rol
        if (userRole === 'admin') {
          navigate('/admin')
        } else {
          navigate('/menu')
        }
      } else {
        toast.error(data.message || 'Error de inicio de sesión')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Error de red. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24 bg-white">
      <div className="w-full max-w-md">

        <h1 className="mb-3 text-3xl font-extrabold">
          Bienvenido de nuevo
        </h1>
        <p className="mb-10 text-slate-500">
          Gestiona la nutrición de tu mascota con precisión.
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <LoginInput 
            label="Correo electrónico" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
          />
          <LoginInput 
            label="Contraseña" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              Recuérdame
            </label>
            <a className="text-sm font-bold text-blue-600">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <LoginDivider />

        <button onClick={() => navigate('/register')} className="mt-6 w-full rounded-lg border border-slate-200 py-3.5 font-bold hover:bg-slate-50">
          Crear una cuenta
        </button>
      </div>
    </div>
  )
}

export default LoginForm
