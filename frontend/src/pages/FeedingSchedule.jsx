
import { Sun, Moon } from "lucide-react"
import Sidebar from "../components/layout/Sidebar"
import FeedingSummary from "../components/feeding/feedingSummary"
import InstantFeed from "../components/feeding/InstantFeed"
import MealCard from "../components/feeding/MealCard"

const FeedingSchedulePage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header>
            <p className="text-blue-600 text-sm font-bold uppercase">
              Active Plan: High Protein Diet
            </p>
            <h3 className="text-4xl font-extrabold">
              Max's Feeding Plan
            </h3>
            <p className="text-slate-500">
              Adjust portions and timing for your Golden Retriever
            </p>
          </header>

          <FeedingSummary />
          <InstantFeed />

          <div className="grid xl:grid-cols-2 gap-8">
            <MealCard title="Breakfast" icon={Sun} time="07:30" portion={350} />
            <MealCard title="Dinner" icon={Moon} time="19:00" portion={600} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default FeedingSchedulePage
