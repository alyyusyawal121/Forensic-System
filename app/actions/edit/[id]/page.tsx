"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export default function EditActionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState("");
  const [actionType, setActionType] = useState("");
  const [description, setDescription] = useState("");
  const [currentEvidence, setCurrentEvidence] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);

  // Load daftar kasus
  useEffect(() => {
    async function loadCases() {
      const snap = await getDocs(collection(db, "cases"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCases(data);
    }
    loadCases();
  }, []);

  // Load data tindakan
  useEffect(() => {
    async function loadAction() {
      const refDoc = doc(db, "actions", id);
      const snap = await getDoc(refDoc);

      if (snap.exists()) {
        const data = snap.data();
        setCaseId(data.caseId);
        setActionType(data.actionType);
        setDescription(data.description);
        setCurrentEvidence(data.evidenceUrl || "");
      }

      setLoading(false);
    }
    loadAction();
  }, [id]);

  // Submit perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();

    let evidenceUrl = currentEvidence;

    // Jika user upload file baru, upload lewat Cloudinary
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        alert("Upload gagal!");
        return;
      }

      evidenceUrl = data.url;
    }

    // Ambil nama kasus dari Firestore
    const selectedCase = cases.find((c) => c.id === caseId);

    await updateDoc(doc(db, "actions", id), {
      caseId,
      caseName: selectedCase?.caseType || "",
      actionType,
      description,
      evidenceUrl,
      updatedAt: serverTimestamp(),
    });

    alert("Tindakan berhasil diperbarui!");
    router.push("/actions");
  };

  if (loading) return <p className="pt-24 px-6">Memuat tindakan...</p>;

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />
      <main className="flex-1 pt-24 px-6">
        <div className="max-w-xl bg-white rounded-xl shadow p-6">

          <h1 className="text-2xl font-semibold mb-4">Edit Tindakan</h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PILIH KASUS */}
            <div>
              <label className="block mb-1">Pilih Kasus</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.caseType}
                  </option>
                ))}
              </select>
            </div>

            {/* JENIS TINDAKAN */}
            <div>
              <label className="block mb-1">Jenis Tindakan</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="block mb-1">Deskripsi</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* BUKTI SAAT INI */}
            {currentEvidence && (
              <div>
                <p className="text-sm font-medium">Bukti Saat Ini:</p>
                <a
                  href={currentEvidence}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Lihat Bukti
                </a>
              </div>
            )}

            {/* UPLOAD FILE BARU */}
            <div>
              <label className="block mb-1">Ganti Bukti (opsional)</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* BUTTON */}
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
