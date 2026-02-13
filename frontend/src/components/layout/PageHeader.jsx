import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const PageHeader = ({ title, breadcrumb }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          {breadcrumb}
          <span className="text-slate-900 font-medium">{title}</span>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
