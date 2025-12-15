"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditCasePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [victimId, setVictimId] = useState("");
  const [caseType, setCaseType] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("Open");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCase() {
      try {
        const snap = await getDoc(doc(db, "cases", id));
        if (snap.exists()) {
          const data = snap.data();
          setVictimId(data.victimId || "");
          setCaseType(data.caseType || "");
          setSummary(data.summary || "");
          setStatus(data.status || "Open");
        }
      } finally {
        setLoading(false);
      }
    }
    if (id) loadCase();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await updateDoc(doc(db, "cases", id), {
      victimId,
      caseType,
      summary,
      status
    });

    alert("Kasus berhasil diperbarui!");
    router.push("/cases");
  };

  if (loading)
    return <p className="pt-24 px-6">Memuat data kasus...</p>;

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />

      <main className="flex-1 pt-24 px-6">
        <div className="max-w-xl bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-semibold mb-4">Edit Kasus</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Korban</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={victimId}
                onChange={(e) => setVictimId(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Jenis Kasus</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Ringkasan</label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-3 py-2"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Status</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => history.back()}
                className="px-4 py-2 rounded-lg border"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
