import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "@/App";

const ErrorPage = () => {
  const context = useContext(ThemeContext);

  return (
    <div
      className={
        context?.theme == "dark"
          ? "bg-black h-screen grid place-items-center"
          : "bg-white h-screen grid place-items-center"
      }
    >
      <div className="h-auto w-auto">
        <h1
          className={
            context?.theme == "dark"
              ? "xs:text-[2rem] sm:text-[2.3rem] md:text-[2.5rem] text-[#f2f2f2] text-center font-bold"
              : "xs:text-[2rem] sm:text-[2.3rem] md:text-[2.5rem] text-[#141414] text-center font-bold"
          }
        >
          404 Not Found
        </h1>
        <Link
          to="/smart-todo/"
          className={
            context?.theme == "dark"
              ? "text-[#f2f2f2] text-center block"
              : "text-[#141414] text-center block"
          }
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
