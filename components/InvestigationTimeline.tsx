"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ActionsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function loadChart() {
      const casesSnap = await getDocs(collection(db, "cases"));
      const cases = casesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const actionsSnap = await getDocs(collection(db, "actions"));
      const actions = actionsSnap.docs.map((d) => d.data());

      const counts = cases.map((c) => {
        return actions.filter((a) => a.caseId === c.id).length;
      });

      setChartData({
        labels: cases.map((c) => c.summary),
        datasets: [
          {
            label: "Jumlah Tindakan",
            data: counts,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      });
    }
    loadChart();
  }, []);

  if (!chartData) return <p>Memuat grafik...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Grafik Tindakan per Kasus</h2>
      <Bar data={chartData} />
    </div>
  );
}
