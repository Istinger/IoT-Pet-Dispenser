import { useNavigate } from "react-router-dom"
import PetInput from "./PetInput"
import ActivitySelector from "./ActivitySelector"
import { ArrowRight } from "lucide-react"

const PetForm = () => {
    const navigate = useNavigate()

    const handleNextStep = (e) => {
        e.preventDefault()
        // Aquí puedes agregar lógica para guardar info de la mascota
        navigate('/menu')
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Tell us about your dog
            </h3>
            <p className="text-slate-500 text-sm mb-8">
                Accurate details ensure the best feeding schedule.
            </p>

            <form className="space-y-6" onSubmit={handleNextStep}>
                <PetInput label="Dog's Name" placeholder="Enter name" icon="dog" />
                <PetInput label="Breed" placeholder="Search breeds" icon="search" />

                <PetInput label="Age (Years)"
                    type="number"
                    placeholder="0"
                    min={0}
                    max={25}
                    step={0.5}/>

                <PetInput label="Weight"
                    type="number"
                    placeholder="0.0"
                    icon="scale"
                    min={0.5}
                    max={100}
                    step={0.1} />


                <ActivitySelector />

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 transition-all flex justify-center gap-2 group">
                    Next: Device Setup
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center">
                    <button type="button" onClick={() => navigate('/register')} className="text-sm font-bold text-slate-500 hover:text-blue-500 transition-colors">
                        Back to account details
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PetForm
