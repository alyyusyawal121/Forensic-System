"use client";

import React from "react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function VictimListTable({ victims = [] }) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Data Korban</h1>

        <Link
          href="/victims/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <FiPlus /> Tambah Korban
        </Link>
      </div>

      {/* TABLE */}
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
            {victims.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  Belum ada data korban.
                </td>
              </tr>
            ) : (
              victims.map((victim) => (
                <tr
                  key={victim.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-3 font-medium">{victim.name}</td>
                  <td className="py-3 px-3">{victim.contact}</td>
                  <td className="py-3 px-3 text-gray-600">{victim.description}</td>

                  <td className="py-3 px-3 text-right flex items-center justify-end gap-3">
                    {/* EDIT BUTTON */}
                    <Link
                      href={`/victims/edit/${victim.id}`}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FiEdit2 size={18} />
                    </Link>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => console.log("delete", victim.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
