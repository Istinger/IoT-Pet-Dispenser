import Brand from "../components/Brand"
import TopNav from "../components/TopNav"
import HeaderActions from "../components/HeaderActions"

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Brand />
          <TopNav />
        </div>

        <HeaderActions />
      </div>
    </header>
  )
}

export default AdminHeader
