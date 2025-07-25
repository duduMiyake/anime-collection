import AnimeListClient from "./AnimeListClient";

export default function AnimeListPage({
  searchParams,
}: {
  searchParams: { type?: "top" | "popular" | "seasonal" };
}) {
  // Passa o parâmetro type como prop inicial
  return <AnimeListClient initialType={searchParams.type || "top"} />;
}
