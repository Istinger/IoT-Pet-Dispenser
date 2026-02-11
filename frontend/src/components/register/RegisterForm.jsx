import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"
import AuthInput from "./AuthInput"
import { ArrowRight } from "lucide-react"

const RegisterForm = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    "gmx.com"
  ]

  const isValidEmailDomain = (value) => {
    const normalized = value.trim().toLowerCase()
    const emailMatch = normalized.match(/^[^\s@]+@([^\s@]+)$/)
    if (!emailMatch) {
      return false
    }

    return commonDomains.includes(emailMatch[1])
  }

  const handleNextStep = async (e) => {
    e.preventDefault()

    if (!isValidEmailDomain(email)) {
      toast.error("Usa un correo valido).")
      return
    }

    if (password !== confirmPassword) {
      toast.error('Contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(password)) {
      toast.error('La contraseña debe contener letras y números')
      return
    }

    setLoading(true)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (data.success && data.token) {
        const userRole = data.role || 'user'
        
        // Guardar token primero en localStorage directamente
        localStorage.setItem('token', data.token)
        localStorage.setItem('userRole', userRole)
        
        // Luego actualizar el contexto
        login(data.token, userRole)
        
        toast.success('Registro exitoso!')
        
        // Pequeño delay para asegurar que el contexto se actualice
        setTimeout(() => {
          navigate('/registerPet')
        }, 100)
      } else {
        toast.error(data.message || 'Registro fallido')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Error de red. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-white">
      <div className="w-full max-w-md">



        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Crea tu cuenta
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Completa tus datos para comenzar.
          </p>

          <form className="space-y-5" onSubmit={handleNextStep}>
            <AuthInput
              label="Nombre completo"
              type="text"
              icon="user"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInput
              label="Correo electrónico"
              type="email"
              icon="mail"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              label="Contraseña"
              type="password"
              icon="lock"
              placeholder="••••••••"
              showToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthInput
              label="Confirmar contraseña"
              type="password"
              icon="lock"
              placeholder="••••••••"
              showToggle
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Siguiente paso'}
              {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default RegisterForm
