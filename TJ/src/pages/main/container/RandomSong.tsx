import { useState, useEffect } from "react";
import Song from "./Song";

type CategoryKey =
  | "아이돌"
  | "발라드"
  | "POP"
  | "JPOP"
  | "국힙"
  | "외힙"
  | "밴드"
  | "인디";

const categoryMapping: Record<CategoryKey, string> = {
  아이돌: "idol",
  발라드: "ballad",
  POP: "pop",
  JPOP: "j-pop",
  국힙: "k-hiphop",
  외힙: "hiphop",
  밴드: "band",
  인디: "other",
};

interface RandomSongProps {
  category?: CategoryKey[];
}

export function RandomSong({ category }: RandomSongProps) {
  const [song, setSong] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );

  useEffect(() => {
    async function fetchSong() {
      let finalCategory: CategoryKey;
      if (category && category.length > 0) {
        finalCategory = category[Math.floor(Math.random() * category.length)];
      } else {
        const keys = Object.keys(categoryMapping) as CategoryKey[];
        finalCategory = keys[Math.floor(Math.random() * keys.length)];
      }
      setSelectedCategory(finalCategory);

      const fileName = categoryMapping[finalCategory];
      try {
        const module = await import(`../../../db/${fileName}.json`);
        const data = module.default;

        if (data.length > 0) {
          const randomSong = data[Math.floor(Math.random() * data.length)];
          setSong(randomSong);
        } else {
          console.error("해당 카테고리에 곡 데이터가 없습니다:", finalCategory);
        }
      } catch (error) {
        console.error(`JSON 파일(${fileName}.json) 로드 실패:`, error);
      }
    }
    fetchSong();
  }, [category]);

  if (!song || !selectedCategory) return <div>Loading...</div>;

  return (
    <Song title={song.title} name={song.name} category={selectedCategory} />
  );
}
