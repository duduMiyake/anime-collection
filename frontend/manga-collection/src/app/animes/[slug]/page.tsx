import { getAnimeByName } from "@/lib/api";
import { notFound } from "next/navigation";

import FeatureAnimeSection from "@/app/components/animes/FeaturedAnimeSection";

interface Props {
  params: { slug: string };
}

export default async function AnimeDetailPage({ params }: Props) {
  const decodedName = decodeURIComponent(params.slug);
  console.log(decodedName);

  try {
    const anime = await getAnimeByName(decodedName);
    console.log(anime);
    if (!anime) return notFound();

    return (
      <main className="min-h-screen text-white p-8">
        <FeatureAnimeSection anime={anime} linkToDetails={false} />
        <section className="flex flex-row justify-between max-w-5xl mx-auto">
          <div className="max-w-3/4">
            <ul className="flex flex-row gap-4">
              {anime.genres.map((genre: string) => (
                <li
                  key={genre}
                  className="px-4 py-1 border border-white rounded-full cursor-pointer"
                >
                  {genre}
                </li>
              ))}
            </ul>
            <p className="mt-4">{anime.synopsis}</p>
          </div>

          <div className="flex flex-col max-w-1/4">
            <div className="flex border-b-1 py-4 items-center">
              <h1 className="mr-4 text-lg font-semibold">Studios: </h1>
              {anime.studios.map((studio: string) => (
                <p key={studio}>{studio}</p>
              ))}
            </div>

            <div className="flex border-b-1 py-4 items-center">
              <h1 className="mr-4 text-lg font-semibold">Demographics: </h1>
              {anime.demographics.map((studio: string) => (
                <p key={studio}>{studio}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Erro ao buscar anime:", error);
    return notFound();
  }
}
