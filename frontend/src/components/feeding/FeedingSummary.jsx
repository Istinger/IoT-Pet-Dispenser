const FeedingSummary = () => {
  return (
    <div className="bg-white border rounded-2xl p-5 flex gap-8 shadow-sm">
      <SummaryItem label="Daily Target" value="1,250g" highlight />
      <Divider />
      <SummaryItem label="Scheduled" value="950g" />
      <Divider />
      <SummaryItem label="Remaining" value="300g" muted />
    </div>
  )
}

const SummaryItem = ({ label, value, highlight, muted }) => (
  <div className="text-center">
    <p className="text-[10px] uppercase font-bold text-slate-400">{label}</p>
    <p
      className={`text-2xl font-black ${
        highlight
          ? "text-blue-600"
          : muted
          ? "text-slate-300"
          : "text-slate-900"
      }`}
    >
      {value}
    </p>
  </div>
)

const Divider = () => <div className="h-10 w-px bg-slate-100" />

export default FeedingSummary
