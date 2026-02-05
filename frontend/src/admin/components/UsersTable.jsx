import UserRow from "./UserRow"

const UsersTable = ({ users, onEdit, onPatch, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-4 text-xs text-slate-500">Name</th>
          <th className="px-6 py-4 text-xs text-slate-500">Email</th>
          <th className="px-6 py-4 text-xs text-slate-500">Role</th>
          <th className="px-6 py-4 text-xs text-slate-500">Status</th>
          <th className="px-6 py-4 text-xs text-slate-500 text-right">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {users.map(user => (
          <UserRow
            key={user._id}
            user={user}
            onEdit={onEdit}
            onPatch={onPatch}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
)

export default UsersTable
