// src/app/animes/[id]/[slug]/page.tsx
import dynamic from "next/dynamic";

const AnimeDetailClient = dynamic(() => import("./AnimeDetailClient"), {
  ssr: false,
});

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

export default function AnimeDetailPage({ params }: Props) {
  return <AnimeDetailClient id={params.id} slug={params.slug} />;
}
