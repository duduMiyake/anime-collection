import AnimeDetailClient from "./AnimeDetailClient";

export default function AnimeDetailPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  return <AnimeDetailClient id={params.id} slug={params.slug} />;
}
