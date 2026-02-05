import {
  Bell,
  AlertTriangle,
  Droplets,
  CheckCircle2,
  WifiOff,
} from "lucide-react"
import NotificationItem from "./NotificationItem"

const NotificationPanel = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <header className="p-8 border-b flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
          <Bell />
        </div>
        <h2 className="text-xl font-bold">Notification Center</h2>
      </header>

      <NotificationItem
        icon={AlertTriangle}
        title="Low Food Level"
        text="Alert when kibble level is below 15%."
        enabled
      />
      <NotificationItem
        icon={Droplets}
        title="High Humidity Warning"
        text="Alert if storage humidity exceeds 60%."
        enabled
      />
      <NotificationItem
        icon={CheckCircle2}
        title="Feeding Successful"
        text="Confirmation after each feeding."
      />
      <NotificationItem
        icon={WifiOff}
        title="Connection Lost"
        text="Critical alert if feeder goes offline."
        enabled
      />
    </div>
  )
}

export default NotificationPanel
