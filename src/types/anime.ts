export interface AnimeRating {
  owl: number;
  crocodile: number;
}

export interface AnimeProgress {
  owl: {
    watchedEpisodes: number;
    status: "watching" | "completed" | "planned" | "dropped" | "not_interested";
  };
  crocodile: {
    watchedEpisodes: number;
    status: "watching" | "completed" | "planned" | "dropped" | "not_interested";
  };
}

export interface Anime {
  id: string;
  title: string;
  image: string;
  rating: AnimeRating;
  episodes: number;
  progress: AnimeProgress;
  genres: string[];
  description?: string;
  video?: string;
}