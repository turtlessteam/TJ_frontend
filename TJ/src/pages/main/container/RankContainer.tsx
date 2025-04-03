import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SongRank from "./SongRank";
import Dropdown from "./Dropdown"; // DropdownIcon 대신 Dropdown 컴포넌트를 import 합니다.
import getTextColorWithoutBG from "@/hooks/getTextColorWithoutBG";
import getTextColorBasedOnBg from "@/hooks/getTextColorBasedOnBg";
import mixpanel from "mixpanel-browser";

const categories = [
  { label: "지금 리코스타 1호점에서 인기있는 노래", file: "top.json" },
  { label: "썸탈때 부르면 좋은 노래", file: "some.json" },
  { label: "헤어지고 부르는 이별 노래", file: "sad.json" },
  { label: "막곡으로 부르기 좋은 노래", file: "top.json" },
];

interface RankContainerProps {
  bgColor: string;
}

const RankContainer = ({ bgColor }: RankContainerProps) => {
  const [songs, setSongs] = useState<any[][]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  // 사용자가 수동으로 선택한 인덱스가 있다면 그 값을, 없으면 자동 인덱스를 사용
  const currentIndex = selectedIndex !== null ? selectedIndex : index;

  const textColor = getTextColorWithoutBG(bgColor);
  const textColorBasedBg = getTextColorBasedOnBg(bgColor);

  return (
    <div className="flex flex-col gap-1 justify-center">
      <div
        className={`text-left font-[Pretendard] text-base font-medium flex justify-between items-center gap-2`}
        style={{ color: textColor }}
      >
        <Dropdown
          options={categories.map((category) => category.label)}
          selected={[currentIndex]}
          onChange={(newSelected) => {
            if (newSelected.length > 0) {
              setSelectedIndex(newSelected[0]);
              mixpanel.track("category Selected");
            } else {
              setSelectedIndex(null);
            }
          }}
          color={textColor}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2 "
        >
          {songs[currentIndex]?.map((song, idx) => (
            <SongRank
              key={idx}
              title={song.title}
              name={song.name}
              bgColor={textColorBasedBg}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RankContainer;
