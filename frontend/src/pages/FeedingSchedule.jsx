import { LogOut } from "lucide-react"
import { useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Sidebar from "../components/layout/Sidebar"
import FeedingSummary from "../components/feeding/FeedingSummary"
import InstantFeed from "../components/feeding/InstantFeed"
import MealCard from "../components/feeding/MealCard"
import { AuthContext } from "../context/AuthContext"
import { useDispenser } from "../hooks/useDispenser"

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

const defaultScheduleSlots = [
  {
    key: "breakfast",
    title: "Breakfast",
    icon: "sun",
    color: "amber",
    time: "07:30",
    portionGrams: 350,
    min: 50,
    max: 600,
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  },
  {
    key: "dinner",
    title: "Dinner",
    icon: "moon",
    color: "indigo",
    time: "19:00",
    portionGrams: 600,
    min: 50,
    max: 800,
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  },
]

const FeedingSchedulePage = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [schedules, setSchedules] = useState([])
  const [userId, setUserId] = useState("")
  const [petId, setPetId] = useState("")
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState("")
  const [deletingId, setDeletingId] = useState("")
  const [instantGrams, setInstantGrams] = useState(100)
  const [instantLoading, setInstantLoading] = useState(false)
  const [error, setError] = useState("")
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"
  const deviceId = import.meta.env.VITE_DEVICE_ID || "petfeeder-01"
  const dailyTargetGrams = Number(import.meta.env.VITE_DAILY_TARGET_GRAMS) || 1250

  // Usar hook del dispensador
  const { 
    status: dispenserStatus, 
    dispensing, 
    loading: dispenserLoading,
    dispenseNow,
    refreshStatus: refreshDispenserStatus
  } = useDispenser(deviceId)

  const handleLogout = () => {
    if (logout) {
      logout()
    }
    navigate("/login")
  }

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true)
        const currentToken = token || localStorage.getItem("token")
        if (!currentToken) {
          setError("No hay sesion activa.")
          return
        }

        const decoded = decodeToken(currentToken)
        if (!decoded?.id) {
          setError("No se pudo obtener el usuario.")
          return
        }

        setUserId(decoded.id)

        const petResponse = await fetch(`${apiBaseUrl}/api/pets/active/${decoded.id}`)
        const petPayload = await petResponse.json()

        if (!petResponse.ok || !petPayload.success) {
          setError("No se encontro mascota activa.")
          setSchedules(defaultScheduleSlots)
          return
        }

        setPetId(petPayload.pet._id)

        const scheduleResponse = await fetch(`${apiBaseUrl}/api/schedules/pet/${petPayload.pet._id}`)
        const schedulePayload = await scheduleResponse.json()

        if (!scheduleResponse.ok || !schedulePayload.success) {
          setSchedules(defaultScheduleSlots)
          return
        }

        const mapped = schedulePayload.schedules.map((schedule, index) => ({
          ...schedule,
          key: schedule._id || `schedule-${index}`,
          title: index === 0 ? "Breakfast" : index === 1 ? "Dinner" : `Meal ${index + 1}`,
          icon: index === 0 ? "sun" : index === 1 ? "moon" : "sun",
          color: index === 0 ? "amber" : index === 1 ? "indigo" : "blue",
          min: 50,
          max: 800,
        }))

        setSchedules(mapped.length > 0 ? mapped : defaultScheduleSlots)
      } catch (err) {
        console.error("Failed to load schedules", err)
        setSchedules(defaultScheduleSlots)
      } finally {
        setLoading(false)
      }
    }

    loadSchedules()
  }, [token, apiBaseUrl])

  const scheduledGrams = useMemo(() => {
    return schedules.reduce((sum, schedule) => {
      if (schedule.isActive === false) return sum
      const portion = typeof schedule.portionGrams === "number" ? schedule.portionGrams : Number(schedule.portionGrams)
      return Number.isFinite(portion) ? sum + portion : sum
    }, 0)
  }, [schedules])

  const remainingGrams = Math.max(0, dailyTargetGrams - scheduledGrams)

  const updateScheduleField = (index, field, value) => {
    setSchedules((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    )
  }

  const handleSaveSchedule = async (schedule, index) => {
    try {
      if (!userId || !petId) return
      setSavingId(schedule._id || schedule.key || String(index))

      const payload = {
        userId,
        petId,
        deviceId,
        time: schedule.time,
        days: schedule.days || ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        portionGrams: schedule.portionGrams,
        isActive: schedule.isActive !== false,
      }

      const response = await fetch(
        schedule._id
          ? `${apiBaseUrl}/api/schedules/${schedule._id}`
          : `${apiBaseUrl}/api/schedules`,
        {
          method: schedule._id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      const result = await response.json()
      if (!response.ok || !result.success) {
        setError(result.message || "No se pudo guardar el horario.")
        return
      }

      const saved = result.schedule
      setSchedules((prev) =>
        prev.map((item, idx) => (idx === index ? { ...item, ...saved } : item))
      )

      // Crear orden de dispensación automáticamente si está activo
      if (schedule.isActive !== false && schedule.portionGrams > 0) {
        console.log(`Ejecutando orden para ${schedule.title}: ${schedule.portionGrams}g`)
        const dispenseResult = await dispenseNow(schedule.portionGrams)
        if (dispenseResult.success) {
          toast.success(`Horario guardado y orden enviada: ${schedule.portionGrams}g`)
        } else {
          toast.warning(`Horario guardado pero fallo la orden: ${dispenseResult.error}`)
        }
      }
    } catch (err) {
      console.error("Failed to save schedule", err)
      setError("No se pudo guardar el horario.")
    } finally {
      setSavingId("")
    }
  }

  const handleInstantFeed = async () => {
    try {
      if (!userId || !petId) return
      const grams = Number(instantGrams)
      if (!Number.isFinite(grams) || grams <= 0) {
        setError("La porcion debe ser mayor a 0.")
        return
      }

      setInstantLoading(true)
      const result = await dispenseNow(grams)

      if (result.success) {
        toast.success(`Dispensando ${grams}g...`)
        setError("")
      } else {
        setError(result.error || "No se pudo enviar la orden de dispensado.")
        toast.error("Error al dispensar")
      }
    } catch (err) {
      console.error("Failed to send instant feed", err)
      setError("No se pudo enviar la porcion.")
      toast.error("Error al dispensar")
    } finally {
      setInstantLoading(false)
    }
  }

  const handleDeleteSchedule = async (schedule, index) => {
    if (!schedule?._id) return
    try {
      setDeletingId(schedule._id || schedule.key || String(index))
      const response = await fetch(`${apiBaseUrl}/api/schedules/${schedule._id}`, {
        method: "DELETE",
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        setError(result.message || "No se pudo eliminar el horario.")
        return
      }

      setSchedules(defaultScheduleSlots.map((slot) => ({ ...slot })))
      toast.success("Horario eliminado")
    } catch (err) {
      console.error("Failed to delete schedule", err)
      setError("No se pudo eliminar el horario.")
    } finally {
      setDeletingId("")
    }
  }

  const confirmDeleteSchedule = (schedule, index) => {
    if (!schedule?._id) return
    toast(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">Eliminar horario?</p>
          <p className="text-xs text-slate-500">
            Se eliminara este horario de forma permanente.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                closeToast()
                handleDeleteSchedule(schedule, index)
              }}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md bg-rose-600 text-white hover:bg-rose-700"
            >
              Eliminar
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    )
  }

  const displaySchedules = loading || schedules.length === 0 ? defaultScheduleSlots : schedules
  
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex items-start justify-between">
            <div>
              <p className="text-blue-600 text-sm font-bold uppercase">
                Active Plan: High Protein Diet
              </p>
              <h3 className="text-4xl font-extrabold">
                Max's Feeding Plan
              </h3>
              <p className="text-slate-500">
                Adjust portions and timing for your Golden Retriever
              </p>
              {dispenserStatus && (
                <div className="mt-3 text-sm space-y-1">
                  <p className={`font-semibold ${dispensing ? 'text-green-600' : 'text-slate-600'}`}>
                    {dispensing ? 'Dispensador activo' : 'Dispensador inactivo'}
                  </p>
                  <p className="text-slate-500">
                    Peso actual: {dispenserStatus.pesoComida || 0}g
                  </p>
                </div>
              )}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Cerrar Sesion</span>
            </button>
          </header>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          <FeedingSummary
            dailyTargetGrams={dailyTargetGrams}
            scheduledGrams={scheduledGrams}
            remainingGrams={remainingGrams}
          />
          <InstantFeed
            value={instantGrams}
            onValueChange={setInstantGrams}
            onFeedNow={handleInstantFeed}
            isLoading={instantLoading}
          />

          <div className="grid xl:grid-cols-2 gap-8">
            {displaySchedules.map((schedule, index) => (
              <MealCard
                key={schedule._id || schedule.key}
                title={schedule.title}
                icon={schedule.icon}
                color={schedule.color}
                time={schedule.time}
                portion={schedule.portionGrams}
                min={schedule.min}
                max={schedule.max}
                days={(schedule.days || []).map((day) => day.slice(0, 1).toUpperCase())}
                isActive={schedule.isActive !== false}
                onTimeChange={(value) => updateScheduleField(index, "time", value)}
                onPortionChange={(value) => updateScheduleField(index, "portionGrams", value)}
                onSave={() => handleSaveSchedule(schedule, index)}
                isSaving={savingId === (schedule._id || schedule.key || String(index))}
                onDelete={() => confirmDeleteSchedule(schedule, index)}
                canDelete={Boolean(schedule._id)}
                isDeleting={deletingId === (schedule._id || schedule.key || String(index))}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default FeedingSchedulePage
