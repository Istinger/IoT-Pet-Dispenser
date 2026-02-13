import PageHeader from "../components/layout/PageHeader"
import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/dashboard/Topbar"
import NotificationPanel from "../components/settings/NotificationPanel"
import ProfileCard from "../components/settings/ProfileCard"
import SecurityCard from "../components/settings/SecurityCard"

const SettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar oculto en móvil */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto flex flex-col w-full">
        {/* Topbar con hamburguesa */}
        <Topbar />

        {/* PageHeader */}
        <PageHeader
          title="Account & Notifications"
          breadcrumb={<span>Settings</span>}
        />

        {/* Contenido principal adaptativo */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Settings & Notifications
              </h1>
              <p className="text-slate-500 text-sm sm:text-base">
                Manage your account and notification preferences.
              </p>
            </div>

            {/* Grid adaptativo: full-width móvil, 2 columnas desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <ProfileCard />
                <SecurityCard />
              </div>

              <div className="lg:col-span-7">
                <NotificationPanel />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
