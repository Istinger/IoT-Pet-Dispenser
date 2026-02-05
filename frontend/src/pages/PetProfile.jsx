import { useNavigate } from "react-router-dom"
import InsightsSection from "../components/petProfile/InsightsSection"
import PetHeader from "../components/petProfile/petHeader"
import PetProfileCard from "../components/petProfile/PetProfileCard"
import PetStats from "../components/petProfile/PetStats"


const PetProfile = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <PetHeader />

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Pet Profiles</h1>
            <p className="text-slate-500 font-medium">
              Manage health metrics and feeding goals.
            </p>
          </div>

          <button onClick={() => navigate('/registerPet')} className="h-12 px-6 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700">
            + Add New Pet
          </button>
        </div>

        <PetStats />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <PetProfileCard
            name="Max"
            breed="Golden Retriever"
            age="3y"
            weight="75 lbs"
            goal="1,400 kcal"
            progress={{ consumed: 840, percent: 60, next: "2h (300g)" }}
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDEa_fO9a21NKUH9Nm0SqFxSOj1XJ0Ge6FtDsq053Uu_WeCHaJeR7Wmn1-SxF14gAu2O-y2lQQWYUj17pIA2W6kH34BMLe2ltYkXsVjXoaKkvaYzyIVMY44OZYKJy9euE3BZ0DhcH7My_ekhVII80D_iKzxFuhdDrNYYlWK2u1N7l9vYm7HEmQpHuz2K5Ul0KgJXtxQnG8HxNUEDIc2Zop3yDvMH1aIOcibmU02Aggh7RrekLTYZLEEm5FP5SEJl1S7MwQkzFsP-HQz"
          />

          <PetProfileCard
            name="Luna"
            breed="German Shepherd"
            age="2y"
            weight="65 lbs"
            goal="1,250 kcal"
            progress={{ consumed: 562, percent: 45, next: "45m (250g)" }}
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuB6JXq8vWBtxWUwqVmfxgKRPxmGeEUpt-c45nqwA8vG7miOpC-2y7WSmTFXwWHb6q-DKnApHNmmjgu6Tbe0g1MI1P914NlA-24EZW0kMvLMhXNOwLHGAuxaGZ8zegJoDxXbEAHIn8yMoQyj8B2CUifA7T1O-R9_Bhr5D4ntXgk7-yNXvvd-JVtJfAsaZqw0WNU9yTBnnHpDkWNLaPzevF_JAIkbSgs9ib7qcMTJAxZwZrKlYRnvFYx-fd3G92eVQR_bJ6mp5jiWYh6o"
          />
        </div>

        <InsightsSection />
      </main>
    </div>
  )
}

export default PetProfile
