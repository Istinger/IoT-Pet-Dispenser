// src/admin/components/Pagination.jsx
const Pagination = () => {
  const handlePageChange = (page) => {
    console.log(`Admin logs page: ${page}`)
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 border-t">
      <p className="text-sm text-slate-500">
        Showing <b>1–10</b> of <b>1,284</b> logs
      </p>
      <div className="flex gap-2">
        <button className="btn-outline" onClick={() => handlePageChange("prev")}>‹</button>
        <button className="btn-success" onClick={() => handlePageChange(1)}>1</button>
        <button className="btn-outline" onClick={() => handlePageChange(2)}>2</button>
        <button className="btn-outline" onClick={() => handlePageChange(3)}>3</button>
        <button className="btn-outline" onClick={() => handlePageChange("next")}>›</button>
      </div>
    </div>
  )
}

export default Pagination
