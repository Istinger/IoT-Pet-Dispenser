
const colors = {
  online: "text-emerald-600",
  warning: "text-amber-500",
  critical: "text-rose-500",
}

const StatusBadge = ({ status }) => {
  return (
    <span className={`font-bold capitalize ${colors[status]}`}>
      {status}
    </span>
  )
}

export default StatusBadge
