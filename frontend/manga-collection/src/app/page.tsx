"use client";

import { useEffect, useState } from "react";
import { getTopAnime, getPopularAnime, getSeasonalAnime } from "@/lib/api";
import AnimeCard from "@/app/components/AnimeCard";

interface Anime {
  title: string;
  synopsis: string;
  imageUrl: string;
  largeImageUrl: string;
  score: number;
  popularity?: number;
  rank?: number;
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
        setPopularMangas(popular);
        setTopMangas(top);
        setSeasonalMangas(seasonal);
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
        <section className="relative max-w-7xl mx-auto h-[600px] mb-12 overflow-hidden">
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
                  "linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 25%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%), linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 30%), linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 30%)",
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {seasonalMangas[0].title}
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-xl mb-6 line-clamp-3">
              {seasonalMangas[0].synopsis || "Sem descrição disponível."}
            </p>
          </div>
        </section>
      )}

      {/* Wrapper para centralizar o restante do conteúdo */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-yellow-500 pl-2">
          Top 10 mangas esta semana
        </h2>

        {loading ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {popularMangas.map((manga, index) => {
              if (!manga.imageUrl) return null;
              return (
                <AnimeCard
                  key={index}
                  title={manga.title}
                  imageUrl={manga.imageUrl}
                  score={manga.score}
                  popularityRank={manga.popularity}
                />
              );
            })}
          </div>
        )}

        <h2 className="text-white text-xl font-bold mt-10 mb-4 border-l-4 border-yellow-500 pl-2">
          Top 10 com maior score
        </h2>

        {loading ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {topMangas.map((manga, index) => {
              if (!manga.imageUrl) return null;
              return (
                <AnimeCard
                  key={index}
                  title={manga.title}
                  imageUrl={manga.imageUrl}
                  score={manga.score}
                  rank={manga.rank}
                />
              );
            })}
          </div>
        )}

        <h2 className="text-white text-xl font-bold mt-10 mb-4 border-l-4 border-yellow-500 pl-2">
          Top 10 mais populares
        </h2>

        {loading ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {seasonalMangas.map((manga, index) => {
              if (!manga.imageUrl) return null;
              return (
                <AnimeCard
                  key={index}
                  title={manga.title}
                  imageUrl={manga.imageUrl}
                  score={manga.score}
                  rank={manga.rank}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
