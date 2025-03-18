import { useState } from "react";
import { motion } from "framer-motion";

const buttonLabels = [
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

const RecommendSection = ({ onSongSettingsSubmit }: BottomSectionProps) => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleButtonClick = (index: number) => {
    setSelectedButtons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRecommendClick = () => {
    if (selectedButtons.length === 0) {
      window.location.reload(); // 선택된 버튼이 없으면 새로고침
    } else {
      const selectedCategories: CategoryKey[] = selectedButtons
        .map((index) => buttonLabels[index])
        .filter((category): category is CategoryKey =>
          [
            "아이돌",
            "발라드",
            "POP",
            "JPOP",
            "국힙",
            "외힙",
            "밴드",
            "인디",
          ].includes(category)
        ); // ✅ CategoryKey만 필터링

      console.log("selectedCategories", selectedCategories);
      onSongSettingsSubmit(selectedCategories); // ✅ 배열 전체 전달
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {[0, 1].map((row) => (
          <div key={row} className="flex gap-2">
            {[0, 1, 2, 3].map((col) => {
              const index = row * 4 + col;
              return (
                <motion.button
                  key={index}
                  className={`px-4 py-2 ml-1 rounded-lg transition-all border-none outline-none focus:outline-none focus-visible:outline-none active:outline-none focus:ring-0 ${
                    selectedButtons.includes(index)
                      ? "btn_clicked"
                      : "btn_default"
                  }`}
                  onClick={() => handleButtonClick(index)}
                  whileTap={{ scale: 0.9 }}
                >
                  {buttonLabels[index]}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <motion.button
          className="recommend_btn border-none outline-none focus:outline-none focus-visible:outline-none active:outline-none focus:ring-0"
          onClick={handleRecommendClick}
          whileTap={{ scale: 0.9 }}
        >
          다시 추천받기
        </motion.button>
      </div>
    </div>
  );
};

export default RecommendSection;
