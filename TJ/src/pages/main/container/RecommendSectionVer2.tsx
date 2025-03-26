import { useState } from "react";
import { motion } from "framer-motion";
import GenreSlider from "@/containers/ui/genreSlider";

const buttonLabels: CategoryKey[] = [
  "전체",
  "아이돌",
  "발라드",
  "POP",
  "JPOP",
  "국힙",
  "외힙",
  "밴드",
  "인디",
];

type CategoryKey =
  | "전체"
  | "아이돌"
  | "발라드"
  | "POP"
  | "JPOP"
  | "국힙"
  | "외힙"
  | "밴드"
  | "인디";

interface BottomSectionProps {
  onSongSettingsSubmit: (categories: CategoryKey[]) => void; // ✅ 변경: 배열을 받도록 수정
}

const RecommendSectionVer2 = ({ onSongSettingsSubmit }: BottomSectionProps) => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleRecommendClick = () => {
    const isAllSelected = selectedButtons.includes(0); // "전체" 선택됨
    const selectedCategories: CategoryKey[] = isAllSelected
      ? [] // 전체 선택 시 빈 배열
      : selectedButtons.map((index) => buttonLabels[index]);

    console.log("selectedCategories", selectedCategories);
    onSongSettingsSubmit(selectedCategories);
  };

  return (
    <div>
      <div>
        <GenreSlider onChange={setSelectedButtons} />
      </div>
      <div className="flex justify-center mt-4 ">
        <motion.button
          className="recommend_btn border-none outline-none focus:outline-none focus-visible:outline-none active:outline-none focus:ring-0 "
          onClick={handleRecommendClick}
          whileTap={{ scale: 0.9 }}
        >
          다시 추천받기
        </motion.button>
      </div>
    </div>
  );
};

export default RecommendSectionVer2;
