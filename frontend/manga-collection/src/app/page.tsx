"use client";

import { useEffect, useState } from "react";
import { getSeasonalAnime } from "@/lib/api";
import AnimeListSection from "@/app/components/AnimeListSection";
import { Anime } from "@/app/types";
import FeaturedAnimeSection from "./components/animes/FeaturedAnimeSection";

function removeDuplicates(animes: Anime[]): Anime[] {
  const seen = new Set<string>();
  return animes.filter((anime) => {
    if (seen.has(anime.title)) return false;
    seen.add(anime.title);
    return true;
  });
}

export default function HomePage() {
  const [seasonalMangas, setSeasonalMangas] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [seasonal] = await Promise.all([getSeasonalAnime()]);
        setSeasonalMangas(removeDuplicates(seasonal));
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <main className="min-h-screen text-white">
      {seasonalMangas.length > 0 && (
        <FeaturedAnimeSection
          anime={
            seasonalMangas[Math.floor(Math.random() * seasonalMangas.length)]
          }
          linkToDetails={true}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <AnimeListSection
          title="Top 10 mangas esta semana"
          animes={seasonalMangas}
          loading={loading}
        />
      </div>
    </main>
  );
}
