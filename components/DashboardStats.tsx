"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardStats() {
  const [totalCases, setTotalCases] = useState(0);
  const [openCases, setOpenCases] = useState(0);
  const [closedCases, setClosedCases] = useState(0);
  const [totalActions, setTotalActions] = useState(0);

  useEffect(() => {
    async function loadStats() {
      const casesSnap = await getDocs(collection(db, "cases"));
      const cases = casesSnap.docs.map((d) => d.data());

      setTotalCases(cases.length);
      setOpenCases(cases.filter((c) => c.status === "Open").length);
      setClosedCases(cases.filter((c) => c.status === "Closed").length);

      const actionsSnap = await getDocs(collection(db, "actions"));
      setTotalActions(actionsSnap.docs.length);
    }
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Total Kasus" value={totalCases} color="bg-blue-600" />
      <StatCard title="Kasus Open" value={openCases} color="bg-yellow-500" />
      <StatCard title="Kasus Closed" value={closedCases} color="bg-green-600" />
      <StatCard title="Total Tindakan" value={totalActions} color="bg-purple-600" />
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-6 rounded-xl shadow`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
