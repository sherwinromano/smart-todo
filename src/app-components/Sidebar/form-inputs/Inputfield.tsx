import SelectDropdown from "@/app-components/ui-custom-components/Select";
import { SidebarContext } from "../Sidebar";

export interface InputProps extends SidebarContext {
  inputRef: React.RefObject<HTMLInputElement>;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setErr: React.Dispatch<React.SetStateAction<boolean>>;
  err: boolean;
  selectValue: string | null;
  setSelectValue: React.Dispatch<React.SetStateAction<string | null>>;
  isResponsive?: boolean;
}

const Inputfield = ({
  inputRef,
  setTask,
  setErr,
  err,
  selectValue,
  setSelectValue,
  context,
  isResponsive,
}: InputProps) => {
  const options: [string, string] = ["Daily Task", "Important"];

  return isResponsive ? (
    // For mobile view
    <div className="flex flex-col gap-[3rem] h-full justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <p
            className={
              context?.theme == "dark"
                ? "xs:text-[15px] sm:text-base text-[#f2f2f2]"
                : "xs:text-[15px] sm:text-base text-[#141414]"
            }
          >
            Task Description
          </p>
          <input
            type="text"
            ref={inputRef}
            className={
              err
                ? context?.theme == "dark"
                  ? "xs:text-[15px] sm:text-base xs:mt-2 lg:mt-0 bg-[#2e2e2e] border border-[#e61919] outline-none p-2 text-[#f2f2f2] w-full"
                  : "xs:text-[15px] sm:text-base xs:mt-2 lg:mt-0 bg-[#f2f2f2] border border-[#e61919] outline-none p-2 text-[#141414] w-full"
                : context?.theme == "dark"
                ? "xs:text-[15px] sm:text-base xs:mt-2 lg:mt-0 bg-[#131313] border border-[#2e2e2e] outline-none p-2 text-[#f2f2f2] w-full"
                : "xs:text-[15px] sm:text-base xs:mt-2 lg:mt-0 bg-[#f2f2f2] border border-[#bfbfbf] outline-none p-2 text-[#141414] w-full"
            }
            onChange={(event) => (setTask(event.target.value), setErr(false))}
          />
          {err ? (
            <span className="text-[14px] text-[#e61919]">
              Please enter a task
            </span>
          ) : null}
        </div>
        <div>
          <p
            className={
              context?.theme == "dark"
                ? "xs:text-[15px] sm:text-base text-[#f2f2f2]"
                : "xs:text-[15px] sm:text-base text-[#141414]"
            }
          >
            Task Category
          </p>
          <SelectDropdown
            value={selectValue}
            setValue={setSelectValue}
            options={options}
            placeholder={selectValue}
            sideOffset={2}
            triggerStyles={
              context?.theme == "dark"
                ? "xs:text-[15px] sm:text-base xs:mt-2 lg:mt-0 bg-[#131313] border border-[#2e2e2e] text-[#f2f2f2] w-full focus:ring-0 focus:ring-offset-0 rounded-none p-2"
                : "xs:text-[15px] sm:text-base xs:mt-2 lg:mt-0 bg-[#f2f2f2] border border-[#bfbfbf] text-[#141414] w-full text-base focus:ring-0 focus:ring-offset-0 rounded-none p-2"
            }
            contentStyles={
              context?.theme == "dark"
                ? "bg-black border border-[#2e2e2e] text-[#f2f2f2] w-full rounded-none"
                : "bg-white border border-[#bfbfbf] text-[#141414] w-full rounded-none"
            }
            itemStyles={
              context?.theme == "dark"
                ? "xs:text-[15px] sm:text-base hover:bg-[#131313] focus:text-[#f2f2f2] focus:bg-[none] p-2 cursor-pointer"
                : "xs:text-[15px] sm:text-base hover:bg-[#f2f2f2] text-[#141414] focus:bg-[none] p-2 cursor-pointer"
            }
          />
        </div>
      </div>
    </div>
  ) : (
    // For desktop view
    <div className="flex flex-col gap-[3rem] h-full justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <p
            className={
              context?.theme == "dark"
                ? "text-base text-[#f2f2f2]"
                : "text-base text-[#141414]"
            }
          >
            Task Description
          </p>
          <input
            type="text"
            ref={inputRef}
            className={
              err
                ? context?.theme == "dark"
                  ? "bg-[#2e2e2e] border border-[#e61919] outline-none p-2 text-[#f2f2f2] w-full"
                  : "bg-[#f2f2f2] border border-[#e61919] outline-none p-2 text-[#141414] w-full"
                : context?.theme == "dark"
                ? "bg-[#131313] border border-[#2e2e2e] outline-none p-2 text-[#f2f2f2] w-full"
                : "bg-[#f2f2f2] border border-[#bfbfbf] outline-none p-2 text-[#141414] w-full"
            }
            onChange={(event) => (setTask(event.target.value), setErr(false))}
          />
          {err ? (
            <span className="text-[14px] text-[#e61919]">
              Please enter a task
            </span>
          ) : null}
        </div>
        <div>
          <p
            className={
              context?.theme == "dark"
                ? "text-base text-[#f2f2f2]"
                : "text-base text-[#141414]"
            }
          >
            Task Category
          </p>
          <SelectDropdown
            value={selectValue}
            setValue={setSelectValue}
            options={options}
            placeholder={selectValue}
            sideOffset={2}
            triggerStyles={
              context?.theme == "dark"
                ? "bg-[#131313] border border-[#2e2e2e] text-[#f2f2f2] w-full text-base focus:ring-0 focus:ring-offset-0 rounded-none p-2"
                : "bg-[#f2f2f2] border border-[#bfbfbf] text-[#141414] w-full text-base focus:ring-0 focus:ring-offset-0 rounded-none p-2"
            }
            contentStyles={
              context?.theme == "dark"
                ? "bg-black border border-[#2e2e2e] text-[#f2f2f2] w-full rounded-none"
                : "bg-white border border-[#bfbfbf] text-[#141414] w-full rounded-none"
            }
            itemStyles={
              context?.theme == "dark"
                ? "hover:bg-[#131313] focus:text-[#f2f2f2] focus:bg-[none] p-2 text-base cursor-pointer"
                : "hover:bg-[#f2f2f2] text-[#141414] focus:bg-[none] p-2 text-base cursor-pointer"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Inputfield;
