import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SongRank from "./SongRank";
import { Dropdown } from "./Dropdown";

const categories = [
  { label: "지금 리코스타 1호점에서 인기있는 노래", file: "top.json" },
  { label: "썸탈때 부르면 좋은 노래", file: "some.json" },
  { label: "헤어지고 부르는 이별 노래", file: "sad.json" },
  { label: "막곡으로 부르기 좋은 노래", file: "top.json" },
];

const RankContainer = () => {
  const [songs, setSongs] = useState<any[][]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // 바깥 클릭 감지용

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const newSongs = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`/db/${category.file}`);
            if (!response.ok) throw new Error("파일 로드 실패");
            const data = await response.json();
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

  // 외부 클릭 감지해서 드롭다운 닫기
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 옵션 선택 시 처리
  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    setIsDropdownOpen(false);
  };

  const displayIndex = selectedIndex !== null ? selectedIndex : index;

  if (songs.length === 0) return <p className="text-white">로딩 중이에요 😅</p>;

  return (
    <div className="flex flex-col gap-2.5 justify-center">
      {/* 드롭다운 */}
      <div className="relative text-left text-white font-[Pretendard] text-base font-medium flex justify-between items-center gap-2">
        <div ref={dropdownRef} className="relative ">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="rounded bg-transparent text-white flex items-center gap-2 border border-gray-500"
          >
            <span>{categories[displayIndex].label}</span>
            <Dropdown />
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 top-full mt-1 w-max bg-white text-black shadow-md z-10 border-0 rounded-lg p-1 ">
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="p-2 cursor-pointer hover:bg-gray-700"
                >
                  {category.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 애니메이션 */}
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
