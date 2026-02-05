import { AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AlertBanner = () => {
  const navigate = useNavigate()

  return (
  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-bold text-sm text-amber-900">Low Food Alert</p>
        <p className="text-xs text-amber-800">
          Hopper capacity is at 15%. Refill recommended.
        </p>
      </div>
    </div>
    <button onClick={() => navigate('/settings')} className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700">
      Refill Now
    </button>
  </div>
  )
}

export default AlertBanner
