import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { LeftSlideIcon, RightSlideIcon } from "@/components/Ricostar";
import getTextColorWithoutBG from "@/hooks/getTextColorWithoutBG";
import mixpanel from "mixpanel-browser"; // mixpanel import 필요

type CategoryKey =
  | "전체"
  | "아이돌"
  | "발라드"
  | "POP"
  | "JPOP"
  | "국힙"
  | "외힙"
  | "밴드"
  | "인디";

const buttonLabels: CategoryKey[] = [
  "전체",
  "아이돌",
  "발라드",
  "POP",
  "JPOP",
  "국힙",
  "외힙",
  "밴드",
  "인디",
];

interface GenreSliderProps {
  onChange: (selectedIndexes: number[]) => void;
  bgColor: string;
}

const GenreSlider: React.FC<GenreSliderProps> = ({ onChange, bgColor }) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    onChange(centerIndex === 0 ? [] : [centerIndex]);
  }, [centerIndex, onChange]);

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

  const handleSliderClicked = (index: number) => {
    mixpanel.track("Slider Selected");
    sliderRef.current?.slickGoTo(index);
  };

  const textColor = getTextColorWithoutBG(bgColor);

  return (
    <div className="flex items-center justify-center gap-2">
      {/* 
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className=" text-2xl font-bold px-2"
        style={{ color: textColor }}
      >
        <LeftSlideIcon color={textColor} />
      </button>
      */}
      <div className="w-[320px]">
        <Slider ref={sliderRef} {...sliderSettings}>
          {buttonLabels.map((label, index) => (
            <div key={index} className="flex justify-center">
              <button
                style={{
                  color: textColor,
                  fontSize: index === centerIndex ? "22px" : "16px",
                }}
                onClick={() => handleSliderClicked(index)}
                className={`w-14 h-10 rounded-full font-semibold transition-all duration-300 items-center place-content-center m-0
                ${
                  index === centerIndex
                    ? "bg-orange-500 text-white"
                    : "bg-white text-white"
                }
                ${getSlideStyle(index)}
              `}
              >
                {label}
              </button>
            </div>
          ))}
        </Slider>
      </div>
      {/*
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="text-white text-2xl font-bold px-2"
      >
        <RightSlideIcon color={textColor} />
      </button>
       */}
    </div>
  );
};

export default GenreSlider;
