import { ContextProp } from "@/App";

interface Status {
  active: number | undefined;
  completed: number | undefined;
  context: ContextProp;
}

const TaskStatus = ({ active, completed, context }: Status) => {
  return (
    <div className="xs:justify-end lg:justify-start flex xs:gap-2 sm:gap-4 flex-wrap">
      {!active ? null : (
        <div
          className={
            context.theme == "dark"
              ? "bg-[#0d0d0d] border border-[#2e2e2e] py-1 px-4 rounded-full"
              : "bg-[#f2f2f2] border border-[#bfbfbf] py-1 px-4 rounded-full"
          }
        >
          <p className="xs:text-[13px] sm:text-[14px] text-[#e61919] tracking-tight">
            {active} Unfinished Task
          </p>
        </div>
      )}
      {!completed ? null : (
        <div
          className={
            context.theme == "dark"
              ? "bg-[#0d0d0d] border border-[#2e2e2e] py-1 px-4 rounded-full"
              : "bg-[#f2f2f2] border border-[#bfbfbf] py-1 px-4 rounded-full"
          }
        >
          <p className="xs:text-[13px] sm:text-[14px] text-[#17cf17] tracking-tight">
            {completed} Finished Task
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskStatus;
