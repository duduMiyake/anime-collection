"use client";

import { useEffect, useState } from "react";
import { getTopMangas, getPopularMangas } from "@/lib/api";
import MangaCard from "@/app/components/MangaCard";

interface Manga {
  title: string;
  imageUrl: string;
  score: number;
  popularity?: number;
  rank?: number;
}

export default function HomePage() {
  const [popularMangas, setPopularMangas] = useState<Manga[]>([]);
  const [topMangas, setTopMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularMangas()
      .then(setPopularMangas)
      .finally(() => setLoading(false));

    getTopMangas()
      .then(setTopMangas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-black min-h-screen p-6">
      <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-yellow-500 pl-2">
        Top 10 mangas esta semana
      </h2>

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          {popularMangas.map((manga, index) => {
            const imageUrl = manga.imageUrl;
            console.log(manga);
            if (!imageUrl) return null;

            return (
              <MangaCard
                key={index}
                title={manga.title}
                imageUrl={imageUrl}
                score={manga.score}
                popularityRank={manga.popularity}
              />
            );
          })}
        </div>
      )}

      <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-yellow-500 pl-2">
        Top 10 com maior score
      </h2>

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          {topMangas.map((manga, index) => {
            const imageUrl = manga.imageUrl;
            console.log(manga);
            if (!imageUrl) return null;

            return (
              <MangaCard
                key={index}
                title={manga.title}
                imageUrl={imageUrl}
                score={manga.score}
                rank={manga.rank}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
