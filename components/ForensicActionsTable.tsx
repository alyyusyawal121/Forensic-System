"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function ForensicActionsTable() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "actions"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setActions(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus tindakan ini?")) return;

    await deleteDoc(doc(db, "actions", id));
    alert("Tindakan dihapus!");
    window.location.reload();
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tindakan Forensik</h1>

        <Link
          href="/actions/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Tambah Tindakan
        </Link>
      </div>

      {loading ? (
        <p>Memuat tindakan...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b text-gray-600 text-sm">
              <th className="py-3 px-3">Kasus</th>
              <th className="py-3 px-3">Jenis</th>
              <th className="py-3 px-3">Deskripsi</th>
              <th className="py-3 px-3">Bukti</th>
              <th className="py-3 px-3">Waktu</th>
              <th className="py-3 px-3 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {actions.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3">{a.caseName}</td>
                <td className="py-3 px-3">{a.actionType}</td>
                <td className="py-3 px-3">{a.description}</td>
                <td className="py-3 px-3">
                  {a.evidenceUrl ? (
                    <a href={a.evidenceUrl} target="_blank" className="text-blue-600 underline">
                      Lihat
                    </a>
                  ) : (
                    "Tidak ada"
                  )}
                </td>
                <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                  {a.time?.toDate
                    ? a.time.toDate().toLocaleString("id-ID", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "-"}
                </td>



                <td className="py-3 px-3 text-right flex justify-end gap-3">
                  <Link href={`/actions/edit/${a.id}`} className="text-blue-600">
                    <FiEdit2 />
                  </Link>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}
