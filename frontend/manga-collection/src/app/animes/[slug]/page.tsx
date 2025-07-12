import { getAnimeByName } from "@/lib/api";
import AnimeCard from "@/app/components/AnimeCard";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function AnimeDetailPage({ params }: Props) {
  // Não precisa de await, pois params já está disponível
  const decodedName = decodeURIComponent(params.slug);
  console.log(decodedName);

  try {
    const anime = await getAnimeByName(decodedName);

    if (!anime) return notFound();

    return (
      <main className="min-h-screen bg-black text-white flex justify-center items-center p-8">
        <AnimeCard
          title={anime.title}
          imageUrl={anime.imageUrl}
          score={anime.score}
          rank={anime.rank}
          popularityRank={anime.popularity}
          linkToDetails={false}
        />
      </main>
    );
  } catch (error) {
    console.error("Erro ao buscar anime:", error);
    return notFound();
  }
}
