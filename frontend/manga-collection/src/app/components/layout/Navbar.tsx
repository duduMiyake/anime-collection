"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="text-white py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">AnimeCollection</Link>
        </div>

        <ul className="flex gap-6 text-sm md:text-base">
          <li className="hover:text-gray-300 cursor-pointer font-semibold">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer font-semibold">
            <Link href={"/animes/list"}>Animes</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
