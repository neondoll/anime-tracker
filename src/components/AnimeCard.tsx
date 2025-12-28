import React from "react";
import type { Anime } from "../types/anime";

interface AnimeCardProps {
  anime: Anime;
  activeRating: 'owl' | 'crocodile';
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, activeRating }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'watching': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'planned': return 'bg-yellow-500';
      case 'dropped': return 'bg-red-500';
      case 'not_interested': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'watching': return 'Смотрю';
      case 'completed': return 'Просмотрено';
      case 'planned': return 'В планах';
      case 'dropped': return 'Брошено';
      case 'not_interested': return 'Не интересно';
      default: return status;
    }
  };

  const getProgressPercentage = (watchedEpisodes: number, totalEpisodes: number) => {
    return (watchedEpisodes / totalEpisodes) * 100;
  };

  const renderRating = (type: 'owl' | 'crocodile', rating: number) => {
    const isActive = type === activeRating;
    const icons = {
      owl: '🦉',
      crocodile: '🐊'
    };

    return (
      <div className={`flex items-center gap-1 ${isActive ? 'bg-primary-500/20 p-1 rounded' : ''}`}>
        <span className="text-sm">{icons[type]}</span>
        <span className={`text-sm font-medium ${isActive ? 'text-primary-300' : 'text-gray-300'}`}>
          {rating}/5
        </span>
        <div className="flex text-yellow-400">
          {'★'.repeat(Math.round(rating))}
          {'☆'.repeat(5 - Math.round(rating))}
        </div>
      </div>
    );
  };

  const renderProgress = (type: 'owl' | 'crocodile', progress: { watchedEpisodes: number; status: string }) => {
    const isActive = type === activeRating;
    const icons = {
      owl: '🦉',
      crocodile: '🐊'
    };

    const showProgressBar = progress.status !== 'not_interested';

    return (
      <div className={`mb-2 ${isActive ? 'bg-primary-500/10 p-2 rounded' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">{icons[type]}</span>
          <span className={`text-sm font-medium ${isActive ? 'text-primary-300' : 'text-gray-300'}`}>
            {getStatusText(progress.status)}
          </span>
          {showProgressBar && (
            <div className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(progress.status)}`}>
              {progress.watchedEpisodes}/{anime.episodes}
            </div>
          )}
        </div>
        {showProgressBar && (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? 'bg-primary-500' : 'bg-gray-500'
              }`}
              style={{ width: `${getProgressPercentage(progress.watchedEpisodes, anime.episodes)}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="relative">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(anime.progress[activeRating].status)}`}>
          {getStatusText(anime.progress[activeRating].status)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{anime.title}</h3>

        {/* Рейтинги */}
        <div className="space-y-1 mb-3">
          {renderRating('owl', anime.rating.owl)}
          {renderRating('crocodile', anime.rating.crocodile)}
        </div>

        {/* Прогресс просмотра */}
        <div className="mb-3">
          {renderProgress('owl', anime.progress.owl)}
          {renderProgress('crocodile', anime.progress.crocodile)}
        </div>

        {/* Жанры */}
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genres.map(genre => (
            <span key={genre} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              {genre}
            </span>
          ))}
        </div>

        {/* Описание */}
        {anime.description && (
          <p className="text-gray-400 text-sm line-clamp-2">{anime.description}</p>
        )}

        {/* Ссылка на страницу */}
        {anime.video && (
          <a
            className={`flex justify-center items-center px-4 py-2 mt-auto w-full text-base text-center text-gray-300 bg-gray-700 rounded-md transition-colors hover:bg-gray-600`}
            href={anime.video}
            target="_blank"
          >
            Смотреть
          </a>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;