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
    const temps = sensors.map((item) => item.temperature).filter((value) => typeof value === "number")
    const humidity = sensors.map((item) => item.humidity).filter((value) => typeof value === "number")

    const avgTemp = temps.length
      ? (temps.reduce((sum, value) => sum + value, 0) / temps.length).toFixed(1)
      : null
    const avgHumidity = humidity.length
      ? (humidity.reduce((sum, value) => sum + value, 0) / humidity.length).toFixed(1)
      : null

    const optimalCount = humidity.filter((value) => value >= 40).length
    const successPercent = humidity.length
      ? Math.round((optimalCount / humidity.length) * 100)
      : 0

    const tempPoints = temps.slice(0, 12).map((value) => Math.min(100, Math.max(0, (value / 50) * 100)))

    const buckets = ["Excellent", "Good", "Fair", "Poor"]
    const bucketCounts = { Excellent: 0, Good: 0, Fair: 0, Poor: 0 }
    humidity.forEach((value) => {
      if (value >= 60) bucketCounts.Excellent += 1
      else if (value >= 40) bucketCounts.Good += 1
      else if (value >= 20) bucketCounts.Fair += 1
      else bucketCounts.Poor += 1
    })
    const maxBucket = Math.max(1, ...Object.values(bucketCounts))
    const barData = buckets.map((label) => ({
      label,
      height: `${Math.round((bucketCounts[label] / maxBucket) * 100)}%`,
    }))

    return {
      avgTemp,
      avgHumidity,
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
          title="Avg Temperature"
          value={stats.avgTemp ? `${stats.avgTemp}°C` : "--"}
          footer={`Based on ${stats.totalReadings} readings`}
          icon="timer"
        />
        <StatCard
          title="Avg Humidity"
          value={stats.avgHumidity ? `${stats.avgHumidity}%` : "--"}
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
            title="Command Latency Trends"
            subtitle="Response times over 24 hours"
            icon="zap"
          />
          <LineChart points={stats.tempPoints} />
        </div>

        <div className="card">
          <SectionHeader
            title="Wi-Fi Signal Strength (RSSI)"
            subtitle="Fleet signal quality distribution"
            icon="wifi"
          />
          <BarChart bars={stats.barData} />
        </div>
      </div>

      {/* FIRMWARE */}
      <div className="card">
        <SectionHeader
          title="Firmware Update Success Rate"
          subtitle="Latest deployment: v2.4.0"
          icon="download-cloud"
        />
        <DoughnutChart percent={stats.successPercent} />
      </div>

      <FooterStatus />
    </AdminLayout>
  )
}

export default AdminPerformance
