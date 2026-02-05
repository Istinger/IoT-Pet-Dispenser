import { Utensils } from "lucide-react"

const QuickFeedCard = () => {
  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-100 transition-colors">
      <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm text-emerald-600">
        <Utensils className="h-7 w-7" />
      </div>
      <h3 className="font-bold text-emerald-900">Quick Feed</h3>
      <p className="text-xs text-emerald-700/70 mt-1">Dispense 50g now</p>
    </div>
  )
}

export default QuickFeedCard
