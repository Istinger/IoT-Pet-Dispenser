// src/admin/components/StatCard.jsx
import { Timer, CloudCheck, Database } from "lucide-react"

const icons = {
  timer: Timer,
  "cloud-check": CloudCheck,
  database: Database,
}

const StatCard = ({ title, value, footer, icon }) => {
  const Icon = icons[icon]

  return (
    <div className="card">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="icon-box">
          <Icon />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400">{footer}</p>
    </div>
  )
}

export default StatCard
