export interface Anime {
  id: number;
  title: string;
  titleJapanese: string;
  titleEnglish: string;
  synopsis: string;
  imageUrl: string;
  largeImageUrl: string;
  score: number;
  scoredBy: number;
  popularity?: number;
  rank?: number;
  rating?: string;
  status: string;
  episodes?: number;
  trailer?: string;
  trailerImage?: string;
  studios: string[];
  genres: string[];
  themes: string[];
  demographics: string[];
}
