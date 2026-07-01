"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <main className="flex-1 overflow-y-auto">

        <header className="md:hidden h-16 flex items-center px-5 border-b border-zinc-800">

          <button
            onClick={() => setOpen(true)}
            className="text-white"
          >
            <Menu size={28} />
          </button>

        </header>

        {children}

      </main>

    </div>
  );
}