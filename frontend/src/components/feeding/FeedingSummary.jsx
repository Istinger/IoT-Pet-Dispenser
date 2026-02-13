const formatGrams = (value) => {
  if (typeof value !== "number") return "--"
  return `${value.toLocaleString()}g`
}

const FeedingSummary = ({ dailyTargetGrams, scheduledGrams, remainingGrams }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 shadow-sm">
      <SummaryItem label="Daily Target" value={formatGrams(dailyTargetGrams)} color="text-blue-600" />
      <Divider />
      <SummaryItem label="Scheduled" value={formatGrams(scheduledGrams)} />
      <Divider />
      <SummaryItem label="Remaining" value={formatGrams(remainingGrams)} color="text-slate-300" />
    </div>
  )
}

const SummaryItem = ({ label, value, color = "text-slate-900" }) => (
  <div className="text-center flex-1 sm:flex-none">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <p className={`text-xl sm:text-2xl font-black ${color}`}>{value}</p>
  </div>
)

const Divider = () => <div className="hidden sm:block h-10 w-px bg-slate-100" />

export default FeedingSummary
