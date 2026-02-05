const LoginHero = () => {
  return (
    <div
      className="relative hidden lg:flex lg:w-1/2 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBqcGkWCMDrGDIGp8V-TInicTOCHTtdq1LyxrzVKW6HwTRRjd24g1LIhuny9wc5RExX8afGesCQpfezDtHd8jy2SWyMUzGuIFttetw0uSLhOYad0BalV2wcOTsDlH5qzknmLj1lRh8LKzmV3xpEzQSBQt47YTXfPTk1g0s00_d8_lUg1nWxhRPooP2YzIf4VNPDljj6OBFhVZaV-pvkOO5-6ION0toUOpWiCllWOQ5EJSQyvUHoRvkvI6ZMjALZwYrvHwDKVZJV3436)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

      <div className="relative mt-auto p-16 text-white max-w-lg">
        <p className="text-4xl font-bold mb-6">
          "The perfect nutrition balance for my best friend."
        </p>
        <span className="text-lg text-slate-200">
          Sarah, Golden Retriever Owner
        </span>
      </div>
    </div>
  )
}

export default LoginHero
