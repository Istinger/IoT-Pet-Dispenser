import PageHeader from "../components/layout/PageHeader"
import Sidebar from "../components/layout/Sidebar"
import NotificationPanel from "../components/settings/NotificationPanel"
import ProfileCard from "../components/settings/ProfileCard"
import SecurityCard from "../components/settings/SecurityCard"

const SettingsPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50">
        <PageHeader
          title="Account & Notifications"
          breadcrumb={<span>Settings</span>}
        />

        <div className="p-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Settings & Notifications
            </h1>
            <p className="text-slate-500">
              Manage your account and notification preferences.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <ProfileCard />
              <SecurityCard />
            </div>

            <div className="lg:col-span-7">
              <NotificationPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
