export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Activity Feed</h2>

      <ul className="space-y-3 text-sm">
        <li>🔍 Case #12 investigated – 1 hr ago</li>
        <li>📁 New evidence added – 3 hrs ago</li>
        <li>⚠ System alert triggered – 5 hrs ago</li>
      </ul>
    </div>
  );
}
