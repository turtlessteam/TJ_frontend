import SongRank from "./SongRank";

const RankContainer = () => {
  return (
    <div className="flex flex-col gap-2.5 justify-center">
      <div className="text-left text-white font-[Pretendard] text-base font-medium">
        지금 <b>리코스타 1호점</b>에서 인기있는 노래
      </div>
      <SongRank
        title={"너를 위해"}
        name={"이재범"}
        count={"24"}
        award={"1위"}
        img={""}
      />
      <SongRank
        title={"너를 위해"}
        name={"이재범"}
        count={"24"}
        award={"1위"}
        img={""}
      />
      <SongRank
        title={"너를 위해"}
        name={"이재범"}
        count={"24"}
        award={"1위"}
        img={""}
      />
      <SongRank
        title={"너를 위해"}
        name={"이재범"}
        count={"24"}
        award={"1위"}
        img={""}
      />
      <SongRank
        title={"너를 위해"}
        name={"이재범"}
        count={"24"}
        award={"1위"}
        img={""}
      />
    </div>
  );
};

export default RankContainer;
