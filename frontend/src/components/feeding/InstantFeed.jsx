import { Zap } from "lucide-react"

const InstantFeed = ({ value, onValueChange, onFeedNow, isLoading }) => {

  return (
    <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 shadow-sm flex flex-wrap items-center justify-between gap-6">

      <div className="flex items-center gap-4">
        <div className="size-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-600">
          <Zap size={32} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-emerald-900">
            Instant Dispense
          </h4>
          <p className="text-sm text-emerald-700/80">
            Dispense a one-time extra portion without affecting the schedule.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase">
            Amount
          </span>
          <input
            type="number"
            value={value}
            min={10}
            max={500}
            onChange={(event) => onValueChange(event.target.value)}
            className="w-16 bg-transparent border-none text-right font-bold text-slate-900 focus:ring-0 p-0 text-lg"
          />
          <span className="text-sm font-bold text-emerald-600">g</span>
        </div>

        <button
          onClick={onFeedNow}
          disabled={isLoading}
          className="px-10 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-60"
        >
          {isLoading ? "SENDING..." : "FEED NOW"}
        </button>
      </div>
    </div>
  )
}

export default InstantFeed
