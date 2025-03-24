const Loading = () => {
  return (
    <div className="w-full h-[317px] flex justify-center items-center relative overflow-hidden bg-[#1e1e1e] animate-backgroundShift">
      {/* 3개의 블롭 그라데이션 애니메이션 */}
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-400 opacity-40 rounded-full blur-[120px] animate-blob1 mix-blend-screen" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-orange-300 via-red-400 to-yellow-500 opacity-40 rounded-full blur-[100px] animate-blob2 mix-blend-screen" />
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-amber-200 via-orange-300 to-red-300 opacity-30 rounded-full blur-[140px] animate-blob3 mix-blend-screen" />
    </div>
  );
};

export default Loading;
