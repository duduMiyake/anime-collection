"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="text-white py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">MinhaLogo</Link>
        </div>

        <ul className="flex gap-6 text-sm md:text-base">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">Animes</li>
          <li className="hover:text-gray-300 cursor-pointer">About</li>
        </ul>
      </div>
    </nav>
  );
}
