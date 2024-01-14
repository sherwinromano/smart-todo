import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRef, useReducer } from "react";
import { Data } from "@/app-components/Content/Content";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ContextProp } from "@/App";
import { ComponentProp } from "../Layout/AppLayout";
import { CollectionReference } from "firebase/firestore";

interface DropdownProp {
  task: Data;
  context: ContextProp;
  setPrioritized: (id: string) => Promise<void | undefined>;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => Promise<void | undefined>;
}

export interface DataProp {
  selectValue: string | null;
  list: CollectionReference;
  tasklist: Data[];
  context: ContextProp;
  componentContext: ComponentProp | null;
}

interface ListState {
  getID: string;
  currentTask: string;
  updateTask: string;
  toggleSave: boolean;
  toggleEdit: boolean;
}

type IDAction = { type: "getID"; getID: string };
type TaskAction = { type: "currentTask"; currentTask: string };
type EditAction = { type: "toggleEdit"; toggleEdit: boolean };
type UpdateAction = { type: "updateTask"; updateTask: string };
type SaveAction = { type: "toggleSave"; toggleSave: boolean };
type ListAction =
  | EditAction
  | SaveAction
  | IDAction
  | TaskAction
  | UpdateAction;

const ListState: ListState = {
  getID: "",
  currentTask: "",
  updateTask: "",
  toggleSave: false,
  toggleEdit: false,
};

const reducer = (state: ListState, action: ListAction): ListState => {
  switch (action.type) {
    case "getID": {
      return { ...state, getID: action.getID };
    }
    case "currentTask": {
      return { ...state, currentTask: action.currentTask };
    }
    case "updateTask": {
      return { ...state, updateTask: action.updateTask };
    }
    case "toggleSave": {
      return { ...state, toggleSave: action.toggleSave };
    }
    case "toggleEdit": {
      return { ...state, toggleEdit: action.toggleEdit };
    }
  }
};

