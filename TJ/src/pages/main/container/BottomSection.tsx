import { useEffect, useState } from "react";
import Btn from "./btx"; // Btn 컴포넌트 경로 확인
import Modal from "./Modal";

type CategoryKey = "발라드" | "밴드" | "힙합" | "ost" | "팝" | "댄스";

interface BottomSectionProps {
  onSongSettingsSubmit: (category: CategoryKey, atmos: string) => void; // Updated to CategoryKey
}

const BottomSection = ({ onSongSettingsSubmit }: BottomSectionProps) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  //2.
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

  return (
    <div className="bottom_background flex flex-col gap-2 justify-center items-center">
      <div className="text-sm text-[Pretendard] font-normal">
        이 곡으로 100점이 나오면 노래 <b>2곡을</b> 충전해드려요 🎉
      </div>
      <div className="flex gap-2">
        <Btn text="부르기" onClick={addKakaoChannel} /> {/* onClick 전달 */}
        <Btn
          text="다시 추천받기"
          variant="secondary"
          onClick={openModal}
        />{" "}
        {/* onClick 전달 */}
      </div>

      <Modal
        show={showModal}
        onClose={closeModal}
        onSubmit={(category, atmos) => {
          if (
            ["발라드", "밴드", "힙합", "ost", "팝", "댄스"].includes(category)
          ) {
            onSongSettingsSubmit(category as CategoryKey, atmos); // Safely cast category to CategoryKey
          } else {
            console.error("Invalid category:", category);
          }
          closeModal();
        }}
      />
    </div>
  );
};

export default BottomSection;
