const EmptyMessage = ({ context }: any) => {
  return (
    <div className="self-center xs:w-[80%] sm:w-[70%] md:w-auto">
      <p
        className={
          context.theme == "dark"
            ? "text-[#f2f2f2] xs:text-[2.4rem] sm:text-[2.7rem] md:text-[3rem] font-bold text-center mb-4"
            : "text-[#141414] xs:text-[2.4rem] sm:text-[2.7rem] md:text-[3rem] font-bold text-center mb-4"
        }
      >
        ¯\_(ツ)_/¯
      </p>
      <h1
        className={
          context.theme == "dark"
            ? "text-[#f2f2f2] xs:text-[1.4rem] sm:text-[1.8rem] tracking-[0] leading-[130%] font-bold text-center"
            : "text-[#141414] xs:text-[1.4rem] sm:text-[1.8rem] tracking-[0] leading-[130%] font-bold text-center "
        }
      >
        No todos here,
        <span className="block">time to add a sprinkle of productivity.</span>
      </h1>
    </div>
  );
};

export default EmptyMessage;
