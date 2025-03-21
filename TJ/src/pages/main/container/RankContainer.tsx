import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SongRank from "./SongRank";
import { Dropdown } from "@/components/DropDown";

const categories = [
  { label: "지금 리코스타 1호점에서 인기있는 노래", file: "top.json" },
  { label: "썸탈때 부르면 좋은 노래", file: "some.json" },
  { label: "헤어지고 부르는 이별 노래", file: "sad.json" },
  { label: "막곡으로 부르기 좋은 노래", file: "top.json" },
];

const RankContainer = () => {
  const [songs, setSongs] = useState<any[][]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 사용자가 선택한 인덱스 (없으면 자동)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const newSongs = await Promise.all(
          categories.map(async (category) => {
            const module = await import(`../../../db/${category.file}`);
            const data = module.default;
            return data.sort(() => 0.5 - Math.random()).slice(0, 2);
          })
        );
        setSongs(newSongs);
      } catch (error) {
        console.error("JSON 파일 로드 실패:", error);
      }
    };

    fetchSongs();
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = Number(event.target.value);
    setSelectedIndex(newIndex);
  };

  const displayIndex = selectedIndex !== null ? selectedIndex : index;

  if (songs.length === 0) return <p className="text-white">로딩 중이에요 😅</p>;

  return (
    <div className="flex flex-col gap-2.5 justify-center">
      <div className="text-left text-white font-[Pretendard] text-base font-medium flex justify-between items-center gap-2">
        <select
          className="p-1 rounded text-left text-white font-[Pretendard] text-base font-medium flex items-center gap-2"
          value={selectedIndex !== null ? selectedIndex : index}
          onChange={handleSelectChange}
        >
          {categories.map((category, idx) => (
            <option key={idx} value={idx}>
              {category.label}{" "}
            </option>
          ))}
        </select>
        <div>
          <Dropdown />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          {songs[displayIndex]?.map((song, idx) => (
            <SongRank
              key={idx}
              title={song.title}
              name={song.name}
              count={song.playCount}
              award={`${idx + 1}위`}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RankContainer;
