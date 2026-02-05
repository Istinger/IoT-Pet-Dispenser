// src/admin/components/SectionHeader.jsx
import { Zap, Wifi, DownloadCloud } from "lucide-react"

const icons = {
  zap: Zap,
  wifi: Wifi,
  "download-cloud": DownloadCloud,
}

const SectionHeader = ({ title, subtitle, icon }) => {
  const Icon = icons[icon]

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="icon-box">
        <Icon />
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  )
}

export default SectionHeader
