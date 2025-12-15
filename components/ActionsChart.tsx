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
      const actionsSnap = await getDocs(collection(db, "actions"));

      const cases = casesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const actions = actionsSnap.docs.map((d) => d.data());

      const counts = cases.map((c) =>
        actions.filter((a) => a.caseId === c.id).length
      );

      // ✨ Pendekkan label menjadi Nama Korban atau Jenis Kasus
      const labels = cases.map((c) =>
        c.caseType ? c.caseType : "Kasus"
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Jumlah Tindakan",
            data: counts,
            backgroundColor: "#3b82f6",
            borderColor: "#1d4ed8",
            borderWidth: 1,
            barThickness: 40, // ✨ batang lebih tebal agar terlihat
          },
        ],
      });
    }
    loadChart();
  }, []);

  if (!chartData) return <p>Memuat grafik...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">

      <h2 className="text-xl font-semibold mb-4">Grafik Tindakan per Kasus</h2>

      {/* Tidak center, tidak ngambang */}
      <div className="w-full h-96"> 
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top" },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { maxRotation: 0, minRotation: 0 },
              },
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
                grid: { display: false },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
