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

  const handleNextStep = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(password)) {
      toast.error('Password must contain letters and numbers')
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
        login(data.token, userRole)
        toast.success('Registration successful!')
        navigate('/registerPet')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-white">
      <div className="w-full max-w-md">



        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Fill in your details to get started.
          </p>

          <form className="space-y-5" onSubmit={handleNextStep}>
            <AuthInput
              label="Full Name"
              type="text"
              icon="user"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInput
              label="Email Address"
              type="email"
              icon="mail"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              label="Password"
              type="password"
              icon="lock"
              placeholder="••••••••"
              showToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthInput
              label="Confirm Password"
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
              {loading ? 'Creating account...' : 'Next Step'}
              {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default RegisterForm
