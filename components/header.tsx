"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/">
          <h1 className="font-noto-looped text-2xl font-semibold text-sky-700">
            นภาดรีมบัส
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-600 hover:text-sky-700 cursor-pointer"
          >
            หน้าแรก
          </Link>

          <Link
            href="/booking"
            className="text-gray-600 hover:text-sky-700 cursor-pointer"
          >
            จองตั๋วโดยสาร
          </Link>

          <Link
            href="/my-ticket"
            className="text-gray-600 hover:text-sky-700 cursor-pointer"
          >
            ตั๋วของฉัน
          </Link>

          <Link
            href="/contact"
            className="text-gray-600 hover:text-sky-700 cursor-pointer"
          >
            ติดต่อ
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-sky-700" />
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="font-noto-looped text-sky-700">
                  นภาดรีมบัส
                </SheetTitle>
              </SheetHeader>

              <nav className="px-5 mt-8 flex flex-col gap-6 text-lg">
                <Link href="/" className="hover:text-sky-700">
                  หน้าแรก
                </Link>
                <Link href="/booking" className="hover:text-sky-700">
                  จองตั๋วโดยสาร
                </Link>
                <Link href="/my-ticket" className="hover:text-sky-700">
                  ตั๋วของฉัน
                </Link>
                <Link href="/contact" className="hover:text-sky-700">
                  ติดต่อ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
