import {
  Dog,
  LayoutDashboard,
  Users,
  CalendarDays,
  LineChart,
  Search,
  Bell,
  Settings,
} from "lucide-react"

const PetHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-100 px-10 py-4 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-blue-600">
          <Dog className="h-8 w-8" />
          <h2 className="text-xl font-extrabold text-slate-900">SnackBox</h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          <NavItem icon={Users} label="Profiles" active />
          <NavItem icon={CalendarDays} label="Schedules" />
          <NavItem icon={LineChart} label="Analytics" />
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-slate-50 rounded-full px-4 py-2 border">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 ml-2"
            placeholder="Search profiles..."
          />
        </div>

        <IconButton icon={Bell} />
        <IconButton icon={Settings} />

        <div
          className="h-10 w-10 rounded-full bg-cover border"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdDBsjw1_4ApyZh-I3aKIUxPPcV8O7Q0aqGAm4W6zSKjFui8aQRlr9xyVyQC-AQ0tj7WEcBgO11VnS7IvdPDRQhAiRtPSyXf_bG8s29EWy23uNGwl2Si8cGUyOyRplqdIBwL3GV-jXEpHE6XsoOoJCdhVX4YZ668j6BK3lyuiE2aZpOoRCArRftMIpwyU_GYs8zN2fy8UmTL5G3CvwmRvzitFtQni5XaKWy4Q5QBKIKrc2w8J7mvThn0sA0Qq-SElUYZI8TD-mLgjG')",
          }}
        />
      </div>
    </header>
  )
}

const NavItem = ({ icon: Icon, label, active }) => (
  <a
    className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
      active
        ? "text-blue-600 border-b-2 border-blue-600 pb-4 mt-4"
        : "text-slate-500 hover:text-blue-600"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </a>
)

const IconButton = ({ icon: Icon }) => (
  <button className="p-2 rounded-full text-slate-400 hover:bg-slate-50">
    <Icon className="h-5 w-5" />
  </button>
)

export default PetHeader
