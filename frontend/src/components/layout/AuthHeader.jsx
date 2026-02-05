import { Bone } from "lucide-react"
const AuthHeader = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 lg:px-12">
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 text-blue-600">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
            <Bone className="h-5 w-5" />
          </div>
        </div>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">
          Snack Box
        </h2>
      </div>
    </header>
  )
}

export default AuthHeader
