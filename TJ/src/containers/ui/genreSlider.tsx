import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftSlideIcon, RightSlideIcon } from "@/components/Ricostar";

type CategoryKey =
  | "아이돌"
  | "발라드"
  | "POP"
  | "JPOP"
  | "국힙"
  | "외힙"
  | "밴드"
  | "인디";

const buttonLabels: CategoryKey[] = [
  "아이돌",
  "발라드",
  "POP",
  "JPOP",
  "국힙",
  "외힙",
  "밴드",
  "인디",
];

const GenreSlider = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const sliderRef = useRef<any>(null);

  const toggleGenre = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const total = buttonLabels.length;

  const sliderSettings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    speed: 400,
    arrows: false,
    swipeToSlide: true,
    beforeChange: (_: number, next: number) => setCenterIndex(next),
  };

  const getSlideStyle = (index: number) => {
    if (index === centerIndex) {
      return "opacity-100 scale-100 z-10 ";
    }

    const prevIndex = (centerIndex - 1 + total) % total;
    const nextIndex = (centerIndex + 1) % total;

    if (index === prevIndex || index === nextIndex) {
      return "opacity-40 scale-95 z-0";
    }

    return "opacity-10 scale-90 pointer-events-none z-0";
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* 왼쪽 화살표 */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="text-white text-2xl font-bold px-2"
      >
        <LeftSlideIcon />
      </button>

      {/* 슬라이더 */}
      <div className="w-[270px]">
        <Slider ref={sliderRef} {...sliderSettings}>
          {buttonLabels.map((label, index) => (
            <div key={index} className=" flex justify-center">
              <button
                onClick={() => index === centerIndex && toggleGenre(index)}
                className={`w-14 h-10 rounded-full font-semibold transition-all duration-300 items-center place-content-center m-0
          ${
            selected.includes(index) && index === centerIndex
              ? "bg-orange-500 text-white"
              : "bg-white text-white"
          }
          ${getSlideStyle(index)}
        `}
                style={{
                  fontSize: index === centerIndex ? "22px" : "16px", // ⬅️ 요기!
                }}
              >
                {label}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* 오른쪽 화살표 */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="text-white text-2xl font-bold px-2"
      >
        <RightSlideIcon />
      </button>
    </div>
  );
};

export default GenreSlider;
