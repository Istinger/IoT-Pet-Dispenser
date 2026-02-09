import { useEffect, useMemo, useState } from "react"
import AdminLayout from "../componentslayout/AdminLayout"
import PageHeader from "../components/PageHeader"
import StatDoughnutCard from "../components/StatDoughnutCard"
import PeakHoursCard from "../components/PeakHoursCard"

const AdminOverview = () => {
  const [sensors, setSensors] = useState([])
  const hopperCapacity = 5000

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
        const response = await fetch(`${apiBaseUrl}/api/sensors`)
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          setSensors([])
          return
        }

        setSensors(payload.data)
      } catch (error) {
        console.error("Failed to load sensor summary", error)
        setSensors([])
      }
    }

    fetchSensors()
  }, [])

  const summary = useMemo(() => {
    let optimal = 0
    let warning = 0
    let critical = 0

    sensors.forEach((item) => {
      if (typeof item.weightFood !== "number") {
        return
      }
      const percent = (item.weightFood / hopperCapacity) * 100
      if (percent < 20) {
        critical += 1
      } else if (percent < 40) {
        warning += 1
      } else {
        optimal += 1
      }
    })

    return { optimal, warning, critical }
  }, [sensors])

  const peakBars = useMemo(() => {
    const buckets = [6, 8, 10, 12, 14, 16, 18, 20]
    const counts = buckets.reduce((acc, hour) => {
      acc[hour] = 0
      return acc
    }, {})

    sensors.forEach((item) => {
      const hasDispense = item.dispensing === true
        || (typeof item.portionDelivered === "number" && item.portionDelivered > 0)
      if (!hasDispense) return

      const timestamp = new Date(item.createdAt)
      const hour = timestamp.getHours()
      if (counts[hour] !== undefined) {
        counts[hour] += 1
      }
    })

    const max = Math.max(1, ...Object.values(counts))
    const peakHour = Object.keys(counts).reduce((prev, curr) =>
      counts[Number(curr)] > counts[Number(prev)] ? curr : prev
    , String(buckets[0]))

    return buckets.map((hour) => ({
      label: `${String(hour).padStart(2, "0")}:00`,
      h: `${Math.round((counts[hour] / max) * 100)}%`,
      active: String(hour) === peakHour,
    }))
  }, [sensors])

  return (
    <AdminLayout>
      <PageHeader />

      <div className="rounded-3xl bg-slate-50 p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StatDoughnutCard
            optimalCount={summary.optimal}
            warningCount={summary.warning}
            criticalCount={summary.critical}
          />
          <PeakHoursCard bars={peakBars} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminOverview
