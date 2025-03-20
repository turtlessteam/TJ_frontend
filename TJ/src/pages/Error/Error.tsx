const Error = () => {
  return (
    <div className="w-[100%] h-[146px] bg-[#EF9659] text-left flex align-middle justify-between  items-center">
      <div className="justify-center  pl-[9%]">
        <div className="font-[Pretendard] text-white font-bold text-3xl xs:text- sm:text-2xl md:text-5xl lg:text-[40px]">
          이런 에러가 발생했어요 🥲
        </div>
        <div className="font-[Pretendard] text-white text-xl font-light">
          화면을 새로고침해주세요
        </div>
      </div>
    </div>
  );
};

export default Error;
