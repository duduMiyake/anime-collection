// components/AnimeListSection.tsx
import AnimeCard from "@/app/components/AnimeCard";
import { Anime } from "@/app/types";
import Link from "next/link";
import SkeletonAnimeListSection from "./fallback/SkeletonAnimeListSection";

interface AnimeListSectionProps {
  title: string;
  animes: Anime[];
  loading: boolean;
  variant?: "score" | "popularity";
}

export default function AnimeListSection({
  title,
  animes,
  loading,
}: AnimeListSectionProps) {
  return (
    <section className="mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-[#FFD6BA] pl-2">
          {title}
        </h2>
        <Link href={"/"}>Ver todos</Link>
      </div>

      {loading ? (
        <SkeletonAnimeListSection />
      ) : (
        <div className="flex gap-4 overflow-visible pb-4 scrollbar-hide">
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
