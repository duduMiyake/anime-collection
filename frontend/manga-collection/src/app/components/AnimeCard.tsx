import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  title: string;
  imageUrl: string;
  linkToDetails?: boolean;
}

export default function AnimeCard({
  title,
  imageUrl,
  linkToDetails = true,
}: AnimeCardProps) {
  const CardContent = (
    <div className="min-w-[160px] h-[230px] relative rounded-lg overflow-visible shadow-md hover:scale-110 hover:border-2 border-[#FAF9F9] transition-transform">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 160px"
      />
    </div>
  );

  return linkToDetails ? (
    <Link href={`/animes/${title}`}>{CardContent}</Link>
  ) : (
    CardContent
  );
}
