export default function SkeletonFeaturedAnimeSection() {
  return (
    <section className="flex flex-row relative max-w-5xl mx-auto my-12 h-[400px] bg-[#1A1A1A] animate-pulse rounded-2xl">
      <div className="w-1/2 bg-[#2A2A2A] hidden md:block" />
      <div className="flex-1 px-12 py-8 md:flex flex-col justify-center space-y-4 hidden">
        <div className="h-10 bg-[#333333] w-3/4 rounded" />
        <div className="h-6 bg-[#3D3D3D] w-2/3 rounded" />
        <div className="h-6 bg-[#3D3D3D] w-1/2 rounded" />
        <div className="h-20 bg-[#2A2A2A] w-full rounded" />
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-[#333333] rounded" />
          <div className="h-12 w-12 bg-[#333333] rounded" />
        </div>
      </div>

      {/* mobile */}
      <div className="w-full h-full md:hidden flex flex-col justify-around items-center text-center mr-4">
        <div className="w-1/2 bg-[#2A2A2A] md:hidden" />
      </div>
    </section>
  );
}
