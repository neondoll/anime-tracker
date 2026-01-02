import type { FC } from "react";

import type { Anime } from "../types/anime";
import AnimeCard from "./AnimeCard";

interface AnimeListProps {
  animes: Anime[];
  filterStatus?: string;
  activeRating: 'owl' | 'crocodile';
}

const AnimeList: FC<AnimeListProps> = ({ animes, filterStatus, activeRating }) => {
  const filteredAnimes = filterStatus
    ? animes.filter(anime => anime.progress[activeRating].status === filterStatus)
    : animes;

  if (filteredAnimes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          {filterStatus ? `Нет аниме со статусом "${getStatusText(filterStatus)}"` : 'Нет аниме в списке'}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAnimes.map(anime => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          activeRating={activeRating}
        />
      ))}
    </div>
  );
};

const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'watching': 'Смотрю',
    'completed': 'Просмотрено',
    'planned': 'В планах',
    'dropped': 'Брошено',
    'not_interested': 'Не интересно'
  };
  return statusMap[status] || status;
};

export default AnimeList;