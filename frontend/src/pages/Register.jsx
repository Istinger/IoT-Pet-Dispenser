import AuthHeader from "../components/layout/AuthHeader"
import AuthHero from "../components/register/AuthHero"
import RegisterForm from "../components/register/RegisterForm"
import AuthFooter from "../components/layout/AuthFooter"
const Register = () => {
  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />

      <main className="flex min-h-screen flex-col lg:flex-row">
        <AuthHero
          title="The best care for your big friend."
          highlight="big friend."
          description="Join thousands of pet parents who trust our smart feeding technology for medium-to-large breeds."
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuCMjj0AmSQ7bZDtpgt9CN8BwrjKANyYKT6f57wf7fofxHO7hbdVOg11f2s0_YNdchBe6VLxdvYaLNsGSe-Br_MTSNEJ0Qzembmlhd94dRp7VdTKtd_yQYKxdW63FDXdOIFDZZKDmv48x116Ht9PkjJzD5ncFKwDx4y1SlNB5QbMxFFSTrr-HIZzT6-Nkyff6RE6mODyIZQr0ZUoiw55IuqnutZ8N3HIDASQKB6gx9e89AwXXevht8CshukKcsLK3zSHGfDzIuKSPcFs"
        />

        <RegisterForm />
      </main>

      <AuthFooter />
    </div>
  )
}

export default Register
