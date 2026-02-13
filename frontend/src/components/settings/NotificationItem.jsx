const NotificationItem = ({ icon: Icon, title, text, read, onMarkRead }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between p-3 sm:p-4 lg:p-6 border-b hover:bg-slate-50 transition-colors">
      <div className="flex gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
          read ? "bg-slate-100" : "bg-blue-50 text-blue-600"
        }`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-xs sm:text-sm truncate">{title}</h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md line-clamp-2">{text}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onMarkRead}
        disabled={read}
        className={`self-start sm:self-center text-xs font-bold uppercase px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border flex-shrink-0 whitespace-nowrap ${
          read
            ? "text-slate-400 border-slate-200"
            : "text-blue-600 border-blue-200 hover:bg-blue-50"
        }`}
      >
        {read ? "✓" : "✣"}
      </button>
    </div>
  )
}

export default NotificationItem
