import { useNavigate } from "react-router-dom"

const Brand = () => {
  const navigate = useNavigate()

  return (
    <div
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => navigate("/admin")}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate("/admin")
        }
      }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
        <span className="material-symbols-outlined !text-2xl">sensors</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">IoT Operations</span>
    </div>
  )
}

export default Brand
