import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/app/types";

interface FeaturedAnimeSectionProps {
  anime: Anime;
  linkToDetails?: boolean;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // espaços viram "-"
    .replace(/[^\w-]/g, ""); // remove caracteres especiais
}

export default function FeaturedAnimeSection({
  anime,
  linkToDetails = true,
}: FeaturedAnimeSectionProps) {
  if (!anime) return null;
  console.log("anime: ", anime);

  return (
    <section className="flex flex-row relative max-w-5xl mx-auto my-12 h-[400px] overflow-visible bg-[#555B6E]">
      <div className="w-full flex">
        {/* Imagem à esquerda */}
        <div className="flex justify-center w-auto h-full">
          {linkToDetails ? (
            <Link
              href={`/animes/${anime.id}/${slugify(anime.title)}`}
              className="block w-fit h-full overflow-visible relative"
            >
              <Image
                src={anime.largeImageUrl}
                alt={anime.title}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 hover:brightness-80"
                width={500}
                height={400}
                priority
              />
            </Link>
          ) : (
            <div className="w-full h-full overflow-hidden relative">
              <Image
                src={anime.largeImageUrl}
                alt={anime.title}
                className="w-full h-full object-contain"
                width={500}
                height={400}
                priority
              />
            </div>
          )}
        </div>

        {/* Texto à direita */}
        <div className="flex-1 flex flex-col justify-center text-white px-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{anime.title}</h1>
          <h2 className="text-md font-semibold mb-2 opacity-70">
            Japanese title:{" "}
            <span className="font-normal">{anime.titleJapanese} </span>
          </h2>
          <h2 className="text-md font-semibold mb-4 opacity-70">
            English title:{" "}
            <span className="font-normal">{anime.titleEnglish} </span>
          </h2>
          {linkToDetails && (
            <p className="text-sm md:text-base text-gray-200 line-clamp-4 mb-4 truncate">
              {anime.synopsis || ""}
            </p>
          )}
          <div className="flex items-center mb-4">
            <p className="text-sm md:text-xl text-gray-200 line-clamp-4 mr-1">
              ⭐
            </p>
            <div className="flex flex-col">
              <div className="flex">
                <p className="text-xl mr-1 font-semibold">{anime.score}</p>
                <span className="text-md opacity-70">/10</span>
              </div>

              <p className="text-sm opacity-70">
                {anime.scoredBy / 1000} reviews
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <h1 className="text-md font-semibold opacity-70 text-[#FFD6BA]">
                Popularity
              </h1>
              <p className="text-md font-semibold">#{anime.popularity}</p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-md font-semibold opacity-70 text-[#FFD6BA]">
                Rank
              </h1>
              <p className="text-md font-semibold">#{anime.rank}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
