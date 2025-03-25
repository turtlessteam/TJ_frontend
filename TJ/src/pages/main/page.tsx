import { useState } from "react";
import { RandomSong } from "./container/RandomSong";
import Bottom from "@/containers/ui/bottom";
import RankContainer from "./container/RankContainer";
import { Ricostar } from "@/components/Ricostar";

type CategoryKey =
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
        style={{ background: "#de752d", minHeight: "100dvh" }}
      >
        <div className="pt-3 pb-3 flex justify-center">
          <Ricostar />
        </div>

        <div className="flex justify-center">
          <RandomSong category={songSettings.category} />
        </div>
        <div className="notify_mention mt-6">
          100점이 나오면 노래 <b>두 곡</b>을 충전해드려요{" "}
        </div>

        <div className="flex justify-center mt-2">
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

        <Bottom
          Text={"부르기"}
          onSongSettingsSubmit={handleSongSettingsSubmit}
        />
      </div>
    </div>
  );
}
