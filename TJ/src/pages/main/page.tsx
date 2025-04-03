import { useState, useEffect } from "react";
import { RandomSong } from "./container/RandomSong";
import Bottom from "@/containers/ui/bottom";
import RankContainer from "./container/RankContainer";
import RecommendSectionVer2 from "./container/RecommendSectionVer2";
import { motion } from "framer-motion";

// 밝은 색 판단 유틸
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186;
}

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

export function Main() {
  const [songSettings, setSongSettings] = useState<{ category: CategoryKey[] }>(
    {
      category: ["아이돌"],
    }
  );
  const [bgColor, setBgColor] = useState("#262626");
  const [bgImage, setBgImage] = useState(""); // 이미지 URL 상태 추가
  const [isBright, setIsBright] = useState(false);

  const handleSongSettingsSubmit = (category: CategoryKey[]) => {
    setSongSettings({ category });
  };

  useEffect(() => {
    setIsBright(isLightColor(bgColor));

    // RGB 추출
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // 어두운 색 만들기
    const darken = (val: number) => Math.max(0, Math.floor(val * 0.7));
    const r2 = darken(r);
    const g2 = darken(g);
    const b2 = darken(b);

    const gradient = `linear-gradient(to bottom, ${bgColor}, rgb(${r2}, ${g2}, ${b2}))`;
    document.documentElement.style.setProperty("--bg-main", gradient);
  }, [bgColor]);

  console.log("bg", bgImage);

  return (
    <motion.div
      className="main"
      animate={`url(${bgImage})`}
      transition={{ duration: 1.5 }}
      style={{
        minHeight: "100dvh",

        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // ✅ 반복 제거

        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <motion.div
        className="main_content"
        animate={`url(${bgImage})`}
        style={{
          minWidth: "100vw",
          backgroundColor: "rgba(50, 50, 50, 0.50)", // ✅ 글래스모피즘 배경
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundRepeat: "no-repeat", // ✅ 반복 제거
        }}
      >
        <div className="flex justify-center rounded-4xl pt-10">
          <RandomSong
            category={songSettings.category}
            onColorChange={setBgColor}
            onImageExtracted={setBgImage} // setBgImage는 백그라운드 이미지 URL을 업데이트하는 함수
          />
        </div>
        <div className="mt-4">
          <RecommendSectionVer2
            onSongSettingsSubmit={handleSongSettingsSubmit}
            isBright={isBright}
            bgColor={bgColor}
          />
        </div>
        <div className="flex justify-center mt-4">
          <RankContainer bgColor={bgColor} />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </motion.div>
      <Bottom Text={"부르기"} bgColor={bgColor} />
    </motion.div>
  );
}
