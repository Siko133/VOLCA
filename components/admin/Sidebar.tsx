"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">

      <div className="p-8 border-b border-zinc-800">

        <h1 className="text-3xl font-black text-white">
          VOLCA
        </h1>

        <p className="text-zinc-500 mt-2">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 p-5 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition
              ${
                active
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={22} />
              {link.name}
            </Link>
          );
        })}

      </nav>

      <div className="p-5 border-t border-zinc-800">

        <button
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={22} />
          Logout
        </button>

      </div>

    </aside>
  );
}