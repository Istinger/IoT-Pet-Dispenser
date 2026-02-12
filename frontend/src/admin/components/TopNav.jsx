import { NavLink } from "react-router-dom"

const TopNav = () => {
  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
      ? "text-emerald-600 bg-emerald-50"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`

  return (
    <nav className="hidden items-center gap-1 md:flex">
      <NavLink className={linkClass} to="/admin">
        Overview
      </NavLink>
      <NavLink className={linkClass} to="/admin/logs">
        Logs
      </NavLink>
      {/* <NavLink className={linkClass} to="/admin/performance">
        Performance
      </NavLink> */}
      <NavLink className={linkClass} to="/admin/users">
        Users
      </NavLink>
    </nav>
  )
}

export default TopNav
