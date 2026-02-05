import { useEffect, useMemo, useState } from "react"
import { jsPDF } from "jspdf"
import AdminLayout from "../componentslayout/AdminLayout"
import LogsTable from "../components/LogsTable"
import FilterSelect from "../components/FilterSelect"

const AdminLogs = () => {
  const [allLogs, setAllLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [filters, setFilters] = useState({
    range: "Last 24 Hours",
    device: "All Devices",
    status: "All Statuses",
  })

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExport = (format) => {
    if (format === "excel") {
      const header = ["Timestamp", "Device", "Temperature", "Humidity", "Status"]
      const rows = filteredLogs.map((log) => [
        log.time.replace(" • ", " "),
        log.device,
        log.temperature,
        log.humidity,
        log.status,
      ])

      const csvLines = [header, ...rows]
        .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
        .join("\n")

      const blob = new Blob([csvLines], { type: "text/csv;charset=utf-8;" })
      downloadBlob(blob, "device-logs.csv")
      return
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" })
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("Device Logs Report", 40, 40)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)

    const lines = [
      "Timestamp | Device | Temperature | Humidity | Status",
      ...filteredLogs.map((log) =>
        `${log.time.replace(" • ", " ")} | ${log.device} | ${log.temperature} | ${log.humidity} | ${log.status}`
      ),
    ]

    doc.text(lines, 40, 70, { maxWidth: 520 })
    doc.save("device-logs.pdf")
  }

  const handleFilterChange = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const applyFilters = () => {
    const now = new Date()
    const rangeHours = filters.range === "Last 7 Days"
      ? 24 * 7
      : filters.range === "Last 30 Days"
        ? 24 * 30
        : 24
    const cutoff = new Date(now.getTime() - rangeHours * 60 * 60 * 1000)

    const next = allLogs.filter((log) => {
      const created = log.createdAt ? new Date(log.createdAt) : null
      const inRange = created ? created >= cutoff : true
      const deviceOk = filters.device === "All Devices" || log.device === filters.device
      const statusOk = filters.status === "All Statuses"
        || log.status === filters.status.toLowerCase()

      return inRange && deviceOk && statusOk
    })

    setFilteredLogs(next)
  }

  const handleResetFilters = () => {
    const defaultFilters = {
      range: "Last 24 Hours",
      device: "All Devices",
      status: "All Statuses",
    }
    setFilters(defaultFilters)
    setFilteredLogs(allLogs)
  }

  const deviceOptions = useMemo(() => {
    const unique = Array.from(new Set(allLogs.map((log) => log.device).filter(Boolean)))
    return ["All Devices", ...unique]
  }, [allLogs])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
        const response = await fetch(`${apiBaseUrl}/api/sensors`)
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          setLogs([])
          return
        }

        const formatted = payload.data.map((item) => {
          const humidityValue = typeof item.humidity === "number" ? item.humidity : null
          const status = humidityValue === null
            ? "unknown"
            : humidityValue < 20
              ? "critical"
              : humidityValue < 40
                ? "warning"
                : "online"

          return {
            id: item._id,
            createdAt: item.createdAt,
            time: new Date(item.createdAt).toLocaleString(),
            device: item.deviceId,
            temperature: typeof item.temperature === "number" ? `${item.temperature}°C` : "--",
            humidity: typeof item.humidity === "number" ? `${item.humidity}%` : "--",
            status,
          }
        })

        setAllLogs(formatted)
        setFilteredLogs(formatted)
      } catch (error) {
        console.error("Failed to load sensor logs", error)
        setAllLogs([])
        setFilteredLogs([])
      }
    }

    fetchLogs()
  }, [])

  return (
    <AdminLayout active="logs">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold lg:text-3xl">
            Device Logs & Reports
          </h1>
          <p className="mt-1 text-slate-500">
            Historical telemetry data and event logs for all pet feeding units.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-success" onClick={() => handleExport("excel")}>Export Excel</button>
          <button className="btn-danger" onClick={() => handleExport("pdf")}>Export PDF</button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border">
        <FilterSelect
          icon="calendar"
          options={["Last 24 Hours", "Last 7 Days", "Last 30 Days"]}
          value={filters.range}
          onChange={handleFilterChange("range")}
        />
        <FilterSelect
          icon="cpu"
          options={deviceOptions}
          value={filters.device}
          onChange={handleFilterChange("device")}
        />
        <FilterSelect
          icon="filter"
          options={["All Statuses", "Online", "Warning", "Critical"]}
          value={filters.status}
          onChange={handleFilterChange("status")}
        />
        <div className="flex items-center justify-end gap-3">
          <button className="btn-success" onClick={applyFilters}>Buscar</button>
          <button className="btn-outline" onClick={handleResetFilters}>Reset Filters</button>
        </div>
      </div>

      {/* TABLE */}
      <LogsTable logs={filteredLogs} />
    </AdminLayout>
  )
}

export default AdminLogs
