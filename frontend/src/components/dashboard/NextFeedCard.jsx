import { useNavigate } from "react-router-dom"

const NextFeedCard = ({ dispensing, portionTarget, portionDelivered }) => {
  const navigate = useNavigate()
  const targetValue = typeof portionTarget === "number" ? `${portionTarget.toFixed(0)} g` : "--"
  
  const deliveredValue = typeof portionDelivered === "number" ? `${portionDelivered.toFixed(0)} g` : "--"
  const statusLabel = dispensing ? "Llenar ahora" : "Inactivo"

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs uppercase font-bold text-slate-400">Estado del dispensador</h3>
        <p className="text-xl sm:text-2xl font-bold mt-1">{statusLabel}</p>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">Objetivo: {targetValue} · Entregado: {deliveredValue}</p>
      </div>

      <button onClick={() => navigate('/feedingSchedule')} className="mt-3 sm:mt-4 w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg text-xs sm:text-sm transition-colors">
        Administrar horario
      </button>
    </div>
  )
}

export default NextFeedCard
