import { useContext, useState } from "react";
import moon from "@/assets/moon.png";
import sun from "@/assets/sun.png";
import { ContextProp, ThemeContext } from "@/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navlinks from "../Sidebar/Navlinks";
import { Button } from "@/components/ui/button";
import Inputbody from "../Sidebar/form-inputs/Inputbody";

interface HamburgerMenuProp {
  context: ContextProp | null;
  toggleTheme: () => void;
}

const Title = () => {
  const context = useContext(ThemeContext);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const;
  const monthName = months[new Date().getMonth()];
  const date = new Date().getDate();
  const hours = new Date().getHours();
  const greeting = () => {
    if (hours >= 0 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon";
    } else if (hours >= 18 && hours != 0) {
      return "Good evening";
    }
  };

  const toggleTheme = () => {
    const current = localStorage.getItem("theme");

    function switchTheme() {
      current == "light"
        ? localStorage.setItem("theme", "dark")
        : localStorage.setItem("theme", "light");
      return localStorage.getItem("theme");
    }

    current == "light"
      ? context?.setTheme(switchTheme())
      : context?.setTheme(switchTheme());
  };

  return (
    <div className="flex justify-between items-center h-auto">
      <div className="flex items-center xs:justify-between sm:justify-normal xs:gap-[2rem] lg:gap-4 xs:w-[75%] sm:w-1/2">
        <div className="w-[12%] xs:hidden lg:block">
          <h2
            className={
              context?.theme == "dark"
                ? "text-[#f2f2f2] font-bold text-3xl text-center leading-tight tracking-tight"
                : "text-[#141414] font-bold text-3xl text-center leading-tight tracking-tight"
            }
          >
            {monthName + " " + date}
          </h2>
        </div>
        <div className="w-auto">
          <p
            className={
              context?.theme == "dark"
                ? "text-[#f2f2f2] font-bold xs:text-[1.5rem] sm:text-3xl leading-tight tracking-tight xs:text-start"
                : "text-[#141414] font-bold xs:text-[1.5rem] sm:text-3xl leading-tight tracking-tight xs:text-start"
            }
          >
            {greeting()}
          </p>
          <p
            className={
              context?.theme == "dark"
                ? "text-[#404040] font-bold xs:text-[1.5rem] xs:leading-[90%] sm:leading-[90%] md:leading-tight sm:text-3xl tracking-tight xs:text-start"
                : "text-[#a6a6a6] font-bold xs:text-[1.5rem] xs:leading-[90%] sm:leading-[90%] md:leading-tight sm:text-3xl xs:text-start tracking-tight "
            }
          >
            What's your plan for today?
          </p>
        </div>
      </div>
      <div
        className="cursor-pointer mr-4 xs:hidden lg:block"
        onClick={toggleTheme}
      >
        {context?.theme == "dark" ? (
          <img src={sun} alt="Sun icon" className="w-[1.8rem]" />
        ) : (
          <img src={moon} alt="Moon icon" className="w-[1.5rem]" />
        )}
      </div>
      <HamburgerMenu context={context} toggleTheme={toggleTheme} />
    </div>
  );
};

// For mobile responsiveness
const HamburgerMenu = ({ context, toggleTheme }: HamburgerMenuProp) => {
  const [newTask, setNewTask] = useState(false);

  return (
    <div className="xs:block lg:hidden">
      <Sheet>
        <SheetTrigger>
          <FontAwesomeIcon
            icon={faBars}
            className={
              context?.theme == "dark"
                ? "text-[#f2f2f2] text-[1.3rem]"
                : "text-[#141414] text-[1.3rem]"
            }
          />
        </SheetTrigger>
        <SheetContent
          className={
            context?.theme == "dark"
              ? "bg-[#0d0d0d] border-[#2e2e2e] p-4 pt-[2rem] transition-none flex flex-col justify-between"
              : "bg-[#f2f2f2] border-[#d9d9d9] p-4 pt-[2rem] transition-none flex flex-col justify-between"
          }
        >
          <div className="xs:gap-4 sm:gap-[1.5rem] flex flex-col xs:h-[15rem] sm:h-[18rem]">
            <div
              className={
                context?.theme == "dark"
                  ? "text-[#f2f2f2] p-2 text-center xs:text-2xl sm:text-[1.8rem] font-bold tracking-tight"
                  : "text-[#141414] p-2 text-center xs:text-2xl sm:text-[1.8rem] font-bold tracking-tight"
              }
            >
              Smart Todo
            </div>
            <div className="w-full flex flex-col justify-between h-full">
              {newTask ? (
                <Inputbody
                  context={context}
                  styling={"h-full flex flex-col justify-between gap-[3rem]"}
                  toggleCancel={setNewTask}
                  toggleRemove={true}
                />
              ) : (
                <>
                  <Navlinks context={context} />
                  <Button
                    onClick={() =>
                      setNewTask((current) => (!current ? true : false))
                    }
                    className={
                      context?.theme == "dark"
                        ? "xs:text-[15px] sm:text-base bg-[#f2f2f2] text-[#141414] transition-none hover:bg-[none]"
                        : "xs:text-[15px] sm:text-base bg-[#141414] text-[#f2f2f2] transition-none hover:bg-[none]"
                    }
                  >
                    Add New Task
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="cursor-pointer self-end" onClick={toggleTheme}>
            {context?.theme == "dark" ? (
              <img src={sun} alt="Sun icon" className="w-[1.3rem]" />
            ) : (
              <img src={moon} alt="Moon icon" className="w-[1.3rem]" />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Title;
