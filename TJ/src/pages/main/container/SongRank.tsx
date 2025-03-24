import { useGetRankImage } from "@/hooks/useGetRankImage";
import Loading from "@/pages/loading/Loading";
import Error from "@/pages/Error/Error";
import { useEffect, useState } from "react";

interface songRankProps {
  title: string;
  name: string;
  count: string;
  award: string;
}

const SongRank = ({ title, name, award, count }: songRankProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>("");

  /*
  const {
    data: resp,
    isLoading,
    isError,
    refetch,
  } = useGetRankImage({ title });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setImgSrc(resp?.imageUrl);
  }, [resp?.imageUrl]);

  console.log("resp", resp?.imageUrl);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  console.log("imgSrc", imgSrc);
  */

  return (
    <div className="flex justify-between align-middle h-12 w-[350px] bg-[#EF9659] rounded-[10px] items-center ">
      <div className="font-[Pretendard] pl-4 text-white text-base font-bold w-max">
        {title}
      </div>
      <div className="-mt-1 font-[Pretendard] pr-4 items-center  text-white text-sm font-normal">
        {name}
      </div>
      {/*
      <div className="ml-[70px] pr-5 rounded-2xl">
        <img className="w-10 h-10 rounded-lg" src={imgSrc}></img>
      </div>
    */}
    </div>
  );
};

export default SongRank;
