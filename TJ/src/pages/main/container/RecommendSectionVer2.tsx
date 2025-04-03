import { useState } from "react";
import { motion } from "framer-motion";
import GenreSlider from "@/containers/ui/genreSlider";
import getTextColorBasedOnBg from "@/hooks/getTextColorBasedOnBg";
import mixpanel from "mixpanel-browser";

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
  onSongSettingsSubmit: (categories: CategoryKey[]) => void;
  isBright: boolean;
  bgColor: string;
}

const RecommendSectionVer2 = ({
  onSongSettingsSubmit,
  isBright,
  bgColor,
}: BottomSectionProps) => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleRecommendClick = () => {
    mixpanel.track("Recommend Button Clicked");

    const isAllSelected = selectedButtons.includes(0);
    const selectedCategories: CategoryKey[] = isAllSelected
      ? []
      : selectedButtons.map((index) => buttonLabels[index]);

    console.log("selectedCategories", selectedCategories);
    onSongSettingsSubmit(selectedCategories);
  };

  const textColor = getTextColorBasedOnBg(bgColor);

  return (
    <div className={isBright ? "text-black" : "text-white"}>
      <div>
        <GenreSlider onChange={setSelectedButtons} bgColor={bgColor} />
      </div>
      <div className="flex justify-center mt-2">
        <motion.button
          style={{ background: textColor, color: "#fff" }}
          className={`recommend_btn px-4 py-2 rounded-md border-none outline-none focus:outline-none focus-visible:outline-none active:outline-none focus:ring-0`}
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
