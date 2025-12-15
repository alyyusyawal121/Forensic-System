"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import CasesTable from "@/components/CasesTable";

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCases() {
      const snap = await getDocs(collection(db, "cases"));

      const data = [];

      for (let d of snap.docs) {
        const c = d.data();

        // Ambil nama korban dari collection victims
        let victimName = "Tidak diketahui";
        if (c.victimId) {
          const vSnap = await getDoc(doc(db, "victims", c.victimId));
          if (vSnap.exists()) victimName = vSnap.data().name;
        }

        data.push({
          id: d.id,
          victimName,
          ...c,
        });
      }

      setCases(data);
      setLoading(false);
    }

    loadCases();
  }, []);

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />

      <main className="flex-1 pt-24 px-6">
        {loading ? (
          <p className="text-gray-500">Memuat data kasus...</p>
        ) : (
          <CasesTable cases={cases} />
        )}
      </main>
    </div>
  );
}
