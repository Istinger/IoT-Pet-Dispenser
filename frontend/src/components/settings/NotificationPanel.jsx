import { useContext, useEffect, useMemo, useState } from "react"
import {
  Bell,
  AlertTriangle,
  Droplets,
  CheckCircle2,
  WifiOff,
  Activity,
} from "lucide-react"
import NotificationItem from "./NotificationItem"
import { AuthContext } from "../../context/AuthContext"

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

const NotificationPanel = () => {
  const { token } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const iconMap = useMemo(
    () => ({
      FOOD_LOW: Droplets,
      ANIMAL_DETECTED: Activity,
      DISPENSING_ERROR: AlertTriangle,
      SCHEDULE_EXECUTED: CheckCircle2,
      DEVICE_OFFLINE: WifiOff,
    }),
    []
  )

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      setError("")
      setPage(1)

      const currentToken = token || localStorage.getItem("token")
      if (!currentToken) {
        setError("No hay sesion activa.")
        setLoading(false)
        return
      }

      const decoded = decodeToken(currentToken)
      if (!decoded?.id) {
        setError("No se pudo obtener el usuario.")
        setLoading(false)
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

      try {
        const response = await fetch(`${apiBaseUrl}/api/notifications/user/${decoded.id}?page=1&limit=10`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          setError(data.message || "No se pudieron cargar las notificaciones.")
          setLoading(false)
          return
        }

        setNotifications(Array.isArray(data.notifications) ? data.notifications : [])
        setHasMore(data.pagination && data.pagination.page < data.pagination.totalPages)
      } catch (fetchError) {
        console.error("Error fetching notifications:", fetchError)
        setError("Error al conectar con el servidor.")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [token])

  const handleLoadMore = async () => {
    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) return

    const decoded = decodeToken(currentToken)
    if (!decoded?.id) return

    setLoadingMore(true)
    setError("")

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"
    const nextPage = page + 1

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/notifications/user/${decoded.id}?page=${nextPage}&limit=10`
      )
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || "No se pudieron cargar mas notificaciones.")
        return
      }

      setNotifications((prev) => [...prev, ...(Array.isArray(data.notifications) ? data.notifications : [])])
      setPage(nextPage)
      setHasMore(data.pagination && data.pagination.page < data.pagination.totalPages)
    } catch (fetchError) {
      console.error("Error loading more notifications:", fetchError)
      setError("Error al conectar con el servidor.")
    } finally {
      setLoadingMore(false)
    }
  }

  const handleMarkRead = async (notificationId) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

    try {
      const response = await fetch(`${apiBaseUrl}/api/notifications/${notificationId}/read`, {
        method: "PATCH",
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || "No se pudo marcar como leida.")
        return
      }

      setNotifications((prev) =>
        prev.map((item) => (item._id === notificationId ? data.notification : item))
      )
    } catch (saveError) {
      console.error("Error marking notification:", saveError)
      setError("Error al conectar con el servidor.")
    }
  }

  const handleMarkAll = async () => {
    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) return

    const decoded = decodeToken(currentToken)
    if (!decoded?.id) return

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

    try {
      const response = await fetch(`${apiBaseUrl}/api/notifications/user/${decoded.id}/read-all`, {
        method: "PATCH",
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || "No se pudieron marcar todas.")
        return
      }

      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
    } catch (saveError) {
      console.error("Error marking all notifications:", saveError)
      setError("Error al conectar con el servidor.")
    }
  }

  const unreadCount = notifications.filter((item) => !item.read).length

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <header className="p-8 border-b flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
            <Bell />
          </div>
          <div>
            <h2 className="text-xl font-bold">Notification Center</h2>
            <p className="text-sm text-slate-500">
              {unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al dia"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMarkAll}
          className="text-sm font-bold text-blue-600 hover:text-blue-700"
          disabled={notifications.length === 0 || unreadCount === 0}
        >
          Marcar todas como leidas
        </button>
      </header>

      {loading && (
        <div className="p-6 text-sm text-slate-500">Cargando notificaciones...</div>
      )}

      {!loading && error && (
        <div className="p-6 text-sm text-red-600">{error}</div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="p-6 text-sm text-slate-500">No hay notificaciones.</div>
      )}

      {!loading && !error && notifications.map((item) => {
        const Icon = iconMap[item.category] || AlertTriangle
        return (
          <NotificationItem
            key={item._id}
            icon={Icon}
            title={item.title}
            text={item.message}
            read={item.read}
            onMarkRead={() => handleMarkRead(item._id)}
          />
        )
      })}

      {!loading && !error && hasMore && (
        <div className="p-6 border-t">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="w-full py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200 disabled:text-slate-400 disabled:border-slate-200"
          >
            {loadingMore ? "Cargando..." : "Cargar mas"}
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationPanel
