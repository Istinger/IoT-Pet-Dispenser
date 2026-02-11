const NotificationItem = ({ icon: Icon, title, text, read, onMarkRead }) => {
  return (
    <div className="flex justify-between p-6 border-b hover:bg-slate-50">
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          read ? "bg-slate-100" : "bg-blue-50 text-blue-600"
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-slate-500 max-w-md">{text}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onMarkRead}
        disabled={read}
        className={`text-xs font-bold uppercase px-3 py-2 rounded-full border ${
          read
            ? "text-slate-400 border-slate-200"
            : "text-blue-600 border-blue-200 hover:bg-blue-50"
        }`}
      >
        {read ? "Leida" : "Marcar"}
      </button>
    </div>
  )
}

export default NotificationItem
