import { useState } from "react";
import { RandomSong } from "./container/RandomSong";
import Bottom from "@/containers/ui/bottom";
import RankContainer from "./container/RankContainer";
import { Ricostar } from "@/components/Ricostar";
import RecommendSectionVer2 from "./container/RecommendSectionVer2";

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
  // 모달에서 선택한 값들을 관리
  const [songSettings, setSongSettings] = useState<{
    category: CategoryKey[];
  }>({
    category: ["아이돌"], // Set a default category that matches CategoryKey
  });

  const handleSongSettingsSubmit = (category: CategoryKey[]) => {
    setSongSettings({ category });
  };

  return (
    <div className="main ">
      <div
        className="main_content"
        style={{ background: "#262626", minHeight: "100dvh" }}
      >
        <div className="flex justify-center rounded-2xl mt-12 ">
          <RandomSong category={songSettings.category} />
        </div>

        <div className="mt-9">
          <RecommendSectionVer2
            onSongSettingsSubmit={handleSongSettingsSubmit}
          />
        </div>

        <div className="flex justify-center mt-10">
          {" "}
          <RankContainer />
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Bottom Text={"부르기"} />
      </div>
    </div>
  );
}
