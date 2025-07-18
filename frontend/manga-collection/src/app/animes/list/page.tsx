"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getTopAnime } from "@/lib/api";
import type { Anime } from "@/app/types";
import AnimeCardList from "@/app/components/AnimeCardList";

function removeDuplicates(animes: Anime[]): Anime[] {
  const seenIds = new Set<number>();
  return animes.filter((anime) => {
    if (seenIds.has(anime.id)) return false;
    seenIds.add(anime.id);
    return true;
  });
}

export default function AnimeListPage() {
  const [allAnimes, setAllAnimes] = useState<Anime[]>([]);
  const [visibleAnimes, setVisibleAnimes] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const perPage = 25;

  const fetchTopAnimes = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const data = await getTopAnime(pageNum, perPage);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        const newAnimes = removeDuplicates([...allAnimes, ...data]);
        setAllAnimes(newAnimes);
        setVisibleAnimes(newAnimes.slice(0, pageNum * perPage));
      }
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchTopAnimes(page + 1);
      setPage((prev) => prev + 1);
    }
  }, [page, hasMore, isLoading]);

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
    fetchTopAnimes(1);
  }, []);

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
    <section className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Top Animes</h1>

      <div className="flex flex-col gap-4">
        {visibleAnimes.map((anime, index) => (
          <AnimeCardList key={anime.id} number={index + 1} anime={anime} />
        ))}
      </div>

      <div ref={loader} className="py-10 text-center text-gray-400">
        {isLoading && "Carregando mais animes..."}
        {!hasMore && "Todos os animes carregados"}
      </div>
    </section>
  );
}
