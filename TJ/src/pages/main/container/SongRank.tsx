interface songRankProps {
  title: string;
  name: string;
  count: string;
  award: string;
  img: string;
}

const SongRank = ({ title, name, img, award, count }: songRankProps) => {
  return (
    <div className="flex justify-between  align-middle h-12 w-[350px] bg-[#EF9659] rounded-[10px] items-center">
      <div className="flex justify-start align-middle items-center">
        <div className="text-left pl-5">
          <div className="font-[Pretendard] text-white text-sm font-medium text-left">
            {count}회
          </div>
          <div className="font-[Pretendard] text-white text-xs font-normal">
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
      <div className="ml-[100px] pr-5">
        <img className="w-10 h-10 rouned-[40px]" src={img}></img>
      </div>
    </div>
  );
};

export default SongRank;
