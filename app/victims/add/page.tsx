"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddVictimPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  // 🔥 Perbaikan penting → tambah async
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("ENV TEST:", {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  bucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});

    try {
      await addDoc(collection(db, "victims"), {
        name,
        contact,
        description,
        createdAt: serverTimestamp(),
      });

      alert("Korban berhasil ditambahkan!");

      // Reset form
      setName("");
      setContact("");
      setDescription("");

      // Redirect balik ke list victims
      window.location.href = "/victims";

    } catch (error) {
      console.error("Error menambahkan korban:", error);
      alert("Gagal menambahkan korban!");
    }
  };

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />

      <main className="flex-1 pt-24 px-6">
        <div className="max-w-xl bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Tambah Korban</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Korban
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* CONTACT */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Kontak
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Deskripsi Singkat
              </label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => history.back()}
                className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
              >
                Simpan Korban
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
