"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useUser } from "@/context/UserContext";
import { UserRound } from "lucide-react";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, logout } = useUser();

  return (
    <nav className="text-white py-6 md:py-4 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-xl font-bold">
          <Link href="/">AnimeCollection</Link>
        </div>

        <div className="w-full md:w-auto md:hidden">
          <SearchBar />
        </div>

        <ul className="flex gap-6 text-sm md:text-base items-center">
          {!user && (
            <li className="hover:text-gray-300 cursor-pointer font-semibold">
              <Link href="/login">Login</Link>
            </li>
          )}

          <li className="hover:text-gray-300 cursor-pointer font-semibold">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer font-semibold">
            <Link href="/animes/list">Animes</Link>
          </li>
          <div className="w-auto">
            <SearchBar />
          </div>
          {user && (
            <div className="flex gap-4 items-center">
              <li className="font-semibold">{user.username}</li>
              <Link href={"/profile"} className="rounded-full bg-gray-400 p-2">
                <UserRound />
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
