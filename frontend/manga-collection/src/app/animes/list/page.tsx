"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTopAnime, getPopularAnime, getSeasonalAnime } from "@/lib/api";
import type { Anime } from "@/app/types";
import AnimeCardList from "@/app/components/AnimeCardList";
import Loader from "@/app/components/ui/Loader";

type AnimeListType = "top" | "popular" | "seasonal";

function removeDuplicates(animes: Anime[]): Anime[] {
  const seenIds = new Set<number>();
  return animes.filter((anime) => {
    if (seenIds.has(anime.id)) return false;
    seenIds.add(anime.id);
    return true;
  });
}

export default function AnimeListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramType = searchParams.get("type") as AnimeListType | null;
  const [selectedType, setSelectedType] = useState<AnimeListType>(
    paramType || "top"
  );

  const [visibleAnimes, setVisibleAnimes] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const perPage = 25;

  useEffect(() => {
    router.replace(`/animes/list?type=${selectedType}`);
  }, [selectedType, router]);

  const fetchAnimes = async (pageNum: number, type: AnimeListType) => {
    setIsLoading(true);
    try {
      let data: Anime[] = [];
      if (type === "top") {
        data = await getTopAnime(pageNum, perPage);
      } else if (type === "popular") {
        data = await getPopularAnime(pageNum);
      } else if (type === "seasonal") {
        data = await getSeasonalAnime(pageNum);
      }

      const polishedData = removeDuplicates(data);
      console.log(polishedData);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setVisibleAnimes((prev) =>
          pageNum === 1
            ? polishedData
            : removeDuplicates([...prev, ...polishedData])
        );
      }
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setVisibleAnimes([]);
    setPage(1);
    setHasMore(true);
    fetchAnimes(1, selectedType);
  }, [selectedType]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAnimes(nextPage, selectedType);
    }
  }, [page, hasMore, isLoading, selectedType]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        loadMore();
      }
    },
    [loadMore, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section className="max-w-5xl min-h-screen mx-auto py-8 px-4">
      <div className="flex gap-4 mb-4">
        {["top", "popular", "seasonal"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full cursor-pointer border-2 border-[#FFD6BA] transition ${
              selectedType === type
                ? "bg-[#FFD6BA] text-black hover:brightness-90"
                : "bg-transparent text-white hover:text-black hover:bg-[#FFD6BA]/90"
            }`}
            onClick={() => setSelectedType(type as AnimeListType)}
          >
            {type === "top"
              ? "Top Anime"
              : type === "popular"
              ? "Popular Anime"
              : "Seasonal Anime"}
          </button>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-white">
        {selectedType === "top"
          ? "Top Animes"
          : selectedType === "popular"
          ? "Popular Animes"
          : "Seasonal Animes"}
      </h1>

      <div className="flex flex-col gap-4">
        {visibleAnimes.map((anime, index) => (
          <AnimeCardList key={anime.id} number={index + 1} anime={anime} />
        ))}
      </div>

      <div ref={loader} className="py-10 text-center text-gray-400">
        {isLoading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
}
