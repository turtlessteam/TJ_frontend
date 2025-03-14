import { useState } from "react";
import BottomSection from "./container/BottomSection";
import Cat from "./container/Cat";
import { RandomSong } from "./container/RandomSong";

type CategoryKey = "발라드" | "밴드" | "힙합" | "ost" | "팝" | "댄스";

export function Main() {
  // 모달에서 선택한 값들을 관리
  const [songSettings, setSongSettings] = useState<{
    category: CategoryKey;
    atmos: string;
  }>({
    category: "댄스", // Set a default category that matches CategoryKey
    atmos: "",
  });

  const handleSongSettingsSubmit = (category: CategoryKey, atmos: string) => {
    setSongSettings({ category, atmos });
  };

  return (
    <div className="main">
      <div className="main_content">
        <RandomSong
          category={songSettings.category}
          atmos={songSettings.atmos}
        />
        <div className="flex justify-center">
          <Cat />
        </div>
        <BottomSection onSongSettingsSubmit={handleSongSettingsSubmit} />
      </div>
    </div>
  );
}
