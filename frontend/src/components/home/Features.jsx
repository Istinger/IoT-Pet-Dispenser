import { Thermometer, Scale, Bell } from "lucide-react"
const FeatureCard = ({ icon: Icon, title, text }) => (
    <div className="group flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-xl transition">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <Icon className="h-7 w-7" />
        </div>

        <div>
            <h3 className="mb-3 text-xl font-bold">{title}</h3>
            <p className="text-slate-600">{text}</p>
        </div>
    </div>
)

const Features = () => {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl lg:text-4xl font-extrabold">
                        Tecnología de cuidados avanzados para mascotas
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Nuestro sistema autónomo garantiza una nutrición perfecta.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Thermometer}
                        title="Control de Calidad"
                        text="Sensores de humedad mantienen el alimento fresco."
                    />
                    <FeatureCard
                        icon={Scale}
                        title="Alimentación de Precisión"
                        text="Porciones con precisión a nivel de gramos."
                    />
                    <FeatureCard
                        icon={Bell}
                        title="Alertas en Tiempo Real"
                        text="Notificaciones instantáneas."
                    />
                </div>

            </div>
        </section>
    )
}

export default Features
