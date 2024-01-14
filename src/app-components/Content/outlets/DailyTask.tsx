import ScrollContent from "../../ui-custom-components/ScrollContent";
import TaskStatus from "../TaskStatus";
import { useContext, useEffect, useState } from "react";
import { dailyTask } from "@/firebase-config";
import { useOutletContext } from "react-router-dom";
import { ContextProp } from "@/App";
import SelectDropdown from "@/app-components/ui-custom-components/Select";
import List from "../List";
import LoadingUI from "../Loading";
import { ListContext } from "../Content";
import EmptyMessage from "./message/EmptyMessage";

const DailyTask = () => {
  const dailyTaskList = useContext(ListContext);
  const context: ContextProp = useOutletContext();
  const [selectValue, setSelectValue] = useState<string | null>("");

  if (selectValue == "Prioritized") {
    localStorage.setItem("Daily Task", "Prioritized");
  } else if (selectValue == "Finished") {
    localStorage.setItem("Daily Task", "Finished");
  } else if (selectValue == "Unfinished") {
    localStorage.setItem("Daily Task", "Unfinished");
  }

  useEffect(() => {
    setSelectValue(localStorage.getItem("Daily Task"));
  }, [selectValue]);

  return (
    <>
      <div className="h-auto flex justify-between items-center flex-wrap">
        <h2
          className={
            context.theme == "dark"
              ? "text-[#f2f2f2] font-bold xs:text-[1.8rem] md:text-3xl tracking-tight"
              : "text-[#141414] font-bold xs:text-[1.8rem] md:text-3xl tracking-tight"
          }
        >
          Daily Task
        </h2>
        {!dailyTaskList?.isFetching ? (
          dailyTaskList?.dailyTaskList.length != 0 ? (
            <SelectDropdown
              value={selectValue}
              setValue={setSelectValue}
              selectTitle="Sort by"
              options={dailyTaskList?.options}
              triggerStyles={
                context.theme == "dark"
                  ? "bg-black border border-[#2e2e2e] text-[#f2f2f2] xs:w-[8rem] sm:w-[9rem] text-[14px] focus:ring-0 focus:ring-offset-0 rounded-none p-2"
                  : "bg-white border border-[#bfbfbf] text-[#141414] xs:w-[8rem] sm:w-[9rem] text-[14px] focus:ring-0 focus:ring-offset-0 rounded-none p-2"
              }
              contentStyles={
                context.theme == "dark"
                  ? "bg-black border border-[#2e2e2e] text-[#f2f2f2] xs:w-[8rem] sm:w-[9rem] rounded-none border-t-0"
                  : "bg-white border border-[#bfbfbf] text-[#141414] xs:w-[8rem] sm:w-[9rem] rounded-none border-t-0"
              }
              itemStyles={
                context.theme == "dark"
                  ? "hover:bg-[#131313] focus:text-[#f2f2f2] focus:bg-[none] p-2 text-[14px] cursor-pointer"
                  : "hover:bg-[#f2f2f2] text-[#141414] focus:bg-[none] p-2 text-[14px] cursor-pointer"
              }
              sideOffset={-4}
            />
          ) : null
        ) : null}
      </div>
      <div
        className={
          dailyTaskList?.isFetching || dailyTaskList?.dailyTaskList.length != 0
            ? "h-full flex flex-col overflow-hidden gap-2"
            : "h-full flex flex-col overflow-hidden justify-center"
        }
      >
        {dailyTaskList?.isFetching ? (
          <LoadingUI />
        ) : !dailyTaskList?.dailyTaskList.length ? (
          <EmptyMessage context={context} />
        ) : dailyTaskList.error ? (
          <h1
            className={
              context.theme == "dark"
                ? "text-[#f2f2f2] text-base"
                : "text-[#141414] text-base"
            }
          >
            Failed to fetch, please try again
          </h1>
        ) : (
          <ScrollContent className="h-full">
            <ul className="flex flex-col gap-2">
              <List
                selectValue={selectValue}
                list={dailyTask}
                tasklist={dailyTaskList.dailyTaskList}
                context={context}
                componentContext={dailyTaskList.componentContext}
              />
            </ul>
          </ScrollContent>
        )}

        {dailyTaskList?.dailyTaskList.length ? (
          <TaskStatus
            active={dailyTaskList?.listStatus.dailyTask.active.length}
            completed={dailyTaskList?.listStatus.dailyTask.completed.length}
            context={context}
          />
        ) : null}
      </div>
    </>
  );
};

export default DailyTask;
