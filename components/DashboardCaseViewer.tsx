"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function DashboardCaseViewer() {
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [caseDetail, setCaseDetail] = useState(null);
  const [actions, setActions] = useState([]);
  const [victimDetail, setVictimDetail] = useState(null);

  // Load all cases
  useEffect(() => {
    async function loadCases() {
      const snap = await getDocs(collection(db, "cases"));
      setCases(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    loadCases();
  }, []);

  // Load related data when case selected
  useEffect(() => {
    if (!selectedCaseId) return;

    async function loadData() {
      const caseDoc = await getDoc(doc(db, "cases", selectedCaseId));
      const caseData = caseDoc.data();
      setCaseDetail(caseData);

      const actionsSnap = await getDocs(collection(db, "actions"));
      const filteredActions = actionsSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((a) => a.caseId === selectedCaseId);

      setActions(filteredActions);

      if (caseData.victimId) {
        const victimDoc = await getDoc(doc(db, "victims", caseData.victimId));
        setVictimDetail(victimDoc.data());
      } else {
        setVictimDetail(null);
      }
    }

    loadData();
  }, [selectedCaseId]);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* Dropdown */}
      <label className="font-semibold block mb-2">Pilih Kasus</label>

      <select
        className="border rounded px-3 py-2 w-full truncate"
        value={selectedCaseId}
        onChange={(e) => setSelectedCaseId(e.target.value)}
      >
        <option value="">-- Pilih Kasus --</option>

        {cases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.caseType} — {c.summary?.slice(0, 60)}...
          </option>
        ))}
      </select>

      {/* Jika belum pilih */}
      {!selectedCaseId && (
        <p className="text-gray-500 mt-4">Silakan pilih kasus untuk melihat detail.</p>
      )}

      {/* Detail Case */}
      {selectedCaseId && caseDetail && (
        <div className="mt-6 space-y-6">

          <div>
            <h2 className="text-xl font-bold">Detail Kasus</h2>
            <p><strong>Jenis:</strong> {caseDetail.caseType}</p>
            <p><strong>Ringkasan:</strong> {caseDetail.summary}</p>
            <p><strong>Status:</strong> {caseDetail.status}</p>
          </div>

          {/* Victim Section */}
          {victimDetail && (
            <div>
              <h2 className="text-xl font-bold">Data Korban</h2>
              <p><strong>Nama:</strong> {victimDetail.name}</p>
              <p><strong>Kontak:</strong> {victimDetail.contact}</p>
              <p><strong>Deskripsi:</strong> {victimDetail.description}</p>
            </div>
          )}

          {/* Actions Section */}
          <div>
            <h2 className="text-xl font-bold">Tindakan Forensik</h2>

            {actions.length === 0 ? (
              <p className="text-gray-500">Belum ada tindakan.</p>
            ) : (
              <ul className="list-disc ml-5 space-y-2">
                {actions.map((a) => (
                  <li key={a.id}>
                    <strong>{a.actionType}</strong> — {a.description}
                    {a.evidenceUrl && (
                      <a
                        href={a.evidenceUrl}
                        target="_blank"
                        className="text-blue-600 underline ml-2"
                      >
                        Lihat Bukti
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