const List = ({
  selectValue,
  list,
  tasklist,
  context,
  componentContext,
}: DataProp) => {
  const [state, dispatch] = useReducer(reducer, ListState);
  const inputRef = useRef<HTMLInputElement>(null);

  const arr: Data[] = [];

  const sorting = {
    priority: {
      prioritized: tasklist.filter((task) => task.isPrioritized),
      notPrioritized: tasklist.filter((task) => !task.isPrioritized),
    },
    task: {
      finished: tasklist.filter((task) => task.isCompleted),
      unfinished: tasklist.filter((task) => !task.isCompleted),
    },
  };

  switch (selectValue) {
    case "Prioritized":
      arr.push(
        ...sorting.priority.prioritized,
        ...sorting.priority.notPrioritized
      );
      break;
    case "Finished":
      arr.push(...sorting.task.finished, ...sorting.task.unfinished);
      break;
    case "Unfinished":
      arr.push(...sorting.task.unfinished, ...sorting.task.finished);
      break;
    default:
      arr.push(...tasklist);
  }

  const updateComponent = () => {
    return componentContext?.setUpdateComponent((prev) =>
      !prev ? true : false
    );
  }; // fetch the data if changes in ui detected e.g 'deleting task', 'editing task', 'checking task'

  const handleCheck = async (isCompleted: boolean, id: string) => {
    const currentList = doc(list, id);

    if (!isCompleted) {
      updateComponent();
      return await updateDoc(currentList, { isCompleted: true });
    }

    updateComponent();
    return await updateDoc(currentList, { isCompleted: false });
  };

  const handleEdit = (id: string) => {
    const target = tasklist.find((list) => list.id === id);

    if (target) {
      dispatch({ type: "currentTask", currentTask: target.description });
      dispatch({ type: "updateTask", updateTask: target.description });
    }
    dispatch({ type: "getID", getID: id });
    dispatch({ type: "toggleEdit", toggleEdit: true });
  };

  const handleSave = async (id: string) => {
    const currentList = doc(list, id);

    if (state.updateTask.length == 0) {
      alert("empty task");
      inputRef.current?.focus();
    } else {
      try {
        dispatch({ type: "toggleSave", toggleSave: true });
        await updateDoc(currentList, { description: state.updateTask });
      } catch {
        alert("Error, please try again");
      } finally {
        dispatch({ type: "toggleEdit", toggleEdit: false });
        dispatch({ type: "toggleSave", toggleSave: false });
        dispatch({ type: "currentTask", currentTask: "" });
        dispatch({ type: "updateTask", updateTask: "" });
        updateComponent();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const currentList = doc(list, id);
    return await deleteDoc(currentList), updateComponent();
  };

  const setPrioritized = async (id: string) => {
    const currentList = doc(list, id);
    return (
      await updateDoc(currentList, { isPrioritized: true }), updateComponent()
    );
  };

  return arr.map((task: Data) => (
    <li
      key={task.id}
      className={
        task.isCompleted
          ? context.theme == "dark"
            ? "bg-[#131313] border border-[#2e2e2e] rounded-sm xs:p-3 sm:p-4 flex flex-wrap justify-between items-center"
            : "bg-[#e6e6e6] border border-[#bfbfbf] rounded-sm xs:p-3 sm:p-4 flex flex-wrap justify-between items-center"
          : context.theme == "dark"
          ? "bg-transparent border border-[#2e2e2e] rounded-sm xs:p-3 sm:p-4 flex flex-wrap justify-between items-center"
          : "bg-transparent border border-[#bfbfbf] rounded-sm xs:p-3 sm:p-4 flex flex-wrap justify-between items-center"
      }
    >
      {/* Conditionals for editing the current task */}
      {task.id == state.getID && state.toggleEdit ? (
        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            ref={inputRef}
            defaultValue={state.currentTask}
            className={
              context.theme == "dark"
                ? "text-[#f2f2f2] outline-none bg-transparent p-[4px] w-1/2"
                : "text-[#141414] outline-none bg-transparent p-[4px] w-1/2"
            }
            onChange={(event) => {
              dispatch({ type: "updateTask", updateTask: event.target.value });
            }}
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              onClick={() => handleSave(task.id)}
              className="xs:text-[14px] sm:text-base xs:p-4 h-[1.5rem] w-auto rounded-sm bg-[#17cf17] hover:bg-[none]"
            >
              {state.toggleSave ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: "toggleEdit", toggleEdit: false })
              }
              className="xs:text-[14px] sm:text-base xs:p-4 h-[1.5rem] rounded-sm w-auto bg-[#e61919] hover:bg-[none]"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center xs:gap-3 sm:gap-4 xs:basis-[60%] sm:basis-1/2 overflow-hidden">
            <FontAwesomeIcon
              onClick={() => handleCheck(task.isCompleted, task.id)}
              icon={task.isCompleted ? faCircleCheck : faCircle}
              className={
                context.theme == "dark"
                  ? state.toggleEdit
                    ? "text-[#f2f2f2] xs:text-[14px] sm:text-base cursor-pointer pointer-events-none"
                    : "text-[#f2f2f2] xs:text-[14px] sm:text-base cursor-pointer"
                  : state.toggleEdit
                  ? "text-[#141414] xs:text-[14px] sm:text-base cursor-pointer pointer-events-none"
                  : "text-[#141414] xs:text-[14px] sm:text-base cursor-pointer"
              }
            />
            <p
              className={
                context.theme == "dark"
                  ? "text-[#f2f2f2] text-base"
                  : "text-[#141414] text-base"
              }
            >
              {task.description}
            </p>
          </div>
          <div className="flex items-center justify-between xs:gap-[2px] sm:gap-4">
            {task.isPrioritized ? (
              <Badge
                variant="default"
                className={
                  context.theme == "dark"
                    ? "bg-[#f2f2f2] text-[#141414] font-normal transition-none pointer-events-none"
                    : "bg-[#141414] text-[#f2f2f2] font-normal transition-none pointer-events-none"
                }
              >
                Priority
              </Badge>
            ) : null}
            <Dropdown
              task={task}
              context={context}
              setPrioritized={setPrioritized}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </>
      )}
    </li>
  ));
};

const Dropdown = ({
  task,
  context,
  setPrioritized,
  handleEdit,
  handleDelete,
}: DropdownProp) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          task.isCompleted
            ? context.theme == "dark"
              ? "text-[#f2f2f2] text-base w-[2rem] py-1 outline-none pointer-events-none"
              : "text-[#141414] text-base w-[2rem] py-1 outline-none pointer-events-none"
            : context.theme == "dark"
            ? "text-[#f2f2f2] text-base w-[2rem] py-1 outline-none"
            : "text-[#141414] text-base w-[2rem] py-1 outline-none"
        }
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className={
          context.theme == "dark"
            ? "rounded-sm bg-black text-[#f2f2f2] border-[#2e2e2e]"
            : "rounded-sm bg-white text-[#141414] border-[#bfbfbf]"
        }
      >
        <DropdownMenuItem
          onClick={() => setPrioritized(task.id)}
          className="cursor-pointer"
        >
          Prioritized
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleEdit(task.id)}
          className="cursor-pointer"
        >
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(task.id)}
          className="cursor-pointer focus:bg-[red] focus:text-[#f2f2f2] transition-none"
        >
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default List;
