"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

export default function AddActionPage() {
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState("");
  const [actionType, setActionType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // 🔥 LOAD KASUS DARI FIRESTORE
  useEffect(() => {
    async function loadCases() {
      const snap = await getDocs(collection(db, "cases"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCases(data);
    }
    loadCases();
  }, []);

  // 🔥 HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    let evidenceUrl = "";

    // Upload file ke Cloudinary via API Route
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        alert("Upload gagal");
        return;
      }

      evidenceUrl = data.url;
    }

    // Ambil nama kasus
    const selectedCase = cases.find((c) => c.id === caseId);

    try {
      await addDoc(collection(db, "actions"), {
        caseId,
        caseName: selectedCase?.caseType || selectedCase?.summary || "",
        actionType,
        description,
        evidenceUrl,
        time: serverTimestamp(),
      });

      alert("Tindakan berhasil disimpan!");

      setCaseId("");
      setActionType("");
      setDescription("");
      setFile(null);

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan tindakan");
    }
  };

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />

      <main className="flex-1 pt-24 px-6">
        <div className="max-w-xl bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Tambah Tindakan</h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PILIH KASUS */}
            <div>
              <label className="block text-sm font-medium mb-1">Pilih Kasus</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                required
              >
                <option value="">-- Pilih --</option>

                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.summary || c.caseType || "Tanpa Nama"}
                  </option>
                ))}
              </select>
            </div>

            {/* JENIS TINDAKAN */}
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Tindakan</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                required
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                rows={4}
                className="w-full border rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* UPLOAD FILE */}
            <div>
              <label className="block text-sm font-medium mb-1">Upload Bukti</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 border rounded-lg"
                onClick={() => history.back()}
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Simpan
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
