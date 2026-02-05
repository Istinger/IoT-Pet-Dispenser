const AuthHero = ({ title, highlight, description, image }) => {
  return (
    <section
      className="relative hidden lg:flex lg:w-1/2 items-center justify-center p-12 overflow-hidden"
      style={{ backgroundColor: "#f0f9ff" }}
    >
      <div className="max-w-lg z-10">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
          {title.replace(highlight, "")}
          <span className="text-cyan-600">{highlight}</span>
        </h2>
        <p className="text-lg text-slate-600 mb-10">{description}</p>

        <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-cyan-100 rotate-[-2deg]">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={image} alt="Pet owner" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthHero
