const UsersPagination = () => (
  <div className="flex justify-between items-center px-6 py-4 border-t">
    <span className="text-sm text-slate-500">
      Showing 1 to 10 of 124 results
    </span>
    <div className="flex gap-1">
      <button className="btn-outline">1</button>
      <button className="btn-outline">2</button>
      <button className="btn-outline">3</button>
    </div>
  </div>
)

export default UsersPagination
