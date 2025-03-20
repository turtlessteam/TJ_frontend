import { useEffect, useState } from "react";
import SongRank from "./SongRank";
import Loading from "@/pages/loading/Loading";

const RankContainer = () => {
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const module = await import(`../../../db/top.json`);
        const data = module.default;

        if (data.length > 0) {
          // 데이터 개수보다 많은 노래를 요청하면 전체 목록 반환
          const songCount = Math.min(5, data.length);

          // 중복 없이 랜덤 5곡 선택
          const selectedSongs = new Set();
          while (selectedSongs.size < songCount) {
            const randomIndex = Math.floor(Math.random() * data.length);
            selectedSongs.add(data[randomIndex]);
          }

          setSongs(Array.from(selectedSongs));
        } else {
          console.error("곡을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error(`JSON 파일(top.json) 로드 실패:`, error);
      }
    }
    fetchSongs();
  }, []);

  if (songs.length === 0) return <p>로딩 중이에요 😅 </p>;

  console.log("songs", songs);

  return (
    <div className="flex flex-col gap-2.5 justify-center ">
      <div className="text-left text-white font-[Pretendard] text-base font-medium">
        지금 <b>리코스타 1호점</b>에서 인기있는 노래
      </div>
      {songs.map((song, index) => (
        <SongRank
          key={index}
          title={song.title}
          name={song.name}
          count={song.playCount}
          award={`${index + 1}위`} // 순위를 1위, 2위, ...로 표시
        />
      ))}
    </div>
  );
};

export default RankContainer;
