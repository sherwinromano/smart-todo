import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ComponentContext } from "@/app-components/Layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { dailyTask, important } from "../../../../firebase-config";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { SheetClose } from "@/components/ui/sheet";
import { useRef, useState, useContext } from "react";
import { SidebarContext } from "../Sidebar";
import Inputfield from "./Inputfield";

interface InputBodyProps extends SidebarContext {
  setOpen?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  styling: string;
  toggleCancel?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRemove?: boolean;
}

const Inputbody = ({
  context,
  setOpen,
  styling,
  toggleCancel,
  toggleRemove,
}: InputBodyProps) => {
  const [task, setTask] = useState("");
  const [err, setErr] = useState(false);
  const [selectValue, setSelectValue] = useState<string | null>("Daily Task");
  const inputRef = useRef<HTMLInputElement>(null);
  const componentContext = useContext(ComponentContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSuccess = async () => {
    const darkToast: React.CSSProperties = {
      backgroundColor: "#f2f2f2",
      color: "#141414",
      border: "0",
    };

    const lightToast: React.CSSProperties = {
      backgroundColor: "#141414",
      color: "#f2f2f2",
      border: "0",
    };

    const dbFields = {
      description: task,
      isCompleted: false,
      isPrioritized: false,
      timestamp: serverTimestamp(),
    };

    if (selectValue == "Daily Task") {
      await addDoc(dailyTask, dbFields);
      navigate("/smart-todo/");
      componentContext?.setUpdateComponent((prev) => (!prev ? true : false));
    } else {
      await addDoc(important, dbFields);
      navigate("/smart-todo/important");
      componentContext?.setUpdateComponent((prev) => (!prev ? true : false));
    }

    setOpen
      ? (setOpen(false),
        setTask(""),
        setErr(false),
        toast({
          description: "New task added",
          duration: 3000,
          style: context?.theme == "dark" ? darkToast : lightToast,
        }))
      : null;
  };

  const addTask = () => {
    return !task
      ? setOpen
        ? (inputRef.current?.focus(), setOpen(true), setErr(true))
        : (inputRef.current?.focus(), setErr(true))
      : toggleCancel
      ? (toggleCancel(false), handleSuccess())
      : handleSuccess();
  };

  const cancelTask = () => {
    return setOpen ? (setOpen(false), setTask(""), setErr(false)) : null;
  };

  return (
    <div className={styling}>
      <Inputfield
        inputRef={inputRef}
        setTask={setTask}
        setErr={setErr}
        err={err}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        context={context}
        isResponsive={true}
      />

      <div className="flex gap-2">
        {toggleRemove && task ? (
          <SheetClose
            onClick={() => addTask()}
            className="xs:text-[15px] sm:text-base border-0 bg-[#17cf17] text-[#f2f2f2] hover:bg-[none] hover:text-[none] w-1/2 text-base rounded-sm cursor-pointer"
          >
            Add
          </SheetClose>
        ) : (
          <Button
            onClick={() => addTask()}
            className="xs:text-[15px] sm:text-base border-0 bg-[#17cf17] text-[#f2f2f2] hover:bg-[none] hover:text-[none] w-1/2 text-base rounded-sm cursor-pointer"
          >
            Add
          </Button>
        )}

        <Button
          onClick={() => (!toggleCancel ? cancelTask() : toggleCancel(false))}
          className="xs:text-[15px] sm:text-base border-0 bg-[#e61919] text-[#f2f2f2] hover:bg-[none] hover:text-[none] w-1/2 text-base rounded-sm cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Inputbody;
