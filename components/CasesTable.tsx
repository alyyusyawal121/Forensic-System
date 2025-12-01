"use client";

import React from "react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function CasesTable({ cases = [] }) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Data Kasus</h1>

        <Link
          href="/cases/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <FiPlus /> Tambah Kasus
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b">
              <th className="py-3 px-3">Nama Korban</th>
              <th className="py-3 px-3">Jenis Kasus</th>
              <th className="py-3 px-3">Ringkasan</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {cases.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  Belum ada data kasus.
                </td>
              </tr>
            ) : (
              cases.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-3 font-medium">{c.victimName}</td>
                  <td className="py-3 px-3">{c.caseType}</td>
                  <td className="py-3 px-3 text-gray-600">{c.summary}</td>
                  <td className="py-3 px-3 text-gray-700">{c.status}</td>

                  <td className="py-3 px-3 text-right flex items-center justify-end gap-3">
                    
                    {/* EDIT */}
                    <Link
                      href={`/cases/edit/${c.id}`}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FiEdit2 size={18} />
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => console.log("delete", c.id)}
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
