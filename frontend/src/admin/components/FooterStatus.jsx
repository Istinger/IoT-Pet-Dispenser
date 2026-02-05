// src/admin/components/FooterStatus.jsx
const FooterStatus = () => (
  <footer className="mt-10 border-t pt-6">
    <div className="flex items-center gap-4">
      <span className="font-bold">System Health:</span>
      <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 w-[95%]" />
      </div>
      <span className="text-xs font-black text-emerald-600">OPTIMAL</span>
    </div>
  </footer>
)

export default FooterStatus
