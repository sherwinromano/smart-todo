import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons/faThumbtack";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import { TaskNumberContext } from "@/app-components/Layout/AppLayout";
import { useContext } from "react";

const Navlinks = ({ context }: SidebarContext) => {
  const taskLength = useContext(TaskNumberContext);

  const links = [
    {
      link: "/",
      name: "Daily Task",
      icon: faCalendarCheck,
      taskNumber: taskLength?.taskNumber?.at(0),
    },
    {
      link: "important",
      name: "Important",
      icon: faThumbtack,
      taskNumber: taskLength?.taskNumber?.at(1),
    },
  ];

  return (
    <div className="h-auto">
      <ul className="h-full">
        {links.map((link) => (
          <li key={link.name} className="h-auto">
            <NavLink
              to={link.link}
              className={
                context?.theme == "dark"
                  ? "p-3 flex justify-between items-center rounded-md h-full dark"
                  : "p-3 flex justify-between items-center rounded-md h-full"
              }
            >
              <div className="flex items-center justify-between w-1/2">
                <FontAwesomeIcon
                  icon={link.icon}
                  className={
                    context?.theme == "dark"
                      ? "text-[1.3rem] text-[#f2f2f2]"
                      : "text-[1.3rem] text-[#141414]"
                  }
                />
                <p
                  className={
                    context?.theme == "dark"
                      ? "xs:text-[15px] sm:text-base w-[65%] text-[#f2f2f2] text-start"
                      : "xs:text-[15px] sm:text-base w-[65%] text-[#141414] text-start"
                  }
                >
                  {link.name}
                </p>
              </div>
              {link.taskNumber ? (
                <div
                  className={
                    context?.theme == "dark"
                      ? "bg-[#f2f2f2] w-[2.4rem] self-stretch flex items-center justify-center rounded-full"
                      : "bg-[#141414] w-[2.4rem] self-stretch flex items-center justify-center rounded-full"
                  }
                >
                  <p
                    className={
                      context?.theme == "dark"
                        ? "text-[#141414] text-[12px]"
                        : "text-[#f2f2f2] text-[12px]"
                    }
                  >
                    {link.taskNumber}
                  </p>
                </div>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navlinks;
