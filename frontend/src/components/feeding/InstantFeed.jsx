import { Zap } from "lucide-react"

const InstantFeed = () => {
  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-wrap justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
          <Zap className="h-8 w-8" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-emerald-900">
            Instant Dispense
          </h4>
          <p className="text-sm text-emerald-700/80">
            One-time extra portion without affecting schedule.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase">
            Amount
          </span>
          <input
            type="number"
            defaultValue={100}
            className="w-16 text-right font-bold bg-transparent focus:ring-0"
          />
          <span className="font-bold text-emerald-600">g</span>
        </div>
        <button className="px-10 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all">
          FEED NOW
        </button>
      </div>
    </div>
  )
}

export default InstantFeed
