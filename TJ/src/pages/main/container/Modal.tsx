import { useState } from "react";
import Btn from "./btx";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (category: string, atmos: string) => void;
}

const Modal = ({ show, onClose, onSubmit }: ModalProps) => {
  // 내부 state로 선택값을 관리 (초기값은 기본 선택값)
  const [selectedCategory, setSelectedCategory] = useState("댄스");
  const [selectedAtmos, setSelectedAtmos] = useState("잔잔한");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleAtmosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAtmos(e.target.value);
  };

  const handleSubmit = () => {
    // 선택한 값들을 상위 컴포넌트로 전달 후 모달 닫기
    onSubmit(selectedCategory, selectedAtmos);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black opacity-50"
            style={{ backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <motion.div
            className="w-[340px] h-[362px] bg-white p-6 shadow-lg z-10 rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">
              숭냥이가 다시 추천해줄게요
            </h2>
            <div className="mb-2">
              <div>
                <div className="text-left text-base font-medium">분류</div>
                <select
                  className="dropdown mt-2"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="댄스">댄스</option>
                  <option value="발라드">발라드</option>
                  <option value="힙합">힙합</option>
                  <option value="OST">OST</option>
                  <option value="밴드">밴드</option>
                  <option value="팝">팝</option>
                </select>
              </div>
            </div>
            <div className="mb-8">
              <div>
                <div className="text-left text-base font-medium">분위기</div>
                <select
                  className="dropdown mt-2"
                  value={selectedAtmos}
                  onChange={handleAtmosChange}
                >
                  <option value="잔잔한">잔잔한</option>
                  <option value="신나는">신나는</option>
                  <option value="벅차오르는">벅차오르는</option>
                  <option value="슬픈">슬픈</option>
                </select>
              </div>
            </div>
            <Btn text="추천받기" onClick={handleSubmit} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
