import { Info, AlertTriangle, ArrowRight } from "lucide-react"

const InsightsSection = () => {
  return (
    <section>
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-extrabold">Health & Nutrition Insights</h3>
        <button className="text-blue-600 text-xs font-bold flex items-center gap-2 uppercase">
          Full Report <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-6">
            Weekly Calorie Trend
          </p>

          <div className="h-44 flex items-end gap-3">
            {[60, 80, 45, 90, 70, 65, 15].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-lg ${
                  i === 5 ? "bg-blue-600" : "bg-slate-100"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <Insight
            icon={Info}
            title="Smart Tip: Hydration"
            text="Consider adding 10% more water during high-activity days."
            color="blue"
          />
          <Insight
            icon={AlertTriangle}
            title="Low Supply Alert"
            text="Large Breed Adult kibble is running low. Auto-reorder active."
            color="amber"
          />
        </div>
      </div>
    </section>
  )
}

const Insight = ({ icon: Icon, title, text, color }) => (
  <div className="flex gap-4">
    <div className={`p-2 bg-${color}-50 text-${color}-600 rounded-lg`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm font-extrabold">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{text}</p>
    </div>
  </div>
)

export default InsightsSection
