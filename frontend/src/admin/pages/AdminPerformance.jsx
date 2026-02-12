// src/admin/pages/AdminPerformance.jsx
import { useEffect, useMemo, useState } from "react"
import AdminLayout from "../componentslayout/AdminLayout"
import StatCard from "../components/StatCard"
import SectionHeader from "../components/SectionHeader"
import LineChart from "../components/LineChart"
import BarChart from "../components/BarChart"
import DoughnutChart from "../components/DoughnutChart"
import FooterStatus from "../components/FooterStatus"

const AdminPerformance = () => {
  const [sensors, setSensors] = useState([])
  const [commands, setCommands] = useState([])
  const hopperCapacity = 5000
  const pollInterval = 10000

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
        const [sensorsResponse, commandsResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/sensors?limit=500`),
          fetch(`${apiBaseUrl}/api/sensors/commands?status=completed&limit=500`),
        ])

        const sensorsPayload = await sensorsResponse.json()
        const commandsPayload = await commandsResponse.json()

        if (sensorsResponse.ok && sensorsPayload.success) {
          setSensors(sensorsPayload.data)
        } else {
          setSensors([])
        }

        if (commandsResponse.ok && commandsPayload.success) {
          setCommands(commandsPayload.data)
        } else {
          setCommands([])
        }
      } catch (error) {
        console.error("Failed to load sensor performance", error)
        setSensors([])
        setCommands([])
      }
    }

    fetchData()
    const interval = setInterval(fetchData, pollInterval)
    return () => clearInterval(interval)
  }, [])

  const stats = useMemo(() => {
    const animalWeights = sensors
      .map((item) =>
        typeof item.weightAnimal === "number"
          ? item.weightAnimal
          : typeof item.pesoAnimal === "number"
            ? item.pesoAnimal
            : null
      )
      .filter((value) => value !== null)

    const foodWeightsFromSensors = sensors
      .map((item) =>
        typeof item.weightFood === "number"
          ? item.weightFood
          : typeof item.pesoComida === "number"
            ? item.pesoComida
            : null
      )
      .filter((value) => value !== null && value >= 100)

    const foodWeightsFromCommands = commands
      .filter((item) => item.status === "completed" && typeof item.portionDelivered === "number" && item.portionDelivered >= 100)
      .map((item) => item.portionDelivered)

    const allFoodWeights = [...foodWeightsFromSensors, ...foodWeightsFromCommands]

    const avgAnimal = animalWeights.length
      ? (animalWeights.reduce((sum, value) => sum + value, 0) / animalWeights.length).toFixed(1)
      : null
    const avgFood = allFoodWeights.length
      ? (allFoodWeights.reduce((sum, value) => sum + value, 0) / allFoodWeights.length).toFixed(0)
      : null

    const dispenseEvents = commands.filter((item) => item.status === "completed" && typeof item.portionTarget === "number" && item.portionTarget > 0)
    const successfulDispenses = dispenseEvents.filter((item) => {
      if (typeof item.portionDelivered !== "number") return false
      return item.portionDelivered / item.portionTarget >= 0.9
    })
    const successPercent = dispenseEvents.length
      ? Math.round((successfulDispenses.length / dispenseEvents.length) * 100)
      : 0

    const tempPoints = (() => {
      const now = Date.now()
      const last24h = now - 24 * 60 * 60 * 1000
      
      const hourBuckets = {}
      for (let i = 0; i < 24; i++) {
        hourBuckets[i] = []
      }

      sensors.forEach((item) => {
        const foodValue = typeof item.weightFood === "number"
          ? item.weightFood
          : typeof item.pesoComida === "number"
            ? item.pesoComida
            : null
        
        if (typeof foodValue !== "number" || foodValue < 100) return

        const timestamp = new Date(item.createdAt).getTime()
        if (!Number.isFinite(timestamp) || timestamp < last24h) return

        const hourDiff = Math.floor((now - timestamp) / (60 * 60 * 1000))
        const hour = Math.max(0, Math.min(23, hourDiff))
        hourBuckets[hour].push(foodValue)
      })

      return Array.from({ length: 24 }, (_, i) => {
        const values = hourBuckets[i]
        if (values.length === 0) return 0
        const avg = values.reduce((sum, v) => sum + v, 0) / values.length
        return Math.min(100, Math.max(0, (avg / hopperCapacity) * 100))
      }).reverse()
    })()

    const buckets = ["Accurate", "Slight Low", "Low", "No Target"]
    const bucketCounts = { Accurate: 0, "Slight Low": 0, Low: 0, "No Target": 0 }
    commands.forEach((item) => {
      if (item.status !== "completed") return
      if (typeof item.portionTarget !== "number" || item.portionTarget <= 0) {
        bucketCounts["No Target"] += 1
        return
      }
      if (typeof item.portionDelivered !== "number" || item.portionDelivered <= 0) {
        bucketCounts.Low += 1
        return
      }
      const ratio = item.portionDelivered / item.portionTarget
      if (ratio >= 0.9) bucketCounts.Accurate += 1
      else if (ratio >= 0.7) bucketCounts["Slight Low"] += 1
      else bucketCounts.Low += 1
    })

    const maxBucket = Math.max(1, ...Object.values(bucketCounts))
    const barData = buckets.map((label) => ({
      label,
      height: `${Math.round((bucketCounts[label] / maxBucket) * 100)}%`,
    }))

    return {
      avgAnimal,
      avgFood,
      totalReadings: sensors.length,
      successPercent,
      tempPoints,
      barData,
    }
  }, [sensors, commands])

  const handleSync = () => {
    console.log("Admin performance sync")
  }

  return (
    <AdminLayout active="performance">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">System Performance</h1>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <SectionHeader
            title="Hopper Level Trend"
            subtitle="Remaining food per sample"
            icon="zap"
          />
          <LineChart points={stats.tempPoints} />
        </div>

        <div className="card">
          <SectionHeader
            title="Dispense Accuracy"
            subtitle="Portion delivered vs target"
            icon="wifi"
          />
          <BarChart bars={stats.barData} />
        </div>
      </div>

      {/* FIRMWARE */}
      <div className="card">
        <SectionHeader
          title="Successful Dispenses"
          subtitle="Ratio of accurate deliveries"
          icon="download-cloud"
        />
        <DoughnutChart percent={stats.successPercent} />
      </div>

   
    </AdminLayout>
  )
}

export default AdminPerformance
