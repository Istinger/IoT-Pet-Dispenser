import { NavLink, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const TopNav = () => {
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
      ? "text-emerald-600 bg-emerald-50"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`

  const mobileMenuItems = [
    { label: "Overview", to: "/admin" },
    { label: "Logs", to: "/admin/logs" },
    { label: "Users", to: "/admin/users" },
  ]

  const currentLabel = mobileMenuItems.find(item => item.to === location.pathname)?.label || "Navigation"

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">
        <NavLink className={linkClass} to="/admin">
          Overview
        </NavLink>
        <NavLink className={linkClass} to="/admin/logs">
          Logs
        </NavLink>
        <NavLink className={linkClass} to="/admin/users">
          Users
        </NavLink>
      </nav>

      {/* Mobile Dropdown */}
      <div className="relative md:hidden">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {currentLabel}
          <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-slate-100 bg-white shadow-lg z-50">
            {mobileMenuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setDropdownOpen(false)}
                className={({ isActive }) =>
                  `block w-full px-4 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default TopNav
