import { Pencil, Trash2, MoreVertical } from "lucide-react"

const UserRow = ({ user, onEdit, onPatch, onDelete }) => {
  const isActive = user.active !== false

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4 font-semibold">{user.name}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-bold
          ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 text-right flex justify-end gap-1">
        <button className="p-2 hover:bg-blue-50 rounded" onClick={() => onEdit?.(user)}>
          <Pencil className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-rose-50 rounded" onClick={() => onDelete?.(user._id)}>
          <Trash2 className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded" onClick={() => onPatch?.(user)}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}

export default UserRow
