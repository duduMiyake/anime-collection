import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  title: string;
  imageUrl: string;
  score: number;
  rank?: number;
  popularityRank?: number;
  linkToDetails?: boolean;
}

export default function AnimeCard({
  title,
  imageUrl,
  score,
  rank,
  popularityRank,
  linkToDetails = true,
}: AnimeCardProps) {
  const CardContent = (
    <div className="min-w-[160px] bg-gray-800 rounded-xl p-2 shadow-md hover:scale-105 transition-transform">
      <Image
        src={imageUrl}
        alt={title}
        width={160}
        height={230}
        className="rounded-md"
      />
      <h3 className="text-sm font-bold mt-2 line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-400">Score: {score}</p>
      {rank && <p className="text-xs text-yellow-400">Rank: #{rank}</p>}
      {popularityRank && (
        <p className="text-xs text-green-400">
          Popularidade: #{popularityRank}
        </p>
      )}
    </div>
  );

  return linkToDetails ? (
    <Link href={`/animes/${title}`}>{CardContent}</Link>
  ) : (
    CardContent
  );
}
