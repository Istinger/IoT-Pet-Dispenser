import { Lock, ShieldCheck, ChevronRight } from "lucide-react"

const SecurityCard = () => {
  return (
    <div className="mt-8 pt-8 border-t space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">
        Security
      </h4>

      <SecurityItem icon={Lock} label="Change Password" />
      <SecurityItem
        icon={ShieldCheck}
        label="Two-Factor Auth"
        badge="Enabled"
      />
    </div>
  )
}

const SecurityItem = ({ icon: Icon, label, badge }) => (
  <button className="w-full flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-lg">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-left">
        <span className="font-medium block">{label}</span>
        {badge && (
          <span className="text-xs font-bold uppercase text-green-600">
            {badge}
          </span>
        )}
      </div>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-400" />
  </button>
)

export default SecurityCard
