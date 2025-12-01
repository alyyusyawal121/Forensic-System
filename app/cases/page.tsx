import React from "react";
import CasesTable from "@/components/CasesTable";

export default function Page() {
  return (
    <div className="flex w-full">
      {/* SIDEBAR SPACE */}
      <div className="hidden md:block w-64" />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-24 px-6">
        <CasesTable />
      </main>
    </div>
  );
}
