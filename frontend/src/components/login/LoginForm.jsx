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

  const handleLogin = async (e) => {
    e.preventDefault()
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
        toast.success('Login successful!')
        
        // Redirigir según el rol
        if (userRole === 'admin') {
          navigate('/admin')
        } else {
          navigate('/menu')
        }
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24 bg-white">
      <div className="w-full max-w-md">

        <h1 className="mb-3 text-3xl font-extrabold">
          Welcome back
        </h1>
        <p className="mb-10 text-slate-500">
          Manage your pet's nutrition with precision.
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <LoginInput 
            label="Email address" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <LoginInput 
            label="Password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              Remember me
            </label>
            <a className="text-sm font-bold text-blue-600">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <LoginDivider />

        <button onClick={() => navigate('/register')} className="mt-6 w-full rounded-lg border border-slate-200 py-3.5 font-bold hover:bg-slate-50">
          Create an account
        </button>
      </div>
    </div>
  )
}

export default LoginForm
