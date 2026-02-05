import AuthHeader from "../components/layout/AuthHeader"
import AuthFooter from "../components/layout/AuthFooter"
import LoginHero from "../components/login/LoginHero"
import LoginForm from "../components/login/LoginForm"

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <AuthHeader />

      <main className="flex min-h-screen flex-col lg:flex-row">
        <LoginHero />
        <LoginForm />
      </main>

      <AuthFooter />
    </div>
  )
}

export default Login
