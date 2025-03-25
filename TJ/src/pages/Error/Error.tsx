import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    window.location.reload();
  }, []);
  return (
    <div className="w-full h-[317px] flex justify-center items-center relative overflow-hidden bg-[#1e1e1e] animate-backgroundShift">
      {/* 그라데이션 블롭 애니메이션 - 오렌지/옐로우 톤 */}
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-500 opacity-40 rounded-full blur-3xl animate-blob1 mix-blend-screen" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-orange-300 via-red-400 to-yellow-500 opacity-30 rounded-full blur-3xl animate-blob2 mix-blend-screen" />

      <div className="relative z-10 text-white text-center space-y-3">
        <div className="text-3xl font-bold opacity-60">에러가 발생했어요</div>
        <div className="text-sm opacity-40">화면이 새로고침됩니다</div>
      </div>
    </div>
  );
};

export default Error;
