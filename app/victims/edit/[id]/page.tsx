"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditVictimPage() {
  // 🔥 ambil id dari URL dengan useParams (bukan props)
  const params = useParams<{ id: string }>();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data victim dari Firestore
  useEffect(() => {
    async function loadVictim() {
      try {
        const snap = await getDoc(doc(db, "victims", id));
        if (snap.exists()) {
          const data = snap.data();
          setName((data.name as string) || "");
          setContact((data.contact as string) || "");
          setDescription((data.description as string) || "");
        }
      } catch (err) {
        console.error("Error load victim:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadVictim();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "victims", id), {
        name,
        contact,
        description,
      });

      alert("Data korban berhasil diperbarui!");
      window.location.href = "/victims";
    } catch (err) {
      console.error("Error update victim:", err);
      alert("Gagal memperbarui data korban.");
    }
  };

  if (loading) {
    return (
      <div className="flex w-full">
        <div className="hidden md:block w-64" />
        <main className="flex-1 pt-24 px-6">
          <p className="text-gray-500">Memuat data korban...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-64" />

      <main className="flex-1 pt-24 px-6">
        <div className="max-w-xl bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-semibold mb-4">Edit Korban</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Nama Korban</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Kontak</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Deskripsi</label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
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
