import AnimeDetailClient from "./AnimeDetailClient";

interface Props {
  params: { id: string; slug: string };
}

export default function AnimeDetailPage({ params }: Props) {
  return <AnimeDetailClient id={params.id} slug={params.slug} />;
}
