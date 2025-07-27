"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Anime } from "@/app/types";
import { searchAnimeByName } from "@/lib/api";
import Loader from "../ui/Loader";
import { Search } from "lucide-react";

function removeDuplicates(animes: Anime[]): Anime[] {
  const seen = new Set<string>();
  return animes.filter((anime) => {
    if (seen.has(anime.title)) return false;
    seen.add(anime.title);
    return true;
  });
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    setLoading(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchAnimeByName(value);
        const filteredData = removeDuplicates(data);
        setResults(filteredData.slice(0, 5));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleSelect = (anime: Anime) => {
    const slug = anime.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    router.push(`/animes/${anime.id}/${slug}`);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center px-4 relative w-full md:w-72 border rounded text-white font-semibold">
      <Search />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        placeholder="Buscar anime..."
        className="w-full px-4 py-2 rounded-md text-white bg-transparent outline-none"
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-[#89B0AE] text-white rounded-md shadow-md z-50">
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <Loader />
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((anime) => (
                <li
                  key={anime.id}
                  onClick={() => handleSelect(anime)}
                  className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer"
                >
                  {anime.title}
                </li>
              ))}
            </ul>
          ) : (
            query.trim().length > 0 && (
              <div className="px-4 py-2 text-gray-200">Nenhum resultado</div>
            )
          )}
        </div>
      )}
    </div>
  );
}
