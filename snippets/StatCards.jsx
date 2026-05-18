// SNIPPET: StatCards — Dashboard metric cards row
// Replace MOCK_STATS with real data from API
// Icon is a colored square placeholder — swap with lucide-react or heroicons

const MOCK_STATS = [
  { label: "Total Users", value: "1,284", change: "+12%", up: true, color: "bg-indigo-500" },
  { label: "Active Today", value: "342", change: "+5%", up: true, color: "bg-emerald-500" },
  { label: "Submissions", value: "89", change: "-3%", up: false, color: "bg-amber-500" },
  { label: "Avg. Score", value: "7.4", change: "+0.2", up: true, color: "bg-violet-500" },
]; // MOCK DATA — replace with API response

export default function StatCards({ stats = MOCK_STATS }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <div className={`w-8 h-8 rounded-lg ${stat.color} opacity-80`} /> {/* PLACEHOLDER: icon */}
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            <span className={`text-xs font-medium ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
