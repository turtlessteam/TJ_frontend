import MainImg from "./MainImg";

interface songProps {
  title: string;
  name: string;
}

const Song = ({ title, name }: songProps) => {
  const imgSrc = `/assets/${title}.webp`; // /public 내부의 파일은 /assets/로 접근 가능

  return (
    <div className="w-[100%] h-[146px] bg-[#EF9659] text-left flex align-middle justify-between  items-center">
      <div className="justify-start  pl-[9%]">
        <div className="font-[Pretendard] text-white text-xl font-semibold">
          추천된 음악 🎤
        </div>
        <div className="font-[Pretendard] text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[40px]">
          {title}
        </div>

        <div className="font-[Pretendard] text-white text-base font-light">
          {name}
        </div>
      </div>
      <MainImg img={imgSrc} />
    </div>
  );
};

export default Song;
