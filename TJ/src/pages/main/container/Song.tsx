import { useEffect, useRef, useState } from "react";
import { useGetImage } from "@/hooks/useGetImage";
import Loading from "@/pages/loading/Loading";
// @ts-ignore
import ColorThief from "colorthief";

interface songProps {
  title: string;
  name: string;
  onColorExtracted: (color: string) => void;
  onImageExtracted?: (imageUrl: string) => void;
}

const Song = ({
  title,
  name,
  onColorExtracted,
  onImageExtracted,
}: songProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>("");
  const imgRef = useRef<HTMLImageElement>(null);

  const { data: resp, isLoading, isError, refetch } = useGetImage({ title });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (resp?.imageUrl) {
      setImgSrc(resp.imageUrl);
    }
  }, [resp?.imageUrl]);

  useEffect(() => {
    if (imgSrc && onImageExtracted) {
      onImageExtracted(imgSrc);
    }
  }, [imgSrc]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && resp?.imageUrl) {
      extractColor();
    }
  }, [imgSrc]);

  const extractColor = () => {
    const colorThief = new ColorThief();
    if (imgRef.current) {
      try {
        const result = colorThief.getColor(imgRef.current);
        const [r, g, b] = result;
        const hex = `#${[r, g, b]
          .map((x) => x.toString(16).padStart(2, "0"))
          .join("")}`;
        onColorExtracted(hex);
      } catch (err) {
        console.error("Color extraction failed", err);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Loading />;

  return (
    <div
      className="w-[340px] h-[340px] rounded-4xl text-left flex justify-start pl-[18px] items-center align-middle relative"
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        ref={imgRef}
        src={imgSrc}
        crossOrigin="anonymous"
        style={{ display: "none" }}
        onLoad={extractColor}
        alt="song-cover"
      />

      <div className="absolute rounded-4xl inset-0 bg-[rgba(50,50,50,0.5)] backdrop-blur-[2px]"></div>

      <div className="relative z-10 rounded-4xl ">
        <div className="font-[Pretendard] max-w-[80vw] pr-2 text-white font-bold text-xl xs:text-xl sm:text-xl md:text-xl lg:text-xl xl:text-xl">
          추천된 노래 🎤
        </div>
        <div className="font-[Pretendard] max-w-[80vw] pr-2 text-white font-bold text-2xl xs:text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl ">
          {title}
        </div>
        <div className="font-[Pretendard] text-white text-lg  font-light">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Song;
