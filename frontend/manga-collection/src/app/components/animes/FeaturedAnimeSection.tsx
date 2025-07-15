import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/app/types";

interface FeaturedAnimeSectionProps {
  anime: Anime;
  linkToDetails?: boolean;
}

export default function FeaturedAnimeSection({
  anime,
  linkToDetails = true,
}: FeaturedAnimeSectionProps) {
  if (!anime) return null;

  const ImageContent = (
    <Image
      src={anime.largeImageUrl}
      alt={anime.title}
      fill
      className="object-contain transition-transform duration-300 hover:scale-110 rounded-lg"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );

  return (
    <section className="flex flex-row relative max-w-5xl mx-auto my-12 h-[400px] bg-[#555b6e] overflow-visible">
      <div className="w-3/4 flex">
        {/* Imagem à esquerda */}
        {linkToDetails ? (
          <Link
            href={`/animes/${anime.title}`}
            className="relative w-1/2 h-full rounded-lg overflow-visible"
          >
            {ImageContent}
          </Link>
        ) : (
          <div className="relative w-1/2 h-full rounded-lg overflow-visible">
            {ImageContent}
          </div>
        )}

        {/* Texto à direita */}
        <div className="w-1/2 flex flex-col justify-center px-6 text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{anime.title}</h1>
          {linkToDetails && (
            <p className="text-sm md:text-base text-gray-200 line-clamp-4">
              {anime.synopsis || ""}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
