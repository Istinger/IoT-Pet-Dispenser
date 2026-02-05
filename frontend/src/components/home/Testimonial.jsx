const Testimonial = () => {
  return (
    <section className="bg-brand-600 py-24 text-white text-center">
      <blockquote className="max-w-4xl mx-auto mb-10 text-3xl lg:text-4xl font-bold italic">
        "El único comedero lo suficientemente resistente para mi husky. La calidad de fabricación y la precisión son inigualables."
      </blockquote>

      <div className="flex flex-col items-center gap-4">
        <img
          className="h-20 w-20 rounded-full border-4 border-white/20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE01pnrWlbeUP47eFDIOCbBOl4INGY5FT1ToVE-k8vRxaOJxS-Kclr4_lO9Aq1WJh9Bx2l7LvSHeXaLBAwyAGl7E_QK-gsghq4Z2pPZnQO8EWZK2MIWk6fv697nh3pnxNu435yXtUlfaIMs9fZeGGnfdm24QaUTeGY5zbwa4Ef8DcUonOhxDSkMiWWKu7sRUg5mXFT7x9i6h0Z6dWOwHMoETelO8AQ6SG5E0Yl_iLI_jraQqeV1njtY3LDO8c7IwqiA5rTc1pEC6uw"
        />
        <p className="text-lg font-bold">Mark Thompson</p>
        <p className="opacity-80">Cirujano Veterinario y Dueño de un Husky</p>
      </div>
    </section>
  )
}

export default Testimonial
