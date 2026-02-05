import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="pt-16 pb-24 lg:pt-32 lg:pb-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        <div className="flex flex-col gap-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase text-brand-600">
            Bienestar animal de última generación
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            La forma más inteligente de alimentar a tu{" "}
            <span className="text-brand-600">mejor amigo.</span>
          </h1>

          <p className="max-w-lg text-lg text-slate-600">
            Experimenta una alimentación de precisión de grado médico con porciones personalizadas
            y seguimiento para múltiples mascotas.
          </p>

          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="h-14 rounded-xl bg-brand-600 px-8 font-bold text-white shadow-xl hover:bg-brand-700">
              Explora la aplicación
            </button>
          </div>
        </div>

        <div
          className="aspect-[4/3] rounded-3xl bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAOvWRDRwZ3gR7cMfeIF7rPQCKrzyzCIDV2aYQfLbzB-7tpHiOGtUhekjokTUi6WaIyLlsGP7QD2aMnpy5yOzBmKdqZ_nq0t8fl5g3_Yp5NAGAlNVlxS_owUVsfHeQlkkSLDFTLtXvdyn4B0dWWAEpdRyOkewEwfKCaVnKmKDmBbBQJquDi9I3W0krb1l3q7Jo9AoQeQmhHLDHcaDrwj56YZ_EvZy8FQ1nq_idiMyIKRcDj5g5gBB3ktZdyTciVoZiGdoxAIe5Em7Cj)",
          }}
        />
      </div>
    </section>
  )
}

export default Hero
