"use client";

import { use } from "react";
import AnimeDetailClient from "./AnimeDetailClient";

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

export default function AnimeDetailPage({ params }: Props) {
  const { id, slug } = use(params);
  return <AnimeDetailClient id={id} slug={slug} />;
}
