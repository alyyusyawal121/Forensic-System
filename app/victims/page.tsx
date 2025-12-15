"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import VictimListTable from "@/components/VictimListTable";

export default function VictimsPage() {
  const [victims, setVictims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVictims() {
      try {
        const snap = await getDocs(collection(db, "victims"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVictims(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVictims();
  }, []);

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" /> 

      <main className="flex-1 pt-24 px-6">
        <VictimListTable victims={victims} loading={loading} />
      </main>
    </div>
  );
}
