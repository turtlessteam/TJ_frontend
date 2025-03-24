import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Dropdown from "@/pages/main/container/Dropdown";

interface BottomSectionProps {
  Text: string;
  animate?: "highlight" | "initial";
  onSongSettingsSubmit: (categories: CategoryKey[]) => void;
}

type CategoryKey =
  | "아이돌"
  | "발라드"
  | "POP"
  | "JPOP"
  | "국힙"
  | "외힙"
  | "밴드"
  | "인디";

const buttonLabels = [
  "아이돌",
  "발라드",
  "POP",
  "JPOP",
  "국힙",
  "외힙",
  "밴드",
  "인디",
];

declare global {
  interface Window {
    Kakao: any;
  }
}

const Bottom: React.FC<BottomSectionProps> = ({
  Text,
  animate,
  onSongSettingsSubmit,
}: BottomSectionProps) => {
  const [buttonAnimate, setButtonAnimate] = useState<"initial" | "highlight">(
    "initial"
  );

  const addKakaoChannel = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("3fb527ff9bc0e22d0fbaf5b4a227da12");
      }
      kakao.Channel.addChannel({
        channelPublicId: "_mxnxcnn", // 카카오 채널 ID
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

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    width: "170px",
    height: "54.128px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "10px",
    background: "#fff",
    border: "none",
    outline: "none",
    cursor: "pointer",
  };

  const buttonTextStyle: React.CSSProperties = {
    color: "#DE752D",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 600,
    letterSpacing: "-0.68px",
    whiteSpace: "nowrap",
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      x: 0,
      rotate: 0,
    },
    highlight: {
      scale: 1.05,
      x: [0, -5, 5, -3, 3, 0],
      rotate: [0, -5, 5, -3, 3, 0],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  // 선택된 버튼(장르) 인덱스를 배열로 관리
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleDropdownChange = (selectedIndices: number[]) => {
    setSelectedButtons(selectedIndices);
  };

  const handleResetClick = () => {
    setSelectedButtons([]);
  };

  const handleRecommendClick = () => {
    const selectedCategories: CategoryKey[] = selectedButtons
      .map((index) => buttonLabels[index])
      .filter((category): category is CategoryKey =>
        [
          "아이돌",
          "발라드",
          "POP",
          "JPOP",
          "국힙",
          "외힙",
          "밴드",
          "인디",
        ].includes(category)
      );
    console.log("selectedCategories", selectedCategories);
    onSongSettingsSubmit(selectedCategories);
  };

  return (
    <div className="button_container_style pt-2 ">
      {/* 드랍다운 영역: 선택된 장르 표시 및 선택/초기화 */}
      <div className="flex justify-center gap-4 font-[Pretendard] text-sm text-white font-normal mb-2">
        <Dropdown
          options={buttonLabels}
          selected={selectedButtons}
          onChange={handleDropdownChange}
        />
      </div>
      <div className="flex justify-center mt-1 mb-1 gap-2">
        <motion.button
          style={buttonStyle}
          variants={buttonVariants}
          initial="initial"
          animate={animate === "highlight" ? buttonAnimate : "initial"}
          whileTap={{ scale: 0.95 }}
          onClick={addKakaoChannel}
        >
          <div style={buttonTextStyle}>{Text}</div>
        </motion.button>
        <motion.button
          className="recommend_btn border-none outline-none focus:outline-none focus-visible:outline-none active:outline-none focus:ring-0"
          onClick={handleRecommendClick}
          whileTap={{ scale: 0.9 }}
        >
          다시 추천받기
        </motion.button>
      </div>

      <div className="powered_by pb-2">
        powered by <b>DAON</b>
      </div>
    </div>
  );
};

export default Bottom;
