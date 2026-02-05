import { UserPlus } from "lucide-react"

const UsersHeader = () => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-bold lg:text-3xl">User Management</h1>
      <p className="mt-1 text-slate-600">
        Configure owner profiles and system operator permissions.
      </p>
    </div>

    <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
      <UserPlus className="w-4 h-4" />
      Create New User
    </button>
  </div>
)

export default UsersHeader
