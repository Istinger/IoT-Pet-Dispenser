import FilterSelect from "./FilterSelect"


const UsersFilters = ({ total }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
    <div className="flex gap-3">
      <FilterSelect
        options={["All Roles", "Owner", "Operator"]}
      />
      <FilterSelect
        options={["All Status", "Active", "Inactive"]}
      />
    </div>

    <div className="text-sm font-medium text-slate-500">
      Total Users: <span className="text-slate-900">{total}</span>
    </div>
  </div>
)

export default UsersFilters
