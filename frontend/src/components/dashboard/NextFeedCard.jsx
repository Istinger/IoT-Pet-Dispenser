import { useNavigate } from "react-router-dom"

const NextFeedCard = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs uppercase font-bold text-slate-400">Next Feed</h3>
        <p className="text-2xl font-bold mt-1">02:45:12</p>
        <p className="text-xs text-slate-500 mt-1">Today @ 18:00</p>
      </div>

      <button onClick={() => navigate('/feedingSchedule')} className="mt-4 w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg text-sm">
        Manage Schedule
      </button>
    </div>
  )
}

export default NextFeedCard
