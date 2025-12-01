import DashboardOverview from "@/components/DashboardOverview";
import News from "@/components/News";
import ActivityFeed from "@/components/ActivityFeed";


export default function DashboardPage() {
  return (
    <div className="flex w-full">

      {/* SIDEBAR SPACE (biar content tidak ketimpa) */}
      <div className="hidden md:block w-64" />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-24 px-6 ">
        
        {/* LEFT CONTENT */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <DashboardOverview />
          <News />
          <ActivityFeed />
        </div>


      </main>
    </div>
  );
}
