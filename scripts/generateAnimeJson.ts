import fs from "fs";
import path from "path";
import slugify from "slugify";
import { fileURLToPath } from "url";

import type { Anime } from "../src/types/anime";
import { animeList } from "../src/data/animeList.ts";

// Эмуляция __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция транслитерации и создания id
function generateId(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,     // удаляет спецсимволы
    locale: "ru",     // поддержка русского языка
    replacement: "-", // заменитель пробелов
  });
}

// Копируем массив, чтобы не мутировать исходный
const rawList: Omit<Anime, "id">[] = animeList;

// Генерация id и сортировка по title
const processedList: Anime[] = rawList
  .map((item) => ({ ...item, id: generateId(item.title) }))
  .sort((a, b) => a.title.localeCompare(b.title, "ru")); // сортировка с учётом русского языка

// Проверка уникальности id
const ids = new Set<string>();

processedList.forEach((item) => {
  const baseId = item.id;
  let counter = 1;

  while (ids.has(item.id)) {
    item.id = `${baseId}-${counter}`;
    counter++;
  }

  ids.add(item.id);
});

// Сохранение JSON
const outputPath = path.join(__dirname, "../public/data/anime.json");

// Создаём папку public/data, если её нет
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(processedList, null, 2), "utf8");

console.log(`✅ JSON файл успешно создан: ${outputPath}`);
console.log(`📊 Всего записей: ${processedList.length}`);