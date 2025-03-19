interface songRankProps {
  title: string;
  name: string;
  count: string;
  award: string;
}

const SongRank = ({ title, name, award, count }: songRankProps) => {
  const imgSrc = `/assets/${title}.webp`; // /public 내부의 파일은 /assets/로 접근 가능

  return (
    <div className="flex justify-between  align-middle h-12 w-[350px] bg-[#EF9659] rounded-[10px] items-center ">
      <div className="flex justify-start align-middle items-center">
        <div className="text-left pl-5">
          <div className="font-[Pretendard] text-white text-sm font-semibold text-left">
            {count}회
          </div>
          <div className="font-[Pretendard] -mt-1 text-white text-sm font-normal">
            {award}
          </div>
        </div>
        <div className="ml-[60px] text-left">
          <div className="font-[Pretendard] text-white text-base font-bold">
            {title}
          </div>
          <div className="-mt-1 font-[Pretendard] text-white text-sm font-normal">
            {name}
          </div>
        </div>
      </div>
      <div className="ml-[100px] pr-5 rounded-2xl">
        <img className="w-10 h-10 rounded-lg" src={imgSrc}></img>
      </div>
    </div>
  );
};

export default SongRank;
