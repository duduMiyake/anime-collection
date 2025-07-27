import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  id: number;
  title: string;
  imageUrl: string;
  linkToDetails?: boolean;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default function AnimeCard({
  id,
  title,
  imageUrl,
  linkToDetails = true,
}: AnimeCardProps) {
  const CardContent = (
    <div className="min-w-[157px] h-[230px] relative rounded-lg overflow-visible shadow-md md:hover:scale-110 md:hover:border-2 border-[#FAF9F9] transition-transform">
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
    <Link href={`/animes/${id}/${slugify(title)}`}>{CardContent}</Link>
  ) : (
    CardContent
  );
}
