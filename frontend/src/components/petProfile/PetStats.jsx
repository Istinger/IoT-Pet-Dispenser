import { BarChart3, Package, Wifi } from "lucide-react"

const PetStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <Stat icon={BarChart3} label="Total Intake" value="2,650 kcal" />
      <Stat icon={Package} label="Food Supply" value="12 Days Left" />
      <Stat icon={Wifi} label="Feeders" value="2 Active" highlight />
    </div>
  )
}

const Stat = ({ icon: Icon, label, value, highlight }) => (
  <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-xs uppercase font-bold text-slate-400">{label}</p>
      <p
        className={`text-xl font-extrabold ${
          highlight ? "text-blue-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
)

export default PetStats
