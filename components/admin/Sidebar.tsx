"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  X,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

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

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
    setOpen(false);
  }

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        className={`
fixed md:static
top-0 left-0
z-50
h-screen
w-72
bg-zinc-950
border-r border-zinc-800
flex flex-col
transition-transform duration-300

${open ? "translate-x-0" : "-translate-x-full"}

md:translate-x-0
`}
      >
        <div className="flex items-center justify-between p-8 border-b border-zinc-800">

          <div>
            <h1 className="text-3xl font-black text-white">
              VOLCA
            </h1>

            <p className="text-zinc-500 mt-2">
              Admin Panel
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white"
          >
            <X />
          </button>

        </div>

        <nav className="flex-1 p-5 space-y-2">

          {links.map((link) => {
            const Icon = link.icon;

            const active =
              pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition

${
  active
    ? "bg-white text-black"
    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
}
`}
              >
                <Icon size={22} />
                {link.name}
              </Link>
            );
          })}

        </nav>

        <div className="p-5 border-t border-zinc-800">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition"
          >
            <LogOut size={22} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}