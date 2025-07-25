import Image from "next/image";
import Link from "next/link";
import type { Anime } from "@/app/types";

interface AnimeCardListProps {
  number: number;
  anime: Anime;
  linkToDetails?: boolean;
}

// Função utilitária para gerar slug da URL
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default function AnimeCardList({
  number,
  anime,
  linkToDetails = true,
}: AnimeCardListProps) {
  const content = (
    <div className="flex items-center bg-[#89B0AE] rounded-md overflow-hidden hover:scale-[1.01] transition-transform relative">
      <div className="relative w-24 h-36 flex-shrink-0">
        <Image
          src={anime.largeImageUrl}
          alt={anime.title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div className="px-4 py-2 text-white">
        <p className="font-semibold text-sm">#{number}</p>
        <h2 className="text-lg font-semibold mb-2 truncate max-w-[200px] sm:max-w-none">
          {anime.title}
        </h2>
        <ul className="md:flex flex-row hidden">
          {anime.genres.map((genre: string) => (
            <li
              key={genre}
              className="text-sm px-4 py-1 border-2 font-semibold border-[#FFD6BA] rounded-full cursor-pointer scale-90"
            >
              {genre}
            </li>
          ))}
        </ul>
        {/* mobile */}
        <ul className="flex flex-row md:hidden">
          {anime.genres.slice(0, 2).map((genre: string) => (
            <li
              key={genre}
              className="text-sm px-4 py-1 border-2 font-semibold border-[#FFD6BA] rounded-full cursor-pointer scale-90"
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 py-2 text-white hidden md:block">
        <div className="absolute bottom-2 right-2 text-white px-3 py-1 rounded-md">
          <div className="flex items-end gap-8">
            <div className="flex flex-col items-end">
              <p className="text-sm opacity-70">{anime.episodes} episodes</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center">
                <p className="text-xl font-semibold mr-1">{anime.score}</p>
                <p className="text-sm md:text-xl text-gray-200">⭐</p>
              </div>
              <p className="text-sm opacity-70 text-center">
                {Number(anime.scoredBy).toLocaleString("pt-BR")} reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return linkToDetails ? (
    <Link href={`/animes/${anime.id}/${slugify(anime.title)}`}>{content}</Link>
  ) : (
    content
  );
}
