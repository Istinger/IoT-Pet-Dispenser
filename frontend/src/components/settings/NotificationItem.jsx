const NotificationItem = ({ icon: Icon, title, text, enabled }) => {
  return (
    <div className="flex justify-between p-6 border-b hover:bg-slate-50">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-slate-500 max-w-md">{text}</p>
        </div>
      </div>

      <label className="relative inline-flex cursor-pointer">
        <input defaultChecked={enabled} type="checkbox" className="sr-only peer" />
        <div className="w-12 h-6 bg-slate-200 rounded-full peer-checked:bg-blue-600 after:absolute after:top-[4px] after:left-[4px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
      </label>
    </div>
  )
}

export default NotificationItem
