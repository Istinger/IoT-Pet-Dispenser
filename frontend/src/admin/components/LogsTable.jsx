// src/admin/components/LogsTable.jsx
import StatusBadge from "./StatusBadge"
import Pagination from "./Pagination"

const LogsTable = ({ logs }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="th">Timestamp</th>
            <th className="th">Device</th>
            <th className="th">Animal Weight</th>
            <th className="th">Food Weight</th>
            <th className="th">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td className="td text-slate-500" colSpan={5}>No sensor logs available.</td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="td">{log.time}</td>
                <td className="td font-bold">{log.device}</td>
                <td className="td">{log.temperature}</td>
                <td className="td">{log.humidity}</td>
                <td className="td">
                  <StatusBadge status={log.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination />
    </div>
  )
}

export default LogsTable
