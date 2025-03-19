import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import daonOnboarding from "@/assets/Daon.webp";
import headphone from "@/assets/headphone.webp";

interface PrimaryButtonProps {
  animate?: "highlight" | "initial";
}

export function Onboarding({ animate }: PrimaryButtonProps) {
  const [buttonAnimate, setButtonAnimate] = useState<"initial" | "highlight">(
    "initial"
  );
  const [second, setSecond] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSecond(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (second) {
      const btnTimer = setTimeout(() => {
        setShowBtn(true);
      }, 3000);
      return () => clearTimeout(btnTimer);
    }
  }, [second, navigate]);

  const navigateMain = () => {
    navigate("/main");
  };

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
    <div className="main">
      <div className="main_content">
        {!second && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={daonOnboarding} alt="Onboarding" />
          </motion.div>
        )}

        {second && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex justify-center">
              <motion.img
                src={headphone}
                alt="Headphone"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <motion.div
              className="font-[Pretendard] text-white text-3xl font-bold mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              노래를 추천해드릴게요
            </motion.div>
            <motion.div
              className="font-[Pretendard] text-white text-xl font-medium mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            >
              100점이 나오면 2곡을 충전해드려요
            </motion.div>
          </motion.div>
        )}

        {showBtn && (
          <motion.div
            className="button_container_style2 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex justify-center mt-1 mb-1">
              <motion.button
                style={buttonStyle}
                variants={buttonVariants}
                initial="initial"
                animate={animate === "highlight" ? buttonAnimate : "initial"}
                whileTap={{ scale: 0.95 }}
                onClick={navigateMain}
              >
                <div style={buttonTextStyle}>시작하기</div>
              </motion.button>
            </div>

            <div className="powered_by pb-2">
              powered by <b>DAON</b>{" "}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
