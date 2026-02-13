import AdminHeader from "./AdminHeader"
import AdminFooter from "./AdminFooter"

const AdminLayout = ({ children, active }) => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 py-6 sm:py-8 lg:px-10">
        {children}
      </main>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout
