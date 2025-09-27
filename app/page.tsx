import FramerWrapper from "@/components/animation/framer-wrapper";

const HomePage = () => {
  return (
    <>
      <FramerWrapper className="h-full w-auto flex flex-col justify-start gap-4" y={0} x={-100}>
        <h3 className="text-2xl max-sm:text-xl">{"안녕하세요."}</h3>
        <h1 className="text-8xl name-underline text-primary max-sm:text-6xl ">{"안성진"}</h1>
        <h3>입니다.</h3>
        <div className="py-4  rounded-md flex flex-col justify-center items-center overflow-hidden">
          <div className="font-poppins text-base sm:text-2xl [text-wrap:balance] text-gray-700">
            I am a Web Developer &
            <span className="inline-flex ml-2 flex-col h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] sm:h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul className="block text-left font-rubik text-lg sm:text-3xl leading-tight [&_li]:block animate-text-slide">
                <li className="text-[#2f7df4]">{"d"}</li>
                <li className="text-[#2f7df4]">{"d"}</li>
                <li className="text-[#2f7df4]">{"d"}</li>
              </ul>
            </span>
          </div>
        </div>
      </FramerWrapper>
      <FramerWrapper className="h-full w-auto flex flex-col justify-start gap-4" y={0} x={100}>
        <h3 className="text-2xl max-sm:text-xl">{"안녕하세요."}</h3>
        <h1 className="text-8xl name-underline text-primary max-sm:text-6xl ">{"안성진"}입니다.</h1>
      </FramerWrapper>
    </>
  );
};

export default HomePage;
