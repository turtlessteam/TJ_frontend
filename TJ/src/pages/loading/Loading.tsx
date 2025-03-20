const Loading = () => {
  return (
    <div className="w-[100%] h-[146px] bg-[#EF9659] text-left flex align-middle justify-between  items-center">
      <div className="justify-center  pl-[9%]">
        <div className="font-[Pretendard] text-white font-bold text-3xl xs:text- sm:text-2xl md:text-5xl lg:text-[40px]">
          로딩중이에요 😅
        </div>
        <div className="font-[Pretendard] text-white text-xl font-light">
          잠시만 기다려주세요
        </div>
      </div>
    </div>
  );
};

export default Loading;
