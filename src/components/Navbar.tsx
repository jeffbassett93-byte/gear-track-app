"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FileText,
  Home,
  ScrollText,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/procedures", label: "Procedures", icon: FileText },
  { href: "/checklists", label: "Checklists", icon: ClipboardList },
  { href: "/rules", label: "Warehouse Rules", icon: ScrollText },
  { href: "/inspection-sheets", label: "Inspection Sheets", icon: Shield },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-72 bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <div className="flex items-center h-20 px-6 border-b border-white/60">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-orange-500 shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900 block">Gear Track</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">IRATA</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-orange-50 text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isActive
                      ? "bg-gradient-to-br from-blue-600 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/60">
          <div className="text-xs text-gray-500">
            IRATA Compliant System
          </div>
          <div className="mt-2 text-[11px] text-gray-400">
            Papertrail.io is the system of record
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/60 z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
