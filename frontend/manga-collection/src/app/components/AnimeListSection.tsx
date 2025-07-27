// components/AnimeListSection.tsx
import AnimeCard from "@/app/components/AnimeCard";
import { Anime } from "@/app/types";
import Link from "next/link";
import SkeletonAnimeListSection from "./fallback/SkeletonAnimeListSection";

interface AnimeListSectionProps {
  listType?: "top" | "popular" | "seasonal";
  title: string;
  animes: Anime[];
  loading: boolean;
  variant?: "score" | "popularity";
}

export default function AnimeListSection({
  listType,
  title,
  animes,
  loading,
}: AnimeListSectionProps) {
  return (
    <section className="mt-10 mx-5 md:mx-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold border-l-4 border-[#FFD6BA] pl-2">
          {title}
        </h2>
        <Link href={`/animes/list?type=${listType}`}>Ver todos</Link>
      </div>

      {loading ? (
        <SkeletonAnimeListSection />
      ) : (
        <div className="flex gap-4 overflow-auto md:overflow-visible pb-4 md:scrollbar-hide">
          {animes.slice(0, 6).map((anime, index) => {
            if (!anime.imageUrl) return null;

            return (
              <AnimeCard
                key={index}
                id={anime.id}
                title={anime.title}
                imageUrl={anime.imageUrl}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
