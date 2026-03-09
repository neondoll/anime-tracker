import type { Person } from "./person";

export type AnimeStatus = "completed" | "dropped" | "not_interested" | "planned" | "watching";

export interface AnimeProgress {
  watchedEpisodes: number;
  status: AnimeStatus;
}

export interface Anime {
  id: string;
  title: string;
  image: string;
  rating: Record<Person, number>;
  episodes: number;
  progress: Record<Person, AnimeProgress>;
  genres: string[];
  description?: string;
  video?: string;
}