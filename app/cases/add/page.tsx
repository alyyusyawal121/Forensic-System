"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddCasePage() {
  const [victimId, setVictimId] = useState("");
  const [victims, setVictims] = useState([]);
  const [caseType, setCaseType] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("Open");

  // 🔥 Load korban dari Firestore
  useEffect(() => {
    async function loadVictims() {
      const snap = await getDocs(collection(db, "victims"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVictims(data);
    }

    loadVictims();
  }, []);

  // 🔥 Simpan Kasus
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "cases"), {
      victimId,
      caseType,
      summary,
      status,
      createdAt: serverTimestamp(),
    });

    alert("Kasus berhasil disimpan!");
    window.location.href = "/cases";
  };

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />

      <main className="flex-1 pt-24 px-6">
        <div className="max-w-xl bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Tambah Kasus</h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Victim Select */}
            <div>
              <label className="block text-sm font-medium mb-1">Pilih Korban</label>

              <select
                className="w-full border px-3 py-2 rounded-lg"
                value={victimId}
                onChange={(e) => setVictimId(e.target.value)}
                required
              >
                <option value="">-- Pilih korban --</option>

                {victims.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Case Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Kasus</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                required
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium mb-1">Ringkasan Kasus</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => history.back()}
                className="px-4 py-2 border rounded-lg"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Simpan Kasus
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
