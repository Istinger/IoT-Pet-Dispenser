const IntegrationCard = ({ img, title, text }) => {
  return (
    <div className="flex flex-col gap-4 group min-w-0">
      <div
        className="aspect-video w-full rounded-2xl bg-cover bg-center overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="w-full h-full bg-brand-600/10 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="px-2 min-w-0">
        <h3 className="text-xl font-bold text-slate-900 break-words">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed break-words">
          {text}
        </p>
      </div>
    </div>
  )
}

const Integration = () => {
  const items = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVp-4vMdxoGn6FApEUc1fUDx9b_yiul51lQiVApWPA5goJPXQy_bidb7jmbojYdnRGLql7s7q5B8xsvM6LV2uqUgXn53iSj7jORHjHup7tobIaRl4mqKNGLORcZJ2UaZmDbFsN1I9P1_hjMwwJabGzsK7DQPA0PcoTRAL2VVHVkyV8Y12KkJQtqK48pNfIkvqJHMZLCAAbNnBtQjLROc-HGUDkLjhRJaSSn1MpjuVwmZE74vEdDgBF3cgiLztLOdrqmb7Trb-PwZAQ",
      title: "Web & Mobile Dashboard",
      text: "Monitorea la ingesta calórica y los patrones nutricionales de su mascota",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAGiDdTocUtmZQJCt61nlc_lV9G2nsgbZyb6Qan-rcgjGwdH55er5mDZ_Yap5PaeGQ2gnXKcTfNVoldp0UAFxeYfwOfOdIk-PV3yljy7XPz8ALpXlkAO2NsbYeH0CTnd8sbCsgmLTCv4L6-KiHrZlNJYfxzmkJ9At-iu9iPmT_Ue30dwEk5c99SgYJSnmmAY1WUg_KU5ZlKArUt6Q0bKNj_YXbErGbPTUiNj7Uym3VDQ8Kih22NfAi3s1y79ERLlHQiYZTGQ4zn49u",
      title: "La Unidad Física",
      text: "Un acabado minimalista que parece un electrodoméstico de alta gama, no un juguete para mascotas.",
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="pb-10 text-center text-3xl font-extrabold text-slate-900">
          Integración Perfecta en Tu Vida
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <IntegrationCard
              key={item.title}
              img={item.img}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Integration
