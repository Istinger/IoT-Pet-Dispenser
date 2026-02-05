import { useEffect, useState } from "react"
import ActivityTable from "../components/dashboard/ActivityTable"
import AlertBanner from "../components/dashboard/Alertbanner"
import HopperCard from "../components/dashboard/HopperCard"
import NextFeedCard from "../components/dashboard/NextFeedCard"
import QuickFeedCard from "../components/dashboard/QuickFeedCard"
import Sidebar from "../components/dashboard/Sidebar"
import Topbar from "../components/dashboard/Topbar"

const Menu= () => {
  const [logs, setLogs] = useState([])

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

        const formatted = payload.data.slice(0, 5).map((item) => {
          const humidityValue = typeof item.humidity === "number" ? item.humidity : null
          const statusLabel = humidityValue === null
            ? "Unknown"
            : humidityValue < 20
              ? "Critical"
              : humidityValue < 40
                ? "Warning"
                : "OK"

          const statusTone = humidityValue === null
            ? "text-slate-500"
            : humidityValue < 20
              ? "text-rose-600"
              : humidityValue < 40
                ? "text-amber-600"
                : "text-emerald-600"

          return {
            id: item._id,
            device: item.deviceId,
            time: new Date(item.createdAt).toLocaleString(),
            temperature: typeof item.temperature === "number" ? `${item.temperature}°C` : "--",
            humidity: typeof item.humidity === "number" ? `${item.humidity}%` : "--",
            statusLabel,
            statusTone,
          }
        })

        setLogs(formatted)
      } catch (error) {
        console.error("Failed to fetch sensor data", error)
        setLogs([])
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
            <HopperCard />
            <NextFeedCard />
            <QuickFeedCard />
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
