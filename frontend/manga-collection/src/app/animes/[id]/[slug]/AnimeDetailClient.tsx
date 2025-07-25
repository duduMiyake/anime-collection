"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAnimeById } from "@/lib/api";
import FeatureAnimeSection from "@/app/components/animes/FeaturedAnimeSection";
import AnimeClientSection from "@/app/components/animes/AnimeClientSection";
import SkeletonFeaturedAnimeSection from "@/app/components/fallback/SkeletonFeaturedAnimeSection";
import { Anime } from "@/app/types";

interface Props {
  id: string;
  slug: string;
}

export default function AnimeDetailClient({ id, slug }: Props) {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeById(id);

        if (!data) {
          router.replace("/404");
          return;
        }

        const expectedSlug = data.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");

        if (slug !== expectedSlug) {
          router.replace(`/animes/${id}/${expectedSlug}`);
          return;
        }

        setAnime(data);
      } catch (error) {
        console.error("Erro ao buscar anime:", error);
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id, slug, router]);

  return (
    <main className="min-h-screen text-white p-8">
      {loading || !anime ? (
        <SkeletonFeaturedAnimeSection />
      ) : (
        <>
          <FeatureAnimeSection anime={anime} linkToDetails={false} />
          <AnimeClientSection anime={anime} />
        </>
      )}
    </main>
  );
}
