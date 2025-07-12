"use client";

import { useEffect, useState } from "react";
import { getTopAnime, getPopularAnime, getSeasonalAnime } from "@/lib/api";
import AnimeListSection from "@/app/components/AnimeListSection";
import { Anime } from "@/app/types";

function removeDuplicates(animes: Anime[]): Anime[] {
  const seen = new Set<string>();
  return animes.filter((anime) => {
    if (seen.has(anime.title)) return false;
    seen.add(anime.title);
    return true;
  });
}

export default function HomePage() {
  const [popularMangas, setPopularMangas] = useState<Anime[]>([]);
  const [topMangas, setTopMangas] = useState<Anime[]>([]);
  const [seasonalMangas, setSeasonalMangas] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [popular, top, seasonal] = await Promise.all([
          getPopularAnime(),
          getTopAnime(),
          getSeasonalAnime(),
        ]);
        setPopularMangas(removeDuplicates(popular));
        setTopMangas(removeDuplicates(top));
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
    <main className="min-h-screen bg-black text-white">
      {seasonalMangas.length > 0 && (
        <section className="relative max-w-2xl mx-auto h-[600px] mb-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${seasonalMangas[0].largeImageUrl})`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%), linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 30%), linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 30%)",
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-end h-full text-white text-center px-4 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {seasonalMangas[0].title}
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-xl mb-6 line-clamp-3">
              {seasonalMangas[0].synopsis || ""}
            </p>
          </div>
        </section>
      )}

      <div className="max-w-5xl mx-auto p-6">
        <AnimeListSection
          title="Top 10 mangas esta semana"
          animes={seasonalMangas}
          loading={loading}
        />
        <AnimeListSection
          title="Top 10 com maior score"
          animes={topMangas}
          loading={loading}
          variant="score"
        />
        <AnimeListSection
          title="Top 10 mais populares"
          animes={popularMangas}
          loading={loading}
          variant="popularity"
        />
      </div>
    </main>
  );
}
