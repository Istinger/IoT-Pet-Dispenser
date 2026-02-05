import { Bone } from "lucide-react"
const Footer = () => {
    return (
        <footer className="bg-slate-900 py-16 text-slate-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <div className="grid md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
                                    <Bone className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-extrabold tracking-tight">
                                    SnackBox
                                </span>
                            </div>
                        </div>
                        <p className="max-w-xs text-sm text-slate-400">
                            Mejorando la aliementacion de nuestras mascotas con tecnologia inteligente.
                        </p>
                    </div>

                    <div>
                        <ul className="space-y-4 text-sm">
                            <li>Acerca de Nosotros</li>
                            <li>Universidad Politecnica Salesiana</li>
                            <li>Proyecto Integrador</li>
                        </ul>
                    </div>


                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 flex justify-between text-xs text-slate-500">
                    <p>© 2024 SnackBox Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Twitter</span>
                        <span>Instagram</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
