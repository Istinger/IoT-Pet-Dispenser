import { useEffect, useState } from "react"
import ActivityTable from "../components/dashboard/ActivityTable"
import AlertBanner from "../components/dashboard/Alertbanner"
import HopperCard from "../components/dashboard/HopperCard"
import NextFeedCard from "../components/dashboard/NextFeedCard"
import QuickFeedCard from "../components/dashboard/QuickFeedCard"
import Sidebar from "../components/dashboard/Sidebar"
import Topbar from "../components/dashboard/Topbar"

const HOPPER_CAPACITY_GRAMS = 5000
const SERVING_GRAMS = 50

const Menu= () => {
  const [logs, setLogs] = useState([])
  const [latestSensor, setLatestSensor] = useState(null)

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
        const response = await fetch(`${apiBaseUrl}/api/sensors`)
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          setLogs([])
          return
        }

        const sorted = payload.data
        const latest = sorted.length > 0 ? sorted[0] : null
        setLatestSensor(latest)

        const formatted = sorted.slice(0, 5).map((item) => {
          const foodValue = typeof item.weightFood === "number" ? item.weightFood : null
          const percent = foodValue === null
            ? null
            : Math.min(100, Math.max(0, (foodValue / HOPPER_CAPACITY_GRAMS) * 100))

          const statusLabel = percent === null
            ? "Unknown"
            : item.dispensing
              ? "Dispensing"
              : percent < 20
                ? "Low Hopper"
                : "Idle"

          const statusTone = percent === null
            ? "text-slate-500"
            : item.dispensing
              ? "text-blue-600"
              : percent < 20
                ? "text-rose-600"
                : "text-slate-500"

          return {
            id: item._id,
            device: item.deviceId,
            time: new Date(item.createdAt).toLocaleString(),
            foodWeight: foodValue !== null ? `${foodValue.toFixed(0)} g` : "--",
            animalWeight: typeof item.weightAnimal === "number" ? `${item.weightAnimal.toFixed(1)} kg` : "--",
            statusLabel,
            statusTone,
          }
        })

        setLogs(formatted)
      } catch (error) {
        console.error("Failed to fetch sensor data", error)
        setLogs([])
        setLatestSensor(null)
      }
    }

    fetchSensorData()
  }, [])

  return (
 <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <AlertBanner />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HopperCard
              capacityGrams={HOPPER_CAPACITY_GRAMS}
              servingGrams={SERVING_GRAMS}
              weightFood={latestSensor?.weightFood}
            />
            <NextFeedCard
              dispensing={latestSensor?.dispensing}
              portionTarget={latestSensor?.portionTarget}
              portionDelivered={latestSensor?.portionDelivered}
            />
            <QuickFeedCard portionTarget={latestSensor?.portionTarget} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityTable logs={logs} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Menu
