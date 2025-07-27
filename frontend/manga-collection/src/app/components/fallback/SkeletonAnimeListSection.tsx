import SkeletonAnimeCard from "./SkeletonAnimeCard";

export default function SkeletonAnimeListSection() {
  return (
    <section className="mt-10">
      <div className="flex gap-4 overflow-auto md:overflow-visible pb-4 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonAnimeCard key={index} />
        ))}
      </div>
    </section>
  );
}
