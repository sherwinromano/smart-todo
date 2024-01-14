import Navlinks from "./Navlinks";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useState, useContext } from "react";
import { ThemeContext, ContextProp } from "@/App";
import Inputbody from "./form-inputs/Inputbody";

export interface SidebarContext {
  context: ContextProp | null;
}

const Sidebar = () => {
  const context = useContext(ThemeContext);

  return (
    <div
      className={
        context?.theme == "dark"
          ? "bg-[#0d0d0d] border-[#2e2e2e] basis-[28%] border-r xs:hidden lg:flex flex-col"
          : "bg-[#f2f2f2] border-[#d9d9d9] basis-[28%] border-r xs:hidden lg:flex flex-col"
      }
    >
      <div
        className={
          context?.theme == "dark"
            ? "border-[#2e2e2e] p-6 border-b flex justify-center items-center flex-wrap gap-1 h-auto"
            : "border-[#d9d9d9] p-6 border-b flex justify-center items-center flex-wrap gap-1 h-auto"
        }
      >
        <h1
          className={
            context?.theme == "dark"
              ? "text-[#f2f2f2] font-black text-3xl tracking-tight"
              : "text-[#141414] font-black text-3xl tracking-tight"
          }
        >
          Smart Todo
        </h1>
      </div>
      <div className="h-full flex flex-col justify-between p-2">
        <Navlinks context={context} />
        <Popup context={context} />
      </div>
      <Toaster />
    </div>
  );
};

const Popup = ({ context }: SidebarContext) => {
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={
          context?.theme == "dark"
            ? "w-full p-3 text-base font-normal text-[#141414] bg-[#f2f2f2] rounded-md hover:opacity-90"
            : "w-full p-3 text-base font-normal text-[#f2f2f2] bg-[#141414] rounded-md hover:opacity-90"
        }
      >
        Add New Task
      </AlertDialogTrigger>
      <AlertDialogContent
        className={
          context?.theme == "dark"
            ? "bg-[#000] text-[#f2f2f2] border-[#2e2e2e] p-0 w-[30%] h-[60%] flex flex-col gap-0 rounded-sm overflow-hidden"
            : "bg-[#fff] text-[#141414] border-[#bfbfbf] p-0 w-[30%] h-[60%] flex flex-col gap-0 rounded-sm overflow-hidden "
        }
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className={
              context?.theme == "dark"
                ? "bg-[#131313] p-4 text-center text-3xl tracking-tight border-b border-[#2e2e2e]"
                : "bg-[#e6e6e6] p-4 text-center text-3xl tracking-tight border-b border-[#bfbfbf]"
            }
          >
            New Task
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Inputbody
          context={context}
          setOpen={setOpen}
          styling={"p-4 h-full flex flex-col"}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Sidebar;
