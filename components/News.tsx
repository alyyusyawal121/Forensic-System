export default function RecentCases() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">News</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <div className="h-20 bg-gray-200 rounded mb-3"></div>
            <p className="text-sm text-gray-600">Case #{i}</p>
            <button className="text-blue-600 text-sm font-medium mt-2">View Case</button>
          </div>
        ))}
      </div>
    </div>
  );
}
