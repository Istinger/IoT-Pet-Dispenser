import AuthFooter from "../components/layout/AuthFooter"
import AuthHeader from "../components/layout/AuthHeader"
import PetForm from "../components/pet/PetForm"
import AuthHero from "../components/register/AuthHero"


const RegisterPet = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <AuthHeader />

      <main className="flex min-h-screen flex-col lg:flex-row">
        <AuthHero
          title="Tailored nutrition for your"
          highlight="best friend."
          description="Large breeds have specific metabolic requirements. Tell us about your pet so we can calculate the perfect portions."
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuCMjj0AmSQ7bZDtpgt9CN8BwrjKANyYKT6f57wf7fofxHO7hbdVOg11f2s0_YNdchBe6VLxdvYaLNsGSe-Br_MTSNEJ0Qzembmlhd94dRp7VdTKtd_yQYKxdW63FDXdOIFDZZKDmv48x116Ht9PkjJzD5ncFKwDx4y1SlNB5QbMxFFSTrr-HIZzT6-Nkyff6RE6mODyIZQr0ZUoiw55IuqnutZ8N3HIDASQKB6gx9e89AwXXevht8CshukKcsLK3zSHGfDzIuKSPcFs"
        />

        <section className="flex-1 flex items-start justify-center py-10 px-6 lg:px-20">
          <div className="w-full max-w-[540px]">

            <PetForm />
          </div>
        </section>
      </main>

      <AuthFooter />
    </div>
  )
}

export default RegisterPet
