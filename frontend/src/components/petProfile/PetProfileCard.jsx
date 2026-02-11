import { Pencil, Scale, Target, Clock } from "lucide-react"

const PetProfileCard = ({ name, breed, age, weight, goal, progress, img, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row h-full">
        <div
          className="w-full md:w-56 h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${img})` }}
        >

        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">{name}</h3>
                <p className="text-sm text-slate-400 font-semibold">
                  {breed} • {age}
                </p>
              </div>
              <button
                type="button"
                onClick={onEdit}
                className="p-2 hover:bg-blue-50 rounded-lg"
                aria-label="Editar mascota"
              >
                <Pencil className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Info icon={Scale} label="Weight" value={weight} />
              <Info icon={Target} label="Goal" value={goal} />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between mb-2 text-xs font-bold">
              <span className="text-slate-600">
                {progress.consumed} {progress.unit || "kcal"} consumed
              </span>
              <span className="text-emerald-600">{progress.percent}%</span>
            </div>

            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${progress.percent}%` }}
              />
            </div>

            <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 italic">
              <Clock className="h-3.5 w-3.5" />
              Next feeding: {progress.next}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Info = ({ icon: Icon, label, value }) => (
  <div className="bg-slate-50 p-3 rounded-xl border flex items-center gap-3">
    <Icon className="h-4 w-4 text-slate-400" />
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  </div>
)

export default PetProfileCard
