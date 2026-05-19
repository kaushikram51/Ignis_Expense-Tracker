"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PieChart, Target, Settings } from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 items-center">
      <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
        <LayoutGrid size={20} /> Dashboard
      </Link>
      <Link href="/analytics" className={`nav-link ${pathname === '/analytics' ? 'active' : ''}`}>
        <PieChart size={20} /> Analytics
      </Link>
      <Link href="/goals" className={`nav-link ${pathname === '/goals' ? 'active' : ''}`}>
        <Target size={20} /> Goals
      </Link>
      <Link href="/settings" className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}>
        <Settings size={20} /> Settings
      </Link>
    </nav>
  );
}
