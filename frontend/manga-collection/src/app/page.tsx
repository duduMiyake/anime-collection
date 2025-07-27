"use client";

import { useEffect, useState } from "react";
import { getSeasonalAnime, getTopAnime, getPopularAnime } from "@/lib/api";
import AnimeListSection from "@/app/components/AnimeListSection";
import { Anime } from "@/app/types";
import FeaturedAnimeSection from "./components/animes/FeaturedAnimeSection";
import SkeletonFeaturedAnimeSection from "./components/fallback/SkeletonFeaturedAnimeSection";

function removeDuplicates(animes: Anime[]): Anime[] {
  const seen = new Set<string>();
  return animes.filter((anime) => {
    if (seen.has(anime.title)) return false;
    seen.add(anime.title);
    return true;
  });
}

export default function HomePage() {
  const [seasonalAnimes, setSeasonalAnimes] = useState<Anime[]>([]);
  const [topAnimes, setTopAnimes] = useState<Anime[]>([]);
  const [popularAnimes, setPopularAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [seasonal, top, popular] = await Promise.all([
          getSeasonalAnime(),
          getTopAnime(),
          getPopularAnime(),
        ]);
        setSeasonalAnimes(removeDuplicates(seasonal));
        setTopAnimes(removeDuplicates(top));
        setPopularAnimes(removeDuplicates(popular));
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
      {loading ? (
        <SkeletonFeaturedAnimeSection />
      ) : (
        seasonalAnimes.length > 0 && (
          <FeaturedAnimeSection
            anime={
              seasonalAnimes[Math.floor(Math.random() * seasonalAnimes.length)]
            }
            linkToDetails={true}
          />
        )
      )}

      <div className="max-w-5xl mx-auto">
        <AnimeListSection
          listType="seasonal"
          title="Popular this season"
          animes={seasonalAnimes}
          loading={loading}
        />

        <AnimeListSection
          listType="top"
          title="Best rated"
          animes={topAnimes}
          loading={loading}
        />

        <AnimeListSection
          listType="popular"
          title="All time popular"
          animes={popularAnimes}
          loading={loading}
        />
      </div>
    </main>
  );
}
