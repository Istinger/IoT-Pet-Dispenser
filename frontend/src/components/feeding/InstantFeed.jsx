import { Zap } from "lucide-react"

const InstantFeed = ({ value, onValueChange, onFeedNow, isLoading }) => {

  return (
    <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">

      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="size-12 sm:size-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
          <Zap size={28} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-base sm:text-lg font-bold text-emerald-900">
            Instant Dispense
          </h4>
          <p className="text-xs sm:text-sm text-emerald-700/80 line-clamp-2">
            Dispense a one-time extra portion without affecting the schedule.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase whitespace-nowrap">
            Amount
          </span>
          <input
            type="number"
            value={value}
            min={10}
            max={500}
            onChange={(event) => onValueChange(event.target.value)}
            className="w-14 sm:w-16 bg-transparent border-none text-right font-bold text-slate-900 focus:ring-0 p-0 text-base sm:text-lg"
          />
          <span className="text-xs sm:text-sm font-bold text-emerald-600">g</span>
        </div>

        <button
          onClick={onFeedNow}
          disabled={isLoading}
          className="px-6 sm:px-10 py-2.5 sm:py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-60 text-xs sm:text-sm whitespace-nowrap"
        >
          {isLoading ? "SENDING..." : "FEED NOW"}
        </button>
      </div>
    </div>
  )
}

export default InstantFeed
