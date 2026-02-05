const ActivityTable = ({ logs }) => {
  return (
    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase">Recent Activity</h3>
        <button className="text-xs font-bold text-blue-600">View History</button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold">
          <tr>
            <th className="px-6 py-4">Device</th>
            <th className="px-6 py-4">Time</th>
            <th className="px-6 py-4">Temp</th>
            <th className="px-6 py-4">Humidity</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {logs.length === 0 ? (
            <tr>
              <td className="px-6 py-6 text-sm text-slate-500" colSpan={5}>
                No sensor data available yet.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold">{log.device}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{log.time}</td>
                <td className="px-6 py-4 text-xs font-semibold">{log.temperature}</td>
                <td className="px-6 py-4 text-xs font-semibold">{log.humidity}</td>
                <td className={`px-6 py-4 text-right text-xs font-bold ${log.statusTone}`}>
                  {log.statusLabel}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ActivityTable
