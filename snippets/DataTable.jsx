// SNIPPET: DataTable
// Props: columns (array of {key, label}), data (array of objects), onRowClick
// Replace MOCK_DATA and MOCK_COLUMNS with real data from API

const MOCK_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "category", label: "Category" },
  { key: "created_at", label: "Date" },
];

const MOCK_DATA = [
  { id: 1, name: "First Item", status: "active", category: "Type A", created_at: "2025-05-10" },
  { id: 2, name: "Second Item", status: "pending", category: "Type B", created_at: "2025-05-11" },
  { id: 3, name: "Third Item", status: "done", category: "Type A", created_at: "2025-05-12" },
  { id: 4, name: "Fourth Item", status: "active", category: "Type C", created_at: "2025-05-13" },
  { id: 5, name: "Fifth Item", status: "done", category: "Type B", created_at: "2025-05-14" },
]; // MOCK DATA — replace with API call

const STATUS_COLORS = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  done: "bg-blue-100 text-blue-700",
  failed: "bg-red-100 text-red-700",
};

export default function DataTable({
  columns = MOCK_COLUMNS,
  data = MOCK_DATA,
  onRowClick = null,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-12 text-gray-400 text-sm">
        No items yet.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium text-gray-600">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {col.key === "status" ? (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[row[col.key]] ?? "bg-gray-100 text-gray-600"}`}>
                      {row[col.key]}
                    </span>
                  ) : (
                    row[col.key] ?? "—"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
