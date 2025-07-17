"use client";

import { useState } from "react";
import Image from "next/image";
import type { Anime } from "@/app/types/index";
import { X, Play } from "lucide-react";

export default function AnimeClientSection({ anime }: { anime: Anime }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="flex flex-row justify-between max-w-5xl mx-auto border">
      <div className="max-w-3/4 border">
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
        <div className="my-6">
          <h2 className="text-xl font-semibold text-[#FFD6BA] mb-2">
            Synopsis
          </h2>
          <p className="mt-4 font-semibold">{anime.synopsis}</p>
        </div>

        {anime.trailer && anime.trailerImage && (
          <div className="my-6">
            <h2 className="text-xl font-semibold text-[#FFD6BA] mb-2">
              Trailer
            </h2>
            <div
              className="relative w-full max-w-xl cursor-pointer mx-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <Image
                src={anime.trailerImage}
                alt="Trailer Thumbnail"
                width={1280}
                height={720}
                className="rounded-lg border-2 border-white"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/0 transition flex items-center justify-center rounded-lg">
                <div className="absolute inset-0 bg-black/40 hover:bg-black/0 flex items-center justify-center rounded-lg">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={anime.trailer}
                title="Anime Trailer"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full rounded-lg"
              ></iframe>
              {iframeLoaded && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute -top-4 -right-4 text-white text-2xl bg-white p-2 rounded-full cursor-pointer"
                >
                  <X color="black" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/*Right side*/}
      <div className="flex flex-col w-fit font-semibold border">
        <div className="flex border-b-1 py-4 items-center">
          <h1 className="mr-4 text-lg text-[#FFD6BA]">Studios: </h1>
          <p>{anime.studios.join(", ")}</p>
        </div>

        <div className="flex border-b-1 py-4 items-center">
          <h1 className="mr-4 text-lg text-[#FFD6BA]">Demographics: </h1>
          {anime.demographics.length === 0 ? (
            <p>Unkown</p>
          ) : (
            <p>{anime.demographics.join(", ")}</p>
          )}
        </div>

        <div className="flex border-b-1 py-4 items-center">
          <h1 className="mr-4 text-lg text-[#FFD6BA]">Theme: </h1>
          {anime.themes.length === 0 ? (
            <p>Unkown</p>
          ) : (
            <p>{anime.themes.join(", ")}</p>
          )}
        </div>

        <div className="flex border-b-1 py-4 items-center">
          <h1 className="mr-4 text-lg text-[#FFD6BA]">Status: </h1>
          {anime.status === "" ? (
            <p>Unkown</p>
          ) : anime.status === "Currently Airing" ? (
            <p>{anime.status}</p>
          ) : (
            <p>{anime.status}</p>
          )}
        </div>

        <div className="flex border-b-1 py-4 items-center">
          <h1 className="mr-4 text-lg text-[#FFD6BA]">Episodes: </h1>
          {anime.episodes ? <p>{anime.episodes}</p> : <p>Unkown</p>}
        </div>

        <div className="flex border-b-1 py-4 items-center">
          <h1 className="mr-4 text-lg text-[#FFD6BA]">Rating: </h1>
          {anime.rating ? <p>{anime.rating}</p> : <p>Unkown</p>}
        </div>
      </div>
    </section>
  );
}
