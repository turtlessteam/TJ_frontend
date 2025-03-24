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
    <div
      className="w-full h-[317px] text-center flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 배경 블러 효과 */}
      <div className="absolute inset-0 bg-[rgba(50,50,50,0.5)] backdrop-blur-md"></div>

      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10">
        <div className="font-[Pretendard] max-w-[80vw] pr-2 text-white font-bold text-4xl xs:text-xl sm:text-2xl md:text-5xl lg:text-[40px]">
          {title}
        </div>
        <div className="font-[Pretendard] text-white text-2xl  font-light">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Song;
