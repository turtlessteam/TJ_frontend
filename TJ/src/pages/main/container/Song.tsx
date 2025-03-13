interface songProps {
  title: string;
  name: string;
  category: string;
  atmos: string;
}

const Song = ({ title, name, category, atmos }: songProps) => {
  return (
    <div className="">
      <div className="text-[Pretendard] text-black text-4xl font-bold tracking-tight">
        {title}
      </div>
      <div className="text-[Pretendard] text-black text-2xl font-normal tracking-tight">
        {name}
      </div>
      <div className="text-[Pretendard] text-black text-base font-normal tracking-tight">
        #{category}&nbsp;#{atmos}
      </div>
    </div>
  );
};

export default Song;
