import { jsPDF } from "jspdf"

const formatLabel = (value) => {
  if (!value) return "--"
  try {
    return new Date(value).toLocaleString()
  } catch (error) {
    return "--"
  }
}

const drawLineChart = (doc, x, y, width, height, values) => {
  if (values.length === 0) return

  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = Math.max(1, maxValue - minValue)

  doc.setDrawColor(15, 118, 110)
  doc.setLineWidth(1.2)

  values.forEach((value, index) => {
    const px = x + (index / Math.max(1, values.length - 1)) * width
    const py = y + height - ((value - minValue) / range) * height
    if (index === 0) {
      doc.moveTo(px, py)
    } else {
      doc.lineTo(px, py)
    }
  })

  doc.stroke()
}

const drawBarChart = (doc, x, y, width, height, values) => {
  if (values.length === 0) return

  const maxValue = Math.max(...values)
  const barWidth = width / values.length

  values.forEach((value, index) => {
    const barHeight = maxValue > 0 ? (value / maxValue) * height : 0
    const bx = x + index * barWidth
    const by = y + height - barHeight
    doc.setFillColor(37, 99, 235)
    doc.rect(bx + 2, by, Math.max(0, barWidth - 4), barHeight, "F")
  })
}

const ActivityTable = ({ logs }) => {
  const handleExport = () => {
    const recent = logs.slice(0, 10)
    const values = recent
      .map((log) => (typeof log.foodValue === "number" ? log.foodValue : null))
      .filter((value) => value !== null)

    const doc = new jsPDF({ unit: "pt", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 40
    let cursorY = 48

    doc.setFontSize(16)
    doc.text("Reporte de mascota", margin, cursorY)
    cursorY += 18

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Generado: ${new Date().toLocaleString()}`, margin, cursorY)
    cursorY += 16

    doc.setTextColor(20)
    doc.setFontSize(12)
    doc.text("Resumen", margin, cursorY)
    cursorY += 14

    doc.setFontSize(10)
    recent.forEach((log, index) => {
      if (cursorY > 260) return
      const timeLabel = formatLabel(log.timeRaw || log.time)
      const foodLabel = typeof log.foodValue === "number" ? `${log.foodValue.toFixed(0)} g` : log.foodWeight
      doc.text(`${index + 1}. ${timeLabel} - ${foodLabel}`, margin, cursorY)
      cursorY += 12
    })

    cursorY = 290
    doc.setFontSize(12)
    doc.text("Grafica linea (comida vs tiempo)", margin, cursorY)
    cursorY += 12

    const chartWidth = pageWidth - margin * 2
    const chartHeight = 120
    doc.setDrawColor(220)
    doc.rect(margin, cursorY, chartWidth, chartHeight)
    drawLineChart(doc, margin + 4, cursorY + 6, chartWidth - 8, chartHeight - 12, values)

    cursorY += chartHeight + 24
    doc.setFontSize(12)
    doc.text("Grafica barras (comida por registro)", margin, cursorY)
    cursorY += 12

    doc.setDrawColor(220)
    doc.rect(margin, cursorY, chartWidth, chartHeight)
    drawBarChart(doc, margin + 4, cursorY + 6, chartWidth - 8, chartHeight - 12, values)

    doc.save("reporte.pdf")
  }

  return (
    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className="font-bold text-xs sm:text-sm uppercase">Recent Activity</h3>
        <button
          className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors"
          onClick={handleExport}
          disabled={logs.length === 0}
        >
          Descargar PDF
        </button>
      </div>

      {/* Tabla con scroll horizontal en móvil */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-[500px]">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Device</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Time</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Food</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Animal</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.length === 0 ? (
              <tr>
                <td className="px-3 sm:px-6 py-4 sm:py-6 text-xs text-slate-500" colSpan={5}>
                  No sensor data available yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 sm:px-6 py-2 sm:py-4 font-bold text-xs sm:text-sm">{log.device}</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs text-slate-500">{log.time}</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs font-semibold">{log.foodWeight}</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs font-semibold">{log.animalWeight}</td>
                  <td className={`px-3 sm:px-6 py-2 sm:py-4 text-right text-xs font-bold ${log.statusTone}`}>
                    {log.statusLabel}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ActivityTable
