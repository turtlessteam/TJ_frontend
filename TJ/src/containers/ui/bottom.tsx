import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  Text: string;
  animate?: "highlight" | "initial";
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const Bottom: React.FC<PrimaryButtonProps> = ({ Text, animate }) => {
  const [buttonAnimate, setButtonAnimate] = useState<"initial" | "highlight">(
    "initial"
  );

  const addKakaoChannel = () => {
    if (window.Kakao) {
      //카카오 스크립트가 로드된 경우
      const kakao = window.Kakao;

      //인증이 안되어있는 경우 인증한다.
      if (!kakao.isInitialized()) {
        kakao.init("3fb527ff9bc0e22d0fbaf5b4a227da12");
      }

      kakao.Channel.addChannel({
        channelPublicId: "_mxnxcnn", //카카오 채널 ID
      });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"; //script 실행 src
    script.async = true; //다운완료시 바로 실행
    document.body.appendChild(script); //태그 생성 (크롬에서 확인 가능)

    script.onerror = () => console.error("Failed to load Kakao SDK"); //스크립트 로드 실패 시 에러 메시지 출력

    // 스크립트 로딩이 완료될 때 수행할 로직 (첫번째 인자인 load event는 정해져있는 것 꺼내씀/ 두번째 인자는 실행시키는 함수)
    script.addEventListener("load", () => {
      // Kakao SDK 로딩 완료 후 수행할 작업
      window.Kakao.init("3fb527ff9bc0e22d0fbaf5b4a227da12");
    });

    // useEffect 함수의 반환값으로 이벤트 리스너를 제거하는 함수를 반환
    return () => {
      document.body.removeChild(script);
      script.removeEventListener("load", () => {
        // Kakao SDK 로딩 완료 후 수행할 작업
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

  const buttonContainerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "0px",
    padding: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    backdropFilter: "blur(10px)",
  };

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    width: "350px",
    height: "54.128px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "15px",
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

  return (
    <div style={buttonContainerStyle}>
      <div className="font-[Pretendard] text-sm text-white font-normal">
        이 곡으로 100점이 나오면 노래 <b>두 곡을</b> 충전해드려요{" "}
      </div>
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
      <div className="font-[Pretendard] text-[13px] text-white font-normal">
        powered by <b>DAON</b>{" "}
      </div>
    </div>
  );
};

export default Bottom;
