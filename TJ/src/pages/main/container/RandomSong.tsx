import { useState, useEffect } from "react";
import Song from "./Song";

type CategoryKey = "발라드" | "밴드" | "힙합" | "ost" | "팝" | "댄스";

const categoryMapping: Record<CategoryKey, string> = {
  발라드: "ballad",
  밴드: "band",
  힙합: "hiphop",
  ost: "ost",
  팝: "pop",
  댄스: "dance",
};

interface RandomSongProps {
  category?: CategoryKey | undefined;
  atmos?: string;
}

export function RandomSong({ category, atmos }: RandomSongProps) {
  const [song, setSong] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );

  useEffect(() => {
    async function fetchSong() {
      // props로 전달된 category가 있으면 사용, 없으면 랜덤 선택
      let finalCategory: CategoryKey;
      if (category) {
        finalCategory = category;
      } else {
        const keys = Object.keys(categoryMapping) as CategoryKey[];
        finalCategory = keys[Math.floor(Math.random() * keys.length)];
      }
      setSelectedCategory(finalCategory);

      const fileName = categoryMapping[finalCategory];
      try {
        const module = await import(`../../../db/${fileName}.json`);
        const data = module.default;
        let filteredData = data;
        // atmos가 전달된 경우, 해당 분위기로 필터링
        if (atmos) {
          filteredData = data.filter((item: any) => item.atmos === atmos);
          if (filteredData.length === 0) {
            console.error(
              "해당 카테고리에서 주어진 atmos와 일치하는 곡이 없습니다:",
              atmos
            );
            return;
          }
        }
        if (filteredData.length > 0) {
          const randomSong =
            filteredData[Math.floor(Math.random() * filteredData.length)];
          setSong(randomSong);
        } else {
          console.error("해당 카테고리에 곡 데이터가 없습니다:", finalCategory);
        }
      } catch (error) {
        console.error(`JSON 파일(${fileName}.json) 로드 실패:`, error);
      }
    }
    fetchSong();
  }, [category, atmos]);

  if (!song || !selectedCategory) return <div>Loading...</div>;

  return (
    <Song
      title={song.title}
      name={song.name}
      category={selectedCategory}
      atmos={song.atmos}
    />
  );
}
