import DashboardStats from "@/components/DashboardStats";
import ActionsChart from "@/components/ActionsChart";
import DashboardCaseViewer from "@/components/DashboardCaseViewer";
import InvestigationTimeline from "@/components/InvestigationTimeline";

export default function DashboardPage() {
  return (
    <div className="flex w-full">
      {/* Ruang Sidebar */}
      <div className="hidden md:block w-64" />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-24 px-6">

        {/* WRAPPER AGAR MIRIP HALAMAN CASES */}
        <div className="max-w-6xl mx-auto space-y-6">

          {/* CARD 1 — STATS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <DashboardStats />
          </div>



          {/* CARD 3 — DETAIL KASUS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <DashboardCaseViewer />
          </div>

                    {/* CARD 2 — CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Grafik Tindakan per Kasus</h2>
            <ActionsChart />
          </div>
        </div>
      </main>
    </div>
  );
}
