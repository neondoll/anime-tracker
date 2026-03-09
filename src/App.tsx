import { type FC, useEffect, useState } from "react";

import type { Anime } from "./types/anime";
import type { Person } from "./types/person";
import AnimeList from "./components/AnimeList";

const App: FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [activeRating, setActiveRating] = useState<Person>("owl");

  const getStats = (type: Person) => {
    const total = animes.length;
    const completed = animes.filter(anime => anime.progress[type].status === "completed").length;
    const watching = animes.filter(anime => anime.progress[type].status === "watching").length;
    const planned = animes.filter(anime => anime.progress[type].status === "planned").length;
    const dropped = animes.filter(anime => anime.progress[type].status === "dropped").length;
    const notInterested = animes.filter(anime => anime.progress[type].status === "not_interested").length;

    return { total, completed, watching, planned, dropped, notInterested };
  };

  const owlStats = getStats('owl');
  const crocodileStats = getStats('crocodile');

  const activeStats = activeRating === 'owl' ? owlStats : crocodileStats;

  useEffect(() => {
    fetch('/anime-tracker/data/anime.json')
      .then(res => res.json())
      .then(data => setAnimes(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">🦉 Мой список аниме 🐊</h1>
          <p className="text-center text-primary-100">
            Независимые прогрессы просмотра для Совушки и Крокодильчика
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Переключатель и статистика */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          {/* Переключатель рейтингов */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                activeRating === 'owl'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveRating('owl')}
            >
              🦉 Совушка
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                activeRating === 'crocodile'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveRating('crocodile')}
            >
              🐊 Крокодильчик
            </button>
          </div>

          {/* Статистика для активного рейтинга */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="card text-center p-3">
              <div className="text-xl font-bold text-primary-400">{activeStats.total}</div>
              <div className="text-gray-400 text-xs">Всего</div>
            </div>
            <div className="card text-center p-3">
              <div className="text-xl font-bold text-green-400">{activeStats.completed}</div>
              <div className="text-gray-400 text-xs">Просмотрено</div>
            </div>
            <div className="card text-center p-3">
              <div className="text-xl font-bold text-blue-400">{activeStats.watching}</div>
              <div className="text-gray-400 text-xs">Смотрю</div>
            </div>
            <div className="card text-center p-3">
              <div className="text-xl font-bold text-yellow-400">{activeStats.planned}</div>
              <div className="text-gray-400 text-xs">В планах</div>
            </div>
            <div className="card text-center p-3">
              <div className="text-xl font-bold text-red-400">{activeStats.dropped}</div>
              <div className="text-gray-400 text-xs">Брошено</div>
            </div>
            <div className="card text-center p-3">
              <div className="text-xl font-bold text-purple-400">{activeStats.notInterested}</div>
              <div className="text-gray-400 text-xs">Не интересно</div>
            </div>
          </div>
        </div>

        {/* Фильтры по статусу */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterStatus === ''
                ? 'bg-primary-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setFilterStatus('')}
          >
            Все
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterStatus === 'watching'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setFilterStatus('watching')}
          >
            Смотрю
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterStatus === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setFilterStatus('completed')}
          >
            Просмотрено
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterStatus === 'planned'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setFilterStatus('planned')}
          >
            В планах
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterStatus === 'dropped'
                ? 'bg-red-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setFilterStatus('dropped')}
          >
            Брошено
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterStatus === 'not_interested'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setFilterStatus('not_interested')}
          >
            Не интересно
          </button>
        </div>

        {/* Список аниме */}
        <AnimeList
          animes={animes}
          filterStatus={filterStatus}
          activeRating={activeRating}
        />
      </div>
    </div>
  );
};

export default App;