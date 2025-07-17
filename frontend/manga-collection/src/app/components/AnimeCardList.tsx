import Image from "next/image";
import Link from "next/link";

interface Anime {
  id: number;
  title: string;
  largeImageUrl: string;
}

interface AnimeCardListProps {
  anime: Anime;
  linkToDetails?: boolean;
}

// Função utilitária para gerar slug da URL
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default function AnimeCardList({
  anime,
  linkToDetails = true,
}: AnimeCardListProps) {
  const content = (
    <div className="flex items-center bg-[#2a2a2a] rounded-lg overflow-hidden shadow hover:scale-[1.01] transition-transform">
      <div className="relative w-24 h-36 flex-shrink-0">
        <Image
          src={anime.largeImageUrl}
          alt={anime.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-4 py-2 text-white">
        <h2 className="text-lg font-semibold">{anime.title}</h2>
      </div>
    </div>
  );

  return linkToDetails ? (
    <Link href={`/animes/${anime.id}/${slugify(anime.title)}`}>{content}</Link>
  ) : (
    content
  );
}
