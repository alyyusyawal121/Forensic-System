"use client";

import React from "react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";


async function handleDelete(id) {
  if (!confirm("Yakin ingin menghapus korban ini?")) return;

  try {
    await deleteDoc(doc(db, "victims", id));
    alert("Korban berhasil dihapus!");
    window.location.reload(); // cepat & mudah
  } catch (err) {
    console.error(err);
    alert("Gagal menghapus korban.");
  }
}


export default function VictimListTable({ victims, loading }) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      {/* HEADER SELALU TAMPIL */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Data Korban</h1>

        <Link
          href="/victims/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          <FiPlus /> Tambah Korban
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b">
              <th className="py-3 px-3">Nama Korban</th>
              <th className="py-3 px-3">Kontak</th>
              <th className="py-3 px-3">Ringkasan</th>
              <th className="py-3 px-3 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {/* ROW LOADING KHUSUS DATA */}
            {loading &&
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3 px-3">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div>
                  </td>
                </tr>
              ))}

            {/* DATA ASLI */}
            {!loading && victims.length > 0 &&
              victims.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium">{v.name}</td>
                  <td className="py-3 px-3">{v.contact}</td>
                  <td className="py-3 px-3">{v.description}</td>

                  <td className="py-3 px-3 text-right flex justify-end gap-3">
                    <Link
                      href={`/victims/edit/${v.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(v.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={18} />
                    </button>

                  </td>
                </tr>
              ))}

            {/* KOSONG */}
            {!loading && victims.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  Belum ada data korban.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

