import { useState } from "react";
import Btn from "./btx";
import Modal from "./Modal";

interface BottomSectionProps {
  onSongSettingsSubmit: (category: string, atmos: string) => void;
}

const BottomSection = ({ onSongSettingsSubmit }: BottomSectionProps) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="bottom_background flex flex-col gap-2 justify-center items-center">
      <div className="text-sm text-[Pretendard] font-normal">
        이 곡으로 100점이 나오면 노래 <b>2곡을</b> 충전해드려요 🎉
      </div>
      <div className="flex gap-2">
        <Btn text="부르기" onClick={openModal} />
        <Btn text="다시 추천받기" type={2} onClick={openModal} />
      </div>
      <Modal
        show={showModal}
        onClose={closeModal}
        onSubmit={(category, atmos) => {
          onSongSettingsSubmit(category, atmos);
          closeModal();
        }}
      />
    </div>
  );
};

export default BottomSection;
