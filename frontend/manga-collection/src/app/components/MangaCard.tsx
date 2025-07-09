interface MangaCardProps {
  title: string;
  imageUrl: string;
  score: number;
  popularityRank?: number;
  rank?: number;
}

export default function MangaCard({
  title,
  imageUrl,
  score,
  popularityRank,
  rank,
}: MangaCardProps) {
  return (
    <div className="bg-[#1c1c1c] text-white rounded-lg p-2 w-[180px] flex-shrink-0">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg h-[270px] w-full object-cover"
      />
      <div className="mt-2">
        <div className="text-yellow-400 text-sm">⭐ {score}</div>
        <div className="text-sm font-semibold">
          {popularityRank || rank}. {title}
        </div>
        <button className="bg-blue-600 text-sm px-3 py-1 mt-2 rounded w-full">
          + Lista
        </button>
      </div>
    </div>
  );
}
