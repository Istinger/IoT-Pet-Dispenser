import { useEffect, useMemo, useState } from "react"
import AdminLayout from "../componentslayout/AdminLayout"
import PageHeader from "../components/PageHeader"
import StatDoughnutCard from "../components/StatDoughnutCard"
import PeakHoursCard from "../components/PeakHoursCard"

const AdminOverview = () => {
  const [sensors, setSensors] = useState([])
  const [commands, setCommands] = useState([])
  const hopperCapacity = 5000
  const recentLimit = 200
  const commandsLimit = 500

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
        const [sensorsResponse, commandsResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/sensors?limit=${recentLimit}`),
          fetch(`${apiBaseUrl}/api/sensors/commands?status=completed&limit=${commandsLimit}`),
        ])

        const sensorsPayload = await sensorsResponse.json()
        const commandsPayload = await commandsResponse.json()

        if (!sensorsResponse.ok || !sensorsPayload.success) {
          setSensors([])
        } else {
          setSensors(sensorsPayload.data)
        }

        if (!commandsResponse.ok || !commandsPayload.success) {
          setCommands([])
        } else {
          setCommands(commandsPayload.data)
        }
      } catch (error) {
        console.error("Failed to load sensor summary", error)
        setSensors([])
        setCommands([])
      }
    }

    fetchSensors()
  }, [])

  const summary = useMemo(() => {
    const now = Date.now()
    const cutoff = now - 24 * 60 * 60 * 1000
    const minGrams = 100

    let optimal = 0
    let warning = 0
    let critical = 0
    let totalGrams = 0
    let totalCount = 0

    commands.forEach((item) => {
      if (item.status !== "completed") return
      const timestamp = new Date(item.completedAt || item.updatedAt || item.createdAt).getTime()
      if (!Number.isFinite(timestamp) || timestamp < cutoff) return

      const delivered = typeof item.portionDelivered === "number"
        ? item.portionDelivered
        : typeof item.portionTarget === "number"
          ? item.portionTarget
          : null

      if (typeof delivered !== "number" || delivered < minGrams) return

      totalGrams += delivered
      totalCount += 1

      const percent = (delivered / hopperCapacity) * 100
      if (percent < 20) {
        critical += 1
      } else if (percent < 40) {
        warning += 1
      } else {
        optimal += 1
      }
    })

    const averageGrams = totalCount > 0 ? totalGrams / totalCount : null
    const averagePercent = typeof averageGrams === "number"
      ? Math.min(100, Math.max(0, (averageGrams / hopperCapacity) * 100))
      : null
    return { optimal, warning, critical, averageGrams, averagePercent }
  }, [commands, hopperCapacity])

  const peakBars = useMemo(() => {
    const buckets = Array.from({ length: 12 }, (_, index) => index * 2)
    const counts = buckets.reduce((acc, hour) => {
      acc[hour] = 0
      return acc
    }, {})

    commands.forEach((item) => {
      if (item.status !== "completed") return
      const timestamp = new Date(item.completedAt || item.updatedAt || item.createdAt)
      const hour = timestamp.getHours()
      const bucket = Math.floor(hour / 2) * 2
      if (counts[bucket] !== undefined) {
        counts[bucket] += 1
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
      count: counts[hour],
    }))
  }, [commands])

  return (
    <AdminLayout>
      <PageHeader />

      <div className="rounded-3xl bg-slate-50 p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StatDoughnutCard
            optimalCount={summary.optimal}
            warningCount={summary.warning}
            criticalCount={summary.critical}
            averageGrams={summary.averageGrams}
            averagePercent={summary.averagePercent}
          />
          <PeakHoursCard bars={peakBars} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminOverview
