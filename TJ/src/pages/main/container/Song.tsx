import { useEffect, useState } from "react";
import MainImg from "./MainImg";
import { useGetImage } from "@/hooks/useGetImage";
import Loading from "@/pages/loading/Loading";
import Error from "@/pages/Error/Error";

interface songProps {
  title: string;
  name: string;
}

const Song = ({ title, name }: songProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>("");

  const { data: resp, isLoading, isError, refetch } = useGetImage({ title });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setImgSrc(resp?.imageUrl);
  }, [resp?.imageUrl]);

  console.log("resp", resp?.imageUrl);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="w-[100%] h-[146px] bg-[#EF9659] text-left flex align-middle justify-between  items-center">
      <div className="justify-start  pl-[9%]">
        <div className="font-[Pretendard] text-white text-xl font-semibold">
          추천된 음악 🎤
        </div>
        <div className="font-[Pretendard] text-white font-bold text-3xl xs:text- sm:text-2xl md:text-5xl lg:text-[40px]">
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
