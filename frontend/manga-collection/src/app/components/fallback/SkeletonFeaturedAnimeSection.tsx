export default function SkeletonFeaturedAnimeSection() {
  return (
    <section className="flex flex-row relative max-w-5xl mx-auto my-12 h-[400px] bg-[#555B6E] animate-pulse">
      <div className="w-1/2 bg-gray-700" />
      <div className="flex-1 px-12 py-8 flex flex-col justify-center space-y-4">
        <div className="h-10 bg-gray-600 w-3/4 rounded" />
        <div className="h-6 bg-gray-500 w-2/3 rounded" />
        <div className="h-6 bg-gray-500 w-1/2 rounded" />
        <div className="h-20 bg-gray-700 w-full rounded" />
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-gray-600 rounded" />
          <div className="h-12 w-12 bg-gray-600 rounded" />
        </div>
      </div>
    </section>
  );
}
