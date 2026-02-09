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
        console.error("Failed to load sensor performance", error)
        setSensors([])
      }
    }

    fetchSensors()
  }, [])

  const stats = useMemo(() => {
    const animalWeights = sensors.map((item) => item.weightAnimal).filter((value) => typeof value === "number")
    const foodWeights = sensors.map((item) => item.weightFood).filter((value) => typeof value === "number")

    const avgAnimal = animalWeights.length
      ? (animalWeights.reduce((sum, value) => sum + value, 0) / animalWeights.length).toFixed(1)
      : null
    const avgFood = foodWeights.length
      ? (foodWeights.reduce((sum, value) => sum + value, 0) / foodWeights.length).toFixed(0)
      : null

    const dispenseEvents = sensors.filter((item) => typeof item.portionTarget === "number" && item.portionTarget > 0)
    const successfulDispenses = dispenseEvents.filter((item) => {
      if (typeof item.portionDelivered !== "number") return false
      return item.portionDelivered / item.portionTarget >= 0.9
    })
    const successPercent = dispenseEvents.length
      ? Math.round((successfulDispenses.length / dispenseEvents.length) * 100)
      : 0

    const tempPoints = foodWeights
      .slice(0, 12)
      .map((value) => Math.min(100, Math.max(0, (value / hopperCapacity) * 100)))

    const buckets = ["Accurate", "Slight Low", "Low", "No Target"]
    const bucketCounts = { Accurate: 0, "Slight Low": 0, Low: 0, "No Target": 0 }
    sensors.forEach((item) => {
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
  }, [sensors])

  const handleSync = () => {
    console.log("Admin performance sync")
  }

  return (
    <AdminLayout active="performance">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">System Performance</h1>
        <button className="btn-dark" onClick={handleSync}>Sync Live Data</button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Avg Animal Weight"
          value={stats.avgAnimal ? `${stats.avgAnimal} kg` : "--"}
          footer={`Based on ${stats.totalReadings} readings`}
          icon="timer"
        />
        <StatCard
          title="Avg Hopper Weight"
          value={stats.avgFood ? `${stats.avgFood} g` : "--"}
          footer={`Based on ${stats.totalReadings} readings`}
          icon="cloud-check"
        />
        <StatCard
          title="Records"
          value={String(stats.totalReadings)}
          footer="Total sensor samples"
          icon="database"
        />
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

      <FooterStatus />
    </AdminLayout>
  )
}

export default AdminPerformance
