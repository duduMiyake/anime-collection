import { getAnimeById } from "@/lib/api";
import { notFound } from "next/navigation";
import FeatureAnimeSection from "@/app/components/animes/FeaturedAnimeSection";
import AnimeClientSection from "@/app/components/animes/AnimeClientSection";

interface Props {
  params: { id: string; slug: string };
}

export default async function AnimeDetailPage({ params }: Props) {
  const { id, slug } = params;

  const anime = await getAnimeById(id);

  if (!anime) return notFound();

  const expectedSlug = anime.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  if (slug !== expectedSlug) {
    // Pode redirecionar para a URL correta, por exemplo
    // ou ignorar, só mostrar mesmo
  }

  return (
    <main className="min-h-screen text-white p-8">
      <FeatureAnimeSection anime={anime} linkToDetails={false} />
      <AnimeClientSection anime={anime} />
    </main>
  );
}
