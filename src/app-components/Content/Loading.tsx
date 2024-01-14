import { Skeleton } from "@/components/ui/skeleton";
import { ThemeContext } from "@/App";
import { useContext } from "react";

const LoadingUI = () => {
  const arr = [1, 2, 3, 4, 5, 6] as const;
  const context = useContext(ThemeContext);
  return (
    <>
      {arr.map((item) => (
        <div
          className={
            context?.theme == "dark"
              ? "border border-[#0f0f0f] rounded-sm xs:px-3 xs:py-5 sm:px-4 sm:py-6 flex items-center"
              : "border border-[#f0f0f0] rounded-sm xs:px-3 xs:py-5 sm:px-4 sm:py-6 flex items-center"
          }
          key={item}
        >
          <div className="basis-1/2 flex items-center gap-4">
            <Skeleton
              className={
                context?.theme == "dark"
                  ? "bg-[#2e2e2e] rounded-full p-2"
                  : "bg-[#cccccc] rounded-full p-2"
              }
            />
            <Skeleton
              className={
                context?.theme == "dark"
                  ? "bg-[#2e2e2e] xs:w-full sm:w-1/2 rounded-full p-2"
                  : "bg-[#cccccc] xs:w-full sm:w-1/2 rounded-full p-2"
              }
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingUI;
