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
const RECENT_LIMIT = 10
const MIN_FOOD_GRAMS = 100
const POLL_INTERVAL_MS = 5000

const Menu= () => {
  const [logs, setLogs] = useState([])
  const [latestSensor, setLatestSensor] = useState(null)
  const [avgFoodWeight, setAvgFoodWeight] = useState(null)

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
        const response = await fetch(`${apiBaseUrl}/api/sensors?limit=${RECENT_LIMIT}`)
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          setLogs([])
          return
        }

        const sorted = payload.data
        const latest = sorted.length > 0 ? sorted[0] : null
        setLatestSensor(latest)

        const formatted = sorted.map((item) => {
          const foodValue = typeof item.weightFood === "number"
            ? item.weightFood
            : typeof item.pesoComida === "number"
              ? item.pesoComida
              : null
          const animalValue = typeof item.weightAnimal === "number"
            ? item.weightAnimal
            : typeof item.pesoAnimal === "number"
              ? item.pesoAnimal
              : null
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
            timeRaw: item.createdAt,
            foodValue,
            foodWeight: foodValue !== null ? `${foodValue.toFixed(0)} g` : "--",
            animalWeight: animalValue !== null ? `${animalValue.toFixed(1)} kg` : "--",
            statusLabel,
            statusTone,
          }
        }).filter((item) => typeof item.foodValue === "number" && item.foodValue >= MIN_FOOD_GRAMS)

        setLogs(formatted)

        const foodValues = sorted
          .map((item) => {
            if (typeof item.weightFood === "number") return item.weightFood
            if (typeof item.pesoComida === "number") return item.pesoComida
            return null
          })
          .filter((value) => value !== null && value >= MIN_FOOD_GRAMS)

        if (foodValues.length > 0) {
          const total = foodValues.reduce((sum, value) => sum + value, 0)
          setAvgFoodWeight(total / foodValues.length)
        } else {
          setAvgFoodWeight(null)
        }
      } catch (error) {
        console.error("Failed to fetch sensor data", error)
        setLogs([])
        setLatestSensor(null)
        setAvgFoodWeight(null)
      }
    }

    fetchSensorData()
    const interval = setInterval(fetchSensorData, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar oculto en móvil, visible desde md */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col min-w-0 w-full">
        <Topbar />

        {/* Contenedor adaptativo: p-4 móvil, p-6 tablet, p-8 desktop */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Grid adaptativo: 1 col móvil, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <HopperCard
              capacityGrams={HOPPER_CAPACITY_GRAMS}
              servingGrams={SERVING_GRAMS}
              weightFood={avgFoodWeight}
            />
            <NextFeedCard
              dispensing={latestSensor?.dispensing || latestSensor?.servoAbierto}
              portionTarget={latestSensor?.portionTarget}
              portionDelivered={latestSensor?.portionDelivered}
            />
          </div>

          {/* Tabla adaptativa */}
          <div className="w-full">
            <ActivityTable logs={logs} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Menu
