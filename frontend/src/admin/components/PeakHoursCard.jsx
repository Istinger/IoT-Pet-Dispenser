import { jsPDF } from "jspdf"
import BarChartMini from "./BarChartMini"

const parsePercent = (value) => {
  if (typeof value === "number") return value
  if (typeof value !== "string") return 0
  const cleaned = Number.parseFloat(value.replace("%", ""))
  return Number.isNaN(cleaned) ? 0 : cleaned
}

const drawPdfBars = (doc, x, y, width, height, bars) => {
  if (bars.length === 0) return
  const barWidth = width / bars.length

  bars.forEach((bar, index) => {
    const percent = Math.min(100, Math.max(0, parsePercent(bar.h)))
    const barHeight = (percent / 100) * height
    const bx = x + index * barWidth
    const by = y + height - barHeight

    if (bar.active) {
      doc.setFillColor(16, 185, 129)
    } else {
      doc.setFillColor(167, 243, 208)
    }

    doc.rect(bx + 2, by, Math.max(0, barWidth - 4), barHeight, "F")
    doc.setTextColor(100)
    doc.setFontSize(9)
    doc.text(bar.label, bx + 4, y + height + 12)
  })
}

const buildSummary = (bars) => {
  return bars.map((bar) => {
    const count = typeof bar.count === "number" ? bar.count : "--"
    return `${bar.label} · ${count}`
  })
}

const PeakHoursCard = ({ bars }) => {
  const handleExport = () => {
    const safeBars = Array.isArray(bars) ? bars : []
    const doc = new jsPDF({ unit: "pt", format: "a4" })
    const margin = 40
    const pageWidth = doc.internal.pageSize.getWidth()
    const chartWidth = pageWidth - margin * 2
    const chartHeight = 140

    doc.setFontSize(16)
    doc.text("Reporte de picos de dispensado", margin, 50)
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Generado: ${new Date().toLocaleString()}`, margin, 68)

    doc.setTextColor(30)
    doc.setFontSize(12)
    doc.text("Resumen (hora · activaciones)", margin, 96)

    doc.setFontSize(10)
    const summary = buildSummary(safeBars)
    summary.forEach((line, index) => {
      doc.text(line, margin, 112 + index * 12)
    })

    const chartTop = 220
    doc.setDrawColor(220)
    doc.rect(margin, chartTop, chartWidth, chartHeight)
    drawPdfBars(doc, margin + 4, chartTop + 6, chartWidth - 8, chartHeight - 20, safeBars)

    doc.save("reporte-peak-hours.pdf")
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">Feeding Peak Hours</h3>
            <p className="text-xs text-slate-400">Dispenser Activation Load</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleExport}
            className="rounded-full border border-slate-200 px-2 sm:px-3 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap"
            disabled={!bars || bars.length === 0}
          >
            Descargar PDF
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1 flex-shrink-0">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-600">LIVE</span>
          </div>
        </div>
      </div>

      <BarChartMini bars={bars} />
    </div>
  )
}

export default PeakHoursCard
