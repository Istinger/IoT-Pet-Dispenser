// src/admin/components/LineChart.jsx
const LineChart = ({ points }) => {
  const fallback = [80, 74, 86, 70, 76, 55, 60, 40, 50, 30, 25]
  const data = points && points.length > 1 ? points : fallback
  const width = 400
  const height = 150
  const pad = 10
  const xStep = width / (data.length - 1)

  const toY = (value) => {
    const clamped = Math.max(0, Math.min(100, value))
    return height - pad - (clamped / 100) * (height - pad * 2)
  }

  const path = data
    .map((value, index) => `${index === 0 ? "M" : "L"}${index * xStep},${toY(value)}`)
    .join(" ")

  return (
    <div className="relative h-64">
      <svg viewBox="0 0 400 150" className="w-full h-full">
        <path
          d={path}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d={`${path} L${width},${height} L0,${height} Z`}
          fill="rgba(15,23,42,0.05)"
        />
      </svg>
    </div>
  )
}

export default LineChart
