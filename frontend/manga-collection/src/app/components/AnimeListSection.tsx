// components/AnimeListSection.tsx
import AnimeCard from "@/app/components/AnimeCard";
import { Anime } from "@/app/types";

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
      <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-yellow-500 pl-2">
        {title}
      </h2>

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : (
        <div className="flex gap-4 overflow-visible pb-4 scrollbar-hide">
          {animes.slice(0, 6).map((manga, index) => {
            if (!manga.imageUrl) return null;

            return (
              <AnimeCard
                key={index}
                title={manga.title}
                imageUrl={manga.imageUrl}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
