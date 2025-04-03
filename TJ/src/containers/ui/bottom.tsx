import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import getTextColorBasedOnBg from "@/hooks/getTextColorBasedOnBg";
import getTextColorWithoutBG from "@/hooks/getTextColorWithoutBG";
import mixpanel from "mixpanel-browser";

interface BottomSectionProps {
  Text: string;
  animate?: "highlight" | "initial";
  bgColor?: string;
  // onSongSettingsSubmit: (categories: CategoryKey[]) => void;
}
/*
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
*/
/*
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
*/

declare global {
  interface Window {
    Kakao: any;
  }
}

const Bottom: React.FC<BottomSectionProps> = ({
  Text,
  animate,
  bgColor,
}: // onSongSettingsSubmit,
BottomSectionProps) => {
  const [buttonAnimate, setButtonAnimate] = useState<"initial" | "highlight">(
    "initial"
  );

  // const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const addKakaoChannel = () => {
    mixpanel.track("CTA Button Clicked");

    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("3fb527ff9bc0e22d0fbaf5b4a227da12");
      }
      kakao.Channel.addChannel({
        channelPublicId: "_mxnxcnn",
      });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onerror = () => console.error("Failed to load Kakao SDK");

    script.addEventListener("load", () => {
      window.Kakao.init("3fb527ff9bc0e22d0fbaf5b4a227da12");
    });

    return () => {
      document.body.removeChild(script);
      script.removeEventListener("load", () => {
        window.Kakao.init("3fb527ff9bc0e22d0fbaf5b4a227da12");
      });
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setButtonAnimate((prevAnimate) =>
        prevAnimate === "highlight" ? "initial" : "highlight"
      );
    }, 600);

    return () => clearInterval(intervalId);
  }, []);

  {
    /* 
  const handleRecommendClick = () => {
    const isAllSelected = selectedButtons.includes(0); // "전체" 선택됨
    const selectedCategories: CategoryKey[] = isAllSelected
      ? [] // 전체 선택 시 빈 배열
      : selectedButtons.map((index) => buttonLabels[index]);

    console.log("selectedCategories", selectedCategories);
    onSongSettingsSubmit(selectedCategories);
  };
*/
  }
  const buttonVariants = {
    initial: { scale: 1 },
    highlight: {
      scale: 1.05,
      x: [0, -5, 5, -3, 3, 0],
      rotate: [0, -5, 5, -3, 3, 0],
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const textColorBasedBg = getTextColorBasedOnBg(bgColor ?? "#ffffff");
  const textColorWithoutBg = getTextColorWithoutBG(bgColor ?? "#ffffff");

  return (
    <div className="button_container_style pt-2">
      <div
        className="notify_mention_btm "
        style={{ color: textColorWithoutBg }}
      >
        100점이 나오면 노래 <b>두 곡</b>을 충전해드려요{" "}
      </div>

      <div className="flex justify-center gap-2 mt-1 mb-1">
        <motion.button
          style={{
            display: "flex",
            width: "340px",
            height: "54px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "15px",
            background: "#fff",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
          variants={buttonVariants}
          initial="initial"
          animate={animate === "highlight" ? buttonAnimate : "initial"}
          whileTap={{ scale: 0.95 }}
          onClick={addKakaoChannel}
        >
          <div
            className=" font-[Pretendard] text-xl font-semibold"
            style={{ color: textColorBasedBg }}
          >
            {Text}
          </div>
        </motion.button>

        {/* 
        <motion.button
          className="recommend_btn border-none outline-none focus:outline-none active:outline-none focus:ring-0"
          onClick={handleRecommendClick}
          whileTap={{ scale: 0.9 }}
        >
          다시 추천받기
        </motion.button>
      </div>
      */}
      </div>
      <div className="powered_by pb-2" style={{ color: textColorWithoutBg }}>
        powered by <b>DAON</b>
      </div>
    </div>
  );
};

export default Bottom;
