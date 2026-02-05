import { Camera, User, Mail } from "lucide-react"

const ProfileCard = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBVP7Wr5kH-IZlHLN4Kao5AzmG43E63tqlsgmmswxv4_Ky6TXI2WhJ8ovaM7xrr98mEEt6CockvnVzQ5AMfmDpzkQa1A83M7CrK8Y20WMM9MlsdVdpwpw6mV3MHTCl0wgzPtCEc6mdaf3KOeesqSF8OqnDSULoNx4ggliXkh8Bs1bKtF-FdC9duTIS-JpwSZWMaAjtVPm663i__GwkUE0w8cpELHBSalfWTUy4i1dldM757OcaGEr8Y0BJLCqTMBK8TzxUgve5LkXg"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <button className="absolute bottom-0 right-0 p-1.5 bg-white border rounded-full">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-lg">Alex Johnson</h3>
          <p className="text-sm text-slate-500">Premium Plan Member</p>
        </div>
      </div>

      <Input label="Full Name" icon={User} defaultValue="Alex Johnson" />
      <Input
        label="Email Address"
        icon={Mail}
        defaultValue="alex.johnson@petfeeder.pro"
        type="email"
      />
    </div>
  )
}

const Input = ({ label, icon: Icon, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        {...props}
        className="w-full pl-10 py-2.5 rounded-xl bg-slate-50 border focus:ring-blue-600 focus:border-blue-600 text-sm"
      />
    </div>
  </div>
)

export default ProfileCard
